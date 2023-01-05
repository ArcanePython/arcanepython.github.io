
import { m4 } from "twgl.js";

import * as stridedmesh0 from "./stridedmesh0" // mesh and bones (data)
import * as stridedmesh from "./stridedmesh" // mesh and bones (data)
import * as trianglesmesh from "./trianglesmesh" // mesh and bones (data)

import * as fish from "./fish"

export class FishH extends fish.Fish
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
      tsmesh.arrays.position = tsmesh.getFishHPositions()
      tsmesh.type = gl.TRIANGLE_STRIP;  
      return tsmesh;
    }  else
    {
        var trmesh = new trianglesmesh.StridedMesh(cnumrows, cstride);
        trmesh.arrays.position = trmesh.getFishHPositions()
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

