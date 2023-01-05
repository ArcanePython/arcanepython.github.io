  
import { m4 } from "twgl.js";

import * as stridedmesh0 from "./stridedmesh0" // mesh and bones (data)
import * as stridedmesh from "./stridedmesh" // mesh and bones (data)
import * as trianglesmesh from "./trianglesmesh" // mesh and bones (data)

import * as fish from "./fish"

export class FishHTranslated extends fish.Fish
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
