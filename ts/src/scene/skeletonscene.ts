//import * as twgl from "./../node_modules/twgl.js";    // Greg's work
//import { m4 } from "./../node_modules/twgl.js";

import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as mtls from "../baseapp/mouselistener";     // connect events for buttons and wheel
import * as camhandler from "../baseapp/camhandler"   // camera projection
//import * as stridedmesh0 from "./stridedmesh0" // mesh and bones (data)

import * as boneanimation from "./../bonemodel/boneanimation"
import * as fish from "./../bonemodel/fish"
import * as baseapp from "./../baseapp/baseapp";
import * as fishhtranslated from "./../bonemodel/fishhtranslated";
import  * as datgui from "dat.gui";
import * as scene from "./scene";
//import { FishV } from "../bonemodel/fishv";
import { FishVTranslated } from "../bonemodel/fishvtranslated";

//-------------------------------------------------------------------------------------------------------------------------------------------------------------


type Tuniforms = {
    world: m4.Mat4,
    projection: m4.Mat4,
    viewprojection: m4.Mat4;
    view: m4.Mat4,
    surfaceTexture: WebGLTexture,
    boneMatrixTexture: WebGLTexture,
    color: number[]
  };

 

export class SkeletonScene implements scene.SceneInterface
{
      // SceneInterface only, skybox is shown in animation container (now animation1.ts)
      scenesize: number = 40;
      sceneenv: number = 2;
      animationParameters: scene.TAnimation1Parameters | undefined;
      vertexShaderSource = ``;
      fragmentShaderSource = ``; 
      twglprograminfo: twgl.ProgramInfo[]|null=null;
      cameraPosition: [number,number,number] | undefined
      positionLocation: number | undefined;
      resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }
      defaultCamera(gl: WebGL2RenderingContext, cam: camhandler.Camera) {}
      extendGUI(gui: datgui.GUI) {}

  skeletonParameters = {
    move: false,
    movetail: true,
    speed: 0.4,
    texture: 'geotriangle2',
    color0: "#00A000",
  };          
   
//    cam: camhandler.Camera|undefined;
    uniforms: Tuniforms | undefined;
    bufferInfo: twgl.BufferInfo | null = null;
    skinVAO: WebGLVertexArrayObject | null = null;
    phase0: number=0.0; //2.0; // 143 degrees 
    afish: FishVTranslated|undefined;// fishhtranslated.FishHTranslated | undefined;
   
    static instance: SkeletonScene;

    constructor( cgl: WebGL2RenderingContext, capp: mtls.MouseListener | undefined , dictpar:Map<string,string>, cdiv:string)
    { 
     // super(cgl, capp, dictpar, cdiv);
     SkeletonScene.instance = this;
      this.twglprograminfo = new Array(2);
      this.twglprograminfo![1] = twgl.createProgramInfo(cgl, [boneanimation.vsSkeleton, boneanimation.fsSkeleton]);
  
    }

   // main(gl: WebGL2RenderingContext,  dictpar:Map<string,string>)
    initScene(gl: WebGL2RenderingContext,  cap:scene.TAnimation1Parameters, dictpar:Map<string,string>| undefined,  p: twgl.ProgramInfo, textureReadyCallback: (a:any)=>void | undefined)
    {
      var time0: number=0;
    
     // super.maininfo(gl, dictpar,boneanimation.vsSkeleton, boneanimation.fsSkeleton );
   
      var spar:string|undefined;
      if ((spar=dictpar!.get("phase2"))!=undefined) this.phase0= +spar!;
    
      this.afish = new FishVTranslated (1.0,0.2,0.3,  0.0, 1.0, 0.005,0.5,2.5, "zelenskyy");
      this.afish.forwardspeed=(this.skeletonParameters.move)?0.06:0.0;
      this.afish.prepareSurfaceTextures(gl, "zelenskyy");
      this.afish.mesh = this.afish.prepareMesh(gl, dictpar!, 1.0);   
      this.afish.numBones = (this.afish.mesh!.type==gl.TRIANGLE_STRIP)? (this.afish.mesh!.nsegments / this.afish.mesh!.bonediv) : this.afish.mesh!.nsegments; 
      this.afish.createBoneTexture(gl, time0, dictpar!);
      this.afish.createSurfaceTexture(gl);

      this.uniforms= this.afish.createUniforms(gl, dictpar!); // this.phase0);
      this.bufferInfo = twgl.createBufferInfoFromArrays(gl, this.afish.mesh!.arrays);

      this.skinVAO = twgl.createVAOFromBufferInfo(gl, this.twglprograminfo![1], this.bufferInfo!);
      textureReadyCallback(0);
    }

    //------------------------------------------------------------------------------------------------------------------------------------
    
    drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number)
    {       
        var uniforms = this.uniforms!;
        uniforms.viewprojection = cam.viewProjection;   
  
        gl.bindVertexArray(this.skinVAO);
    
        this.afish!.forwardspeed=(this.skeletonParameters.move)?(this.skeletonParameters.speed):0.0;
        this.afish!.computeBone(time, this.skeletonParameters.move, this.skeletonParameters.movetail);
        this.afish!.prepareBoneTexture(gl,this.afish!.bindPoseInv2); 
       
        uniforms.world = m4.translate(m4.identity(), [20.0, -20.0, 0.0]);  // draw a fish
        twgl.setUniforms(this.twglprograminfo![1], uniforms)
        twgl.drawBufferInfo(gl, this.bufferInfo!, this.afish!.mesh!.type);     
       
        uniforms.world = m4.translate(m4.identity(), [-15.0, 0.0, 0.0]);     // draw a fish
        twgl.setUniforms(this.twglprograminfo![1], uniforms)
        twgl.drawBufferInfo(gl, this.bufferInfo!, this.afish!.mesh!.type);
  
        this.afish!.computeBone(time, this.skeletonParameters.move, this.skeletonParameters.movetail);
        this.afish!.prepareBoneTexture(gl,this.afish!.bindPoseInv2);

        uniforms.world = m4.translate(m4.identity(), [50.0, -10.0, 10.0]); // draw a fish    
        twgl.setUniforms(this.twglprograminfo![1], uniforms)
        twgl.drawBufferInfo(gl, this.bufferInfo!, this.afish!.mesh!.type);     

        uniforms.world = m4.translate(m4.identity(), [-50.0, 5.0, -10.0]); // draw a fish
        twgl.setUniforms(this.twglprograminfo![1], uniforms)
        twgl.drawBufferInfo(gl, this.bufferInfo!, this.afish!.mesh!.type);
    }   
}
