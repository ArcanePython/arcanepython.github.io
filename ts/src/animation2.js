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
exports.Animation2 = void 0;
const animationclock = __importStar(require("./baseapp/animationclock")); // own lib: frame counter
const camhandler = __importStar(require("./baseapp/camhandler")); // camera projection
const baseapp = __importStar(require("./baseapp/baseapp")); // base app for this
class Animation2 extends baseapp.BaseApp {
    constructor(cgl, capp, cscene, dictpar, cdiv) {
        super(cgl, capp, dictpar, cdiv);
        //=============================================================================
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
        Animation2.instance = this;
        this.scene = cscene;
        this.clock = new animationclock.AnimationClock();
    }
    onChangeTextureCombo(value) {
        var thisinstance = Animation2.instance;
        console.log("we choose texture=[" + value + "] thisinstance.scene.sceneenv=" + thisinstance.scene.sceneenv);
        if (value == "None")
            thisinstance.scene.sceneenv = -1; // result is chosen color0 div  background  
        if (value == "Black")
            thisinstance.skyboxtexture = undefined; // result is a black background  
        if (value == "Yokohama")
            thisinstance.skyboxtexture = thisinstance.createEnvironmentMapTexture(thisinstance.gl, thisinstance.scene.sceneenv = 1, (p1, p2) => { });
        if (value == "Stockholm")
            thisinstance.skyboxtexture = thisinstance.createEnvironmentMapTexture(thisinstance.gl, thisinstance.scene.sceneenv = 2, (p1, p2) => { });
    }
    initGUI(parameters) {
        console.log("=> animation1 initGUI " + parameters);
        this.animation1Parameters = parameters;
        var gui = super.createGUI(this.animation1Parameters.b, this.animation1Parameters);
        this.scene.animationParameters = this.animation1Parameters;
        // Combobox texture from accepted values
        var cel2 = gui.add(this.animation1Parameters, 'texture', ['None', 'Black', 'Yokohama', 'Stockholm']);
        cel2.onChange(this.onChangeTextureCombo);
        this.scene.extendGUI(gui);
        return gui;
    }
    main(gl, dictpar) {
        this.dictpars = dictpar;
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
            if (this.doTwglEnv)
                this.createEnvironmentMapGeoTwgl(gl);
            else
                this.createEnvironmentMapGeo(gl);
            this.skyboxtexture = this.createEnvironmentMapTexture(gl, this.scene.sceneenv, this.textureEnvReadyCallback);
        }
        else {
            gl.useProgram(this.twglprograminfo[0].program);
            this.scene.initScene(gl, this.animation1Parameters, dictpar, this.twglprograminfo[1], this.sceneReadyCallback);
        }
    }
    sceneReadyCallback(err) {
        var thisinstance = baseapp.instance;
        var ainstance = thisinstance;
        ainstance.scene.defaultCamera(ainstance.gl, ainstance.cam);
        ainstance.scene.resizeCanvas(ainstance.gl);
        console.log("sceneReadyCallback requests first frame");
        requestAnimationFrame(() => ainstance.render(ainstance.ctime)); //ainstance.clock.getTime(this.clock.frame))); 
    }
    textureEnvReadyCallback(err, texture) {
        var thisinstance = baseapp.instance;
        var ainstance = thisinstance;
        console.log("textureEnvReadyCallback executes initScene");
        ainstance.scene.initScene(ainstance.gl, ainstance.animation1Parameters, ainstance.dictpars, ainstance.twglprograminfo[1], ainstance.sceneReadyCallback);
    }
    render(time) {
        var _a, _b;
        // prepare context and canvas
        var gl = this.gl;
        if (this.doclear) {
            gl.clear(gl.DEPTH_BUFFER_BIT);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
        this.scene.resizeCanvas(gl);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        // prepare camera
        var cam = this.cam;
        cam.CamHandlingYUp(gl, this.app, 1.0, -1.0);
        // set current scene parameters
        this.scene.animationParameters = this.animation1Parameters;
        // render skybox                                                                          
        if (this.scene.sceneenv > 0) {
            // set skybox camera
            if (!((_a = this.scene.animationParameters) === null || _a === void 0 ? void 0 : _a.b.move))
                this.cameraPosition = [cam === null || cam === void 0 ? void 0 : cam.Position()[0], cam === null || cam === void 0 ? void 0 : cam.Position()[1], cam === null || cam === void 0 ? void 0 : cam.Position()[2]];
            else
                this.cameraPosition = ((_b = this.scene.animationParameters) === null || _b === void 0 ? void 0 : _b.b.move) ? [Math.cos(time * 0.005 * this.scene.animationParameters.b.speed), 0,
                    Math.sin(time * 0.005 * this.scene.animationParameters.b.speed)] : [1.0, 0.0, 0.0];
            gl.useProgram(this.twglprograminfo[0].program);
            gl.disable(gl.CULL_FACE);
            gl.depthFunc(gl.LEQUAL);
            if (this.doTwglEnv) {
                this.renderenvironmentmapTwgl(gl, this.animation1Parameters.fov * Math.PI / 180, this.skyboxtexture);
            }
            else {
                this.renderenvironmentmap(gl, this.animation1Parameters.fov * Math.PI / 180, this.skyboxtexture);
            }
        }
        // render scene
        if (this.twglprograminfo[1] != undefined && this.twglprograminfo[1] != null) {
            gl.useProgram(this.twglprograminfo[1].program);
            gl.enable(gl.DEPTH_TEST); // obscure vertices behind other vertices
            gl.enable(gl.CULL_FACE); // only show left-turned triangles
            this.scene.drawScene(gl, cam, time);
        }
        // request next frame
        requestAnimationFrame(() => this.render(this.clock.getTime(this.clock.frame)));
    }
}
exports.Animation2 = Animation2;
//# sourceMappingURL=animation2.js.map