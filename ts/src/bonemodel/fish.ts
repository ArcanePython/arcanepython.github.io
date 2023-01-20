import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as stridedmesh0 from "./stridedmesh0" // mesh and bones (data)
import * as stridedmesh from "./stridedmesh" // mesh and bones (data)
import * as trianglesmesh from "./trianglesmesh" // mesh and bones (data)
import * as boneanimation from "./boneanimation"

export interface FishInterface 
  {
    computeBone( time: number, domove: boolean, domovetail: boolean): void;
    createUniforms(gl:WebGL2RenderingContext,dictpar:Map<string,string>): boneanimation.Tuniforms;
    prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number,typeFish: number): stridedmesh0.StridedMesh0;
  }
  
export interface hoard
{
  fish: Fish[];
  fishjointcounts: number[] ;
  fishpositionsV : twgl.v3.Vec3[][];
  fishvelocitiesV : twgl.v3.Vec3[][];
  fishmatricesR : {change: boolean, matrix: twgl.m4.Mat4}[][];
}

export abstract class Fish extends boneanimation.BoneAnimation implements FishInterface
  {
 //   vx:number=0;
 //   vy:number=0;
 //   vz:number=0;
 
    EndOfBoneTrans: m4.Mat4 = m4.identity();

    public abstract prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number): stridedmesh0.StridedMesh0; // called from constructors
    protected abstract computeBoneMatrices(bones: m4.Mat4[], di:number): void; //, damp: number, arange: number) :void;                          // called from renderer
  
    constructor (public name: string,
                 public size: number,public r1: number,public r2: number,  public phase0: number, public deltaphase: number, 
                 public arange: number, public ampl: number, public surfacetexturefile: string, public v: twgl.v3.Vec3) 
    { 
      super(name); 
    }
  
    computeBone( time: number, domove: boolean, domovetail: boolean)
    {
      const aphase = domovetail ? (this.mesh!.bonediv * 0.01 * Math.PI * Math.sin(time * this.deltaphase)):0;
      this.computeBoneMatrices(this.bones,aphase + this.phase0); //, this.ampl, this.arange);     
    }

    computeJoint( time: number, domove: boolean, domovetail: boolean)
    {
      const aphase = domovetail ? (this.mesh!.bonediv * 0.01 * Math.PI * Math.sin(time * this.deltaphase)):0;
      this.computeBoneMatrices(this.bones,aphase + this.phase0); //, this.ampl, this.arange);     
    }

  
    public prepareMeshGen(gl: WebGL2RenderingContext, dictpar:Map<string,string>, name:string, scale: number, 
                    nrows: number, stride: number, 
                    fstrip:(segmentsize: number, nrows: number, stride: number, dictpar:Map<string,string>)=>{numComponents:number,data: Float32Array}, 
                    ftriangles:(segmentsize: number, nrows: number, stride: number, dictpar:Map<string,string>)=>{numComponents:number,data: Float32Array})
    // create mesh positions, produce a position item ready for stridedmesh0.Tarray
    {
      this.scale=scale;      
      var cmeshtype = this.stringDictPar(dictpar, "mesh", "strip" );
      if (cmeshtype=="strip")
      {
        var tsmesh = new stridedmesh.StridedMesh(name, nrows, stride, scale, 0.20 );
        tsmesh.arrays.position = fstrip(tsmesh.segmentsize, nrows, stride,dictpar);
        tsmesh.type = gl.TRIANGLE_STRIP;  
        return tsmesh;
      }  else
      {
          var trmesh = new trianglesmesh.StridedMesh(nrows, stride);
          trmesh.arrays.position = ftriangles(trmesh.segmentsize, nrows, stride,dictpar);
          trmesh.type = gl.TRIANGLES;
          return trmesh;        
      }
    }

    prepareSurfaceTextures(gl: WebGL2RenderingContext, selectedSurface:string)
   {
       var gradientname = require("./../resources/models/stone/circlegradient.png");
       var clovername = require("./../resources/images/clover.jpg");
       var zelenskyyname = require("./../resources/models/stone/zelenskii.png");
       var flagofukrainname = require("./../resources/models/stone/flagofukraine.png");
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

    createSurfaceTexture(gl:WebGL2RenderingContext)
    {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.surfaceTexture!);  
    }

    createBoneTexture(gl:WebGL2RenderingContext, time:number, dictpar:Map<string,string>)
    {
        gl.activeTexture(gl.TEXTURE0);            
        this.prepareBoneMatrices(gl, dictpar);
        this.computeBone(time, false, false);
        this.bindPose=this.bones;
        this.bindPoseInv2 = this.prepareBoneInv(this.bindPose);    
        this.EndOfBoneTrans = m4.identity();     
    }

    createUniforms(gl:WebGL2RenderingContext,dictpar:Map<string,string>)
    // called from constructors
    {
        return  {
          world: m4.identity(),
          projection: m4.identity(),
          viewprojection: m4.identity(),
          view: m4.translation([0.0, 0.0, 0.0]),
          surfaceTexture: this.surfaceTexture!,
          boneMatrixTexture: this.boneMatrixTexture!,
          color: [0.0, 0.0, 0.0, 0.0],
         };
    }

    numberDictPar(dictpar:Map<string,string>, parname: string, pardefault: number): number
    {
      var spar: string|undefined;
      if ((spar=dictpar.get(parname))!=undefined) return +spar!;
      return pardefault;
    }

    stringDictPar(dictpar:Map<string,string>, parname: string, pardefault: string): string
    {
      var spar: string|undefined;
      if ((spar=dictpar.get(parname))!=undefined) return spar!;
      return pardefault;
    }

  }
