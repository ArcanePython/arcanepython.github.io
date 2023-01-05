import { m4 } from "twgl.js";
import * as camhandler from "./../baseapp/camhandler"
import {TAnimation1Parameters} from "./scene"

export class BaseScene
{
 animationParameters: TAnimation1Parameters | undefined;

 worldViewProjectionLocation: WebGLUniformLocation | undefined ;   // u_worldViewProjection
 worldInverseTransposeLocation: WebGLUniformLocation | undefined ; // u_worldInverseTranspose
 worldLocation: WebGLUniformLocation | undefined ;                 // u_world

 modelXRotationRadians: number = 0.0;
 modelYRotationRadians: number = 0.0;

 vaoSingleObject: WebGLVertexArrayObject | undefined;
 positionBuffer: WebGLBuffer|undefined;
 positionAttributeLocation: number|undefined;
  
 public initMatrixUniforms(gl: WebGL2RenderingContext, program: WebGLProgram)
 {
  // lookup uniforms
  this.worldViewProjectionLocation = gl.getUniformLocation(program, "u_worldViewProjection")!;
  this.worldInverseTransposeLocation = gl.getUniformLocation(program, "u_worldInverseTranspose")!;
  this.worldLocation = gl.getUniformLocation(program, "u_world")!;
 }

 
 public initSingleObject(gl: WebGL2RenderingContext, 
                         program: WebGLProgram, 
                         setGeometry: (gl: WebGL2RenderingContext)=>void, 
                         setNormals: (gl: WebGL2RenderingContext)=>void, 
                         sceneReadyCallback: (a:any)=>void | undefined)
 {
      // Create a vertex array object (attribute state)
      this.vaoSingleObject = gl.createVertexArray()!;

      // and make it the one we're currently working with
      gl.bindVertexArray(this.vaoSingleObject);

      // look up where the vertex data needs to go.
      this.positionAttributeLocation = gl.getAttribLocation(program, "a_position");
      var normalAttributeLocation = gl.getAttribLocation(program, "a_normal");
      // Turn on the attribute
      gl.enableVertexAttribArray(this.positionAttributeLocation);

      // Create a buffer
      this.positionBuffer = gl.createBuffer()!;

      // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
      gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer!);
      // Set Geometry.
      setGeometry(gl);

      // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
      var size = 3;          // 3 components per iteration
      var type = gl.FLOAT;   // the data is 32bit floats
      var normalize = false; // don't normalize the data
      var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
      var offset = 0;        // start at the beginning of the buffer
      gl.vertexAttribPointer(   this.positionAttributeLocation, size, type, normalize, stride, offset);

      // create the normalr buffer, make it the current ARRAY_BUFFER
      // and copy in the normal values
      var normalBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
      setNormals(gl);

      // Turn on the attribute
      gl.enableVertexAttribArray(normalAttributeLocation);

      // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
      var size = 3;          // 3 components per iteration
      var type = gl.FLOAT;   // the data is 32bit floats
      var normalize = false; // don't normalize the data
      var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next color
      var offset = 0;        // start at the beginning of the buffer
      gl.vertexAttribPointer(normalAttributeLocation, size, type, normalize, stride, offset);
      sceneReadyCallback(0);

 }

 renderCameraSingleRotatingObjectPrologue(gl: WebGL2RenderingContext,cam: camhandler.Camera, deltaTime: number)
 {
   var viewProjectionMatrix = cam.viewProjection; // m4.multiply(projectionMatrix, viewMatrix);
  this.renderMatrixSingleRotatingObjectPrologue(gl, viewProjectionMatrix, deltaTime);
  gl.bindVertexArray(this.vaoSingleObject!);
}

private renderMatrixSingleRotatingObjectPrologue(gl: WebGL2RenderingContext,viewProjectionMatrix: m4.Mat4, deltaTime: number)
{
  if (this.animationParameters!.b.move)
  {
    this.modelYRotationRadians += 0.05* this.animationParameters!.b.speed * deltaTime;
    this.modelXRotationRadians += 0.05* this.animationParameters!.b.speed * deltaTime;   
  }  
  var matrixXRot = m4.axisRotation([1,0,0], this.modelXRotationRadians);
  var matrixYRot = m4.axisRotation([0,1,0], this.modelYRotationRadians);           
  var worldMatrix = m4.multiply(matrixXRot,matrixYRot); // m4.axisRotation([0,1,0],this.fRotationRadians) ;
  var worldViewProjectionMatrix = m4.multiply(viewProjectionMatrix, worldMatrix);
 
  // Set the matrices
  gl.uniformMatrix4fv(this.worldLocation!, false,worldMatrix);
  gl.uniformMatrix4fv(this.worldViewProjectionLocation!, false, worldViewProjectionMatrix);
 
  var worldInverseMatrix = m4.inverse(worldMatrix);
  var worldInverseTransposeMatrix = m4.transpose(worldInverseMatrix);
 gl.uniformMatrix4fv(this.worldInverseTransposeLocation!, false, worldInverseTransposeMatrix);
}
}

