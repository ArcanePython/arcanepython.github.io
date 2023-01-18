import * as datgui from "dat.gui";                      // ext lib: datgui
import * as animationclock from "./baseapp/animationclock";     // own lib: frame counter
import * as mtls from "./baseapp/mouselistener";                // own lib: mouse/touhcpad

import * as camhandler from "./baseapp/camhandler"   // camera projection
import * as baseapp from "./baseapp/baseapp";        // base app for this
import * as scene from "./scene/scene"             // generic scene (interface)

export class Animation2 extends baseapp.BaseApp
{
    public scene: scene.SceneInterface[];                                                     
    public skyboxtexture: WebGLTexture | undefined;

    public static instance: Animation2|undefined;

    defaultParameters: baseapp.TAnimation1Parameters | undefined;
    
    //=============================================================================

    // all parameters in any scene
    private animation1Parameters: baseapp.TAnimation1Parameters = this.DefaultParameters;

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
        if (this.scene[0].sceneenv<0)  this.doShowBackgroundColorChoice = true;
          else if (dictPar?.get("backcolorchoice")!=undefined) this.doShowBackgroundColorChoice = ((+dictPar?.get("backcolorchoice")!)>0);
        this.clock = new animationclock.AnimationClock(); 
    }

    onChangeTextureCombo(value? : any)
    {
        var thisinstance = Animation2.instance as Animation2;
        console.log("we choose texture=["+value+"] thisinstance.scene.sceneenv="+thisinstance.scene[0].sceneenv);
        if (value=="Black") thisinstance.skyboxtexture = undefined; // result is a black background  
        if (value=="Yokohama") thisinstance.skyboxtexture = thisinstance.createEnvironmentMapTexture(thisinstance.gl!, 1, (p1,p2)=>{})!;    
        if (value=="Stockholm") thisinstance.skyboxtexture = thisinstance.createEnvironmentMapTexture(thisinstance.gl!,2, (p1,p2)=>{})!; 
        this.scene.forEach((s)=>{
          if (value=="None")  s.sceneenv = -1; // result is chosen color0 div  background  
          if (value=="Black") s.sceneenv = 0; //thisinstance.skyboxtexture = undefined; // result is a black background  
          if (value=="Yokohama") s.sceneenv = 1; //thisinstance.skyboxtexture = thisinstance.createEnvironmentMapTexture(thisinstance.gl!, thisinstance.scene[0].sceneenv=1, (p1,p2)=>{})!;    
          if (value=="Stockholm") s.sceneenv = 2; //thisinstance.skyboxtexture = thisinstance.createEnvironmentMapTexture(thisinstance.gl!, thisinstance.scene[0].sceneenv=2, (p1,p2)=>{})!; 
        });
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

    public main(gl:WebGL2RenderingContext,  dictpar:Map<string,string>)
    {
        this.dictpars = dictpar;
        this.cam=camhandler.Camera.createCamera(gl,dictpar,camhandler.Camera.CamYUp,  this.scene[0].scenesize, this.app!);
        this.cam.zoominVelocity = 0.5;    
        if (this.scene[0].sceneenv>0)
        {   
          console.log("animation2 initscenes with background");
            if (this.doTwglEnv) this.createEnvironmentMapGeoTwgl(gl); else this.createEnvironmentMapGeo(gl); 
            this.skyboxtexture= this.createEnvironmentMapTexture(gl, this.scene[0].sceneenv, this.textureEnvReadyCallback)!;     
        } else
        {       
          console.log("animation2 initscenes without background");
          this.initScenes();
      //    var n: number=0;
    //      var ainstance=this;
     //        ainstance.scene.forEach((s)=>{ s.initScene(ainstance.gl!, ainstance.animation1Parameters, ainstance.cam!, ainstance.dictpars,
      //        (ainstance.scene.length==(n+1)) ?ainstance.sceneReadyCallback:undefined); n++;});
                
        }
    }

    sceneReadyCallback(err: any): void
    { 
        console.log("-> sceneReadyCallback");
        var thisinstance = baseapp.instance!;
        var ainstance = thisinstance as Animation2;
        ainstance.scene[0].defaultCamera(ainstance.gl!, ainstance.cam!);
        ainstance.scene[0].resizeCanvas(ainstance.gl!); 
        console.log("-> sceneReadyCallback request first frame");
        requestAnimationFrame(() => ainstance.render(ainstance.ctime)); //ainstance.clock.getTime(this.clock.frame))); 
    }

    textureEnvReadyCallback(err: any, texture: WebGLTexture): void
    { 
        var thisinstance = baseapp.instance!;
        var ainstance = thisinstance as Animation2;
    //    var n: number=0;
        ainstance.initScenes();
    //    ainstance.scene.forEach((s)=>{ s.initScene(ainstance.gl!, ainstance.animation1Parameters, ainstance.cam!, ainstance.dictpars,
    //                                               (ainstance.scene.length==(n+1)) ?ainstance.sceneReadyCallback:undefined); n++;});
    }

    render(time: number)
    {
        var gl = this.gl!;
      /*  if (this.doclear)
        { 
          gl.clear(gl.DEPTH_BUFFER_BIT);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
       // scene.resizeCanvas(gl);  
        gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height);    
       */ var gl = this.gl!;
        if (this.doclear)
        { 
          gl.clear(gl.DEPTH_BUFFER_BIT);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
      //  scene.resizeCanvas(gl);  
        gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height);    
        var cam: camhandler.Camera = this.cam!;
        cam.CamHandlingYUp(gl, this.app!, 1.0, -1.0);   
        this.scene.forEach((s)=>{this.renderscene(gl, time,s,cam)});
        requestAnimationFrame(() => this.render(this.clock.getTime(this.clock.frame)));
    }

    renderscene(gl: WebGL2RenderingContext, time: number, scene: scene.SceneInterface, cam: camhandler.Camera) 
    {
       // var scene = this.scene[cscene];
     
        // prepare camera
     
        // set current scene parameters
        scene.animationParameters = this.animation1Parameters;

        // render skybox                                                                          
        if (scene.sceneenv>0)
        {         
            // set skybox camera
            if (!scene.animationParameters?.move) this.cameraPosition =   [cam?.Position()[0],cam?.Position()[1],cam?.Position()[2]];
              else   this.cameraPosition = (scene.animationParameters?.move)? [Math.cos(time * 0.005 * scene.animationParameters.speed), 0.0, 
                                                                                      Math.sin(time * 0.005 * scene.animationParameters.speed) ] : [ 4.0,0.0,0.0];      
            gl.disable(gl.CULL_FACE);  
            gl.depthFunc(gl.LEQUAL); 
            if (this.doTwglEnv) 
              {
                this.renderenvironmentmapTwgl(gl, this.animation1Parameters.fov * Math.PI / 180,  this.skyboxtexture!); 
              }
              else
              { 
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
