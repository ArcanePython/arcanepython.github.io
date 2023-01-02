"use strict";
//==================================================================================================================================
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
const mtls = __importStar(require("./mouselistener")); // connect events for mouse and mouse wheel
const skeleton = __importStar(require("./skeleton")); // task: bone model (single)
const fish = __importStar(require("./fishanimation")); // task: bone model (flock)
const manytextures = __importStar(require("./manytextures")); // task: camera projection
const manytexturescene = __importStar(require("./manytexturescene")); // task: camera projection
const drawimagespace = __importStar(require("./drawimagespace")); // task: image space texture
const skybox = __importStar(require("./skybox")); // task: image space texture
const animation1 = __importStar(require("./animation1")); // task: image space texture
//import * as animation2 from "./animation2" // task: image space texture
const skyboxcube = __importStar(require("./skyboxcube")); // task: show reflecting box
const objmtlimport = __importStar(require("./objmtlimport.js")); // task: obj/mtl file imports
const rotatingcubescene = __importStar(require("./rotatingcubescene"));
const spotlightscene = __importStar(require("./spotlightscene"));
const pointlightscene = __importStar(require("./pointlightscene"));
const directedlightscene = __importStar(require("./directedlightscene"));
const directedlight = __importStar(require("./directedlight"));
const skyboxscene = __importStar(require("./skyboxscene"));
const ShowOBJMTL = 1;
const ShowTextures = 2;
const ShowFish = 3;
const ShowSkyBox = 4;
const ShowAnimation1 = 5;
var selectedShow = ShowAnimation1;
//=== DISPATCH TASKS =================================================================================================================
function preparedefaultparameters(dictPars) {
    switch (selectedShow) {
        case ShowFish:
            {
                console.log("ShowFish");
                dictPars.set("fish", "");
                dictPars.set("radius0", "90");
                dictPars.set("mesh", "strip");
                dictPars.set("hx", "1.2");
                dictPars.set("hy", "0.1");
                dictPars.set("stride", "180");
                dictPars.set("numrows", "39");
                break;
            }
        case ShowSkyBox:
            {
                console.log("Skybox");
                dictPars.set("skybox", "");
                dictPars.set("radius0", "60");
                dictPars.set("mesh", "strip");
                dictPars.set("hx", "1.2");
                dictPars.set("hy", "0.1");
                dictPars.set("stride", "180");
                dictPars.set("numrows", "39");
                break;
            }
        case ShowTextures:
            {
                console.log("ShowTextures");
                dictPars.set("textures", "");
                break;
            }
        case ShowAnimation1:
        case ShowOBJMTL:
            {
                dictPars.set("radius0", "45");
                dictPars.set("hx", "-0.68");
                dictPars.set("hy", "0.47");
                dictPars.set("hxl", "-0.61");
                dictPars.set("difflight", "0.5");
                dictPars.set("speclight", "0.5");
                break;
            }
        default: return;
    }
}
function show(gl, app, dictPars) {
    // perform show
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("drawimagespace")) != undefined) {
        var ims = new drawimagespace.drawimagespace(gl, app, dictPars);
        console.log("imscreated.");
        ims.main(gl, dictPars);
        console.log("ins.main done.");
        ims.initGUI({ move: false, teal: true, speed: 0.4, texture: 'geotriangle2', color0: "#D0A010" });
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation1")) != undefined) {
        var mta1 = new animation1.Animation1(gl, app, new rotatingcubescene.RotatingCubeScene(), dictPars);
        mta1.main(gl, dictPars);
        var baseapppars = { move: false, movetail: true, speed: 0.01, color0: "#A0A0A0" };
        mta1.initGUI({ b: baseapppars, texture: 'geotriangle2', sling: 117 });
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation2a")) != undefined) {
        var mta1 = new animation1.Animation1(gl, app, new directedlightscene.DirectedLightScene(), dictPars);
        mta1.main(gl, dictPars);
        var baseapppars = { move: false, movetail: true, speed: 0.01, color0: "#A0A0A0" };
        mta1.initGUI({ b: baseapppars, texture: 'geotriangle2', sling: 117 });
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation2b")) != undefined) {
        var mta1 = new animation1.Animation1(gl, app, new pointlightscene.PointLightScene(), dictPars);
        mta1.main(gl, dictPars);
        var baseapppars = { move: false, movetail: true, speed: 0.01, color0: "#A0A0A0" };
        mta1.initGUI({ b: baseapppars, texture: 'geotriangle2', sling: 117 });
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation2c")) != undefined) {
        var mta1 = new animation1.Animation1(gl, app, new spotlightscene.SpotLightScene(), dictPars);
        //var mta1 = new animation1.Animation1(gl, app, new pointlightscene.PointLightScene(), dictPars);
        mta1.main(gl, dictPars);
        var baseapppars = { move: false, movetail: true, speed: 0.01, color0: "#A0A0A0" };
        mta1.initGUI({ b: baseapppars, texture: 'geotriangle2', sling: 117 });
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation4")) != undefined) {
        //var mta1 = new animation1.Animation1(gl, app, new spotlightscene.SpotLightScene(), dictPars);
        var mta1 = new animation1.Animation1(gl, app, new skyboxscene.SkyBoxScene(), dictPars);
        mta1.main(gl, dictPars);
        var baseapppars = { move: false, movetail: true, speed: 0.01, color0: "#A0A0A0" };
        mta1.initGUI({ b: baseapppars, texture: 'geotriangle2', sling: 117 });
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("textures")) != undefined) {
        var mt = new manytextures.ManyTextures(gl, app, dictPars);
        mt.main(gl, dictPars);
        mt.initGUI({ move: true, speed: 0.4, texture: 'geotriangle2', color0: "#A0A0A0", });
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation5")) != undefined) {
        var mta1 = new animation1.Animation1(gl, app, new manytexturescene.ManyTexturesScene(gl), dictPars);
        mta1.main(gl, dictPars);
        var baseapppars = { move: true, movetail: true, speed: 0.01, color0: "#A0A0A0" };
        mta1.initGUI({ b: baseapppars, texture: 'geotriangle2', sling: 117 });
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("skeleton")) != undefined) {
        var sk = new skeleton.Skeleton(gl, app, dictPars);
        sk.main(gl, dictPars);
        sk.initGUI({ move: false, movetail: true, speed: 0.06, texture: "zelenskyy", color0: "#afb9af" });
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("fish")) != undefined) {
        var fa = new fish.FishAnimation(gl, app, dictPars);
        fa.main(gl, dictPars);
        var baseapppars = { move: true, movetail: true, speed: 0.4, color0: "#A0A0A0" };
        fa.initGUI({ b: baseapppars, texture: 'geotriangle2', sling: 117 });
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("skyboxcube")) != undefined) {
        var sbc = new skyboxcube.skyboxcube(gl, app, dictPars);
        sbc.main(gl, dictPars);
        sbc.initGUI({ movecube: true, moveenv: true, fieldOfViewDegrees: 32, radiusCam: 5.0, angVelocityCam: 0.005, angVelocityCube: 0.003 });
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("directedlight")) != undefined) {
        var sbdl = new directedlight.directedlight(gl, app, dictPars);
        // sb.initGUI({movecube:false, moveenv:false, fieldOfViewDegrees:32, radiusCam:5.0, angVelocityCam:0.005, angVelocityCube:0.003 });
        sbdl.main(gl, dictPars);
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("skybox")) != undefined) {
        var sb = new skybox.skybox(gl, app, dictPars);
        sb.initGUI({ movecube: false, moveenv: false, fieldOfViewDegrees: 32, radiusCam: 5.0, angVelocityCam: 0.005, angVelocityCube: 0.003 });
        sb.main(gl, dictPars);
    }
    else // any other, take first argument as OBJ/MTL to show
     {
        var oi = new objmtlimport.ObjMtlImport(gl, app, dictPars);
        oi.main(gl, dictPars);
        oi.initGUI({ move: false, speed: 0, texture: '', color0: "#9cbbcd" });
    }
}
//=== ENTRY MAIN ===============================================================================================================================
function main() {
    var canvas = document.querySelector("#c");
    // const gl = someCanvas.getContext('webgl', {powerPreference: 'high-performance'});
    var gl = canvas.getContext("webgl2", { premultipliedAlpha: false, powerPreference: 'high-performance' });
    if (canvas && gl) {
        var app;
        var dictPars;
        var s = window.location.href;
        if (s.includes("?")) {
            // == fetch URL arguments
            dictPars = new Map();
            var p = s.indexOf("?");
            var spar = s.substring(p + 1), ppar = "", cpar = "";
            while (spar.indexOf("&") > 0) {
                ppar = spar.substring(0, spar.indexOf("&"));
                var pp = ppar.indexOf("=");
                if (pp >= 0) {
                    cpar = ppar.substring(0, pp);
                    ppar = ppar.substring(1 + pp);
                    dictPars.set(cpar, ppar);
                }
                else
                    dictPars.set(ppar, "");
                spar = spar.substring(spar.indexOf("&") + 1);
            }
            p = spar.indexOf("=");
            if (p >= 0) {
                cpar = spar.substring(0, p);
                ppar = spar.substring(1 + p);
                dictPars.set(cpar, ppar);
            }
            else
                dictPars.set(spar, "");
        }
        if (dictPars == undefined) // in case URL arguments, prepare the show parameters
         {
            console.log("No URL arguments, prepare defaults for " + selectedShow);
            preparedefaultparameters(dictPars = new Map());
        }
        // report parameters set
        dictPars.forEach((value, key) => { console.log("UrlPars key=" + key + " value=" + value); });
        // context found, create app connecting canvas with default mouse listeners
        app = new mtls.MouseListener(canvas);
        app.OnMouseWheel = (eventstring) => { document.getElementById('app').innerHTML = "mousewheel: [" + eventstring + "]"; };
        app.OnMouseMove = (eventstring) => { document.getElementById('comment').innerHTML = "mousemove: [" + eventstring + "]"; };
        app.OnMouseDown = (eventstring) => { document.getElementById('app').innerHTML = "mousedown: [" + eventstring + "]"; };
        app.OnMouseUp = (eventstring) => { document.getElementById('app').innerHTML = "mouseup: [" + eventstring + "] "; };
        show(gl, app, dictPars); // LAUNCH
    }
}
main();
//# sourceMappingURL=indexcube.js.map