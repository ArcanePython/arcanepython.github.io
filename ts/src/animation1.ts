import * as datgui from "dat.gui";                      // ext lib: datgui
import * as animationclock from "./baseapp/animationclock";     // own lib: frame counter
import * as mtls from "./baseapp/mouselistener";                // own lib: mouse/touhcpad

import * as camhandler from "./baseapp/camhandler"   // camera projection
import * as baseapp from "./baseapp/baseapp";        // base app for this
import * as scene from "./scene/scene"             // generic scene (interface)

export class Animation1 extends baseapp.BaseApp
{
    // all parameters in any scene
    animation1Parameters: scene.TAnimation1Parameters = {
        b:  this.baseappParameters,
        texture: 'geotriangle2',
        fov: 60,
        typelight: 'point light',
        sling: 117,
        shininess: 0.1,
        movetail: true
      };  
    ctime: number = new Date().getTime();
    scene: scene.SceneInterface;                                                     
    clock: animationclock.AnimationClock;
    cam: camhandler.Camera|undefined;

    doclear: boolean = true;
    doTwglEnv: boolean = false;

    constructor( cgl: WebGL2RenderingContext, capp: mtls.MouseListener | undefined , cscene: scene.SceneInterface, dictpar:Map<string,string>, cdiv: string)
    {       
        super(cgl, capp, dictpar,cdiv);
        this.scene = cscene;
        this.clock = new animationclock.AnimationClock();
    }
    
    public initGUI(parameters: scene.TAnimation1Parameters): datgui.GUI
    {
        console.log("=> animation1 initGUI "+parameters);
        this.animation1Parameters = parameters ;
        var gui = super.createGUI(this.animation1Parameters.b, this.animation1Parameters);   
        this.scene.animationParameters =this.animation1Parameters;
        this.scene.extendGUI(gui);         
        return gui;
    }

    public main(gl:WebGL2RenderingContext,  dictpar:Map<string,string>)
    {
        if (this.scene.twglprograminfo!=null && this.scene.twglprograminfo!=undefined) 
           {
              var pienv = this.twglprograminfo![0];
              this.twglprograminfo = new Array(this.scene.twglprograminfo.length);
              this.twglprograminfo[0]=pienv;

               for (var j=0; j<this.scene.twglprograminfo.length; j++)
                   if (this.scene.twglprograminfo[j]!=null && this.scene.twglprograminfo[j]!=undefined) 
                   {
                     this.twglprograminfo![j]=this.scene.twglprograminfo[j];
                   }
           }
      
        this.cam=camhandler.Camera.createCamera(gl,dictpar,camhandler.Camera.CamYUp,  this.scene.scenesize, this.app!);
        this.cam.zoominVelocity = 0.5;

        if (this.scene.sceneenv>0)
        {   
            gl.useProgram(this.twglprograminfo![0].program);
             this.skyboxLocation = gl.getUniformLocation(this.twglprograminfo![0].program, "u_skybox")!;
            this.viewDirectionProjectionInverseLocation = gl.getUniformLocation(this.twglprograminfo![0].program, "u_viewDirectionProjectionInverse")!;
            if (this.doTwglEnv) this.createEnvironmentMapGeoTwgl(gl);
              else this.createEnvironmentMapGeo(gl); 
            this.createEnvironmentMapTexture(gl, this.scene.sceneenv, this.textureEnvReadyCallback)!;     
        }  else 
        {      
            this.scene.initScene(gl, this.animation1Parameters, dictpar, this.twglprograminfo![1], this.sceneReadyCallback);
        }
    }

    sceneReadyCallback(err: any): void
    { 
        var thisinstance = baseapp.instance!;
        var ainstance = thisinstance as Animation1;
        ainstance.scene.resizeCanvas(ainstance.gl!); 
        requestAnimationFrame(() => ainstance.render(ainstance.ctime)); //ainstance.clock.getTime(this.clock.frame))); 
    }

    textureEnvReadyCallback(err: any, texture: WebGLTexture): void
    { 
        var thisinstance = baseapp.instance!;
        var ainstance = thisinstance as Animation1;
        ainstance.scene.initScene(ainstance.gl!, ainstance.animation1Parameters, undefined, ainstance.twglprograminfo![1], ainstance.sceneReadyCallback);   
    }

    render(time: number) 
    {
        var gl = this.gl!;
        if (this.doclear)
        { 
          gl.clear(gl.DEPTH_BUFFER_BIT);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
        this.scene.animationParameters = this.animation1Parameters;
        this.scene.resizeCanvas(gl);  
        gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height);        
         var cam: camhandler.Camera = this.cam!;
        cam.CamHandlingYUp(gl, this.app!, 1.0, -1.0);   
        if (this.scene.sceneenv>0)
        {         
            if (!this.scene.animationParameters?.b.move) this.cameraPosition =   [cam?.Position()[0],cam?.Position()[1],cam?.Position()[2]];
              else   this.cameraPosition = (this.scene.animationParameters?.b.move)? [Math.cos(time * 0.005 * this.scene.animationParameters.b.speed), 0, 
                                                                                      Math.sin(time * 0.005 * this.scene.animationParameters.b.speed) ] : [ 1.0,0.0,0.0];
            var  fieldOfViewRadians = this.animation1Parameters.fov * Math.PI / 180; 
            gl.useProgram(this.twglprograminfo![0].program);
            gl.disable(gl.CULL_FACE);  
            gl.depthFunc(gl.LEQUAL); 
            if (this.doTwglEnv) 
              {
                this.renderenvironmentmapTwgl(gl, fieldOfViewRadians,  this.texture!); 
              }
              else
              { 
                this.renderenvironmentmap(gl, fieldOfViewRadians, { invproj: this.viewDirectionProjectionInverseLocation!, loc:this.skyboxLocation! }, this.texture!);
              } 
        }    
        if (this.twglprograminfo![1] != undefined && this.twglprograminfo![1] != null )       
        {  
            gl.useProgram(this.twglprograminfo![1].program);
            gl.enable(gl.DEPTH_TEST); // obscure vertices behind other vertices
            gl.enable(gl.CULL_FACE);  // only show left-turned triangles
            this.scene.drawScene(gl, cam, time);
        }
        requestAnimationFrame(() => this.render(this.clock.getTime(this.clock.frame)));
    } 
}
