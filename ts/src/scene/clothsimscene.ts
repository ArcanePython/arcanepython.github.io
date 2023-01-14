import * as twgl from "twgl.js";    // Greg's work
//import { m4 } from "twgl.js";
//import { BaseApp } from "../baseapp/baseapp";

import * as cloth from "../cloth/cloth"
//import * as baseapp from "./../baseapp/baseapp"
import * as mtls from "../baseapp/mouselistener";  // connect events for mouse movement, buttons and wheel
import * as camhandler from "../baseapp/camhandler" // camera projection   
import * as datgui from "dat.gui"
import {TAnimation1Parameters} from "../baseapp/baseapp"
import * as scene from "./scene"

class ClothProducer
{
     clothX = 200;
     clothY = 50;
     startX = -0.9;
     startY = 1.0;
     spacing = 1.8 / this.clothX;
     tearDist = this.spacing * 8;
     cloth:cloth.Cloth;

     constructor()
     {
       this.cloth = new cloth.Cloth(this.clothX,this.clothY,this.startX,this.startY,this.tearDist,this.spacing,"c");
     }
}


export class  ClothMouseHandler
{
    public static instance: ClothMouseHandler;

    cloth: cloth.Cloth;

    mouse = new cloth.ClothMouse(
      -9999, //  0.02,
      0.02, //   0.08,
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
    scenesize = 500;
    sceneenv = -1;
    animationParameters: TAnimation1Parameters | undefined;
    public resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }  
    public defaultCamera(gl: WebGL2RenderingContext, cam: camhandler.Camera) { }
    
    private twglprograminfo: twgl.ProgramInfo;

    nbFrames: number = 0;
    lastTime: number= 0;
    a_PositionID: number = 0;
    vertexbuffer: WebGLBuffer|undefined;
    cloth: cloth.Cloth|undefined;

    constructor(gl: WebGL2RenderingContext, capp: mtls.MouseListener,  dictPar:Map<string,string>,
                public render_mode:number, public accuracy: number,  public friction: number, public bounce: number)
    { 
        //super(gl, capp, dictPar, "c");
        console.log("=> ClothSimScene constructor connect shaders")
        this.twglprograminfo = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);

        //gl.useProgram(this.twglprograminfo.program);
        console.log("<= ClothSimScene constructor "+this.twglprograminfo.program);
        
    }

    public extendGUI(gui: datgui.GUI)
    {
        // Slider for sling speed
        // Checkbox forward move animation on/off
     //   console.log("=> cloth extendGUI movetail"+this.animationParameters!);
        gui.add(this.animationParameters!, 'gravity',0.0,0.05,0.001);
        //gui.add(this.animationParameters!, 'sling').min(9).max(120).step(1);
        // Slider for shininess
        //gui.add(this.animationParameters!, 'shininess').min(0).max(20.0).step(0.1);
     //   gui.add(this.animationParameters!, 'fov', 5.0,85.0,1.0 );
        
        gui.updateDisplay();
        console.log("<= ClothSimScene extendGUI")
        //   console.log("<= manyTextures extendGUI");
    }

 
    prepare(gl: WebGL2RenderingContext)
    {
        var canvas = gl.canvas as HTMLCanvasElement;         
        var cs: ClothMouseHandler = new ClothMouseHandler(canvas);
        this.cloth = cs.cloth;
        gl.useProgram(this.twglprograminfo.program);
        this.a_PositionID = gl.getAttribLocation(this.twglprograminfo.program, "a_position");
        var indicesbuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesbuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.cloth.indices, gl.STATIC_DRAW);
        this.lastTime = Date.now();
        this.vertexbuffer = gl.createBuffer()!;      
     }

    public initScene(gl: WebGL2RenderingContext, cap:TAnimation1Parameters,cam: camhandler.Camera,  dictpar:Map<string,string>| undefined, textureReadyCallback: undefined | ((a:any)=>void)): void
    {      
        this.prepare(gl);
        console.log("<= ClothSimScene initScene");
        if (textureReadyCallback!=undefined) textureReadyCallback(0);
 
        //   window.requestAnimationFrame(()=>{this.render();});
    }

    public drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number): void
    {
        //console.log("cloth drawscene");
        gl.useProgram(this.twglprograminfo.program);
        this.cloth!.update(ClothMouseHandler.instance.mouse,0.032, this.accuracy,-this.animationParameters!.gravity,this.friction,this.bounce);
        
        var currentTime = Date.now();    
        this.nbFrames++;
        if ((currentTime - this.lastTime) >= 5000.0) {
            console.log(5000.0 / this.nbFrames + " ms/frame");
            this.nbFrames = 0;
            this.lastTime = currentTime;
        }
        if (this.cloth!.dirty)
        {
       //     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.cloth!.indicesbuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.cloth!.indices, gl.STATIC_DRAW);
     
        }
        gl.enableVertexAttribArray(this.a_PositionID);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexbuffer!);
        gl.bufferData(gl.ARRAY_BUFFER, this.cloth!.vertices, gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.a_PositionID, 3, gl.FLOAT, false, 0, 0);
        gl.drawElements(this.render_mode!, this.cloth!.indices.length, gl.UNSIGNED_INT, 0);
        gl.flush();        
      //  window.requestAnimationFrame(()=>{this.render();});
      }

    vertexShaderSource = `
    precision mediump float;

    attribute vec3 a_position;

    uniform mat4 u_view, u_model, u_ortho;

    varying vec3 v_position;

    void main(){    
   // mat4 modelview =  u_model;

    gl_Position =  vec4(a_position, 1.0);
    //gl_Position = modelview * vec4(a_position, 1.0);
    //gl_Position = u_ortho * modelview * vec4(a_position,1.0);

    gl_PointSize = 2.0;
    v_position = gl_Position.xyz/gl_Position.w;
    }
    `; 

    fragmentShaderSource = `
    precision mediump float;

    //uniform vec2 u_resolution;
    //uniform float u_time;

    varying vec3 v_position;

    void main()
    {
        //gl_FragColor = vec4(0.6, 0.8, 0.4, v_position.y);
     //   gl_FragColor = vec4(0.6, 0.8, 0.4, 1.0);
        gl_FragColor = vec4(0.2, 0.4, 0.2, 1.0);
    }
    `;
}
