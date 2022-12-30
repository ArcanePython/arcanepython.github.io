"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApp = exports.instance = void 0;
const twgl_js_1 = require("twgl.js"); // Greg's work, this baseapp  only imports geometry matrix/vector tools
const datgui = __importStar(require("dat.gui"));
exports.instance = null;
class BaseApp {
    constructor(cgl, capp, dictpar, divname) {
        this.baseappParameters = {
            move: false,
            speed: 0.04,
            color0: "#00A000"
        };
        this.gl = null;
        this.app = null;
        // textures repository
        this.textureaspects = new Map();
        this.textures = null;
        /*
           private compileandconnectshaders(gl: WebGL2RenderingContext, program: WebGLProgram, vs: string, fs: string, reportdiv: string)
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
       
           //--- base class main() tasks set up WebGL2 program(s) ---------------------------------------------------------------------------
       
           private initprograms(gl: WebGL2RenderingContext, reportdiv:string, shaders: {vs:string,fs:string}[])
           {
               if (this.program==null || this.program==undefined) this.program=new Array(shaders.length);
               var i = 0;
               shaders.forEach((val) => {
                 var p = gl.createProgram();
                 if (p!=null)
                 {
                   this.compileandconnectshaders(gl,p, val.vs, val.fs, reportdiv);
                   this.program![i++]=p;
                 } else document.getElementById(reportdiv)!.innerHTML ="gl.createProgram #1 fails.";
               });
               return false;
           }
       */
        /*
        resizeCanvasToDisplaySize(canvas: HTMLCanvasElement)
        {
          // Lookup the size the browser is displaying the canvas in CSS pixels.
          const displayWidth  = canvas.clientWidth;
          const displayHeight = canvas.clientHeight;
          // Check if the canvas is not the same size.
          const needResize = canvas.width  !== displayWidth ||  canvas.height !== displayHeight;
          if (needResize) {
            // Make the canvas the same size
            canvas.width  = displayWidth;
            canvas.height = displayHeight;
          }
          return needResize;
        }
      
        protected main(gl: WebGL2RenderingContext, dictpar:Map<string,string>, vs: string, fs: string)
          {
              if (this.initprograms(gl,"cdiv", [{vs, fs}]) && this.program && this.gl)
              {
                  this.resizeCanvasToDisplaySize(gl.canvas  as HTMLCanvasElement);
                  console.log("baseapp main ok, viewport "+gl.canvas.width+" x "+gl.canvas.height);
              }
          }
      
          protected mains(gl: WebGL2RenderingContext, dictpar:Map<string,string>, shaders: {vs:string,fs:string}[])
          {
              if (this.initprograms(gl,"cdiv",shaders) && this.program && this.gl)
              {
                  this.resizeCanvasToDisplaySize(gl.canvas  as HTMLCanvasElement);
                  console.log("baseapp mains ok, viewport "+gl.canvas.width+" x "+gl.canvas.height);
              }
          }
      */
        //--- used in skybox and skyboxcube to initialize a cubemap texture from 6 images -----------------------------------------
        this.vsEnvironmentMap = `#version 300 es
        in vec4 a_position;
        out vec4 v_position;
        void main() {
        v_position = a_position;
        gl_Position = vec4(a_position.xy, 1, 1);
        }
        `;
        this.fsEnvironmentMap = `#version 300 es
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
        exports.instance = this;
        this.cameraTarget = [0, 0.5, 0];
        this.cameraPosition = [4, 0, 0];
        document.getElementById('cdiv').innerHTML = "finding webgl2...";
        var isWebGL2 = !!cgl;
        if (!isWebGL2) {
            document.getElementById('cdiv').innerHTML = "no webgl2";
        }
        else {
            document.getElementById('cdiv').innerHTML = "webgl2 found";
            this.gl = cgl;
            this.app = capp;
        }
    }
    onChangeColorValue(value) {
        var thisinstance = exports.instance;
        if (thisinstance.gl != null) {
            var cc = thisinstance.gl.canvas.parentNode;
            var ccd = cc;
            //  ccd.style.backgroundColor =  value;        
        }
    }
    createGUI(parameters, instanceParameters) {
        console.log("=> animation1 initGUI " + parameters);
        this.baseappParameters = parameters;
        var cc = this.gl.canvas.parentNode;
        var ccd = cc;
        ccd.style.backgroundColor = this.baseappParameters.color0;
        // park the dat.gui box in the linksdiv below the links, in closed state
        var gui = new datgui.GUI({ autoPlace: false });
        gui.domElement.id = 'gui_drawimagespace';
        document.getElementById("linksdiv").append(gui.domElement);
        gui.close();
        // connect viewmodel
        gui.remember(parameters, instanceParameters);
        // Checkbox forward move animation on/off
        gui.add(parameters, 'move');
        // Slider for animation speed
        gui.add(parameters, 'speed').min(0.002).max(0.06).step(0.001);
        // Color dialog sets background color
        var cel3 = gui.addColor(parameters, 'color0');
        cel3.onChange(this.onChangeColorValue);
        return gui;
    }
    createEnvironmentMapGeo(gl, positionLocation) {
        // Create a vertex array object (attribute state) and make it the one we're currently working with
        this.vaoEnvironment = gl.createVertexArray();
        gl.bindVertexArray(this.vaoEnvironment);
        // Create a buffer for positions
        var positionBuffer = gl.createBuffer();
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // Put the positions in the buffer
        var positions = new Float32Array([
            -1, -1, 1, -1, -1, 1,
            -1, 1, 1, -1, 1, 1, // triangle NW-SE-NE
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        // Turn on the position attribute
        gl.enableVertexAttribArray(positionLocation);
        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 2; // 2 components per iteration
        var type = gl.FLOAT; // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0; // start at the beginning of the buffer
        gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);
    }
    createEnvironmentMapTexture(gl, scene, textureReadyCallback) {
        var mytexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, mytexture);
        var pos_x_name = "", pos_y_name = "", pos_z_name = "";
        var neg_x_name = "", neg_y_name = "", neg_z_name = "";
        var p = scene;
        switch (p) {
            case 0: {
                pos_x_name = require("./images/chmuseum/pos-x.jpg");
                pos_y_name = require("./images/chmuseum/pos-y.jpg");
                pos_z_name = require("./images/chmuseum/pos-z.jpg");
                neg_x_name = require("./images/chmuseum/neg-x.jpg");
                neg_y_name = require("./images/chmuseum/neg-y.jpg");
                neg_z_name = require("./images/chmuseum/neg-z.jpg");
                break;
            }
            case 1: {
                /*     pos_x_name= require("./images/yokohama/posx.jpg");
                     pos_y_name= require("./images/yokohama/posy.jpg");
                     pos_z_name= require("./images/yokohama/posz.jpg");
                     neg_x_name= require("./images/yokohama/negx.jpg");
                     neg_y_name= require("./images/yokohama/negy.jpg");
                     neg_z_name= require("./images/yokohama/negz.jpg");
                */
                pos_x_name = require("./images/yokohama/posx.jpg");
                pos_y_name = require("./images/yokohama/posy.jpg");
                pos_z_name = require("./images/yokohama/posz.jpg");
                neg_x_name = require("./images/yokohama/negx.jpg");
                neg_y_name = require("./images/yokohama/negy.jpg");
                neg_z_name = require("./images/yokohama/negz.jpg");
                break;
            }
            case 2: {
                pos_x_name = require("./images/gamlastan/posx.jpg");
                pos_y_name = require("./images/gamlastan/posy.jpg");
                pos_z_name = require("./images/gamlastan/posz.jpg");
                neg_x_name = require("./images/gamlastan/negx.jpg");
                neg_y_name = require("./images/gamlastan/negy.jpg");
                neg_z_name = require("./images/gamlastan/negz.jpg");
                break;
            }
        }
        const faceInfos = [
            { target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, url: pos_x_name, },
            { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, url: neg_x_name, },
            { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, url: pos_y_name, },
            { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, url: neg_y_name, },
            { target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, url: pos_z_name, },
            { target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, url: neg_z_name, },
        ];
        var nImage = 0;
        faceInfos.forEach((faceInfo) => {
            const { target, url } = faceInfo;
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
                console.log("nImage=" + nImage + "/" + faceInfos.length + " loaded: " + image.src);
                // instead.. initialize mipmap when all face textures are read
                if (++nImage == faceInfos.length) {
                    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
                    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
                    if (textureReadyCallback != undefined) {
                        textureReadyCallback(0, mytexture);
                    }
                }
            });
        });
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
    computeprojectionmatrices(gl, fov) {
        // Build a projection matrix.
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var projectionMatrix = twgl_js_1.m4.perspective(fov, aspect, 1, 2000);
        // Build a view matrix.
        var up = [0, 1, 0];
        var cameraMatrix = twgl_js_1.m4.lookAt(this.cameraPosition, this.cameraTarget, up);
        var viewMatrix = twgl_js_1.m4.inverse(cameraMatrix);
        // viewDirectionMatrix is viewMatrix without translation (direction only)
        var viewDirectionMatrix = twgl_js_1.m4.copy(viewMatrix);
        viewDirectionMatrix[12] = 0;
        viewDirectionMatrix[13] = 0;
        viewDirectionMatrix[14] = 0;
        //
        this.viewDirectionProjectionMatrix = twgl_js_1.m4.multiply(projectionMatrix, viewDirectionMatrix);
        return this.viewDirectionProjectionMatrix;
        //
    }
    renderenvironmentmap(gl, fov, vao, uniformlocs, time) {
        // gl.bindVertexArray(vao);
        gl.bindVertexArray(this.vaoEnvironment);
        this.computeprojectionmatrices(gl, fov);
        gl.depthFunc(gl.LESS); // use the default depth test
        // var viewDirectionProjectionMatrix = m4.multiply(this.projectionMatrix!, this.viewMatrix!);
        // var viewDirectionProjectionInverseMatrix = m4.inverse(this.viewDirectionProjectionMatrix!);
        gl.uniformMatrix4fv(uniformlocs.invproj, false, twgl_js_1.m4.inverse(this.viewDirectionProjectionMatrix));
        gl.uniform1i(uniformlocs.loc, 0);
        gl.depthFunc(gl.LEQUAL);
        gl.drawArrays(gl.TRIANGLES, 0, 1 * 6);
    }
}
exports.BaseApp = BaseApp;
//# sourceMappingURL=baseapp.js.map