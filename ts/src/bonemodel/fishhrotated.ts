import { m4 } from "twgl.js";

import * as stridedmesh0 from "./stridedmesh0" // mesh and bones (data)
import * as stridedmesh from "./stridedmesh" // mesh and bones (data)
import * as trianglesmesh from "./trianglesmesh" // mesh and bones (data)

import * as fish from "./fish"

export class FishHRotated extends fish.Fish
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
