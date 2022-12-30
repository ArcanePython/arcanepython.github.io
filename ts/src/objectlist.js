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
exports.ObjectList = void 0;
const twgl = __importStar(require("./../node_modules/twgl.js")); // Greg's work
const twgl_js_1 = require("./../node_modules/twgl.js");
const objectnode = __importStar(require("./objectnode"));
class ObjectList //extends twglbaseapp.twglbaseapp
 {
    constructor() {
        this.vs = `#version 300 es

  in vec4 a_position;
  in vec4 a_color;
  
  uniform mat4 u_matrix;
  
  out vec4 v_color;
  
  void main() {
    // Multiply the position by the matrix.
    gl_Position = u_matrix * a_position;
  
    // Pass the color to the fragment shader.
    v_color = a_color;
  }
  `;
        this.fs = `#version 300 es
  precision highp float;
  
  // Passed in from the vertex shader.
  in vec4 v_color;
  
  uniform vec4 u_colorMult;
  uniform vec4 u_colorOffset;
  
  out vec4 outColor;
  
  void main() {
      outColor = v_color * u_colorMult + u_colorOffset;
  }
  `;
        this.objectsToDraw = [];
        this.objects = [];
        // state
        this.cx = 0;
        this.cy = 0;
        this.cz = -20;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0.05;
    }
    async FetchText(cparcelname) {
        const res = await fetch(cparcelname);
        var b = await res.arrayBuffer();
        var enc = new TextDecoder("utf-8");
        return enc.decode(b);
    }
    main(gl) {
        // setup GLSL program
        twgl.setAttributePrefix("a_");
        this.gl = gl;
        this.programInfo = twgl.createProgramInfo(gl, [this.vs, this.fs]);
        // setup Camera
        this.fieldOfViewRadians = (60.0 * Math.PI / 180);
        // setup geometry
        // avoid Gregg's flattenedPrimitives for now - cant get it to compile in TS
        // var arrays: { [key:string]:twgl.primitives.TypedArray }= twgl.primitives.createCubeVertices(1); 
        // var cubeBufferInfo: twgl.BufferInfo = this.createFlattenedVertices(gl, arrays, 6)!;
        // cubes
        var cubeBufferInfo = twgl.primitives.createCubeBufferInfo(gl, 1.0); // create the cube
        // spheres
        // var cubeBufferInfo = twgl.primitives.createSphereBufferInfo(gl, 0.5, 12,12);      
        // VAO (not needed)
        // var cubeBufferInfo: twgl.BufferInfo = twgl.primitives.createCubeVertices(1); // this.flattenedPrimitives.createCubeBufferInfo(gl, 1)!; // lx leave out , 1);
        // var cubeVAO = twgl.createVAOFromBufferInfo(gl, programInfo, cubeBufferInfo);
        this.nodeInfosByName = undefined;
        var nodefact = new objectnode.NodesProducer(this.programInfo, cubeBufferInfo);
        var parcls = require('./resources/blockguy.json');
        var mydata = this.FetchText(parcls).then((s) => {
            console.log("mydata=" + mydata + " s=" + s);
            var nodedescriptions = JSON.parse(s);
            this.scene = nodefact.makeNode(nodedescriptions);
            this.objects = nodefact.objects;
            this.objectsToDraw = nodefact.objectsToDraw;
            this.nodeInfosByName = nodefact.nodeInfosByName;
        });
        // First frame
        requestAnimationFrame((time) => this.drawScene(time));
    }
    drawScene(time) {
        time *= 0.001;
        // check if JSon read and converted
        if (!this.nodeInfosByName) {
            requestAnimationFrame((time) => this.drawScene(time));
            return;
        }
        var nodeInfosByName = this.nodeInfosByName;
        var gl = this.gl;
        twgl.resizeCanvasToDisplaySize(gl.canvas);
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.useProgram(this.programInfo.program);
        // setup the camera's projection matrix
        var projectionMatrix = twgl_js_1.m4.perspective(this.fieldOfViewRadians, aspect, 1, 200);
        // setup the camera's matrix using look at.
        var cameraPosition = [14, 3.5, 10];
        var target = [0, 0.0, 0];
        var up = [0, 1, 0];
        var cameraMatrix = twgl_js_1.m4.lookAt(cameraPosition, target, up);
        // setup view matrix from the camera matrix.
        var viewMatrix = twgl_js_1.m4.inverse(cameraMatrix);
        var viewProjectionMatrix = twgl_js_1.m4.multiply(projectionMatrix, viewMatrix);
        // Animation
        var adjust;
        var speed = 3;
        var c = time * speed;
        adjust = Math.abs(Math.sin(c));
        nodeInfosByName["point between feet"].trs.translation[1] = adjust;
        adjust = Math.sin(c);
        nodeInfosByName["left-leg"].trs.rotation[0] = adjust;
        nodeInfosByName["right-leg"].trs.rotation[0] = -adjust;
        adjust = Math.sin(c + 0.1) * 0.4;
        nodeInfosByName["left-calf"].trs.rotation[0] = -adjust;
        nodeInfosByName["right-calf"].trs.rotation[0] = adjust;
        adjust = Math.sin(c + 0.1) * 0.4;
        nodeInfosByName["left-foot"].trs.rotation[0] = -adjust;
        nodeInfosByName["right-foot"].trs.rotation[0] = adjust;
        adjust = Math.sin(c) * 0.4;
        nodeInfosByName["left-arm"].trs.rotation[0] = adjust;
        nodeInfosByName["left-arm"].trs.rotation[1] = adjust;
        nodeInfosByName["right-arm"].trs.rotation[2] = adjust;
        adjust = Math.sin(c + 0.1) * 0.4;
        nodeInfosByName["left-forearm"].trs.rotation[0] = adjust;
        nodeInfosByName["left-forearm"].trs.rotation[1] = adjust;
        nodeInfosByName["right-forearm"].trs.rotation[2] = adjust;
        adjust = Math.sin(c - 0.1) * 0.4;
        nodeInfosByName["left-hand"].trs.rotation[2] = adjust;
        nodeInfosByName["right-hand"].trs.rotation[2] = adjust;
        nodeInfosByName["left-hand"].trs.rotation[1] = adjust;
        nodeInfosByName["right-hand"].trs.rotation[1] = adjust;
        adjust = Math.sin(c) * 0.4;
        nodeInfosByName["waist"].trs.rotation[1] = adjust;
        adjust = Math.sin(c) * 0.4;
        nodeInfosByName["torso"].trs.rotation[1] = adjust;
        adjust = Math.sin(c + 0.25) * 0.4;
        nodeInfosByName["neck"].trs.rotation[1] = adjust;
        adjust = Math.sin(c + 0.5) * 0.4;
        nodeInfosByName["head"].trs.rotation[1] = adjust;
        adjust = Math.cos(c * 2) * 0.4;
        nodeInfosByName["head"].trs.rotation[0] = adjust;
        // Update all world matrices in the scene graph
        var currentTranslation = twgl_js_1.m4.translation([-this.cx, this.cy, this.cz]);
        this.scene.updateWorldMatrix(currentTranslation);
        this.cx += this.vx * speed / 4.0;
        this.cy += this.vy * speed / 4.0;
        this.cz += this.vz * speed / 4.0;
        // Compute all the matrices for rendering
        this.objects.forEach((object) => {
            object.drawInfo.uniforms.u_matrix = twgl_js_1.m4.multiply(viewProjectionMatrix, object.worldMatrix);
        });
        // Draw the objects
        twgl.drawObjectList(gl, this.objectsToDraw);
        // Next framw
        requestAnimationFrame((time) => this.drawScene(time));
    }
}
exports.ObjectList = ObjectList;
//# sourceMappingURL=objectlist.js.map