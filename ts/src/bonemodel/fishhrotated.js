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
exports.FishOneJoint = void 0;
const twgl_js_1 = require("twgl.js");
const stridedmesh = __importStar(require("./stridedmesh")); // mesh and bones (data)
const trianglesmesh = __importStar(require("./trianglesmesh")); // mesh and bones (data)
const fish = __importStar(require("./fish"));
class FishOneJoint extends fish.Fish {
    constructor() {
        super(...arguments);
        this.jointpos = 0.5;
        this.vaxis = [0, 1, 0];
    }
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
        //var jointpos = 0.1;
        /*
        var asin=(this.ampl * di)*Math.PI*2.0;
        var ay=0.0;
        var bonesize= this.mesh!.nsegments*this.mesh!.segmentsize;
        var i2 = bones.length/2;
        for (var i = 0; i < bones.length; i++)
        {
          var nnormx = (i<i2)?0:( (i-i2) /bones.length);
          var nnormxal = 0.5 + 0.5*Math.sin( this.arange*nnormx*asin);
          ay = asin * nnormxal;
          var  m = m4.identity();
          m = m4.translate(m,[jointpos*bonesize/2,0,0]);
         if (i>i2) m = m4.rotateY(m, ay );
          m = m4.translate(m,[-(jointpos*bonesize/2),0,0,0]);
          bones[i] = m;
        }
        */
        var bonesize = this.mesh.nsegments * this.mesh.segmentsize; // length in x direction
        var len = this.jointpos * bonesize; // len is distance from 0 to joint
        var mtrans1 = twgl_js_1.m4.translation([len, 0, 0]); // joint serves as a rotation point (trans to)
        var mtrans2 = twgl_js_1.m4.translation([-len, 0, 0]); // joint serves as a rotation point (trans back)
        var ii = bones.length * this.jointpos; // ii is index where joint starts
        var mrot = twgl_js_1.m4.axisRotate(mtrans1, this.vaxis, di * this.ampl * 5.0); // rotation used beyond joint
        for (var i = 0; i < bones.length; i++) {
            var m = (i > ii) ? mrot : mtrans1; // before joint, use trans1 matrix. After joint, use rotated trans1
            bones[i] = twgl_js_1.m4.multiply(m, mtrans2); // bone matrix consists of local m translated back to origin
        }
    }
}
exports.FishOneJoint = FishOneJoint;
//# sourceMappingURL=fishhrotated.js.map