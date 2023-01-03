//local version animaton1 invalid culling
import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as mtls from "./mouselistener"; 
import * as baseapp from "./baseapp";
import * as animationclock from "./animationclock";
import * as datgui from "dat.gui";
import * as camhandler from "./camhandler"   // camera projection
//

import * as scene from "./scene"

export class Animation1 extends baseapp.BaseApp
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
   
    ctime: number = new Date().getTime();
    scene: scene.SceneInterface;                                                     
    clock: animationclock.AnimationClock;
    cam: camhandler.Camera|undefined;

    doclear: boolean = false;
    doTwglEnv: boolean = false;

    constructor( cgl: WebGL2RenderingContext, capp: mtls.MouseListener | undefined , cscene: scene.SceneInterface, dictpar:Map<string,string>, cdiv: string)
    {       
        super(cgl, capp, dictpar,cdiv);
        this.scene = cscene;
        this.clock = new animationclock.AnimationClock();
        
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
           // gl.useProgram(this.twglprograminfo![0].program);
            if (this.doTwglEnv) this.createEnvironmentMapGeoTwgl(gl); //, this.scene.positionLocation!);
              else this.createEnvironmentMapGeo(gl);  //, this.scene.positionLocation!);
            console.log("init2 skybox"+this.scene.sceneenv);
            this.createEnvironmentMapTexture(gl, this.scene.sceneenv, this.textureReadyCallback)!;
      
        }  else 
        {       
            console.log("initial this.clock.frame="+this.clock.frame+" gettime=>"+this.clock.getTime(this.clock.frame));
            this.scene.initScene(gl, this.animation1Parameters, dictpar, this.twglprograminfo![1], this.sceneReadyCallback);
         // this.scene.resizeCanvas(gl);  
       //   requestAnimationFrame(() => this.render(this.clock.getTime(this.clock.frame))); 
        }
            
        console.log("<= animation1 main");
        
    }

    sceneReadyCallback(err: any): void
    { 
        var thisinstance = baseapp.instance!;
        var ainstance = thisinstance as Animation1;
        console.log("=>Animation1 event sceneReadyCallback");
        ainstance.scene.resizeCanvas(ainstance.gl!); 
        console.log("<=Animation1event request first frame.");
        requestAnimationFrame(() => ainstance.render(ainstance.ctime)); //ainstance.clock.getTime(this.clock.frame))); 
        console.log("<=Animation1event sceneReadyCallback ready, first frame requested.");
    }

    textureReadyCallback(err: any, texture: WebGLTexture): void
    { 
        var thisinstance = baseapp.instance!;
        var ainstance = thisinstance as Animation1;
        //ainstance.scene.resizeCanvas(ainstance.gl!); 
        console.log("=>Animation1 event textureReadyCallback: ainstance.scene.initScene");
        ainstance.scene.initScene(ainstance.gl!, ainstance.animation1Parameters, undefined, ainstance.twglprograminfo![1], ainstance.sceneReadyCallback);   
        //requestAnimationFrame(() => ainstance.render(ainstance.ctime)); //ainstance.clock.getTime(this.clock.frame))); 
        console.log("<=Animation1 return from initScene()");
    }

    render(time: number) 
    {
        var gl = this.gl!;
        if (this.doclear)
        { 
          //gl.enable(gl.BLEND);
          //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
          gl.clear(gl.DEPTH_BUFFER_BIT);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
     //   gl.enable(gl.CULL_FACE);
     //   gl.enable(gl.DEPTH_TEST);     
      //        
    
        this.scene.animationParameters = this.animation1Parameters;
       // this.scene.resizeCanvas(gl);  
    //    if(this.clock.frame==0) 
        gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height);        
         var cam: camhandler.Camera = this.cam!;
        cam.CamHandlingYUp(gl, this.app!, 1.0, -1.0);   

       
       //if ((this.clock.frame%2)==0) // semi-transparent "flickeirng"
       //if (this.clock.frame<10)     // background vanish after 10 frames
        if (this.scene.sceneenv>0)
        {
         
            if (!this.scene.animationParameters?.b.move) this.cameraPosition =   [cam?.Position()[0],cam?.Position()[1],cam?.Position()[2]];
              else   this.cameraPosition = (this.scene.animationParameters?.b.move)? [Math.cos(time * 0.01 * this.scene.animationParameters.b.speed), 0, 
                                                                                      Math.sin(time * 0.01 * this.scene.animationParameters.b.speed) ] : [ 1.0,0.0,0.0];
              


            //this.cameraPosition = this.scene.cameraPosition==undefined? [Math.cos(vtime * .001), 0, Math.sin(vtime * .001)]:this.scene.cameraPosition;    
            var  fieldOfViewRadians = 60 * Math.PI / 180; 
            //this.renderenvironmentmap(gl, fieldOfViewRadians, { invproj: this.viewDirectionProjectionInverseLocation!, loc:this.skyboxLocation! }, time);
            gl.disable(gl.CULL_FACE);  
            
            //gl.disable(gl.DEPTH_TEST);     
            gl.useProgram(this.twglprograminfo![0].program);
            gl.depthFunc(gl.LEQUAL); 
           // if ((this.clock.frame %8)==0) 
             if (this.doTwglEnv) 
             {
              this.renderenvironmentmapTwgl(gl, fieldOfViewRadians,  this.texture!); 
             }
             else
              { 
             //   gl.disable(gl.CULL_FACE);  
             //   gl.disable(gl.DEPTH_TEST);  
               this.renderenvironmentmap(gl, fieldOfViewRadians, { invproj: this.viewDirectionProjectionInverseLocation!, loc:this.skyboxLocation! }, this.texture!);
              } // console.log("render env cam="+this.cameraPosition+" target="+this.cameraTarget+" "+this.vaoEnvironment+" "+this.viewDirectionProjectionInverseLocation!+" "+this.skyboxLocation! +" "+time);
        }
      // if ((this.clock.frame)>0)
      //  {
        //  gl.flush();
      //    requestAnimationFrame(() => this.render(this.clock.getTime(this.clock.frame)));
      //    return;
      //  }

     //   if ((this.clock.frame%2)==1)
   
        if (this.twglprograminfo![1] != undefined && this.twglprograminfo![1] != null )       
        {  
            gl.useProgram(this.twglprograminfo![1].program);
            gl.enable(gl.DEPTH_TEST); // obscure vertices behind other vertices
            gl.enable(gl.CULL_FACE);  // only show left-turned triangles
   
      //      this.scene.restoreContext();
      //    gl.enable(gl.BLEND);
      //    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
         // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      
        //   if (this.clock.frame>60)
       
            this.scene.drawScene(gl, cam, time);
        }
     //   gl.flush();
     //   console.log("frame="+this.clock.frame+" "+time);
     //  if (this.clock.frame<0)
      //  if (time<(this.ctime+300)) 
         requestAnimationFrame(() => this.render(this.clock.getTime(this.clock.frame)));
    } 
}
