// local, invalid shading
import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as datgui from "dat.gui";

import * as camhandler from "./../baseapp/camhandler"   // camera projection
import * as scene from "./scene"

import { TAnimation1Parameters }  from "./scene"
import { basescene } from "./basescene";

export class LightScene extends basescene implements scene.SceneInterface
{
    vertexShaderSource: string;   // =vertexShaderSourceSpotLight
    fragmentShaderSource: string; // =fragmentShaderSourceSpotLight

    // shaders to merge (here: none)
    twglprograminfo: twgl.ProgramInfo[]|null=null;  // shaders are provided in interface string fields, in this scene twglprograminfo[] remains null

    // interface
    sceneenv:number = 1;
    positionLocation: number | undefined;
    cameraPosition: [number,number,number] | undefined
    ctime: number = 0;
    scenesize: number = 60;

    typelightLocation: WebGLUniformLocation | undefined ;           // directional light (0)  point light (1) or spot light (2)
    viewWorldPositionLocation: WebGLUniformLocation | undefined ;   // camera position passed to shader for point light and spot light
    lightWorldPositionLocation: WebGLUniformLocation | undefined ;  // light position passed to shader
    colorLocation: WebGLUniformLocation | undefined ;               // color light
    shininessLocation: WebGLUniformLocation | undefined ;           // for directional light, intensity. for point light ans spot light, focus
    lightDirectionLocation: WebGLUniformLocation | undefined ;
    innerLimitLocation: WebGLUniformLocation | undefined ;
    outerLimitLocation: WebGLUniformLocation | undefined ;
    reverseLightDirectionLocation: WebGLUniformLocation | undefined;

    // rendering parameters 
    fieldOfViewRadians : number;
    fRotationRadians : number;
   
    typelight: number;    // lights shader
    lightRotationX: number;
    lightRotationY : number;
    lightDirection : [number,number,number];  // this is computed in updateScene
    innerLimit : number;
    outerLimit : number;
  
    animationParameters: TAnimation1Parameters | undefined;

    public resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }

    public static instance : LightScene;

    public constructor(gl: WebGL2RenderingContext)
    {
      super();
      LightScene.instance=this;
      this.typelight = 1;
      this.vertexShaderSource = this.vertexShaderSourceSpotLight;
      this.fragmentShaderSource = this.fragmentShaderSourceSpotLight;
    //  constructor(gl: WebGL2RenderingContext)

      this.twglprograminfo=new Array(3);   
      this.twglprograminfo![1] = twgl.createProgramInfo(gl, [this.vertexShaderSourceSpotLight, this.fragmentShaderSourceSpotLight]);

      this.fieldOfViewRadians = 60* Math.PI / 180;
      this.fRotationRadians = 0;
      this.lightRotationX = 0;
      this.lightRotationY = 0;
      this.lightDirection = [0, 0, 1];  // this is computed in updateScene
      this.innerLimit = 10* Math.PI / 180;
      this.outerLimit = 20* Math.PI / 180;
    }

    public extendGUI(gui: datgui.GUI)
    {
      // Slider for shininess
     gui.add(this.animationParameters!, 'shininess').min(0).max(20.0).step(0.1);
     gui.updateDisplay();
     var cel2 = gui.add(this.animationParameters!, 'typelight', [ 'directed light','point light', 'spot light' ] );
     cel2.onChange( this.onChangeTypeLightCombo);
     gui.add(this.animationParameters!, 'fov', 5.0,85.0,1.0 );
    }

    onChangeTypeLightCombo(value? : any)
    {  
      var s = value! as string;
      if (s=="directed light") LightScene.instance.typelight=0; // gl.uniform1i(this.typelightLocation!,0);
      else if (s=="point light") LightScene.instance.typelight=1; // gl.uniform1i(this.typelightLocation!,1);
      else if (s=="spot light") LightScene.instance.typelight=2; //gl.uniform1i(this.typelightLocation!,2);
    }


    public initScene(gl: WebGL2RenderingContext, cap:TAnimation1Parameters,dictpar:Map<string,string>,  p: twgl.ProgramInfo, sceneReadyCallback: (a:any)=>void | undefined)
    {
        var program = p.program;
        this.animationParameters = cap;
 
        this.viewWorldPositionLocation = gl.getUniformLocation(program, "u_viewWorldPosition")!;
      
        this.typelightLocation = gl.getUniformLocation(program, "u_typelight")!;
        this.colorLocation = gl.getUniformLocation(program, "u_color")!;
        this.shininessLocation = gl.getUniformLocation(program, "u_shininess")!; 
        this.lightDirectionLocation = gl.getUniformLocation(program, "u_lightDirection")!;
        this.innerLimitLocation = gl.getUniformLocation(program, "u_innerLimit")!;
        this.outerLimitLocation = gl.getUniformLocation(program, "u_outerLimit")!;
        this.lightWorldPositionLocation = gl.getUniformLocation(program, "u_lightWorldPosition")!;
        this.reverseLightDirectionLocation =  gl.getUniformLocation(program, "u_reverseLightDirection")!; // directional

        this.initMatrixUniforms(gl,program);
        this.initSingleObject(gl, program, this.setGeometry, this.setNormals, sceneReadyCallback); // this will invoke the callback when done
    }

    public restorePositionAttributeContext(gl: WebGL2RenderingContext, posBuffer: WebGLBuffer, posAttributeLocation: number, size: number)
    {
      // ==> 2023-03-01 restore this part to solve the clear error
        // 1. Bind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        // 2. Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        //var size = 2;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(posAttributeLocation, size, type, normalize, stride, offset);
        // 3. Enable this
        gl.enableVertexAttribArray(posAttributeLocation);
        // <==
    }
 

    public drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number) 
    {
        var deltaTime = time - this.ctime;
        this.ctime = time;

        // Bind the vao, set world matrix and worldview matrix in GPU
        this.renderCameraSingleRotatingObjectPrologue(gl, cam, deltaTime);

        // Restore position attribute context for this program (2023-01-03 solve clear issue)
        this.restorePositionAttributeContext(gl, this.positionBuffer!, this.positionAttributeLocation!, 3); 
 
        // Set the color to use for light
        gl.uniform4fv(this.colorLocation!, [1.0, 0, 0.2, 1]); // red
    
        // Set the shininess for any light. 
        // directional light shininess=intensity
        // for point light and spot light shininess=concentration of light in the center
        gl.uniform1f(this.shininessLocation!, this.animationParameters!.shininess);
        gl.uniform1i(this.typelightLocation!,this.typelight);
    
        // Set the light direction (directed light)
        gl.uniform3fv(this.reverseLightDirectionLocation!, twgl.v3.normalize([1.0, 0.0, 0.0]));

        // Set the light position used in point light and spot light
        const lightPosition = [0, 0, 120];
        gl.uniform3fv(this.lightWorldPositionLocation!, lightPosition);
      
        // Set the camera/view position used in point light and spot light
        gl.uniform3fv(this.viewWorldPositionLocation!, cam.Position());
    
        // Set spotlight uniforms
        // since we don't have a plane like most spotlight examples
        // let's point the spot light at the F
        var target = [0, 0, 0];
        var up = [0, 0, 1];  // Z-up !
        
        // Set directional light unifos
        var lmat = m4.lookAt(lightPosition, target, up);
        lmat = m4.multiply(m4.axisRotation([1,0,0],this.lightRotationX), lmat);
        lmat = m4.multiply(m4.axisRotation([0,1,0],this.lightRotationY), lmat);
        // get the zAxis from the matrix
        // negate it because lookAt looks down the -Z axis
        this.lightDirection = [-lmat[8], -lmat[9], -lmat[10]];    
        gl.uniform3fv(this.lightDirectionLocation!, this.lightDirection); // spot light
        gl.uniform1f(this.innerLimitLocation!, Math.cos(this.innerLimit));
        gl.uniform1f(this.outerLimitLocation!, Math.cos(this.outerLimit));

        // --- Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 16 * 6;
        gl.drawArrays(primitiveType, offset, count);
      }  
  
  //=========================================================================================================================================

    // Fill the buffer with the values that define a letter 'F'.
    setGeometry(gl: WebGL2RenderingContext):void {
    var positions = new Float32Array([
            // left column front
            0,   0,  0,
            0, 150,  0,
            30,   0,  0,
            0, 150,  0,
            30, 150,  0,
            30,   0,  0,
  
            // top rung front
            30,   0,  0,
            30,  30,  0,
            100,   0,  0,
            30,  30,  0,
            100,  30,  0,
            100,   0,  0,
  
            // middle rung front
            30,  60,  0,
            30,  90,  0,
            67,  60,  0,
            30,  90,  0,
            67,  90,  0,
            67,  60,  0,
  
            // left column back
              0,   0,  30,
             30,   0,  30,
              0, 150,  30,
              0, 150,  30,
             30,   0,  30,
             30, 150,  30,
  
            // top rung back
            30,   0,  30, 
            100,   0,  30,
            30,  30,  30,
             30,  30,  30,
            100,   0,  30,
            100,  30,  30,
  
            // middle rung back
             30,  60,  30,
             67,  60,  30,
             30,  90,  30,
             30,  90,  30,
             67,  60,  30,
             67,  90,  30,
  
            // top
              0,   0,   0,
            100,   0,   0,
            100,   0,  30,
              0,   0,   0,
            100,   0,  30,
              0,   0,  30,
  
            // top rung right
            100,   0,   0,
            100,  30,   0,
            100,  30,  30,
            100,   0,   0,
            100,  30,  30,
            100,   0,  30,
  
            // under top rung
            30,   30,   0,
            30,   30,  30,
            100,  30,  30,
            30,   30,   0,
            100,  30,  30,
            100,  30,   0,
  
            // between top rung and middle
            30,   30,   0,
            30,   60,  30,
            30,   30,  30,
            30,   30,   0,
            30,   60,   0,
            30,   60,  30,
  
            // top of middle rung
            30,   60,   0,
            67,   60,  30,
            30,   60,  30,
            30,   60,   0,
            67,   60,   0,
            67,   60,  30,
  
            // right of middle rung
            67,   60,   0,
            67,   90,  30,
            67,   60,  30,
            67,   60,   0,
            67,   90,   0,
            67,   90,  30,
  
            // bottom of middle rung.
            30,   90,   0,
            30,   90,  30,
            67,   90,  30,
            30,   90,   0,
            67,   90,  30,
            67,   90,   0,
  
            // right of bottom
            30,   90,   0,
            30,  150,  30,
            30,   90,  30,
            30,   90,   0,
            30,  150,   0,
            30,  150,  30,
  
            // bottom
            0,   150,   0,
            0,   150,  30,
            30,  150,  30,
            0,   150,   0,
            30,  150,  30,
            30,  150,   0,
  
            // left side
            0,   0,   0,
            0,   0,  30,
            0, 150,  30,
            0,   0,   0,
            0, 150,  30,
            0, 150,   0,
        ]);
  
    // Center the F around the origin and Flip it around. We do this because
    // we're in 3D now with and +Y is up where as before when we started with 2D
    // we had +Y as down.
  
    // We could do by changing all the values above but I'm lazy.
    // We could also do it with a matrix at draw time but you should
    // never do stuff at draw time if you can do it at init time.
    var matrix = m4.axisRotation([1,0,0],Math.PI);
    matrix = m4.translate(matrix, [-50, -75, -15]);
  
    for (var ii = 0; ii < positions.length; ii += 3) {
      var vector = m4.transformPoint(matrix, [positions[ii + 0], positions[ii + 1], positions[ii + 2], 1]);
      positions[ii + 0] = vector[0];
      positions[ii + 1] = vector[1];
      positions[ii + 2] = vector[2];
    }
  
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  }

  //=========================================================================================================================================

  setNormals(gl: WebGL2RenderingContext): void {
    var normals = new Float32Array([
            // left column front
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
  
            // top rung front
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
  
            // middle rung front
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
  
            // left column back
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
  
            // top rung back
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
  
            // middle rung back
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
  
            // top
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
  
            // top rung right
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
  
            // under top rung
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
  
            // between top rung and middle
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
  
            // top of middle rung
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
  
            // right of middle rung
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
  
            // bottom of middle rung.
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
  
            // right of bottom
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
  
            // bottom
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
  
            // left side
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
        ]);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
  }
  
  vertexShaderSourceSpotLight = `#version 300 es

  // an attribute is an input (in) to a vertex shader.
  // It will receive data from a buffer
  in vec4 a_position;
  in vec3 a_normal;
  
  uniform vec3 u_lightWorldPosition;
  uniform vec3 u_viewWorldPosition;
  
  uniform mat4 u_world;
  uniform mat4 u_worldViewProjection;
  uniform mat4 u_worldInverseTranspose;
  
  // varyings to pass values to the fragment shader
  out vec3 v_normal;
  out vec3 v_surfaceToLight;
  out vec3 v_surfaceToView;
  
  // all shaders have a main function
  void main() {
    // Multiply the position by the matrix.
    gl_Position = u_worldViewProjection * a_position;
  
    // orient the normals and pass to the fragment shader
    v_normal = mat3(u_worldInverseTranspose) * a_normal;
  
    // compute the world position of the surface
    vec3 surfaceWorldPosition = (u_world * a_position).xyz;
  
    // compute the vector of the surface to the light
    // and pass it to the fragment shader
    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;
  
    // compute the vector of the surface to the view/camera
    // and pass it to the fragment shader
    v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;
  }
  `;

  fragmentShaderSourceSpotLight = `#version 300 es

  precision highp float;
  
  // Passed in and varied from the vertex shader.
  in vec3 v_normal;
  in vec3 v_surfaceToLight;
  in vec3 v_surfaceToView;
  
  uniform vec4 u_color;
  uniform float u_shininess;
  
  uniform float u_innerLimit;          // in dot space
  uniform float u_outerLimit;          // in dot space

  uniform vec3 u_lightDirection;

  uniform int u_typelight;

  uniform vec3 u_reverseLightDirection; // directional light
   
  // we need to declare an output for the fragment shader
  out vec4 outColor;

  void maingreen() {
    outColor = vec4(0.0,1.0,0.0,1.0);
  }

  void main() {
    // because v_normal is a varying it's interpolated
    // so it will not be a uint vector. Normalizing it
    // will make it a unit vector again
    vec3 normal = normalize(v_normal);
  
    vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
    vec3 surfaceToViewDirection = normalize(v_surfaceToView);
    vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);
  
    if (u_typelight==2)
    {
      // spot light
      float dotFromDirection = dot(surfaceToLightDirection, -u_lightDirection);
      float inLight = smoothstep(u_outerLimit, u_innerLimit, dotFromDirection);
      float light = inLight * dot(normal, surfaceToLightDirection);
      float specular = inLight * pow(dot(normal, halfVector), u_shininess);
    
      outColor = u_color;
    
      // Lets multiply just the color portion (not the alpha)
      // by the light
      outColor.rgb *= light;
    
      // Just add in the specular
      outColor.rgb += specular;
    } else  if (u_typelight==1)
    {
       
      // compute the light by taking the dot product
      // of the normal to the light's reverse direction
      float light = dot(normal, surfaceToLightDirection);
      float specular = 0.0;
      if (light > 0.0) {
        specular = pow(dot(normal, halfVector), u_shininess);
      }

      vec3 outcol =   u_color.rgb;
    
      // Lets multiply just the color portion (not the alpha)
      // by the light
      outcol *= light;
    
      // Just add in the specular (white)
      outcol += specular;

      outColor = vec4(outcol,1.0);

    } else
    {
      // compute the light by taking the dot product
      // of the normal to the light's reverse direction
      float dirlight = dot(normal, u_reverseLightDirection);

     
    
      outColor = u_color;

      outColor.rgb *=   dirlight * u_shininess/10.0 ;
    }
  }
  `;


}