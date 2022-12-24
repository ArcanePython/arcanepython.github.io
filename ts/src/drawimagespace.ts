import * as twgl from "twgl.js";          // Lib: Gregg's work
import * as datgui from "dat.gui";        // Lib: dat.gui
import * as mtls from "./mouselistener";  // connect events for mouse movement, buttons and wheel

import { baseapp } from "./baseapp";      // convenient base class initializing gl2 and program(s)
import { twglbaseapp } from "./twglbaseapp";      // convenient base class initializing gl2 and program(s)

const vs = `#version 300 es
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

        const fs = `#version 300 es
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
          vec2 texoffset1 = vec2(  px, py) / u_imageSize;
          vec2 texcoord1 = texoffset1 + vec2(  u_xzoomoffset, u_yzoomoffset);

          vec4 ccolor = texture(diffuse, texcoord1);
          if ((py<u_imageSize.y && px<u_imageSize.x) || (u_teal ==1))
            color=ccolor;
        }`;
      
      
export class drawimagespace extends twglbaseapp
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
      xshiftLocation: WebGLUniformLocation=0;
      yshiftLocation: WebGLUniformLocation=0;
      aspectLocation: WebGLUniformLocation=0;

      cxshift:number=0; // total hhift texture space (pixels)
      cyshift:number=0; // total hhift texture space (pixels)
      cxdshift: number=6.0; // moving camera
      cydshift: number=4.0; // moving camera
      cxshiftmax: number=1000; // moving camera x limit
      cyshiftmax: number=400;  // moving camera y limit
      xzoomoffset: number = 0;
      yzoomoffset: number = 0;

      xzoomoffsetLocation:   WebGLUniformLocation=0;
      yzoomoffsetLocation:   WebGLUniformLocation=0;

      currentTexture = "geotriangle2";
      ny = 0.0;
      txtaspect: number = 1.0;

      static zoomVelocity = 0.075;
      static animationVelocity=0.25;

      public constructor(cgl: WebGL2RenderingContext | undefined | null, capp: mtls.MouseListener | undefined , dictpar:Map<string,string>)
      {
        super(cgl, capp, dictpar);
      }

  //===================================================================================================

      gui: datgui.GUI|null=null;

      onChangeTextureCombo(value? : any)
      {
        var thisinstance = drawimagespace.instance! as drawimagespace;
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
        super.main(gl, dictpar,vs,fs);
        if (this.program && this.gl && this.program[0])
        {
          console.log("initprogram program[0] ok.");
         // this.texture= 
          this.prepareSurfaceTextures(this.gl, "zelenskyy")!;
          gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height); 

          this.txtaspect = this.textureaspects.get("geotriangle2")!;
          this.ny=1.0;

          this.diffuseLocation = gl.getUniformLocation(this.program[0], 'diffuse')!;
          this.imageSizeLocation = gl.getUniformLocation(this.program[0], 'u_imageSize')!;
          this.tealLocation = gl.getUniformLocation(this.program[0], 'u_teal')!;
          this.xshiftLocation = gl.getUniformLocation(this.program[0], 'u_xshift')!;
          this.yshiftLocation = gl.getUniformLocation(this.program[0], 'u_yshift')!;
          this.aspectLocation = gl.getUniformLocation(this.program[0], 'u_aspect')!;  
          this.xzoomoffsetLocation = gl.getUniformLocation(this.program[0], 'u_xzoomoffset')!;
          this.yzoomoffsetLocation = gl.getUniformLocation(this.program[0], 'u_yzoomoffset')!;
      
          gl.useProgram(this.program[0]);
          gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height); 

          requestAnimationFrame(() => this.render(0)); 
        } else
        console.log("initprogram program[0] fails.");
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
            twgl.resizeCanvasToDisplaySize(gl.canvas  as HTMLCanvasElement);
    
            gl.useProgram(this.program![0]);
            gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height); 

            var texture = this.textures[this.currentTexture];
            if (texture==null || texture==undefined) { console.log("no texture");  requestAnimationFrame(() => this.render(++time)); return; }
          //  gl.bindTexture(gl.TEXTURE_2D, texture);

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
        
            // this does not work here, background is div background of canvas
              gl.clearColor(0.0,0.0,0.0,1.0);       
              gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);     
        
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

            document.getElementById("cdiv")!.innerHTML ="draw "+time+"<br>xshift="+Math.round(this.cxshift)+"<br>yshift="+this.cyshift+"<br>"+"<br>xcoom="+this.xzoomoffset+"<br>yzoom="+this.yzoomoffset+"<br>"+" c.width="+gl.canvas.width+
                                                        " "+" c.height="+gl.canvas.height+"<br>texture="+this.currentTexture+" ny="+this.ny  ; // +" "+ccolor.r+" "+ccolor.g+" "+ccolor.b;       ;
          } else 
            document.getElementById("cdiv")!.innerHTML = "Initializing textures, time="+time ; //+ " this.textures.length="+this.textures!.length;
          requestAnimationFrame(() => this.render(++time));
      }
}
