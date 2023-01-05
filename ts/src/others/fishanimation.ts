import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as mtls from "../baseapp/mouselistener";     // connect events for buttons and wheel
import * as camhandler from "../baseapp/camhandler"   // camera projection

import * as boneanimation from "../bonemodel/boneanimation"
import * as fish from "../bonemodel/fish"
import * as fishonejoint from "../bonemodel/fishonejoint"
import * as fishv from "../bonemodel/fishv"
import * as fishhrotated from "../bonemodel/fishhrotated"
import * as fishhtranslated from "../bonemodel/fishhtranslated"

import  * as datgui from "dat.gui";
import * as baseapp from "../baseapp/baseapp";
import * as animationclock from "../baseapp/animationclock";


//-------------------------------------------------------------------------------------------------------------------------------------------------------------

export class FishAnimation extends baseapp.BaseApp
{          
    fishAnimationParameters = {
      b: this.baseappParameters,
      movetail: true,
      texture: 'geotriangle2',
      sling: 117,
    };          

    fish: fish.Fish[] = [ // SIZE R1 R2 FWSP  PH0  DELTAP  AR   AMPL  TEX          JOINT JOINTAX
    new fishhtranslated.FishHTranslated(1.0,2.0,0.3, 0.03, 0.8, 0.0016, 0.5, 2.0, "zelenskyy"),
    new fishonejoint.FishOneJoint   (0.06, 40.0,24.0,0.03, 0.0, 0.0055, -9999.0, 2.1, "gradient", 0.6, [0.0,1.0,0.0]),
    new fishhrotated.FishHRotated   (0.5,16.0,22.0, 0.03, 0.1, 0.0015, 1.0, 0.5, "gradient"),
    new fishv.FishV(          0.2,0.2,0.3, 0.03, 1.0,  0.0150, 0.5, 5.00, "flagofukraine"),
    new fishhtranslated.FishHTranslated(0.3,0.2,0.3, 0.03, 0.8,  0.0085, 0.5, 2.50, "zelenskyy")];  
  
    fishjointcounts: number[] = [1, 28, 1, 1, 1];  

    fishpositions = [
    [[0.0, -20.0, 0.0]], 
    [[-15,15,0]],
    [[20.0, -5.0, -15.0]],
    [[-10.0, -5.0, 0.0]],
    [[0.0, 0.0, 1.0]]];
  
    cam: camhandler.Camera|undefined;
    
    clock: animationclock.AnimationClock = new animationclock.AnimationClock();

    static instance: FishAnimation;

    constructor( cgl: WebGL2RenderingContext, capp: mtls.MouseListener | undefined , dictpar:Map<string,string>,cdiv: string)
    {       
      super(cgl, capp, dictpar, cdiv);
      FishAnimation.instance=this;
      this.twglprograminfo = new Array(2);
      this.twglprograminfo![1] = twgl.createProgramInfo(cgl, [boneanimation.vsSkeleton, boneanimation.fsSkeleton]);
    }

    main(gl:WebGL2RenderingContext, dictpar:Map<string,string>)
    {
      twgl.setAttributePrefix("a_");
      var gl = this.gl!;
      var nFish: number = 0;
      var time0: number = 0;
      this.fish.forEach((afish)=>{
        afish.prepareSurfaceTextures(gl,afish.surfacetexturefile);
        afish.mesh = afish.prepareMesh(gl, dictpar, afish.size);
        afish.setNumBones(gl);
        afish.createBoneTexture(gl, time0, dictpar);
        afish.createSurfaceTexture(gl);
        afish.uniforms= afish.createUniforms(gl, dictpar);
        afish.bufferInfo = twgl.createBufferInfoFromArrays(gl, afish.mesh!.arrays);
        afish.skinVAO = twgl.createVAOFromBufferInfo(gl, this.twglprograminfo![1], afish.bufferInfo);
        nFish++;
      });   
      this.cam=camhandler.Camera.createCamera(gl,dictpar,camhandler.Camera.CamZUp, 30.0, this.app!);
      this.cam.zoominVelocity = 0.5;
      requestAnimationFrame(() => this.render(time0));    
    }

    onChangeColorValue(value? : any)
    {
      //console.log("we are in color=["+value+"]");
      var thisinstance = FishAnimation.instance!;
      if (thisinstance.gl!=null)
      {
        var cc = (thisinstance.gl!.canvas  as HTMLCanvasElement).parentNode;
        var ccd= (cc as HTMLDivElement);
        ccd.style.backgroundColor =  value;
      }
    }

    public initGUI(parameters: { b: {color0: string, move: boolean,  speed: number}, movetail:boolean, texture:string,  sling:number}): datgui.GUI      
    {
      this.fishAnimationParameters= parameters;
    
      // The base GUI provides checkboxes for move and move of objects,
      // a color dialog to choose background, Slider for animation speed
      var gui = super.createGUI(this.fishAnimationParameters.b, this.fishAnimationParameters);
      
      // add a slider for sling
      gui.add(this.fishAnimationParameters, 'sling').min(9).max(120).step(1);
   
      gui.updateDisplay();
      return gui;
    }
  
    render(time: number) 
    {
        var gl = this.gl!;
        gl.useProgram(this.twglprograminfo![1].program);
        twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
        gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height);        
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
    
        var cam: camhandler.Camera = this.cam!;
        cam.CamHandlingZUp(gl, this.app!, 1.0, -1.0);     
        for (var fishtype=0; fishtype<this.fish.length; fishtype++)
          this.fish[fishtype].uniforms!.viewprojection = cam.viewProjection; 

        for (var fishtype=0; fishtype<this.fish.length; fishtype++)
        {                   
          gl.bindVertexArray(this.fish[fishtype].skinVAO);
          this.fish[fishtype].forwardspeed = this.fishAnimationParameters.b.move?this.fishAnimationParameters.b.speed:0.0;
            
          if (this.fishjointcounts[fishtype]==1) // single joint fish
          {
            this.fish[fishtype].computeBone(time, this.fishAnimationParameters.b.move, this.fishAnimationParameters.movetail);
            this.fish[fishtype].prepareBoneTexture(gl,this.fish[fishtype].bindPoseInv2); // freeform bones need to keep their initial transformations
            this.fish[fishtype].uniforms!.world = m4.translation(this.fishpositions[fishtype][0]);      // draw a fish at some position
            twgl.setUniforms(this.twglprograminfo![1], this.fish[fishtype].uniforms)
            twgl.drawBufferInfo(gl, this.fish[fishtype].bufferInfo!, this.fish[fishtype].mesh.type);              
          }
          else  // multiple joint segments
          {
            var localmatrix = m4.translation(this.fishpositions[fishtype][0]); // start transforming origin of joint #0 to fish position
            var ampl0 = this.fish[fishtype].ampl;
            var sling = this.fishAnimationParameters.sling;
            for (var i=0; i<this.fishjointcounts[fishtype]; i++)  // there are fishjointcounts joints for this fish type
            {
              var timeoffs = i*sling;
              var nx = i/this.fishjointcounts[fishtype];
              this.fish[fishtype].ampl = ampl0 * nx;
              this.fish[fishtype].computeBone(time-timeoffs, this.fishAnimationParameters.b.move, this.fishAnimationParameters.movetail);
              this.fish[fishtype].prepareBoneTexture(gl, null); // for a segment, bindPoseInv2 need not be set (null)
              this.fish[fishtype].uniforms!.world = localmatrix; // transformation for joint part depends on previous joint
              twgl.setUniforms(this.twglprograminfo![1], this.fish[fishtype].uniforms)
              twgl.drawBufferInfo(gl, this.fish[fishtype].bufferInfo!, this.fish[fishtype].mesh.type);     
              localmatrix = m4.multiply(localmatrix, this.fish[fishtype].EndOfBoneTrans);  // stack the end-transformation of this segment into matrix cm         
            }
            this.fish[fishtype].ampl = ampl0;
          }
        }         
        requestAnimationFrame(() => this.render(this.clock.getTime(this.clock.frame)));   
    }   
}