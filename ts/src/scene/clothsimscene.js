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
exports.ClothSimScene = exports.ClothMouseHandler = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work
//import { m4 } from "twgl.js";
//import { BaseApp } from "../baseapp/baseapp";
const cloth = __importStar(require("../cloth/cloth"));
class ClothProducer {
    constructor() {
        this.clothX = 200;
        this.clothY = 50;
        this.startX = -0.9;
        this.startY = 1.0;
        this.spacing = 1.8 / this.clothX;
        this.tearDist = this.spacing * 8;
        this.cloth = new cloth.Cloth(this.clothX, this.clothY, this.startX, this.startY, this.tearDist, this.spacing, "c");
    }
}
class ClothMouseHandler {
    constructor(canvas) {
        this.canvas = canvas;
        this.mouse = new cloth.ClothMouse(-9999, //  0.02,
        0.02, //   0.08,
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
exports.ClothMouseHandler = ClothMouseHandler;
class ClothSimScene {
    constructor(gl, capp, dictPar, render_mode, accuracy, friction, bounce) {
        this.render_mode = render_mode;
        this.accuracy = accuracy;
        this.friction = friction;
        this.bounce = bounce;
        this.scenesize = 500;
        this.sceneenv = -1;
        this.nbFrames = 0;
        this.lastTime = 0;
        this.a_PositionID = 0;
        this.vertexShaderSource = `
    precision mediump float;

    attribute vec3 a_position;

    uniform mat4 u_view, u_model, u_ortho;

    varying vec3 v_position;

    void main(){    
   // mat4 modelview =  u_model;

    gl_Position =  vec4(a_position, 1.0);
    //gl_Position = modelview * vec4(a_position, 1.0);
    //gl_Position = u_ortho * modelview * vec4(a_position,1.0);

    gl_PointSize = 2.0;
    v_position = gl_Position.xyz/gl_Position.w;
    }
    `;
        this.fragmentShaderSource = `
    precision mediump float;

    //uniform vec2 u_resolution;
    //uniform float u_time;

    varying vec3 v_position;

    void main()
    {
        //gl_FragColor = vec4(0.6, 0.8, 0.4, v_position.y);
     //   gl_FragColor = vec4(0.6, 0.8, 0.4, 1.0);
        gl_FragColor = vec4(0.2, 0.4, 0.2, 1.0);
    }
    `;
        //super(gl, capp, dictPar, "c");
        console.log("=> ClothSimScene constructor connect shaders");
        this.twglprograminfo = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
        //gl.useProgram(this.twglprograminfo.program);
        console.log("<= ClothSimScene constructor " + this.twglprograminfo.program);
    }
    resizeCanvas(gl) { twgl.resizeCanvasToDisplaySize(gl.canvas); }
    defaultCamera(gl, cam) { }
    extendGUI(gui) {
        // Slider for sling speed
        // Checkbox forward move animation on/off
        //   console.log("=> cloth extendGUI movetail"+this.animationParameters!);
        gui.add(this.animationParameters, 'gravity', 0.0, 0.05, 0.001);
        //gui.add(this.animationParameters!, 'sling').min(9).max(120).step(1);
        // Slider for shininess
        //gui.add(this.animationParameters!, 'shininess').min(0).max(20.0).step(0.1);
        //   gui.add(this.animationParameters!, 'fov', 5.0,85.0,1.0 );
        gui.updateDisplay();
        console.log("<= ClothSimScene extendGUI");
        //   console.log("<= manyTextures extendGUI");
    }
    prepare(gl) {
        var canvas = gl.canvas;
        var cs = new ClothMouseHandler(canvas);
        this.cloth = cs.cloth;
        gl.useProgram(this.twglprograminfo.program);
        this.a_PositionID = gl.getAttribLocation(this.twglprograminfo.program, "a_position");
        var indicesbuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesbuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.cloth.indices, gl.STATIC_DRAW);
        this.lastTime = Date.now();
        this.vertexbuffer = gl.createBuffer();
    }
    initScene(gl, cap, cam, dictpar, textureReadyCallback) {
        this.prepare(gl);
        console.log("<= ClothSimScene initScene");
        if (textureReadyCallback != undefined)
            textureReadyCallback(0);
        //   window.requestAnimationFrame(()=>{this.render();});
    }
    drawScene(gl, cam, time) {
        //console.log("cloth drawscene");
        gl.useProgram(this.twglprograminfo.program);
        this.cloth.update(ClothMouseHandler.instance.mouse, 0.032, this.accuracy, -this.animationParameters.gravity, this.friction, this.bounce);
        var currentTime = Date.now();
        this.nbFrames++;
        if ((currentTime - this.lastTime) >= 5000.0) {
            console.log(5000.0 / this.nbFrames + " ms/frame");
            this.nbFrames = 0;
            this.lastTime = currentTime;
        }
        if (this.cloth.dirty) {
            //     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cloth!.indicesbuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.cloth.indices, gl.STATIC_DRAW);
        }
        gl.enableVertexAttribArray(this.a_PositionID);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexbuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.cloth.vertices, gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.a_PositionID, 3, gl.FLOAT, false, 0, 0);
        gl.drawElements(this.render_mode, this.cloth.indices.length, gl.UNSIGNED_INT, 0);
        gl.flush();
        //  window.requestAnimationFrame(()=>{this.render();});
    }
}
exports.ClothSimScene = ClothSimScene;
//# sourceMappingURL=clothsimscene.js.map