"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StridedMesh0 = void 0;
class StridedMesh0 {
    constructor() {
        this.nrows = 0;
        this.nsegments = 0;
        this.arrays = { position: { numComponents: 0, data: new Float32Array() },
            boneNdx: { numComponents: 0, data: new Uint32Array() },
            weight: { numComponents: 0, data: new Float32Array() },
            texcoord: { numComponents: 0, data: new Float32Array() },
            indices: { numComponents: 0, data: new Uint32Array() },
        };
        this.degen = true;
        this.segmentsize = 1.0;
        this.bonediv = 2.0;
        this.type = 0;
    }
    floatStraighten(datatitle, w, wdata) {
        var data = new Float32Array(wdata.length * w);
        console.log(">floatstraighten" + w + " " + datatitle + " wdata.length=" + wdata.length);
        for (var i = 0; i < wdata.length; i++)
            for (var j = 0; j < w; j++)
                data[i * w + j] = wdata[i][j];
        console.log("<floatstraighten" + w + " " + datatitle + ": len=" + data.length);
        return data;
    }
    intStraighten(datatitle, w, wdata) {
        var data = new Uint32Array(wdata.length * w);
        console.log(">intstraighten" + w + " " + datatitle + " wdata.length=" + wdata.length);
        for (var i = 0; i < wdata.length; i++)
            for (var j = 0; j < w; j++)
                data[i * w + j] = wdata[i][j];
        console.log("<intstraighten" + w + " " + datatitle + ": len=" + data.length);
        return data;
    }
    intArray(datatitle, wdata) {
        var data = new Uint32Array(wdata.length);
        console.log(">intArray" + " " + datatitle + " wdata.length=" + wdata.length);
        for (var i = 0; i < wdata.length; i++)
            data[i] = wdata[i];
        console.log("<intArray" + " " + datatitle + ": len=" + data.length);
        return data;
    }
}
exports.StridedMesh0 = StridedMesh0;
//# sourceMappingURL=stridedmesh0.js.map