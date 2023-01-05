"use strict";
//import * as twgl from "./../node_modules/twgl.js";    // Greg's work
//import { m4 } from "./../node_modules/twgl.js";
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
exports.SkeletonScene = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work
const twgl_js_1 = require("twgl.js");
//import * as stridedmesh0 from "./stridedmesh0" // mesh and bones (data)
const boneanimation = __importStar(require("./../bonemodel/boneanimation"));
//import { FishV } from "../bonemodel/fishv";
const fishvtranslated_1 = require("../bonemodel/fishvtranslated");
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
twgl.setAttributePrefix("a_");
class SkeletonScene {
    constructor(cgl, capp, dictpar, cdiv) {
        // SceneInterface only, skybox is shown in animation container (now animation1.ts)
        this.scenesize = 40;
        this.sceneenv = 2;
        this.vertexShaderSource = ``;
        this.fragmentShaderSource = ``;
        this.twglprograminfo = null;
        this.skeletonParameters = {
            move: false,
            movetail: true,
            speed: 0.4,
            texture: 'geotriangle2',
            color0: "#00A000",
        };
        this.bufferInfo = null;
        this.skinVAO = null;
        this.phase0 = 0.0; //2.0; // 143 degrees 
        //------------------------------------------------------------------------------------------------------------
        this.gui = null;
        // super(cgl, capp, dictpar, cdiv);
        SkeletonScene.instance = this;
        this.twglprograminfo = new Array(2);
        this.twglprograminfo[1] = twgl.createProgramInfo(cgl, [boneanimation.vsSkeleton, boneanimation.fsSkeleton]);
    }
    resizeCanvas(gl) { twgl.resizeCanvasToDisplaySize(gl.canvas); }
    defaultCamera(gl, cam) { }
    extendGUI(gui) { }
    // main(gl: WebGL2RenderingContext,  dictpar:Map<string,string>)
    initScene(gl, cap, dictpar, p, textureReadyCallback) {
        var time0 = 0;
        // super.maininfo(gl, dictpar,boneanimation.vsSkeleton, boneanimation.fsSkeleton );
        var spar;
        if ((spar = dictpar.get("phase2")) != undefined)
            this.phase0 = +spar;
        this.afish = new fishvtranslated_1.FishVTranslated(1.0, 0.2, 0.3, 0.0, 1.0, 0.005, 0.5, 2.5, "zelenskyy");
        this.afish.forwardspeed = (this.skeletonParameters.move) ? 0.06 : 0.0;
        this.afish.prepareSurfaceTextures(gl, "zelenskyy");
        this.afish.mesh = this.afish.prepareMesh(gl, dictpar, 1.0);
        this.afish.numBones = (this.afish.mesh.type == gl.TRIANGLE_STRIP) ? (this.afish.mesh.nsegments / this.afish.mesh.bonediv) : this.afish.mesh.nsegments;
        this.afish.createBoneTexture(gl, time0, dictpar);
        this.afish.createSurfaceTexture(gl);
        this.uniforms = this.afish.createUniforms(gl, dictpar); // this.phase0);
        this.bufferInfo = twgl.createBufferInfoFromArrays(gl, this.afish.mesh.arrays);
        this.skinVAO = twgl.createVAOFromBufferInfo(gl, this.twglprograminfo[1], this.bufferInfo);
        textureReadyCallback(0);
        //    this.cam=camhandler.Camera.createCamera(gl,dictpar!, camhandler.Camera.CamZUp, 50.0, cap);
        //      this.cam.zoominVelocity = 0.5;
        //      requestAnimationFrame(() => this.render(time0));   
    }
    onChangeColorValue(value) {
        //console.log("we are in color=["+value+"]");
        /*    var thisinstance = SkeletonScene.instance!;
            if (thisinstance.gl!=null)
            {
              var cc = (thisinstance.gl!.canvas as HTMLCanvasElement).parentNode;
              var ccd= (cc as HTMLDivElement);
              ccd.style.backgroundColor =  value;
            }
            */
    }
    /*
        public initGUI(parameters: {move:boolean, movetail:boolean,speed:number, texture:string, color0:string})
        {
          this.skeletonParameters = parameters;
    
          var cc = (this.gl!.canvas as HTMLCanvasElement).parentNode;
          var ccd= (cc as HTMLDivElement);
          ccd.style.backgroundColor =  this.skeletonParameters.color0;
      
          // park the dat.gui box in the linksdiv below the links, in closed state
          var gui = new datgui.GUI( { autoPlace: false } );
          gui.domElement.id = 'gui_drawimagespace';
          document.getElementById("linksdiv")!.append( gui.domElement);
          gui.close();
    
          // connect viewmodel
          gui.remember(parameters); //this.fishAnimationParameters);
        
          // Checkbox forward move animation on/off
          gui.add(parameters, 'move'); //this.fishAnimationParameters, 'move');
          // Checkbox tail animation on/off
          gui.add(parameters, 'movetail');
        
          // Slider for animation speed
          gui.add(parameters, 'speed').min(0.02).max(0.1).step(0.002);
      
          // Color dialog sets background color
          var cel3 = gui.addColor(parameters, 'color0');
          cel3.onChange( this.onChangeColorValue);
            
          gui.updateDisplay();
          return gui;
        }
      */
    //------------------------------------------------------------------------------------------------------------------------------------
    drawScene(gl, cam, time) {
        /*   var gl = this.gl!;
           gl.useProgram(this.twglprograminfo![1].program);
           twgl.resizeCanvasToDisplaySize(gl.canvas  as HTMLCanvasElement);
           gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height);
           gl.enable(gl.DEPTH_TEST);
           gl.enable(gl.CULL_FACE);
         
           var cam: camhandler.Camera = this.cam!;
           cam.CamHandlingZUp(gl, this.app!, 1.0, -1.0);
        */
        var uniforms = this.uniforms;
        uniforms.viewprojection = cam.viewProjection;
        gl.bindVertexArray(this.skinVAO);
        this.afish.forwardspeed = (this.skeletonParameters.move) ? (this.skeletonParameters.speed) : 0.0;
        this.afish.computeBone(time, this.skeletonParameters.move, this.skeletonParameters.movetail);
        this.afish.prepareBoneTexture(gl, this.afish.bindPoseInv2);
        uniforms.world = twgl_js_1.m4.translate(twgl_js_1.m4.identity(), [20.0, -20.0, 0.0]); // draw a fish
        twgl.setUniforms(this.twglprograminfo[1], uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo, this.afish.mesh.type);
        uniforms.world = twgl_js_1.m4.translate(twgl_js_1.m4.identity(), [-15.0, 0.0, 0.0]); // draw a fish
        twgl.setUniforms(this.twglprograminfo[1], uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo, this.afish.mesh.type);
        this.afish.computeBone(time, this.skeletonParameters.move, this.skeletonParameters.movetail);
        this.afish.prepareBoneTexture(gl, this.afish.bindPoseInv2);
        uniforms.world = twgl_js_1.m4.translate(twgl_js_1.m4.identity(), [50.0, -10.0, 10.0]); // draw a fish    
        twgl.setUniforms(this.twglprograminfo[1], uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo, this.afish.mesh.type);
        uniforms.world = twgl_js_1.m4.translate(twgl_js_1.m4.identity(), [-50.0, 5.0, -10.0]); // draw a fish
        twgl.setUniforms(this.twglprograminfo[1], uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo, this.afish.mesh.type);
        //  requestAnimationFrame(() => this.render(++time));       
    }
}
exports.SkeletonScene = SkeletonScene;
//# sourceMappingURL=skeletonscene.js.map