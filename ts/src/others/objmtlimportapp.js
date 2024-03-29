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
exports.MatObjApp = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work (lib)
const twgl_js_1 = require("twgl.js"); // Greg's work (lib)
const mobj = __importStar(require("./../objreader/matobjreader")); // read geometry from .obj / .mtl files (interface)
const mobjfiles = __importStar(require("./../objreader/matobjfiles")); // read geometry from .obj / .mtl files (resources)
const camhandler = __importStar(require("../baseapp/camhandler")); // camera projection
const datgui = __importStar(require("dat.gui"));
const baseapp = __importStar(require("../baseapp/baseapp"));
class MatObjApp extends baseapp.BaseApp {
    constructor(cgl, capp, dictPar) {
        super(cgl, capp, dictPar, "c");
        this.objMtlImportParameters = {
            move: false,
            speed: 0.4,
            texture: 'geotriangle2',
            color0: "#00A000",
        };
        this.time = 0;
        this.dtime = 0.01;
        this.vertexPositionAttribute = 0; // address of positions buffer in shader
        this.normalAttribute = 0; // address of normals buffer in shader
        this.texCoordAttribute = 0; // address of texture coords in shader
        // private programInfo:twgl.ProgramInfo | undefined;
        this.texs = [];
        this.uniforms = {
            u_lightWorldPos: [0, 0, 0],
            u_ambient: [0, 0, 0, 1],
            u_specular: [0, 0, 0, 1],
            u_emissive: [0, 0, 0, 1],
            u_shininess: 0,
            u_specularFactor: 0.0,
            u_diffuse: this.texs[0],
            u_difflightintensity: 0,
            u_speclightintensity: 0
        };
        this.resolvedfilenames = new Map();
        this.resolvedtextures = new Map();
        this.imgs = [];
        this.imgsa = [];
        this.gui = null;
        //--- SHADERS ------------------------------------------------------------------------------------------------------
        this.vs = `#version 300 es
uniform mat4 u_worldViewProjection;
uniform vec3 u_lightWorldPos;
uniform mat4 u_world;
uniform mat4 u_viewInverse;
uniform mat4 u_worldInverseTranspose;

// ES3 convention
//layout(location=0) in vec4 position;
//layout(location=1) in vec3 normal;
//layout(location=2) in vec2 texcoord;

in vec4 position;
in vec3 normal;
in vec2 texcoord;

// out, not varying
out vec4 v_position;
out  vec2 v_texCoord;
out  vec3 v_normal;
out  vec3 v_surfaceToLight;
out  vec3 v_surfaceToView;

void main() {
  v_texCoord = texcoord;
  v_position = u_worldViewProjection * position;
  v_normal = (u_worldInverseTranspose * vec4(normal, 0)).xyz;
  v_surfaceToLight = u_lightWorldPos - (u_world * position).xyz;
  v_surfaceToView = (u_viewInverse[3] - (u_world * position)).xyz;
  gl_Position = v_position;
}
`;
        this.fs = `#version 300 es
 precision mediump float;

 in vec4 v_position;
 in vec2 v_texCoord;
 in vec3 v_normal;
 in vec3 v_surfaceToLight;
 in vec3 v_surfaceToView;

 uniform vec3 u_lightDirection;
 uniform vec4 u_ambient;
 uniform sampler2D u_diffuse;
 uniform vec4 u_specular;
 uniform vec4 u_emissive;
 uniform float u_shininess;
 uniform float u_specularFactor;
 uniform float u_difflightintensity;
 uniform float u_speclightintensity;


 vec4 lit(float l ,float h, float m) {
   return vec4(1.0,
               max(l, 0.0),
               (l > 0.0) ? pow(max(0.0, h), m) : 0.0,
               1.0);
 }

 out vec4 glFragColor;

 void main() {
  
    vec3 normal = normalize(v_normal);
    vec3 surfaceToViewDirection = normalize(v_surfaceToView);
    vec3 halfVector = normalize(u_lightDirection + surfaceToViewDirection);

    float fakeLight = dot(u_lightDirection, normal) * .5 + .5;
    float specularLight = clamp(dot(normal, halfVector), 0.0, 1.0);


  vec4 diffuseColor = texture(u_diffuse, v_texCoord);
  float lightIntensity = dot(normalize(v_normal), normalize(v_surfaceToLight)); 
  lightIntensity = clamp( lightIntensity,0.0,u_difflightintensity);
  vec4 ambientColor = u_ambient * 0.25;
  diffuseColor = diffuseColor * lightIntensity;
  float shininess = clamp(u_shininess / 10.0, 0.,u_speclightintensity);
  vec4 emissiveColor = normalize(u_emissive) * shininess;
  vec4 specColor = specularLight * u_specular;
  vec4 outColor = diffuseColor + emissiveColor + specColor + ambientColor;
  outColor[3] = 1.0;
  glFragColor = outColor;
 }`;
        var gl = this.gl;
        console.log("=> Constructor - create programInfo");
        this.twglprograminfo = twgl.createProgramInfo(gl, [this.vs, this.fs]);
    }
    main(gl, UrlPars) {
        var program = this.twglprograminfo.program;
        gl.useProgram(program);
        this.getFiles(UrlPars).then(() => // Fetch obj/mtl content
         {
            var cc = this.gl.canvas.parentNode;
            var ccd = cc;
            ccd.style.backgroundColor = this.objMtlImportParameters.color0;
            if (mobj.mesh) {
                var gl = this.gl;
                //  console.log("=> Constructor - create programInfo");
                //  this.programInfo = twgl.createProgramInfo(gl, [this.vs, this.fs]);
                console.log("=> Constructor - register attributes");
                this.vertexPositionAttribute = gl.getAttribLocation(program, "position");
                gl.enableVertexAttribArray(this.vertexPositionAttribute);
                this.normalAttribute = gl.getAttribLocation(program, "normal");
                gl.enableVertexAttribArray(this.normalAttribute);
                this.texCoordAttribute = gl.getAttribLocation(program, "texcoord");
                gl.enableVertexAttribArray(this.texCoordAttribute);
                // Create a camera
                var szx = mobj.meshMinMax.maxx - mobj.meshMinMax.minx;
                var szy = mobj.meshMinMax.maxy - mobj.meshMinMax.miny;
                var szz = mobj.meshMinMax.maxz - mobj.meshMinMax.minz;
                var szobj = Math.sqrt(szx * szx + szy * szy + szz * szz);
                this.cam = camhandler.Camera.createCamera(gl, UrlPars, camhandler.Camera.CamYUp, szobj * 2, this.app);
                this.cam.translateTarget([(mobj.meshMinMax.maxx + mobj.meshMinMax.minx) / 2,
                    (mobj.meshMinMax.maxy + mobj.meshMinMax.miny) / 2,
                    (mobj.meshMinMax.maxz + mobj.meshMinMax.minz) / 2]);
                this.cam.zoominVelocity = szobj / 40.0;
                // Prepare obj mesh for display
                console.log("obj/mtl mesh read ok");
                mobj.CreateMeshWithBuffers(gl); // unpack index and positions
                mobj.PrepareIndexBuffers(gl); // for each material, set up an index buffer
                console.log("<= Prepare obj/mtl mesh <= buffers ok");
                // Fetch file texture content, start rendering when all textures read
                this.Prepare();
            }
            else
                console.log("ERROR: obj/mtl no mesh could be created.");
        }); // getfiles then({})
    }
    onChangeEnvironmentCombo(value) {
        var thisinstance = baseapp.instance;
        //console.log("we are in texture=["+value+"] obj.speed="+ thisinstance.imagespaceParameters.speed);
        //  thisinstance.currentTexture = value;
        //  console.log("set currentTexture to ["+value+"]");
        //  if (value=="clover") thisinstance.ny=8.0; else 
        //  if (value=="geotriangle2") thisinstance.ny=2.0; else thisinstance.ny=4.0;
        thisinstance.app.mouse.totaldelta = 0;
    }
    onChangeColorValue(value) {
        //console.log("we are in color=["+value+"]");
        var thisinstance = baseapp.instance;
        if (thisinstance.gl != null) {
            var cc = thisinstance.gl.canvas.parentNode;
            var ccd = cc;
            ccd.style.backgroundColor = value;
        }
    }
    initGUI(parameters) {
        this.objMtlImportParameters = parameters;
        var cc = this.gl.canvas.parentNode;
        var ccd = cc;
        ccd.style.backgroundColor = this.objMtlImportParameters.color0;
        // park the dat.gui box in the linksdiv below the links, in closed state
        var gui = new datgui.GUI({ autoPlace: false });
        gui.domElement.id = 'gui_drawimagespace';
        document.getElementById("linksdiv").append(gui.domElement);
        gui.close();
        // connect viewmodel
        gui.remember(this.objMtlImportParameters);
        // Checkbox for animation on/off
        //    gui.add(this.objMtlImportParameters, 'move');
        // Slider for animation speed
        //   gui.add(this.objMtlImportParameters, 'speed').min(0.2).max(1).step(0.005);
        // Color dialog sets background color
        var cel3 = gui.addColor(this.objMtlImportParameters, 'color0');
        cel3.onChange(this.onChangeColorValue);
        // Combobox texture from accepted values
        //   var cel2 = gui.add(this.objMtlImportParameters, 'texture', [ 'geotriangle2','zelenskyy', 'clover', 'checker' ] );
        //   cel2.onChange( this.onChangeTextureCombo);
        gui.updateDisplay();
        return gui;
    }
    //------------------------------------------------------------------------
    async getFiles(UrlPars) {
        const useInMemoryObj = false;
        if (useInMemoryObj)
            mobj.GetDeclaredObjMtl();
        else {
            var cresolvedfilepair = mobjfiles.getFileNamesCube();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("koenigsegg")) != undefined)
                cresolvedfilepair = mobjfiles.getFileNamesKoenigsEgg();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("building")) != undefined)
                cresolvedfilepair = mobjfiles.getFileNamesBuilding();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("chair")) != undefined)
                cresolvedfilepair = mobjfiles.getFileNamesChair();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("chair2")) != undefined)
                cresolvedfilepair = mobjfiles.getFileNamesChair2();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("cat")) != undefined)
                cresolvedfilepair = mobjfiles.getFileNamesCat();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("plane")) != undefined)
                cresolvedfilepair = mobjfiles.getFileNamesPlane();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("rubik")) != undefined)
                cresolvedfilepair = mobjfiles.getFileNamesRubik();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("stone")) != undefined)
                cresolvedfilepair = mobjfiles.getFileNamesStone();
            if ((UrlPars === null || UrlPars === void 0 ? void 0 : UrlPars.get("greenhouse")) != undefined)
                cresolvedfilepair = mobjfiles.getFileNamesGreenhouse();
            console.log("=> await " + cresolvedfilepair.cobjname + " " + cresolvedfilepair.cmatname);
            await mobj.asyncFetchObjMtl(cresolvedfilepair.cobjname, cresolvedfilepair.cmatname);
            if (cresolvedfilepair.cfiles != undefined && cresolvedfilepair.cfiles.length > 0) {
                console.log("<= await result");
                console.log("see resolved files: " + cresolvedfilepair.cfiles.length);
                cresolvedfilepair.cfiles.forEach(({ fName, fNameResolved }) => {
                    this.resolvedfilenames.set(fName, fNameResolved);
                    console.log("reg: " + fName + " => " + fNameResolved);
                });
            }
            else
                console.log("<= await no result");
        }
    }
    //--------------------------------------------------------------------
    LoadImage(gl, url, onload) {
        var img = new Image();
        img.src = url;
        img.onload = function () {
            onload(gl, img);
        };
        return img;
    }
    ;
    LoadImages(gl, istr, urls, onload) {
        var img = new Image();
        img.src = urls[istr];
        img.onload = () => {
            console.log("load image: [" + urls[istr]);
            istr = this.imgs.push(img);
            if (istr < urls.length)
                this.LoadImages(gl, istr, urls, onload);
            else
                onload(gl, istr);
        };
        return img;
    }
    ;
    //--------------------------------------------------------------------
    Prepare() {
        var gl;
        gl = this.gl;
        console.log("=> Prepare - get materials");
        this.mats = mobj.mesh.materialsByIndex;
        if (this.mats == null || this.mats == undefined)
            return;
        console.log("=> Prepare - found " + mobj.mesh.materialNames.length + " materials in mtl");
        for (var i = 0; i < mobj.mesh.materialNames.length; i++) {
            var s1 = this.mats[i];
            if (s1 != undefined) {
                console.log("found  material i=" + i + " name=" + mobj.mesh.materialNames[i]);
                var nn = [];
                for (var j = 0; j < 4; j++) {
                    nn.push(255 * this.mats[i].diffuse[0]); // create mini texture for diffuse color
                    nn.push(255 * this.mats[i].diffuse[1]);
                    nn.push(255 * this.mats[i].diffuse[2]);
                    nn.push(255);
                }
                this.texs.push(twgl.createTexture(gl, {
                    min: gl.NEAREST,
                    mag: gl.NEAREST,
                    src: nn
                }));
                var sfile = this.mats[i].mapDiffuse;
                if (sfile.filename != undefined && sfile.filename != "")
                    console.log("Prepare - found material texture file reference: [" + sfile.filename + "]");
            }
        }
        var imageUrls = [];
        var imageUrlKeys = [];
        if (this.resolvedfilenames.keys != undefined)
            this.resolvedfilenames.forEach((value, key) => {
                console.log("Prepare " + key + " set texture file load: " + value);
                imageUrls.push(value);
                imageUrlKeys.push(key);
            });
        if (imageUrls.length > 0) // there are file textures
         {
            // ok await FetchImage(imageUrls[0]).then((value:ArrayBuffer)=>imgsa.push(value));
            // ok console.log("fetched image 0, byteLength="+imgsa[0].byteLength);
            this.LoadImages(gl, 0, imageUrls, (gl, istr) => {
                console.log("Found " + istr + " file textures, expect " + imageUrls.length);
                for (var i = 0; i < istr; i++) {
                    var texture = gl.createTexture();
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                    //  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    //  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, this.imgs[i].width, this.imgs[i].height);
                    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGB, gl.UNSIGNED_BYTE, this.imgs[i]);
                    this.resolvedtextures.set(imageUrlKeys[i], texture);
                    console.log("Prepare - register resolved texture " + i + " " + imageUrlKeys[i] + " width=" + this.imgs[i].width + " height=" + this.imgs[i].height);
                }
                console.log("Prepare - texture itemSize=" + mobj.meshWithBuffers.textureBuffer.itemSize);
                console.log("Prepare - finish, there are " + istr + " file textures");
                this.time = 0;
                twgl.resizeCanvasToDisplaySize(gl.canvas);
                requestAnimationFrame(() => this.render(0));
            }); // return from LoadImages()       
        }
        else // no textures
         {
            console.log("Prepare - no textures, > requestAnimationFrame()");
            this.time = 0;
            twgl.resizeCanvasToDisplaySize(gl.canvas);
            requestAnimationFrame(() => this.render(0));
        }
        console.log("Prepare - return");
    }
    //--- render function ------------------------------------------------------------
    prepareMaterial(i) {
        var ctexture = this.texs[i]; // for each material there is one preset diffuse texture
        var cmaterial = this.mats[i];
        var srep = "";
        if (cmaterial.mapDiffuse == undefined) {
            srep = "UNDEFINED TEXTURE";
            console.log(srep);
            //    this.uniforms.u_diffuse = ctexture; 
        }
        else if (cmaterial.mapDiffuse.filename.length > 0) {
            var tx = this.resolvedtextures.get(cmaterial.mapDiffuse.filename);
            if (tx == undefined || tx == null) {
                this.uniforms.u_diffuse = ctexture;
                //    srep = "No resolve, use color texture i="+i;
            }
            else {
                this.uniforms.u_diffuse = ctexture = tx; // file texture
                //   srep = "Resolve, use file texture i="+i+" "+cmaterial.mapDiffuse!.filename;       
            }
        }
        else {
            this.uniforms.u_diffuse = ctexture = this.texs[i]; // diffuse color texture
            //    srep="No filename, use color texture i="+i;
        }
        this.uniforms.u_emissive = [cmaterial.emissive[0], cmaterial.emissive[1], cmaterial.emissive[2], 1];
        this.uniforms.u_ambient = [cmaterial.ambient[0], cmaterial.ambient[1], cmaterial.ambient[2], 1];
        this.uniforms.u_specular = [cmaterial.specular[0], cmaterial.specular[1], cmaterial.specular[2], 1];
        this.uniforms.u_shininess = cmaterial.illumination;
        this.uniforms.u_difflightintensity = 1.0;
        //  console.log(srep+", ambient="+uniforms.u_ambient.toString()+" specular="+uniforms.u_specular.toString()+" emissive="+uniforms.u_emissive.toString()+" shininess="+uniforms.u_shininess);
        return ctexture;
    }
    render(dtime) {
        var gl = this.gl;
        var program = this.twglprograminfo.program;
        gl.useProgram(program);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        this.time += dtime;
        if (this.cam == undefined || this.twglprograminfo == undefined)
            return;
        this.uniforms.u_lightWorldPos = this.cam.lightpos;
        this.uniforms.u_difflightintensity = this.cam.difflightintensity;
        this.uniforms.u_speclightintensity = this.cam.speclightintensity;
        var world = twgl_js_1.m4.identity();
        // this.gl.clearColor(this.objMtlImportParameters.color0. 0.0, 0.0, 0.0, 1.0);      
        // this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.cam.CamHandlingYUp(gl, this.app, 1.0, 1.0);
        gl.useProgram(program);
        for (var i = 0; i < this.texs.length; i++) {
            if (this.mats[i] != undefined) {
                var ctexture = this.prepareMaterial(i);
                // this.gl.bindTexture(this.gl.TEXTURE_2D, ctexture);
                twgl.setUniforms(this.twglprograminfo, this.uniforms);
                twgl.setUniforms(this.twglprograminfo, {
                    u_viewInverse: this.cam.lookAt,
                    u_world: world,
                    u_worldInverseTranspose: twgl_js_1.m4.transpose(twgl_js_1.m4.inverse(world)),
                    u_worldViewProjection: twgl_js_1.m4.multiply(this.cam.viewProjection, world)
                });
                mobj.renderIndexBuffer(gl, this.vertexPositionAttribute, this.normalAttribute, this.texCoordAttribute, i, 2, ctexture);
            }
        } // for
        requestAnimationFrame(() => this.render(this.dtime));
    }
}
exports.MatObjApp = MatObjApp;
//# sourceMappingURL=objmtlimportapp.js.map