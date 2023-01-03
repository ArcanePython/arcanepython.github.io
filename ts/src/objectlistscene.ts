import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as objectnode from "./objectnode"; 
import * as scene from "./scene"
import * as datgui from "dat.gui";
import * as camhandler from "./camhandler"   // camera projection

import { TAnimation1Parameters }  from "./scene"

/*
interface NodeJson {
  draw: boolean;
  name: string;
  scaling:number[];
  translation: number[];
  children: NodeJson[];
}
*/

export class ObjectListScene  implements scene.SceneInterface
{
  twglprograminfo: twgl.ProgramInfo[]|null=null;  // shaders are provided in interface string fields, in this scene twglprograminfo[] remains null
  scenesize=60;
  sceneenv=2;
  positionLocation: number | undefined; // WebGLUniformLocation | undefined;
  cameraPosition: [number,number,number] | undefined
  animationParameters: TAnimation1Parameters | undefined;
  public resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }
  public extendGUI(gui: datgui.GUI) {}

  scenetree:objectnode.Node |undefined;
  gl: WebGL2RenderingContext | undefined;
  fieldOfViewRadians: number  | undefined;
  
  vertexShaderSource = `#version 300 es

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
  
  fragmentShaderSource = `#version 300 es
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

  // state
  cx: number=0;
  cy: number=0;
  cz: number=10;
  vx: number=0.0;
  vy: number=0;
  vz: number=0.0;

  public constructor(gl: WebGL2RenderingContext)
  {
    this.twglprograminfo=new Array(2);   
    this.twglprograminfo[1] = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
  }

  async FetchText(cparcelname: string){
    const res = await fetch(cparcelname);
    var b= await res.arrayBuffer();
    var enc = new TextDecoder("utf-8");
    return enc.decode(b);
  }

  initScene(gl: WebGL2RenderingContext, cap: scene.TAnimation1Parameters, dictpar:Map<string,string>, p: twgl.ProgramInfo, sceneReadyCallback: (a:any)=>void | undefined) 
  {  
    this.gl = gl;
    this.fieldOfViewRadians = (60.0* Math.PI / 180);
    var cubeBufferInfo = twgl.primitives.createCubeBufferInfo(gl, 1.0);  // create the cube
    var sphereBufferInfo = twgl.primitives.createCubeBufferInfo(gl, 1.0);  // create the cube
    // spheres
    // var cubeBufferInfo = twgl.primitives.createSphereBufferInfo(gl, 0.5, 12,12);      
    this.nodeInfosByName = undefined;
    var nodefact = new objectnode.NodesProducer(p,cubeBufferInfo);
    var parcls=require('./resources/blockguy.json');

    var nodedescriptions: objectnode.NodeJson = JSON.parse(this.sjson);
    this.scenetree = nodefact.makeNode(nodedescriptions,undefined);// -Math.PI/4.0);
    this.objects = nodefact.objects;
    this.objectsToDraw = nodefact.objectsToDraw;
    this.nodeInfosByName= nodefact.nodeInfosByName;
    sceneReadyCallback(0);

    /*
    var mydata= this.FetchText(parcls).then ((s: string)=> {
       //   console.log("mydata="+mydata +  " s="+s);
          var nodedescriptions: NodeJson = JSON.parse(s);
          this.scenetree = nodefact.makeNode(nodedescriptions);
          this.objects = nodefact.objects;
          this.objectsToDraw = nodefact.objectsToDraw;
          this.nodeInfosByName= nodefact.nodeInfosByName;
          sceneReadyCallback(0);
        });
        */
  }

  public setRotationAdjust(ni: {[key: string]: objectnode.NodeInfoByName},name: string, axis: number, adjust: number)
  {
    if (ni[name]!=undefined) ni[name].trs.rotation[axis] =  adjust;
  }

  public drawScene(gl: WebGL2RenderingContext,cam: camhandler.Camera, time: number) 
  {
 //   gl.enable(gl.BLEND);
 //   gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
   // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   
    // check if JSon read and converted
   // if (!this.nodeInfosByName) return; 
    
  /*  
    var aspect = (gl.canvas as HTMLCanvasElement).clientWidth / (gl.canvas as HTMLCanvasElement).clientHeight;
  
    // setup a fixed camera's projection matrix (Gregg's code)
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
  */
/*
    this.cameraPosition = (this.animationParameters?.b.move)? [Math.cos(time * 0.04 * this.animationParameters.b.speed) * 4.0, 0, 
      Math.sin(time * 0.04 * this.animationParameters.b.speed) * 4.0] 
: [4.0,0.0,0.0];
if (!this.animationParameters?.b.move)
this.cameraPosition = cam?.Position() as [number,number,number]; // [cam?.Position()[0]!,cam?.Position()[1]!,cam?.Position()[2]!];
*/

   // setup a mouse-controlled camhandler camera
   var speed = 1;
 /*   
   //cam.target = [this.cx, this.cy, this.cz];
   //cam.translateEye([this.vx*speed/4.0,this.vy*speed/4.0,this.vz*speed/4.0])
   var zNear = 1;
   var zFar = 2000;
   var fieldOfViewRadians  = 40.0*Math.PI/180.0;
   var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
   // Compute the camera's matrix
   var camera = cam.Position();
   var cameraMatrix = cam.lookAt; // Lx delegate task elsewhere m4.lookAt(camera, target, up);
   // Make a view matrix from the camera matrix.
   var viewMatrix = m4.inverse(cameraMatrix);
 */  // create a viewProjection matrix. This will both apply perspective
   // AND move the world so that the camera is effectively the origin
   var viewProjectionMatrix = cam.viewProjection;// m4.multiply(projectionMatrix, viewMatrix);


    // Animation
    var adjust;
    var c = time * 0.003 * speed;
    adjust = Math.abs(Math.sin(c));

    var nodeInfosByName= this.nodeInfosByName!;
    nodeInfosByName["point between feet"].trs.translation[1] = adjust;

    this.setRotationAdjust(nodeInfosByName,"point between feet",1,0.0); //Math.atan2(this.vx, this.vz));
    adjust = Math.sin(c);
    this.setRotationAdjust(nodeInfosByName,"left-leg",0,adjust);
    this.setRotationAdjust(nodeInfosByName,"right-leg",0,-adjust);
    adjust = Math.sin(c + 0.1) * 0.4;
    this.setRotationAdjust(nodeInfosByName,"left-calf",0,-adjust);
    this.setRotationAdjust(nodeInfosByName,"right-calf",0,adjust);
    adjust = Math.sin(c + 0.1) * 0.4;
    this.setRotationAdjust(nodeInfosByName,"left-foot",0,-adjust);
    this.setRotationAdjust(nodeInfosByName,"right-foot",0,adjust);

    adjust = Math.sin(c) * 0.4;
    this.setRotationAdjust(nodeInfosByName,"left-arm",2,adjust);
    this.setRotationAdjust(nodeInfosByName,"right-arm",2,adjust);
    adjust = Math.sin(c + 0.1) * 0.4;
    this.setRotationAdjust(nodeInfosByName,"left-forearm",2,adjust);
    this.setRotationAdjust(nodeInfosByName,"right-forearm",2,adjust);
    adjust = Math.sin(c - 0.1) * 0.4;
    this.setRotationAdjust(nodeInfosByName,"left-hand",2,adjust);
    this.setRotationAdjust(nodeInfosByName,"right-hand",2,adjust);
   
    adjust = Math.sin(c) * 0.4;
    this.setRotationAdjust(nodeInfosByName,"waist",1,adjust);
    adjust = Math.sin(c) * 0.2;
    this.setRotationAdjust(nodeInfosByName,"torso",1,adjust);
    adjust = Math.sin(c + 0.25) * 0.4;
    this.setRotationAdjust(nodeInfosByName,"neck",1,adjust);
    adjust = Math.sin(c + 0.5) * 0.4;
    this.setRotationAdjust(nodeInfosByName,"head",1,adjust);
    adjust = Math.cos(c * 2) * 0.4;
    this.setRotationAdjust(nodeInfosByName,"head",0,adjust);

    // Update all world matrices in the scene graph
    var currentTranslation: m4.Mat4 = m4.translation([this.cx,this.cy,this.cz]);
    this.scenetree!.updateWorldMatrix(currentTranslation);
    this.cx+=this.vx*speed/4.0;
    this.cy+=this.vy*speed/4.0;
    this.cz+=this.vz*speed/4.0;

    // Compute all the matrices for rendering
    this.objects.forEach((object) => {
        object.drawInfo!.uniforms.u_matrix = m4.multiply(viewProjectionMatrix, object.worldMatrix);
    });

     // Draw the objects using Gregg's drawObjectList (this will clear the background)
    twgl.drawObjectList(gl, this.objectsToDraw);

    //
    // below code to spell out drawObjectList to find the cause of the clear issue
    //
    return;

    var init=false;
    // ->drawObjectList replacement..
    // draw each object using drawBufferInfo()
    //  this.objectsToDraw.forEach(d => {  
    //    .. best construct, but I need a break, so..
    for (var i:number=0; i<this.objectsToDraw.length; i++) {
        var d = this.objectsToDraw[i];
        // gl.useProgram(d.programInfo.program); // no effect
        twgl.setUniforms(d.programInfo,d.uniforms); // ok

        // needed, but inserting this one will clear the background!
        twgl.setBuffersAndAttributes(gl, d.programInfo, d.bufferInfo!);  
      /*
        // -> "setBuffersAndAttributes" replace
        // (marked obsolete, not published) twgl.setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
        // setAttributes written out..
        // leaving this out.. will not clear the background, but draw faulty geometry!
        if (init) 
          for (var name in d.bufferInfo!.attribs) {
            var setter = d.programInfo.attribSetters[name]; 
            if (setter) 
            { // a_position
              //console.log("set  "+name +"="+d.bufferInfo!.attribs[name]); 
              setter!(d.bufferInfo!.attribs[name]); // even if called once, inserting this will clear the background!
            }
          }
        init=false;

        // ok, needed
        if (d.bufferInfo?.indices) {
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, d.bufferInfo?.indices);
        }
        */

        // <- "setBuffersAndAttributes"
        //break; // doesn't matter! background is cleared on the second draw
        twgl.drawBufferInfo(gl,d.bufferInfo!,gl.TRIANGLES,d.bufferInfo?.numElements,0,undefined); 
        //break
      };

    }

  
 sjson = `{
  "draw": false,
  "name": "point between feet",
  "scaling": [1,1,1],
  "translation":[0,0,0],
  "children": [
    {
       "draw": true,
       "name": "waist",
       "scaling": [1,1,1],
       "translation": [0, 0, 0],
       "children": [
         {
           "draw": true,
           "name": "torso",
           "scaling": [1,1,1],
           "translation": [0, 2, 0],
           "children": [
             {
               "draw": true,
               "name": "neck",
               "scaling": [1,1,1],
               "translation": [0, 1, 0],
               "children": [
                 {
                   "draw": true,
                   "name": "head",
                   "scaling": [1,1,1],
                   "translation": [0, 1, 0],
                   "children": []
                 }
               ]
             },
             {
               "draw": true,
               "name": "left-arm",
               "scaling": [1,1,1],
               "translation": [-1, 0, 0],
               "children": [
                 {
                   "draw": true,
                   "name": "left-forearm",
                   "scaling": [1,1,1],
                   "translation": [-1, 0, 0],
                   "children": [
                     {
                       "draw": true,
                       "name": "left-hand",
                       "scaling": [1,1,1],
                       "translation": [-1, 0, 0],
                       "children":[]
                     }
                   ]
                 }
               ]
             },
             {
               "draw": true,
               "name": "right-arm",
               "scaling": [1,1,1],
               "translation": [1, 0, 0],
               "children": [
                 {
                   "draw": true,
                   "name": "right-forearm",
                   "scaling": [1,1,1],
                   "translation": [1, 0, 0],
                   "children": [
                     {
                       "draw": true,
                       "name": "right-hand",
                       "scaling": [1,1,1],
                       "translation": [1, 0, 0],
                       "children":[]
                     }
                   ]
                 }
               ]
             }
           ]
         },
         {
           "draw": true,
           "name": "left-leg",
           "translation": [-1, -1, 0],
           "children": [
             {
               "draw": true,
               "name": "left-calf",
               "scaling": [1,1,1],
               "translation": [0, -1, 0],
               "children": [
                 {
                   "draw": true,
                   "name": "left-foot",
                   "scaling": [1,1,1],
                   "translation": [0, -1, 0],
                   "children": []
                 }
               ]
             }
           ]
         },
         {
           "draw": true,
           "name": "right-leg",
           "scaling": [1,1,1],
           "translation": [1, -1, 0],
           "children": [
             {
               "draw": true,
               "name": "right-calf",
               "scaling": [1,1,1],
               "translation": [0, -1, 0],
               "children": [
                 {
                   "draw": true,
                   "name": "right-foot",
                   "scaling": [1,1,1],
                   "translation": [0, -1, 0],
                   "children": []
                 }
               ]
             }
           ]
         }
       ]
    }
  ]
}`;


}
