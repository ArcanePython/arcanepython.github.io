import * as twgl from "./../node_modules/twgl.js";    // Greg's work
import { m4 } from "./../node_modules/twgl.js";

import * as scene from "./scene"
import * as datgui from "dat.gui";
import * as camhandler from "./camhandler"   // camera projection

import { TAnimation1Parameters }  from "./scene"

export class Canvas3dTextureScene
implements scene.SceneInterface
{
  twglprograminfo: twgl.ProgramInfo[]|null=null;  // shaders are provided in interface string fields, in this scene twglprograminfo[] remains null
  scenesize=60;
  sceneenv=2;
  positionLocation: number | undefined; // WebGLUniformLocation | undefined;
  cameraPosition: [number,number,number] | undefined
  animationParameters: TAnimation1Parameters | undefined;
  public resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }
  public extendGUI(gui: datgui.GUI) 
  {
    gui.add(this.animationParameters!, 'fov', 5.0,85.0,1.0 );
 
  }

     targetTextureWidth = 512;
     targetTextureHeight = 512;
  
  gl: WebGL2RenderingContext | undefined;
  program: WebGLProgram | undefined;
  texture: WebGLTexture |undefined;
  targetTexture: WebGLTexture |undefined;
  fb: WebGLFramebuffer | undefined;

  vertexShaderSource = `#version 300 es

    // an attribute is an input (in) to a vertex shader.
    // It will receive data from a buffer
    in vec4 a_position;
    in vec2 a_texcoord;

    // A matrix to transform the positions by
    uniform mat4 u_matrix;

    // a varying to pass the texture coordinates to the fragment shader
    out vec2 v_texcoord;

    // all shaders have a main function
    void main() {
      // Multiply the position by the matrix.
      gl_Position = u_matrix * a_position;

      // Pass the texcoord to the fragment shader.
      v_texcoord = a_texcoord;
    }
    `;

 fragmentShaderSource = `#version 300 es

    precision highp float;

    // Passed in from the vertex shader.
    in vec2 v_texcoord;

    // The texture.
    uniform sampler2D u_texture;
    uniform vec4 u_colorMult;

    // we need to declare an output for the fragment shader
    out vec4 outColor;

    void main() {
      outColor = vec4(texture(u_texture, v_texcoord).rrr, 1) * u_colorMult;
    }
    `;


matrixLocation: WebGLUniformLocation|undefined;
textureLocation: WebGLUniformLocation|undefined;
colorMultLocation:  WebGLUniformLocation|undefined;
vao:WebGLVertexArrayObject |undefined;

fieldOfViewRadians:number = (60* Math.PI / 180);

public constructor(gl: WebGL2RenderingContext)
{
  this.twglprograminfo=new Array(2);   
  console.log("=> scene constructor 3dtexture")
  this.twglprograminfo[1] = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
  console.log("<= scene constructor 3dtexture")
}


positionBuffer: WebGLBuffer|undefined;
positionAttributeLocation: number|undefined;

public restoreContext(gl: WebGL2RenderingContext, posBuffer: WebGLBuffer, posAttributeLocation: number, size: number)
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

initScene(gl: WebGL2RenderingContext, cap: scene.TAnimation1Parameters, dictpar:Map<string,string>, p: twgl.ProgramInfo, sceneReadyCallback: (a:any)=>void | undefined) 
{  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  var canvas = gl.canvas; // document.querySelector("#canvas");
  //var gl = canvas.getContext("webgl2");
  if (!gl) {
    console.log("ERROR: gl found null in canvas3dtexturescene.initScene()")
    return;
  }
  console.log("=> canvas3dtexturescene.initScene()");
  // Use our boilerplate utils to compile the shaders and link into a program
  this.program = p.program;
  // twgl.createProgramFromSources(gl,
  //    [this.vertexShaderSource, this.fragmentShaderSource]);

  // look up where the vertex data needs to go.
  this.positionAttributeLocation = gl.getAttribLocation(this.program, "a_position");
  var texcoordAttributeLocation = gl.getAttribLocation(this.program, "a_texcoord");

  // look up uniform locations
  this.matrixLocation = gl.getUniformLocation(this.program, "u_matrix")!;
  this.textureLocation = gl.getUniformLocation(this.program, "u_texture")!;
  this.colorMultLocation = gl.getUniformLocation(this.program, "u_colorMult")!;

  // Create a buffer
  this.positionBuffer = gl.createBuffer()!;

  // Create a vertex array object (attribute state)
   this.vao = gl.createVertexArray()!;

  // and make it the one we're currently working with
  gl.bindVertexArray(this.vao);

  this.restoreContext(gl, this.positionBuffer,this.positionAttributeLocation,3);
  /*
  // Turn on the attribute
  gl.enableVertexAttribArray(this.positionAttributeLocation);
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
  // Set Geometry.
  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 3;          // 3 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer( this.positionAttributeLocation, size, type, normalize, stride, offset);
*/

var positions = this.setGeometry(gl);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
  
  // create the texcoord buffer, make it the current ARRAY_BUFFER
  // and copy in the texcoord values
  var texcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
  var texbuffer= this.setTexcoords(gl);
  gl.bufferData( gl.ARRAY_BUFFER, texbuffer, gl.STATIC_DRAW);

  // Turn on the attribute
  gl.enableVertexAttribArray(texcoordAttributeLocation);

  // Tell the attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floating point values
  var normalize = true;  // convert from 0-255 to 0.0-1.0
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next color
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
      texcoordAttributeLocation, size, type, normalize, stride, offset);

  // Create a texture.
  this.texture = gl.createTexture()!;

  // use texture unit 0
  gl.activeTexture(gl.TEXTURE0 + 0);

  // bind to the TEXTURE_2D bind point of texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, this.texture);

  // fill texture with 3x2 pixels
  {
    const level = 0;
    const internalFormat = gl.R8;
    const width = 3;
    const height = 2;
    const border = 0;
    const format = gl.RED;
    const type = gl.UNSIGNED_BYTE;
    const data = new Uint8Array([
      128,  64, 128,
        0, 192,   0,
    ]);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border,
                  format, type, data);
  }

  // set the filtering so we don't need mips
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  // Create a texture to render to
  //const targetTextureWidth = 256;
  //const targetTextureHeight = 256;
  this.targetTexture = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, this.targetTexture);

  {
    // define size and format of level 0
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;
    const data = null;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  this.targetTextureWidth, this.targetTextureHeight, border,
                  format, type, data);

    // set the filtering so we don't need mips
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }

  // Create and bind the framebuffer
  this.fb = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);

  // attach the texture as the first color attachment
  const attachmentPoint = gl.COLOR_ATTACHMENT0;
  const level = 0;
  gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, this.targetTexture, level);

  // create a depth texture
  const depthTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, depthTexture);

  // make a depth buffer and the same size as the targetTexture
  {
    // define size and format of level 0
    const level = 0;
    const internalFormat = gl.DEPTH_COMPONENT24;
    const border = 0;
    const format = gl.DEPTH_COMPONENT;
    const type = gl.UNSIGNED_INT;
    const data = null;
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  this.targetTextureWidth, this.targetTextureHeight, border,
                  format, type, data);

    // set the filtering so we don't need mips
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // attach the depth texture to the framebuffer
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture, level);
  }

//  var modelXRotationRadians = (0);
//  var modelYRotationRadians = (0);

  // Get the starting time.
  // var then = 0;

  this.gl = gl;
  this.ctime = 0.0;

  console.log("<= canvas3dtexturescene.initScene()");

  sceneReadyCallback(-1);
//  requestAnimationFrame((time)=>this.drawScene(time));
//  requestAnimationFrame(drawScene);

 }

  drawCube( aspect:number,cam: camhandler.Camera|null) {
    // Tell it to use our program (pair of shaders)

   var gl = this.gl!;
   var program= this.program!;

    gl.useProgram(program);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(this.vao!);

    this.restoreContext(gl, this.positionBuffer!,this.positionAttributeLocation!,3);
  
    // Compute the projection matrix
    var projectionMatrix =
        m4.perspective(this.fieldOfViewRadians, aspect, 1, 2000);

    var viewProjectionMatrix = m4.identity();
    if (cam==null)
    {
      var cameraPosition = [0, 0, 2];
      var up = [0, 1, 0];
      var target = [0, 0, 0];

      // Compute the camera's matrix using look at.
      var cameraMatrix = m4.lookAt(cameraPosition, target, up);

      // Make a view matrix from the camera matrix.
      var viewMatrix = m4.inverse(cameraMatrix);
      
      viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
    } else
    {
      //---Camera - Compute the matrix
      var aspect = (gl.canvas as HTMLCanvasElement).clientWidth / (gl.canvas as HTMLCanvasElement).clientHeight;
      var zNear = 1;
      var zFar = 2000;
      var projectionMatrix = m4.perspective(this.fieldOfViewRadians, aspect, zNear, zFar);

      // Compute the camera's matrix
      var camera = cam.Position();
      var cameraMatrix = cam.lookAt; // Lx delegate task elsewhere m4.lookAt(camera, target, up);

      // Make a view matrix from the camera matrix.
      var viewMatrix = m4.inverse(cameraMatrix);

      // create a viewProjection matrix. This will both apply perspective
      // AND move the world so that the camera is effectively the origin
      viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
    }

   var x=1;
   // for (let x = -1; x <= 1; ++x) 
   {
      var matrix = m4.translate(viewProjectionMatrix,[0,0,0]); // [x * .9, 0, 0]);
      matrix = m4.axisRotate(matrix,[1,0,0], this.modelXRotationRadians * x);
      matrix = m4.axisRotate(matrix,[0,1,0], this.modelYRotationRadians * x);


      // Set the matrix.
      gl.uniformMatrix4fv(this.matrixLocation!, false, matrix);

      // Tell the shader to use texture unit 0 for u_texture
      gl.uniform1i(this.textureLocation!, 0);

      const c = x * .1 + .5;
      gl.uniform4fv(this.colorMultLocation!, [c * .5 + .5, 1, 1 - c, 1]);

      // Draw the geometry.
      var primitiveType = gl.TRIANGLES;
      var offset = 0;
      var count = 6 * 6;
      gl.drawArrays(primitiveType, offset, count);
    }
  }

  ctime: number = 0;
  modelXRotationRadians: number=0;
  modelYRotationRadians: number=0;
  // Draw the scene.
  public drawScene(gl: WebGL2RenderingContext,cam: camhandler.Camera, time: number) 
 {
 
    // convert to seconds
    time *= 0.001;
    // Subtract the previous time from the current time
    var deltaTime = time - this.ctime;
    // Remember the current time for the next frame.
    this.ctime = time;

    // Animate the rotation
    this.modelYRotationRadians += -0.7 * deltaTime;
    this.modelXRotationRadians += -0.4 * deltaTime;

  //  twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

    {
      // render to our targetTexture by binding the framebuffer
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb!);

      // render cube with our 3x2 texture
      gl.bindTexture(gl.TEXTURE_2D, this.texture!);

      // Tell WebGL how to convert from clip space to pixels
      gl.viewport(0, 0, this.targetTextureWidth, this.targetTextureHeight);

      // Clear the canvas AND the depth buffer.
      gl.clearColor(.5, .7, 1, 1);   // clear to blue
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const aspect = this.targetTextureWidth / this.targetTextureHeight;
      this.drawCube(aspect, null);
    }

    {
      // render to the canvas
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      // render the cube with the texture we just rendered to
      gl.bindTexture(gl.TEXTURE_2D, this.targetTexture!);

      // Tell WebGL how to convert from clip space to pixels
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      // Clear the canvas AND the depth buffer.
  //    gl.clearColor(1, 1, 1, 1);   // clear to white
  //    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


      const aspect = (gl.canvas as HTMLCanvasElement).clientWidth / (gl.canvas as HTMLCanvasElement).clientHeight;
      this.drawCube(aspect, cam);
    }

    //requestAnimationFrame((time)=>this.drawScene(time));
  }



// Fill the buffer with the values that define a cube.
 setGeometry(gl: WebGL2RenderingContext):Float32Array {
  var positions = new Float32Array(
    [
    -0.5, -0.5,  -0.5,
    -0.5,  0.5,  -0.5,
     0.5, -0.5,  -0.5,
    -0.5,  0.5,  -0.5,
     0.5,  0.5,  -0.5,
     0.5, -0.5,  -0.5,

    -0.5, -0.5,   0.5,
     0.5, -0.5,   0.5,
    -0.5,  0.5,   0.5,
    -0.5,  0.5,   0.5,
     0.5, -0.5,   0.5,
     0.5,  0.5,   0.5,

    -0.5,   0.5, -0.5,
    -0.5,   0.5,  0.5,
     0.5,   0.5, -0.5,
    -0.5,   0.5,  0.5,
     0.5,   0.5,  0.5,
     0.5,   0.5, -0.5,

    -0.5,  -0.5, -0.5,
     0.5,  -0.5, -0.5,
    -0.5,  -0.5,  0.5,
    -0.5,  -0.5,  0.5,
     0.5,  -0.5, -0.5,
     0.5,  -0.5,  0.5,

    -0.5,  -0.5, -0.5,
    -0.5,  -0.5,  0.5,
    -0.5,   0.5, -0.5,
    -0.5,  -0.5,  0.5,
    -0.5,   0.5,  0.5,
    -0.5,   0.5, -0.5,

     0.5,  -0.5, -0.5,
     0.5,   0.5, -0.5,
     0.5,  -0.5,  0.5,
     0.5,  -0.5,  0.5,
     0.5,   0.5, -0.5,
     0.5,   0.5,  0.5,

    ]);
 // 
  return positions;
}

// Fill the buffer with texture coordinates the cube.
 setTexcoords(gl: WebGL2RenderingContext): Float32Array {
  //
  //   
  return    new Float32Array(
        [
          0, 0,
          0, 1,
          1, 0,
          0, 1,
          1, 1,
          1, 0,

          0, 0,
          0, 1,
          1, 0,
          1, 0,
          0, 1,
          1, 1,

          0, 0,
          0, 1,
          1, 0,
          0, 1,
          1, 1,
          1, 0,

          0, 0,
          0, 1,
          1, 0,
          1, 0,
          0, 1,
          1, 1,

          0, 0,
          0, 1,
          1, 0,
          0, 1,
          1, 1,
          1, 0,

          0, 0,
          0, 1,
          1, 0,
          1, 0,
          0, 1,
          1, 1,

      ]);
      //),
      //gl.STATIC_DRAW);
}
}
