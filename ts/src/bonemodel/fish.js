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
exports.FishOneJoint = exports.FishHRotated = exports.FishV = exports.FishHTranslated = exports.Fish = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work
const twgl_js_1 = require("twgl.js");
const stridedmesh = __importStar(require("./stridedmesh")); // mesh and bones (data)
const trianglesmesh = __importStar(require("./trianglesmesh")); // mesh and bones (data)
const boneanimation = __importStar(require("./boneanimation"));
// type Meshproducer = (numrows: number, stride: number, scale: number) => {
//   numComponents: number;
//   data: Float32Array;
//  };
class Fish extends boneanimation.BoneAnimation {
    constructor(size, r1, r2, forwardspeed, phase0, deltaphase, arange, ampl, surfacetexturefile) {
        super();
        this.size = size;
        this.r1 = r1;
        this.r2 = r2;
        this.forwardspeed = forwardspeed;
        this.phase0 = phase0;
        this.deltaphase = deltaphase;
        this.arange = arange;
        this.ampl = ampl;
        this.surfacetexturefile = surfacetexturefile;
        this.EndOfBoneTrans = twgl_js_1.m4.identity();
    }
    computeBone(time, domove, domovetail) {
        const aphase = domovetail ? (this.mesh.bonediv * 0.01 * Math.PI * Math.sin(time * this.deltaphase)) : 0;
        this.computeBoneMatrices(this.bones, aphase + this.phase0); //, this.ampl, this.arange);     
    }
    prepareSurfaceTextures(gl, selectedSurface) {
        var gradientname = require("./../resources/models/stone/circlegradient.png");
        var clovername = require("./../images/clover.jpg");
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
//--- VARIOUS TYPES OF FISH COME HERE ----------------------------------------------------------------------------
class FishHTranslated extends Fish {
    prepareMesh(gl, dictpar, scale) {
        this.scale = scale;
        var cstride = this.numberDictPar(dictpar, "stride", 80);
        var cnumrows = this.numberDictPar(dictpar, "numrows", 80);
        var cmeshtype = this.stringDictPar(dictpar, "mesh", "triangle");
        if (cmeshtype == "strip") {
            var tsmesh = new stridedmesh.StridedMesh(cnumrows, cstride, scale);
            tsmesh.arrays.position = tsmesh.getFishHPositions();
            tsmesh.type = gl.TRIANGLE_STRIP;
            console.log("created triangle strip mesh. phase=" + this.phase0);
            return tsmesh;
        }
        else {
            var trmesh = new trianglesmesh.StridedMesh(cnumrows, cstride);
            trmesh.arrays.position = trmesh.getFishHPositions();
            console.log("created triangles mesh. phase=" + this.phase0);
            trmesh.type = gl.TRIANGLES;
            return trmesh;
        }
    }
    computeBoneMatrices(bones, di) {
        var amp = 0.0;
        var damp = this.ampl / bones.length;
        var arange = this.arange * 2.0 * Math.PI;
        for (var i = 0; i < bones.length; i++) {
            var m = twgl_js_1.m4.identity();
            var normx = i;
            normx = normx / bones.length;
            var ay = arange * (normx * di);
            var az = arange * (normx * di);
            twgl_js_1.m4.translate(m, [this.px,
                this.py + amp * Math.cos(0.5 * ay),
                this.pz + amp * 10.0 * Math.sin(az)], bones[i]);
            this.py += 0.0;
            this.pz += 0.00000;
            amp += this.size * damp;
        }
        //      this.px+=-this.forwardspeed; // * bones.length;    
    }
}
exports.FishHTranslated = FishHTranslated;
//--------------------------------------------------------------------------------------------------------
class FishV extends Fish {
    prepareMesh(gl, dictpar, scale) {
        this.scale = scale;
        var cstride = this.numberDictPar(dictpar, "stride", 80);
        var cnumrows = this.numberDictPar(dictpar, "numrows", 80);
        var cmeshtype = this.stringDictPar(dictpar, "mesh", "strip");
        if (cmeshtype == "strip") {
            var tsmesh = new stridedmesh.StridedMesh(cnumrows, cstride, scale);
            tsmesh.arrays.position = tsmesh.getFishVPositions();
            tsmesh.type = gl.TRIANGLE_STRIP;
            return tsmesh;
        }
        else {
            var trmesh = new trianglesmesh.StridedMesh(cnumrows, cstride);
            trmesh.arrays.position = trmesh.getFishVPositions();
            trmesh.type = gl.TRIANGLES;
            return trmesh;
        }
    }
    computeBoneMatrices(bones, di) {
        var amp = 0.0, damp = this.ampl / bones.length, arange = this.arange * 2.0 * Math.PI;
        for (var i = 0; i < bones.length; i++) {
            twgl_js_1.m4.translate(twgl_js_1.m4.identity(), [this.px,
                this.py + amp * 10.0 * Math.cos(arange * (i + di) / bones.length + di),
                this.pz + amp * Math.sin(+arange * i / bones.length + di)], bones[i]);
            this.py += 0.0;
            this.pz += 0.00000;
            amp += this.scale * damp;
        }
        //   this.px+=-this.forwardspeed; // * bones.length;      
    }
}
exports.FishV = FishV;
//----------------------------------------------------------------------------------------------------------
class FishHRotated extends Fish {
    prepareMesh(gl, dictpar, scale) {
        this.scale = scale;
        var cstride = this.numberDictPar(dictpar, "stride", 80);
        var cnumrows = this.numberDictPar(dictpar, "numrows", 80);
        var cmeshtype = this.stringDictPar(dictpar, "mesh", "strip");
        if (cmeshtype == "strip") {
            var tsmesh = new stridedmesh.StridedMesh(cnumrows, cstride, scale);
            tsmesh.arrays.position = tsmesh.getCylPositions(this.r1, this.r2);
            tsmesh.type = gl.TRIANGLE_STRIP;
            console.log("created triangle strip mesh. phase=" + this.phase0);
            return tsmesh;
        }
        else {
            var trmesh = new trianglesmesh.StridedMesh(cnumrows, cstride);
            trmesh.arrays.position = trmesh.getFishPPositions();
            trmesh.type = gl.TRIANGLES;
            return trmesh;
        }
    }
    computeBoneMatrices(bones, di) {
        var amp = 0.0;
        var damp = this.ampl / bones.length;
        var arad = di * Math.PI / 180.0;
        var asin = (this.ampl * di) * Math.PI * 2.0; //Math.sin( this.phase0+12.0*arad)*this.arange;
        // var arange=this.arange;
        // var cay = -180.0; 
        var ay = 0.0;
        var bonesize = this.mesh.nsegments * this.mesh.segmentsize;
        var jointpos = 0.5;
        var jointpos2 = 0.3;
        for (var i = 0; i < bones.length; i++) {
            var nnormx = i / bones.length;
            var nnormxal = 0.5 + 0.5 * Math.sin(this.arange * nnormx * asin);
            //    if (nnormx>jointpos) posay = asin * nnormxal; else posay=0;
            ay = asin * nnormxal;
            var m = twgl_js_1.m4.identity();
            m = twgl_js_1.m4.translate(m, [jointpos * bonesize / 2 + this.px, 0, 0]);
            m = twgl_js_1.m4.rotateY(m, ay);
            m = twgl_js_1.m4.translate(m, [-(jointpos * bonesize / 2 + this.px), 0, 0, 0]);
            m = twgl_js_1.m4.translate(m, [this.px, 0, 0, 0]);
            //  m = m4.translate(m,[jointpos*bonesize,0,0]);
            //   m = m4.rotateY(m, posay );
            //   m = m4.translate(m,[this.px,0,0,0]);
            bones[i] = m;
            //  this.py+=0.0;
            //  this.pz+=0.00000;
            // amp+=this.size*damp;       
        }
        //    this.px+=-this.forwardspeed; // * bones.length;    
    }
}
exports.FishHRotated = FishHRotated;
//----------------------------------------------------------------------------------------------------------
class FishOneJoint extends Fish {
    constructor(size, r1, r2, forwardspeed, phase0, deltaphase, arange, ampl, surfacetexturefile, jointpos, vaxis) {
        super(size, r1, r2, forwardspeed, phase0, deltaphase, arange, ampl, surfacetexturefile);
        this.size = size;
        this.r1 = r1;
        this.r2 = r2;
        this.forwardspeed = forwardspeed;
        this.phase0 = phase0;
        this.deltaphase = deltaphase;
        this.arange = arange;
        this.ampl = ampl;
        this.surfacetexturefile = surfacetexturefile;
        this.jointpos = jointpos;
        this.vaxis = vaxis;
    }
    prepareMesh(gl, dictpar, scale) {
        this.scale = scale;
        var cstride = this.numberDictPar(dictpar, "stride", 80);
        var cnumrows = this.numberDictPar(dictpar, "numrows", 80);
        var cmeshtype = this.stringDictPar(dictpar, "mesh", "strip");
        if (cmeshtype == "strip") {
            var tsmesh = new stridedmesh.StridedMesh(cnumrows, cstride, scale);
            tsmesh.arrays.position = tsmesh.getCylPositions(this.r1, this.r2); // tsmesh.getFishVPositions()
            tsmesh.type = gl.TRIANGLE_STRIP;
            console.log("created triangle strip mesh. phase=" + this.phase0);
            return tsmesh;
        }
        else {
            var trmesh = new trianglesmesh.StridedMesh(cnumrows, cstride);
            trmesh.arrays.position = trmesh.getFishVPositions();
            trmesh.type = gl.TRIANGLES;
            return trmesh;
        }
    }
    computeBoneMatrices(bones, di) {
        var bonesize = this.mesh.nsegments * this.mesh.segmentsize; // length in x direction
        var len = this.jointpos * bonesize; // len is distance from 0 to joint
        var mtrans1 = twgl_js_1.m4.translation([len, 0, 0]); // joint serves as a rotation point (trans to)
        var mtrans2 = twgl_js_1.m4.translation([-len, 0, 0]); // joint serves as a rotation point (trans back)
        var ii = bones.length * this.jointpos; // ii is index where joint starts
        var mrot = twgl_js_1.m4.axisRotate(mtrans1, this.vaxis, di * this.ampl); // rotation used beyond joint
        for (var i = 0; i < bones.length; i++) {
            var m = (i > ii) ? mrot : mtrans1; // before joint, use trans1 matrix. After joint, use rotated trans1
            bones[i] = twgl_js_1.m4.multiply(m, mtrans2); // bone matrix consists of local m translated back to origin
        }
        this.EndOfBoneTrans = twgl_js_1.m4.translate(mrot, [bonesize - len - 0.1, 0, 0, 0]); // the end of the bone      
    }
}
exports.FishOneJoint = FishOneJoint;
//# sourceMappingURL=fish.js.map