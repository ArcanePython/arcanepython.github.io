
import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as scene from "./scene"
import * as datgui from "dat.gui";
import * as camhandler from "./../baseapp/camhandler"   // camera projection

import { TAnimation1Parameters }  from "./../baseapp/baseapp"


export class DrawInstancedScene implements scene.SceneInterface
// https://webgl2fundamentals.org/webgl/lessons/webgl-instanced-drawing.html
{
 //   twglprograminfo: twgl.ProgramInfo[]|null=null;  // shaders are provided in interface string fields, in this scene twglprograminfo[] remains null
    scenesize=50;
    sceneenv=-1;
    positionLocation: number | undefined; // WebGLUniformLocation | undefined;
    cameraPosition: [number,number,number] | undefined
    animationParameters: TAnimation1Parameters | undefined;
    public resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }
    public defaultCamera(gl: WebGL2RenderingContext, cam: camhandler.Camera) { }

    public extendGUI(gui: datgui.GUI) {
        // Checkbox forward move animation on/off
      //  gui.add(this.animationParameters!, 'movetail');
      gui.add(this.animationParameters!, 'showgrid');
     
    }
 
  gl: WebGL2RenderingContext | undefined;
  fieldOfViewRadians: number  | undefined;
  
   vertexShaderSource = `#version 300 es
in vec4 a_position;
in vec4 color;
in mat4 matrix;
uniform mat4 world;
uniform mat4 viewprojection;
uniform mat4 view;

out vec4 v_color;

void main() {
  gl_Position = viewprojection * world * matrix * a_position;
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

//program: WebGLProgram | undefined;
worldloc: WebGLUniformLocation | undefined;
//viewLoc: WebGLUniformLocation | undefined;
viewprojectionLoc: WebGLUniformLocation | undefined;
vao: WebGLVertexArrayObject | undefined;

numVertices:number = 0;
numInstances: number = 0;
matrices: Float32Array[] = [];
matrixBuffer: WebGLBuffer | undefined;
matrixData: Float32Array| undefined;

twglprograminfo: twgl.ProgramInfo;

public constructor(gl: WebGL2RenderingContext)
{
 // this.twglprograminfo=new Array(2);   
  this.twglprograminfo = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
}

  initScene(gl: WebGL2RenderingContext, cap: TAnimation1Parameters,cam: camhandler.Camera, dictpar:Map<string,string>,  sceneReadyCallback: undefined | ((a:any)=>void)) 
  {
    console.log("-> initScene DrawInstancedScene");
    this.gl = gl;
   
    gl.useProgram(this.twglprograminfo.program);

    cam.camHeight = 0.0;
    cam.setYUpEye();

    this.animationParameters= cap;
    cap.move=false;
    cap.showgrid=true;
     
    var p=this.twglprograminfo!;
      
    const positionLoc = gl.getAttribLocation(p.program, 'a_position');
    const colorLoc = gl.getAttribLocation(p.program, 'color');
    const matrixLoc = gl.getAttribLocation(p.program, 'matrix');
    this.viewprojectionLoc = gl.getUniformLocation(p.program, 'viewprojection')!;
    this.worldloc = gl.getUniformLocation(p.program, 'world')!;
    //this.viewLoc = gl.getUniformLocation(p.program, 'view')!;

    //=========================================================================

     // each grid line is an instance
     this.numInstances = 62;

     // setup Float32Array matrix buffer, one per instance
     this.matrixData = new Float32Array(this.numInstances * 16)!;
     for (let i = 0; i < this.numInstances; ++i) {
       const byteOffsetToMatrix = i * 16 * 4;
       const numFloatsForView = 16;
       this.matrices.push(new Float32Array(
           this.matrixData.buffer,
           byteOffsetToMatrix,
           numFloatsForView));
     }

    // define positions 2d (2) or 3d (3)
    const posdim = 3;

    // define grid
    var tr = [0,0,0];
    var interspace = 0.5;
    var cx = 0.05;
    var cz = interspace*(this.numInstances-2);
    var cy = 0.0;
    var crgb = [1.0,0,0,1.0];

    // update the positions
    var positions = new Float32Array([
        -cx, cy, 0.0,
        -cx, cy,  cz,
        cx, cy, 0.0,
        cx, cy, 0.0,
        -cx, cy,  cz,
        cx, cy,  cz,
        ]);
 
    // update the matrices
    for (var ii: number=0; ii<this.numInstances; ii++)
     {
       var mat = this.matrices[ii];
       // uneven instances are Y-direction, even instances are X-direction
       if ((ii%2)==1) { m4.axisRotation( [0,1,0],-Math.PI/2.0, mat); m4.translate(mat,[tr[0]+2*Math.floor(ii/2) * interspace,tr[1],tr[2]], mat);  }
         else { m4.axisRotation( [0,1,0],0.0, mat); m4.translate(mat,[tr[0]-(2*Math.floor(ii/2)) * interspace,tr[1],tr[2]], mat);  }
     }

    // update the colors
    var colors = new Float32Array(this.numInstances*4);
    for (var ii: number=0; ii<this.numInstances; ii++)
    {
      colors[ii*4]=crgb[0];
      colors[ii*4+1]=crgb[1];
      colors[ii*4+2]=crgb[2];
      colors[ii*4+3]=crgb[3];
    }

    //==============================================================================================================================
 
    // Create a vertex array object (attribute state)
    this.vao = gl.createVertexArray()!;
      
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    gl.bufferData(gl.ARRAY_BUFFER,positions, gl.STATIC_DRAW);
    this.numVertices = positions.length/posdim;
 
    // and make it the one we're currently working with
    gl.bindVertexArray(this.vao);

    // setup attribute for the position
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(
        positionLoc,  // location
        posdim,            // size (num values to pull from buffer per iteration)
        gl.FLOAT,     // type of data in buffer
        false,        // normalize
        0,            // stride (0 = compute from size and type above)
        0,            // offset in buffer
    );
   
    this.matrixBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.matrixBuffer);
    // just allocate the buffer
    gl.bufferData(gl.ARRAY_BUFFER, this.matrixData.byteLength, gl.DYNAMIC_DRAW);

    // set attribute for matrices in gpu as vec4*4
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

    // setup colors in gpu
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,  colors,  gl.STATIC_DRAW);

    // set attribute for color in gpu
    gl.enableVertexAttribArray(colorLoc);
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);

    // this line says this attribute only changes for each 1 instance
    gl.vertexAttribDivisor(colorLoc, 1);

    console.log("<- initScene DrawInstancedScene");
 
    if (sceneReadyCallback!=undefined) sceneReadyCallback(0);
  
  }

  public drawScene(gl: WebGL2RenderingContext,cam: camhandler.Camera, time: number) 
  {  
    if (!this.animationParameters?.showgrid) return;

    gl.useProgram(this.twglprograminfo.program);

    var world = m4.identity();
    world =m4.multiply(m4.scaling([5,5,5]), m4.translation([16-1,0,-16+1]));  // m4.translation([16,-8,-16]);
    gl.uniformMatrix4fv(this.worldloc!, false, world);
    var m3 = cam!.viewProjection;
    gl.uniformMatrix4fv(this.viewprojectionLoc!, false, m3);
    gl.bindVertexArray(this.vao!);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.matrixBuffer!);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.matrixData!);
    gl.drawArraysInstanced(
      gl.TRIANGLES,
      0,             // offset
      this.numVertices,   // num vertices per instance
      this.numInstances,  // num instances
    );
  }
 
}


