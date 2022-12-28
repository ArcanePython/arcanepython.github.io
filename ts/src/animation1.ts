import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as mtls from "./mouselistener"; 
import * as baseapp from "./baseapp";
import * as twglbaseapp from "./twglbaseapp";
import * as animationclock from "./animationclock";
import * as datgui from "dat.gui";
import * as camhandler from "./camhandler"   // camera projection
//

import * as scene from "./scene"

export class Animation1 extends twglbaseapp.twglbaseapp 
{
  
    animation1Parameters: scene.TAnimation1Parameters = {
        b:  this.baseappParameters,
        texture: 'geotriangle2',
        typelight: 'point light',
        sling: 117,
        shininess: 0.1,
        movetail: true
      };  

    //parameters for the skybox shader
    skyboxLocation: WebGLUniformLocation | undefined;
    viewDirectionProjectionInverseLocation: WebGLUniformLocation | undefined;

    scene: scene.SceneInterface;                                                     
    clock: animationclock.AnimationClock = new animationclock.AnimationClock();

    constructor( cgl: WebGL2RenderingContext, capp: mtls.MouseListener | undefined , cscene: scene.SceneInterface, dictpar:Map<string,string>, cdiv: string)
    {       
        super(cgl, capp, dictpar,cdiv);
        this.scene = cscene;
        console.log("<= animation1 constructor");
    }
    
    public initGUI(parameters: scene.TAnimation1Parameters): datgui.GUI // { b: {color0: string, move: boolean,  speed: number}, movetail:boolean, texture:string,  sling:number, shininess: number }): datgui.GUI
    {
        console.log("=> animation1 initGUI "+parameters);
        this.animation1Parameters = parameters ;
        var gui = super.createGUI(this.animation1Parameters.b, this.animation1Parameters);   
        this.scene.animationParameters =this.animation1Parameters; // { b: b, movetail:movetail, texture: texture,sling: sling,shininess: shininess };
        this.scene.extendGUI(gui);         
        return gui;
    }

    public main(gl:WebGL2RenderingContext,  dictpar:Map<string,string>)
    {
       
              
     //   this.twglprograminfo = Array(2);     
     ///   if (this.scene.sceneenv<0)
     //      super.maininfos(gl, dictpar, [{vs:'',fs:''},{vs:this.scene.vertexShaderSource, fs:this.scene.fragmentShaderSource}] );
     //     else 
     //      super.maininfos(gl, dictpar, [ {vs:this.vsEnvironmentMap, fs:this.fsEnvironmentMap}, {vs:this.scene.vertexShaderSource,fs:this.scene.fragmentShaderSource}]);
  /*
        if (this.scene.sceneenv>0)
        {
            var nshaders: number = ((this.scene.twglprograminfo!=null && this.scene.twglprograminfo!=undefined) )?this.scene.twglprograminfo.length:1;
            console.log("=> Initialize environment background shader 0/"+nshaders);
            console.log("vertex environment: "+super.vsEnvironmentMap);
            console.log("fragment environment: "+super.fsEnvironmentMap);
             console.log("<= Initialize environment background shader 0");
        } else
            console.log("=> animation1.scene has no environment background");
*/
        if (this.scene.twglprograminfo!=null && this.scene.twglprograminfo!=undefined) 
           {
              // if (this.twglprograminfo==null || this.twglprograminfo==undefined) 
              // { 
              //   console.log("=> allocate animation.twglprograminfo "+this.scene.twglprograminfo.length+" items");          
              //   this.twglprograminfo = new Array(this.scene.twglprograminfo.length);
              // }
              var pienv = this.twglprograminfo![0];
              this.twglprograminfo = new Array(this.scene.twglprograminfo.length);
              this.twglprograminfo[0]=pienv;

               for (var j=0; j<this.scene.twglprograminfo.length; j++)
                   if (this.scene.twglprograminfo[j]!=null && this.scene.twglprograminfo[j]!=undefined) 
                   {
                     console.log("=> plugin scene.twglprograminfo["+j+"] into animation parent class");     
                     this.twglprograminfo![j]=this.scene.twglprograminfo[j];
                   }
               console.log("<= provide scene.twglprograminfo to animation parent class");
           } else
               console.log("=> animation1.scene.twglprograminfo has no shaders registered");


        
     //      super.maininfos(gl, dictpar, [{vs:'',fs:''},{vs:this.scene.vertexShaderSource, fs:this.scene.fragmentShaderSource}] );
     //     else 
     //      super.maininfos(gl, dictpar, [ {vs:this.vsEnvironmentMap, fs:this.fsEnvironmentMap}, {vs:this.scene.vertexShaderSource,fs:this.scene.fragmentShaderSource}]);
  
   
    
        console.log("=> animation1 main create camera");
        var time0: number = 0;
        this.cam=camhandler.Camera.createCamera(gl,dictpar,camhandler.Camera.CamYUp,  this.scene.scenesize, this.app!);
        this.cam.zoominVelocity = 0.5;

        if (this.scene.sceneenv>0)
        {   
            gl.useProgram(this.twglprograminfo![0].program);
            console.log("init1 skybox"+this.scene.sceneenv+" this.scene.positionLocation="+this.scene.positionLocation);
            this.skyboxLocation = gl.getUniformLocation(this.twglprograminfo![0].program, "u_skybox")!;
            this.viewDirectionProjectionInverseLocation = gl.getUniformLocation(this.twglprograminfo![0].program, "u_viewDirectionProjectionInverse")!;
            this.createEnvironmentMapGeo(gl, this.scene.positionLocation!);
            console.log("init2 skybox"+this.scene.sceneenv);
            this.createEnvironmentMapTexture(gl, this.scene.sceneenv, this.textureReadyCallback);
            this.scene.initScene(gl, this.animation1Parameters, dictpar, this.twglprograminfo![1]);
     
        }  else 
        {

        
   
   
        
        this.scene.initScene(gl, this.animation1Parameters, dictpar, this.twglprograminfo![1]);
        requestAnimationFrame(() => this.render(0)); 
        }
            
        console.log("<= animation1 main");
        
    }

    textureReadyCallback(err: any, texture: WebGLTexture): void
    { 
        var thisinstance = baseapp.instance!;
        var ainstance = thisinstance as Animation1;
        console.log("=>Animation1 Environment texture isready.");
        requestAnimationFrame(() => ainstance.render(0)); 
        console.log("<=Animation1 Environment texture isready.");
    }
    
    render(time: number) 
    {
        var gl = this.gl!;
        this.scene.animationParameters = this.animation1Parameters;
        this.scene.resizeCanvas(gl);  
        gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height);        
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        var cam: camhandler.Camera = this.cam!;
        cam.CamHandlingYUp(gl, this.app!, 1.0, -1.0);   
        if (this.scene.sceneenv>0)
        {
            gl.useProgram(this.twglprograminfo![0].program);
            var vtime = (this.scene.animationParameters.b.move)?time:0.0;

             if (!this.scene.animationParameters?.b.move) this.cameraPosition = cam?.Position() as [number,number,number];
             else   this.cameraPosition = (this.scene.animationParameters?.b.move)? [Math.cos(time * 0.01 * this.scene.animationParameters.b.speed), 0, 
                                                                                     Math.sin(time * 0.01 * this.scene.animationParameters.b.speed) ] : [ 1.0,0.0,0.0];
       


            //this.cameraPosition = this.scene.cameraPosition==undefined? [Math.cos(vtime * .001), 0, Math.sin(vtime * .001)]:this.scene.cameraPosition;    
            var  fieldOfViewRadians = 60 * Math.PI / 180; 
            this.renderenvironmentmap(gl, fieldOfViewRadians,this.vaoEnvironment!, { invproj: this.viewDirectionProjectionInverseLocation!, loc:this.skyboxLocation! }, time);
           // console.log("render env "+this.vaoEnvironment+" "+this.viewDirectionProjectionInverseLocation!+" "+this.skyboxLocation! +" "+time);
        }
        if (this.twglprograminfo![1] != undefined && this.twglprograminfo![1] != null )         
          gl.useProgram(this.twglprograminfo![1].program);
           

        this.scene.drawScene(gl, cam, time);

        requestAnimationFrame(() => this.render(this.clock.getTime(this.clock.frame)));
    } 
}
