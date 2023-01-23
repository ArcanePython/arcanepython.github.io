import { m4 } from "twgl.js";

import * as stridedmesh0 from "./stridedmesh0" // mesh and bones (data)
import * as stridedmesh from "./stridedmesh" // mesh and bones (data)
import * as trianglesmesh from "./trianglesmesh" // mesh and bones (data)

import * as fish from "./fish"

export class FishWithJoints extends fish.Fish
// Fish with horizontal tail, using multiple joints
{       
 constructor (
   public name: string,
   public size: number,
   public r1: number,
   public r2: number, 
   public phase0: number, 
   public deltaphase: number, 
   public arange: number, 
   public ampl: number, 
   public surfacetexturefile: string,
   public v: [number,number,number],
   public jointpos: number, 
   public vaxis:number[]) 
 { super(name, size, r1,r2,  phase0, deltaphase,arange,ampl, surfacetexturefile, v); }

  prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number): stridedmesh0.StridedMesh0
  // create mesh positions for a fish with tail in horizontal pose, moving up/down.
  // produce a position item ready for stridedmesh0.Tarray
  {
    this.scale=scale;
    var cstride =  this.numberDictPar(dictpar,"stride",180);
    var cnumrows =  this.numberDictPar(dictpar,"numrows",20);
    var cmeshtype = this.stringDictPar(dictpar, "mesh", "strip" );
    dictpar.set("r1",this.r1.toString());
    dictpar.set("r2",this.r2.toString());
    var vv = this.prepareMeshGen(gl,dictpar,this.name,scale, cnumrows, cstride, stridedmesh.StridedMesh.getMSCylPositions,trianglesmesh.StridedMesh.getTrianglesMeshPositions);
    return vv;
  }

  protected computeBoneMatrices(bones: m4.Mat4[], di:number ) 
  // Move tail according to vaxis starting at a single joint which is placed jointpos times length from start, in the X-direction.
  // jointpos is a value between 0 and 1, di is current time
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
