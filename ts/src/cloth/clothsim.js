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
exports.ClothSim = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work
const cloth = __importStar(require("./cloth"));
const baseapp = __importStar(require("./../baseapp/baseapp"));
class ClothProducer {
    constructor() {
        this.clothX = 200;
        this.clothY = 50;
        this.startX = -0.9;
        this.startY = 1.0;
        this.spacing = 1.8 / this.clothX;
        this.tearDist = this.spacing * 6;
        this.cloth = new cloth.Cloth([0, 0, 0], this.clothX, this.clothY, this.startX, this.startY, this.tearDist, this.spacing, "c");
    }
}
class ClothMouseHandler {
    constructor(canvas) {
        this.canvas = canvas;
        this.mouse = new cloth.ClothMouse(0.02, // mouse.cut
        0.08, // mouse.influence
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
class ClothSim extends baseapp.BaseApp {
    constructor(gl, capp, dictPar, render_mode, accuracy, gravity, friction, bounce) {
        super(gl, capp, dictPar, "c");
        this.render_mode = render_mode;
        this.accuracy = accuracy;
        this.gravity = gravity;
        this.friction = friction;
        this.bounce = bounce;
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
        gl_FragColor = vec4(0.6, 0.8, 0.4, 1.0);
    }
    `;
        this.twglprograminfo = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
        gl.useProgram(this.twglprograminfo.program);
    }
    prepare() {
        var gl = this.gl;
        var canvas = gl.canvas;
        var cs = new ClothMouseHandler(canvas);
        this.cloth = cs.cloth;
        this.a_PositionID = gl.getAttribLocation(this.twglprograminfo.program, "a_position");
        this.indicesbuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesbuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.cloth.indices, gl.STATIC_DRAW);
        this.lastTime = Date.now();
        this.vertexbuffer = gl.createBuffer();
    }
    main() {
        this.prepare();
        window.requestAnimationFrame(() => { this.render(); });
    }
    render() {
        this.cloth.update(ClothMouseHandler.instance.mouse, 0.032, this.accuracy, this.gravity, this.friction, this.bounce);
        var currentTime = Date.now();
        this.nbFrames++;
        if ((currentTime - this.lastTime) >= 5000.0) {
            console.log(5000.0 / this.nbFrames + " ms/frame");
            this.nbFrames = 0;
            this.lastTime = currentTime;
        }
        var gl = this.gl;
        if (this.cloth.dirty) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesbuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.cloth.indices, gl.STATIC_DRAW);
        }
        gl.enableVertexAttribArray(this.a_PositionID);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexbuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.cloth.vertices, gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.a_PositionID, 3, gl.FLOAT, false, 0, 0);
        gl.drawElements(this.render_mode, this.cloth.indices.length, gl.UNSIGNED_INT, 0);
        gl.flush();
        window.requestAnimationFrame(() => { this.render(); });
    }
}
exports.ClothSim = ClothSim;
//# sourceMappingURL=clothsim.js.map