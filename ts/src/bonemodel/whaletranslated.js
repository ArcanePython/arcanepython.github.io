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
const fish = __importStar(require("./fish"));
class WhaleTranslated extends fish.Fish {
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
                trmesh.arrays.position = trmesh.getWhalePositions()
                trmesh.type = gl.TRIANGLES;
                return trmesh;
            }'
            */
    }
    computeBoneMatrices(bones, di) {
        /*
         var amp=0.0,damp=this.ampl/bones.length, arange=this.arange*2.0*Math.PI;
         for (var i = 0; i < bones.length; i++)
         {
             m4.translate(m4.identity(),[this.px,
                            this.py + amp*10.0*Math.cos(arange*(i+di)/bones.length + di),
                            this.pz + amp*Math.sin(+arange*i/bones.length + di)],
                            bones[i]);
            this.py+=0.0;
            this.pz+=0.00000;
            amp+=this.scale*damp;
            
         }
         */
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
        //   this.px+=-this.forwardspeed; // * bones.length;      
    }
}
exports.WhaleTranslated = WhaleTranslated;
//# sourceMappingURL=whaletranslated.js.map