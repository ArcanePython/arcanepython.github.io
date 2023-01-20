import { m4 } from "twgl.js";

import * as stridedmesh0 from "./stridedmesh0" // mesh and bones (data)
import * as stridedmesh from "./stridedmesh" // mesh and bones (data)
import * as trianglesmesh from "./trianglesmesh" // mesh and bones (data)

import * as fish from "./fish"

export class WhaleTranslated extends fish.Fish
// Fish with tail  rotating around x
{    
  prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number)
   // create mesh positions for a fish with tail in vertical pose, moving left/right.
  // produce a position item ready for stridedmesh0.Tarray
  {

    var cstride =  this.numberDictPar(dictpar,"stride",80);
    var cnumrows =  this.numberDictPar(dictpar,"numrows",80);
    return this.prepareMeshGen(gl,dictpar,this.scale,cnumrows,cstride,stridedmesh.StridedMesh.getWhalePositions,stridedmesh.StridedMesh.getWhalePositions);
/*
    this.scale=scale;      
    var cstride =  this.numberDictPar(dictpar,"stride",80);
    var cnumrows =  this.numberDictPar(dictpar,"numrows",80);
    var cmeshtype = this.stringDictPar(dictpar, "mesh", "strip" );
    if (cmeshtype=="strip")
    {
      var tsmesh = new stridedmesh.StridedMesh(cnumrows, cstride, scale );
      tsmesh.arrays.position = tsmesh.getWhalePositions()
      tsmesh.type = gl.TRIANGLE_STRIP;  
      return tsmesh;
    }  else
    {
        var trmesh = new trianglesmesh.StridedMesh(cnumrows, cstride);
        trmesh.arrays.position = trmesh.getWhalePositions()
        trmesh.type = gl.TRIANGLES;
        return trmesh;        
    }'
    */
 }

 protected computeBoneMatrices(bones: m4.Mat4[], di:number) 
 // move bone left-right, called from rendering
 {   
  /*
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
   */
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
         m4.translate(m,[0.0,
                        amp * 10.0*Math.cos(0.5*ay),
                         amp *  Math.sin(1.0*az)], 
                         bones[i]);  
         amp+=this.size*damp;       
      }  
//   this.px+=-this.forwardspeed; // * bones.length;      
  } 
}  

