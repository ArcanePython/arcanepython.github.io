import * as twgl from "twgl.js"   // Greg's work

import * as datgui from "dat.gui"

import * as camhandler from "./../baseapp/camhandler" // camera projection     
import * as scene from "./scene"


import { TAnimation1Parameters }  from "./../baseapp/baseapp"

export class SkyBoxScene implements scene.SceneInterface
{
    // SceneInterface only, skybox is shown in animation container (now animation1.ts)
    scenesize: number = 40;
    sceneenv: number = 1;
    animationParameters: TAnimation1Parameters | undefined;
    vertexShaderSource = ``;
    fragmentShaderSource = ``; 
  //  twglprograminfo: twgl.ProgramInfo[]|null=null;
    cameraPosition: [number,number,number] | undefined
    positionLocation: number | undefined;
    resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }
    
    speedpreset: number|undefined;

    public defaultCamera(gl: WebGL2RenderingContext, cam: camhandler.Camera) { }

    constructor(gl: WebGL2RenderingContext, dictPars: Map<string,string> | undefined)
    { 
        this.speedpreset = 0.05;
        if (dictPars?.has("speed"))
        {
            this.speedpreset = +dictPars?.get("speed")!;
            console.log("specified: speedpreset="+ this.speedpreset) ;
            // no shaders (this scene does not have a context)
        }
    }

    initScene(gl: WebGL2RenderingContext, cap:TAnimation1Parameters, cam: camhandler.Camera, dictpar:Map<string,string>,  sceneReadyCallback: (a:any)=>void | undefined)
    { 
        this.animationParameters=(this.animationParameters==undefined)?cap:this.animationParameters;
        if (this.speedpreset) this.animationParameters.speed = this.speedpreset!;
        sceneReadyCallback(0); 
    }

    extendGUI(gui: datgui.GUI)
    { 
        gui.add(this.animationParameters!, 'fov', 5.0,85.0,1.0 );
    }
  
    drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number) 
    { }
}
