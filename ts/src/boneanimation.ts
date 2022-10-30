import * as twgl from "./../node_modules/twgl.js";    // Greg's work
import { m4 } from "./../node_modules/twgl.js";

import * as stridedmesh0 from "./stridedmesh0" // mesh and bones (data)

//import * as stridedmesh from "./stridedmesh" // mesh and bones (data)
//import * as trianglesmesh from "./trianglesmesh" // mesh and bones (data)
//import * as mtls from "./mouselistener";     // connect events for buttons and wheel

// -- vertex shader --
export const vsSkeleton = `#version 300 es

// camera
uniform mat4 worldviewprojection;
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
  gl_Position = worldviewprojection * world * bonemovedskinpos;
 }
`;

export const fsSkeleton = `#version 300 es
precision mediump float;
//precision highp float;
uniform vec4 color;
in vec2 v_texCoord;
out vec4 outColor;
uniform sampler2D surfaceTexture;

void main () {
  vec4 cColor =  texture(surfaceTexture, v_texCoord);
  outColor=cColor * vec4(0.5,0.5,0.5,1);
}
`;

export type Tuniforms = {
    world: m4.Mat4,
    projection: m4.Mat4,
    worldviewprojection: m4.Mat4;
    view: m4.Mat4,
    surfaceTexture: WebGLTexture,
    boneMatrixTexture: WebGLTexture,
    color: number[]
  };

export class BoneAnimation
{
    bindPose: m4.Mat4[] = [];    
   
    bones: m4.Mat4[] = []; 
    boneMatrixTexture: WebGLTexture | null = null;
    boneMatrices: m4.Mat4[] = [] ;
    numBones: number | undefined;
    boneArray: Float32Array | undefined;
   
    surfaceTexture: WebGLTexture | null = null;
   
    // animation state
    px: number =0.0;
    py: number =0.0;
    pz: number =0.0;
    scale: number = 1.0;
      
   // bindPoseInv0: m4.Mat4[] = [] ;
    bindPoseInv2: m4.Mat4[] = [] ;
 
    phase0: number= 0;
    mesh: stridedmesh0.StridedMesh0 | null = null;   
    bufferInfo: twgl.BufferInfo | null = null;
    skinVAO: WebGLVertexArrayObject | null = null;
    uniforms: Tuniforms | null = null;  

    constructor( )
    {
    }

    setNumBones(gl: WebGL2RenderingContext)
    {
        this.numBones = (this.mesh!.type==gl.TRIANGLE_STRIP)? (this.mesh!.nsegments / this.mesh!.bonediv) : this.mesh!.nsegments;   
    }
 
    mat4report(m: m4.Mat4)
     {
      var srep: string = m.toString()!;
      var srep1: string = "";
      srep.split(",").forEach( (item) => { srep1+=item.substring(0,5)+","; } );
      return srep;
    }
 
    prepareBoneInv(bindPose: m4.Mat4[])
    {
         // compute the initial positions of each matrix
     
         var nrep = 0;
         console.log("prepareBoneInv - bindpose");
         bindPose.forEach((v)=>{ 
           this.mat4report(v);
           console.log(nrep+"] ["+v.toString()+"] "); 
           nrep++;
         });
       
       // compute their inverses
         return  bindPose.map(function(m) {
           return m4.inverse(m);
         }); 
    }
    
    prepareSurfaceTextures(gl: WebGL2RenderingContext, selectedSurface:string)
    {
        var gradientname = require("./resources/models/stone/circlegradient.png");
        var clovername = require("./images/clover.jpg");
        var zelenskyyname = require("./resources/models/stone/zelenskii.png");
        var flagofukrainname = require("./resources/models/stone/flagofukraine.png");
        var textures = twgl.createTextures(gl, { 
         checker: {
           mag: gl.NEAREST,
           min: gl.LINEAR,
           src: [255, 255, 255, 255,  192, 192, 192, 255,
                 92, 92, 92, 255, 255, 255, 255, 255, ],},
         clover: { src: clovername },
         zelenskyy: { src: zelenskyyname },
         gradient: { src: gradientname },
         flagofukraine: { src: flagofukrainname },
        });
       if (selectedSurface=="clover") this.surfaceTexture = textures.clover;
       if (selectedSurface=="zelenskyy") this.surfaceTexture = textures.zelenskyy;
       if (selectedSurface=="checker") this.surfaceTexture = textures.checker;
       if (selectedSurface=="gradient") this.surfaceTexture = textures.gradient;
       if (selectedSurface=="flagofukraine") this.surfaceTexture = textures.flagofukraine;
       return textures;
    } 

    prepareBoneMatrices(gl: WebGL2RenderingContext, dictpar:Map<string,string>)
    {
       if (this.numBones==undefined) return;

    
      this.boneArray = new Float32Array(this.numBones! * 16);
    
      // prepare the texture for bone matrices
      this.boneMatrixTexture = gl.createTexture();

      gl.bindTexture(gl.TEXTURE_2D, this.boneMatrixTexture);

      // since we want to use the texture for pure data we turn off filtering
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
 
      for (let i = 0; i < this.numBones!; ++i) {
        this.boneMatrices.push(new Float32Array(this.boneArray.buffer, i * 4 * 16, 16));
        this.bindPose.push(m4.identity());  // just allocate storage
        this.bones.push(m4.identity());     // just allocate storage
       }
    }

    prepareBoneTexture(gl:WebGL2RenderingContext, bindPosInv:m4.Mat4[])
    {          
      // multiply each by its bindPoseInverse
      this.bones.forEach((bone, ndx) => { m4.multiply(bone, bindPosInv[ndx], this.boneMatrices[ndx]); });

      // update the texture with the current matrices
      gl.bindTexture(gl.TEXTURE_2D, this.boneMatrixTexture);
      gl.texImage2D(
          gl.TEXTURE_2D,
          0,           // level
          gl.RGBA32F,  // internal format
          4,           // width 4 pixels, each pixel has RGBA so 4 pixels is 16 values
          this.numBones!,    // one row per bone
          0,           // border
          gl.RGBA,     // format
          gl.FLOAT,    // type
          this.boneArray!);
    }
}
