import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as mtls from "../baseapp/mouselistener";     // connect events for buttons and wheel
import * as camhandler from "../baseapp/camhandler"   // camera projection
import * as datgui from "dat.gui";
import * as animationclock from "../baseapp/animationclock";

import * as scene from "./../scene/scene"

import * as boneanimation from "./../bonemodel/boneanimation"
import * as fish from "./../bonemodel/fish"
import * as fishonejoint from "./../bonemodel/fishonejoint"
import * as fishv from "./../bonemodel/fishv"
import * as fishhrotated from "./../bonemodel/fishhrotated"
import * as fishvtranslated from "./../bonemodel/fishvtranslated"
import * as fishhtranslated from "./../bonemodel/fishhtranslated"


import { TAnimation1Parameters }  from "./../baseapp/baseapp"
//-------------------------------------------------------------------------------------------------------------------------------------------------------------

export class FishAnimationScene implements scene.SceneInterface
{          
  scenesize: number = 40;
  sceneenv: number = 2;
  animationParameters: TAnimation1Parameters | undefined;
  vertexShaderSource = ``;
  fragmentShaderSource = ``; 
  private twglprograminfo: twgl.ProgramInfo|undefined;
  cameraPosition: [number,number,number] | undefined
  positionLocation: number | undefined;
  resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }
  defaultCamera(gl: WebGL2RenderingContext, cam: camhandler.Camera) {}
 
  extendGUI(gui: datgui.GUI)
   {
      gui.add(this.animationParameters!, 'fov', 5.0,85.0,1.0 );
      gui.add(this.animationParameters!, 'movetail');
   }
         
    fish: fish.Fish[] = [             // SIZE R1 R2 FWSP  PH0  DELTAP  AR   AMPL  TEX          JOINT JOINTAX
    new fishvtranslated.FishVTranslated (4.0,2.0,0.3, 0.03, 0.8, 0.0016, 0.5, 2.0, "zelenskyy"),
    new fishonejoint.FishOneJoint       (0.06, 40.0,24.0,0.03, 0.0, 0.0055, -9999.0, 2.1, "gradient", 0.6, [0.0,0.0,1.0]),
    new fishhrotated.FishHRotated       (0.5,2.0,2.0, 0.03, 0.1, 0.045, 0.1, 0.5, "gradient"),
    new fishv.FishV                     (0.2,0.2,0.3, 0.03, 1.0,  0.0150, 0.5, 5.00, "flagofukraine"),
    new fishhtranslated.FishHTranslated (0.3,0.2,0.3, 0.03, 0.8,  0.0085, 0.5, 2.50, "clover")];  
  
    fishjointcounts: number[] = [1, 28, 1, 1, 1];  

    fishpositions = [
    [[ -60.0, 10.0,60.0]], 
    [[-45,-15,0]],
    [[-30.0, -15.0, -35.0]],
    [[-10.0, -5.0, 0.0],[20.0, -5.0, 0.0],[-10.0, -5.0, -30.0]],
    [[-50.0, -10.0, 1.0]]];
    
    clock: animationclock.AnimationClock = new animationclock.AnimationClock();

    static instance: FishAnimationScene;

    constructor( cgl: WebGL2RenderingContext)
    {       
      FishAnimationScene.instance=this;
      //this.twglprograminfo = new Array(2);
      this.twglprograminfo = twgl.createProgramInfo(cgl, [boneanimation.vsSkeleton, boneanimation.fsSkeleton]);
    }

    initScene(gl: WebGL2RenderingContext,  cap:TAnimation1Parameters, cam: camhandler.Camera, dictpar:Map<string,string>| undefined,  textureReadyCallback: undefined | ((a:any)=>void))
    {
      gl.useProgram(this.twglprograminfo!.program);
      var nFish: number = 0;
      var time0: number = 0;
      this.fish.forEach((afish)=>{
        afish.prepareSurfaceTextures(gl,afish.surfacetexturefile);
        afish.mesh = afish.prepareMesh(gl, dictpar!, afish.size);
        afish.setNumBones(gl);
        afish.createBoneTexture(gl, time0, dictpar!);
        afish.createSurfaceTexture(gl);
        afish.uniforms= afish.createUniforms(gl, dictpar!);
        afish.bufferInfo = twgl.createBufferInfoFromArrays(gl, afish.mesh!.arrays);
        afish.skinVAO = twgl.createVAOFromBufferInfo(gl, this.twglprograminfo!, afish.bufferInfo);
        nFish++;
        if (nFish==this.fish.length && textureReadyCallback!=undefined) textureReadyCallback(0);
      //  textureReadyCallback(0);
      });   
    }

    drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number)
  
    {      
        gl.useProgram(this.twglprograminfo!.program);
        for (var fishtype=0; fishtype<this.fish.length; fishtype++)
          this.fish[fishtype].uniforms!.viewprojection = cam.viewProjection; 

        for (var fishtype=0; fishtype<this.fish.length; fishtype++)
        {                   
          gl.bindVertexArray(this.fish[fishtype].skinVAO);

          this.fish[fishtype].forwardspeed = this.animationParameters!.move?this.animationParameters!.speed:0.0;
          for (var cfish=0; cfish<this.fishpositions[fishtype].length; cfish++)
          {
            if (this.fishjointcounts[fishtype]==1) // single joint fish
            {
              this.fish[fishtype].computeBone(time, this.animationParameters!.move, this.animationParameters!.movetail);
              this.fish[fishtype].prepareBoneTexture(gl,this.fish[fishtype].bindPoseInv2); // freeform bones need to keep their initial transformations
              this.fish[fishtype].uniforms!.world = m4.translation(this.fishpositions[fishtype][cfish]);      // draw a fish at some position
              twgl.setUniforms(this.twglprograminfo!, this.fish[fishtype].uniforms)
              twgl.drawBufferInfo(gl, this.fish[fishtype].bufferInfo!, this.fish[fishtype].mesh.type);              
            }
            else  // multiple joint segments
            {
              var localmatrix = m4.translation(this.fishpositions[fishtype][cfish]); // start transforming origin of joint #0 to fish position
              var ampl0 = this.fish[fishtype].ampl;
              var sling = this.animationParameters!.sling;
              for (var i=0; i<this.fishjointcounts[fishtype]; i++)  // there are fishjointcounts joints for this fish type
              {
                var timeoffs = i*sling;
                var nx = i/this.fishjointcounts[fishtype];
                this.fish[fishtype].ampl = ampl0 * nx;
                this.fish[fishtype].computeBone(time-timeoffs, this.animationParameters!.move, this.animationParameters!.movetail);
                this.fish[fishtype].prepareBoneTexture(gl, null); // for a segment, bindPoseInv2 need not be set (null)
                this.fish[fishtype].uniforms!.world = localmatrix; // transformation for joint part depends on previous joint
                twgl.setUniforms(this.twglprograminfo!, this.fish[fishtype].uniforms)
                twgl.drawBufferInfo(gl, this.fish[fishtype].bufferInfo!, this.fish[fishtype].mesh.type);     
                localmatrix = m4.multiply(localmatrix, this.fish[fishtype].EndOfBoneTrans);  // stack the end-transformation of this segment into matrix cm         
              }
              this.fish[fishtype].ampl = ampl0;
           }
          }
        }         
    }   
}