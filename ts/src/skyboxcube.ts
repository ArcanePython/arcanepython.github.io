import * as twgl from "twgl.js";          // Greg's work
import * as mtls from "./mouselistener";  // connect events for buttons and wheel
import * as baseapp from "./baseapp";
import * as twglbaseapp from "./twglbaseapp";
import * as camhandler from "./camhandler";  

import  * as datgui from "dat.gui";

export class skyboxcube extends twglbaseapp.twglbaseapp
{
    public constructor(cgl: WebGL2RenderingContext | undefined | null, capp: mtls.MouseListener | undefined , dictpar:Map<string,string>)
    {
        super(cgl, capp, dictpar);
    }

    //-----------------------------------------------------------------------------------------------------------------

    skyboxCubeParameters = {
      movecube: true,
      moveenv: true,      
      fieldOfViewDegrees:0,      // perspective aperture
      radiusCam: 0,               // perspective fisheye
      angVelocityCam:  0,   // camera rotation velocity
      angVelocityCube: 0          // mirror cube rotation velocity
    };   

    vaoCube: WebGLVertexArrayObject | undefined;
    reflectingCubeBufferInfo: twgl.BufferInfo | undefined;
    texture: WebGLTexture| undefined;

  
  //  fieldOfViewRadians : number = this.skyboxCubeParameters.fieldOfViewDegrees * Math.PI / 180;
   
    protected createReflectingCubeGeo(gl: WebGL2RenderingContext)
    {
      this.reflectingCubeBufferInfo = twgl.primitives.createCubeBufferInfo(gl, 1.2);
      this.vaoCube = twgl.createVAOFromBufferInfo(gl,this.twglprograminfo![1], this.reflectingCubeBufferInfo)!;
    }

    public main(gl: WebGL2RenderingContext, dictpar:Map<string,string>) 
    {   
      // http://127.0.0.1:1234/index.html?skyboxcube&fov=22&movecube=true&moveenv=true
      
      var b: string|null|undefined =""; 
      b=dictpar.get("movecube");  if (b) this.skyboxCubeParameters.movecube=(b=="true");
      b=dictpar.get("moveenv"); if (b) this.skyboxCubeParameters.moveenv=(b=="true") 
      b=dictpar.get("fov"); if (b) this.skyboxCubeParameters.fieldOfViewDegrees=+b!; 
      b=dictpar.get("vele"); if(b) this.skyboxCubeParameters.angVelocityCam=+b!;
      b=dictpar.get("velc"); if(b)  this.skyboxCubeParameters.angVelocityCube=+b!;

      // https://webgl2fundamentals.org/webgl/lessons/webgl-skybox.html
      super.maininfos(gl, dictpar, [ {vs:this.vsEnvironmentMap, fs:this.fsEnvironmentMap}, {vs:this.vsMirrorCube,fs:this.fsMirrorCube}]);
      twgl.setAttributePrefix("a_");  // naming convention for vertex positions and normals in shaders used when twgl will organize uniforms
      this.createReflectingCubeGeo(gl);         
      this.createEnvironmentMapGeoTwgl(gl);         
      this.texture =  this.createEnvironmentMapTexture(gl, 1)!;
      
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
        gui.add(this.skyboxCubeParameters, 'movecube');
        // Checkbox tail animation on/off
        gui.add(this.skyboxCubeParameters, 'moveenv');
       
        // Slider for field of view
        gui.add(this.skyboxCubeParameters, 'fieldOfViewDegrees').min(20.0).max(80.0).step(0.02);
       // Slider for animation speed
        gui.add(this.skyboxCubeParameters, 'radiusCam').min(0.1).max(20.0).step(0.02);
       // Slider for animation speed
        gui.add(this.skyboxCubeParameters, 'angVelocityCam').min(0.0001).max(0.01).step(0.0001);
      // Slider for animation speed of cube
        gui.add(this.skyboxCubeParameters, 'angVelocityCube').min(0.001).max(0.01).step(0.0001);
     
        gui.updateDisplay();
        return gui;
      }
  

      private render( mstime: number) {
      
        var gl = this.gl!;
        twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);       
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);     
        gl.depthFunc(gl.LEQUAL);        
    
        // by default, rotate camera position.
        this.cameraPosition = (this.skyboxCubeParameters.moveenv)? [Math.cos(mstime * this.skyboxCubeParameters.angVelocityCam) * this.skyboxCubeParameters.radiusCam, 0, 
                              Math.sin(mstime * this.skyboxCubeParameters.angVelocityCam) * this.skyboxCubeParameters.radiusCam] : [this.skyboxCubeParameters.radiusCam,0.0,0.0];
   
        // the projected direction of view is inverted and passed to environment shader as u_viewDirectionProjectionInverse to address the cube map texture
        // computeprojectionmatrices will find projection, view and direction matrix, invert it for the Cubemap 
        var fieldOfViewRadians = this.skyboxCubeParameters.fieldOfViewDegrees * Math.PI / 180;
      
        // field of view angle determines how narrow or wide the camera view is
        // aperture will be normalized to width of viewport.
        if(this.cam)
        {
           var cam: camhandler.Camera = this.cam!;
          cam.rotationVelocity = this.skyboxCubeParameters.angVelocityCam/(Math.PI/2.0-fieldOfViewRadians!);

          cam.CamHandlingYUp(gl, this.app!, -1.0, -1.0);  
          cam.ReportEye();
          // override cameraPosition by mouse camera position when moveenv checked off
          if (!this.skyboxCubeParameters.moveenv)
            this.cameraPosition = this.cam?.Position()!;
        }
 
        var viewDirectionProjectionInverseMatrix = twgl.m4.inverse(this.computeprojectionmatrices(gl, fieldOfViewRadians));
      
        // Rotate the cube around the x axis
        if (this.skyboxCubeParameters.movecube)
          this.worldMatrix = twgl.m4.axisRotation( [1,0,0] as twgl.v3.Vec3 , mstime * this.skyboxCubeParameters.angVelocityCube);
        else 
          this.worldMatrix = twgl.m4.translation([0,0,0]); // twgl.m4.identity();

        // draw the environment
        gl.useProgram(this.twglprograminfo![0].program);
        gl.bindVertexArray(this.vaoEnvironment!);
        twgl.setUniforms( this.twglprograminfo![0], { 
          u_viewDirectionProjectionInverse: viewDirectionProjectionInverseMatrix,
          u_skybox: this.texture,
        });
        twgl.drawBufferInfo(gl, this.environmentBufferInfo!);  

        // draw the mirror cube
        gl.useProgram(this.twglprograminfo![1].program);      
        gl.depthFunc(gl.LESS);  // use the default depth test
        gl.bindVertexArray(this.vaoCube!);  
        twgl.setUniforms(this.twglprograminfo![1]!, {
          u_world: this.worldMatrix,
          u_view: this.viewMatrix,
          u_projection: this.projectionMatrix,
          u_texture: this.texture,
          u_worldCameraPosition: this.cameraPosition,
        });
        twgl.drawBufferInfo(gl, this.reflectingCubeBufferInfo!);

        //next frame
        requestAnimationFrame(() => this.render(++mstime));   
    }  

    //--- Shaders for the mirrorCoube -------------------------------------------------------------------------

    vsMirrorCube = `#version 300 es
    
    in vec4 a_position;
    in vec3 a_normal;
    
    uniform mat4 u_projection;
    uniform mat4 u_view;
    uniform mat4 u_world;
    
    out vec3 v_worldPosition;
    out vec3 v_worldNormal;
    
    void main() {
      // Multiply the position by the matrix.
      gl_Position = u_projection * u_view * u_world * a_position;
    
      // send the view position to the fragment shader
      v_worldPosition = (u_world * a_position).xyz;
    
      // orient the normals and pass to the fragment shader
      v_worldNormal = mat3(u_world) * a_normal;
    }
    `;
    
    fsMirrorCube = `#version 300 es
    precision highp float;
    
    // Passed in from the vertex shader.
    in vec3 v_worldPosition;
    in vec3 v_worldNormal;
    
    // The texture.
    uniform samplerCube u_texture;
    
    // The position of the camera
    uniform vec3 u_worldCameraPosition;
    
    // we need to declare an output for the fragment shader
    out vec4 outColor;
    
    void main() {
      vec3 worldNormal = normalize(v_worldNormal);
      vec3 eyeToSurfaceDir = normalize(v_worldPosition - u_worldCameraPosition);
      vec3 direction = reflect(eyeToSurfaceDir,worldNormal);
    
      outColor = texture(u_texture, direction);
    }
    `;
}