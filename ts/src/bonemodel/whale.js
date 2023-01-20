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
exports.Whale = void 0;
const twgl_js_1 = require("twgl.js");
const stridedmesh = __importStar(require("./stridedmesh")); // mesh and bones (data)
const fish = __importStar(require("./fish"));
class Whale extends fish.Fish {
    prepareMesh(gl, dictpar, scale) {
        var cstride = this.numberDictPar(dictpar, "stride", 80);
        var cnumrows = this.numberDictPar(dictpar, "numrows", 80);
        return this.prepareMeshGen(gl, dictpar, this.scale, cnumrows, cstride, stridedmesh.StridedMesh.getWhalePositions, stridedmesh.StridedMesh.getWhalePositions);
        /*
            this.scale=scale;
            var cstride =  this.numberDictPar(dictpar,"stride",80);
            var cnumrows =  this.numberDictPar(dictpar,"numrows",80);
            var cmeshtype = this.stringDictPar(dictpar, "mesh", "strip" );
            if (cmeshtype=="strip")
            {
              var tsmesh = new stridedmesh.StridedMesh(cnumrows, cstride, scale );
              tsmesh.arrays.position = tsmesh.getWhalePositions()
              tsmesh.type = gl.TRIANGLE_STRIP;
              return tsmesh;
            }  else
            {
                var trmesh = new trianglesmesh.StridedMesh(cnumrows, cstride);
                trmesh.arrays.position = trmesh.getFishPositions()
                trmesh.type = gl.TRIANGLES;
                return trmesh;
            }
           */
    }
    computeBoneMatrices(bones, di) {
        var amp = 0.0, damp = this.ampl / bones.length, arange = this.arange * 2.0 * Math.PI;
        for (var i = 0; i < bones.length; i++) {
            twgl_js_1.m4.translate(twgl_js_1.m4.identity(), [0.0,
                amp * 10.0 * Math.cos(arange * (i + di) / bones.length + di),
                amp * Math.sin(+arange * i / bones.length + di)], bones[i]);
            amp += this.scale * damp;
        }
    }
}
exports.Whale = Whale;
//# sourceMappingURL=whale.js.map