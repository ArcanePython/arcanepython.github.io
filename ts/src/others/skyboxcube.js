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
exports.skyboxcube = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work
const baseapp = __importStar(require("./../baseapp/baseapp"));
const camhandler = __importStar(require("./../baseapp/camhandler"));
const datgui = __importStar(require("dat.gui"));
class skyboxcube extends baseapp.BaseApp {
    constructor(cgl, capp, dictpar, cdiv) {
        super(cgl, capp, dictpar, cdiv);
        //-----------------------------------------------------------------------------------------------------------------
        this.skyboxCubeParameters = {
            movecube: true,
            moveenv: true,
            fieldOfViewDegrees: 0,
            radiusCam: 0,
            angVelocityCam: 0,
            angVelocityCube: 0 // mirror cube rotation velocity
        };
        //--- Shaders for the mirrorCoube -------------------------------------------------------------------------
        this.vsMirrorCube = `#version 300 es
    
    in vec4 a_position;
    in vec3 a_normal;
    
    uniform mat4 u_projection;
    uniform mat4 u_view;
    uniform mat4 u_world;
    
    out vec3 v_worldPosition;
    out vec3 v_worldNormal;
    
    void main() {
      // Multiply the position by the matrix.
      gl_Position = u_projection * u_view * u_world * a_position;
    
      // send the view position to the fragment shader
      v_worldPosition = (u_world * a_position).xyz;
    
      // orient the normals and pass to the fragment shader
      v_worldNormal = mat3(u_world) * a_normal;
    }
    `;
        this.fsMirrorCube = `#version 300 es
    precision highp float;
    
    // Passed in from the vertex shader.
    in vec3 v_worldPosition;
    in vec3 v_worldNormal;
    
    // The texture.
    uniform samplerCube u_texture;
    
    // The position of the camera
    uniform vec3 u_worldCameraPosition;
    
    // we need to declare an output for the fragment shader
    out vec4 outColor;
    
    void main() {
      vec3 worldNormal = normalize(v_worldNormal);
      vec3 eyeToSurfaceDir = normalize(v_worldPosition - u_worldCameraPosition);
      vec3 direction = reflect(eyeToSurfaceDir,worldNormal);
    
      outColor = texture(u_texture, direction);
    }
    `;
        var pi = this.twglprograminfo[0];
        this.twglprograminfo = new Array(2);
        this.twglprograminfo[0] = pi;
        this.twglprograminfo[1] = twgl.createProgramInfo(cgl, [this.vsMirrorCube, this.fsMirrorCube]);
    }
    //  fieldOfViewRadians : number = this.skyboxCubeParameters.fieldOfViewDegrees * Math.PI / 180;
    createReflectingCubeGeo(gl) {
        this.reflectingCubeBufferInfo = twgl.primitives.createCubeBufferInfo(gl, 1.2);
        this.vaoCube = twgl.createVAOFromBufferInfo(gl, this.twglprograminfo[1], this.reflectingCubeBufferInfo);
    }
    main(gl, dictpar) {
        // http://127.0.0.1:1234/index.html?skyboxcube&fov=22&movecube=true&moveenv=true
        var b = "";
        b = dictpar.get("movecube");
        if (b)
            this.skyboxCubeParameters.movecube = (b == "true");
        b = dictpar.get("moveenv");
        if (b)
            this.skyboxCubeParameters.moveenv = (b == "true");
        b = dictpar.get("fov");
        if (b)
            this.skyboxCubeParameters.fieldOfViewDegrees = +b;
        b = dictpar.get("vele");
        if (b)
            this.skyboxCubeParameters.angVelocityCam = +b;
        b = dictpar.get("velc");
        if (b)
            this.skyboxCubeParameters.angVelocityCube = +b;
        // https://webgl2fundamentals.org/webgl/lessons/webgl-skybox.html
        // super.maininfos(gl, dictpar, [ {vs:this.vsEnvironmentMap, fs:this.fsEnvironmentMap}, {vs:this.vsMirrorCube,fs:this.fsMirrorCube}]);
        twgl.setAttributePrefix("a_"); // naming convention for vertex positions and normals in shaders used when twgl will organize uniforms
        this.createReflectingCubeGeo(gl);
        this.createEnvironmentMapGeoTwgl(gl);
        this.skyboxtexture = this.createEnvironmentMapTexture(gl, 1, this.textureReadyCallback);
        this.cam = camhandler.Camera.createCamera(gl, dictpar, camhandler.Camera.CamYUp, 0.5, this.app);
        this.cam.zoominVelocity = 0.5;
        this.cam.setRadius(6.0);
        this.cam.translateEye([6.0, 0, 0]);
        requestAnimationFrame(() => this.render(0));
    }
    textureReadyCallback(err, texture) {
        console.log("SkyboxCube Environment texture isready.");
    }
    initGUI(parameters) {
        this.skyboxCubeParameters = parameters;
        // park the dat.gui box in the linksdiv below the links, in closed state
        var gui = new datgui.GUI({ autoPlace: false });
        gui.domElement.id = 'gui_drawimagespace';
        document.getElementById("linksdiv").append(gui.domElement);
        gui.close();
        // connect viewmodel
        gui.remember(this.skyboxCubeParameters);
        // Checkbox forward move animation on/off
        gui.add(this.skyboxCubeParameters, 'movecube');
        // Checkbox tail animation on/off
        gui.add(this.skyboxCubeParameters, 'moveenv');
        // Slider for field of view
        gui.add(this.skyboxCubeParameters, 'fieldOfViewDegrees').min(20.0).max(80.0).step(0.02);
        // Slider for animation speed
        gui.add(this.skyboxCubeParameters, 'radiusCam').min(0.1).max(20.0).step(0.02);
        // Slider for animation speed
        gui.add(this.skyboxCubeParameters, 'angVelocityCam').min(0.0001).max(0.01).step(0.0001);
        // Slider for animation speed of cube
        gui.add(this.skyboxCubeParameters, 'angVelocityCube').min(0.001).max(0.01).step(0.0001);
        gui.updateDisplay();
        return gui;
    }
    render(mstime) {
        var _a;
        var gl = this.gl;
        twgl.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.enable(gl.CULL_FACE);
        // gl.enable(gl.DEPTH_TEST);     
        // gl.depthFunc(gl.LEQUAL);        
        // by default, rotate camera position.
        this.cameraPosition = (this.skyboxCubeParameters.moveenv) ? [Math.cos(mstime * this.skyboxCubeParameters.angVelocityCam) * this.skyboxCubeParameters.radiusCam, 0,
            Math.sin(mstime * this.skyboxCubeParameters.angVelocityCam) * this.skyboxCubeParameters.radiusCam] : [this.skyboxCubeParameters.radiusCam, 0.0, 0.0];
        // the projected direction of view is inverted and passed to environment shader as u_viewDirectionProjectionInverse to address the cube map texture
        // computeprojectionmatrices will find projection, view and direction matrix, invert it for the Cubemap 
        var fieldOfViewRadians = this.skyboxCubeParameters.fieldOfViewDegrees * Math.PI / 180;
        // field of view angle determines how narrow or wide the camera view is
        // aperture will be normalized to width of viewport.
        if (this.cam) {
            var cam = this.cam;
            cam.rotationVelocity = this.skyboxCubeParameters.angVelocityCam / (Math.PI / 2.0 - fieldOfViewRadians);
            cam.CamHandlingYUp(gl, this.app, -1.0, -1.0);
            cam.ReportEye();
            // override cameraPosition by mouse camera position when moveenv checked off
            if (!this.skyboxCubeParameters.moveenv)
                this.cameraPosition = (_a = this.cam) === null || _a === void 0 ? void 0 : _a.Position();
        }
        var viewDirectionProjectionInverseMatrix = twgl.m4.inverse(this.computeprojectionmatrices(gl, fieldOfViewRadians));
        // Rotate the cube around the x axis
        if (this.skyboxCubeParameters.movecube)
            this.worldMatrix = twgl.m4.axisRotation([1, 0, 0], mstime * this.skyboxCubeParameters.angVelocityCube);
        else
            this.worldMatrix = twgl.m4.translation([0, 0, 0]); // twgl.m4.identity();
        // draw the environment
        gl.useProgram(this.twglprograminfo[0].program);
        this.renderenvironmentmapTwgl(gl, fieldOfViewRadians, this.skyboxtexture);
        /*
                gl.bindVertexArray(this.vaoEnvironment!);
                twgl.setUniforms( this.twglprograminfo![0], {
                  u_viewDirectionProjectionInverse: viewDirectionProjectionInverseMatrix,
                  u_skybox: this.texture,
                });
                twgl.drawBufferInfo(gl, this.environmentBufferInfo!);
        */
        // Build a view matrix for the mirror cube.
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        this.projectionMatrix = twgl.m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
        // Build a view matrix.
        var up = [0, 1, 0];
        var cameraMatrix = twgl.m4.lookAt(this.cameraPosition, this.cameraTarget, up);
        this.viewMatrix = twgl.m4.inverse(cameraMatrix);
        // draw the mirror cube
        if (this.viewMatrix == undefined)
            this.viewMatrix = twgl.m4.identity();
        if (this.projectionMatrix == undefined)
            this.projectionMatrix = twgl.m4.identity();
        gl.useProgram(this.twglprograminfo[1].program);
        //  gl.depthFunc(gl.LESS);  // use the default depth test
        gl.bindVertexArray(this.vaoCube);
        twgl.setUniforms(this.twglprograminfo[1], {
            u_world: this.worldMatrix,
            u_view: this.viewMatrix,
            u_projection: this.projectionMatrix,
            u_texture: this.skyboxtexture,
            u_worldCameraPosition: this.cameraPosition,
        });
        twgl.drawBufferInfo(gl, this.reflectingCubeBufferInfo);
        //next frame
        requestAnimationFrame(() => this.render(++mstime));
    }
}
exports.skyboxcube = skyboxcube;
//# sourceMappingURL=skyboxcube.js.map