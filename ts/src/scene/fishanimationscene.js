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
exports.FishAnimationScene = exports.hoard1 = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work
const twgl_js_1 = require("twgl.js");
//import * as animationclock from "../baseapp/animationclock";
const trajectory_1 = require("../trajectory/trajectory");
const boneanimation = __importStar(require("./../bonemodel/boneanimation"));
const fishwithjoints = __importStar(require("../bonemodel/fishwithjoints"));
const fishv = __importStar(require("./../bonemodel/fishv"));
const whale = __importStar(require("../bonemodel/whale"));
const fishonejoint = __importStar(require("../bonemodel/fishonejoint"));
const whaletranslated = __importStar(require("../bonemodel/whaletranslated"));
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
class hoard1 {
    constructor(defaultspeed) {
        this.traj = [];
        this.fish = [
            new whale.Whale("cloverwhale", 1.0, 0.2, 0.3, 0.8, 0.0085, 0.5, 2.50, "clover", [0, 0, 0]),
            new fishwithjoints.FishWithJoints("fishjN", 0.06, 40.0, 24.0, 0.0, 0.0055, -9999.0, 2.1, "gradient", [0, 0, 0], 0.6, [0.0, 0.0, 1.0]),
            new fishonejoint.FishOneJoint("fish1joint", 1.0, 2.0, 2.0, 0.1, 0.0045, 0.1, 0.5, "gradient", [0, 0, 0]),
            new fishv.FishV("largefishv", 0.5, 0.2, 0.3, 0.8, 0.0085, 0.5, 2.50, "flagofukraine", [0, 0, 0]),
            new whaletranslated.WhaleTranslated("whaletrans", 2.0, 2.0, 0.3, 0.8, 0.0016, 0.5, 2.0, "zelenskyy", [0, 0, 0]),
            new fishv.FishV("fishv", 0.25, 0.2, 0.3, 1.0, 0.0150, 0.5, 5.00, "flagofukraine", [0, 0, 0]),
        ];
        this.fishjointcounts = [1, 28, 1, 1, 1, 1, 1];
        this.fishpositionsV = [
            [twgl.v3.create(40.0, 20.0, 60.0)],
            [twgl.v3.create(65, 35, 0)],
            [twgl.v3.create(30.0, 30.0, -35.0)],
            [twgl.v3.create(70.0, 35.0, -15.0)],
            [twgl.v3.create(70.0, 15.0, 1.0)],
            [twgl.v3.create(20.0, 25.0, 0.0), twgl.v3.create(80.0, 35.0, 0.0), twgl.v3.create(30.0, 15.0, -30.0)],
        ];
        this.vx = -0.007;
        this.fishvelocitiesV = [
            [twgl.v3.create(this.vx, 0, 0)],
            [twgl.v3.create(this.vx, 0, 0)],
            [twgl.v3.create(this.vx, 0, 0)],
            [twgl.v3.create(this.vx, 0, 0)],
            [twgl.v3.create(this.vx, 0, 0)],
            [twgl.v3.create(this.vx, 0, 0), twgl.v3.create(this.vx * 2, 0, 0), twgl.v3.create(this.vx, 0, 0)],
        ];
        // Posture (rotation) matrices are kept for each fish and should change with direction while animating
        // When any velocity has changed in fishvelocitiesV, "change" is set to true for corresponding fish
        // a new matrix is generated in drawScene() from fisvelocitiesV and default posture [-1,0,0]
        this.fishmatricesR = [
            [{ inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }],
            [{ inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }],
            [{ inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }],
            [{ inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }],
            [{ inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }],
            [{ inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }, { inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }, { inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }],
        ];
        var path = [[0, 0, 0], [2, 0, 0], [0, 0, 0]];
        this.traj.push(new trajectory_1.Trajectory(path, defaultspeed, false));
        this.traj[0].testDump(400);
    }
}
exports.hoard1 = hoard1;
class FishAnimationScene {
    constructor(cgl, ch) {
        this.scenesize = 40;
        this.vertexShaderSource = ``;
        this.fragmentShaderSource = ``;
        this.firstframe = true;
        this.dtime = 0;
        this.vtime = 0;
        this.h = ch;
        FishAnimationScene.instance = this;
        //this.twglprograminfo = new Array(2);
        this.twglprograminfo = twgl.createProgramInfo(cgl, [boneanimation.BoneAnimation.vsSkeleton, boneanimation.BoneAnimation.fsSkeleton]);
    }
    resizeCanvas(gl) { twgl.resizeCanvasToDisplaySize(gl.canvas); }
    defaultCamera(gl, cam) { }
    extendGUI(gui) {
        gui.add(this.animationParameters, 'fov', 5.0, 85.0, 1.0);
        gui.add(this.animationParameters, 'movetail');
    }
    initScene(gl, cap, cam, dictpar, textureReadyCallback) {
        cap.camheight = 20;
        gl.useProgram(this.twglprograminfo.program);
        var nFish = 0;
        var time0 = 0;
        this.h.fish.forEach((afish) => {
            afish.prepareSurfaceTextures(gl, afish.surfacetexturefile);
            afish.mesh = afish.prepareMesh(gl, dictpar, afish.size);
            afish.setNumBones(gl);
            afish.createBoneTexture(gl, time0, dictpar);
            afish.createSurfaceTexture(gl);
            afish.uniforms = afish.createUniforms();
            afish.bufferInfo = twgl.createBufferInfoFromArrays(gl, afish.mesh.arrays);
            afish.skinVAO = twgl.createVAOFromBufferInfo(gl, this.twglprograminfo, afish.bufferInfo);
            nFish++;
            if (nFish == this.h.fish.length && textureReadyCallback != undefined)
                textureReadyCallback(0);
        });
    }
    anglebetween(vectora, vectorb) {
        var vector1 = twgl.v3.normalize(vectora);
        var vector2 = twgl.v3.normalize(vectorb);
        if (twgl.v3.distanceSq(vector1, vector2) < 1e-9)
            return 0.0;
        // if (twgl.v3.dot(vector1,vector2)<1e-9) return 0.0;
        var num = twgl.v3.dot(vector1, vector2);
        var vd1 = twgl.v3.subtract(vector1, vector2);
        var vd2 = twgl.v3.subtract([-vector1[0], -vector1[1], -vector1[2]], vector2);
        var l1 = twgl.v3.length(vd1);
        var l2 = twgl.v3.length(vd2);
        return ((!(num < 0.0)) ? (2.0 * Math.asin(l1 / 2.0)) : (Math.PI - 2.0 * Math.asin(l2 / 2.0)));
    }
    drawScene(gl, cam, time) {
        var velocitytrans;
        if (!this.firstframe) {
            this.dtime = time - this.vtime;
            //this.h.velocitytrans = twgl.m4.translation([this.h.vx*this.h.dtime,this.h.vy*this.h.dtime,this.h.vz*this.h.dtime]);  
        }
        gl.useProgram(this.twglprograminfo.program);
        for (var fishtype = 0; fishtype < this.h.fish.length; fishtype++)
            this.h.fish[fishtype].uniforms.viewprojection = cam.viewProjection;
        for (var fishtype = 0; fishtype < this.h.fishpositionsV.length; fishtype++) {
            gl.bindVertexArray(this.h.fish[fishtype].skinVAO);
            gl.bindTexture(gl.TEXTURE_2D, this.h.fish[fishtype].boneMatrixTexture);
            // since we want to use the texture for pure data we turn off filtering
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            var jointcount = this.h.fishjointcounts[fishtype];
            for (var cfish = 0; cfish < this.h.fishpositionsV[fishtype].length; cfish++) {
                // move
                var velo = this.h.fishvelocitiesV[fishtype][cfish];
                if (!this.firstframe)
                    velocitytrans = twgl.m4.translation([velo[0] * this.dtime, velo[1] * this.dtime, velo[2] * this.dtime]);
                else
                    velocitytrans = twgl_js_1.m4.identity();
                // posture
                var modeldir = [-1, 0, 0];
                var velonorm = twgl.v3.normalize(velo);
                var localmatrix = twgl_js_1.m4.identity();
                if (twgl.v3.distanceSq(modeldir, velonorm) < 1e-9)
                    localmatrix = twgl_js_1.m4.identity();
                else {
                    var axis = twgl.v3.cross(modeldir, velonorm);
                    var angle = this.anglebetween(modeldir, velonorm);
                    localmatrix = twgl_js_1.m4.axisRotation(axis, angle);
                }
                if (jointcount == 1) // single joint fish
                 {
                    this.h.fishpositionsV[fishtype][cfish] = twgl_js_1.m4.transformPoint(velocitytrans, this.h.fishpositionsV[fishtype][cfish]);
                    this.h.fish[fishtype].computeBone(time, this.animationParameters.move, this.animationParameters.movetail);
                    this.h.fish[fishtype].prepareBoneTexture(gl, this.h.fish[fishtype].bindPoseInv2); // freeform bones need to keep their initial transformations
                    this.h.fish[fishtype].uniforms.world = twgl_js_1.m4.multiply(twgl_js_1.m4.translation(this.h.fishpositionsV[fishtype][cfish]), localmatrix); // transformation for joint part depends on previous
                    twgl.setUniforms(this.twglprograminfo, this.h.fish[fishtype].uniforms);
                    twgl.drawBufferInfo(gl, this.h.fish[fishtype].bufferInfo, this.h.fish[fishtype].mesh.type);
                }
                else // multiple joint segments
                 {
                    this.h.fishpositionsV[fishtype][cfish] = twgl_js_1.m4.transformPoint(velocitytrans, this.h.fishpositionsV[fishtype][cfish]);
                    var ampl0 = this.h.fish[fishtype].ampl;
                    var sling = this.animationParameters.sling;
                    for (var i = 0; i < jointcount; i++) // there are fishjointcounts joints for this fish type
                     {
                        var timeoffs = i * sling;
                        var nx = i / jointcount;
                        this.h.fish[fishtype].ampl = ampl0 * nx;
                        this.h.fish[fishtype].computeJoint(time - timeoffs, this.animationParameters.move, this.animationParameters.movetail);
                        this.h.fish[fishtype].prepareBoneTexture(gl, null); // for a segment, bindPoseInv2 need not be set (null)
                        this.h.fish[fishtype].uniforms.world = twgl_js_1.m4.multiply(twgl_js_1.m4.translation(this.h.fishpositionsV[fishtype][cfish]), localmatrix); // transformation for joint part depends on previous joint
                        twgl.setUniforms(this.twglprograminfo, this.h.fish[fishtype].uniforms);
                        twgl.drawBufferInfo(gl, this.h.fish[fishtype].bufferInfo, this.h.fish[fishtype].mesh.type);
                        localmatrix = twgl_js_1.m4.multiply(localmatrix, this.h.fish[fishtype].EndOfBoneTrans); // stack the end-transformation of this segment into matrix cm         
                    }
                    this.h.fish[fishtype].ampl = ampl0;
                }
            }
            this.vtime = time;
            this.firstframe = false;
        }
    }
}
exports.FishAnimationScene = FishAnimationScene;
//# sourceMappingURL=fishanimationscene.js.map