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
exports.FishTrajectoryScene = exports.hoardsingle = exports.hoard2 = void 0;
// fishtrajectoryscene.ts
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
const twgl = __importStar(require("twgl.js"));
const twgl_js_1 = require("twgl.js");
const boneanimation = __importStar(require("./../bonemodel/boneanimation"));
const fishwithjoints = __importStar(require("../bonemodel/fishwithjoints"));
const fishv = __importStar(require("./../bonemodel/fishv"));
const whale = __importStar(require("../bonemodel/whale"));
const fishonejoint = __importStar(require("../bonemodel/fishonejoint"));
const whaletranslated = __importStar(require("../bonemodel/whaletranslated"));
const trajectory_1 = require("../trajectory/trajectory");
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
class hoard2 {
    constructor(defaultspeed) {
        this.traj = [];
        // shapes
        this.fish = [
            new whale.Whale("cloverwhale", 1.0, 0.2, 0.3, 0.8, 0.0085, 0.5, 2.50, "clover", [0, 0, 0]),
            new fishwithjoints.FishWithJoints("fishjN", 0.06, 0.0, 0.0, 0.0, 0.0055, -9999.0, 2.1, "gradient", [0, 0, 0], 0.6, [0.0, 0.0, 1.0]),
            new fishonejoint.FishOneJoint("fish1joint", 1.0, 2.0, 2.0, 0.1, 0.0045, 0.1, 0.5, "gradient", [0, 0, 0]),
            new fishv.FishV("largefishv", 0.5, 0.2, 0.3, 0.8, 0.0085, 0.5, 2.50, "flagofukraine", [0, 0, 0]),
            new whaletranslated.WhaleTranslated("whaletrans", 2.0, 2.0, 0.3, 0.8, 0.0016, 0.5, 2.0, "zelenskyy", [0, 0, 0]),
            new fishv.FishV("fishv", 0.25, 0.2, 0.3, 1.0, 0.0150, 0.5, 5.00, "flagofukraine", [0, 0, 0]),
        ];
        this.fishjointcounts = [1, 28, 1, 1, 1, 1, 1];
        // Velocity (move), values are set at start of scene. WHhen kept, fish keep move in directions indicated
        this.vx = -0.007;
        this.fishvelocitiesV = [
            [twgl.v3.create(this.vx, 0.003, 0)],
            [twgl.v3.create(-0.003, -0.0003, -0.003)],
            [twgl.v3.create(this.vx, 0, 0)],
            [twgl.v3.create(-0.003, -0.0003, -0.003), twgl.v3.create(this.vx, 0, 0)],
            [twgl.v3.create(this.vx, 0, 0)],
            [twgl.v3.create(this.vx, 0, 0), twgl.v3.create(this.vx, 0, 0), twgl.v3.create(this.vx, 0, 0)],
        ];
        // Position, values are set at start of scene and updated on every frame, according to fishvelocitiesV
        this.fishpositionsV = [
            [twgl.v3.create(40.0, 20.0, 60.0)],
            [twgl.v3.create(65, 35, 0)],
            [twgl.v3.create(30.0, 30.0, -35.0)],
            [twgl.v3.create(70.0, 35.0, -15.0), twgl.v3.create(40.0, 35.0, -15.0)],
            [twgl.v3.create(70.0, 15.0, 1.0)],
            [twgl.v3.create(20.0, 25.0, 0.0), twgl.v3.create(0.0, 15.0, 0.0), twgl.v3.create(30.0, 15.0, -30.0)],
        ];
        // Posture (rotation) matrices are kept for each fish and should change with direction while animating
        // When any velocity has changed in fishvelocitiesV, "change" is set to true for corresponding fish
        // a new matrix is generated in drawScene() from fisvelocitiesV and default posture [-1,0,0]
        this.fishmatricesR = [
            [{ inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }],
            [{ inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }],
            [{ inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }],
            [{ inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }, { inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }],
            [{ inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }],
            [{ inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }, { inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }, { inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }],
        ];
        var path = [[0, 0, 0], [2, 0, 0], [0, 0, 0]];
        this.traj.push(new trajectory_1.Trajectory(path, defaultspeed, false));
        this.traj[0].testDump(400);
    }
}
exports.hoard2 = hoard2;
class hoardsingle {
    constructor(defaultspeed) {
        this.traj = [];
        // shapes
        this.fish = [
            new fishv.FishV("largefishv1", 0.5, 0.2, 0.3, 0.8, 0.0225, 0.9, 2.50, "flagofukraine", [0, 0, 0]),
            new whaletranslated.WhaleTranslated("cloverwhale", 1.0, 0.2, 0.3, 0.6, 0.0085, 0.5, 2.50, "clover", [0, 0, 0]),
            new fishwithjoints.FishWithJoints("fishjN", 0.06, 40.0, 24.0, 0.0, 0.0055, -9999.0, 2.1, "gradient", [0, 0, 0], 0.6, [0.0, 0.0, 1.0]),
        ];
        this.fishjointcounts = [1, 1, 10];
        // Velocity (move), values are set at start of scene. WHhen kept, fish keep move in directions indicated
        this.vx = -0.007;
        this.fishvelocitiesV = [
            [twgl.v3.create(this.vx, 0.0, 0)],
            [twgl.v3.create(this.vx, 0.0, 0)],
            [twgl.v3.create(this.vx, 0.0, 0)],
        ];
        // Position, values are set at start of scene and updated on every frame, according to fishvelocitiesV
        this.fishpositionsV = [
            [twgl.v3.create(0.0, 18.0, 0.0)],
            [twgl.v3.create(30.0, 9.0, 0.0)],
            [twgl.v3.create(3 - 10.0, 19.0, 0.0)],
        ];
        // Posture (rotation) matrices are kept for each fish and should change with direction while animating
        // When any velocity has changed in fishvelocitiesV, "change" is set to true for corresponding fish
        // a new matrix is generated in drawScene() from fisvelocitiesV and default posture [-1,0,0]
        this.fishmatricesR = [
            [{ inxtraj: 0, change: true, matrix: twgl_js_1.m4.identity() }],
            [{ inxtraj: 1, change: true, matrix: twgl_js_1.m4.identity() }],
            [{ inxtraj: 2, change: true, matrix: twgl_js_1.m4.identity() }],
        ];
        var path = this.arcpath(200, 15, 20, 1.0 / 1.61);
        this.traj.push(new trajectory_1.Trajectory(path, 2.0 * defaultspeed, true));
        var path = this.arcpath(400, 80, 0, 1.0 / 1.61);
        this.traj.push(new trajectory_1.Trajectory(path, defaultspeed, true));
        var path = this.arcpath(400, 120, 0, 1.0);
        this.traj.push(new trajectory_1.Trajectory(path, defaultspeed, true));
    }
    arcpath(grain, r, rh, excen) {
        var h = 0;
        var dh = (Math.PI * 2.0) / grain;
        var path = [];
        for (var i = 0; i < grain; i++) {
            h += dh;
            path.push([r * Math.cos(h), rh * Math.cos(h), (r * excen) * Math.sin(h)]);
        }
        return path;
    }
}
exports.hoardsingle = hoardsingle;
//-------------------------------------------------------------------------------------------------------------------------------------------
class FishTrajectoryScene {
    constructor(cgl, ch) {
        this.scenesize = 140;
        this.vertexShaderSource = ``;
        this.fragmentShaderSource = ``;
        this.firstframe = true;
        this.dtime = 0;
        this.vtime = 0;
        this.h = ch;
        this.twglprograminfo = twgl.createProgramInfo(cgl, [boneanimation.BoneAnimation.vsSkeleton, boneanimation.BoneAnimation.fsSkeleton]);
    }
    resizeCanvas(gl) { twgl.resizeCanvasToDisplaySize(gl.canvas); }
    defaultCamera(gl, cam) { }
    extendGUI(gui) {
        gui.add(this.animationParameters, 'movetail');
    }
    initScene(gl, cap, cam, dictpar, textureReadyCallback) {
        gl.useProgram(this.twglprograminfo.program); // fish rendering program
        cap.move = false;
        cap.movetail = true;
        cap.showgrid = false;
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
        var num = twgl.v3.dot(vector1, vector2);
        var vd1 = twgl.v3.subtract(vector1, vector2);
        var vd2 = twgl.v3.subtract([-vector1[0], -vector1[1], -vector1[2]], vector2);
        var l1 = twgl.v3.length(vd1);
        var l2 = twgl.v3.length(vd2);
        return ((!(num < 0.0)) ? (2.0 * Math.asin(l1 / 2.0)) : (Math.PI - 2.0 * Math.asin(l2 / 2.0)));
    }
    drawScene(gl, cam, time) {
        gl.useProgram(this.twglprograminfo.program); // fish rendering program
        // set the same camera for each fish type
        for (var cfishtype = 0; cfishtype < this.h.fish.length; cfishtype++)
            this.h.fish[cfishtype].uniforms.viewprojection = cam.viewProjection;
        // update trajectory positions and velocity for current time
        // at 60Fps, value of dtime is ms between 9 and 22, nominal 16.66
        if (!this.firstframe)
            this.dtime = time - this.vtime;
        var trajpos = [];
        this.h.traj.forEach((t) => { trajpos.push(t.proceed(this.dtime)); });
        // for each fish type..
        for (var cfishtype = 0; cfishtype < this.h.fishpositionsV.length; cfishtype++) {
            // bind texture of this type
            gl.bindVertexArray(this.h.fish[cfishtype].skinVAO);
            gl.bindTexture(gl.TEXTURE_2D, this.h.fish[cfishtype].boneMatrixTexture);
            // since we want to use the texture for pure data we turn off filtering
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            // for each fish..
            for (var cfish = 0; cfish < this.h.fishpositionsV[cfishtype].length; cfish++) {
                // address matrix adm for this fish
                var ma = this.h.fishmatricesR[cfishtype][cfish];
                // address trajectory for this fish
                var inx = ma.inxtraj;
                // move (always done except on first frame)
                var velo = [0, 0, 0];
                var velocitytrans;
                velo = trajpos[inx].v;
                velocitytrans = twgl.m4.translation(velo = [velo[0] * this.dtime, velo[1] * this.dtime, velo[2] * this.dtime]);
                ma.change = trajpos[inx].change;
                // posture (done when direction is changed)
                if (ma.change) {
                    if (inx > 0) { } // console.log("change "+trajpos[inx].v+" to "+trajpos[inx].v); }
                    var modeldir = [-1, 0, 0];
                    var localmatrix = twgl_js_1.m4.identity();
                    var velonorm = twgl.v3.normalize(velo);
                    if (twgl.v3.distanceSq(modeldir, velonorm) > 1e-9) {
                        var axis = twgl.v3.cross(modeldir, velonorm);
                        var angle = this.anglebetween(modeldir, velonorm);
                        localmatrix = twgl_js_1.m4.axisRotation(axis, angle);
                    }
                    ma.matrix = localmatrix;
                    ma.change = false;
                }
                // draw it
                this.drawFish(gl, time, ma.matrix, cfishtype, cfish, inx, trajpos);
            }
        }
        this.vtime = time;
        this.firstframe = false;
    }
    drawFish(gl, time, localmatrix, cfishtype, cfish, trajinx, trajpos) {
        var jointcount = this.h.fishjointcounts[cfishtype];
        var fishtype = this.h.fish[cfishtype];
        var cpos = this.h.fishpositionsV[cfishtype][cfish] = trajpos[trajinx].p;
        if (jointcount == 1) // single joint fish
         {
            fishtype.computeBone(time, this.animationParameters.move, this.animationParameters.movetail);
            fishtype.prepareBoneTexture(gl, fishtype.bindPoseInv2); // freeform bones need to keep their initial transformations
            fishtype.uniforms.world = twgl_js_1.m4.multiply(twgl_js_1.m4.translation(cpos), localmatrix); // transformation for joint part depends on previous
            twgl.setUniforms(this.twglprograminfo, fishtype.uniforms);
            twgl.drawBufferInfo(gl, fishtype.bufferInfo, fishtype.mesh.type);
        }
        else // multiple joint segments
         {
            var ampl0 = fishtype.ampl;
            var sling = this.animationParameters.sling;
            var cmatrix = localmatrix;
            for (var i = 0; i < jointcount; i++) // there are fishjointcounts joints for this fish type
             {
                var timeoffs = i * sling;
                var nx = i / jointcount;
                fishtype.ampl = ampl0 * nx;
                fishtype.computeJoint(time - timeoffs, this.animationParameters.move, this.animationParameters.movetail);
                fishtype.prepareBoneTexture(gl, null); // for a segment, bindPoseInv2 need not be set (null)                           
                fishtype.uniforms.world = twgl_js_1.m4.multiply(twgl_js_1.m4.translation(cpos), cmatrix); // transformation for joint part depends on previous joint
                twgl.setUniforms(this.twglprograminfo, fishtype.uniforms);
                twgl.drawBufferInfo(gl, fishtype.bufferInfo, fishtype.mesh.type);
                cmatrix = twgl_js_1.m4.multiply(cmatrix, fishtype.EndOfBoneTrans); // stack the end-transformation of this segment into matrix cm         
            }
            fishtype.ampl = ampl0;
        }
    }
}
exports.FishTrajectoryScene = FishTrajectoryScene;
//# sourceMappingURL=fishtrajectoryscene.js.map