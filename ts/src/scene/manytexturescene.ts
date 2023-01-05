import chroma from "chroma-js";

import * as twgl from "twgl.js"   // Greg's work
import { m4 } from "twgl.js"

import * as datgui from "dat.gui"

import * as camhandler from "./../baseapp/camhandler" // camera projection   
import * as scene from "./scene"

import { TAnimation1Parameters }  from "./scene"

type Tuniforms = { 
  u_diffuseMult?: [number,Number, number, number], 
  u_texture?:WebGLTexture, 
  u_diffuse?: WebGLTexture,
  u_viewInverse: twgl.m4.Mat4, 
  u_world: twgl.m4.Mat4, 
  u_worldInverseTranspose: twgl.m4.Mat4, 
  u_worldViewProjection: twgl.m4.Mat4 
};

type Tobject = {
  translation: number[], 
  ySpeed:number,
  zSpeed:number, 
  uniforms:Tuniforms 
};



export class Tdrawitem 
{
  do: twgl.DrawObject;
  obj: Tobject;

  constructor(cdo:twgl.DrawObject, cobj: Tobject)
  {
    this.do = cdo;
    this.obj = cobj;
  }

  public static getTwglDrawObjects(a: Tdrawitem[])
  {
    var ad: twgl.DrawObject[] = [];
    a.forEach((el)=> ad.push(el.do));
    return ad;
  }
}

export class ManyTexturesScene implements scene.SceneInterface
{
  // Interface
  animationParameters: TAnimation1Parameters | undefined;
  scenesize: number = 40;

  sceneenv:number = 1;
  positionLocation: number | undefined; // WebGLUniformLocation | undefined;
      
  public defaultCamera(gl: WebGL2RenderingContext, cam: camhandler.Camera) { }

  public static instance: ManyTexturesScene | undefined;

  vertexShaderSource = ``;
  fragmentShaderSource = ``;
  twglprograminfo: twgl.ProgramInfo[]|null=null;  // there are 2 sets of shaders defined here.
  cameraPosition: [number,number,number] | undefined

  // Local
  baseHue = this.rand(300);            // color of objects
  numObjects = 200;                    // object count
  spreadRadius = this.numObjects/10.0; // random placement range for objects
  dtime = 0.02;                        // animation timer interval
  
  private drawItems: Tdrawitem[] = [];                           // resource
  private textures: {[key: string]: WebGLTexture} | null = null; // resource

  private ctx2D: CanvasRenderingContext2D | null = null;  // a 2D canvas to draw things on (used for dynamic circle texture)

    // Shaders
    private one_point_vs = `#version 300 es
        
    uniform mat4 u_worldViewProjection;

    in vec4 a_position;
    in vec2 a_texcoord;

    out vec2 v_texCoord;

    void main() {
      v_texCoord = a_texcoord;
      gl_Position = u_worldViewProjection * a_position;
    }
    `;

    private one_point_fs = `#version 300 es
    precision highp float;

    in vec2 v_texCoord;

    uniform vec4 u_diffuseMult;
    uniform sampler2D u_diffuse;

    out vec4 outColor;

    void main() {
      vec4 diffuseColor = texture(u_diffuse, v_texCoord) * u_diffuseMult;
      if (diffuseColor.a < 0.1) {
        discard;
      }
      outColor = diffuseColor;
    }
    `;

    private env_map_vs = `#version 300 es

    uniform mat4 u_viewInverse;
    uniform mat4 u_world;
    uniform mat4 u_worldViewProjection;
    uniform mat4 u_worldInverseTranspose;

    in vec4 a_position;
    in vec3 a_normal;

    out vec3 v_normal;
    out vec3 v_surfaceToView;

    void main() {
      v_normal = (u_worldInverseTranspose * vec4(a_normal, 0)).xyz;
      v_surfaceToView = (u_viewInverse[3] - (u_world * a_position)).xyz;
      gl_Position = u_worldViewProjection * a_position;
    }
    `;

    private env_map_fs = `#version 300 es
    precision mediump float;

    uniform samplerCube u_texture;

    in vec3 v_surfaceToView;
    in vec3 v_normal;

    out vec4 outColor;

    void main() {
      vec3 normal = normalize(v_normal);
      vec3 surfaceToView = normalize(v_surfaceToView);
      vec4 color = texture(u_texture, -reflect(surfaceToView, normal));
      outColor = color;
    }
    `;
  
    
constructor(gl: WebGL2RenderingContext)
{
  ManyTexturesScene.instance = this;
  this.twglprograminfo=new Array(3);   
  this.twglprograminfo![1] = twgl.createProgramInfo(gl, [this.one_point_vs, this.one_point_fs]);
  this.twglprograminfo![2] = twgl.createProgramInfo(gl, [this.env_map_vs, this.env_map_fs]);
}

public extendGUI(gui: datgui.GUI)
{
// Slider for sling speed
// Checkbox forward move animation on/off
console.log("=> manyTextures extendGUI movetail"+this.animationParameters!);
 gui.add(this.animationParameters!, 'movetail');
 //gui.add(this.animationParameters!, 'sling').min(9).max(120).step(1);
 // Slider for shininess
 //gui.add(this.animationParameters!, 'shininess').min(0).max(20.0).step(0.1);
 gui.add(this.animationParameters!, 'fov', 5.0,85.0,1.0 );
 
 gui.updateDisplay();
 console.log("<= manyTextures extendGUI");
}

rand(min:number, max?: number) 
{
  if (max === undefined) {
      max = min;
      min = 0;
  }
  return min + Math.random() * (max - min);
}

drawCircle2D(  time: number) 
 // Update the dynamic texture canvas.
 // Draw a circle with radius varying with time
{
  if (this.ctx2D!=null)
  {
   this.ctx2D.fillStyle = "#00f";
   this.ctx2D.strokeStyle = "#ff0";
   this.ctx2D.lineWidth = 10; // changed to number in current version !
   this.ctx2D.fillRect(0, 0,  this.ctx2D.canvas.width,  this.ctx2D.canvas.height);
   this.ctx2D.beginPath();
   this.ctx2D.arc( this.ctx2D.canvas.width / 2,  this.ctx2D.canvas.height / 2,  this.ctx2D.canvas.width / 2.2 * Math.abs(Math.cos(time)), 0, Math.PI * 2);
   this.ctx2D.stroke();
  }
}

public    CreateAllTextures(gl: WebGLRenderingContext, ctx: CanvasRenderingContext2D, cubemapCtx: CanvasRenderingContext2D, 
  cubeFaceCvs: HTMLCanvasElement[] | null, cb: twgl.TexturesReadyCallback | undefined): {[key: string]: WebGLTexture} | null
{
  var posxname = require("./../resources/images/yokohama/small/posx.jpg")
  var negxname = require("./../resources/images/yokohama/small/negx.jpg")
  var posyname = require("./../resources/images/yokohama/small/posy.jpg")
  var negyname = require("./../resources/images/yokohama/small/negy.jpg")
  var poszname = require("./../resources/images/yokohama/small/posz.jpg")
  var negzname = require("./../resources/images/yokohama/small/negz.jpg")
  var clovername = require("./../resources/images/clover.jpg")
  var hfticon16name =  require("./../resources/images/hft-icon-16.png")
  var goldengatename =  require("./../resources/images/goldengate.jpg")
 

  var textures = twgl.createTextures(gl, {
  // a power of 2 image
  hftIcon: { src: hfticon16name, mag: gl.NEAREST },
  // a non-power of 2 image
  clover: { src: clovername },
  // From a canvas
  fromCanvas: { src: ctx.canvas },
  // A cubemap from 6 images

  yokohama:  {
    target: gl.TEXTURE_CUBE_MAP,
    src: [
      posxname,
      negxname,
      posyname,
      negyname,
      poszname,
      negzname,
    ],
  
  }, 

  // A cubemap from 1 image (can be 1x6, 2x3, 3x2, 6x1)
  // twgl-full.js:1973 WebGL: INVALID_OPERATION: bindTexture: textures can not be used with multiple targets
  goldengate:  {
    target: gl.TEXTURE_CUBE_MAP,
    src: goldengatename,
  },  

  // A 2x2 pixel texture from a JavaScript array
  checker: {
    mag: gl.NEAREST,
    min: gl.LINEAR,
    src: [
      255, 255, 255, 255,
      192, 192, 192, 255,
      92, 92, 92, 255,
      255, 255, 255, 255,
    ],
  },
  // a 1x8 pixel texture from a typed array.
  stripe:  {
    mag: gl.NEAREST,
    min: gl.LINEAR,
    format: gl.LUMINANCE,
    src: new Uint8Array([
      255,
      128,
      255,
      128,
      255,
      128,
      255,
      128,
    ]),
    width: 1,
  }, 
 
  // a cubemap from array
  cubemapFromArray: {
    target: gl.TEXTURE_CUBE_MAP,
    format: gl.RGBA,
    src: [
      0xF0, 0x80, 0x80, 0xFF,
      0x80, 0xE0, 0x80, 0xFF,
      0x80, 0x80, 0xD0, 0xFF,
      0xC0, 0x80, 0x80, 0xFF,
      0x80, 0xB0, 0x80, 0xFF,
      0x8F, 0x80, 0x00, 0xFF,
    ],
  }, 
  cubemapFromCanvas: { target: gl.TEXTURE_CUBE_MAP, src: cubemapCtx?.canvas }, 
  //cubemapFrom6Canvases:  { target: gl.TEXTURE_CUBE_MAP, src: cubemapCtx?.canvas }, 
  cubemapFrom6Canvases: { target: gl.TEXTURE_CUBE_MAP, src: cubeFaceCvs! }, // "twgl-full.js:5068 Uncaught unsupported src type" */
  }, cb); 
  return textures;
}

//=====================================================================================================================
//sceneReadyCallback: (a:any)=>void = this.defaultCallback;

public resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }  

public Prepare(gl: WebGL2RenderingContext, sceneReadyCallback: (a:any)=>void | undefined)
{
   // this.sceneReadyCallback = sceneReadyCallback;
    twgl.setDefaults({attribPrefix: "a_"});
  
    const shapes = [
        twgl.primitives.createSphereBufferInfo(gl, 1, 24, 12),
        twgl.primitives.createCubeBufferInfo(gl, 2),
        twgl.primitives.createPlaneBufferInfo(gl, 2, 2),
        twgl.primitives.createTruncatedConeBufferInfo(gl, 1, 0, 2, 24, 1),
      ];

    // A circle on a canvas
    this.ctx2D  = document.createElement("canvas").getContext("2d"); 
    if (this.ctx2D)
    {
        this.ctx2D.canvas.width  = 64;
        this.ctx2D.canvas.height = 64;
        this.drawCircle2D(0);
    }
  
    // A cubemap drawn to a canvas with a circle on each face.
    const cubemapCtx = document.createElement("canvas").getContext("2d");
    const size = 40;
    if (cubemapCtx)
    {
     cubemapCtx.canvas.width  = size * 6;
     cubemapCtx.canvas.height = size;
     cubemapCtx.fillStyle = "#888";
     for (let ff = 0; ff < 6; ++ff) {
      const color = chroma.hsv((this.baseHue + ff * 10) % 360, 1 - ff / 6, 1);
      cubemapCtx.fillStyle = color.darken().hex();
      cubemapCtx.fillRect(size * ff, 0, size, size);
      cubemapCtx.save();
      cubemapCtx.translate(size * (ff + 0.5), size * 0.5);
      cubemapCtx.beginPath();
      cubemapCtx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      cubemapCtx.fillStyle = color.hex();
      cubemapCtx.fill();
      cubemapCtx.restore();
      
     }
    }
   
    var cubeFaceCanvases : HTMLCanvasElement[] = new Array<HTMLCanvasElement>();
    // make 6 canvases to show loading from 6 element
    for (let ff = 0; ff < 6; ++ff) {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      const color = chroma.hsv((this.baseHue + ff * 10) % 360, 1 - ff / 6, 1);
      if (ctx!=null)
      {
        ctx.fillStyle = color.darken().hex();
        ctx.fillRect(0, 0, 128, 128);
        ctx.translate(64, 64);
        ctx.rotate(Math.PI * .05);
        ctx.fillStyle = color.hex();
        ctx.fillRect(-40, -40, 80, 80); 
        cubeFaceCanvases.push(canvas);
      }
    }    
    if (gl && this.ctx2D && cubemapCtx) 
    {
      this.textures = this.CreateAllTextures(gl, this.ctx2D!, cubemapCtx, cubeFaceCanvases, //this.texturesReadyCallback);   
      (err: any, textures: {
        [key: string]: WebGLTexture;
      }, sources: {
        [key: string]: any;
      }) => {
          console.log("All textures created. scenesize="+this.scenesize); 
         
    

        if (this.textures != null && this.textures != undefined)
        {

          // This is soley to make it easy to pick textures at random
          const twoDTextures = [
            this.textures.checker,
            this.textures.stripe,
            this.textures.hftIcon,
            this.textures.clover,
            this.textures.fromCanvas,
          ];

          const cubeTextures = [
            this.textures.yokohama,
            this.textures.goldengate,
            this.textures.cubemapFromCanvas,
            this.textures.cubemapFrom6Canvases,
            this.textures.cubemapFromArray,
          ];

          for (let ii = 0; ii < this.numObjects; ++ii) {
            let uniforms: Tuniforms;
            let programInfo;
            let shape;
            const renderType = this.rand(0, 2) | 0;
            switch (renderType) {
            case 0:  // checker
              shape = shapes[ii % shapes.length];
              programInfo = this.twglprograminfo![1];
              uniforms = {
                u_diffuseMult: chroma.hsv((this.baseHue + this.rand(0, 60)) % 360, 0.4, 0.8).gl(),
                u_diffuse: twoDTextures[this.rand(0, twoDTextures.length) | 0],
                u_viewInverse: m4.identity(),// this.camera,
                u_world: m4.identity(),
                u_worldInverseTranspose: m4.identity(),
                u_worldViewProjection: m4.identity(),
              };
              break;
            case 1:  // yokohama
              shape = this.rand(0, 2) < 1 ? shapes[1] : shapes[3];
              programInfo = this.twglprograminfo![2];
              uniforms = {
                u_texture: cubeTextures[this.rand(0, cubeTextures.length) | 0],
                u_viewInverse:m4.identity(), // this.camera,
                u_world: m4.identity(),
                u_worldInverseTranspose: m4.identity(),
                u_worldViewProjection: m4.identity(),
              };
              break;
              default: throw "wAT!";
              }   
              this.drawItems.push( new Tdrawitem({ // Tdrawobject
                programInfo: programInfo,
                bufferInfo: shape,
                uniforms: uniforms
                },
                { // Tobject
                  translation: [this.rand(-this.spreadRadius, this.spreadRadius), this.rand(-this.spreadRadius, this.spreadRadius), this.rand(-this.spreadRadius, this.spreadRadius)],
                  ySpeed: this.rand(1, 3),
                  zSpeed: this.rand(1, 3),
                  uniforms: uniforms,
                } 
                ));

            } // for
          } // if textures!=null 
          sceneReadyCallback(0);
      }); // read callback for textures
      console.log("<= createAllTextures");
    } // return in main thread (earlier)
  }
    
  public initScene(gl: WebGL2RenderingContext, cap:TAnimation1Parameters,dictpar:Map<string,string>,  p: twgl.ProgramInfo, sceneReadyCallback: (a:any)=>void | undefined)
    { 
      this.Prepare(gl, sceneReadyCallback);
    }


  public drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number) 
  { 
  //  this.cameraPosition = (this.animationParameters?.b.move)? [Math.cos(time * 0.04 * this.animationParameters.b.speed) * 4.0, 0, 
  //    Math.sin(time * 0.04 * this.animationParameters.b.speed) * 4.0] : [4.0,0.0,0.0];
  //  if (!this.animationParameters?.b.move)
  //    this.cameraPosition = cam?.Position() as [number,number,number]; // [cam?.Position()[0]!,cam?.Position()[1]!,cam?.Position()[2]!];

  

        // update the dynamic texture canvas (shrink and grow circle)
        if (this.animationParameters!.movetail) this.drawCircle2D( time * 0.01); else this.drawCircle2D( 1.0);
        twgl.setTextureFromElement(gl, this.textures!.fromCanvas, this.ctx2D!.canvas);
    
        // use Identity world
        var world1 = m4.identity();
       
        // rotate the objects local worlds
        this.drawItems.forEach((obj) => {
           const uni = obj.obj.uniforms;
           const world = m4.identity(); // local worlds turn
           m4.translate(world, obj.obj.translation, world);
           if (this.animationParameters!=null)
           if (this.animationParameters.b.move)
           {
             m4.rotateY(world,this.animationParameters.b.speed* time * 0.05 * obj.obj.ySpeed, world);
             m4.rotateZ(world, this.animationParameters.b.speed*time * 0.05 * obj.obj.zSpeed, world);
           }
           uni.u_world= world; // this object's world     
           uni.u_worldInverseTranspose = m4.transpose(m4.inverse(world1)); 
           m4.multiply(cam.viewProjection, world, uni.u_worldViewProjection);  // this object's matrix
        });
    
        // let twgl draw each drawObject
        twgl.drawObjectList(gl, Tdrawitem.getTwglDrawObjects( this.drawItems));    
  }
}