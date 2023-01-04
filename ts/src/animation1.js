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
exports.Animation1 = void 0;
const animationclock = __importStar(require("./animationclock")); // own lib: frame counter
const camhandler = __importStar(require("./camhandler")); // camera projection
const baseapp = __importStar(require("./baseapp")); // base app for this
class Animation1 extends baseapp.BaseApp {
    constructor(cgl, capp, cscene, dictpar, cdiv) {
        super(cgl, capp, dictpar, cdiv);
        // all parameters in any scene
        this.animation1Parameters = {
            b: this.baseappParameters,
            texture: 'geotriangle2',
            fov: 60,
            typelight: 'point light',
            sling: 117,
            shininess: 0.1,
            movetail: true
        };
        this.ctime = new Date().getTime();
        this.doclear = true;
        this.doTwglEnv = false;
        this.scene = cscene;
        this.clock = new animationclock.AnimationClock();
    }
    initGUI(parameters) {
        console.log("=> animation1 initGUI " + parameters);
        this.animation1Parameters = parameters;
        var gui = super.createGUI(this.animation1Parameters.b, this.animation1Parameters);
        this.scene.animationParameters = this.animation1Parameters;
        this.scene.extendGUI(gui);
        return gui;
    }
    main(gl, dictpar) {
        if (this.scene.twglprograminfo != null && this.scene.twglprograminfo != undefined) {
            var pienv = this.twglprograminfo[0];
            this.twglprograminfo = new Array(this.scene.twglprograminfo.length);
            this.twglprograminfo[0] = pienv;
            for (var j = 0; j < this.scene.twglprograminfo.length; j++)
                if (this.scene.twglprograminfo[j] != null && this.scene.twglprograminfo[j] != undefined) {
                    this.twglprograminfo[j] = this.scene.twglprograminfo[j];
                }
        }
        this.cam = camhandler.Camera.createCamera(gl, dictpar, camhandler.Camera.CamYUp, this.scene.scenesize, this.app);
        this.cam.zoominVelocity = 0.5;
        if (this.scene.sceneenv > 0) {
            gl.useProgram(this.twglprograminfo[0].program);
            this.skyboxLocation = gl.getUniformLocation(this.twglprograminfo[0].program, "u_skybox");
            this.viewDirectionProjectionInverseLocation = gl.getUniformLocation(this.twglprograminfo[0].program, "u_viewDirectionProjectionInverse");
            if (this.doTwglEnv)
                this.createEnvironmentMapGeoTwgl(gl);
            else
                this.createEnvironmentMapGeo(gl);
            this.createEnvironmentMapTexture(gl, this.scene.sceneenv, this.textureEnvReadyCallback);
        }
        else {
            this.scene.initScene(gl, this.animation1Parameters, dictpar, this.twglprograminfo[1], this.sceneReadyCallback);
        }
    }
    sceneReadyCallback(err) {
        var thisinstance = baseapp.instance;
        var ainstance = thisinstance;
        ainstance.scene.resizeCanvas(ainstance.gl);
        requestAnimationFrame(() => ainstance.render(ainstance.ctime)); //ainstance.clock.getTime(this.clock.frame))); 
    }
    textureEnvReadyCallback(err, texture) {
        var thisinstance = baseapp.instance;
        var ainstance = thisinstance;
        ainstance.scene.initScene(ainstance.gl, ainstance.animation1Parameters, undefined, ainstance.twglprograminfo[1], ainstance.sceneReadyCallback);
    }
    render(time) {
        var _a, _b;
        var gl = this.gl;
        if (this.doclear) {
            gl.clear(gl.DEPTH_BUFFER_BIT);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
        this.scene.animationParameters = this.animation1Parameters;
        this.scene.resizeCanvas(gl);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        var cam = this.cam;
        cam.CamHandlingYUp(gl, this.app, 1.0, -1.0);
        if (this.scene.sceneenv > 0) {
            if (!((_a = this.scene.animationParameters) === null || _a === void 0 ? void 0 : _a.b.move))
                this.cameraPosition = [cam === null || cam === void 0 ? void 0 : cam.Position()[0], cam === null || cam === void 0 ? void 0 : cam.Position()[1], cam === null || cam === void 0 ? void 0 : cam.Position()[2]];
            else
                this.cameraPosition = ((_b = this.scene.animationParameters) === null || _b === void 0 ? void 0 : _b.b.move) ? [Math.cos(time * 0.005 * this.scene.animationParameters.b.speed), 0,
                    Math.sin(time * 0.005 * this.scene.animationParameters.b.speed)] : [1.0, 0.0, 0.0];
            var fieldOfViewRadians = this.animation1Parameters.fov * Math.PI / 180;
            gl.useProgram(this.twglprograminfo[0].program);
            gl.disable(gl.CULL_FACE);
            gl.depthFunc(gl.LEQUAL);
            if (this.doTwglEnv) {
                this.renderenvironmentmapTwgl(gl, fieldOfViewRadians, this.texture);
            }
            else {
                this.renderenvironmentmap(gl, fieldOfViewRadians, { invproj: this.viewDirectionProjectionInverseLocation, loc: this.skyboxLocation }, this.texture);
            }
        }
        if (this.twglprograminfo[1] != undefined && this.twglprograminfo[1] != null) {
            gl.useProgram(this.twglprograminfo[1].program);
            gl.enable(gl.DEPTH_TEST); // obscure vertices behind other vertices
            gl.enable(gl.CULL_FACE); // only show left-turned triangles
            this.scene.drawScene(gl, cam, time);
        }
        requestAnimationFrame(() => this.render(this.clock.getTime(this.clock.frame)));
    }
}
exports.Animation1 = Animation1;
//# sourceMappingURL=animation1.js.map