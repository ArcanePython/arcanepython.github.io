
import * as  twgl  from "twgl.js";
import { m4 } from "twgl.js";

import * as stridedmesh0 from "./stridedmesh0" // mesh and bones (data)
import * as stridedmesh from "./stridedmesh" // mesh and bones (data)
import * as trianglesmesh from "./trianglesmesh" // mesh and bones (data)

import * as fish from "./fish"

export class Whale extends fish.Fish
// Fish with vertical tail
{
  prepareMesh(gl: WebGL2RenderingContext, dictpar:Map<string,string>, scale: number)
  // create mesh positions for a fish with tail in horizontal pose, moving up/down
  {
    var cstride =  this.numberDictPar(dictpar,"stride",180);
    var cnumrows = this.numberDictPar(dictpar,"numrows",40);
    return this.prepareMeshGen(gl,dictpar,this.name,scale,cnumrows,cstride,stridedmesh.StridedMesh.getWhalePositions,trianglesmesh.StridedMesh.getTrianglesMeshPositions);
  }


 protected computeBoneMatrices(bones: m4.Mat4[], di:number) 
 // move bone left-right, called from rendering
 {   
   var amp=0.0,damp=this.ampl/bones.length, arange=this.arange*2.0*Math.PI;  
   for (var i = 0; i < bones.length; i++)
   {           
       m4.translate(m4.identity(),[0.0,
                      amp*10.0*Math.cos(arange*(i+di)/bones.length + di),
                      amp*Math.sin(+arange*i/bones.length + di)], 
                      bones[i]);
      amp+=this.scale*damp;      
   }  
  } 
}  

