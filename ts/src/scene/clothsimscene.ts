import * as twgl from "twgl.js";    // lib: Greg's work
import * as datgui from "dat.gui"   // lib: fillin form

import * as mtls from "../baseapp/mouselistener";  // connect events for mouse movement, buttons and wheel
import * as camhandler from "../baseapp/camhandler" // camera projection   
import * as scene from "./scene"

import {TAnimation1Parameters} from "../baseapp/baseapp"

import * as cloth from "../cloth/cloth"
import * as clothmousehandler from "../cloth/clothmousehandler";

export class ClothSimScene implements scene.SceneInterface
{
    public static instance: ClothSimScene;
  
    public scenesize = 50;
    public sceneenv = 1;
    public animationParameters: TAnimation1Parameters | undefined;
    
    public cloth: cloth.Cloth | undefined;
    public cs: clothmousehandler.ClothMouseHandler | undefined;
 
    public dictImages:Map<string,{texture2: WebGLTexture, im: HTMLImageElement, state: any}>| undefined

    private twglprograminfo: twgl.ProgramInfo;
    
    private nbFrames: number = 0;
    private lastTime: number= 0;
    private rendermode_points = 0;
    private rendermode_triangles = 4;
    private a_PositionID: number = 0;
    private a_TexCoordID: number = 1;

    public accuracy: number = 5;

    private currentTexture: string | undefined;

    public render_mode: number =0;

    private vertexbuffer: WebGLBuffer|undefined;
    private texcoordbuffer: WebGLBuffer|undefined;
    private indicesbuffer: WebGLBuffer | undefined;
    private activetexture: WebGLTexture |undefined;
    
    public resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }  
    public defaultCamera(gl: WebGL2RenderingContext, cam: camhandler.Camera) { }

    onDictImageReady(cgl: WebGL2RenderingContext,textureName:string, texture2: WebGLTexture, im: HTMLImageElement, state:any)
      {
        var thisinstance = ClothSimScene.instance!; 
        thisinstance.dictImages?.set(textureName,{texture2,im,state})
      }

    constructor(gl: WebGL2RenderingContext, capp: mtls.MouseListener,  dictPar:Map<string,string>
                ) //,  public friction: number, public bounce: number)
      { 
        ClothSimScene.instance = this;
        this.twglprograminfo = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
        if (dictPar!.get("texture")!=undefined) this.currentTexture=decodeURI(dictPar!.get("texture")!); 
      }

    public extendGUI(gui: datgui.GUI)
      {
        gui.add(this.animationParameters!, 'friction',0.9,1.0,0.005);
        gui.add(this.animationParameters!, 'gravity',0.0,0.05,0.001);
        gui.add(this.animationParameters!, 'influence',0.02,0.25,0.005);
        gui.add(this.animationParameters!, 'bounce',0.0,1.0,0.0125);
        this.animationParameters!.speed = 0.0;
        var cel2 = gui.add(this.animationParameters!, 'texture', [ 'None','Blue Satin','Red Square' ] );
        this.animationParameters!.texture = (this.currentTexture == undefined)?"None":this.currentTexture; // (this.render_mode==0)?'None':'Blue Satin';
        this.currentTexture = this.animationParameters!.texture;
        cel2.onChange( this.onChangeTextureCombo);
        gui.updateDisplay();
      }

     onChangeTextureCombo(value? : any)
      {
        var thisinstance = ClothSimScene.instance!;
        thisinstance.currentTexture = value;
        if (thisinstance.currentTexture=="None") thisinstance.render_mode = thisinstance.rendermode_points; else thisinstance.render_mode=thisinstance.rendermode_triangles;
        var cp = new cloth.ClothProducer();
        thisinstance.cloth = cp.cloth;
        thisinstance.cs!.cloth = cp.cloth;
        thisinstance.cloth.dirty = true;
        thisinstance.activetexture = undefined;
      }
   
     public activateTexture(gl: WebGL2RenderingContext, texture2: WebGLTexture, im: HTMLImageElement, textureReadyCallback: undefined | ((a:any)=>void))
      {
        gl.bindTexture(gl.TEXTURE_2D, texture2);  
        var mipLevel = 0;               // the largest mip
        var internalFormat = gl.RGBA;   // format we want in the texture
        var srcFormat = gl.RGBA;        // format of data we are supplying
        var srcType = gl.UNSIGNED_BYTE; // type of data we are supplying
        gl.texImage2D(gl.TEXTURE_2D,mipLevel,internalFormat,srcFormat,srcType,im);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);   
        if (textureReadyCallback!=undefined) textureReadyCallback(texture2);
      }

     public initScene(gl: WebGL2RenderingContext, cap:TAnimation1Parameters,cam: camhandler.Camera,  dictPar:Map<string,string>| undefined, textureReadyCallback: undefined | ((a:any)=>void)): void
      {  
        var canvas = gl.canvas as HTMLCanvasElement;         

        // create the cloth
        this.cs = new clothmousehandler.ClothMouseHandler(canvas);
        this.cloth = this.cs.cloth;

        console.log("initScene set texture: "+this.currentTexture);

        // create textures dictionary map
        this.dictImages = new Map<string,{texture2: WebGLTexture, im: HTMLImageElement, state: number}>();
       // this.currentTexture = this.animationParameters!.texture;
        var texture0 = gl.createTexture()!;
        this.startReadImage(gl, texture0, "None", undefined, this.onDictImageReady);
        var texture1 = gl.createTexture()!;
        this.startReadImage(gl, texture1, "Blue Satin", undefined, this.onDictImageReady);
        var texture2 = gl.createTexture()!;
        this.startReadImage(gl, texture2, "Red Square", undefined, this.onDictImageReady);
        if (this.currentTexture =="None") this.render_mode = this.rendermode_points; else this.render_mode=this.rendermode_triangles;
        this.activetexture=undefined;

        // use program, init buffers
        gl.useProgram(this.twglprograminfo.program);
        
        //index
        this.indicesbuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesbuffer!);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.cloth!.indices, gl.STATIC_DRAW);
        this.lastTime = Date.now();

        // position vertex
        this.a_PositionID = gl.getAttribLocation(this.twglprograminfo.program, "a_position");
        this.vertexbuffer = gl.createBuffer()!;    
        
        // texture coordinates
        this.a_TexCoordID = gl.getAttribLocation(this.twglprograminfo.program, "a_texcoord");      
        this.texcoordbuffer = gl.createBuffer()!;
      
        // matrix
        let modelMatrixID = gl.getUniformLocation(this.twglprograminfo.program, "u_model");
        var m: twgl.m4.Mat4 = twgl.m4.identity();
        m=twgl.m4.scale(m,[1.0,1.0,1.0]);
        m=twgl.m4.translate(m,[0,0,0]);
        gl.uniformMatrix4fv(modelMatrixID, false, m);

        console.log("<= cloth and rendering prepare");

        gl.enableVertexAttribArray(this.a_PositionID);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexbuffer!);
        gl.bufferData(gl.ARRAY_BUFFER, this.cloth!.vertices, gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.a_PositionID, 3, gl.FLOAT, false, 0, 0);
      
        gl.enableVertexAttribArray(this.a_TexCoordID);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordbuffer!);
        gl.vertexAttribPointer(this.a_TexCoordID, 2, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, this.cloth!.texcoords!, gl.STATIC_DRAW);
    
    

        this.rendermode_points = gl.POINTS;
        this.rendermode_triangles = gl.TRIANGLES;
        if (textureReadyCallback!=undefined)textureReadyCallback(0);
      }
    

    public drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number): void
      {     
        this.cs!.mouse.influence = this.animationParameters!.influence;     
        var currentTime = Date.now();    
        this.nbFrames++;
        if ((currentTime - this.lastTime) >= 5000.0) {
            console.log(5000.0 / this.nbFrames + " ms/frame");
            this.nbFrames = 0;
            this.lastTime = currentTime;
        }      
        this.cloth!.update(this.cs!.mouse,0.025, this.accuracy,-this.animationParameters!.gravity,this.animationParameters!.friction,this.animationParameters!.bounce);
      
        // rendering
        gl.useProgram(this.twglprograminfo.program);

        // check read image file. if ready, set texture. Skip render cloth when not ready
        if (this.activetexture==undefined) 
        { 
            if(this.dictImages!.get( this.currentTexture!)!=undefined)
            {
              var b =this.dictImages!.get( this.currentTexture!);
              this.activetexture = b!.texture2; 
              this.activateTexture(gl, b!.texture2, b!.im, undefined); 
              console.log("render sees texture ["+ this.currentTexture+"] ready, activated");
            }
            return;
        }
      
        // At this point, texture is ready and bound, as long as it is not bound elsewhere.
        // Todo: prevent bound texture mismatch when other scenes from taking the texture buffer
        // opt: let basescene.ts maintain some statics to allow optimization!
        gl.bindTexture(gl.TEXTURE_2D, this.activetexture!);

        // When a cloth tear takes place, the index buffer is modified. 
        // Make sure the index buffer data gets updated !
        if (this.cloth!.dirty)
        {
              gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesbuffer!);
              gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.cloth!.indices, gl.STATIC_DRAW);
              this.cloth!.dirty = false;
        } else
              // no change
              gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesbuffer!);
      
        gl.enableVertexAttribArray(this.a_PositionID);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexbuffer!);
        gl.bufferData(gl.ARRAY_BUFFER, this.cloth!.vertices, gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.a_PositionID, 3, gl.FLOAT, false, 0, 0);
      
        gl.enableVertexAttribArray(this.a_TexCoordID);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordbuffer!);
        gl.vertexAttribPointer(this.a_TexCoordID, 2, gl.FLOAT, false, 0, 0);
        // no change 
        // gl.bufferData(gl.ARRAY_BUFFER, this.cloth!.texcoords!, gl.STATIC_DRAW); 
        
        gl.drawElements(this.render_mode!, this.cloth!.indices.length, gl.UNSIGNED_INT, 0);
        gl.flush();        
      }

    //=== READING IMAGES ===========================================================================

    public defaultImageReadyCallback(gl: WebGL2RenderingContext, textureName: string, texture2: WebGLTexture, im: HTMLImageElement, textureReadyCallback: undefined | ((a:any)=>void))
    {
      if (textureReadyCallback == undefined) return;
      this.activateTexture(gl,texture2,im, textureReadyCallback);
    }
    
    public startReadImage(gl: WebGL2RenderingContext, texture2: WebGLTexture, textureName: string, textureReadyCallback: undefined | ((a:any)=>void), 
                    imageReadyCallback: undefined | ((cgl: WebGL2RenderingContext,textureName: string, texture2: WebGLTexture, im: HTMLImageElement, any:any)=>void)):HTMLImageElement
    {  
        var fNameParcel = "";
        if (textureName=="Red Square") fNameParcel = require("./../resources/images/RedSquarePart.jpg");
        if (textureName=="Blue Satin"|| textureName=="None") fNameParcel = require("./../resources/images/satin2.jpg");
        var readimage = new Image();
        readimage.src = fNameParcel;
        readimage.onload = () => {
          if (imageReadyCallback!=undefined) imageReadyCallback(gl,textureName, texture2, readimage, textureReadyCallback);
        }
        return readimage;
    }

    public readBindTexture(gl: WebGL2RenderingContext, textureName: string, textureReadyCallback: undefined | ((a:any)=>void)): WebGLTexture|undefined
    {
      var texture2 = gl.createTexture()!;
      this.startReadImage(gl,texture2,textureName,textureReadyCallback,this.defaultImageReadyCallback);
      return texture2;
    }


    vertexShaderSource = `
    precision mediump float;

    attribute vec3 a_position;
    attribute vec2 a_texcoord;

    uniform mat4 u_view, u_model, u_ortho;

    varying vec3 v_position;
    varying vec2 v_texcoord;

    void main(){    
    mat4 modelview =  u_model;

    //gl_Position =  vec4(a_position, 1.0);
    gl_Position = modelview * vec4(a_position, 1.0);
    //gl_Position = u_ortho * modelview * vec4(a_position,1.0);

    v_texcoord = a_texcoord;

    gl_PointSize = 2.0;
    v_position = gl_Position.xyz/gl_Position.w;

    }
    `; 

    fragmentShaderSource = `
    precision mediump float;

    //uniform vec2 u_resolution;
    //uniform float u_time;

    varying vec3 v_position;
    varying vec2 v_texcoord;

    uniform sampler2D u_texture2;

    void main()
    {
        //gl_FragColor = vec4(0.6, 0.8, 0.4, v_position.y);
     //   gl_FragColor = vec4(0.6, 0.8, 0.4, 1.0);
      //  gl_FragColor = vec4(v_texcoord[0], v_texcoord[1], 0.0, 1.0);
      vec4 cColor =  texture2D(u_texture2, v_texcoord);
      gl_FragColor = vec4(cColor[0],cColor[1],cColor[2],v_position.y+0.5);
    }
    `;
}
