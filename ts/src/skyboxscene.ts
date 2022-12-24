
import * as twgl from "twgl.js"   // Greg's work
import { m4 } from "twgl.js"

import * as datgui from "dat.gui"

import * as scene from "./scene"
import { TAnimation1Parameters }  from "./scene"

import * as camhandler from "./camhandler" // camera projection     

export class SkyBoxScene implements scene.SceneInterface
{
    scenesize: number = 40;
    sceneenv: number = 1;
    animationParameters: TAnimation1Parameters | undefined;
    vertexShaderSource = ``;
    fragmentShaderSource = ``; 
    twglprograminfo: twgl.ProgramInfo[]|null=null;  // there are 2 sets of shaders defined here.
    cameraPosition: [number,number,number] | undefined

    skyboxCubeParameters = {
        movecube: true,
        moveenv: true,      
        fieldOfViewDegrees:0,      // perspective aperture
        radiusCam: 4,               // perspective fisheye
        angVelocityCam:  0,   // camera rotation velocity
        angVelocityCube: 0          // mirror cube rotation velocity
      };  

      skyboxLocation: WebGLUniformLocation | undefined;
      positionLocation: number | undefined; // WebGLUniformLocation | undefined;
      viewDirectionProjectionInverseLocation: WebGLUniformLocation | undefined;
      fieldOfViewRadians: number | undefined;
   
      public extendGUI(gui: datgui.GUI)
      {
      // Slider for sling speed
       gui.add(this.animationParameters!, 'sling').min(9).max(120).step(1);
       // Slider for shininess
       //gui.add(this.animationParameters!, 'shininess').min(0).max(20.0).step(0.1);
       gui.updateDisplay();
      }
  
      public initScene(gl: WebGL2RenderingContext, cap:TAnimation1Parameters,  progenv: twgl.ProgramInfo)
      { 
          var b: string|null|undefined =""; 
          this.skyboxCubeParameters.movecube=cap.movetail;
          this.skyboxCubeParameters.moveenv=cap.b.move; 
          this.skyboxCubeParameters.fieldOfViewDegrees=30; 
          this.skyboxCubeParameters.angVelocityCam=cap.b.speed;
          this.skyboxCubeParameters.angVelocityCube=0.02;
  
          // https://webgl2fundamentals.org/webgl/lessons/webgl-skybox.html
        //  super.main(gl, dictpar, this.vsEnvironmentMap, this.fsEnvironmentMap);
      /*    console.log("skybox.main - find getAttribLocations");
          this.positionLocation = gl.getAttribLocation(progenv.program, "a_position");
          this.skyboxLocation = gl.getUniformLocation(progenv.program, "u_skybox")!;
          this.viewDirectionProjectionInverseLocation = gl.getUniformLocation(progenv.program, "u_viewDirectionProjectionInverse")!;
          console.log("Positionlocation="+this.positionLocation);
          console.log("skyboxLocation="+this.skyboxLocation);
          console.log("viewDirectionProjectionInverseLocation="+this.viewDirectionProjectionInverseLocation);  
         
          this.fieldOfViewRadians = 60* Math.PI / 180; 
*/
     
          
       //   this.cam=camhandler.Camera.createYUpCamera(gl,dictpar,0.5, this.app!);
       //   this.cam.zoominVelocity = 0.5;
       //   this.cam.setRadius(6.0);
       //   this.cam.translateEye([6.0,0,0]);
  
  
       //   requestAnimationFrame(() => this.render(0));         
      }
  
      resizeCanvas(gl: WebGL2RenderingContext)
      {
        var canvas=gl.canvas as HTMLCanvasElement;
        // Lookup the size the browser is displaying the canvas in CSS pixels.
        const displayWidth  = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        // Check if the canvas is not the same size.
        const needResize = canvas.width  !== displayWidth ||  canvas.height !== displayHeight;
        if (needResize) {
          // Make the canvas the same size
          canvas.width  = displayWidth;
          canvas.height = displayHeight;
        }
        return needResize;
      }
    
      public drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number) 
      {
        this.cameraPosition = (this.animationParameters?.b.move)? [Math.cos(time * 0.04 * this.animationParameters.b.speed) * this.skyboxCubeParameters.radiusCam, 0, 
                                                                   Math.sin(time * 0.04 * this.animationParameters.b.speed) * this.skyboxCubeParameters.radiusCam] 
         : [this.skyboxCubeParameters.radiusCam,0.0,0.0];
         if (!this.animationParameters?.b.move)
           this.cameraPosition = [cam?.Position()[0]!,cam?.Position()[1]!,cam?.Position()[2]!];
       
      
     /*   var gl: WebGL2RenderingContext = this.gl!;     
        this.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);    
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);    
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.useProgram(this.program![0]);

       
        // field of view angle determines how narrow or wide the camera view is
        // aperture will be normalized to width of viewport.
        this.fieldOfViewRadians = this.skyboxCubeParameters.fieldOfViewDegrees * Math.PI / 180;

        // by default, rotate camera position.
        this.cameraPosition = (this.skyboxCubeParameters.moveenv)? [Math.cos(mstime * this.skyboxCubeParameters.angVelocityCam) * this.skyboxCubeParameters.radiusCam, 0, 
          Math.sin(mstime * this.skyboxCubeParameters.angVelocityCam) * this.skyboxCubeParameters.radiusCam] : [this.skyboxCubeParameters.radiusCam,0.0,0.0];
        if(this.cam)
        {
          var cam: camhandler.Camera = this.cam!;
          cam.CamHandlingYUp(gl, this.app!, -1.0, -1.0);  
          cam.ReportEye();
          // override cameraPosition by mouse camera position when moveenv checked off
          if (!this.skyboxCubeParameters.moveenv)
            this.cameraPosition = this.cam?.Position()!;
          }
     
        //  this.cameraPosition = [5*Math.cos(mstime * .004), 0, 5*Math.sin(mstime * .004)];
  
        // draw the environment
        this.renderenvironmentmap(gl, this.fieldOfViewRadians!,this.vaoEnvironment!, { invproj: this.viewDirectionProjectionInverseLocation!, loc:this.skyboxLocation!}, mstime);

        // next frame
      //  requestAnimationFrame(() => this.render(++mstime));
      */
      }
}
