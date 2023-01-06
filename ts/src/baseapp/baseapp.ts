
import * as twgl from "twgl.js";          // Greg's work, this twglbaseapp provides all tools like programInfo
import { m4, v3 }  from "twgl.js";    // Greg's work, this baseapp  only imports geometry matrix/vector tools

import * as mtls from "./mouselistener";  
import  * as datgui from "dat.gui";


export type TbaseappParameters = {
    color0: string;
    move: boolean,
    speed: number
}

export var instance: BaseApp|null=null;

export class BaseApp
{    
    baseappParameters: TbaseappParameters = {
        move: false,
        speed: 0.04,
        color0: "#00A000"
      };  

    public gl: WebGL2RenderingContext|null=null;
    public app:mtls.MouseListener|null=null;

    // programs
    protected twglprograminfo: twgl.ProgramInfo[]|null=null;  // there can be several
    protected dictpars:Map<string,string>|undefined;

    // environment skybox camera
    public cameraTarget= [0,0,0];
    public cameraPosition: number[]= [4,0,0];

    public doShowBackgroundColorChoice: boolean = false;

    // environment skybox
    private skyboxLocation: WebGLUniformLocation | undefined;
    private viewDirectionProjectionInverseLocation: WebGLUniformLocation | undefined;
    private positionBuffer: WebGLBuffer|undefined;       // environment map geometry (quad in case of twgl)
    private positionAttributeLocation: number|undefined; // environment map geometry structure
   
    private environmentBufferInfo:twgl.BufferInfo | undefined; // environment texture
    private vaoEnvironment: WebGLVertexArrayObject | undefined; // environment map vao buffer 
    
    
    protected constructor(cgl: WebGL2RenderingContext | undefined | null, capp: mtls.MouseListener | undefined , dictpar:Map<string,string>, divname: string)
    {
        instance = this;
        document.getElementById('cdiv')!.innerHTML = "finding webgl2...";
        var isWebGL2 = !!cgl;  
        if (!isWebGL2)
        {
            document.getElementById('cdiv')!.innerHTML = "no webgl2";
        }  
        else // prepare skybox shaders
        {
            this.gl=cgl!;  
            this.app=capp!;  
            this.dictpars = dictpar;
            this.twglprograminfo = new Array(1);
            this.twglprograminfo![0] = twgl.createProgramInfo(cgl!,[this.vsEnvironmentMap,this.fsEnvironmentMap]);         
            document.getElementById('cdiv')!.innerHTML = "cdiv environment shaders initialized";    
            this.skyboxLocation = cgl!.getUniformLocation(this.twglprograminfo![0].program, "u_skybox")!;
            this.viewDirectionProjectionInverseLocation = cgl!.getUniformLocation(this.twglprograminfo![0].program, "u_viewDirectionProjectionInverse")!;
            document.getElementById('cdiv')!.innerHTML = "BaseApp: skybox perspective prepared";           
        }
    }
   
    onChangeColorValue(value? : any)
    {
        var thisinstance = instance!;
        if (thisinstance.gl!=null)
        {
            var cc = (thisinstance.gl!.canvas as HTMLCanvasElement).parentNode;
            var ccd= (cc as HTMLDivElement);
            ccd.style.backgroundColor =  value;        
        }
    }

    public createGUI(parameters:  {color0: string, move: boolean, speed: number}, instanceParameters: {}): datgui.GUI
    {
   //     console.log("=> baseApp initGUI "+parameters);
        this.baseappParameters= parameters ;
        var cc = (this.gl!.canvas  as HTMLCanvasElement).parentNode;
        var ccd= (cc as HTMLDivElement);
        ccd.style.backgroundColor =  this.baseappParameters.color0;
    
        // park the dat.gui box in the linksdiv below the links, in closed state
        var gui = new datgui.GUI( { autoPlace: false } );
        gui.domElement.id = 'gui_drawimagespace';
        document.getElementById("linksdiv")!.append( gui.domElement);
        gui.close();

        // connect viewmodel
        gui.remember(parameters, instanceParameters);
     
        // Checkbox forward move animation on/off
        gui.add(parameters, 'move');
        
        // Slider for animation speed
        gui.add(parameters, 'speed').min(0.002).max(0.06).step(0.001);
        
        // Color dialog sets background color
        if (this.doShowBackgroundColorChoice)
        {
            var cel3 = gui.addColor(parameters, 'color0');
            cel3.onChange( this.onChangeColorValue);
        }
   //     console.log("<= baseApp initGUI");
        return gui;
    }

    //======================================================================================================

     
    defaultTextureReadyCallback(err: any, texture: WebGLTexture, source: twgl.TextureSrc): void
    { 
      console.log("Environment textureA isready.");
    }

    straightTextureCallback(err: any, texture: WebGLTexture)
    {
      console.log("Environment textureB isready.");
    }
      
    public compileandconnectshaders(gl: WebGL2RenderingContext, program: WebGLProgram, vs: string, fs: string, reportdiv: string)
    {
        var serr:string="";

            var vsshader = gl.createShader( gl.VERTEX_SHADER);
            if (vsshader!=null)
            {
                gl.shaderSource(vsshader, vs);
                gl.compileShader(vsshader);
            } else serr+= "vertex shader create issue";
            var fshader = gl.createShader( gl.FRAGMENT_SHADER);
            if (fshader!=null)
            {
                gl.shaderSource(fshader, fs);
                gl.compileShader(fshader);
                
            } else serr+= "fragment shader create issue";
            if(serr.length>0) document.getElementById(reportdiv)!.innerHTML = serr;
            else
                {          
                    serr="";                             
                    gl.attachShader(program, vsshader!);
                    gl.deleteShader(vsshader!);
                    gl.attachShader(program, fshader!);
                    gl.deleteShader(fshader!);
                    gl.linkProgram(program);
                    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                        serr+=(`Link failed: ${gl.getProgramInfoLog(program)}`);
                        var logvertexshader = gl.getShaderInfoLog(vsshader!);
                        if (logvertexshader) serr+=(`${logvertexshader}`);
                        var logfragmentshader = gl.getShaderInfoLog(fshader!);
                        if (logfragmentshader) serr+=(`${logfragmentshader}`);
                        var re = /(\r\n|\r|\n)/gi; 
                        var str = serr.replace(re, "<br>"); 
                        document.getElementById(reportdiv)!.innerHTML ="shader issue.."+"<br>"+str;
                    } else
                    {                          
                        return true;
                    }
                    }
    }

    //--- used in skybox and skyboxcube to initialize a cubemap texture from 6 images -----------------------------------------

    public vsEnvironmentMap = `#version 300 es
        in vec4 a_position;
        out vec4 v_position;
        void main() {
        v_position = a_position;
        gl_Position = vec4(a_position.xy, 1, 1);
        }
        `;

    public fsEnvironmentMap = `#version 300 es
        precision highp float;

        uniform samplerCube u_skybox;
        uniform mat4 u_viewDirectionProjectionInverse;

        in vec4 v_position;

        // we need to declare an output for the fragment shader
        out vec4 outColor;

        void main() {
        vec4 t = u_viewDirectionProjectionInverse * v_position;
        // outColor = vec4(0,0,0,0);
        outColor = texture(u_skybox, normalize(t.xyz / t.w));
        }
        `;

        
      
    protected createEnvironmentMapGeo(gl: WebGL2RenderingContext)
    {
        // Create a vertex array object (attribute state) and make it the one we're currently working with
        this.vaoEnvironment = gl.createVertexArray()!;
        gl.bindVertexArray(this.vaoEnvironment);
       
        this.positionAttributeLocation = gl.getAttribLocation(this.twglprograminfo![0].program, "a_position");
      
        // Create a buffer for positions
        this.positionBuffer = gl.createBuffer()!;
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        // Put the positions in the buffer
        var positions = new Float32Array(
            [
               1, -1,   -1,-1, -1, 1, // triangle SW-SE-NW
               1, -1,   -1, 1, 1, 1, // triangle NW-SE-NE
            ]);
        
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
     

       this.restorePosAttributeContext(gl, this.positionBuffer, this.positionAttributeLocation, 2);
   
    }

    protected createEnvironmentMapTexture(gl: WebGL2RenderingContext, scene: number, textureReadyCallback: (a:any, t:WebGLTexture)=>void | undefined ): WebGLTexture|null
    {        
        var mytexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, mytexture);
        var pos_x_name="",pos_y_name="",pos_z_name = "";
        var neg_x_name="",neg_y_name="",neg_z_name = "";
        var p=scene;
        switch (p) {
            case 0: {
                pos_x_name= require("./../resources/images/chmuseum/pos-x.jpg");
                pos_y_name= require("./../resources/images/chmuseum/pos-y.jpg");
                pos_z_name= require("./../resources/images/chmuseum/pos-z.jpg");
                neg_x_name= require("./../resources/images/chmuseum/neg-x.jpg");
                neg_y_name= require("./../resources/images/chmuseum/neg-y.jpg");
                neg_z_name= require("./../resources/images/chmuseum/neg-z.jpg");
                break;
            }
            case 1: {
                pos_x_name= require("./../resources/images/yokohama/posx.jpg");
                pos_y_name= require("./../resources/images/yokohama/posy.jpg");
                pos_z_name= require("./../resources/images/yokohama/posz.jpg");
                neg_x_name= require("./../resources/images/yokohama/negx.jpg");
                neg_y_name= require("./../resources/images/yokohama/negy.jpg");
                neg_z_name= require("./../resources/images/yokohama/negz.jpg");
                break;
            }
            case 2: {
                pos_x_name= require("./../resources/images/gamlastan/posx.jpg");
                pos_y_name= require("./../resources/images/gamlastan/posy.jpg");
                pos_z_name= require("./../resources/images/gamlastan/posz.jpg");
                neg_x_name= require("./../resources/images/gamlastan/negx.jpg");
                neg_y_name= require("./../resources/images/gamlastan/negy.jpg");
                neg_z_name= require("./../resources/images/gamlastan/negz.jpg");
                break;
            }
        }
        const faceInfos = [
            {target: gl.TEXTURE_CUBE_MAP_POSITIVE_X,url: pos_x_name,},
            {target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X,url: neg_x_name,},
            {target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y,url: pos_y_name,},
            {target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,url: neg_y_name,},
            {target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z,url: pos_z_name,},
            {target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,url: neg_z_name,},
        ];
        var nImage = 0;
        faceInfos.forEach((faceInfo) => {
            const {target, url} = faceInfo;
        
            // Upload the canvas to the cubemap face.
            const level = 0;
            const internalFormat = gl.RGBA;
            const width = 256;
            const height = 256;
            const format = gl.RGBA;
            const type = gl.UNSIGNED_BYTE;
        
            // setup each face so it's immediately renderable
            gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
        
            // Asynchronously load an image
            const image = new Image();
            if ((new URL(url, window.location.href)).origin !== window.location.origin) {
                image.crossOrigin = "";
                }
         
           // this.requestCORSIfNotSameOrigin(image, url)
            image.src = url;
            image.addEventListener('load', () => {
                        //gl.useProgram(this.program![0]);
                        // Now that the image has loaded make copy it to the texture.
                        gl.bindTexture(gl.TEXTURE_CUBE_MAP, mytexture);
                        gl.texImage2D(target, level, internalFormat, format, type, image);
                        // lx note: this is too early! console yields a warning..  
                        // gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                        console.log("nImage="+nImage+"/"+faceInfos.length+" loaded: "+image.src);
                        // instead.. initialize mipmap when all face textures are read
                        if (++nImage==faceInfos.length)
                        {
                            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);      
                            if (textureReadyCallback != undefined)    
                            {
                                textureReadyCallback(0, mytexture!);
                            } 
                        }
                    });
        });
      //!  this.texture= mytexture!;
        return mytexture;
    }

    /*
    private requestCORSIfNotSameOrigin(img: HTMLImageElement, url: string) {
        if ((new URL(url, window.location.href)).origin !== window.location.origin) {
        img.crossOrigin = "";
        }
    }
    */
/*
    public computeprojectionmatrices(gl: WebGL2RenderingContext, fov:number): m4.Mat4
    // env map
    {
        // Build a projection matrix.
        var aspect = (gl.canvas as HTMLCanvasElement).clientWidth / (gl.canvas as HTMLCanvasElement).clientHeight;
        this.projectionMatrix = m4.perspective(fov, aspect, 1, 2000);
      
        // Build a view matrix.
        var up = [0, 1, 0];
        var cameraMatrix = m4.lookAt(this.cameraPosition, this.cameraTarget, up);
        this.viewMatrix = m4.inverse(cameraMatrix);
       
        // viewDirectionMatrix is viewMatrix without translation (direction only)
        this.viewDirectionMatrix = m4.copy(this.viewMatrix);
        this.viewDirectionMatrix[12] = 0;
        this.viewDirectionMatrix[13] = 0;
        this.viewDirectionMatrix[14] = 0;
        //
        this.viewDirectionProjectionMatrix =  m4.multiply( this.projectionMatrix!, this.viewDirectionMatrix!);

        return this.viewDirectionProjectionMatrix;
        //
    }
*/
    public computeprojectionmatrices(gl: WebGL2RenderingContext, fov:number): m4.Mat4
    // env map
    {
        // Build a projection matrix.
        var aspect = (gl.canvas as HTMLCanvasElement).clientWidth / (gl.canvas as HTMLCanvasElement).clientHeight;
        var projectionMatrix = m4.perspective(fov, aspect, 1, 2000);
      
        // Build a view matrix.
        var up = [0, 1, 0];
        var cameraMatrix = m4.lookAt(this.cameraPosition, this.cameraTarget, up);
        var viewMatrix = m4.inverse(cameraMatrix);
       
        // viewDirectionMatrix is viewMatrix without translation (direction only)
        var viewDirectionMatrix = m4.copy(viewMatrix);
        viewDirectionMatrix[12] = 0;
        viewDirectionMatrix[13] = 0;
        viewDirectionMatrix[14] = 0;
        //
        var viewDirectionProjectionMatrix =  m4.multiply( projectionMatrix!, viewDirectionMatrix!);

        return viewDirectionProjectionMatrix;
        //
    }

    public restorePosAttributeContext(gl: WebGL2RenderingContext, posBuffer: WebGLBuffer, posAttributeLocation: number, size: number)
    {
      // ==> 2023-03-01 restore this part to solve the clear error
        // 1. Bind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        // 2. Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = size;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(posAttributeLocation, size, type, normalize, stride, offset);
        // 3. Enable this
        gl.enableVertexAttribArray(posAttributeLocation);
        // <==
    }
 
    public renderenvironmentmap(gl: WebGL2RenderingContext, fov:number,   texture: WebGLTexture)
    {         
        var invproj = this.viewDirectionProjectionInverseLocation!;
        var loc = this.skyboxLocation!;
        gl.bindVertexArray(this.vaoEnvironment!);
        this.restorePosAttributeContext(gl, this.positionBuffer!, this.positionAttributeLocation!, 2); 
  
        gl.bindTexture(gl.TEXTURE_CUBE_MAP,texture);
        var viewDirectionProjectionMatrix = this.computeprojectionmatrices(gl,   fov);
        var viewDirectionProjectionInverseMatrix = m4.inverse(viewDirectionProjectionMatrix!);
        gl.uniformMatrix4fv(invproj, false, viewDirectionProjectionInverseMatrix);
        gl.uniform1i(loc, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 1 * 6);
        //gl.bindVertexArray(null);
    }
    
    protected createEnvironmentMapGeoTwgl(gl: WebGL2RenderingContext)
    {
      this.environmentBufferInfo = twgl.primitives.createXYQuadBufferInfo(gl,300); 
      this.vaoEnvironment = twgl.createVAOFromBufferInfo(gl,this.twglprograminfo![0], this.environmentBufferInfo)!;
      gl.bindVertexArray(this.vaoEnvironment);
    }
 
    public renderenvironmentmapTwgl(gl: WebGL2RenderingContext, fov:number, texture: WebGLTexture)
    {
        
        var viewDirectionProjectionInverseMatrix = twgl.m4.inverse(this.computeprojectionmatrices(gl, fov));
      
        // Rotate the cube around the x axis
     //   if (this.skyboxCubeParameters.movecube)
     //     this.worldMatrix = twgl.m4.axisRotation( [1,0,0] as twgl.v3.Vec3 , mstime * this.skyboxCubeParameters.angVelocityCube);
     //   else 
     //     this.worldMatrix = twgl.m4.translation([0,0,0]); // twgl.m4.identity();

        // draw the environment
   //     gl.useProgram(this.twglprograminfo![0].program);
        
        gl.bindVertexArray(this.vaoEnvironment!);
      //  this.restoreContext(gl,this.positionBuffer!,this.positionAttributeLocation!, 2);
        twgl.setUniforms( this.twglprograminfo![0], { 
          u_viewDirectionProjectionInverse: viewDirectionProjectionInverseMatrix,
          u_skybox: texture,
        });
        twgl.drawBufferInfo(gl, this.environmentBufferInfo!);  
        gl.flush();
    }

}
