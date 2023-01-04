import * as mtls from "./baseapp/mouselistener";     // connect events for buttons and wheel
import * as twglbaseapp from "./baseapp/twglbaseapp";
import * as camhandler from "./baseapp/camhandler"   // camera projection

import { m4, v3 }  from "twgl.js";    // Greg's work, this baseapp  only imports geometry matrix/vector tools

import  * as datgui from "dat.gui";


export class skybox extends twglbaseapp.twglbaseapp  // use m4, v3  from twgl
{
    public constructor(cgl: WebGL2RenderingContext | undefined | null, capp: mtls.MouseListener | undefined , dictpar:Map<string,string>, cdiv:string)
    {
        super(cgl, capp, dictpar, cdiv);
    }

    skyboxCubeParameters = {
      movecube: true,
      moveenv: true,      
      fieldOfViewDegrees:0,      // perspective aperture
      radiusCam: 0,               // perspective fisheye
      angVelocityCam:  0,   // camera rotation velocity
      angVelocityCube: 0          // mirror cube rotation velocity
    };  
    //-----------------------------------------------------------------------------------------------------------------

    skyboxLocation: WebGLUniformLocation | undefined;
    viewDirectionProjectionInverseLocation: WebGLUniformLocation | undefined;
 
    positionAttributeLocation: number | undefined; // WebGLUniformLocation | undefined;
    fieldOfViewRadians: number | undefined;
    
    cam: camhandler.Camera | undefined;
 
    
    public initGUI(parameters: {movecube:boolean, moveenv:boolean,fieldOfViewDegrees:number,radiusCam:number,angVelocityCam:number,angVelocityCube: number})
    {
        this.skyboxCubeParameters= parameters;
     
        // park the dat.gui box in the linksdiv below the links, in closed state
        var gui = new datgui.GUI( { autoPlace: false } );
        gui.domElement.id = 'gui_drawimagespace';
        document.getElementById("linksdiv")!.append( gui.domElement);
        gui.close();

        // connect viewmodel
        gui.remember(this.skyboxCubeParameters);
      
        // Checkbox forward move animation on/off
  //      gui.add(this.skyboxCubeParameters, 'movecube');
        // Checkbox tail animation on/off
        gui.add(this.skyboxCubeParameters, 'moveenv');
       
        // Slider for field of view
        gui.add(this.skyboxCubeParameters, 'fieldOfViewDegrees').min(20.0).max(80.0).step(0.02);
       // Slider for animation speed
     //   gui.add(this.skyboxCubeParameters, 'radiusCam').min(0.1).max(20.0).step(0.02);
       // Slider for animation speed
        gui.add(this.skyboxCubeParameters, 'angVelocityCam').min(0.0001).max(0.01).step(0.0001);
      // Slider for animation speed of cube
     //   gui.add(this.skyboxCubeParameters, 'angVelocityCube').min(0.001).max(0.01).step(0.0001);
     
        gui.updateDisplay();
        return gui;
      }
  
  
      public main(gl: WebGL2RenderingContext, dictpar:Map<string,string>)
      { 
        console.log("-> "+"skybox main");
        var b: string|null|undefined =""; 
          b=dictpar.get("movecube");  if (b) this.skyboxCubeParameters.movecube=(b=="true");
          b=dictpar.get("moveenv"); if (b) this.skyboxCubeParameters.moveenv=(b=="true") 
          b=dictpar.get("fov"); if (b) this.skyboxCubeParameters.fieldOfViewDegrees=+b!; 
          b=dictpar.get("vele"); if(b) this.skyboxCubeParameters.angVelocityCam=+b!;
          b=dictpar.get("velc"); if(b)  this.skyboxCubeParameters.angVelocityCube=+b!;
  
          // https://webgl2fundamentals.org/webgl/lessons/webgl-skybox.html
          //super.main(gl, dictpar, this.vsEnvironmentMap, this.fsEnvironmentMap);
          console.log("skybox.main - find getAttribLocations");
          this.positionAttributeLocation = gl.getAttribLocation(this.twglprograminfo![0].program, "a_position");
          this.skyboxLocation = gl.getUniformLocation(this.twglprograminfo![0].program, "u_skybox")!;
          this.viewDirectionProjectionInverseLocation = gl.getUniformLocation(this.twglprograminfo![0].program, "u_viewDirectionProjectionInverse")!;
          console.log("Positionlocation="+this.positionAttributeLocation);
          console.log("skyboxLocation="+this.skyboxLocation);
          console.log("viewDirectionProjectionInverseLocation="+this.viewDirectionProjectionInverseLocation); 
          
          this.fieldOfViewRadians = this.skyboxCubeParameters.fieldOfViewDegrees * Math.PI / 180;    
          
          this.cam=camhandler.Camera.createCamera(gl,dictpar,camhandler.Camera.CamYUp, 0.5, this.app!);
          this.cam.zoominVelocity = 0.5;
          this.cam.setRadius(6.0);
          this.cam.translateEye([6.0,0,0]); 
  
          this.createEnvironmentMapGeo(gl); //, this.positionLocation!);
          this.createEnvironmentMapTexture(gl, 2, this.textureReadyCallback);
          console.log("<- "+"skybox main");

          requestAnimationFrame(() => this.render(0));         
      }
  
      
      textureReadyCallback(err: any, texture: WebGLTexture): void
      { 
        console.log("Skybox Environment texture isready.");
      }
    
      resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) 
      {
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
    
      render(mstime: number) 
      {
        var gl: WebGL2RenderingContext = this.gl!;     
        this.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);    
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);    
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.useProgram(this.twglprograminfo![0].program);

        //this.cameraPosition = [5*Math.cos(mstime * .004), 0, 5*Math.sin(mstime * .004)];
       
        // field of view angle determines how narrow or wide the camera view is
        // aperture will be normalized to width of viewport.
        this.fieldOfViewRadians = this.skyboxCubeParameters.fieldOfViewDegrees * Math.PI / 180;

        // by default, rotate camera position.
        this.cameraPosition = (this.skyboxCubeParameters.moveenv)? [Math.cos(mstime * this.skyboxCubeParameters.angVelocityCam) * this.skyboxCubeParameters.radiusCam, 0, 
                                                                    Math.sin(mstime * this.skyboxCubeParameters.angVelocityCam) * this.skyboxCubeParameters.radiusCam] 
                                                                 : [this.skyboxCubeParameters.radiusCam,0.0,0.0];
        if(this.cam)
        {
          var cam: camhandler.Camera = this.cam!;
          cam.CamHandlingYUp(gl, this.app!, 1.0, -1.0);  
          cam.ReportEye();
          // override cameraPosition by mouse camera position when moveenv checked off
          if (!this.skyboxCubeParameters.moveenv)
            this.cameraPosition = this.cam?.Position()!;
        }
     
        //  this.cameraPosition = [5*Math.cos(mstime * .004), 0, 5*Math.sin(mstime * .004)];
  
        // draw the environment
        this.renderenvironmentmap(gl, this.fieldOfViewRadians!, { invproj: this.viewDirectionProjectionInverseLocation!, loc:this.skyboxLocation!}, mstime);
        
        // next frame
        requestAnimationFrame(() => this.render(++mstime));
    }
}