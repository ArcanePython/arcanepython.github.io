"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClothSimScene = void 0;
const twgl = __importStar(require("twgl.js")); // lib: Greg's work
const cloth = __importStar(require("../cloth/cloth"));
class ClothProducer {
    constructor() {
        this.clothX = 400;
        this.clothY = 50;
        this.startX = -0.9;
        this.startY = 1.0;
        this.spacing = 1.8 / this.clothX;
        this.tearDist = 2.0 * this.spacing * 8;
        this.cloth = new cloth.Cloth(this.clothX, this.clothY, this.startX, this.startY, this.tearDist, this.spacing, "c");
    }
}
class ClothMouseHandler {
    constructor(canvas) {
        this.canvas = canvas;
        this.mouse = new cloth.ClothMouse(-9999, //  0.02,
        0.10, //   influence range
        false, 1, 0, 0, 0, 0);
        ClothMouseHandler.instance = this;
        var cp = new ClothProducer();
        this.cloth = cp.cloth;
        if (canvas == null || canvas == undefined)
            console.log("ClothMouseHandler finds unknown canvas");
        else {
            canvas.onmousedown = (e) => {
                var athis = ClothMouseHandler.instance;
                athis.mouse.button = e.which;
                athis.mouse.down = true;
                athis.setMouse(e);
            };
            canvas.onmousemove = this.setMouse;
            canvas.onmouseup = () => { var athis = ClothMouseHandler.instance; athis.mouse.down = false; };
            canvas.oncontextmenu = (e) => e.preventDefault();
        }
    }
    setMouse(e) {
        var athis = ClothMouseHandler.instance;
        var rect = athis.canvas.getBoundingClientRect();
        athis.mouse.px = athis.mouse.x;
        athis.mouse.py = athis.mouse.y;
        athis.mouse.x = (e.x - rect.left) / athis.canvas.width;
        athis.mouse.y = (athis.canvas.height - (e.y - rect.top)) / athis.canvas.height;
        athis.mouse.x = (athis.mouse.x * 2.0) - 1.0;
        athis.mouse.y = (athis.mouse.y * 2.0) - 1.0;
    }
}
class ClothSimScene {
    constructor(gl, capp, dictPar, render_mode, accuracy, friction, bounce) {
        this.render_mode = render_mode;
        this.accuracy = accuracy;
        this.friction = friction;
        this.bounce = bounce;
        this.scenesize = 500;
        this.sceneenv = 1;
        this.nbFrames = 0;
        this.lastTime = 0;
        this.a_PositionID = 0;
        this.a_TexCoordID = 1;
        this.vertexShaderSource = `
    precision mediump float;

    attribute vec3 a_position;
    attribute vec2 a_texcoord;

    uniform mat4 u_view, u_model, u_ortho;

    varying vec3 v_position;
    varying vec2 v_texcoord;

    void main(){    
   // mat4 modelview =  u_model;

    gl_Position =  vec4(a_position, 1.0);
    //gl_Position = modelview * vec4(a_position, 1.0);
    //gl_Position = u_ortho * modelview * vec4(a_position,1.0);

    v_texcoord = a_texcoord;

    gl_PointSize = 2.0;
    v_position = gl_Position.xyz/gl_Position.w;

    }
    `;
        this.fragmentShaderSource = `
    precision mediump float;

    //uniform vec2 u_resolution;
    //uniform float u_time;

    varying vec3 v_position;
    varying vec2 v_texcoord;

    uniform sampler2D u_texture2;

    void main()
    {
        //gl_FragColor = vec4(0.6, 0.8, 0.4, v_position.y);
     //   gl_FragColor = vec4(0.6, 0.8, 0.4, 1.0);
      //  gl_FragColor = vec4(v_texcoord[0], v_texcoord[1], 0.0, 1.0);
      vec4 cColor =  texture2D(u_texture2, v_texcoord);
      gl_FragColor = vec4(cColor[0],cColor[1],cColor[2],v_position.y+0.5);
    }
    `;
        this.twglprograminfo = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
    }
    resizeCanvas(gl) { twgl.resizeCanvasToDisplaySize(gl.canvas); }
    defaultCamera(gl, cam) { }
    extendGUI(gui) {
        gui.add(this.animationParameters, 'friction', 0.9, 1.0, 0.005);
        gui.add(this.animationParameters, 'gravity', 0.0, 0.05, 0.001);
        gui.updateDisplay();
        console.log("<= ClothSimScene extendGUI");
    }
    prepare(gl) {
        var canvas = gl.canvas;
        var cs = new ClothMouseHandler(canvas);
        this.cloth = cs.cloth;
        gl.useProgram(this.twglprograminfo.program);
        this.a_PositionID = gl.getAttribLocation(this.twglprograminfo.program, "a_position");
        this.a_TexCoordID = gl.getAttribLocation(this.twglprograminfo.program, "a_texcoord");
        this.texcoordbuffer = gl.createBuffer();
        this.indicesbuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesbuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.cloth.indices, gl.STATIC_DRAW);
        this.lastTime = Date.now();
        this.vertexbuffer = gl.createBuffer();
    }
    initScene(gl, cap, cam, dictpar, textureReadyCallback) {
        this.prepare(gl);
        //if (textureReadyCallback!=undefined) textureReadyCallback(0);
        // => fill texture2 with clover jpg
        this.texture2 = gl.createTexture();
        this.textureLocation2 = gl.getUniformLocation(this.twglprograminfo.program, "u_texture2");
        gl.bindTexture(gl.TEXTURE_2D, this.texture2);
        this.readtexture(gl, textureReadyCallback);
    }
    drawScene(gl, cam, time) {
        gl.useProgram(this.twglprograminfo.program);
        this.cloth.update(ClothMouseHandler.instance.mouse, 0.032, this.accuracy, -this.animationParameters.gravity, this.animationParameters.friction, this.bounce);
        var currentTime = Date.now();
        this.nbFrames++;
        if ((currentTime - this.lastTime) >= 5000.0) {
            console.log(5000.0 / this.nbFrames + " ms/frame");
            this.nbFrames = 0;
            this.lastTime = currentTime;
        }
        if (this.cloth.dirty) {
            console.log("cleanup indices");
            this.cloth.indices = this.cloth.cleanIndices();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesbuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.cloth.indices, gl.STATIC_DRAW);
            this.cloth.dirty = false;
        }
        gl.enableVertexAttribArray(this.a_PositionID);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexbuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.cloth.vertices, gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.a_PositionID, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.a_TexCoordID);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordbuffer);
        gl.vertexAttribPointer(this.a_TexCoordID, 2, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, this.cloth.texcoords, gl.STATIC_DRAW);
        gl.drawElements(this.render_mode, this.cloth.indices.length, gl.UNSIGNED_INT, 0);
        gl.flush();
    }
    readtexture(gl, textureReadyCallback) {
        var fNameParcel = require('./../resources/images/satin.jpg');
        //this.image = undefined;
        this.readimage = new Image();
        this.readimage.src = fNameParcel;
        this.readimage.onload = () => {
            //  this.image = this.readimage!;
            //  console.log("finished loading clover texture "+this.image.width+","+ this.image.height);
            var mipLevel = 0; // the largest mip
            var internalFormat = gl.RGBA; // format we want in the texture
            var srcFormat = gl.RGBA; // format of data we are supplying
            var srcType = gl.UNSIGNED_BYTE; // type of data we are supplying
            gl.texImage2D(gl.TEXTURE_2D, mipLevel, internalFormat, srcFormat, srcType, this.readimage);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            console.log("<- clothsim satin texture read");
            textureReadyCallback(0);
        };
    }
}
exports.ClothSimScene = ClothSimScene;
//# sourceMappingURL=clothsimscene.js.map