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
exports.FishHRotated = void 0;
const twgl_js_1 = require("twgl.js");
const stridedmesh = __importStar(require("./stridedmesh")); // mesh and bones (data)
const trianglesmesh = __importStar(require("./trianglesmesh")); // mesh and bones (data)
const fish = __importStar(require("./fish"));
class FishHRotated extends fish.Fish {
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
//# sourceMappingURL=fishhrotated.js.map