import * as mtls from "./mouselistener";     // connect events for buttons and wheel
import * as baseapp from "./baseapp";
import * as camhandler from "./camhandler"   // camera projection

import { m4, v3 }  from "twgl.js";    // Greg's work, this baseapp  only imports geometry matrix/vector tools

import  * as datgui from "dat.gui";

export class skybox extends baseapp.baseapp  // use m4, v3  from twgl
{
    public constructor(cgl: WebGL2RenderingContext | undefined | null, capp: mtls.MouseListener | undefined , dictpar:Map<string,string>)
    {
        super(cgl, capp, dictpar);
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
    positionLocation: number | undefined; // WebGLUniformLocation | undefined;
    viewDirectionProjectionInverseLocation: WebGLUniformLocation | undefined;
    fieldOfViewRadians: number | undefined;
    
   
    public main(gl: WebGL2RenderingContext, dictpar:Map<string,string>)
    { 
      var b: string|null|undefined =""; 
      b=dictpar.get("movecube");  if (b) this.skyboxCubeParameters.movecube=(b=="true");
      b=dictpar.get("moveenv"); if (b) this.skyboxCubeParameters.moveenv=(b=="true") 
      b=dictpar.get("fov"); if (b) this.skyboxCubeParameters.fieldOfViewDegrees=+b!; 
      b=dictpar.get("vele"); if(b) this.skyboxCubeParameters.angVelocityCam=+b!;
      b=dictpar.get("velc"); if(b)  this.skyboxCubeParameters.angVelocityCube=+b!;

        // https://webgl2fundamentals.org/webgl/lessons/webgl-skybox.html
        super.main(gl, dictpar, this.vsEnvironmentMap, this.fsEnvironmentMap);
        console.log("skybox.main - find getAttribLocations");
        this.positionLocation = gl.getAttribLocation(this.program![0], "a_position");
        this.skyboxLocation = gl.getUniformLocation(this.program![0], "u_skybox")!;
        this.viewDirectionProjectionInverseLocation = gl.getUniformLocation(this.program![0], "u_viewDirectionProjectionInverse")!;
        console.log("Positionlocation="+this.positionLocation);
        console.log("skyboxLocation="+this.skyboxLocation);
        console.log("viewDirectionProjectionInverseLocation="+this.viewDirectionProjectionInverseLocation);  
        this.createEnvironmentMapGeo(gl, this.positionLocation!);
        this.createEnvironmentMapTexture(gl, 0);
        this.fieldOfViewRadians = 60* Math.PI / 180;     
        
        this.cam=camhandler.Camera.createYUpCamera(gl,dictpar,0.5, this.app!);
        this.cam.zoominVelocity = 0.5;
        this.cam.setRadius(6.0);
        this.cam.translateEye([6.0,0,0]);


        requestAnimationFrame(() => this.render(0));         
    }

    
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
    
    render(mstime: number) {
        var gl: WebGL2RenderingContext = this.gl!;     
        this.resizeCanvasToDisplaySize(gl.canvas);    
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);    
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.useProgram(this.program![0]);

        this.cameraPosition = [5*Math.cos(mstime * .004), 0, 5*Math.sin(mstime * .004)];
       
        // field of view angle determines how narrow or wide the camera view is
        // aperture will be normalized to width of viewport.
        this.fieldOfViewRadians = this.skyboxCubeParameters.fieldOfViewDegrees * Math.PI / 180;

  
   /*     if(this.cam)
        {
          var cam: camhandler.Camera = this.cam!;
          cam.rotationVelocity = this.skyboxCubeParameters.angVelocityCam/(Math.PI/2.0-this.fieldOfViewRadians!);
          cam.CamHandlingYUp(gl, this.app!, -1.0, 1.0);  
          cam.ReportEye();
          // override cameraPosition by mouse camera position when moveenv checked off
          //if (!this.skyboxParameters.moveenv)
          //this.cameraPosition = this.cam?.Position()!;
       }
*/
        // find projection, view and direction matrix, invert it for the Cubemap
       //var viewDirectionProjectionInverseMatrix = m4.inverse(this.computeprojectionmatrices(gl, this.fieldOfViewRadians!));

      
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
     //   var cameraPosition = [0,0,0];
     /*   if(this.cam)
        {
          var cam: camhandler.Camera = this.cam!;
          cam.CamHandlingYUp(gl, this.app!);  
         // this.fish[fishtype].uniforms!.worldviewprojection = cam.viewProjection;     
        }
*/
      //  this.cameraPosition = [5*Math.cos(mstime * .004), 0, 5*Math.sin(mstime * .004)];
  
        // draw the environment
        this.renderenvironmentmap(gl, this.fieldOfViewRadians!,this.vaoEnvironment!, { invproj: this.viewDirectionProjectionInverseLocation!, loc:this.skyboxLocation!}, mstime);

        // next frame
        requestAnimationFrame(() => this.render(++mstime));
    }
}