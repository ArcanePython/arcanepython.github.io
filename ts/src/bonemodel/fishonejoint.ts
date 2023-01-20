import { m4 } from "twgl.js";

import * as stridedmesh0 from "./stridedmesh0" // mesh and bones (data)
import * as stridedmesh from "./stridedmesh" // mesh and bones (data)
import * as trianglesmesh from "./trianglesmesh" // mesh and bones (data)

import * as fish from "./fish"

export class FishOneJoint extends fish.Fish
// Fish with horizontal tail, single joint
{       
  jointpos = 0.5;
  vaxis=[0,1,0];

  prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number): stridedmesh0.StridedMesh0
  // create mesh positions for a cylinder.
  // produce a position item ready for stridedmesh0.Tarray
  {
    var cstride =  this.numberDictPar(dictpar,"stride",80);
    var cnumrows =  this.numberDictPar(dictpar,"numrows",80);
    return this.prepareMeshGen(gl,dictpar,this.name,scale, cnumrows, cstride, stridedmesh.StridedMesh.getCylPositions,trianglesmesh.StridedMesh.getTrianglesMeshPositions);
  }
  protected computeBoneMatrices(bones: m4.Mat4[], di:number) 
  // move bone according to vaxis, called from rendering
  { 
    var bonesize= this.mesh!.nsegments * this.mesh!.segmentsize;   // length in x direction
    var len: number=this.jointpos*bonesize;                        // len is distance from 0 to joint
    var mtrans1 = m4.translation([len,0,0]);                       // joint serves as a rotation point (trans to)
    var mtrans2 = m4.translation([-len,0,0]);                      // joint serves as a rotation point (trans back)
    var ii=bones.length*this.jointpos;                             // ii is index where joint starts
    var mrot = m4.axisRotate(mtrans1,this.vaxis, di * this.ampl * 5.0); // rotation used beyond joint
    for (var i = 0; i < bones.length; i++)
    {               
      var m = (i>ii)?mrot:mtrans1;          // before joint, use trans1 matrix. After joint, use rotated trans1
      bones[i] =  m4.multiply(m, mtrans2);  // bone matrix consists of local m translated back to origin
    }   
  }
}
