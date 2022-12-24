
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
        sling: 117,
        shininess: 0.1,
        movetail: true
      };  

    scene: scene.SceneInterface;                                                     
    clock: animationclock.AnimationClock = new animationclock.AnimationClock();

       constructor( cgl: WebGL2RenderingContext, capp: mtls.MouseListener | undefined , cscene: scene.SceneInterface, dictpar:Map<string,string>)
    {       
        super(cgl, capp, dictpar);
        this.scene = cscene;
    }

    public initGUI(parameters: scene.TAnimation1Parameters): datgui.GUI // { b: {color0: string, move: boolean,  speed: number}, movetail:boolean, texture:string,  sling:number, shininess: number }): datgui.GUI
    {
        console.log("=> animation1 initGUI "+parameters);
        this.animation1Parameters = parameters ;
        var gui = super.createGUI(this.animation1Parameters.b, this.animation1Parameters);   
        this.scene.animationParameters =this.animation1Parameters; // { b: b, movetail:movetail, texture: texture,sling: sling,shininess: shininess };
        this.scene.extendGUI(gui);         
        // Slider for sling speed
        //gui.add(this.animation1Parameters, 'sling').min(9).max(120).step(1);
       // Slider for shininess
        //gui.add(this.animation1Parameters, 'shininess').min(0).max(20.0).step(0.1);
        //gui.updateDisplay();
        return gui;
    }

    skyboxLocation: WebGLUniformLocation | undefined;
    viewDirectionProjectionInverseLocation: WebGLUniformLocation | undefined;
 
    public main(gl:WebGL2RenderingContext,  dictpar:Map<string,string>)
    {
        console.log("=> animation1 main create shaders");
        if (this.scene.twglprograminfo!=null) 
        {
            super.twglprograminfo = this.scene.twglprograminfo;
            console.log("=> provide scene.twglprograminfo to animation parent class");
        } 
        else
        if (this.scene.sceneenv<0)
           super.maininfos(gl, dictpar, [{vs:'',fs:''},{vs:this.scene.vertexShaderSource, fs:this.scene.fragmentShaderSource}] );
          else 
           super.maininfos(gl, dictpar, [ {vs:this.vsEnvironmentMap, fs:this.fsEnvironmentMap}, {vs:this.scene.vertexShaderSource,fs:this.scene.fragmentShaderSource}]);
  
        console.log("=> animation1 main create camera");
        var time0: number = 0;
        this.cam=camhandler.Camera.createYUpCamera(gl,dictpar,this.scene.scenesize, this.app!);
        this.cam.zoominVelocity = 0.5;

        if (this.scene.sceneenv>0)
        {   
            this.skyboxLocation = gl.getUniformLocation(this.twglprograminfo![0].program, "u_skybox")!;
            this.viewDirectionProjectionInverseLocation = gl.getUniformLocation(this.twglprograminfo![0].program, "u_viewDirectionProjectionInverse")!;
            this.createEnvironmentMapGeo(gl, this.scene.positionLocation!);
            this.createEnvironmentMapTexture(gl, this.scene.sceneenv);
        } 
            this.scene.initScene(gl, this.animation1Parameters, this.twglprograminfo![1]);

        requestAnimationFrame(() => this.render(time0));      
        console.log("<= animation1 main");
        
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
            this.cameraPosition = this.scene.cameraPosition==undefined? [Math.cos(time * .004), 0, Math.sin(time * .004)]:this.scene.cameraPosition;    
            var  fieldOfViewRadians = 60 * Math.PI / 180; 
            this.renderenvironmentmap(gl, fieldOfViewRadians!,this.vaoEnvironment!, { invproj: this.viewDirectionProjectionInverseLocation!, loc:this.skyboxLocation! }, time);
        }
        if (this.twglprograminfo![1] != undefined ) gl.useProgram(this.twglprograminfo![1].program);
        this.scene.drawScene(gl, cam, time);
        requestAnimationFrame(() => this.render(this.clock.getTime(this.clock.frame)));
    } 
}
