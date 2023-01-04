
import * as twgl from "twgl.js";          // Greg's work, this twglbaseapp provides all tools like programInfo
import * as baseapp from "./baseapp";
import * as mtls from "./mouselistener"; 

export class twglbaseapp extends baseapp.BaseApp
{
    public twglprograminfo: twgl.ProgramInfo[]|null=null;  // there can be several
   
    //public twglprogram: twgl.ProgramInfo[]|null=null;  // there can be several
  
    public environmentBufferInfo:twgl.BufferInfo | undefined;
 
    constructor(cgl: WebGL2RenderingContext | null | undefined, capp: mtls.MouseListener | undefined, dictpar: Map<string, string>, cdiv: string)
    {
      super(cgl, capp, dictpar, cdiv);
      this.twglprograminfo = new Array(1);
      this.twglprograminfo![0] = twgl.createProgramInfo(cgl!,[this.vsEnvironmentMap,this.fsEnvironmentMap]); 
    }

    protected createEnvironmentMapGeoTwgl(gl: WebGL2RenderingContext)
    {
      this.environmentBufferInfo = twgl.primitives.createXYQuadBufferInfo(gl); 
      this.vaoEnvironment = twgl.createVAOFromBufferInfo(gl,this.twglprograminfo![0], this.environmentBufferInfo)!;
    }

    protected createEnvironmentMapTexture(gl: WebGL2RenderingContext, scene: number, textureReadyCallback: (a:any, t:WebGLTexture)=>void | undefined): WebGLTexture|null
    {
        if (scene>=0) return super.createEnvironmentMapTexture(gl, scene,(textureReadyCallback==undefined)?this.straightTextureCallback:textureReadyCallback); 
        else
        if (scene==-1)
        {
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

    defaultTextureReadyCallback(err: any, texture: WebGLTexture, source: twgl.TextureSrc): void
    { 
      console.log("Environment textureA isready.");
    }

    straightTextureCallback(err: any, texture: WebGLTexture)
    {
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

        public prepareSurfaceTextures(gl: WebGL2RenderingContext, selectedSurface:string)
        {
          this.textureaspects.set("checker", 1.0);
          this.textureaspects.set("clover", 1.0);
          this.textureaspects.set("zelenskyy", 1.0);
          this.textureaspects.set("aristotle", (512.0/512.0));
          this.textureaspects.set("flagofukraine", (856.0/1288.0));
          this.textureaspects.set("flagofukraine2", (1288.0/856.0));
          this.textureaspects.set("geotriangle", (258.0/424.0));
          this.textureaspects.set("geotriangle2", (212.0/424.0));
          this.textureaspects.set("geotriangle2", (212.0/424.0));
          this.textureaspects.set("protractorT2", (395.0/747.0));
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
              checker: {mag: gl.NEAREST, min: gl.LINEAR,src: [255, 255, 255, 255,  192, 192, 192, 0,   92, 92, 92, 255, 255, 255, 255, 255, ],},
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
          if (selectedSurface=="checker") return this.textures.checker;
          if (selectedSurface=="clover") return this.textures.clover;
          if (selectedSurface=="zelenskyy") return this.textures.zelenskyy;
          if (selectedSurface=="gradient") return this.textures.gradient;
          if (selectedSurface=="flagofukraine") return this.textures.flagofukraine;                       
          if (selectedSurface=="flagofukraine2") return this.textures.flagofukraine2;                       
          if (selectedSurface=="geotriangle") return this.textures.geotriangle;                       
          if (selectedSurface=="geotriangle2") return this.textures.geotriangle2;                       
          if (selectedSurface=="aristotle") return this.textures.geotriangle2;                       
          if (selectedSurface=="protractorT2") return this.textures.protractorT2;                       
        } 
    

}
