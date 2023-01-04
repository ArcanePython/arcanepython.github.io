import * as twgl from "twgl.js"   // Greg's work

import * as datgui from "dat.gui"

import * as camhandler from "./camhandler" // camera projection     
import * as scene from "./scene"

export class SkyBoxScene implements scene.SceneInterface
{
    // SceneInterface only, skybox is shown in animation container (now animation1.ts)
    scenesize: number = 40;
    sceneenv: number = 1;
    animationParameters: scene.TAnimation1Parameters | undefined;
    vertexShaderSource = ``;
    fragmentShaderSource = ``; 
    twglprograminfo: twgl.ProgramInfo[]|null=null;
    cameraPosition: [number,number,number] | undefined
    positionLocation: number | undefined;
    resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }
    
    speedpreset: number|undefined;

    constructor(gl: WebGL2RenderingContext, dictPars: Map<string,string> | undefined)
    { 
        this.speedpreset = 0.05;
        if (dictPars?.has("speed"))
        {
            this.speedpreset = +dictPars?.get("speed")!;
            console.log("specified: "+ this.speedpreset) ;
        }
    }

    initScene(gl: WebGL2RenderingContext, cap:scene.TAnimation1Parameters, dictpar:Map<string,string>, progenv: twgl.ProgramInfo, sceneReadyCallback: (a:any)=>void | undefined)
    { 
        this.animationParameters=(this.animationParameters==undefined)?cap:this.animationParameters;
       if (this.speedpreset) this.animationParameters.b.speed = this.speedpreset!;
        sceneReadyCallback(0); 
    }

    extendGUI(gui: datgui.GUI)
    { 
        gui.add(this.animationParameters!, 'fov', 5.0,85.0,1.0 );
 
    }
  
    drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number) 
    { }
}
