import * as twgl from "twgl.js";          // Lib: Gregg's work
import * as datgui from "dat.gui";        // Lib: dat.gui
import * as mtls from "./../baseapp/mouselistener";  // connect events for mouse movement, buttons and wheel

import * as baseapp from "./../baseapp/baseapp";      // convenient base class initializing gl2 and program(s)

export class drawimagespace extends baseapp.BaseApp
{
      imagespaceParameters = {
        move: false,
        teal: false,
        speed: 0.4,                    // moving camera
        texture: 'geotriangle2',
        color0: "#00A000",
      };

      diffuseLocation: WebGLUniformLocation=0;
      imageSizeLocation: WebGLUniformLocation=0;
      tealLocation: WebGLUniformLocation=0;


      aspectLocation: WebGLUniformLocation=0;
      xshiftLocation: WebGLUniformLocation=0;
      yshiftLocation: WebGLUniformLocation=0;
      cxshift:number=0; // total hhift texture space (pixels)
      cyshift:number=0; // total hhift texture space (pixels)
 
/*
      cxdshift: number=6.0; // moving camera
      cydshift: number=4.0; // moving camera
      cxshiftmax: number=1000; // moving camera x limit
      cyshiftmax: number=400;  // moving camera y limit
 */
      xzoomoffsetLocation:   WebGLUniformLocation=0;
      yzoomoffsetLocation:   WebGLUniformLocation=0;
      xzoomoffset: number = 0;
      yzoomoffset: number = 0;

      currentTexture = "geotriangle2";
      ny = 0.0;
      txtaspect: number = 1.0;

      static zoomVelocity = 0.075;
      static animationVelocity=0.25;

      static instance: drawimagespace;
      
      private twglprograminfo: twgl.ProgramInfo|undefined;  // there are 2 sets of shaders defined here.
 
      // textures repository
      
      private textures: {[key: string]: WebGLTexture} | null =null;

      private textureaspects:Map<string,number> = new Map<string,number>();
  
     vs = `#version 300 es
        precision highp float;
        precision highp int;   
        void main()
        {
          //show smaller, centered triangle gl_Position = vec4(1.f * float(uint(gl_VertexID) % 2u) - 0.5f, 1.f*float(uint(gl_VertexID) / 2u) - 0.5f, 1.0, 1.0);
          //show half viewport triangle gl_Position = vec4(2.f * float(uint(gl_VertexID) % 2u) - 1.f, 2.f*float(uint(gl_VertexID) / 2u) - 1.f, 1.0, 1.0);
          //show (the same) half viewport triangle  gl_Position = vec4(4.f * float(uint(gl_VertexID) % 2u) - 2.0f, 4.f*float(uint(gl_VertexID) / 2u) - 2.0f, 1.0, 1.0);
          //show covering right side of viewport gl_Position = vec4(4.f * float(uint(gl_VertexID) % 2u) + 0.0f, 4.f*float(uint(gl_VertexID) / 2u) - 1.0f, 1.0, 1.0);
          //show covering upper right square of viewport gl_Position = vec4(4.f * float(uint(gl_VertexID) % 2u) + 0.0f, 4.f*float(uint(gl_VertexID) / 2u) + 0.0f, 1.0, 1.0);
          //show covering  entire viewport
          gl_Position = vec4(4.f * float(uint(gl_VertexID) % 2u) - 1.0f,
                             4.f * float(uint(gl_VertexID) / 2u) - 1.0f, 
                             1.0, 1.0);       
        }`;

         fs = `#version 300 es
        precision highp float;
        precision highp int;
        uniform sampler2D diffuse;
        uniform vec2 u_imageSize;
        uniform int u_teal; 
        uniform int u_xshift; 
        uniform int u_yshift; 
        uniform float u_aspect; 
        uniform float u_xzoomoffset    ;
        uniform float u_yzoomoffset    ;
          out vec4 color;
        void main()
        {
          float px = u_aspect *(gl_FragCoord.x-float(u_xshift));
          float py = gl_FragCoord.y-float(u_yshift);
          px-=u_xzoomoffset;
          py-=u_yzoomoffset;
          vec2 texoffset1 = vec2(  px,  u_imageSize.y -py) / u_imageSize;
          vec2 texcoord1 = texoffset1 + vec2(  u_xzoomoffset, u_yzoomoffset);

          vec4 ccolor = texture(diffuse, texcoord1);
          if ((py<u_imageSize.y && px<u_imageSize.x) || (u_teal ==1))
            color=ccolor;
        }`;
      
      
        public constructor(cgl: WebGL2RenderingContext | undefined | null, capp: mtls.MouseListener | undefined , dictpar:Map<string,string>, cdiv: string)
        {
          super(cgl, capp, dictpar, cdiv);
          drawimagespace.instance = this;
          this.twglprograminfo = twgl.createProgramInfo(cgl!, [this.vs, this.fs]);  
        }
  
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
          var gradientname = require("./../resources/models/stone/circlegradient.png");
          var aristotlename = require("./../resources/models/stone/aristoteles1.png");
          var clovername = require("./../resources/images/clover.jpg");
          var zelenskyyname = require("./../resources/models/stone/zelenskii.png");
          var flagofukrainname = require("./../resources/models/stone/flagofukraine.png");
          var flagofukrainname2 = require("./../resources/models/stone/flagofukraine2.png");
          var trianglename = require("./../resources/models/stone/geodriehoek.png");
          var trianglename2 = require("./../resources/models/stone/geodriehoek2.png");
          var protractorT2name = require("./../resources/models/stone/protractorT2.png");
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

  //===================================================================================================

      gui: datgui.GUI|null=null;

      onChangeTextureCombo(value? : any)
      {
        var thisinstance = drawimagespace.instance as drawimagespace;
        console.log("we are in texture=["+value+"] obj.speed="+ thisinstance.imagespaceParameters.speed);
        thisinstance.currentTexture = value;
        console.log("set currentTexture to ["+value+"]");
        if (value=="clover") thisinstance.ny=8.0; else 
        if (value=="geotriangle2") thisinstance.ny=2.0; else thisinstance.ny=4.0;

        console.log("this.textureaspects="+thisinstance.textureaspects)
        if (value == "geotriangle") thisinstance.txtaspect = thisinstance.textureaspects.get("geotriangle")!;
        if (value == "geotriangle2") thisinstance.txtaspect = thisinstance.textureaspects.get("geotriangle2")!;
        if (value == "flagofukraine") thisinstance.txtaspect = thisinstance.textureaspects.get("flagofukraine")!;
        if (value == "flagofukraine2") thisinstance.txtaspect = thisinstance.textureaspects.get("flagofukraine2")!;
        if (value == "clover") if (thisinstance.textureaspects.has("clover")) thisinstance.txtaspect = thisinstance.textureaspects.get("clover")!;
        if (value == "aristotle") thisinstance.txtaspect = thisinstance.textureaspects.get("aristotle")!;
        if (value == "checker") thisinstance.txtaspect = thisinstance.textureaspects.get("checker")!;
        if (value == "zelenskyy") thisinstance.txtaspect = thisinstance.textureaspects.get("zelenskyy")!;
        if (value == "protractorT2") thisinstance.txtaspect = thisinstance.textureaspects.get("protractorT2")!;
        //alert("txtaspect set at "+thisinstance.txtaspect);

        thisinstance.app!.mouse.totaldelta = 0;
      }
  
      onChangeColorValue(value? : any)
      {
        console.log("we are in color=["+value+"]");
        var thisinstance = drawimagespace.instance!;
        if (thisinstance.gl!=null)
        {
          var cc = (thisinstance.gl!.canvas as HTMLCanvasElement).parentNode;
          var ccd= (cc as HTMLDivElement);
          ccd.style.backgroundColor =  value;
        }
      }

      public initGUI(parameters: {move:boolean, teal:boolean, speed:number, texture:string, color0:string})
      {
        this.imagespaceParameters=parameters;
        
        var cc = (this.gl!.canvas as HTMLCanvasElement).parentNode;
        var ccd= (cc as HTMLDivElement);
        ccd.style.backgroundColor =  this.imagespaceParameters.color0;
  
        // park the dat.gui box in the linksdiv below the links, in closed state
        var gui = new datgui.GUI( { autoPlace: false } );
        gui.domElement.id = 'gui_drawimagespace';
        document.getElementById("linksdiv")!.append( gui.domElement);
        gui.close();

        // connect viewmodel
        gui.remember(this.imagespaceParameters);
      
        // Checkbox for animation on/off
        gui.add(this.imagespaceParameters, 'move');

        // Checkbox for tealing texture on/off
        gui.add(this.imagespaceParameters, 'teal');
       
        // Slider for animation speed
        gui.add(this.imagespaceParameters, 'speed').min(0.2).max(1).step(0.005);
     
        // Color dialog sets background color
        var cel3 = gui.addColor(this.imagespaceParameters, 'color0');
        cel3.onChange( this.onChangeColorValue);
       
        // Combobox texture from accepted values
        var cel2 = gui.add(this.imagespaceParameters, 'texture', [ 'geotriangle2','zelenskyy', 'clover', 'checker','aristotle','protractorT2' ] );
        cel2.onChange( this.onChangeTextureCombo);
           
        gui.updateDisplay();
        return gui;
      }

  //---------------------------------------------------------------------------------------------------------
  
      public main(gl: WebGL2RenderingContext, dictpar:Map<string,string>)
      { 
      //  super.main(gl, dictpar,"","");
      //  if (this.program && this.gl && this.program[0])
          var program = this.twglprograminfo!.program;
          gl.useProgram(program);
          this.prepareSurfaceTextures(gl, "zelenskyy")!;
          gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height); 

          this.txtaspect = this.textureaspects.get("geotriangle2")!;
          this.ny=1.0;

        
        
          console.log("<assigned program");

          this.diffuseLocation = gl.getUniformLocation(program, 'diffuse')!;
          this.imageSizeLocation = gl.getUniformLocation(program, 'u_imageSize')!;
          this.tealLocation = gl.getUniformLocation(program, 'u_teal')!;
          this.xshiftLocation = gl.getUniformLocation(program, 'u_xshift')!;
          this.yshiftLocation = gl.getUniformLocation(program, 'u_yshift')!;
          this.aspectLocation = gl.getUniformLocation(program, 'u_aspect')!;  
          this.xzoomoffsetLocation = gl.getUniformLocation(program, 'u_xzoomoffset')!;
          this.yzoomoffsetLocation = gl.getUniformLocation(program, 'u_yzoomoffset')!;
      
         // gl.useProgram(this.twglprograminfo![0].program);
         // gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height); 

          requestAnimationFrame(() => this.render(0)); 
         //else
        //console.log("initprogram program[0] fails.");
      }
      
      readcolor(original: string) 
      {
        var s = (original[0]=='#')?original.substring(1):original;
        var v1 = parseInt(s.substring(0,2),16); 
        var v2 = parseInt(s.substring(2,4),16); 
        var v3 = parseInt(s.substring(4,6),16); 
        return {
          r: v1/256.0,
          g: v2/256.0,
          b: v3/256.0
        };
      }  

      render(time: number)
      {               
        if (this.textures!=null)
        {       
            var gl: WebGL2RenderingContext = this.gl!;
            var program = this.twglprograminfo!.program;
            gl.useProgram(program);
             twgl.resizeCanvasToDisplaySize(gl.canvas  as HTMLCanvasElement);
    
          //  gl.useProgram(this.twglprograminfo![1].program);
            gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height); 

            var texture = this.textures[this.currentTexture];
            if (texture==null || texture==undefined) { console.log("no texture");  requestAnimationFrame(() => this.render(++time)); return; }
          //  gl.bindTexture(gl.TEXTURE_2D, texture);
/*
            if (this.imagespaceParameters.move)
            {
                this.cxshift+=this.imagespaceParameters.speed*this.cxdshift;
                if (this.cxshift>this.cxshiftmax) this.cxdshift=-this.cxdshift;
                if (this.cxshift<1) this.cxdshift=-this.cxdshift;
                this.cyshift+=this.imagespaceParameters.speed*this.cydshift;
                if (this.cyshift>this.cyshiftmax) this.cydshift=-this.cydshift;
                if (this.cyshift<1) this.cydshift=-this.cydshift;
            }     else
            if (this.app!.mouse.dragvector && this.app!.mouse.dragdistance)
            {
              var v = this.app!.mouse.dragvector!;
              var d = this.app!.mouse.dragpdistance!;
              this.cxshift+=0; //  /gl.canvas.width;
              this.cyshift+=0; // /gl.canvas.width;
              this.xzoomoffset= this.app!.mouse.px!;
              this.yzoomoffset= this.app!.mouse.py!;
              ///console.log("cxshift="+ this.cxshift+" cyshift="+this.cyshift)             
            }
 */       
            // this does not work here, background is div background of canvas
          //    gl.clearColor(0.0,0.0,0.0,1.0);       
          //    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);     
        
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
        
            // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

            // blur the checker
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        
            if (!this.imagespaceParameters.teal)
            {
              // this will show a single instance of the texture image
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)  // horizontal
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); // vertical
            } else 
            {
              // this will show tealed texture images
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)  // horizontal
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT); // vertical    
            }

            // The texture is sampled according to cdivx and cdivy.
            // ny determines how many texture images are shown in vertical direction in tealed mode.
            // totaldelta is the distance the mouse wheel has moved.
            // zoomVelocity decides the speed of zoomin/zoomout
            // the fragment shader will sample the texture using the viewport size and cdiv.
            var cdivy = this.ny+this.app?.mouse.totaldelta!*drawimagespace.zoomVelocity;
            var cdivx = cdivy; // keep aspect ratio of image space

            // set zoomin state (imageSize)
            gl.uniform2f(this.imageSizeLocation, gl.canvas.width/cdivx, gl.canvas.height/cdivy);

            // aspect ratio texture dimensions i.r.t. viewport   
            var daspect:number = (gl.canvas.height)/gl.canvas.width;   
            gl.uniform1f(this.aspectLocation, this.txtaspect/daspect);
            
            gl.uniform1f(this.xzoomoffsetLocation, this.xzoomoffset);
            gl.uniform1f(this.yzoomoffsetLocation, this.yzoomoffset);
          
            // horizontal and vertical shift

            gl.uniform1i(this.tealLocation, (this.imagespaceParameters.teal?1:0));
            gl.uniform1i(this.xshiftLocation, this.cxshift);
            gl.uniform1i(this.yshiftLocation, this.cyshift);
          
            // note vs is not bound to any VertexArray. The vertex shader emits all 
            // viewport pixel positions to the fragment shader, like ShaderToy does.
            // gl.bindVertexArray(this.vertexArray!);

            // ..this results in the
            gl.drawArrays(gl.TRIANGLES, 0, 3);

            document.getElementById("cdiv")!.innerHTML ="draw "+time+", xshift="+Math.round(this.cxshift)+", yshift="+this.cyshift+", "+"xcoom="+this.xzoomoffset+", yzoom="+this.yzoomoffset+"<br>"+" c.width="+gl.canvas.width+
                                                        " "+" c.height="+gl.canvas.height+", texture="+this.currentTexture+" ny="+this.ny  ; // +" "+ccolor.r+" "+ccolor.g+" "+ccolor.b;       ;
          } else 
            document.getElementById("cdiv")!.innerHTML = "Initializing textures, time="+time ; //+ " this.textures.length="+this.textures!.length;
          requestAnimationFrame(() => this.render(++time));
      }
}