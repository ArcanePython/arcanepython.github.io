
import * as twgl from "./../node_modules/twgl.js";    // Greg's work
import { m4 } from "./../node_modules/twgl.js";

import * as stridedmesh0 from "./stridedmesh0" // mesh and bones (data)
import * as stridedmesh from "./stridedmesh" // mesh and bones (data)
import * as trianglesmesh from "./trianglesmesh" // mesh and bones (data)
import * as boneanimation from "./boneanimation"
import { mat4tools } from "./mat4tools.js";

export interface FishInterface 
  {
    computeBone( time: number, domove: boolean, domovetail: boolean): void;
    createUniforms(gl:WebGL2RenderingContext,dictpar:Map<string,string>): boneanimation.Tuniforms;
    prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number,typeFish: number): stridedmesh0.StridedMesh0;
  }

  type Meshproducer = (numrows: number, stride: number, scale: number) => {
    numComponents: number;
    data: Float32Array;
   };
  
export abstract class Fish extends boneanimation.BoneAnimation implements FishInterface
  {
    EndOfBoneTrans: m4.Mat4 = m4.identity();

    public abstract prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number): stridedmesh0.StridedMesh0; // called from constructors
    protected abstract computeBoneMatrices(bones: m4.Mat4[], di:number): void; //, damp: number, arange: number) :void;                          // called from renderer
  
    constructor (public size: number,public r1: number,public r2: number, public forwardspeed: number, public phase0: number, public deltaphase: number, public arange: number, public ampl: number, public surfacetexturefile: string) 
    { super(); }
  
    computeBone( time: number, domove: boolean, domovetail: boolean)
    {
      const aphase = domovetail ? (this.mesh!.bonediv * 0.01 * Math.PI * Math.sin(time * this.deltaphase)):0;
      this.computeBoneMatrices(this.bones,aphase + this.phase0); //, this.ampl, this.arange);     
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
//      this.px+=-this.forwardspeed; // * bones.length;    
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
  //   this.px+=-this.forwardspeed; // * bones.length;      
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
          tsmesh.arrays.position = tsmesh.getCylPositions(this.r1, this.r2)
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
      var asin=(this.ampl * di)*Math.PI*2.0; //Math.sin( this.phase0+12.0*arad)*this.arange;
     // var arange=this.arange;
     // var cay = -180.0; 
      var ay=0.0;
      var bonesize= this.mesh!.nsegments*this.mesh!.segmentsize;
      var jointpos = 0.5;
      var jointpos2 = 0.3;
      for (var i = 0; i < bones.length; i++)
      {          
        var nnormx = i /bones.length;   
        var nnormxal = 0.5 + 0.5*Math.sin( this.arange*nnormx*asin);      
    //    if (nnormx>jointpos) posay = asin * nnormxal; else posay=0;
        ay = asin * nnormxal;
        var  m = m4.identity();
        m = m4.translate(m,[jointpos*bonesize/2+this.px,0,0]);
        m = m4.rotateY(m, ay );
        m = m4.translate(m,[-(jointpos*bonesize/2+this.px),0,0,0]);
        m = m4.translate(m,[this.px,0,0,0]);
    
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
  
 //----------------------------------------------------------------------------------------------------------

 export class FishOneJoint extends Fish
 // Fish with horizontal tail, using a joint
 {       
  constructor (public size: number,public r1: number,public r2: number, public forwardspeed: number, public phase0: number, public deltaphase: number, 
    public arange: number, public ampl: number, 
    public surfacetexturefile: string, public jointpos: number, public vaxis:number[]) 
  { super(size, r1,r2, forwardspeed, phase0, deltaphase,arange,ampl, surfacetexturefile); }

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
         tsmesh.arrays.position = tsmesh.getCylPositions(this.r1, this.r2); // tsmesh.getFishVPositions()
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
 
   protected computeBoneMatrices(bones: m4.Mat4[], di:number ) 
   // Rotate a straight tail starting at a single joint which is placed jointpos times length from start, in the X-direction.
   // jointpos is a value between 0 and 1, di is current time
   // Called from rendering
   { 
     var bonesize= this.mesh!.nsegments * this.mesh!.segmentsize;   // length in x direction
     var len: number=this.jointpos*bonesize;                        // len is distance from 0 to joint
     var mtrans1 = m4.translation([len,0,0]);                       // joint serves as a rotation point (trans to)
     var mtrans2 = m4.translation([-len,0,0]);                      // joint serves as a rotation point (trans back)
     var ii=bones.length*this.jointpos;                             // ii is index where joint starts
     var mrot = m4.axisRotate(mtrans1,this.vaxis, di * this.ampl ); // rotation used beyond joint
     for (var i = 0; i < bones.length; i++)
     {               
       var m = (i>ii)?mrot:mtrans1;          // before joint, use trans1 matrix. After joint, use rotated trans1
       bones[i] =  m4.multiply(m, mtrans2);  // bone matrix consists of local m translated back to origin
     }  
     this.EndOfBoneTrans = m4.translate(mrot,[bonesize-len-0.1,0,0,0]);  // the end of the bone      
   }

   


 }
 
