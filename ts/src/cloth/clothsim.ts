import * as twgl from "twgl.js";    // Greg's work

import * as cloth from "./cloth"
import * as baseapp from "./../baseapp/baseapp"
import * as mtls from "./../baseapp/mouselistener";  // connect events for mouse movement, buttons and wheel

class ClothProducer
{
     clothX = 200;
     clothY = 50;
     startX = -0.9;
     startY = 1.0;
     spacing = 1.8 / this.clothX;
     tearDist = this.spacing * 6;
     cloth:cloth.Cloth;

     constructor()
     {
       this.cloth = new cloth.Cloth([0,0,0],this.clothX,this.clothY,this.startX,this.startY,this.tearDist,this.spacing,"c");
     }
}


class  ClothMouseHandler
{
    public static instance: ClothMouseHandler;

    cloth: cloth.Cloth;

    mouse = new cloth.ClothMouse(
         0.02,    // mouse.cut
         0.08,    // mouse.influence
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

export class ClothSim extends baseapp.BaseApp
{
    twglprograminfo: twgl.ProgramInfo;
    nbFrames: number = 0;
    lastTime: number= 0;
    a_PositionID: number = 0;
    vertexbuffer: WebGLBuffer|undefined;
    cloth: cloth.Cloth|undefined;

    constructor(gl: WebGL2RenderingContext, capp: mtls.MouseListener,  dictPar:Map<string,string>,
                public render_mode:number, public accuracy: number, public gravity: number, public friction: number, public bounce: number)
    { 
        super(gl, capp, dictPar, "c");
        this.twglprograminfo = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
        gl.useProgram(this.twglprograminfo.program);
    }

    
    indicesbuffer: WebGLBuffer|undefined;

    prepare()
    {
        var gl= this!.gl!;
        var canvas = gl.canvas as HTMLCanvasElement;         
        var cs: ClothMouseHandler = new ClothMouseHandler(canvas);
        this.cloth = cs.cloth;
        this.a_PositionID = gl.getAttribLocation(this.twglprograminfo.program, "a_position");
        this.indicesbuffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesbuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.cloth.indices, gl.STATIC_DRAW);
        this.lastTime = Date.now();
        this.vertexbuffer = gl.createBuffer()!;      
    }

    main()
    {      
        this.prepare();
        window.requestAnimationFrame(()=>{this.render();});
    }

    render() {

        this.cloth!.update(ClothMouseHandler.instance.mouse,0.032, this.accuracy,this.gravity,this.friction,this.bounce);
           var currentTime = Date.now();    
        this.nbFrames++;
        if ((currentTime - this.lastTime) >= 5000.0) {
            console.log(5000.0 / this.nbFrames + " ms/frame");
            this.nbFrames = 0;
            this.lastTime = currentTime;
        }
        var gl = this.gl!;
        if (this.cloth!.dirty)
        {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesbuffer!);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.cloth!.indices, gl.STATIC_DRAW);
     
        }
        gl.enableVertexAttribArray(this.a_PositionID);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexbuffer!);
        gl.bufferData(gl.ARRAY_BUFFER, this.cloth!.vertices, gl.STATIC_DRAW);
        gl.vertexAttribPointer(this.a_PositionID, 3, gl.FLOAT, false, 0, 0);
        gl.drawElements(this.render_mode!, this.cloth!.indices.length, gl.UNSIGNED_INT, 0);
        gl.flush();        
        window.requestAnimationFrame(()=>{this.render();});
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
        gl_FragColor = vec4(0.6, 0.8, 0.4, 1.0);
    }
    `;
}