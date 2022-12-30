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
exports.ObjectListScene = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work
const twgl_js_1 = require("twgl.js");
const objectnode = __importStar(require("./objectnode"));
class ObjectListScene {
    constructor(gl) {
        this.twglprograminfo = null; // shaders are provided in interface string fields, in this scene twglprograminfo[] remains null
        this.scenesize = 60;
        this.sceneenv = 2;
        this.vertexShaderSource = `#version 300 es

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
        this.fragmentShaderSource = `#version 300 es
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
        this.cz = 0;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0.05;
        this.sjson = `{
  "draw": false,
  "name": "point between feet",
  "translation":[0,0,0],
  "children": [
    {
       "draw": true,
       "name": "waist",
       "translation": [0, 0, 0],
       "children": [
         {
           "draw": true,
           "name": "torso",
           "translation": [0, 2, 0],
           "children": [
             {
               "draw": true,
               "name": "neck",
               "translation": [0, 1, 0],
               "children": [
                 {
                   "draw": true,
                   "name": "head",
                   "translation": [0, 1, 0],
                   "children": []
                 }
               ]
             },
             {
               "draw": true,
               "name": "left-arm",
               "translation": [-1, 0, 0],
               "children": [
                 {
                   "draw": true,
                   "name": "left-forearm",
                   "translation": [-1, 0, 0],
                   "children": [
                     {
                       "draw": true,
                       "name": "left-hand",
                       "translation": [-1, 0, 0],
                       "children":[]
                     }
                   ]
                 }
               ]
             },
             {
               "draw": true,
               "name": "right-arm",
               "translation": [1, 0, 0],
               "children": [
                 {
                   "draw": true,
                   "name": "right-forearm",
                   "translation": [1, 0, 0],
                   "children": [
                     {
                       "draw": true,
                       "name": "right-hand",
                       "translation": [1, 0, 0],
                       "children":[]
                     }
                   ]
                 }
               ]
             }
           ]
         },
         {
           "draw": true,
           "name": "left-leg",
           "translation": [-1, -1, 0],
           "children": [
             {
               "draw": true,
               "name": "left-calf",
               "translation": [0, -1, 0],
               "children": [
                 {
                   "draw": true,
                   "name": "left-foot",
                   "translation": [0, -1, 0],
                   "children": []
                 }
               ]
             }
           ]
         },
         {
           "draw": true,
           "name": "right-leg",
           "translation": [1, -1, 0],
           "children": [
             {
               "draw": true,
               "name": "right-calf",
               "translation": [0, -1, 0],
               "children": [
                 {
                   "draw": true,
                   "name": "right-foot",
                   "translation": [0, -1, 0],
                   "children": []
                 }
               ]
             }
           ]
         }
       ]
    }
  ]
}`;
        this.twglprograminfo = new Array(2);
        this.twglprograminfo[1] = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
    }
    resizeCanvas(gl) { twgl.resizeCanvasToDisplaySize(gl.canvas); }
    extendGUI(gui) { }
    async FetchText(cparcelname) {
        const res = await fetch(cparcelname);
        var b = await res.arrayBuffer();
        var enc = new TextDecoder("utf-8");
        return enc.decode(b);
    }
    initScene(gl, cap, dictpar, p) {
        this.gl = gl;
        this.fieldOfViewRadians = (60.0 * Math.PI / 180);
        var cubeBufferInfo = twgl.primitives.createCubeBufferInfo(gl, 1.0); // create the cube
        // spheres
        // var cubeBufferInfo = twgl.primitives.createSphereBufferInfo(gl, 0.5, 12,12);      
        this.nodeInfosByName = undefined;
        var nodefact = new objectnode.NodesProducer(p, cubeBufferInfo);
        var parcls = require('./resources/blockguy.json');
        /*  var mydata= this.FetchText(parcls).then ((s: string)=> {
                console.log("mydata="+mydata +  " s="+s);
                var nodedescriptions: NodeJson = JSON.parse(s);
                this.scenetree = nodefact.makeNode(nodedescriptions);
                this.objects = nodefact.objects;
                this.objectsToDraw = nodefact.objectsToDraw;
                this.nodeInfosByName= nodefact.nodeInfosByName;
              });
          */
        var nodedescriptions = JSON.parse(this.sjson);
        this.scenetree = nodefact.makeNode(nodedescriptions);
        this.objects = nodefact.objects;
        this.objectsToDraw = nodefact.objectsToDraw;
        this.nodeInfosByName = nodefact.nodeInfosByName;
    }
    drawScene(gl, cam, time) {
        // check if JSon read and converted
        if (!this.nodeInfosByName)
            return;
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        /*
          // setup a fixed camera's projection matrix (Gregg's code)
          var projectionMatrix =
              m4.perspective(this.fieldOfViewRadians!, aspect, 1, 200);
          // setup the camera's matrix using look at.
          var cameraPosition = [14, 3.5, 10];
          var target = [0, 0.0, 0];
          var up = [0, 1, 0];
          var cameraMatrix = m4.lookAt(cameraPosition, target, up);
          // setup view matrix from the camera matrix.
          var viewMatrix = m4.inverse(cameraMatrix);
          var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
        */
        /*
            this.cameraPosition = (this.animationParameters?.b.move)? [Math.cos(time * 0.04 * this.animationParameters.b.speed) * 4.0, 0,
              Math.sin(time * 0.04 * this.animationParameters.b.speed) * 4.0]
        : [4.0,0.0,0.0];
        if (!this.animationParameters?.b.move)
        this.cameraPosition = cam?.Position() as [number,number,number]; // [cam?.Position()[0]!,cam?.Position()[1]!,cam?.Position()[2]!];
        */
        // setup a mouse-controlled camhandler camera
        var speed = 3;
        //cam.target = [this.cx, this.cy, this.cz];
        //cam.translateEye([this.vx*speed/4.0,this.vy*speed/4.0,this.vz*speed/4.0])
        var zNear = 1;
        var zFar = 2000;
        var fieldOfViewRadians = 40.0 * Math.PI / 180.0;
        var projectionMatrix = twgl_js_1.m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
        // Compute the camera's matrix
        var camera = cam.Position();
        var cameraMatrix = cam.lookAt; // Lx delegate task elsewhere m4.lookAt(camera, target, up);
        // Make a view matrix from the camera matrix.
        var viewMatrix = twgl_js_1.m4.inverse(cameraMatrix);
        // create a viewProjection matrix. This will both apply perspective
        // AND move the world so that the camera is effectively the origin
        var viewProjectionMatrix = cam.viewProjection; // m4.multiply(projectionMatrix, viewMatrix);
        // Animation
        var adjust;
        var c = time * 0.001 * speed;
        adjust = Math.abs(Math.sin(c));
        var nodeInfosByName = this.nodeInfosByName;
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
        var currentTranslation = twgl_js_1.m4.translation([this.cx, this.cy, this.cz]);
        this.scenetree.updateWorldMatrix(currentTranslation);
        this.cx += this.vx * speed / 4.0;
        this.cy += this.vy * speed / 4.0;
        this.cz += this.vz * speed / 4.0;
        // Compute all the matrices for rendering
        this.objects.forEach((object) => {
            object.drawInfo.uniforms.u_matrix = twgl_js_1.m4.multiply(viewProjectionMatrix, object.worldMatrix);
        });
        // Draw the objects
        twgl.drawObjectList(gl, this.objectsToDraw);
    }
}
exports.ObjectListScene = ObjectListScene;
//# sourceMappingURL=objectlistscene.js.map