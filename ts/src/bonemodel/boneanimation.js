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
exports.BoneAnimation = exports.fsSkeleton = exports.vsSkeleton = void 0;
const twgl_js_1 = require("twgl.js");
const stridedmesh = __importStar(require("./stridedmesh")); // mesh and bones (data)
// -- vertex shader --
exports.vsSkeleton = `#version 300 es

// camera
uniform mat4 viewprojection;
uniform vec3 lightWorldPos;
uniform mat4 world;
uniform mat4 viewInverse;
uniform mat4 worldInverseTranspose;

in vec4 a_position;
in vec4 a_weight;
in uvec4 a_boneNdx;
in vec2 a_texcoord;
 
uniform mat4 projection;
uniform mat4 view;

uniform sampler2D boneMatrixTexture;

uniform float numBones;

out vec2 v_texCoord;

mat4 m4ident =  mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
mat4 m4zero =  mat4(0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0);

mat4 getBoneMatrix(uint boneNdx) {
  if (boneNdx>99998u) return m4zero;
  return mat4(
    texelFetch(boneMatrixTexture, ivec2(0, boneNdx), 0),
    texelFetch(boneMatrixTexture, ivec2(1, boneNdx), 0),
    texelFetch(boneMatrixTexture, ivec2(2, boneNdx), 0),
    texelFetch(boneMatrixTexture, ivec2(3, boneNdx), 0));
}

void main() {
  v_texCoord = a_texcoord;
  vec4 bonemovedskinpos = (getBoneMatrix(a_boneNdx[0]) * a_position * a_weight[0] + getBoneMatrix(a_boneNdx[1]) * a_position * a_weight[1]);
  gl_Position = viewprojection * world * bonemovedskinpos;
 }
`;
exports.fsSkeleton = `#version 300 es
precision mediump float;
//precision highp float;
uniform vec4 color;
in vec2 v_texCoord;
out vec4 outColor;
uniform sampler2D surfaceTexture;

void main () {
  vec4 cColor =  texture(surfaceTexture, v_texCoord);
  outColor=cColor; 
  // * vec4(0.5,0.5,0.5,1);
}
`;
class BoneAnimation {
    constructor() {
        this.bindPose = [];
        this.bones = [];
        this.boneMatrices = [];
        // animation state
        this.px = 0.0;
        this.py = 0.0;
        this.pz = 0.0;
        this.scale = 1.0;
        this.bindPoseInv2 = [];
        this.phase0 = 0;
        this.mesh = new stridedmesh.StridedMesh(1, 1, 1); // | null = null;   
        this.uniforms = { world: [], projection: [], viewprojection: [], view: [], surfaceTexture: {}, boneMatrixTexture: {}, color: [] };
        this.bufferInfo = null;
        this.skinVAO = null;
        //   this.boneMatrixTexture = new WebGLTexture();
        //   this.surfaceTexture = new WebGLTexture();
    }
    setNumBones(gl) {
        this.numBones = (this.mesh.type == gl.TRIANGLE_STRIP) ? (this.mesh.nsegments / this.mesh.bonediv) : this.mesh.nsegments;
    }
    mat4report(m) {
        var srep = m.toString();
        var srep1 = "";
        srep.split(",").forEach((item) => { srep1 += item.substring(0, 5) + ","; });
        return srep;
    }
    prepareBoneInv(bindPose) {
        // compute the initial positions of each matrix
        var nrep = 0;
        console.log("prepareBoneInv - bindpose");
        bindPose.forEach((v) => {
            this.mat4report(v);
            console.log(nrep + "] [" + v.toString() + "] ");
            nrep++;
        });
        // compute their inverses
        return bindPose.map(function (m) {
            return twgl_js_1.m4.inverse(m);
        });
    }
    prepareBoneMatrices(gl, dictpar) {
        if (this.numBones == undefined)
            return;
        this.boneArray = new Float32Array(this.numBones * 16);
        // prepare the texture for bone matrices
        this.boneMatrixTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.boneMatrixTexture);
        // since we want to use the texture for pure data we turn off filtering
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        for (let i = 0; i < this.numBones; ++i) {
            this.boneMatrices.push(new Float32Array(this.boneArray.buffer, i * 4 * 16, 16));
            this.bindPose.push(twgl_js_1.m4.identity()); // just allocate storage
            this.bones.push(twgl_js_1.m4.identity()); // just allocate storage
        }
    }
    prepareBoneTexture(gl, bindPosInv) {
        if (bindPosInv == null) // when a reset of the bone transformation is not needed, copy bone matrix to GPU
            this.bones.forEach((bone, ndx) => { twgl_js_1.m4.multiply(bone, twgl_js_1.m4.identity(), this.boneMatrices[ndx]); });
        else // else multiply each by its initial inverse tansformation before copy bone matrix to GPU
            this.bones.forEach((bone, ndx) => { twgl_js_1.m4.multiply(bone, bindPosInv[ndx], this.boneMatrices[ndx]); });
        // update the texture with the current matrices
        gl.bindTexture(gl.TEXTURE_2D, this.boneMatrixTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, // level
        gl.RGBA32F, // internal format
        4, // width 4 pixels, each pixel has RGBA so 4 pixels is 16 values
        this.numBones, // one row per bone
        0, // border
        gl.RGBA, // format
        gl.FLOAT, // type
        this.boneArray);
    }
}
exports.BoneAnimation = BoneAnimation;
//# sourceMappingURL=boneanimation.js.map