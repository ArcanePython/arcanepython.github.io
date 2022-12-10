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


export type TAnimation1Parameters =
{
    b: baseapp.TbaseappParameters,
    texture: string,
    sling: number
}

export class Animation1 extends twglbaseapp.twglbaseapp 
{
    animation1Parameters: TAnimation1Parameters = {
        b:  this.baseappParameters,
        texture: 'geotriangle2',
        sling: 117,
      };  

    scene: scene.SceneInterface; // rotatingcubescene.RotatingCubeScene = new rotatingcubescene.RotatingCubeScene();
     
    clock: animationclock.AnimationClock = new animationclock.AnimationClock();

    constructor( cgl: WebGL2RenderingContext, capp: mtls.MouseListener | undefined , cscene: scene.SceneInterface, dictpar:Map<string,string>)
    {       
        super(cgl, capp, dictpar);
        this.scene = cscene;
    }

    public initGUI(parameters: { b: {color0: string, move: boolean, movetail:boolean, speed: number}, texture:string,  sling:number}): datgui.GUI
    {
        console.log("=> animation1 initGUI "+parameters);
        this.animation1Parameters = parameters ;
        var gui = super.createGUI(this.animation1Parameters.b, this.animation1Parameters);            
        // Slider for sling speed
        gui.add(this.animation1Parameters, 'sling').min(9).max(120).step(1);
        gui.updateDisplay();
        return gui;
    }

    public main(gl:WebGL2RenderingContext,  dictpar:Map<string,string>)
    {
        super.maininfo(gl, dictpar,this.scene.vertexShaderSource, this.scene.fragmentShaderSource );
        console.log("=> animation1 main");
        var time0: number = 0; // (this.vnow=new Date()).getTime();
        this.cam=camhandler.Camera.createZUpCamera(gl,dictpar,this.scene.scenesize, this.app!);
        this.cam.zoominVelocity = 0.5;
        this.scene.initScene(gl, this.animation1Parameters, this.twglprograminfo![0]);
        requestAnimationFrame(() => this.render(time0));      
        console.log("<= animation1 main");
        
    }
    
    render(time: number) 
    {
        var gl = this.gl!;
        if (this.twglprograminfo![0] != undefined && this.twglprograminfo![0].program != undefined) 
        {
            gl.useProgram(this.twglprograminfo![0].program);
            this.scene.animationParameters = this.animation1Parameters;
            this.scene.resizeCanvas(gl);  
            gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height);        
            gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.CULL_FACE);
            var cam: camhandler.Camera = this.cam!;
            cam.CamHandlingZUp(gl, this.app!, 1.0, -1.0);   
            this.scene.drawScene(gl, cam, time);
        }
        requestAnimationFrame(() => this.render(this.clock.getTime(this.clock.frame)));
    } 
}
