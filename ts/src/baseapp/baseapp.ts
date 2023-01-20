
import * as twgl from "twgl.js";          // Greg's work, this twglbaseapp provides all tools like programInfo
import { m4, v3 }  from "twgl.js";    // Greg's work, this baseapp  only imports geometry matrix/vector tools

import * as mtls from "./mouselistener";  
import  * as datgui from "dat.gui";

export type TAnimation1Parameters =
{
    movetail: boolean,
    sling: number,
    shininess: number,
    typelight: string;
    texture: string;
    fov:number;
    color0: string;
    move: boolean,
    speed: number,
    gravity: number,
    friction: number,
    bounce: number,
    influence: number,
    usecamera: boolean;     
    camheight: number;     
}

export var instance: BaseApp|null=null;

export class BaseApp
{       
    protected DefaultParameters: TAnimation1Parameters =  { usecamera:true, camheight:0.0, influence:0.05, friction:0.97, bounce:0.5, move: true, speed: 0.01, color0:"#A0A0A0", gravity:0.02, 
                                                            texture: 'geotriangle2', fov: 60, movetail: true, typelight:'point light',  sling:117, shininess:11.0 };

    baseappParameters: TAnimation1Parameters = this.DefaultParameters;

    public gl: WebGL2RenderingContext|null=null;
    public app:mtls.MouseListener|null=null;

    // environment skybox camera
    public cameraTarget= [0,0,0];
    public cameraPosition: number[]= [0,0,0];

    // dat.UI
    public changedCam: boolean = false;
    public doShowBackgroundColorChoice: boolean = false;

    // environment skybox
    private skyboxLocation: WebGLUniformLocation | undefined;
    private viewDirectionProjectionInverseLocation: WebGLUniformLocation | undefined;
    private positionBuffer: WebGLBuffer|undefined;       // environment map geometry (quad in case of twgl)
    private positionAttributeLocation: number|undefined; // environment map geometry structure
   
    private environmentBufferInfo:twgl.BufferInfo | undefined; // environment texture
    private vaoEnvironment: WebGLVertexArrayObject | undefined; // environment map vao buffer 
    
    private envPrograminfo: twgl.ProgramInfo | undefined;
    
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
            twgl.setAttributePrefix("a_");
            this.envPrograminfo = twgl.createProgramInfo(cgl!,[this.vsEnvironmentMap,this.fsEnvironmentMap]);         
            document.getElementById('cdiv')!.innerHTML = "cdiv environment shaders initialized";    
            this.skyboxLocation = cgl!.getUniformLocation(this.envPrograminfo.program, "u_skybox")!;
            this.viewDirectionProjectionInverseLocation = cgl!.getUniformLocation(this.envPrograminfo.program, "u_viewDirectionProjectionInverse")!;
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

    onChangeCamHeight(value?: any)
    {
        var thisinstance = instance!;
        console.log("onchangecam camHeight="+(value as number));
        thisinstance.changedCam = true;
    }

    public createGUI(parameters:  TAnimation1Parameters): dat.GUI //, instanceParameters: {}): datgui.GUI
    {
        this.baseappParameters = parameters ;

        // prepare gl canvas div background to set color
        var cc = (this.gl!.canvas  as HTMLCanvasElement).parentNode;
        var ccd= (cc as HTMLDivElement);
        ccd.style.backgroundColor = "#000000"; // this.baseappParameters.color0;
    
        // park the dat.gui box in the linksdiv below the links, in closed state
        var gui = new datgui.GUI( { autoPlace: false } );
        gui.domElement.id = 'gui_drawimagespace';
        document.getElementById("linksdiv")!.append( gui.domElement);
        gui.close();

        // connect viewmodel to dat.gui box
        gui.remember(parameters); //, instanceParameters);
     
        // Checkbox forward move animation on/off
        gui.add(parameters, 'move');
        
        // Slider for camera height
       var cel0 =  gui.add(parameters, 'camheight').min(-20.0).max(20.0).step(0.1);
       cel0.onChange( this.onChangeCamHeight);

        // Slider for animation speed
        gui.add(parameters, 'speed').min(0.0).max(0.06).step(0.001);
        
        // Color dialog sets background color of gl canvas div
        if (this.doShowBackgroundColorChoice)
        {
            var cel3 = gui.addColor(parameters, 'color0');
            cel3.onChange( this.onChangeColorValue);
        }
        return gui;
    }

    //--- shaders for environment cube map background -----------------------------------------

    public vsEnvironmentMap = `#version 300 es
            in vec4 a_envposition;
            out vec4 v_position;
            void main() {
            v_position = a_envposition;
            gl_Position = vec4(a_envposition.xy, 1, 1);
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


    //=======================================================================================================================
    
    posdim: number=3;

    protected createEnvironmentMapGeo(gl: WebGL2RenderingContext)
    {
        gl.useProgram(this.envPrograminfo!.program);
     
        // Create a vertex array object (attribute state) and make it the one we're currently working with
        this.vaoEnvironment = gl.createVertexArray()!;
        gl.bindVertexArray(this.vaoEnvironment);
       
        this.positionAttributeLocation = gl.getAttribLocation(this.envPrograminfo!.program, "a_envposition");
      
        // Create a buffer for positions
        this.positionBuffer = gl.createBuffer()!;
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        // Put the positions for a unit plane in the buffer
        var positions2D = new Float32Array(
            [
               1, -1, -1, -1, -1, 1, // triangle SW-SE-NW
               1, -1, -1,  1,  1, 1, // triangle NW-SE-NE
            ]);
         var positions3D = new Float32Array(
                [
                    -1, -1, 0, 1, -1, 0,  -1, 1,0, // triangle SW-SE-NW
                    -1,  1, 0, 1, -1, 0,  1, 1,0 // triangle NW-SE-NE
                ]);
            
        gl.bufferData(gl.ARRAY_BUFFER, positions3D, gl.STATIC_DRAW);   
        this.restorePosAttributeContext(gl, this.positionBuffer, this.positionAttributeLocation, this.posdim);

   //     gl.bufferData(gl.ARRAY_BUFFER, positions2D, gl.STATIC_DRAW);   
   //     this.restorePosAttributeContext(gl, this.positionBuffer, this.positionAttributeLocation, 2);
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

    public computeprojectionmatrices(gl: WebGL2RenderingContext, fov:number): m4.Mat4
    // env map
    {
        // Build a projection matrix.
        var aspect = (gl.canvas as HTMLCanvasElement).clientWidth / (gl.canvas as HTMLCanvasElement).clientHeight;
        var projectionMatrix = m4.perspective(fov, aspect, 1, 2000);
      
        // Build a view matrix.
        var up = [0, 1, 0];
        //this.cameraPosition[1]=this.baseappParameters.camheight;
        //this.cameraTarget[1]=this.baseappParameters.camheight;
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
        gl.useProgram(this.envPrograminfo!.program);
        var invproj = this.viewDirectionProjectionInverseLocation!;
        var loc = this.skyboxLocation!;
        gl.bindVertexArray(this.vaoEnvironment!);
        this.restorePosAttributeContext(gl, this.positionBuffer!, this.positionAttributeLocation!, this.posdim); 
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
      gl.useProgram(this.envPrograminfo!.program);
      this.environmentBufferInfo = twgl.primitives.createXYQuadBufferInfo(gl,300); 
      this.vaoEnvironment = twgl.createVAOFromBufferInfo(gl,this.envPrograminfo!, this.environmentBufferInfo)!;
      gl.bindVertexArray(this.vaoEnvironment);
    }
 
    public renderenvironmentmapTwgl(gl: WebGL2RenderingContext, fov:number, texture: WebGLTexture)
    {
        gl.useProgram(this.envPrograminfo!.program);
        var viewDirectionProjectionInverseMatrix = twgl.m4.inverse(this.computeprojectionmatrices(gl, fov));          
        gl.bindVertexArray(this.vaoEnvironment!);
        twgl.setUniforms( this.envPrograminfo!, { 
          u_viewDirectionProjectionInverse: viewDirectionProjectionInverseMatrix,
          u_skybox: texture,
        });
        twgl.drawBufferInfo(gl, this.environmentBufferInfo!);  
   //     gl.flush();
    }

}
