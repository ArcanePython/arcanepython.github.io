import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as datgui from "dat.gui"

import * as camhandler from "./../baseapp/camhandler"   // camera projection

import { TbaseappParameters }  from "./../baseapp/baseapp"

export type TAnimation1Parameters =
{
    movetail: boolean,
    texture: string,
    sling: number,
    shininess: number,
    typelight: string;
    fov: number;
    b: TbaseappParameters,
      // Checkbox tail animation on/off
     
}

//import { TAnimation1Parameters }  from "./animation1"

export interface SceneInterface 
{
 

  scenesize: number;
  sceneenv:number;
  twglprograminfo: twgl.ProgramInfo[]|null;
  animationParameters: TAnimation1Parameters | undefined;
  positionLocation: number | undefined; // WebGLUniformLocation | undefined;
  cameraPosition: [number,number,number] | undefined

  vertexShaderSource: string;
  fragmentShaderSource: string;
 
  resizeCanvas(gl: WebGL2RenderingContext): void;
  initScene(gl: WebGL2RenderingContext,  cap:TAnimation1Parameters, dictpar:Map<string,string>| undefined,  p: twgl.ProgramInfo, textureReadyCallback: (a:any)=>void | undefined): void;
  defaultCamera(gl: WebGL2RenderingContext, cam: camhandler.Camera): void;
  drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number): void;
  extendGUI(datgui: datgui.GUI): void;
 
}