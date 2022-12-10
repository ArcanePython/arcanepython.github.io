import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as camhandler from "./camhandler"   // camera projection
import * as scene from "./scene"

import { TAnimation1Parameters }  from "./animation1"
import { timeStamp } from "console";

export class LightedScene implements scene.SceneInterface
{
    animationParameters: TAnimation1Parameters | undefined;

    vertexShaderSource = `#version 300 es
    in vec4 a_position;
    in vec3 a_normal;
    
    uniform vec3 u_lightWorldPosition;
    uniform vec3 u_viewWorldPosition;
    
    uniform mat4 u_world;
    uniform mat4 u_worldViewProjection;
    uniform mat4 u_worldInverseTranspose;
    
    out vec3 v_normal;
    
    out vec3 v_surfaceToLight;
    out vec3 v_surfaceToView;
    
    void main() {
      // Multiply the position by the matrix.
      gl_Position =  u_worldViewProjection * u_world * a_position;
    
      // orient the normals and pass to the fragment shader
      v_normal = mat3(u_worldInverseTranspose) * a_normal;
    
      // compute the world position of the surfoace
      vec3 surfaceWorldPosition = (u_world * a_position).xyz;
    
      // compute the vector of the surface to the light
      // and pass it to the fragment shader
      v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;
    
      // compute the vector of the surface to the view/camera
      // and pass it to the fragment shader
      v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;
    }
    `;
    fragmentShaderSource = `#version 300 es
    precision highp float;
    
    // Passed in from the vertex shader.
    in vec3 v_normal;
    in vec3 v_surfaceToLight;
    in vec3 v_surfaceToView;
    
    uniform vec4 u_color;
    uniform float u_shininess;
    uniform vec3 u_lightDirection;
    uniform float u_innerLimit;          // in dot space
    uniform float u_outerLimit;          // in dot space
    
    // we need to declare an output for the fragment shader
    out vec4 outColor;
    
    void main() {
      // because v_normal is a varying it's interpolated
      // so it will not be a unit vector. Normalizing it
      // will make it a unit vector again
      vec3 normal = normalize(v_normal);
    
      vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
      vec3 surfaceToViewDirection = normalize(v_surfaceToView);
      vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);
    
      float dotFromDirection = dot(surfaceToLightDirection,
                                   -u_lightDirection);
      float inLight = smoothstep(u_outerLimit, u_innerLimit, dotFromDirection);
      float light = inLight * dot(normal, surfaceToLightDirection);
      float specular = inLight * pow(dot(normal, halfVector), u_shininess);
    
      outColor = u_color;
    
      // Lets multiply just the color portion (not the alpha)
      // by the light
      outColor.rgb *= light;
    
      // Just add in the specular
      outColor.rgb += specular;
    }
    `;

    worldViewProjectionLocation: WebGLUniformLocation | undefined ;
    worldInverseTransposeLocation: WebGLUniformLocation | undefined ;
    viewWorldPositionLocation: WebGLUniformLocation | undefined ;
    worldLocation: WebGLUniformLocation | undefined ;

    colorLocation: WebGLUniformLocation | undefined ;
    shininessLocation: WebGLUniformLocation | undefined ;
    lightDirectionLocation: WebGLUniformLocation | undefined ;
    innerLimitLocation: WebGLUniformLocation | undefined ;
    outerLimitLocation: WebGLUniformLocation | undefined ;
    lightWorldPositionLocation: WebGLUniformLocation | undefined ;
 
    vao:WebGLVertexArrayObject | undefined;
    modelXRotationRadians: number=0;
    modelYRotationRadians: number=0;
  
    ctime: number = 0;

    scenesize: number = 140;

    public resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }
    
     fieldOfViewRadians : number;
     fRotationRadians : number;
     shininess : number;
     lightRotationX: number;
     lightRotationY : number;
     lightDirection : [number,number,number];  // this is computed in updateScene
     innerLimit : number;
     outerLimit : number;

    public constructor()
    {
        

        function radToDeg(r: number) {
            return r * 180 / Math.PI;
            }
    
            function degToRad(d:number) {
            return d * Math.PI / 180;
            }

            
        this.fieldOfViewRadians = degToRad(60);
        this.fRotationRadians = 0;
        this.shininess = 150;
        this.lightRotationX = 0;
        this.lightRotationY = 0;
        this.lightDirection = [0, 0, 1];  // this is computed in updateScene
        this.innerLimit = degToRad(10);
        this.outerLimit = degToRad(20);

    }

    public initScene(gl: WebGL2RenderingContext, cap:TAnimation1Parameters,  p: twgl.ProgramInfo)
    {
        var program = p.program;
        this.animationParameters = cap;
                
        // look up where the vertex data needs to go.
        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        var normalAttributeLocation = gl.getAttribLocation(program, "a_normal");

        // lookup uniforms
        this.worldViewProjectionLocation = gl.getUniformLocation(program, "u_worldViewProjection")!;
        this.worldInverseTransposeLocation = gl.getUniformLocation(program, "u_worldInverseTranspose")!;
        this.viewWorldPositionLocation = gl.getUniformLocation(program, "u_viewWorldPosition")!;
        this.worldLocation = gl.getUniformLocation(program, "u_world")!;

        this.colorLocation = gl.getUniformLocation(program, "u_color")!;
        this.shininessLocation = gl.getUniformLocation(program, "u_shininess")!;
        this.lightDirectionLocation = gl.getUniformLocation(program, "u_lightDirection")!;
        this.innerLimitLocation = gl.getUniformLocation(program, "u_innerLimit")!;
        this.outerLimitLocation = gl.getUniformLocation(program, "u_outerLimit")!;
        this.lightWorldPositionLocation = gl.getUniformLocation(program, "u_lightWorldPosition")!;
      
        // Create a vertex array object (attribute state)
        this.vao = gl.createVertexArray()!;

        // and make it the one we're currently working with
        gl.bindVertexArray(this.vao);

        // Turn on the attribute
        gl.enableVertexAttribArray(positionAttributeLocation);

        // Create a buffer
        var positionBuffer = gl.createBuffer();

        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // Set Geometry.
        this.setGeometry(gl);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 3;          // 3 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            positionAttributeLocation, size, type, normalize, stride, offset);

        // create the normalr buffer, make it the current ARRAY_BUFFER
        // and copy in the normal values
        var normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        this.setNormals(gl);

        // Turn on the attribute
        gl.enableVertexAttribArray(normalAttributeLocation);

        // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
        var size = 3;          // 3 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next color
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            normalAttributeLocation, size, type, normalize, stride, offset);
    }
    
    public drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number) 
    {
        var deltaTime = time - this.ctime;
        this.ctime = time;
  
        // Bind the attribute/buffer set we want.
        gl.bindVertexArray(this.vao!);
    
        // Compute the projection matrix
        var aspect = (gl.canvas as HTMLCanvasElement).clientWidth / (gl.canvas as HTMLCanvasElement).clientHeight;
        var zNear = 1;
        var zFar = 2000;
        //var projectionMatrix = m4.perspective(this.fieldOfViewRadians, aspect, zNear, zFar);
    
        // Compute the camera's matrix
        var camera = [100, 150, 200];
        var target = [0, 35, 0];
        var up = [0, 1, 0];
        // var cameraMatrix = m4.lookAt(camera, target, up);
    
        // Make a view matrix from the camera matrix.
        // var viewMatrix = m4.inverse(cameraMatrix);
    
        // Compute a view projection matrix
        // var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
    

        var matrix = m4.identity();
        if (this.animationParameters!.b.movetail)
        {
          this.modelYRotationRadians += 0.0* this.animationParameters!.b.speed * deltaTime;
          this.modelXRotationRadians += 0.1* this.animationParameters!.b.speed * deltaTime;   
        }  
        matrix = m4.axisRotation([1,0,0], this.modelXRotationRadians);
        matrix = m4.rotateY(matrix, this.modelYRotationRadians);            

        // Draw a F at the origin
        var worldMatrix = matrix; // m4.axisRotation([0,1,0],this.fRotationRadians) ;
    
        // Multiply the matrices.
        // var worldViewProjectionMatrix = m4.multiply(viewProjectionMatrix, worldMatrix);
        var worldInverseMatrix = m4.inverse(worldMatrix);
        var worldInverseTransposeMatrix = m4.transpose(worldInverseMatrix);
    
        // Set the matrices
        //  gl.uniformMatrix4fv(this.worldViewProjectionLocation!, false, worldViewProjectionMatrix);
        gl.uniformMatrix4fv(this.worldViewProjectionLocation!, false,cam.viewProjection);
        gl.uniformMatrix4fv(this.worldInverseTransposeLocation!, false, worldInverseTransposeMatrix);
        gl.uniformMatrix4fv(this.worldLocation!, false, worldMatrix);
    
        // Set the color to use
        gl.uniform4fv(this.colorLocation!, [0.2, 1, 0.2, 1]); // green
    
        // set the light position
        const lightPosition = [40, 60, 120];
        gl.uniform3fv(this.lightWorldPositionLocation!, lightPosition);
    
        // set the camera/view position
        camera = cam.Position();
        gl.uniform3fv(this.viewWorldPositionLocation!,  camera);
    
        // set the shininess
        gl.uniform1f(this.shininessLocation!, this.shininess);
    
        // set the spotlight uniforms
    
        // since we don't have a plane like most spotlight examples
        // let's point the spot light at the F
        {
            var lmat = m4.lookAt(lightPosition, target, up);
            lmat = m4.multiply(m4.axisRotation([1,0,0],this.lightRotationX), lmat);
            lmat = m4.multiply(m4.axisRotation([0,1,0],this.lightRotationY), lmat);
            // get the zAxis from the matrix
            // negate it because lookAt looks down the -Z axis
            this.lightDirection = [-lmat[8], -lmat[9], -lmat[10]];
        }
    
        gl.uniform3fv(this.lightDirectionLocation!, this.lightDirection);
        gl.uniform1f(this.innerLimitLocation!, Math.cos(this.innerLimit));
        gl.uniform1f(this.outerLimitLocation!, Math.cos(this.outerLimit));
    
        // Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 16 * 6;
        gl.drawArrays(primitiveType, offset, count);
      }
    
    

    //---------------------------------------------------------------------------------------------------

    // Fill the buffer with the values that define a letter 'F'.
    setGeometry(gl: WebGL2RenderingContext) {
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

  setNormals(gl: WebGL2RenderingContext) {
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
  
}