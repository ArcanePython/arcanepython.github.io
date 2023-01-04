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
exports.drawimagespace = void 0;
const twgl = __importStar(require("twgl.js")); // Lib: Gregg's work
const datgui = __importStar(require("dat.gui")); // Lib: dat.gui
const baseapp = __importStar(require("./baseapp/baseapp")); // convenient base class initializing gl2 and program(s)
class drawimagespace extends baseapp.BaseApp {
    constructor(cgl, capp, dictpar, cdiv) {
        super(cgl, capp, dictpar, cdiv);
        this.imagespaceParameters = {
            move: false,
            teal: false,
            speed: 0.4,
            texture: 'geotriangle2',
            color0: "#00A000",
        };
        this.diffuseLocation = 0;
        this.imageSizeLocation = 0;
        this.tealLocation = 0;
        this.xshiftLocation = 0;
        this.yshiftLocation = 0;
        this.aspectLocation = 0;
        this.cxshift = 0; // total hhift texture space (pixels)
        this.cyshift = 0; // total hhift texture space (pixels)
        this.cxdshift = 6.0; // moving camera
        this.cydshift = 4.0; // moving camera
        this.cxshiftmax = 1000; // moving camera x limit
        this.cyshiftmax = 400; // moving camera y limit
        this.xzoomoffset = 0;
        this.yzoomoffset = 0;
        this.xzoomoffsetLocation = 0;
        this.yzoomoffsetLocation = 0;
        this.currentTexture = "geotriangle2";
        this.ny = 0.0;
        this.txtaspect = 1.0;
        this.vs = `#version 300 es
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
        this.fs = `#version 300 es
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
        //===================================================================================================
        this.gui = null;
        drawimagespace.instance = this;
        this.twglprograminfo = new Array(2);
        this.twglprograminfo[1] = twgl.createProgramInfo(cgl, [this.vs, this.fs]);
    }
    onChangeTextureCombo(value) {
        var thisinstance = drawimagespace.instance; //! as drawimagespace;
        console.log("we are in texture=[" + value + "] obj.speed=" + thisinstance.imagespaceParameters.speed);
        thisinstance.currentTexture = value;
        console.log("set currentTexture to [" + value + "]");
        if (value == "clover")
            thisinstance.ny = 8.0;
        else if (value == "geotriangle2")
            thisinstance.ny = 2.0;
        else
            thisinstance.ny = 4.0;
        console.log("this.textureaspects=" + thisinstance.textureaspects);
        if (value == "geotriangle")
            thisinstance.txtaspect = thisinstance.textureaspects.get("geotriangle");
        if (value == "geotriangle2")
            thisinstance.txtaspect = thisinstance.textureaspects.get("geotriangle2");
        if (value == "flagofukraine")
            thisinstance.txtaspect = thisinstance.textureaspects.get("flagofukraine");
        if (value == "flagofukraine2")
            thisinstance.txtaspect = thisinstance.textureaspects.get("flagofukraine2");
        if (value == "clover")
            if (thisinstance.textureaspects.has("clover"))
                thisinstance.txtaspect = thisinstance.textureaspects.get("clover");
        if (value == "aristotle")
            thisinstance.txtaspect = thisinstance.textureaspects.get("aristotle");
        if (value == "checker")
            thisinstance.txtaspect = thisinstance.textureaspects.get("checker");
        if (value == "zelenskyy")
            thisinstance.txtaspect = thisinstance.textureaspects.get("zelenskyy");
        if (value == "protractorT2")
            thisinstance.txtaspect = thisinstance.textureaspects.get("protractorT2");
        //alert("txtaspect set at "+thisinstance.txtaspect);
        thisinstance.app.mouse.totaldelta = 0;
    }
    onChangeColorValue(value) {
        console.log("we are in color=[" + value + "]");
        var thisinstance = drawimagespace.instance;
        if (thisinstance.gl != null) {
            var cc = thisinstance.gl.canvas.parentNode;
            var ccd = cc;
            ccd.style.backgroundColor = value;
        }
    }
    initGUI(parameters) {
        this.imagespaceParameters = parameters;
        var cc = this.gl.canvas.parentNode;
        var ccd = cc;
        ccd.style.backgroundColor = this.imagespaceParameters.color0;
        // park the dat.gui box in the linksdiv below the links, in closed state
        var gui = new datgui.GUI({ autoPlace: false });
        gui.domElement.id = 'gui_drawimagespace';
        document.getElementById("linksdiv").append(gui.domElement);
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
        cel3.onChange(this.onChangeColorValue);
        // Combobox texture from accepted values
        var cel2 = gui.add(this.imagespaceParameters, 'texture', ['geotriangle2', 'zelenskyy', 'clover', 'checker', 'aristotle', 'protractorT2']);
        cel2.onChange(this.onChangeTextureCombo);
        gui.updateDisplay();
        return gui;
    }
    //---------------------------------------------------------------------------------------------------------
    main(gl, dictpar) {
        var _a;
        //  super.main(gl, dictpar,"","");
        //  if (this.program && this.gl && this.program[0])
        {
            this.prepareSurfaceTextures(gl, "zelenskyy");
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            this.txtaspect = this.textureaspects.get("geotriangle2");
            this.ny = 1.0;
            console.log("this.twglprograminfo.length=" + ((_a = this.twglprograminfo) === null || _a === void 0 ? void 0 : _a.length));
            var program = this.twglprograminfo[1].program;
            console.log("<assigned program");
            this.diffuseLocation = gl.getUniformLocation(program, 'diffuse');
            this.imageSizeLocation = gl.getUniformLocation(program, 'u_imageSize');
            this.tealLocation = gl.getUniformLocation(program, 'u_teal');
            this.xshiftLocation = gl.getUniformLocation(program, 'u_xshift');
            this.yshiftLocation = gl.getUniformLocation(program, 'u_yshift');
            this.aspectLocation = gl.getUniformLocation(program, 'u_aspect');
            this.xzoomoffsetLocation = gl.getUniformLocation(program, 'u_xzoomoffset');
            this.yzoomoffsetLocation = gl.getUniformLocation(program, 'u_yzoomoffset');
            // gl.useProgram(this.twglprograminfo![0].program);
            // gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height); 
            requestAnimationFrame(() => this.render(0));
        } //else
        //console.log("initprogram program[0] fails.");
    }
    readcolor(original) {
        var s = (original[0] == '#') ? original.substring(1) : original;
        var v1 = parseInt(s.substring(0, 2), 16);
        var v2 = parseInt(s.substring(2, 4), 16);
        var v3 = parseInt(s.substring(4, 6), 16);
        return {
            r: v1 / 256.0,
            g: v2 / 256.0,
            b: v3 / 256.0
        };
    }
    render(time) {
        var _a;
        if (this.textures != null) {
            var gl = this.gl;
            twgl.resizeCanvasToDisplaySize(gl.canvas);
            gl.useProgram(this.twglprograminfo[1].program);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            var texture = this.textures[this.currentTexture];
            if (texture == null || texture == undefined) {
                console.log("no texture");
                requestAnimationFrame(() => this.render(++time));
                return;
            }
            //  gl.bindTexture(gl.TEXTURE_2D, texture);
            if (this.imagespaceParameters.move) {
                this.cxshift += this.imagespaceParameters.speed * this.cxdshift;
                if (this.cxshift > this.cxshiftmax)
                    this.cxdshift = -this.cxdshift;
                if (this.cxshift < 1)
                    this.cxdshift = -this.cxdshift;
                this.cyshift += this.imagespaceParameters.speed * this.cydshift;
                if (this.cyshift > this.cyshiftmax)
                    this.cydshift = -this.cydshift;
                if (this.cyshift < 1)
                    this.cydshift = -this.cydshift;
            }
            else if (this.app.mouse.dragvector && this.app.mouse.dragdistance) {
                var v = this.app.mouse.dragvector;
                var d = this.app.mouse.dragpdistance;
                this.cxshift += 0; //  /gl.canvas.width;
                this.cyshift += 0; // /gl.canvas.width;
                this.xzoomoffset = this.app.mouse.px;
                this.yzoomoffset = this.app.mouse.py;
                ///console.log("cxshift="+ this.cxshift+" cyshift="+this.cyshift)             
            }
            // this does not work here, background is div background of canvas
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            // blur the checker
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            if (!this.imagespaceParameters.teal) {
                // this will show a single instance of the texture image
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); // horizontal
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); // vertical
            }
            else {
                // this will show tealed texture images
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT); // horizontal
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT); // vertical    
            }
            // The texture is sampled according to cdivx and cdivy.
            // ny determines how many texture images are shown in vertical direction in tealed mode.
            // totaldelta is the distance the mouse wheel has moved.
            // zoomVelocity decides the speed of zoomin/zoomout
            // the fragment shader will sample the texture using the viewport size and cdiv.
            var cdivy = this.ny + ((_a = this.app) === null || _a === void 0 ? void 0 : _a.mouse.totaldelta) * drawimagespace.zoomVelocity;
            var cdivx = cdivy; // keep aspect ratio of image space
            // set zoomin state (imageSize)
            gl.uniform2f(this.imageSizeLocation, gl.canvas.width / cdivx, gl.canvas.height / cdivy);
            // aspect ratio texture dimensions i.r.t. viewport   
            var daspect = (gl.canvas.height) / gl.canvas.width;
            gl.uniform1f(this.aspectLocation, this.txtaspect / daspect);
            gl.uniform1f(this.xzoomoffsetLocation, this.xzoomoffset);
            gl.uniform1f(this.yzoomoffsetLocation, this.yzoomoffset);
            // horizontal and vertical shift
            gl.uniform1i(this.tealLocation, (this.imagespaceParameters.teal ? 1 : 0));
            gl.uniform1i(this.xshiftLocation, this.cxshift);
            gl.uniform1i(this.yshiftLocation, this.cyshift);
            // note vs is not bound to any VertexArray. The vertex shader emits all 
            // viewport pixel positions to the fragment shader, like ShaderToy does.
            // gl.bindVertexArray(this.vertexArray!);
            // ..this results in the
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            document.getElementById("cdiv").innerHTML = "draw " + time + "<br>xshift=" + Math.round(this.cxshift) + "<br>yshift=" + this.cyshift + "<br>" + "<br>xcoom=" + this.xzoomoffset + "<br>yzoom=" + this.yzoomoffset + "<br>" + " c.width=" + gl.canvas.width +
                " " + " c.height=" + gl.canvas.height + "<br>texture=" + this.currentTexture + " ny=" + this.ny; // +" "+ccolor.r+" "+ccolor.g+" "+ccolor.b;       ;
        }
        else
            document.getElementById("cdiv").innerHTML = "Initializing textures, time=" + time; //+ " this.textures.length="+this.textures!.length;
        requestAnimationFrame(() => this.render(++time));
    }
}
exports.drawimagespace = drawimagespace;
drawimagespace.zoomVelocity = 0.075;
drawimagespace.animationVelocity = 0.25;
//# sourceMappingURL=drawimagespace.js.map