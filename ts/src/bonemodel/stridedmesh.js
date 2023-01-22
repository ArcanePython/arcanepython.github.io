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
exports.StridedMesh = void 0;
const stridedmesh0 = __importStar(require("./stridedmesh0")); // mesh and bones data
class StridedMesh extends stridedmesh0.StridedMesh0 {
    constructor(name, cnrows, cnsegments, scale, seglen) {
        super();
        this.segmentsize = scale * seglen; //0.18;
        this.nsegments = cnsegments;
        this.nrows = cnrows;
        if (name != "dummy")
            console.log("StridedMesh constructor name=[" + name + "], scale=" + scale + " segmentsize=" + this.segmentsize + " nsegments=" + cnsegments + " nrows=" + cnrows);
        this.arrays = {
            position: { numComponents: 0, data: new Float32Array() },
            boneNdx: this.buildBoneIndex(this.nrows, this.nsegments),
            weight: this.buildBoneWeights(this.nrows, this.nsegments),
            indices: this.buildIndicesStridedTriangleStrip(this.nrows, this.nsegments),
            texcoord: this.buildTexCoords(this.nrows, this.nsegments), // texture coords for any triangle strip quad
        };
    }
    static buildCylPositions(segmentsize, nrows, stride, r1, r2) {
        var posdata = [];
        var cx = 0, cy = 0, cz = 0, a = 0, da = Math.PI * 2.0 / (nrows - 1), z = 0, r = 5;
        for (var y = 0; y < nrows; y++) {
            for (var x = 0; x < stride; x++) {
                var d = (Math.PI / 4.0) * (y - nrows / 2) / nrows;
                d = 1.0 - Math.cos(d);
                cx = x * segmentsize;
                cy = segmentsize * Math.sin(a) * r1;
                cz = segmentsize * Math.cos(a) * r2;
                posdata.push([cx, cy, cz]);
            }
            a += da;
        }
        var data = stridedmesh0.StridedMesh0.floatStraighten("Positions", 3, posdata); // this.floatStraighten4("BoneWeights",wdata);
        return { numComponents: 3, data };
    }
    //-------------------------------------------------------------------------------------------------------------------------
    static buildFishVPositions(segmentsize, nrows, stride) {
        var posdata = [];
        var cx = 0, cy = 0, cz = 0, a = 0, da = Math.PI * 2.0 / (nrows - 1), z = 0, r = 20;
        var dtail = stride / 4;
        var htail = stride * 3 / 4;
        var dr = r / dtail;
        for (var y = 0; y < nrows; y++) {
            r = 1;
            for (var x = 0; x < stride; x++) {
                var d = (Math.PI / 4.0) * (y - nrows / 2) / nrows;
                d = 1.0 - Math.cos(d);
                cx = x * segmentsize;
                if (x < dtail) {
                    r = r + dr;
                }
                var dtailr = (x - htail);
                if (dtailr < 0) {
                    cy = segmentsize * Math.cos(-a) * r;
                    cz = segmentsize * Math.sin(-a) * r;
                }
                else {
                    var cdr = 1.0 - dtailr / dtail;
                    cy = segmentsize * Math.cos(-a) * r * (cdr);
                    cz = segmentsize * Math.sin(-a) * r * (2.0 - cdr);
                }
                posdata.push([cx, cy, cz]);
            }
            a += da;
        }
        var data = stridedmesh0.StridedMesh0.floatStraighten("Positions", 3, posdata); // this.floatStraighten4("BoneWeights",wdata);
        return { numComponents: 3, data };
    }
    static buildFishHPositions(segmentsize, nrows, stride) {
        var posdata = [];
        var cx = 0, cy = 0, cz = 0, a = 0, da = Math.PI * 2.0 / (nrows - 1), z = 0, r = 20;
        var dtail = stride / 4;
        var htail = stride * 3 / 4;
        var dr = r / dtail;
        for (var y = 0; y < nrows; y++) {
            r = 1;
            for (var x = 0; x < stride; x++) {
                var d = (Math.PI / 4.0) * (y - nrows / 2) / nrows;
                d = 1.0 - Math.cos(d);
                cx = x * segmentsize;
                if (x < dtail) {
                    r = r + dr;
                }
                var dtailr = (x - htail);
                if (dtailr < 0) {
                    cy = segmentsize * Math.sin(a) * r;
                    cz = segmentsize * Math.cos(a) * r;
                }
                else {
                    var cdr = 1.0 - dtailr / dtail;
                    cy = segmentsize * Math.sin(a) * r * (2.0 - cdr);
                    cz = segmentsize * Math.cos(a) * r * (cdr);
                }
                posdata.push([cx, cy, cz]);
            }
            a += da;
        }
        var data = this.floatStraighten("Positions", 3, posdata); // this.floatStraighten4("BoneWeights",wdata);
        return { numComponents: 3, data };
    }
    static getWhalePositions(segmentsize, nrows, stride) {
        var pos = StridedMesh.buildFishVPositions(segmentsize, nrows, stride);
        return pos;
    }
    static getFishPositions(segmentsize, nrows, stride) {
        var pos = StridedMesh.buildFishHPositions(segmentsize, nrows, stride);
        return pos;
    }
    static getCylPositions(segmentsize, nrows, stride) {
        var pos = StridedMesh.buildCylPositions(segmentsize, nrows, stride, 1, 1);
        return pos;
    }
    static getMSCylPositions(segmentsize, nrows, stride) {
        var r1 = 90, r2 = 170;
        var pos = StridedMesh.buildCylPositions(segmentsize, nrows, stride, r1, r2);
        return pos;
    }
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    buildIndicesStridedTriangleStrip(nrows, stride) {
        var inxdata = [];
        var crow = 1;
        var ca1 = stride;
        while (crow < nrows) {
            var i = 0;
            var val = 0;
            var ca0 = ca1 - stride;
            while (i < stride) {
                val = ca0;
                if (this.degen)
                    if (i == 0)
                        inxdata.push(val);
                inxdata.push(val);
                val = ca1;
                inxdata.push(val);
                ca1++;
                ca0++;
                i++;
            }
            if (this.degen)
                inxdata.push(val);
            crow++;
        }
        var data = this.intArray("Indices", inxdata);
        return { numComponents: 1, data };
    }
    buildBoneIndex(nrows, stride) {
        var ndxdata = [];
        var n1 = 0, n2 = 0;
        for (var y = 0; y < nrows; y++) {
            for (var x = 0; x < stride; x++) {
                if ((x % 2) == 0)
                    if (this.bonediv >= 2) {
                        n1 = x / this.bonediv;
                        n2 = 99999;
                        ndxdata.push([n1, n2, 99999, 99999]);
                        n2 = 1 + x / this.bonediv;
                        ndxdata.push([n1, n2, 99999, 99999]);
                    }
                    else {
                        n1 = x;
                        n2 = 99999;
                        ndxdata.push([n1, n2, 99999, 99999]);
                        n1 = x + 1;
                        n2 = 99999;
                        ndxdata.push([n1, n2, 99999, 99999]);
                    }
            }
        }
        var data = this.intStraighten("BoneIndex", 4, ndxdata);
        return { numComponents: 4, data };
    }
    buildTexCoords(nrows, stride) {
        var i = 0, n1 = 1.0, n2 = 0.0;
        var wdata = [];
        var crow = 0;
        while (crow < nrows) {
            for (var i = 0; i < stride; i++) {
                var xt = i / +stride.toFixed(4);
                var yt = crow / +nrows.toFixed(4);
                wdata.push([xt, yt]);
            }
            crow++;
        }
        var data = new Float32Array(wdata.length * 2);
        //console.log("=>copy texcoords len="+wdata.length+" stride="+stride+" nrows="+nrows);
        for (var i = 0; i < wdata.length; i++)
            for (var j = 0; j < 2; j++)
                data[i * 2 + j] = wdata[i][j];
        //console.log("texcoords buffer: len="+data.length);
        //console.log(data);
        return { numComponents: 2, data };
    }
    buildBoneWeights(nrows, stride) {
        var wdata = [];
        var n1 = 1.0, n2 = 0.0;
        for (var y = 0; y < nrows; y++) {
            for (var x = 0; x < stride; x++) {
                if ((x % 2) == 0) {
                    //   if(this.bonediv==2) 
                    {
                        wdata.push([1.0, 0.0, 0, 0]);
                        wdata.push([0.5, 0.5, 0, 0]);
                    }
                    /*   else
                       {
                         wdata.push([n1,n2,0,0]);
                         wdata.push([n1,n2,0,0]);
                       } */
                }
            }
        }
        var data = stridedmesh0.StridedMesh0.floatStraighten("BoneWeights", 4, wdata); // this.floatStraighten4("BoneWeights",wdata);
        return { numComponents: 4, data };
    }
}
exports.StridedMesh = StridedMesh;
//# sourceMappingURL=stridedmesh.js.map