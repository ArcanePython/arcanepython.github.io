import * as datgui from "dat.gui";                      // ext lib: datgui
import * as animationclock from "./baseapp/animationclock";     // own lib: frame counter
import * as mtls from "./baseapp/mouselistener";                // own lib: mouse/touhcpad

import * as camhandler from "./baseapp/camhandler"   // camera projection
import * as baseapp from "./baseapp/baseapp";        // base app for this
import * as scene from "./scene/scene"             // generic scene (interface)

export class Animation2 extends baseapp.BaseApp
{
    public scene: scene.SceneInterface[];                                                     
   
    public static instance: Animation2|undefined;

    defaultParameters: baseapp.TAnimation1Parameters | undefined;
    
    //=============================================================================

    // all parameters in any scene
    public animation1Parameters: baseapp.TAnimation1Parameters = this.DefaultParameters;

    private ctime: number = new Date().getTime();
    private clock: animationclock.AnimationClock;
    private  cam: camhandler.Camera|undefined;
    
    private doclear: boolean = false;
    private doTwglEnv: boolean = false;  // when true, background is drawn with twgl.drawBufferInfo, which does not work with any scenery using twgl.DrawBufferInfo
                                         // when false, background is drawn using a restore context followed by drawArrays(), which works for all scenes 

    public dictpars:Map<string,string>|undefined;  // used in callbacks

    constructor( cgl: WebGL2RenderingContext, capp: mtls.MouseListener | undefined , cscene: scene.SceneInterface[], dictPar:Map<string,string>, cdiv: string)
    {       
        super(cgl, capp, dictPar,cdiv);
        Animation2.instance = this;
        this.scene = cscene;
        this.doShowBackgroundColorChoice = false;
        if (this.sceneenv<0)  this.doShowBackgroundColorChoice = true;
          else if (dictPar?.get("backcolorchoice")!=undefined) this.doShowBackgroundColorChoice = ((+dictPar?.get("backcolorchoice")!)>0);
        this.clock = new animationclock.AnimationClock(); 
    }

    public initGUI( parameters: baseapp.TAnimation1Parameters, cscene:number): datgui.GUI
    {
        console.log("=> animation1 initGUI "+parameters);
        this.animation1Parameters = parameters ;
        for (var ii:number=0; ii<this.scene.length;ii++)
        {
            this.scene[ii].animationParameters =this.animation1Parameters;
        }
        var gui = super.createGUI( this.animation1Parameters);  
        this.scene[cscene].extendGUI(gui);  
        return gui;
    }

    public initScenes()
    {
      var n: number=0;
      var ainstance=(baseapp.instance! as Animation2);
      ainstance.scene.forEach((s)=>{ s.initScene(ainstance.gl!, ainstance.animation1Parameters, ainstance.cam!, ainstance.dictpars,
          (ainstance.scene.length==(n+1)) ?ainstance.sceneReadyCallback:undefined); n++;});
    }

    private maxSceneSize(): number
    {
      var maxsize=0;
      this.scene.forEach((s)=>{if (s.scenesize>maxsize) maxsize=s.scenesize; })
      return maxsize;
    }

    public main(gl:WebGL2RenderingContext,  dictPars:Map<string,string>)
    {
        this.dictpars = dictPars;
        var camtp: string|undefined;
        if (dictPars?.get("cam")!=undefined) camtp = dictPars?.get("cam");
        if (camtp==undefined || camtp=="yup")
         { this.cam=camhandler.Camera.createCamera(gl,dictPars,camhandler.Camera.CamYUp, this.maxSceneSize(), this.app!); this.up=[0,1,0]; }
         else { this.cam=camhandler.Camera.createCamera(this.gl!,this.dictpars!,camhandler.Camera.CamZUp, this.maxSceneSize(), this.app!); this.up=[0,0,1]; }
        this.cam.zoominVelocity = 0.5;  
        if (dictPars?.get("env")!=undefined) this.sceneenv  = +dictPars?.get("env")!;
        if (this.doTwglEnv) this.createEnvironmentMapGeoTwgl(gl); else this.createEnvironmentMapGeo(gl); 
        this.skyboxtexture= this.createEnvironmentMapTexture(gl, (this.sceneenv<0)?1:this.sceneenv, this.textureEnvReadyCallback)!;     
    }

    sceneReadyCallback(err: any): void
    { 
        console.log("-> sceneReadyCallback");
        var thisinstance = baseapp.instance!;
        var ainstance = thisinstance as Animation2;
        if (ainstance.dictpars?.get("cat")!=undefined || ainstance.dictpars?.get("chair2")!=undefined)
        {
          ainstance.cam=camhandler.Camera.createCamera(ainstance.gl!,ainstance.dictpars!,camhandler.Camera.CamZUp, ainstance.maxSceneSize(), ainstance.app!);
         // ainstance.changedCam=true;
        }
        ainstance.cam!.zoominVelocity = 0.5;  
        ainstance.scene[0].defaultCamera(ainstance.gl!, ainstance.cam!);
        ainstance.scene[0].resizeCanvas(ainstance.gl!); 
    
        console.log("-> sceneReadyCallback request first frame");
        ainstance.changedCam=true;
        requestAnimationFrame(() => ainstance.render(ainstance.ctime)); //ainstance.clock.getTime(this.clock.frame))); 
    }

    textureEnvReadyCallback(err: any, texture: WebGLTexture): void
    { 
        var thisinstance = baseapp.instance!;
        var ainstance = thisinstance as Animation2;
        ainstance.initScenes();
    }

    render(time: number)
    {
        var gl = this.gl!;
        var gl = this.gl!;
        if (this.doclear)
        { 
          gl.clear(gl.DEPTH_BUFFER_BIT);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
        //scene.resizeCanvas(gl);  
        gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height);    
        var cam: camhandler.Camera = this.cam!;
        cam.camHeight = this.animation1Parameters.camheight;
        if (this.changedCam)
        {
         if (cam.camType==camhandler.Camera.CamYUp) cam.setYUpEye();
         if (cam.camType==camhandler.Camera.CamZUp) cam.setZUpEye();
        // console.log("camHeight="+cam.camHeight);
         this.changedCam = false;
        } else
        if (cam.camType==camhandler.Camera.CamYUp)
          cam.CamHandlingYUp(gl, this.app!, 1.0, 1.0);   
        else
          cam.CamHandlingZUp(gl, this.app!, 1.0, -1.0);   
        var n =0;
        this.scene.forEach((s)=>{this.renderscene(gl, time,s,cam,n==0);n++;});

        requestAnimationFrame(() => this.render(this.clock.getTime(this.clock.frame)));
    }

    renderscene(gl: WebGL2RenderingContext, time: number, scene: scene.SceneInterface, cam: camhandler.Camera, renderEnvironment: boolean) 
    {
        // set current scene parameters
        scene.animationParameters = this.animation1Parameters;

        // render skybox                                                                          
        if (this.sceneenv>=0 && renderEnvironment)
        {         
            // set skybox camera
            if (!scene.animationParameters?.move) this.cameraPosition = (cam.camType==camhandler.Camera.CamZUp)?[cam?.Position()[0],cam?.Position()[2],cam?.Position()[1]]:[cam?.Position()[0],cam?.Position()[1],cam?.Position()[2]];
              else   this.cameraPosition = (scene.animationParameters?.move)? [Math.cos(time * 0.005 * scene.animationParameters.speed), 0.0, 
                                                                                      Math.sin(time * 0.005 * scene.animationParameters.speed) ] : [ 4.0,0.0,0.0];      
            gl.depthFunc(gl.LEQUAL); 
            if (this.doTwglEnv) 
              {
                this.renderenvironmentmapTwgl(gl, this.animation1Parameters.fov * Math.PI / 180,  this.skyboxtexture!); 
              }
              else
              { 
                gl.disable(gl.CULL_FACE);    
                this.renderenvironmentmap(gl, this.animation1Parameters.fov * Math.PI / 180, this.skyboxtexture!);
              } 
        }    
        // render scene
        gl.enable(gl.DEPTH_TEST); // obscure vertices behind other vertices
        gl.enable(gl.CULL_FACE);  // only show left-turned triangles
        scene.drawScene(gl, cam, time);
        // request next frame
       
    } 
}
