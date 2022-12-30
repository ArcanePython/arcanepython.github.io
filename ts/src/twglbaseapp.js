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
exports.twglbaseapp = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work, this twglbaseapp provides all tools like programInfo
const baseapp = __importStar(require("./baseapp"));
class twglbaseapp extends baseapp.BaseApp {
    constructor(cgl, capp, dictpar, cdiv) {
        super(cgl, capp, dictpar, cdiv);
        this.twglprograminfo = null; // there can be several
        this.twglprograminfo = new Array(1);
        this.twglprograminfo[0] = twgl.createProgramInfo(cgl, [this.vsEnvironmentMap, this.fsEnvironmentMap]);
    }
    createEnvironmentMapGeoTwgl(gl) {
        this.environmentBufferInfo = twgl.primitives.createXYQuadBufferInfo(gl);
        this.vaoEnvironment = twgl.createVAOFromBufferInfo(gl, this.twglprograminfo[0], this.environmentBufferInfo);
    }
    createEnvironmentMapTexture(gl, scene, textureReadyCallback) {
        if (scene >= 0)
            return super.createEnvironmentMapTexture(gl, scene, (textureReadyCallback == undefined) ? this.straightTextureCallback : textureReadyCallback);
        else if (scene == -1) {
            /*    // external CubeMap texture hosted by Gregg's webgl2fundamentals
                var posxname = 'https://webgl2fundamentals.org/webgl/resources/images/computer-history-museum/pos-x.jpg'
                var negxname = 'https://webgl2fundamentals.org/webgl/resources/images/computer-history-museum/neg-x.jpg'
                var posyname = 'https://webgl2fundamentals.org/webgl/resources/images/computer-history-museum/pos-y.jpg'
                var negyname = 'https://webgl2fundamentals.org/webgl/resources/images/computer-history-museum/neg-y.jpg'
                var poszname = 'https://webgl2fundamentals.org/webgl/resources/images/computer-history-museum/pos-z.jpg'
                var negzname = 'https://webgl2fundamentals.org/webgl/resources/images/computer-history-museum/neg-z.jpg'
             
                 // local CubeMap texture copied from Gregg's webgl2fundamentals
                posxname = require("./images/yokohama/posx.jpg")
                negxname = require("./images/yokohama/negx.jpg")
                posyname = require("./images/yokohama/posy.jpg")
                negyname = require("./images/yokohama/negy.jpg")
                poszname = require("./images/yokohama/posz.jpg")
                negzname = require("./images/yokohama/negz.jpg")
            
                // local CubeMap texture copied from Gregg's webgl2fundamentals
                posxname = require("./images/yokohama/posx.jpg")
                negxname = require("./images/yokohama/negx.jpg")
                posyname = require("./images/yokohama/posy.jpg")
                negyname = require("./images/yokohama/negy.jpg")
                poszname = require("./images/yokohama/posz.jpg")
                negzname = require("./images/yokohama/negz.jpg")
            
                var textureOptions = {
                  
                    target: gl.TEXTURE_CUBE_MAP,
                    src: [posxname,negxname,posyname,negyname,poszname,negzname],
                    min: gl.LINEAR_MIPMAP_LINEAR,
                
                }
                console.log("=>createEnvironmentMapTexture assigns TextureReadyCallback");
                var cb:  twgl.TextureReadyCallback = (textureReadyCallback == undefined)?this.defaultTextureReadyCallback:textureReadyCallback;
                var texture = twgl.createTexture(gl, textureOptions, cb  );
                console.log("<=createEnvironmentMapTexture");
                return texture;
              */
        }
        return null;
    }
    defaultTextureReadyCallback(err, texture, source) {
        console.log("Environment textureA isready.");
    }
    straightTextureCallback(err, texture) {
        console.log("Environment textureB isready.");
    }
    /*
    private initprograminfos(gl: WebGL2RenderingContext, reportdiv:string, shaders: {vs:string,fs:string}[])
    {
        if (this.twglprograminfo==null || this.twglprograminfo==undefined) this.twglprograminfo=new Array(shaders.length);
        var i = 0;
        shaders.forEach((val) => {
          var p = (val.vs=='' || val.fs=='')?null: twgl.createProgramInfo(gl,[val.vs,val.fs]);
          if (p!=null)
          {
            console.log("Init program#"+i+" with shaders["+i+"]\nvs:["+shaders[i].vs+"\nfs:["+shaders[i].fs+"]");
            this.twglprograminfo![i]=p;
            this.program![i] = p.program;
          } else if ((val.vs=='' || val.fs=='')) console.log("gl.createProgram #"+i+" shaders empty.");
                   else document.getElementById(reportdiv)!.innerHTML ="gl.createProgram #1 fails.";
          i++;
        });
        return false;
    }

    //--- base class maininfo() tasks set up twgl/WebGL2 programinfo(s) ---------------------------------------------------------------------------

    protected maininfo(gl: WebGL2RenderingContext, dictpar:Map<string,string>, vs: string, fs: string)
    {
        if (vs.length>0 && fs.length>0)
          if (this.initprograminfos(gl,"cdiv",[{vs,fs}]) && this.twglprograminfo && this.gl) {}
        twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
        console.log("baseapp main ok, viewport "+gl.canvas.width+" x "+gl.canvas.height);
    }

    protected maininfos(gl: WebGL2RenderingContext, dictpar:Map<string,string>, shaders: {vs:string,fs:string}[])
    //
    {
        if (this.initprograminfos(gl,"cdiv",shaders) && this.program && this.gl)
        {
            twgl.resizeCanvasToDisplaySize((gl.canvas  as HTMLCanvasElement));
            console.log("baseapp maininfos ok, viewport "+gl.canvas.width+" x "+gl.canvas.height);
        }
    }
    */
    // -------------------------------------------------------------------------------------
    //--- used in drawimagespace, reads the texture repository maps textures[] and texureaspects[] ----------------------
    prepareSurfaceTextures(gl, selectedSurface) {
        this.textureaspects.set("checker", 1.0);
        this.textureaspects.set("clover", 1.0);
        this.textureaspects.set("zelenskyy", 1.0);
        this.textureaspects.set("aristotle", (512.0 / 512.0));
        this.textureaspects.set("flagofukraine", (856.0 / 1288.0));
        this.textureaspects.set("flagofukraine2", (1288.0 / 856.0));
        this.textureaspects.set("geotriangle", (258.0 / 424.0));
        this.textureaspects.set("geotriangle2", (212.0 / 424.0));
        this.textureaspects.set("geotriangle2", (212.0 / 424.0));
        this.textureaspects.set("protractorT2", (395.0 / 747.0));
        var gradientname = require("./resources/models/stone/circlegradient.png");
        var aristotlename = require("./resources/models/stone/aristoteles1.png");
        var clovername = require("./images/clover.jpg");
        var zelenskyyname = require("./resources/models/stone/zelenskii.png");
        var flagofukrainname = require("./resources/models/stone/flagofukraine.png");
        var flagofukrainname2 = require("./resources/models/stone/flagofukraine2.png");
        var trianglename = require("./resources/models/stone/geodriehoek.png");
        var trianglename2 = require("./resources/models/stone/geodriehoek2.png");
        var protractorT2name = require("./resources/models/stone/protractorT2.png");
        console.log("setting textures");
        this.textures = twgl.createTextures(gl, {
            checker: { mag: gl.NEAREST, min: gl.LINEAR, src: [255, 255, 255, 255, 192, 192, 192, 0, 92, 92, 92, 255, 255, 255, 255, 255,], },
            clover: { src: clovername },
            zelenskyy: { src: zelenskyyname },
            gradient: { src: gradientname },
            flagofukraine: { src: flagofukrainname },
            flagofukraine2: { src: flagofukrainname2 },
            geotriangle: { src: trianglename },
            geotriangle2: { src: trianglename2 },
            aristotle: { src: aristotlename },
            protractorT2: { src: protractorT2name }
        });
        console.log("reading textures");
        if (selectedSurface == "checker")
            return this.textures.checker;
        if (selectedSurface == "clover")
            return this.textures.clover;
        if (selectedSurface == "zelenskyy")
            return this.textures.zelenskyy;
        if (selectedSurface == "gradient")
            return this.textures.gradient;
        if (selectedSurface == "flagofukraine")
            return this.textures.flagofukraine;
        if (selectedSurface == "flagofukraine2")
            return this.textures.flagofukraine2;
        if (selectedSurface == "geotriangle")
            return this.textures.geotriangle;
        if (selectedSurface == "geotriangle2")
            return this.textures.geotriangle2;
        if (selectedSurface == "aristotle")
            return this.textures.geotriangle2;
        if (selectedSurface == "protractorT2")
            return this.textures.protractorT2;
    }
}
exports.twglbaseapp = twglbaseapp;
//# sourceMappingURL=twglbaseapp.js.map