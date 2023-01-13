import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as objectnode from "./../scene/objectnode";

export interface NodeJson {
  draw: boolean;
  name: string;
  scaling: number[];
  translation: number[];
  children: NodeJson[];
}

export class ObjectList
{
  scene:objectnode.Node |undefined;
  gl: WebGL2RenderingContext | undefined;
  fieldOfViewRadians: number  | undefined;
  
  vs = `#version 300 es

  in vec4 a_position;
  in vec4 a_color;
  
  uniform mat4 u_matrix;
  
  out vec4 v_color;
  
  void main() {
    // Multiply the position by the matrix.
    gl_Position = u_matrix * a_position;
  
    // Pass the color to the fragment shader.
    v_color = a_color;
  }
  `;
  
    fs = `#version 300 es
  precision highp float;
  
  // Passed in from the vertex shader.
  in vec4 v_color;
  
  uniform vec4 u_colorMult;
  uniform vec4 u_colorOffset;
  
  out vec4 outColor;
  
  void main() {
      outColor = v_color * u_colorMult + u_colorOffset;
  }
  `;

  // initialized in main() used in drawScene()
  nodeInfosByName : {[key:string]:objectnode.NodeInfoByName} | undefined;
  objectsToDraw: twgl.DrawObject[] = [];
  objects : objectnode.Node[] = [];

  programInfo: twgl.ProgramInfo | undefined;

  // state
  cx: number=0;
  cy: number=0;
  cz: number=-20;
  vx: number=0;
  vy: number=0;
  vz: number=0.05;

  async FetchText(cparcelname: string){
    const res = await fetch(cparcelname);
    var b= await res.arrayBuffer();
    var enc = new TextDecoder("utf-8");
    return enc.decode(b);
  }

  main(gl: WebGL2RenderingContext) 
  {  
    // setup GLSL program
    twgl.setAttributePrefix("a_");
    this.gl = gl;
    this.programInfo = twgl.createProgramInfo(gl, [this.vs, this.fs]);
    // setup Camera
    this.fieldOfViewRadians = (60.0* Math.PI / 180);
    // setup geometry
    // avoid Gregg's flattenedPrimitives for now - cant get it to compile in TS
    // var arrays: { [key:string]:twgl.primitives.TypedArray }= twgl.primitives.createCubeVertices(1); 
    // var cubeBufferInfo: twgl.BufferInfo = this.createFlattenedVertices(gl, arrays, 6)!;
    // cubes
    var cubeBufferInfo = twgl.primitives.createCubeBufferInfo(gl, 1.0);  // create the cube
    // spheres
    // var cubeBufferInfo = twgl.primitives.createSphereBufferInfo(gl, 0.5, 12,12);      
    // VAO (not needed)
    // var cubeBufferInfo: twgl.BufferInfo = twgl.primitives.createCubeVertices(1); // this.flattenedPrimitives.createCubeBufferInfo(gl, 1)!; // lx leave out , 1);
    // var cubeVAO = twgl.createVAOFromBufferInfo(gl, programInfo, cubeBufferInfo);
    this.nodeInfosByName = undefined;
    var nodefact = new objectnode.NodesProducer(this.programInfo,cubeBufferInfo);
    var parcls=require('./../resources/blockguy.json');
    var mydata= this.FetchText(parcls).then ((s: string)=> {
          console.log("mydata="+mydata +  " s="+s);
          var nodedescriptions: NodeJson = JSON.parse(s);
          this.scene = nodefact.makeNode(nodedescriptions);
          this.objects = nodefact.objects;
          this.objectsToDraw = nodefact.objectsToDraw;
          this.nodeInfosByName= nodefact.nodeInfosByName;
        });
     // First frame
    requestAnimationFrame((time)=>this.drawScene(time));
  }

  drawScene( time: number) 
  {
    time *= 0.001;

    // check if JSon read and converted
    if (!this.nodeInfosByName) 
    { 
      requestAnimationFrame((time)=>this.drawScene(time));
      return; 
    }
    var nodeInfosByName= this.nodeInfosByName!;
    
    var gl = this.gl!;
    twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
    var aspect = (gl.canvas as HTMLCanvasElement).clientWidth / (gl.canvas as HTMLCanvasElement).clientHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(this.programInfo!.program)

    // setup the camera's projection matrix
    var projectionMatrix =
        m4.perspective(this.fieldOfViewRadians!, aspect, 1, 200);
    // setup the camera's matrix using look at.
    var cameraPosition = [14, 3.5, 10];
    var target = [0, 0.0, 0];
    var up = [0, 1, 0];
    var cameraMatrix = m4.lookAt(cameraPosition, target, up);
    // setup view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);
    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    // Animation
    var adjust;
    var speed = 3;
    var c = time * speed;
    adjust = Math.abs(Math.sin(c));

    nodeInfosByName["point between feet"].trs.translation[1] = adjust;
    adjust = Math.sin(c);
    nodeInfosByName["left-leg" ].trs.rotation[0] =  adjust;
    nodeInfosByName["right-leg"].trs.rotation[0] = -adjust;
    adjust = Math.sin(c + 0.1) * 0.4;
    nodeInfosByName["left-calf" ].trs.rotation[0] = -adjust;
    nodeInfosByName["right-calf"].trs.rotation[0] =  adjust;
    adjust = Math.sin(c + 0.1) * 0.4;
    nodeInfosByName["left-foot" ].trs.rotation[0] = -adjust;
    nodeInfosByName["right-foot"].trs.rotation[0] =  adjust;

    adjust = Math.sin(c) * 0.4;
    nodeInfosByName["left-arm" ].trs.rotation[0] =  adjust;
    nodeInfosByName["left-arm" ].trs.rotation[1] =  adjust;
    nodeInfosByName["right-arm"].trs.rotation[2] =  adjust;
    adjust = Math.sin(c + 0.1) * 0.4;
    nodeInfosByName["left-forearm" ].trs.rotation[0] =  adjust;
    nodeInfosByName["left-forearm" ].trs.rotation[1] =  adjust;
    nodeInfosByName["right-forearm"].trs.rotation[2] =  adjust;
    adjust = Math.sin(c - 0.1) * 0.4;
    nodeInfosByName["left-hand" ].trs.rotation[2] =  adjust;
    nodeInfosByName["right-hand"].trs.rotation[2] =  adjust;
    nodeInfosByName["left-hand" ].trs.rotation[1] =  adjust;
    nodeInfosByName["right-hand"].trs.rotation[1] =  adjust;

    adjust = Math.sin(c) * 0.4;
    nodeInfosByName["waist"].trs.rotation[1] =  adjust;
    adjust = Math.sin(c) * 0.4;
    nodeInfosByName["torso"].trs.rotation[1] =  adjust;
    adjust = Math.sin(c + 0.25) * 0.4;
    nodeInfosByName["neck"].trs.rotation[1] =  adjust;
    adjust = Math.sin(c + 0.5) * 0.4;
    nodeInfosByName["head"].trs.rotation[1] =  adjust;
    adjust = Math.cos(c * 2) * 0.4;
    nodeInfosByName["head"].trs.rotation[0] =  adjust;

    // Update all world matrices in the scene graph
    var currentTranslation: m4.Mat4 = m4.translation([-this.cx,this.cy,this.cz]);
    this.scene!.updateWorldMatrix(currentTranslation);
    this.cx+=this.vx*speed/4.0;
    this.cy+=this.vy*speed/4.0;
    this.cz+=this.vz*speed/4.0;

    // Compute all the matrices for rendering
    this.objects.forEach((object) => {
        object.drawInfo!.uniforms.u_matrix = m4.multiply(viewProjectionMatrix, object.worldMatrix);
    });

    // Draw the objects
    twgl.drawObjectList(gl, this.objectsToDraw);
    // Next framw
    requestAnimationFrame((time)=>this.drawScene(time));
  }
}