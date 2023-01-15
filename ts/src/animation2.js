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
        this.defaultParameters = { influence: 0.05, friction: 0.99, move: true, speed: 0.01, color0: "#A0A0A0", gravity: 0.02, texture: 'geotriangle2', fov: 60, movetail: true, typelight: 'point light', sling: 117, shininess: 11.0 };
        //=============================================================================
        // all parameters in any scene
        this.animation1Parameters = this.defaultParameters;
        this.ctime = new Date().getTime();
        this.doclear = false;
        this.doTwglEnv = false; // when true, background is drawn with twgl.drawBufferInfo, which does not work with any scenery using twgl.DrawBufferInfo
        Animation2.instance = this;
        this.scene = cscene;
        this.clock = new animationclock.AnimationClock();
    }
    onChangeTextureCombo(value) {
        var thisinstance = Animation2.instance;
        console.log("we choose texture=[" + value + "] thisinstance.scene.sceneenv=" + thisinstance.scene[0].sceneenv);
        if (value == "Black")
            thisinstance.skyboxtexture = undefined; // result is a black background  
        if (value == "Yokohama")
            thisinstance.skyboxtexture = thisinstance.createEnvironmentMapTexture(thisinstance.gl, 1, (p1, p2) => { });
        if (value == "Stockholm")
            thisinstance.skyboxtexture = thisinstance.createEnvironmentMapTexture(thisinstance.gl, 2, (p1, p2) => { });
        this.scene.forEach((s) => {
            if (value == "None")
                s.sceneenv = -1; // result is chosen color0 div  background  
            if (value == "Black")
                s.sceneenv = 0; //thisinstance.skyboxtexture = undefined; // result is a black background  
            if (value == "Yokohama")
                s.sceneenv = 1; //thisinstance.skyboxtexture = thisinstance.createEnvironmentMapTexture(thisinstance.gl!, thisinstance.scene[0].sceneenv=1, (p1,p2)=>{})!;    
            if (value == "Stockholm")
                s.sceneenv = 2; //thisinstance.skyboxtexture = thisinstance.createEnvironmentMapTexture(thisinstance.gl!, thisinstance.scene[0].sceneenv=2, (p1,p2)=>{})!; 
        });
    }
    initGUI(parameters, cscene) {
        console.log("=> animation1 initGUI " + parameters);
        this.animation1Parameters = parameters;
        for (var ii = 0; ii < this.scene.length; ii++) {
            this.scene[ii].animationParameters = this.animation1Parameters;
        }
        var gui = super.createGUI(this.animation1Parameters);
        this.scene[cscene].extendGUI(gui);
        return gui;
    }
    initScenes() {
        var n = 0;
        var ainstance = baseapp.instance;
        ainstance.scene.forEach((s) => {
            s.initScene(ainstance.gl, ainstance.animation1Parameters, ainstance.cam, ainstance.dictpars, (ainstance.scene.length == (n + 1)) ? ainstance.sceneReadyCallback : undefined);
            n++;
        });
    }
    main(gl, dictpar) {
        this.dictpars = dictpar;
        this.cam = camhandler.Camera.createCamera(gl, dictpar, camhandler.Camera.CamYUp, this.scene[0].scenesize, this.app);
        this.cam.zoominVelocity = 0.5;
        if (this.scene[0].sceneenv > 0) {
            console.log("animation2 initscenes with background");
            if (this.doTwglEnv)
                this.createEnvironmentMapGeoTwgl(gl);
            else
                this.createEnvironmentMapGeo(gl);
            this.skyboxtexture = this.createEnvironmentMapTexture(gl, this.scene[0].sceneenv, this.textureEnvReadyCallback);
        }
        else {
            console.log("animation2 initscenes without background");
            this.initScenes();
            //    var n: number=0;
            //      var ainstance=this;
            //        ainstance.scene.forEach((s)=>{ s.initScene(ainstance.gl!, ainstance.animation1Parameters, ainstance.cam!, ainstance.dictpars,
            //        (ainstance.scene.length==(n+1)) ?ainstance.sceneReadyCallback:undefined); n++;});
        }
    }
    sceneReadyCallback(err) {
        console.log("-> sceneReadyCallback");
        var thisinstance = baseapp.instance;
        var ainstance = thisinstance;
        ainstance.scene[0].defaultCamera(ainstance.gl, ainstance.cam);
        ainstance.scene[0].resizeCanvas(ainstance.gl);
        console.log("-> sceneReadyCallback request first frame");
        requestAnimationFrame(() => ainstance.render(ainstance.ctime)); //ainstance.clock.getTime(this.clock.frame))); 
    }
    textureEnvReadyCallback(err, texture) {
        var thisinstance = baseapp.instance;
        var ainstance = thisinstance;
        //    var n: number=0;
        ainstance.initScenes();
        //    ainstance.scene.forEach((s)=>{ s.initScene(ainstance.gl!, ainstance.animation1Parameters, ainstance.cam!, ainstance.dictpars,
        //                                               (ainstance.scene.length==(n+1)) ?ainstance.sceneReadyCallback:undefined); n++;});
    }
    render(time) {
        var gl = this.gl;
        /*  if (this.doclear)
          {
            gl.clear(gl.DEPTH_BUFFER_BIT);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
          }
         // scene.resizeCanvas(gl);
          gl.viewport(0, 0,  gl.canvas.width, gl.canvas.height);
         */ var gl = this.gl;
        if (this.doclear) {
            gl.clear(gl.DEPTH_BUFFER_BIT);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
        //  scene.resizeCanvas(gl);  
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        var cam = this.cam;
        cam.CamHandlingYUp(gl, this.app, 1.0, -1.0);
        this.scene.forEach((s) => { this.renderscene(gl, time, s, cam); });
        requestAnimationFrame(() => this.render(this.clock.getTime(this.clock.frame)));
    }
    renderscene(gl, time, scene, cam) {
        // var scene = this.scene[cscene];
        var _a, _b;
        // prepare camera
        // set current scene parameters
        scene.animationParameters = this.animation1Parameters;
        // render skybox                                                                          
        if (scene.sceneenv > 0) {
            // set skybox camera
            if (!((_a = scene.animationParameters) === null || _a === void 0 ? void 0 : _a.move))
                this.cameraPosition = [cam === null || cam === void 0 ? void 0 : cam.Position()[0], cam === null || cam === void 0 ? void 0 : cam.Position()[1], cam === null || cam === void 0 ? void 0 : cam.Position()[2]];
            else
                this.cameraPosition = ((_b = scene.animationParameters) === null || _b === void 0 ? void 0 : _b.move) ? [Math.cos(time * 0.005 * scene.animationParameters.speed), 0.0,
                    Math.sin(time * 0.005 * scene.animationParameters.speed)] : [4.0, 0.0, 0.0];
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
        gl.enable(gl.DEPTH_TEST); // obscure vertices behind other vertices
        gl.enable(gl.CULL_FACE); // only show left-turned triangles
        scene.drawScene(gl, cam, time);
        // request next frame
    }
}
exports.Animation2 = Animation2;
//# sourceMappingURL=animation2.js.map