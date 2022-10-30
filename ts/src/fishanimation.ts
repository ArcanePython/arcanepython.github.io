import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as mtls from "./mouselistener";     // connect events for buttons and wheel
import * as camhandler from "./camhandler"   // camera projection

import * as boneanimation from "./boneanimation"
import * as fish from "./fish"

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

export class FishAnimation  
{                          
    fish: fish.Fish[] = [ // SIZE FWSP  PH0  DELTAP  AR   AMPL  TEX          JOINT JOINTAX
    new fish.FishHTranslated(1.0, 0.03, 0.8, 0.0016, 0.5, 2.25, "zelenskyy"),
    new fish.FishOneJoint   (0.33, 0.03, 3.0, 0.0125, 0.3, 2.25, "gradient", 0.6, [0.0,0.0,1.0]),
    new fish.FishHRotated   (1.0, 0.03, 0.1, 0.0015, 1.3, 2.25, "gradient"),
    new fish.FishV(          0.2, 0.03, 1.0,  0.0150, 0.5, 5.00, "flagofukraine"),
    new fish.FishHTranslated(0.3, 0.03, 0.8,  0.0085, 0.5, 2.50, "zelenskyy")];  
  
    fishcounts: number[] = [1, 1, 2, 2, 1];    
    fishpositions = [
    [[20.0, -20.0, 0.0]], 
    [[0.0, 0.0, 0.0]],
    [[40.0, -5.0, -15.0], [40.0, -2.0, -5.0]],
    [[10.0, -5.0, 0.0], [15.0, 0.0, -5]],
    [[22.0, 0.0, 1.0]]];
  

    private  gl: WebGL2RenderingContext;
    private app: mtls.MouseListener;   
    private cam: camhandler.Camera;
    private programInfo: twgl.ProgramInfo;
    private vnow: Date = new Date();

    private tdt: number=0;
    private cntfr: number=0;
   
    getTime(nfr: number): number
    {
      const now = new Date();
      const ctime = now.getTime();
      const dt = ctime-this.vnow.getTime();
      if ((this.cntfr % 100)==0) 
      { 
        console.log("nfr="+nfr+" tdt="+this.tdt+" ms, fr="+1000.0/(this.tdt/100.0)); 
        (document.getElementById('app') as HTMLDivElement).innerHTML = "fr="+1000.0/(this.tdt/100.0);
        this.tdt=0; 
      }
      this.tdt+=dt; 
      this.vnow = now; 
      return  ctime;
    }
     
    constructor( cgl: WebGL2RenderingContext, capp: mtls.MouseListener | undefined , dictpar:Map<string,string>)
    {       
      this.gl = cgl;
      this.app = capp!;
      twgl.setAttributePrefix("a_");
      this.programInfo = twgl.createProgramInfo(this.gl, [boneanimation.vsSkeleton, boneanimation.fsSkeleton]);          
      var nFish: number = 0;
      this.fish.forEach((afish)=>{
        afish.prepareSurfaceTextures(this.gl,afish.surfacetexturefile);
        afish.mesh = afish.prepareMesh(this.gl, dictpar, afish.size);
        afish.setNumBones(this.gl);
        afish.createBoneTexture(this.gl, dictpar);
        afish.createSurfaceTexture(this.gl);
        afish.uniforms= afish.prepareUniforms(this.gl, dictpar);
        afish.bufferInfo = twgl.createBufferInfoFromArrays(this.gl, afish.mesh!.arrays);
        afish.skinVAO = twgl.createVAOFromBufferInfo(this.gl, this.programInfo, afish.bufferInfo);
        nFish++;
      });   
      this.cam=camhandler.Camera.createZUpCamera(this.gl,dictpar,50.0, this.app);
      this.cam.zoominVelocity = 0.5;
      requestAnimationFrame(() => this.render((this.vnow=new Date()).getTime()));    
    }
  
    render(time: number) 
    {
        var gl = this.gl;
        gl.useProgram(this.programInfo!.program);
        twgl.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height);        
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        
        gl.clearColor(0.1, 0.1, 0.1, 1.0);       
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);     
        var cam: camhandler.Camera = this.cam;
        cam.CamHandlingZUp(gl, this.app);     
        for (var fishtype=0; fishtype<this.fish.length; fishtype++)
        {         
          gl.bindVertexArray(this.fish[fishtype].skinVAO);
          this.fish[fishtype].computeBone(time);
          this.fish[fishtype].prepareBoneTexture(gl,this.fish[fishtype].bindPoseInv2);
          this.fish[fishtype].uniforms!.worldviewprojection = cam.viewProjection;        
          for (var i=0; i<this.fishcounts[fishtype]; i++)                                                            // instances of this type
          {
            this.fish[fishtype].uniforms!.world = m4.translate(m4.identity(), this.fishpositions[fishtype][i]);      // draw a fish at some position
            twgl.setUniforms(this.programInfo!, this.fish[fishtype].uniforms!)
            twgl.drawBufferInfo(gl, this.fish[fishtype].bufferInfo!, this.fish[fishtype].mesh!.type);     
          }
        }         
        requestAnimationFrame(() => this.render(this.getTime(this.cntfr++)));   
    }   
}