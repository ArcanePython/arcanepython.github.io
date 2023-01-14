//import * as twgl from "./../node_modules/twgl.js";    // Greg's work
//import { m4 } from "./../node_modules/twgl.js";

import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as mtls from "./../baseapp/mouselistener";     // connect events for buttons and wheel
import * as camhandler from "./../baseapp/camhandler"   // camera projection
//import * as stridedmesh0 from "./stridedmesh0" // mesh and bones (data)

import * as boneanimation from "./../bonemodel/boneanimation"
import * as fish from "./../bonemodel/fish"
import * as baseapp from "./../baseapp/baseapp";
import * as fishhtranslated from "./../bonemodel/fishhtranslated";
import  * as datgui from "dat.gui";

//import { SceneInterface } from "../scene/scene";
//import { TAnimation1Parameters } from "../scene/scene";

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

export class Skeleton extends baseapp.BaseApp
{
    animationParameters: baseapp.TAnimation1Parameters = { gravity: 0.02, move: false,color0: "#00A000",speed: 0.4,texture: 'geotriangle2',fov:60, movetail: true, sling: 140, shininess:0.5, typelight:'point light' };          
   
    cam: camhandler.Camera|undefined;
    uniforms: Tuniforms | undefined;
    bufferInfo: twgl.BufferInfo | null = null;
    skinVAO: WebGLVertexArrayObject | null = null;
    phase0: number=0.0; //2.0; // 143 degrees 
    afish: fishhtranslated.FishHTranslated | undefined;
   
    private twglprograminfo: twgl.ProgramInfo|undefined;  // there are 2 sets of shaders defined here.
 

    static instance: Skeleton;

    constructor( cgl: WebGL2RenderingContext, capp: mtls.MouseListener | undefined , dictpar:Map<string,string>, cdiv:string)
    { 
      super(cgl, capp, dictpar, cdiv);
      Skeleton.instance = this;
      this.twglprograminfo = twgl.createProgramInfo(cgl, [boneanimation.vsSkeleton, boneanimation.fsSkeleton]);
  
    }

    main(gl: WebGL2RenderingContext,  dictpar:Map<string,string>)
    {
      var program = this.twglprograminfo!.program;
      gl.useProgram(program);
   
      var time0: number=0;
    
     // super.maininfo(gl, dictpar,boneanimation.vsSkeleton, boneanimation.fsSkeleton );
   
      var spar:string|undefined;
      if ((spar=dictpar.get("phase2"))!=undefined) this.phase0= +spar!;
    
      this.afish = new fishhtranslated.FishHTranslated (1.0,0.2,0.3,  0.0, 1.0, 0.015,0.5,2.5, "zelenskyy");
      this.afish.forwardspeed=(this.animationParameters.move)?0.06:0.0;
      this.afish.prepareSurfaceTextures(gl, "zelenskyy");
      this.afish.mesh = this.afish.prepareMesh(gl, dictpar, 1.0);   
      this.afish.numBones = (this.afish.mesh!.type==gl.TRIANGLE_STRIP)? (this.afish.mesh!.nsegments / this.afish.mesh!.bonediv) : this.afish.mesh!.nsegments; 
      this.afish.createBoneTexture(gl, time0, dictpar);
      this.afish.createSurfaceTexture(gl);

      this.uniforms= this.afish.createUniforms(gl, dictpar); // this.phase0);
      this.bufferInfo = twgl.createBufferInfoFromArrays(gl, this.afish.mesh!.arrays);

      this.skinVAO = twgl.createVAOFromBufferInfo(gl, this.twglprograminfo!, this.bufferInfo!);
      this.cam=camhandler.Camera.createCamera(gl,dictpar, camhandler.Camera.CamZUp, 50.0, this.app!);
      this.cam.zoominVelocity = 0.5;
      requestAnimationFrame(() => this.render(time0));   
    }

    //------------------------------------------------------------------------------------------------------------

    gui: datgui.GUI|null=null;

    onChangeColorValue(value? : any)
    {
      //console.log("we are in color=["+value+"]");
      var thisinstance = Skeleton.instance!;
      if (thisinstance.gl!=null)
      {
        var cc = (thisinstance.gl!.canvas as HTMLCanvasElement).parentNode;
        var ccd= (cc as HTMLDivElement);
        ccd.style.backgroundColor =  value;
      }
    }

    public initGUI(parameters: baseapp.TAnimation1Parameters)
    {
      this.animationParameters = parameters;

      var cc = (this.gl!.canvas as HTMLCanvasElement).parentNode;
      var ccd= (cc as HTMLDivElement);
      ccd.style.backgroundColor =  this.animationParameters.color0;
  
      // park the dat.gui box in the linksdiv below the links, in closed state
      var gui = new datgui.GUI( { autoPlace: false } );
      gui.domElement.id = 'gui_drawimagespace';
      document.getElementById("linksdiv")!.append( gui.domElement);
      gui.close();

      // connect viewmodel
      gui.remember(parameters); //this.fishAnimationParameters);
    
      // Checkbox forward move animation on/off
      gui.add(parameters, 'move'); //this.fishAnimationParameters, 'move');
      // Checkbox tail animation on/off
      gui.add(parameters, 'movetail');
    
      // Slider for animation speed
      gui.add(parameters, 'speed').min(0.02).max(0.1).step(0.002);
  
      // Color dialog sets background color
      var cel3 = gui.addColor(parameters, 'color0');
      cel3.onChange( this.onChangeColorValue);
        
      gui.updateDisplay();
      return gui;
    }
     

    //------------------------------------------------------------------------------------------------------------------------------------

    render(time: number) 
    {       
        var gl = this.gl!;
        var program = this.twglprograminfo!.program;
        gl.useProgram(program);
     
        //gl.useProgram(this.twglprograminfo![1].program);
        twgl.resizeCanvasToDisplaySize(gl.canvas  as HTMLCanvasElement);
        gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height);        
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
      
        var cam: camhandler.Camera = this.cam!;
        cam.CamHandlingZUp(gl, this.app!, 1.0, -1.0);
        var uniforms = this.uniforms!;
        uniforms.viewprojection = cam.viewProjection;   
  
        gl.bindVertexArray(this.skinVAO);
    
        this.afish!.forwardspeed=(this.animationParameters.move)?(this.animationParameters.speed):0.0;
        this.afish!.computeBone(time, this.animationParameters.move, this.animationParameters.movetail);
        this.afish!.prepareBoneTexture(gl,this.afish!.bindPoseInv2); 
       
        uniforms.world = m4.translate(m4.identity(), [20.0, -20.0, 0.0]);  // draw a fish
        twgl.setUniforms(this.twglprograminfo!, uniforms)
        twgl.drawBufferInfo(gl, this.bufferInfo!, this.afish!.mesh!.type);     
       
        uniforms.world = m4.translate(m4.identity(), [0.0, 0.0, 0.0]);     // draw a fish
        twgl.setUniforms(this.twglprograminfo!, uniforms)
        twgl.drawBufferInfo(gl, this.bufferInfo!, this.afish!.mesh!.type);
  
        this.afish!.computeBone(time, this.animationParameters.move, this.animationParameters.movetail);
        this.afish!.prepareBoneTexture(gl,this.afish!.bindPoseInv2);

        uniforms.world = m4.translate(m4.identity(), [50.0, -20.0, 10.0]); // draw a fish    
        twgl.setUniforms(this.twglprograminfo!, uniforms)
        twgl.drawBufferInfo(gl, this.bufferInfo!, this.afish!.mesh!.type);     

        uniforms.world = m4.translate(m4.identity(), [-10.0, 5.0, -10.0]); // draw a fish
        twgl.setUniforms(this.twglprograminfo!, uniforms)
        twgl.drawBufferInfo(gl, this.bufferInfo!, this.afish!.mesh!.type);
       
        requestAnimationFrame(() => this.render(++time));       
    }   
}
