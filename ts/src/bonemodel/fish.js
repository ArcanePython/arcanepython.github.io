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
exports.Fish = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work
const twgl_js_1 = require("twgl.js");
const stridedmesh = __importStar(require("./stridedmesh")); // mesh and bones (data)
const trianglesmesh = __importStar(require("./trianglesmesh")); // mesh and bones (data)
const boneanimation = __importStar(require("./boneanimation"));
class Fish extends boneanimation.BoneAnimation {
    constructor(name, size, r1, r2, phase0, deltaphase, arange, ampl, surfacetexturefile, v) {
        super(name);
        this.name = name;
        this.size = size;
        this.r1 = r1;
        this.r2 = r2;
        this.phase0 = phase0;
        this.deltaphase = deltaphase;
        this.arange = arange;
        this.ampl = ampl;
        this.surfacetexturefile = surfacetexturefile;
        this.v = v;
        this.EndOfBoneTrans = twgl_js_1.m4.identity();
    }
    computeBone(time, domove, domovetail) {
        const aphase = domovetail ? (this.mesh.bonediv * 0.01 * Math.PI * Math.sin(time * this.deltaphase)) : 0;
        this.computeBoneMatrices(this.bones, aphase + this.phase0); //, this.ampl, this.arange);     
    }
    computeJoint(time, domove, domovetail) {
        const aphase = domovetail ? (this.mesh.bonediv * 0.01 * Math.PI * Math.sin(time * this.deltaphase)) : 0;
        this.computeBoneMatrices(this.bones, aphase + this.phase0); //, this.ampl, this.arange);     
    }
    prepareMeshGen(gl, dictpar, name, scale, nrows, stride, fstrip, ftriangles) {
        this.scale = scale;
        var cmeshtype = this.stringDictPar(dictpar, "mesh", "strip");
        if (cmeshtype == "strip") {
            var tsmesh = new stridedmesh.StridedMesh(name, nrows, stride, scale, 0.20);
            tsmesh.arrays.position = fstrip(tsmesh.segmentsize, nrows, stride, dictpar);
            tsmesh.type = gl.TRIANGLE_STRIP;
            return tsmesh;
        }
        else {
            var trmesh = new trianglesmesh.StridedMesh(nrows, stride);
            trmesh.arrays.position = ftriangles(trmesh.segmentsize, nrows, stride, dictpar);
            trmesh.type = gl.TRIANGLES;
            return trmesh;
        }
    }
    prepareSurfaceTextures(gl, selectedSurface) {
        var gradientname = require("./../resources/models/stone/circlegradient.png");
        var clovername = require("./../resources/images/clover.jpg");
        var zelenskyyname = require("./../resources/models/stone/zelenskii.png");
        var flagofukrainname = require("./../resources/models/stone/flagofukraine.png");
        var textures = twgl.createTextures(gl, {
            checker: {
                mag: gl.NEAREST,
                min: gl.LINEAR,
                src: [255, 255, 255, 255, 192, 192, 192, 255,
                    92, 92, 92, 255, 255, 255, 255, 255,],
            },
            clover: { src: clovername },
            zelenskyy: { src: zelenskyyname },
            gradient: { src: gradientname },
            flagofukraine: { src: flagofukrainname },
        });
        if (selectedSurface == "clover")
            this.surfaceTexture = textures.clover;
        if (selectedSurface == "zelenskyy")
            this.surfaceTexture = textures.zelenskyy;
        if (selectedSurface == "checker")
            this.surfaceTexture = textures.checker;
        if (selectedSurface == "gradient")
            this.surfaceTexture = textures.gradient;
        if (selectedSurface == "flagofukraine")
            this.surfaceTexture = textures.flagofukraine;
        return textures;
    }
    createSurfaceTexture(gl) {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.surfaceTexture);
    }
    createBoneTexture(gl, time, dictpar) {
        gl.activeTexture(gl.TEXTURE0);
        this.prepareBoneMatrices(gl, dictpar);
        this.computeBone(time, false, false);
        this.bindPose = this.bones;
        this.bindPoseInv2 = this.prepareBoneInv(this.bindPose);
        this.EndOfBoneTrans = twgl_js_1.m4.identity();
    }
    createUniforms(gl, dictpar) {
        return {
            world: twgl_js_1.m4.identity(),
            projection: twgl_js_1.m4.identity(),
            viewprojection: twgl_js_1.m4.identity(),
            view: twgl_js_1.m4.translation([0.0, 0.0, 0.0]),
            surfaceTexture: this.surfaceTexture,
            boneMatrixTexture: this.boneMatrixTexture,
            color: [0.0, 0.0, 0.0, 0.0],
        };
    }
    numberDictPar(dictpar, parname, pardefault) {
        var spar;
        if ((spar = dictpar.get(parname)) != undefined)
            return +spar;
        return pardefault;
    }
    stringDictPar(dictpar, parname, pardefault) {
        var spar;
        if ((spar = dictpar.get(parname)) != undefined)
            return spar;
        return pardefault;
    }
}
exports.Fish = Fish;
//# sourceMappingURL=fish.js.map