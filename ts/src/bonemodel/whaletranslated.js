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
exports.WhaleTranslated = void 0;
const twgl_js_1 = require("twgl.js");
const stridedmesh = __importStar(require("./stridedmesh")); // mesh and bones (data)
const trianglesmesh = __importStar(require("./trianglesmesh")); // mesh and bones (data)
const fish = __importStar(require("./fish"));
class WhaleTranslated extends fish.Fish {
    prepareMesh(gl, dictpar, scale) {
        var cstride = this.numberDictPar(dictpar, "stride", 120);
        var cnumrows = this.numberDictPar(dictpar, "numrows", 40);
        return this.prepareMeshGen(gl, dictpar, this.name, scale, cnumrows, cstride, stridedmesh.StridedMesh.getWhalePositions, trianglesmesh.StridedMesh.getTrianglesMeshPositions);
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
            twgl_js_1.m4.translate(m, [0.0,
                amp * 10.0 * Math.cos(0.5 * ay),
                amp * Math.sin(1.0 * az)], bones[i]);
            amp += this.size * damp;
        }
    }
}
exports.WhaleTranslated = WhaleTranslated;
//# sourceMappingURL=whaletranslated.js.map