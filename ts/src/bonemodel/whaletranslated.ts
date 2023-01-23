import * as  twgl  from "twgl.js";
import { m4 } from "twgl.js";

import * as stridedmesh from "./stridedmesh" // mesh and bones (data)
import * as trianglesmesh from "./trianglesmesh" // mesh and bones (data)

import * as fish from "./fish"

export class WhaleTranslated extends fish.Fish
// Fish with tail  rotating around x
{    
  prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number)
  // create mesh positions for a fish with tail in horizontal pose, moving up/down
  {
    var cstride =  this.numberDictPar(dictpar,"stride",120);
    var cnumrows =  this.numberDictPar(dictpar,"numrows",40);
    return this.prepareMeshGen(gl,dictpar,this.name,scale,cnumrows,cstride,stridedmesh.StridedMesh.getWhalePositions,trianglesmesh.StridedMesh.getTrianglesMeshPositions);
 }

 protected computeBoneMatrices(bones: m4.Mat4[], di:number) 
 // move bone left-right, called from rendering
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
         m4.translate(m,[0.0,
                        amp * 10.0*Math.cos(0.5*ay),
                         amp *  Math.sin(1.0*az)], 
                         bones[i]);  
         amp+=this.size*damp;       
      }  
  } 
}  

