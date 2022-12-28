import * as twgl from "twgl.js"   // Greg's work

import * as datgui from "dat.gui"

import * as camhandler from "./camhandler" // camera projection     
import * as scene from "./scene"

export class SkyBoxScene implements scene.SceneInterface
{
    // SceneInterface only, skybox is shown in animation container (now animation1.ts)
    scenesize: number = 40;
    sceneenv: number = 2;
    animationParameters: scene.TAnimation1Parameters | undefined;
    vertexShaderSource = ``;
    fragmentShaderSource = ``; 
    twglprograminfo: twgl.ProgramInfo[]|null=null;
    cameraPosition: [number,number,number] | undefined
    positionLocation: number | undefined;
    resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }
    
    initScene(gl: WebGL2RenderingContext, cap:scene.TAnimation1Parameters, dictpar:Map<string,string>, progenv: twgl.ProgramInfo)
    {  }

    extendGUI(gui: datgui.GUI)
    { }
  
    drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number) 
    { }
}
