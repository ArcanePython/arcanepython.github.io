import { m4 } from "twgl.js";

import * as stridedmesh0 from "./stridedmesh0" // mesh and bones (data)
import * as stridedmesh from "./stridedmesh" // mesh and bones (data)
import * as trianglesmesh from "./trianglesmesh" // mesh and bones (data)

import * as fish from "./fish"

export class FishOneJoint extends fish.Fish
// Fish with horizontal tail 
{       

  prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number): stridedmesh0.StridedMesh0
  // create mesh positions for a fish with tail in horizontal pose, moving up/down.
  // produce a position item ready for stridedmesh0.Tarray
  {
    var cstride =  this.numberDictPar(dictpar,"stride",80);
     var cnumrows =  this.numberDictPar(dictpar,"numrows",80);
        this.scale=scale;
       var vv = this.prepareMeshGen(gl,dictpar,scale, cnumrows, cstride, stridedmesh.StridedMesh.getCylPositions,stridedmesh.StridedMesh.getCylPositions);
     return vv;
     
/*
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
   */ 
  }

  jointpos = 0.5;
  vaxis=[0,1,0];

  protected computeBoneMatrices(bones: m4.Mat4[], di:number) 
  // move bone up-down, called from rendering
  { 
    //var jointpos = 0.1;
    /* 
    var asin=(this.ampl * di)*Math.PI*2.0;
    var ay=0.0;
    var bonesize= this.mesh!.nsegments*this.mesh!.segmentsize;
    var i2 = bones.length/2;
    for (var i = 0; i < bones.length; i++)
    {          
      var nnormx = (i<i2)?0:( (i-i2) /bones.length);   
      var nnormxal = 0.5 + 0.5*Math.sin( this.arange*nnormx*asin);      
      ay = asin * nnormxal;
      var  m = m4.identity();
      m = m4.translate(m,[jointpos*bonesize/2,0,0]);
     if (i>i2) m = m4.rotateY(m, ay );
      m = m4.translate(m,[-(jointpos*bonesize/2),0,0,0]);
      bones[i] = m;
    }
    */
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
