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
exports.skybox = void 0;
const twglbaseapp = __importStar(require("./twglbaseapp"));
const camhandler = __importStar(require("./camhandler")); // camera projection
const datgui = __importStar(require("dat.gui"));
class skybox extends twglbaseapp.twglbaseapp // use m4, v3  from twgl
 {
    constructor(cgl, capp, dictpar, cdiv) {
        super(cgl, capp, dictpar, cdiv);
        this.skyboxCubeParameters = {
            movecube: true,
            moveenv: true,
            fieldOfViewDegrees: 0,
            radiusCam: 0,
            angVelocityCam: 0,
            angVelocityCube: 0 // mirror cube rotation velocity
        };
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
        //      gui.add(this.skyboxCubeParameters, 'movecube');
        // Checkbox tail animation on/off
        gui.add(this.skyboxCubeParameters, 'moveenv');
        // Slider for field of view
        gui.add(this.skyboxCubeParameters, 'fieldOfViewDegrees').min(20.0).max(80.0).step(0.02);
        // Slider for animation speed
        //   gui.add(this.skyboxCubeParameters, 'radiusCam').min(0.1).max(20.0).step(0.02);
        // Slider for animation speed
        gui.add(this.skyboxCubeParameters, 'angVelocityCam').min(0.0001).max(0.01).step(0.0001);
        // Slider for animation speed of cube
        //   gui.add(this.skyboxCubeParameters, 'angVelocityCube').min(0.001).max(0.01).step(0.0001);
        gui.updateDisplay();
        return gui;
    }
    main(gl, dictpar) {
        console.log("-> " + "skybox main");
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
        //super.main(gl, dictpar, this.vsEnvironmentMap, this.fsEnvironmentMap);
        console.log("skybox.main - find getAttribLocations");
        this.positionAttributeLocation = gl.getAttribLocation(this.twglprograminfo[0].program, "a_position");
        this.skyboxLocation = gl.getUniformLocation(this.twglprograminfo[0].program, "u_skybox");
        this.viewDirectionProjectionInverseLocation = gl.getUniformLocation(this.twglprograminfo[0].program, "u_viewDirectionProjectionInverse");
        console.log("Positionlocation=" + this.positionAttributeLocation);
        console.log("skyboxLocation=" + this.skyboxLocation);
        console.log("viewDirectionProjectionInverseLocation=" + this.viewDirectionProjectionInverseLocation);
        this.fieldOfViewRadians = this.skyboxCubeParameters.fieldOfViewDegrees * Math.PI / 180;
        this.cam = camhandler.Camera.createCamera(gl, dictpar, camhandler.Camera.CamYUp, 0.5, this.app);
        this.cam.zoominVelocity = 0.5;
        this.cam.setRadius(6.0);
        this.cam.translateEye([6.0, 0, 0]);
        this.createEnvironmentMapGeo(gl); //, this.positionLocation!);
        this.createEnvironmentMapTexture(gl, 2, this.textureReadyCallback);
        console.log("<- " + "skybox main");
        requestAnimationFrame(() => this.render(0));
    }
    textureReadyCallback(err, texture) {
        console.log("Skybox Environment texture isready.");
    }
    resizeCanvasToDisplaySize(canvas) {
        // Lookup the size the browser is displaying the canvas in CSS pixels.
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        // Check if the canvas is not the same size.
        const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
        if (needResize) {
            // Make the canvas the same size
            canvas.width = displayWidth;
            canvas.height = displayHeight;
        }
        return needResize;
    }
    render(mstime) {
        var _a;
        var gl = this.gl;
        this.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.useProgram(this.twglprograminfo[0].program);
        //this.cameraPosition = [5*Math.cos(mstime * .004), 0, 5*Math.sin(mstime * .004)];
        // field of view angle determines how narrow or wide the camera view is
        // aperture will be normalized to width of viewport.
        this.fieldOfViewRadians = this.skyboxCubeParameters.fieldOfViewDegrees * Math.PI / 180;
        // by default, rotate camera position.
        this.cameraPosition = (this.skyboxCubeParameters.moveenv) ? [Math.cos(mstime * this.skyboxCubeParameters.angVelocityCam) * this.skyboxCubeParameters.radiusCam, 0,
            Math.sin(mstime * this.skyboxCubeParameters.angVelocityCam) * this.skyboxCubeParameters.radiusCam]
            : [this.skyboxCubeParameters.radiusCam, 0.0, 0.0];
        if (this.cam) {
            var cam = this.cam;
            cam.CamHandlingYUp(gl, this.app, 1.0, -1.0);
            cam.ReportEye();
            // override cameraPosition by mouse camera position when moveenv checked off
            if (!this.skyboxCubeParameters.moveenv)
                this.cameraPosition = (_a = this.cam) === null || _a === void 0 ? void 0 : _a.Position();
        }
        //  this.cameraPosition = [5*Math.cos(mstime * .004), 0, 5*Math.sin(mstime * .004)];
        // draw the environment
        this.renderenvironmentmap(gl, this.fieldOfViewRadians, { invproj: this.viewDirectionProjectionInverseLocation, loc: this.skyboxLocation }, mstime);
        // next frame
        requestAnimationFrame(() => this.render(++mstime));
    }
}
exports.skybox = skybox;
//# sourceMappingURL=skybox.js.map