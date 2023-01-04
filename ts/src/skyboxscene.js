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
exports.SkyBoxScene = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work
class SkyBoxScene {
    constructor(gl, dictPars) {
        // SceneInterface only, skybox is shown in animation container (now animation1.ts)
        this.scenesize = 40;
        this.sceneenv = 1;
        this.vertexShaderSource = ``;
        this.fragmentShaderSource = ``;
        this.twglprograminfo = null;
        this.speedpreset = 0.05;
        if (dictPars === null || dictPars === void 0 ? void 0 : dictPars.has("speed")) {
            this.speedpreset = +(dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("speed"));
            console.log("specified: " + this.speedpreset);
        }
    }
    resizeCanvas(gl) { twgl.resizeCanvasToDisplaySize(gl.canvas); }
    initScene(gl, cap, dictpar, progenv, sceneReadyCallback) {
        this.animationParameters = (this.animationParameters == undefined) ? cap : this.animationParameters;
        if (this.speedpreset)
            this.animationParameters.b.speed = this.speedpreset;
        sceneReadyCallback(0);
    }
    extendGUI(gui) {
        gui.add(this.animationParameters, 'fov', 5.0, 85.0, 1.0);
    }
    drawScene(gl, cam, time) { }
}
exports.SkyBoxScene = SkyBoxScene;
//# sourceMappingURL=skyboxscene.js.map