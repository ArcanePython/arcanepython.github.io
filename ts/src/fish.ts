import { m4 } from "./../node_modules/twgl.js";

import * as stridedmesh0 from "./stridedmesh0" // mesh and bones (data)
import * as stridedmesh from "./stridedmesh" // mesh and bones (data)
import * as trianglesmesh from "./trianglesmesh" // mesh and bones (data)
import * as boneanimation from "./boneanimation"

interface FishInterface 
  {
    computeBone( time: number): void;
    prepareUniforms(gl:WebGL2RenderingContext,dictpar:Map<string,string>): boneanimation.Tuniforms;
    prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number,typeFish: number): stridedmesh0.StridedMesh0;
  }

  type Meshproducer = (numrows: number, stride: number, scale: number) => {
    numComponents: number;
    data: Float32Array;
   };
  
export abstract class Fish extends boneanimation.BoneAnimation implements FishInterface
  {
    public abstract prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number): stridedmesh0.StridedMesh0; // called from constructors
    protected abstract computeBoneMatrices(bones: m4.Mat4[], di:number): void; //, damp: number, arange: number) :void;                          // called from renderer
  
    constructor (public size: number, public forwardspeed: number, public phase0: number, public deltaphase: number, public arange: number, public ampl: number, public surfacetexturefile: string) 
    { super(); }
  
    computeBone( time: number)
    {
      const aphase = this.mesh!.bonediv * 0.01 * Math.PI * Math.sin(time * this.deltaphase);
      this.computeBoneMatrices(this.bones,aphase + this.phase0); //, this.ampl, this.arange);     
    }

    createSurfaceTexture(gl:WebGL2RenderingContext)
    {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.surfaceTexture!);  
    }

    createBoneTexture(gl:WebGL2RenderingContext, dictpar:Map<string,string>)
    {
        gl.activeTexture(gl.TEXTURE0);            
        this.prepareBoneMatrices(gl, dictpar);           // see derived class
        this.computeBone(0);
        this.bindPose=this.bones;
        this.bindPoseInv2 = this.prepareBoneInv(this.bindPose);         
    }

    prepareUniforms(gl:WebGL2RenderingContext,dictpar:Map<string,string>)
    // called from constructors
    {
        return  {
          world: m4.identity(),
          projection: m4.identity(),
          worldviewprojection: m4.identity(),
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

  //--- VARIOUS TYPES OF FISH COME HERE ----------------------------------------------------------------------------
  
  export class FishHTranslated extends Fish
  // Fish with horizontal tail 
  {   
    prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number): stridedmesh0.StridedMesh0
    // create mesh positions for a fish with tail in horizontal pose, moving up/down.
    // produce a position item ready for stridedmesh0.Tarray
    {
       this.scale=scale;
       var cstride =  this.numberDictPar(dictpar,"stride",80);
       var cnumrows =  this.numberDictPar(dictpar,"numrows",80);
       var cmeshtype = this.stringDictPar(dictpar, "mesh", "triangle" );
       if (cmeshtype=="strip")
        {
          var tsmesh = new stridedmesh.StridedMesh(cnumrows, cstride, scale );
          tsmesh.arrays.position = tsmesh.getFishHPositions()
          tsmesh.type = gl.TRIANGLE_STRIP;  
          console.log("created triangle strip mesh. phase="+this.phase0);
          return tsmesh;
        }  else
        {
            var trmesh = new trianglesmesh.StridedMesh(cnumrows, cstride);
            trmesh.arrays.position = trmesh.getFishHPositions()
            console.log("created triangles mesh. phase="+this.phase0);
            trmesh.type = gl.TRIANGLES;
            return trmesh;        
        }
    }
  
    protected computeBoneMatrices(bones: m4.Mat4[], di:number) 
    // move bone up-down, called from rendering
    { 
      var amp=0.0;
      var damp=this.ampl/bones.length;
      var arange=this.arange*2.0*Math.PI;
      for (var i = 0; i < bones.length; i++)
      {          
         var  m = m4.identity();
         var normx = i;
         normx = normx /bones.length;         
         var ay = arange*(normx*di);
         var az = arange*(normx*di);
         m4.translate(m,[this.px,
                         this.py + amp * Math.cos(0.5*ay),
                         this.pz + amp * 10.0 * Math.sin(az)], 
                         bones[i]);  
         this.py+=0.0;
         this.pz+=0.00000;
         amp+=this.size*damp;       
      }  
      this.px+=-this.forwardspeed; // * bones.length;    
    }
  }

  //--------------------------------------------------------------------------------------------------------
  
  export class FishV extends Fish
  // Fish with vertical tail 
  {    
    prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number)
     // create mesh positions for a fish with tail in vertical pose, moving left/right.
    // produce a position item ready for stridedmesh0.Tarray
    {
      this.scale=scale;      
      var cstride =  this.numberDictPar(dictpar,"stride",80);
      var cnumrows =  this.numberDictPar(dictpar,"numrows",80);
      var cmeshtype = this.stringDictPar(dictpar, "mesh", "strip" );
      if (cmeshtype=="strip")
      {
        var tsmesh = new stridedmesh.StridedMesh(cnumrows, cstride, scale );
        tsmesh.arrays.position = tsmesh.getFishVPositions()
        tsmesh.type = gl.TRIANGLE_STRIP;  
        return tsmesh;
      }  else
      {
          var trmesh = new trianglesmesh.StridedMesh(cnumrows, cstride);
          trmesh.arrays.position = trmesh.getFishVPositions()
          trmesh.type = gl.TRIANGLES;
          return trmesh;        
      }
   }
  
   protected computeBoneMatrices(bones: m4.Mat4[], di:number) 
   // move bone left-right, called from rendering
   {   
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
     this.px+=-this.forwardspeed; // * bones.length;      
    } 
  }  

  //----------------------------------------------------------------------------------------------------------

  export class FishHRotated extends Fish
  // Fish with horizontal tail 
  {       
 
    prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number): stridedmesh0.StridedMesh0
    // create mesh positions for a fish with tail in horizontal pose, moving up/down.
    // produce a position item ready for stridedmesh0.Tarray
    {
       this.scale=scale;
       var cstride =  this.numberDictPar(dictpar,"stride",80);
       var cnumrows =  this.numberDictPar(dictpar,"numrows",80);
       var cmeshtype = this.stringDictPar(dictpar, "mesh", "strip" );
       if (cmeshtype=="strip")
        {
          var tsmesh = new stridedmesh.StridedMesh(cnumrows, cstride, scale );
          tsmesh.arrays.position = tsmesh.getFishPPositions()
          tsmesh.type = gl.TRIANGLE_STRIP;  
          console.log("created triangle strip mesh. phase="+this.phase0);
          return tsmesh;
        }  else
        {
            var trmesh = new trianglesmesh.StridedMesh(cnumrows, cstride);
            trmesh.arrays.position = trmesh.getFishPPositions()
            trmesh.type = gl.TRIANGLES;
            return trmesh;        
        }
    }
  
    protected computeBoneMatrices(bones: m4.Mat4[], di:number) 
    // move bone up-down, called from rendering
    { 
      var amp=0.0;
      var damp=this.ampl/bones.length;
      var arad=di*Math.PI/180.0;
      var asin=this.ampl * di; //Math.sin( this.phase0+12.0*arad)*this.arange;
      var arange=this.arange;
      var cay = -180.0; 
      var posay=0.0;
      var bonesize= this.mesh!.nsegments*this.mesh!.segmentsize;
      var jointpos = 0.1;
      var jointpos2 = 0.3;
      for (var i = 0; i < bones.length; i++)
      {          
        var nnormx = i /bones.length;   
        var nnormxal = 0.5 + 0.5*Math.sin( 7.0*nnormx*asin*Math.PI*2.0);      
    //    if (nnormx>jointpos) posay = asin * nnormxal; else posay=0;
        posay = asin * nnormx;
        var  m = m4.identity();
        m = m4.translate(m,[jointpos*bonesize+this.px,0,0]);
        m = m4.rotateY(m, posay );
        m = m4.translate(m,[-(jointpos*bonesize+this.px),0,0,0]);
        m = m4.translate(m,[this.px,0,0,0]);
    
      //  m = m4.translate(m,[jointpos*bonesize,0,0]);
     //   m = m4.rotateY(m, posay );
     //   m = m4.translate(m,[this.px,0,0,0]);
        bones[i] = m;
      //  this.py+=0.0;
      //  this.pz+=0.00000;
       // amp+=this.size*damp;       
      }  
      this.px+=-this.forwardspeed; // * bones.length;    
    }
  }
  
 //----------------------------------------------------------------------------------------------------------

 export class FishOneJoint extends Fish
 // Fish with horizontal tail, using a joint
 {       
  constructor (public size: number, public forwardspeed: number, public phase0: number, public deltaphase: number, public arange: number, public ampl: number, public surfacetexturefile: string, public jointpos: number, public vaxis:number[]) 
  { super(size, forwardspeed, phase0, deltaphase,arange,ampl, surfacetexturefile); }
/*
   computeBone( time: number)
   {
     var aphase = this.mesh!.bonediv * 0.01 * time;
     aphase=aphase%360;
     this.computeBoneMatrices(this.bones,aphase );     
   }
*/
   prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number): stridedmesh0.StridedMesh0
   // create mesh positions for a fish with tail in horizontal pose, moving up/down.
   // produce a position item ready for stridedmesh0.Tarray
   {
      this.scale=scale;
      var cstride =  this.numberDictPar(dictpar,"stride",80);
      var cnumrows =  this.numberDictPar(dictpar,"numrows",80);
      var cmeshtype = this.stringDictPar(dictpar, "mesh", "strip" );
      if (cmeshtype=="strip")
       {
         var tsmesh = new stridedmesh.StridedMesh(cnumrows, cstride, scale );
         tsmesh.arrays.position = tsmesh.getFishVPositions()
         tsmesh.type = gl.TRIANGLE_STRIP;  
         console.log("created triangle strip mesh. phase="+this.phase0);
         return tsmesh;
       }  else
       {
           var trmesh = new trianglesmesh.StridedMesh(cnumrows, cstride);
           trmesh.arrays.position = trmesh.getFishVPositions()
           trmesh.type = gl.TRIANGLES;
           return trmesh;        
       }
   }
 
   protected computeBoneMatrices(bones: m4.Mat4[], di:number) 
   // move bone up-down, called from rendering
   { 
     var amp=0.0;
     var damp=this.ampl/bones.length;
     var arad=di*Math.PI/180.0;
     var asin=di * this.ampl; //  Math.sin(this.phase0 + this.deltaphase*arad)*this.arange;
     var arange=this.arange;
     var cay = -180.0; 
     var posay=0.0;
     var bonesize= this.mesh!.nsegments*this.mesh!.segmentsize;
     //var jointpos = 0.6;
     //var jointpos2 = 0.3;
     for (var i = 0; i < bones.length; i++)
     {          
       var nnormx = i /bones.length;         
       if (nnormx>this.jointpos) posay = asin; else posay=0;
       var  m = m4.identity();
       m = m4.translate(m,[this.jointpos*bonesize+this.px,0,0]);
       m = m4.axisRotate(m,this.vaxis, posay );
       m = m4.translate(m,[-(this.jointpos*bonesize+this.px),0,0,0]);
       m = m4.translate(m,[this.px,0,0,0]);
       
       bones[i] = m;
       this.py+=0.0;
       this.pz+=0.00000;
       amp+=this.size*damp;       
     }  
     this.px+=-this.forwardspeed; // * bones.length;    
    }
 }
 
