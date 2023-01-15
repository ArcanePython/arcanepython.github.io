import * as twgl from "twgl.js";    // lib: Greg's work
import * as datgui from "dat.gui"   // lib: fillin form

import * as mtls from "../baseapp/mouselistener";  // connect events for mouse movement, buttons and wheel
import * as camhandler from "../baseapp/camhandler" // camera projection   
import * as scene from "./scene"

import {TAnimation1Parameters} from "../baseapp/baseapp"

import * as cloth from "../cloth/cloth"

class ClothProducer
{
     clothX = 400;
     clothY = 50;
     startX = -0.9;
     startY = 1.0;
     spacing = 1.8 / this.clothX;
     tearDist = 2.0*this.spacing * 8;
     cloth:cloth.Cloth;

     constructor()
     {
       this.cloth = new cloth.Cloth(this.clothX,this.clothY,this.startX,this.startY,this.tearDist,this.spacing,"c");
     }
}

class  ClothMouseHandler
{
    public static instance: ClothMouseHandler;

    cloth: cloth.Cloth;

    mouse = new cloth.ClothMouse(
      -9999, //  no cuts 0.02,
      0.20, //   influence range
         false,
         1,
         0,
         0,
         0,
         0
     );

    setMouse(e: MouseEvent) 
    {
        var athis = ClothMouseHandler.instance;
        var rect = athis.canvas.getBoundingClientRect();
        athis.mouse.px = athis.mouse.x;
        athis.mouse.py = athis.mouse.y;
        athis.mouse.x = (e.x - rect.left) / athis.canvas.width;
        athis.mouse.y = (athis.canvas.height - (e.y - rect.top)) / athis.canvas.height;
        athis.mouse.x = (athis.mouse.x * 2.0) - 1.0;
        athis.mouse.y = (athis.mouse.y * 2.0) - 1.0;
    }
    
    constructor (private canvas: HTMLCanvasElement)
    {
       ClothMouseHandler.instance = this;
       
       var cp = new ClothProducer();
       this.cloth = cp.cloth;
       if(canvas==null||canvas==undefined) console.log("ClothMouseHandler finds unknown canvas");
       else
       {
            canvas.onmousedown = (e) => {
                var athis = ClothMouseHandler.instance;
                athis.mouse.button = e.which;
                athis.mouse.down = true;
                athis.setMouse(e);
            }
            canvas.onmousemove = this.setMouse;
            canvas.onmouseup = () => { var athis = ClothMouseHandler.instance; athis.mouse.down = false; };
            canvas.oncontextmenu = (e) => e.preventDefault();
        }
    }
}

export class ClothSimScene implements scene.SceneInterface
{
    public static instance: ClothSimScene;
  
    public scenesize = 500;
    public sceneenv = 1;
    public animationParameters: TAnimation1Parameters | undefined;
    public resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }  
    public defaultCamera(gl: WebGL2RenderingContext, cam: camhandler.Camera) { }
    
    private twglprograminfo: twgl.ProgramInfo;

    private cs: ClothMouseHandler | undefined;
    private cloth: cloth.Cloth|undefined;

    private rendermode_points = 0;
    private rendermode_triangles = 4;

    private dirty: boolean = false;
    private nbFrames: number = 0;
    private lastTime: number= 0;
    private a_PositionID: number = 0;
    private a_TexCoordID: number = 1;
    private vertexbuffer: WebGLBuffer|undefined;
    private texcoordbuffer: WebGLBuffer|undefined;
    private readimage: HTMLImageElement | undefined; // texture
    private indicesbuffer: WebGLBuffer | undefined;
    private currentTexture: string | undefined;
    private texture2: WebGLTexture |undefined;
  //  private textureLocation2: WebGLUniformLocation|undefined;

    constructor(gl: WebGL2RenderingContext, capp: mtls.MouseListener,  dictPar:Map<string,string>,
                public render_mode:number, public accuracy: number,  public friction: number, public bounce: number)
    { 
        ClothSimScene.instance = this;
        this.twglprograminfo = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
    }

    public extendGUI(gui: datgui.GUI)
    {
        gui.add(this.animationParameters!, 'friction',0.9,1.0,0.005);
        gui.add(this.animationParameters!, 'gravity',0.0,0.05,0.001);
        gui.add(this.animationParameters!, 'influence',0.02,0.25,0.005);
        this.animationParameters!.speed = 0.0;
        this.animationParameters!.friction = this.friction;
        this.animationParameters!.texture = (this.render_mode==0)?'None':'Blue Satin';
        var cel2 = gui.add(this.animationParameters!, 'texture', [ 'None','Blue Satin' ] );
        cel2.onChange( this.onChangeTextureCombo);
        gui.updateDisplay();
        console.log("<= ClothSimScene extendGUI")
     }

     onChangeTextureCombo(value? : any)
      {
        var thisinstance = ClothSimScene.instance!;
        console.log("we are in texture=["+value+"] obj.speed="+ thisinstance.animationParameters!.speed);
        thisinstance.currentTexture = value;
        if (thisinstance.currentTexture=="None") thisinstance.render_mode = thisinstance.rendermode_points; else thisinstance.render_mode=thisinstance.rendermode_triangles;
        console.log("set currentTexture to ["+value+"]");
        var cp = new ClothProducer();
        thisinstance.cloth = cp.cloth;
        thisinstance.dirty = true;
      }
 
   
    prepare(gl: WebGL2RenderingContext)
    {
         gl.useProgram(this.twglprograminfo.program);
        
        this.indicesbuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesbuffer!);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.cloth!.indices, gl.STATIC_DRAW);
        this.lastTime = Date.now();

        this.a_PositionID = gl.getAttribLocation(this.twglprograminfo.program, "a_position");
        this.vertexbuffer = gl.createBuffer()!;    
        
        this.a_TexCoordID = gl.getAttribLocation(this.twglprograminfo.program, "a_texcoord");      
        this.texcoordbuffer = gl.createBuffer()!;
      
      //  this.textureLocation2 = gl.getUniformLocation(this.twglprograminfo.program, "u_texture2")!;
    
        this.rendermode_points = gl.POINTS;
        this.rendermode_triangles = gl.TRIANGLES;
        console.log("<= cloth and rendering prepare")
     }

    public initScene(gl: WebGL2RenderingContext, cap:TAnimation1Parameters,cam: camhandler.Camera,  dictpar:Map<string,string>| undefined, textureReadyCallback: undefined | ((a:any)=>void)): void
    {  
        var canvas = gl.canvas as HTMLCanvasElement;         
        this.cs = new ClothMouseHandler(canvas);
        this.cloth = this.cs.cloth;
         
        this.prepare(gl);
        this.readtexture(gl, textureReadyCallback);
    }

    public drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number): void
    {     
        if (this.dirty) { this.prepare(gl); this.dirty=false;}
        this.cs!.mouse.influence = this.animationParameters!.influence;
        
        gl.useProgram(this.twglprograminfo.program);
        this.cloth!.update(ClothMouseHandler.instance.mouse,0.032, this.accuracy,-this.animationParameters!.gravity,this.animationParameters!.friction,this.bounce);
        
        var currentTime = Date.now();    
        this.nbFrames++;
        if ((currentTime - this.lastTime) >= 5000.0) {
            console.log(5000.0 / this.nbFrames + " ms/frame");
            this.nbFrames = 0;
            this.lastTime = currentTime;
        }
        if (this.cloth!.dirty)
        {
            console.log("cleanup indices");
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesbuffer!);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.cloth!.indices, gl.STATIC_DRAW);
            this.cloth!.dirty = false;
         }
        gl.enableVertexAttribArray(this.a_PositionID);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexbuffer!);
        gl.bufferData(gl.ARRAY_BUFFER, this.cloth!.vertices, gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.a_PositionID, 3, gl.FLOAT, false, 0, 0);
      
        gl.enableVertexAttribArray(this.a_TexCoordID);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordbuffer!);
        gl.vertexAttribPointer(this.a_TexCoordID, 2, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, this.cloth!.texcoords!, gl.STATIC_DRAW);
    
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesbuffer!);
    
        gl.drawElements(this.render_mode!, this.cloth!.indices.length, gl.UNSIGNED_INT, 0);
        gl.flush();        
      }
    

    public readtexture(gl: WebGL2RenderingContext, textureReadyCallback: undefined | ((a:any)=>void))
    {
        this.texture2 = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, this.texture2);  
        var fNameParcel = require('./../resources/images/satin.jpg');
        this.readimage = new Image();
        this.readimage.src = fNameParcel;
        this.readimage.onload = () => {
          var mipLevel = 0;               // the largest mip
          var internalFormat = gl.RGBA;   // format we want in the texture
          var srcFormat = gl.RGBA;        // format of data we are supplying
          var srcType = gl.UNSIGNED_BYTE; // type of data we are supplying
          gl.texImage2D(gl.TEXTURE_2D,
                    mipLevel,
                    internalFormat,
                    srcFormat,
                    srcType,
                    this.readimage!);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);    
          console.log("<- clothsim satin texture read");
          textureReadyCallback!(0);   
        };
    }


    vertexShaderSource = `
    precision mediump float;

    attribute vec3 a_position;
    attribute vec2 a_texcoord;

    uniform mat4 u_view, u_model, u_ortho;

    varying vec3 v_position;
    varying vec2 v_texcoord;

    void main(){    
   // mat4 modelview =  u_model;

    gl_Position =  vec4(a_position, 1.0);
    //gl_Position = modelview * vec4(a_position, 1.0);
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
