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
      -9999, //  0.02,
      0.10, //   influence range
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
    currentTexture: string | undefined;

    rendermode_points = 0;
    rendermode_triangles = 1;

    scenesize = 500;
    sceneenv = 1;
    animationParameters: TAnimation1Parameters | undefined;
    public resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }  
    public defaultCamera(gl: WebGL2RenderingContext, cam: camhandler.Camera) { }
    
    private twglprograminfo: twgl.ProgramInfo;

    dirty: boolean = false;
    nbFrames: number = 0;
    lastTime: number= 0;
    a_PositionID: number = 0;
    a_TexCoordID: number = 1;
    vertexbuffer: WebGLBuffer|undefined;
    texcoordbuffer: WebGLBuffer|undefined;

    cloth: cloth.Cloth|undefined;

    readimage: HTMLImageElement | undefined; // texture

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
         // Combobox texture from accepted values
        this.animationParameters!.texture = 'Blue Satin';
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
 
    indicesbuffer: WebGLBuffer | undefined;

    prepare(gl: WebGL2RenderingContext)
    {
        this.rendermode_points = gl.POINTS;
        this.rendermode_triangles = gl.TRIANGLES;
        var canvas = gl.canvas as HTMLCanvasElement;         
        var cs: ClothMouseHandler = new ClothMouseHandler(canvas);
        this.cloth = cs.cloth;
        gl.useProgram(this.twglprograminfo.program);

        this.a_PositionID = gl.getAttribLocation(this.twglprograminfo.program, "a_position");
        this.a_TexCoordID = gl.getAttribLocation(this.twglprograminfo.program, "a_texcoord");
       
        this.texcoordbuffer = gl.createBuffer()!;
     


        this.indicesbuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesbuffer!);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.cloth.indices, gl.STATIC_DRAW);
        this.lastTime = Date.now();
        this.vertexbuffer = gl.createBuffer()!;      
        console.log("<= cloth prepare")
     }

     texture2: WebGLTexture |undefined;
     textureLocation2: WebGLUniformLocation|undefined;

    public initScene(gl: WebGL2RenderingContext, cap:TAnimation1Parameters,cam: camhandler.Camera,  dictpar:Map<string,string>| undefined, textureReadyCallback: undefined | ((a:any)=>void)): void
    {      
        this.prepare(gl);
        //if (textureReadyCallback!=undefined) textureReadyCallback(0);
        // => fill texture2 with clover jpg
        this.texture2 = gl.createTexture()!;
        this.textureLocation2 = gl.getUniformLocation(this.twglprograminfo.program, "u_texture2")!;
        gl.bindTexture(gl.TEXTURE_2D, this.texture2);  
        this.readtexture(gl, textureReadyCallback);
    }

    public drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number): void
    {
        if (this.dirty) { this.prepare(gl); this.dirty=false;}
        
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
            this.cloth!.indices = this.cloth!.cleanIndices();
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
    
        gl.drawElements(this.render_mode!, this.cloth!.indices.length, gl.UNSIGNED_INT, 0);
        gl.flush();        
      }
    

    public readtexture(gl: WebGL2RenderingContext, textureReadyCallback: undefined | ((a:any)=>void))
    {
        var fNameParcel = require('./../resources/images/satin.jpg');
        //this.image = undefined;
        this.readimage = new Image();
        this.readimage.src = fNameParcel;
        this.readimage.onload = () => {
        //  this.image = this.readimage!;
        //  console.log("finished loading clover texture "+this.image.width+","+ this.image.height);
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
