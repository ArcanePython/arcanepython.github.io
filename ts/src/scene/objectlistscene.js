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
        this.speedpreset = 0.02;
        // state
        this.cx = 0;
        this.cy = 0;
        this.cz = 10;
        this.vx = 0.0;
        this.vy = 0;
        this.vz = 0.0;
        this.sjson = `{
  "draw": false,
  "name": "point between feet",
  "scaling": [1,1,1],
  "translation":[0,0,0],
  "children": [
    {
       "draw": true,
       "name": "waist",
       "scaling": [1,1,1],
       "translation": [0, 0, 0],
       "children": [
         {
           "draw": true,
           "name": "torso",
           "scaling": [1,1,1],
           "translation": [0, 2, 0],
           "children": [
             {
               "draw": true,
               "name": "neck",
               "scaling": [1,1,1],
               "translation": [0, 1, 0],
               "children": [
                 {
                   "draw": true,
                   "name": "head",
                   "scaling": [1,1,1],
                   "translation": [0, 1, 0],
                   "children": []
                 }
               ]
             },
             {
               "draw": true,
               "name": "left-arm",
               "scaling": [1,1,1],
               "translation": [-1, 0, 0],
               "children": [
                 {
                   "draw": true,
                   "name": "left-forearm",
                   "scaling": [1,1,1],
                   "translation": [-1, 0, 0],
                   "children": [
                     {
                       "draw": true,
                       "name": "left-hand",
                       "scaling": [1,1,1],
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
               "scaling": [1,1,1],
               "translation": [1, 0, 0],
               "children": [
                 {
                   "draw": true,
                   "name": "right-forearm",
                   "scaling": [1,1,1],
                   "translation": [1, 0, 0],
                   "children": [
                     {
                       "draw": true,
                       "name": "right-hand",
                       "scaling": [1,1,1],
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
               "scaling": [1,1,1],
               "translation": [0, -1, 0],
               "children": [
                 {
                   "draw": true,
                   "name": "left-foot",
                   "scaling": [1,1,1],
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
           "scaling": [1,1,1],
           "translation": [1, -1, 0],
           "children": [
             {
               "draw": true,
               "name": "right-calf",
               "scaling": [1,1,1],
               "translation": [0, -1, 0],
               "children": [
                 {
                   "draw": true,
                   "name": "right-foot",
                   "scaling": [1,1,1],
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
    initScene(gl, cap, dictpar, p, sceneReadyCallback) {
        this.gl = gl;
        this.animationParameters = (this.animationParameters == undefined) ? cap : this.animationParameters;
        if (dictpar === null || dictpar === void 0 ? void 0 : dictpar.has("speed")) {
            this.animationParameters.b.speed = +(dictpar === null || dictpar === void 0 ? void 0 : dictpar.get("speed"));
            console.log("specified: speedpreset=" + this.animationParameters.b.speed);
        }
        else
            console.log("not specified: speedpreset");
        // if (this.speedpreset) this.animationParameters!.b.speed = this.speedpreset!;
        this.fieldOfViewRadians = (60.0 * Math.PI / 180);
        var cBufferInfo = twgl.primitives.createCubeBufferInfo(gl, 1.0); // create the cube
        // spheres
        // var cBufferInfo = twgl.primitives.createSphereBufferInfo(gl, 0.5, 12,12);      
        this.nodeInfosByName = undefined;
        var nodefact = new objectnode.NodesProducer(p, cBufferInfo);
        var parcls = require('./../resources/blockguy.json');
        var nodedescriptions = JSON.parse(this.sjson);
        this.scenetree = nodefact.makeNode(nodedescriptions); // -Math.PI/4.0);
        this.objects = nodefact.objects;
        this.objectsToDraw = nodefact.objectsToDraw;
        this.nodeInfosByName = nodefact.nodeInfosByName;
        sceneReadyCallback(0);
        /*
        this.FetchText(parcls).then ((s: string)=> {
             var nodedescriptions: NodeJson = JSON.parse(s);
              this.scenetree = nodefact.makeNode(nodedescriptions);
              this.objects = nodefact.objects;
              this.objectsToDraw = nodefact.objectsToDraw;
              this.nodeInfosByName= nodefact.nodeInfosByName;
              sceneReadyCallback(0);
            });
          */
    }
    setRotationAdjust(ni, name, axis, adjust) {
        if (ni[name] != undefined)
            ni[name].trs.rotation[axis] = adjust;
    }
    drawScene(gl, cam, time) {
        var _a;
        var speed = 1;
        var viewProjectionMatrix = cam.viewProjection; // m4.multiply(projectionMatrix, viewMatrix);
        // Animation
        var adjust;
        var c = time * 0.003 * speed;
        adjust = Math.abs(Math.sin(c));
        var nodeInfosByName = this.nodeInfosByName;
        nodeInfosByName["point between feet"].trs.translation[1] = adjust;
        this.setRotationAdjust(nodeInfosByName, "point between feet", 1, 0.0); //Math.atan2(this.vx, this.vz));
        adjust = Math.sin(c);
        this.setRotationAdjust(nodeInfosByName, "left-leg", 0, adjust);
        this.setRotationAdjust(nodeInfosByName, "right-leg", 0, -adjust);
        adjust = Math.sin(c + 0.1) * 0.4;
        this.setRotationAdjust(nodeInfosByName, "left-calf", 0, -adjust);
        this.setRotationAdjust(nodeInfosByName, "right-calf", 0, adjust);
        adjust = Math.sin(c + 0.1) * 0.4;
        this.setRotationAdjust(nodeInfosByName, "left-foot", 0, -adjust);
        this.setRotationAdjust(nodeInfosByName, "right-foot", 0, adjust);
        adjust = Math.sin(c) * 0.4;
        this.setRotationAdjust(nodeInfosByName, "left-arm", 2, adjust);
        this.setRotationAdjust(nodeInfosByName, "right-arm", 2, adjust);
        adjust = Math.sin(c + 0.1) * 0.4;
        this.setRotationAdjust(nodeInfosByName, "left-forearm", 2, adjust);
        this.setRotationAdjust(nodeInfosByName, "right-forearm", 2, adjust);
        adjust = Math.sin(c - 0.1) * 0.4;
        this.setRotationAdjust(nodeInfosByName, "left-hand", 2, adjust);
        this.setRotationAdjust(nodeInfosByName, "right-hand", 2, adjust);
        adjust = Math.sin(c) * 0.4;
        this.setRotationAdjust(nodeInfosByName, "waist", 1, adjust);
        adjust = Math.sin(c) * 0.2;
        this.setRotationAdjust(nodeInfosByName, "torso", 1, adjust);
        adjust = Math.sin(c + 0.25) * 0.4;
        this.setRotationAdjust(nodeInfosByName, "neck", 1, adjust);
        adjust = Math.sin(c + 0.5) * 0.4;
        this.setRotationAdjust(nodeInfosByName, "head", 1, adjust);
        adjust = Math.cos(c * 2) * 0.4;
        this.setRotationAdjust(nodeInfosByName, "head", 0, adjust);
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
        // Draw the objects using Gregg's drawObjectList (this will clear the background)
        twgl.drawObjectList(gl, this.objectsToDraw);
        //
        // below code to spell out drawObjectList to find the cause of the clear issue
        //
        return;
        var init = false;
        // ->drawObjectList replacement..
        // draw each object using drawBufferInfo()
        //  this.objectsToDraw.forEach(d => {  
        //    .. best construct, but I need a break, so..
        for (var i = 0; i < this.objectsToDraw.length; i++) {
            var d = this.objectsToDraw[i];
            // gl.useProgram(d.programInfo.program); // no effect
            twgl.setUniforms(d.programInfo, d.uniforms); // ok
            // needed, but inserting this one will clear the background!
            twgl.setBuffersAndAttributes(gl, d.programInfo, d.bufferInfo);
            /*
              // -> "setBuffersAndAttributes" replace
              // (marked obsolete, not published) twgl.setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
              // setAttributes written out..
              // leaving this out.. will not clear the background, but draw faulty geometry!
              if (init)
                for (var name in d.bufferInfo!.attribs) {
                  var setter = d.programInfo.attribSetters[name];
                  if (setter)
                  { // a_position
                    //console.log("set  "+name +"="+d.bufferInfo!.attribs[name]);
                    setter!(d.bufferInfo!.attribs[name]); // even if called once, inserting this will clear the background!
                  }
                }
              init=false;
      
              // ok, needed
              if (d.bufferInfo?.indices) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, d.bufferInfo?.indices);
              }
              */
            // <- "setBuffersAndAttributes"
            //break; // doesn't matter! background is cleared on the second draw
            twgl.drawBufferInfo(gl, d.bufferInfo, gl.TRIANGLES, (_a = d.bufferInfo) === null || _a === void 0 ? void 0 : _a.numElements, 0, undefined);
            //break
        }
        ;
    }
}
exports.ObjectListScene = ObjectListScene;
//# sourceMappingURL=objectlistscene.js.map