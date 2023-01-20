import * as datgui from "dat.gui"

import * as camhandler from "./../baseapp/camhandler"   // camera projection

import { TAnimation1Parameters }  from "./../baseapp/baseapp"



export interface SceneInterface 
{
  scenesize: number;                                      // allow scene to set its size before initializing camera, r0=2*scenesize, far and near plane accordingly
                                                          // keep in mind this happens before initScene() and there is only 1 camera involved for all scenes, so when 
                                                          // there is more than 1 scene, the sizes and positions are to be set in the same world space..

  sceneenv:number;                                        // current skybox texture -1=none 0=black 1=Ykohama 2=Stockholm

  animationParameters: TAnimation1Parameters | undefined; // parameters, record will be common for all scenes displayed concurrently

  resizeCanvas(gl: WebGL2RenderingContext): void;
  // called before Animation1/Animation2 initScene() and called on each Animation1 rendering. Scene must call twgl.resizeCanvasToDisplaySize

  initScene(gl: WebGL2RenderingContext,  cap:TAnimation1Parameters,cam: camhandler.Camera,  dictpar:Map<string,string>| undefined, textureReadyCallback: undefined | ((a:any)=>void)): void;
  // initialize this scene for animation parameters "cap", camera "cam" and current url arguments "dictpar". 
  // The event textureReadyCallback is raised when scene is ready to display (textures are read)
 
  drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number): void;
  // render the scene using camera "cam" at time "time" milliseconds after program startup

  defaultCamera(gl: WebGL2RenderingContext, cam: camhandler.Camera): void;
  // allow scene to modify the camera on startup (needed for objmat rendering, objects can have any size) 

  extendGUI(datgui: datgui.GUI): void;
  // allow scene to add controls to the datGUI parameter interface
}