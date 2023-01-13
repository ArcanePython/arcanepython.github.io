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
exports.FishAnimationScene = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work
const twgl_js_1 = require("twgl.js");
const animationclock = __importStar(require("../baseapp/animationclock"));
const boneanimation = __importStar(require("./../bonemodel/boneanimation"));
const fishonejoint = __importStar(require("./../bonemodel/fishonejoint"));
const fishv = __importStar(require("./../bonemodel/fishv"));
const fishhrotated = __importStar(require("./../bonemodel/fishhrotated"));
const fishvtranslated = __importStar(require("./../bonemodel/fishvtranslated"));
const fishhtranslated = __importStar(require("./../bonemodel/fishhtranslated"));
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
class FishAnimationScene {
    constructor(cgl) {
        this.scenesize = 40;
        this.sceneenv = 2;
        this.vertexShaderSource = ``;
        this.fragmentShaderSource = ``;
        this.fish = [
            new fishvtranslated.FishVTranslated(4.0, 2.0, 0.3, 0.03, 0.8, 0.0016, 0.5, 2.0, "zelenskyy"),
            new fishonejoint.FishOneJoint(0.06, 40.0, 24.0, 0.03, 0.0, 0.0055, -9999.0, 2.1, "gradient", 0.6, [0.0, 0.0, 1.0]),
            new fishhrotated.FishHRotated(0.5, 2.0, 2.0, 0.03, 0.1, 0.045, 0.1, 0.5, "gradient"),
            new fishv.FishV(0.2, 0.2, 0.3, 0.03, 1.0, 0.0150, 0.5, 5.00, "flagofukraine"),
            new fishhtranslated.FishHTranslated(0.3, 0.2, 0.3, 0.03, 0.8, 0.0085, 0.5, 2.50, "clover")
        ];
        this.fishjointcounts = [1, 28, 1, 1, 1];
        this.fishpositions = [
            [[-60.0, 10.0, 60.0]],
            [[-45, -15, 0]],
            [[-30.0, -15.0, -35.0]],
            [[-10.0, -5.0, 0.0], [20.0, -5.0, 0.0], [-10.0, -5.0, -30.0]],
            [[-50.0, -10.0, 1.0]]
        ];
        this.clock = new animationclock.AnimationClock();
        FishAnimationScene.instance = this;
        //this.twglprograminfo = new Array(2);
        this.twglprograminfo = twgl.createProgramInfo(cgl, [boneanimation.vsSkeleton, boneanimation.fsSkeleton]);
    }
    resizeCanvas(gl) { twgl.resizeCanvasToDisplaySize(gl.canvas); }
    defaultCamera(gl, cam) { }
    extendGUI(gui) {
        gui.add(this.animationParameters, 'fov', 5.0, 85.0, 1.0);
        gui.add(this.animationParameters, 'movetail');
    }
    initScene(gl, cap, cam, dictpar, textureReadyCallback) {
        gl.useProgram(this.twglprograminfo.program);
        var nFish = 0;
        var time0 = 0;
        this.fish.forEach((afish) => {
            afish.prepareSurfaceTextures(gl, afish.surfacetexturefile);
            afish.mesh = afish.prepareMesh(gl, dictpar, afish.size);
            afish.setNumBones(gl);
            afish.createBoneTexture(gl, time0, dictpar);
            afish.createSurfaceTexture(gl);
            afish.uniforms = afish.createUniforms(gl, dictpar);
            afish.bufferInfo = twgl.createBufferInfoFromArrays(gl, afish.mesh.arrays);
            afish.skinVAO = twgl.createVAOFromBufferInfo(gl, this.twglprograminfo, afish.bufferInfo);
            nFish++;
            if (nFish == this.fish.length && textureReadyCallback != undefined)
                textureReadyCallback(0);
            //  textureReadyCallback(0);
        });
    }
    drawScene(gl, cam, time) {
        gl.useProgram(this.twglprograminfo.program);
        for (var fishtype = 0; fishtype < this.fish.length; fishtype++)
            this.fish[fishtype].uniforms.viewprojection = cam.viewProjection;
        for (var fishtype = 0; fishtype < this.fish.length; fishtype++) {
            gl.bindVertexArray(this.fish[fishtype].skinVAO);
            this.fish[fishtype].forwardspeed = this.animationParameters.move ? this.animationParameters.speed : 0.0;
            for (var cfish = 0; cfish < this.fishpositions[fishtype].length; cfish++) {
                if (this.fishjointcounts[fishtype] == 1) // single joint fish
                 {
                    this.fish[fishtype].computeBone(time, this.animationParameters.move, this.animationParameters.movetail);
                    this.fish[fishtype].prepareBoneTexture(gl, this.fish[fishtype].bindPoseInv2); // freeform bones need to keep their initial transformations
                    this.fish[fishtype].uniforms.world = twgl_js_1.m4.translation(this.fishpositions[fishtype][cfish]); // draw a fish at some position
                    twgl.setUniforms(this.twglprograminfo, this.fish[fishtype].uniforms);
                    twgl.drawBufferInfo(gl, this.fish[fishtype].bufferInfo, this.fish[fishtype].mesh.type);
                }
                else // multiple joint segments
                 {
                    var localmatrix = twgl_js_1.m4.translation(this.fishpositions[fishtype][cfish]); // start transforming origin of joint #0 to fish position
                    var ampl0 = this.fish[fishtype].ampl;
                    var sling = this.animationParameters.sling;
                    for (var i = 0; i < this.fishjointcounts[fishtype]; i++) // there are fishjointcounts joints for this fish type
                     {
                        var timeoffs = i * sling;
                        var nx = i / this.fishjointcounts[fishtype];
                        this.fish[fishtype].ampl = ampl0 * nx;
                        this.fish[fishtype].computeBone(time - timeoffs, this.animationParameters.move, this.animationParameters.movetail);
                        this.fish[fishtype].prepareBoneTexture(gl, null); // for a segment, bindPoseInv2 need not be set (null)
                        this.fish[fishtype].uniforms.world = localmatrix; // transformation for joint part depends on previous joint
                        twgl.setUniforms(this.twglprograminfo, this.fish[fishtype].uniforms);
                        twgl.drawBufferInfo(gl, this.fish[fishtype].bufferInfo, this.fish[fishtype].mesh.type);
                        localmatrix = twgl_js_1.m4.multiply(localmatrix, this.fish[fishtype].EndOfBoneTrans); // stack the end-transformation of this segment into matrix cm         
                    }
                    this.fish[fishtype].ampl = ampl0;
                }
            }
        }
    }
}
exports.FishAnimationScene = FishAnimationScene;
//# sourceMappingURL=fishanimationscene.js.map