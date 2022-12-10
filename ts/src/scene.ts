import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as camhandler from "./camhandler"   // camera projection

import { TAnimation1Parameters }  from "./animation1"

export interface SceneInterface 
{
  scenesize: number;
  animationParameters: TAnimation1Parameters | undefined;
  vertexShaderSource: string;
  fragmentShaderSource: string;
  resizeCanvas(gl: WebGL2RenderingContext): void;
  initScene(gl: WebGL2RenderingContext, cap:TAnimation1Parameters,  p: twgl.ProgramInfo): void;
  drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number): void;
}