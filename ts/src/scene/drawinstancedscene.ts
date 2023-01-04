
import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as scene from "./scene"
import * as datgui from "dat.gui";
import * as camhandler from "./../baseapp/camhandler"   // camera projection

import { TAnimation1Parameters }  from "./scene"


export class DrawInstancedScene implements scene.SceneInterface
// https://webgl2fundamentals.org/webgl/lessons/webgl-instanced-drawing.html
{
    twglprograminfo: twgl.ProgramInfo[]|null=null;  // shaders are provided in interface string fields, in this scene twglprograminfo[] remains null
    scenesize=115;
    sceneenv=2;
    positionLocation: number | undefined; // WebGLUniformLocation | undefined;
    cameraPosition: [number,number,number] | undefined
    animationParameters: TAnimation1Parameters | undefined;
    public resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }
    public extendGUI(gui: datgui.GUI) {}
  
  gl: WebGL2RenderingContext | undefined;
  fieldOfViewRadians: number  | undefined;
  
   vertexShaderSource = `#version 300 es
in vec4 a_position;
in vec4 color;
in mat4 matrix;
uniform mat4 projection;
uniform mat4 view;

out vec4 v_color;

void main() {
  // Multiply the position by the matrix.
  gl_Position = projection * view * matrix * a_position;

  // Pass the vertex color to the fragment shader.
  v_color = color;
}
`;

 fragmentShaderSource = `#version 300 es
precision highp float;

// Passed in from the vertex shader.
in vec4 v_color;

out vec4 outColor;

void main() {
  outColor = v_color;
}
`;

program: WebGLProgram | undefined;
projectionLoc: WebGLUniformLocation | undefined;
viewLoc: WebGLUniformLocation | undefined;
vao: WebGLVertexArrayObject | undefined;

numVertices:number = 12;
numInstances: number = 6;
matrices: Float32Array[] = [];
matrixBuffer: WebGLBuffer | undefined;
matrixData: Float32Array| undefined;

public constructor(gl: WebGL2RenderingContext)
{
  this.twglprograminfo=new Array(2);   
  console.log("=> scene constructor instanced")
  this.twglprograminfo[1] = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
  console.log("<= scene constructor instanced")
}

  initScene(gl: WebGL2RenderingContext, cap: scene.TAnimation1Parameters, dictpar:Map<string,string>, p: twgl.ProgramInfo, sceneReadyCallback: (a:any)=>void | undefined) 
  {
    twgl.setAttributePrefix("a_");
  
    this.gl = gl;
    this.program = p.program;
    //const programInfo = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
    //this.program = programInfo.program;

    gl.useProgram(this.program);

    const positionLoc = gl.getAttribLocation(this.program, 'a_position');
    const colorLoc = gl.getAttribLocation(this.program, 'color');
    const matrixLoc = gl.getAttribLocation(this.program, 'matrix');
    this.projectionLoc = gl.getUniformLocation(this.program, 'projection')!;
    this.viewLoc = gl.getUniformLocation(this.program, 'view')!;

    // Create a vertex array object (attribute state)
    this.vao = gl.createVertexArray()!;

    // and make it the one we're currently working with
    gl.bindVertexArray(this.vao);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      
                      -0.1,  0.4,
                      -0.1, -0.4,
                        0.1, -0.4,
                      -0.1,  0.4,
                      0.1, -0.4,
                      0.1,  0.4, 
                      -0.4, -0.1,
                      0.4, -0.1,
                      -0.4,  0.1,
                      -0.4,  0.1,
                        0.4, -0.1,
                        0.4,  0.1, 
                
      ]), gl.STATIC_DRAW);
    this.numVertices = 12;

    // setup the position attribute
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(
        positionLoc,  // location
        2,            // size (num values to pull from buffer per iteration)
        gl.FLOAT,     // type of data in buffer
        false,        // normalize
        0,            // stride (0 = compute from size and type above)
        0,            // offset in buffer
    );

    // setup matrixes, one per instance
    this.numInstances = 6;
    // make a typed array with one view per matrix
    this.matrixData = new Float32Array(this.numInstances * 16)!;
    for (let i = 0; i < this.numInstances; ++i) {
      const byteOffsetToMatrix = i * 16 * 4;
      const numFloatsForView = 16;
      this.matrices.push(new Float32Array(
          this.matrixData.buffer,
          byteOffsetToMatrix,
          numFloatsForView));
    }

    this.matrixBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.matrixBuffer);
    // just allocate the buffer
    gl.bufferData(gl.ARRAY_BUFFER, this.matrixData.byteLength, gl.DYNAMIC_DRAW);

    // set all 4 attributes for matrix
    const bytesPerMatrix = 4 * 16;
    for (let i = 0; i < 4; ++i) {
      const loc = matrixLoc + i;
      gl.enableVertexAttribArray(loc);
      // note the stride and offset
      const offset = i * 16;  // 4 floats per row, 4 bytes per float
      gl.vertexAttribPointer(
          loc,              // location
          4,                // size (num values to pull from buffer per iteration)
          gl.FLOAT,         // type of data in buffer
          false,            // normalize
          bytesPerMatrix,   // stride, num bytes to advance to get to next set of values
          offset,           // offset in buffer
      );
      // this line says this attribute only changes for each 1 instance
      gl.vertexAttribDivisor(loc, 1);
    }

    // setup colors, one per instance
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array([
            1, 0, 0, 0.5,  // red
            0, 1, 0, 1,  // green
            0, 0, 1, 1,  // blue
            1, 0, 1, 1,  // magenta
            0, 1, 1, 1,  // cyan
            0, 1, 0, 0.5,  // cyan
          ]),
        gl.STATIC_DRAW);

    // set attribute for color
    gl.enableVertexAttribArray(colorLoc);
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    // this line says this attribute only changes for each 1 instance
    gl.vertexAttribDivisor(colorLoc, 1);

    sceneReadyCallback(0);

  }

  public drawScene(gl: WebGL2RenderingContext,cam: camhandler.Camera, time: number) 
  {

    var gl = this.gl!;
    time *= 0.001; // seconds

  //  twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  //  gl.useProgram(this.program!);

    // set the view and projection matrices since
    // they are shared by all instances
    const aspect = (gl.canvas as HTMLCanvasElement).clientWidth / (gl.canvas as HTMLCanvasElement).clientHeight;
    gl.uniformMatrix4fv(this.projectionLoc!, false, m4.ortho(-aspect, aspect, -1, 1, -1, 1));
    gl.uniformMatrix4fv(this.viewLoc!, false, m4.axisRotation([0,0,1],time * .1));

    // setup all attributes
    gl.bindVertexArray(this.vao!);

    // update all the matrices
    this.matrices.forEach((mat, ndx) => {
      m4.translation([-0.5 + ndx * 0.25, 0, 0], mat);
      m4.axisRotate(mat, [0,0,1],time * (0.1 + 0.1 * ndx), mat);
    });

    // upload the new matrix data
    gl.bindBuffer(gl.ARRAY_BUFFER, this.matrixBuffer!);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.matrixData!);
//console.log("draw "+this.numInstances);
    gl.drawArraysInstanced(
      gl.TRIANGLES,
      0,             // offset
      this.numVertices,   // num vertices per instance
      this.numInstances,  // num instances
    );
  }
 
}


