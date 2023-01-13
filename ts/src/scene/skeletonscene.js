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
class SkeletonScene {
    constructor(cgl) {
        // SceneInterface only, skybox is shown in animation container (now animation1.ts)
        this.scenesize = 40;
        this.sceneenv = 2;
        this.vertexShaderSource = ``;
        this.fragmentShaderSource = ``;
        this.bufferInfo = null;
        this.skinVAO = null;
        this.phase0 = 0.0; //2.0; // 143 degrees 
        // super(cgl, capp, dictpar, cdiv);
        SkeletonScene.instance = this;
        this.twglprograminfo = twgl.createProgramInfo(cgl, [boneanimation.vsSkeleton, boneanimation.fsSkeleton]);
    }
    resizeCanvas(gl) { twgl.resizeCanvasToDisplaySize(gl.canvas); }
    defaultCamera(gl, cam) { }
    extendGUI(gui) {
        gui.add(this.animationParameters, 'fov', 5.0, 85.0, 1.0);
        gui.add(this.animationParameters, 'movetail');
    }
    // main(gl: WebGL2RenderingContext,  dictpar:Map<string,string>)
    initScene(gl, cap, cam, dictpar, textureReadyCallback) {
        gl.useProgram(this.twglprograminfo.program);
        var time0 = 0;
        // super.maininfo(gl, dictpar,boneanimation.vsSkeleton, boneanimation.fsSkeleton );
        var spar;
        if ((spar = dictpar.get("phase2")) != undefined)
            this.phase0 = +spar;
        this.afish = new fishvtranslated_1.FishVTranslated(1.0, 0.2, 0.3, 0.0, 1.0, 0.005, 0.5, 2.5, "zelenskyy");
        this.afish.forwardspeed = 0.0; //(this.skeletonParameters.move)?0.06:0.0;
        this.afish.prepareSurfaceTextures(gl, "zelenskyy");
        this.afish.mesh = this.afish.prepareMesh(gl, dictpar, 1.0);
        this.afish.numBones = (this.afish.mesh.type == gl.TRIANGLE_STRIP) ? (this.afish.mesh.nsegments / this.afish.mesh.bonediv) : this.afish.mesh.nsegments;
        this.afish.createBoneTexture(gl, time0, dictpar);
        this.afish.createSurfaceTexture(gl);
        this.uniforms = this.afish.createUniforms(gl, dictpar); // this.phase0);
        this.bufferInfo = twgl.createBufferInfoFromArrays(gl, this.afish.mesh.arrays);
        this.skinVAO = twgl.createVAOFromBufferInfo(gl, this.twglprograminfo, this.bufferInfo);
        if (textureReadyCallback != undefined)
            textureReadyCallback(0);
    }
    //------------------------------------------------------------------------------------------------------------------------------------
    drawScene(gl, cam, time) {
        gl.useProgram(this.twglprograminfo.program);
        var uniforms = this.uniforms;
        uniforms.viewprojection = cam.viewProjection;
        gl.bindVertexArray(this.skinVAO);
        this.afish.forwardspeed = 0.0; //(this.skeletonParameters!.move)?(this.animationParameters!.b.speed):0.0;
        this.afish.computeBone(time, false, this.animationParameters.movetail);
        this.afish.prepareBoneTexture(gl, this.afish.bindPoseInv2);
        uniforms.world = twgl_js_1.m4.translate(twgl_js_1.m4.identity(), [20.0, -20.0, 0.0]); // draw a fish
        twgl.setUniforms(this.twglprograminfo, uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo, this.afish.mesh.type);
        uniforms.world = twgl_js_1.m4.translate(twgl_js_1.m4.identity(), [-15.0, 0.0, 0.0]); // draw a fish
        twgl.setUniforms(this.twglprograminfo, uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo, this.afish.mesh.type);
        this.afish.computeBone(time, false, this.animationParameters.movetail);
        this.afish.prepareBoneTexture(gl, this.afish.bindPoseInv2);
        uniforms.world = twgl_js_1.m4.translate(twgl_js_1.m4.identity(), [50.0, -10.0, 10.0]); // draw a fish    
        twgl.setUniforms(this.twglprograminfo, uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo, this.afish.mesh.type);
        uniforms.world = twgl_js_1.m4.translate(twgl_js_1.m4.identity(), [-50.0, 5.0, -10.0]); // draw a fish
        twgl.setUniforms(this.twglprograminfo, uniforms);
        twgl.drawBufferInfo(gl, this.bufferInfo, this.afish.mesh.type);
    }
}
exports.SkeletonScene = SkeletonScene;
//# sourceMappingURL=skeletonscene.js.map