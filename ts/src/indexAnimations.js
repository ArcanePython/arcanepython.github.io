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
const mtls = __importStar(require("./baseapp/mouselistener")); // app: connect events for mouse and mouse wheel
//import * as objmtlimport from "./objreader/objmtlimport.js";           // main: obj/mtl file imports
const drawimagespace = __importStar(require("./others/drawimagespace")); // baseapp derivative: image space texture
const animation1 = __importStar(require("./animation1")); // baseapp derivative: scene container
const skyboxcube = __importStar(require("./others/skyboxcube")); // baseapp derivative: show reflecting cube in skybox
const objectlist = __importStar(require("./others/objectlist")); // baseapp derivative: show bouncing guy node tree
const drawinstanced = __importStar(require("./others/drawinstanced")); // baseapp derivative: show texture space navigator
const canvas3dtexture = __importStar(require("./others/canvas3dtexture")); // baseapp derivative: show 3d on texture
const skeleton = __importStar(require("./others/skeleton")); // baseapp derivative: bone model (single)
const skeletonscene = __importStar(require("./scene/skeletonscene")); // baseapp derivative: bone model (single)
const fishanimationscene = __importStar(require("./scene/fishanimationscene")); // baseapp derivative: bone model (single)
const fishanimation = __importStar(require("./others/fishanimation")); // baseapp derivative: bone model (flock)
const manytexturescene = __importStar(require("./scene/manytexturescene")); // scene: many textures / objects
const rotatingcubescene = __importStar(require("./scene/mixedtexturescene")); // scene: two textures alpha-mixed
const lightscene = __importStar(require("./scene/lightscene")); // scene: lights directed, point, spot
const objectlistscene = __importStar(require("./scene/objectlistscene")); // scene: show bouncing guy node tree
const canvas3dtexturescene = __importStar(require("./scene/canvas3dtexturescene")); // scene: show 3d on texture
const drawinstancedscene = __importStar(require("./scene/drawinstancedscene")); // scene: show texture space navigator
const skyboxscene = __importStar(require("./scene/skyboxscene")); // scene: show skybox only (empty scene)
const skyboxcubescene = __importStar(require("./scene/skyboxcubescene")); // scene: show reflecting cube in skybox
const matobjscene = __importStar(require("./scene/matobjscene")); // scene: show reflecting cube in skybox
const ShowOBJMTL = 1;
const ShowFish = 3;
const ShowAnimation1 = 5;
var selectedShow = ShowAnimation1;
var cdiv = 'c'; // name of canvas accessed by gl
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
        case ShowAnimation1:
            {
                dictPars.set("animation8", "");
                dictPars.set("radius0", "4");
                dictPars.set("hx", "-0.06");
                dictPars.set("hy", "0.47");
                break;
            }
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
var baseapppars = { move: true, speed: 0.01, color0: "#A0A0A0" };
var defaultParameters = { b: baseapppars, movetail: true, texture: 'geotriangle2', typelight: 'point light', sling: 117, shininess: 11.0, fov: 60 };
function initScene(gl, app, dictPars, scene, heighttop) {
    document.getElementById("gridcells").style.gridTemplateRows = heighttop + "px";
    var mta1 = new animation1.Animation1(gl, app, scene, dictPars, cdiv);
    mta1.main(gl, dictPars);
    mta1.initGUI(defaultParameters);
    return mta1;
}
function show(gl, app, dictPars) {
    // Default parameters for all Animation1 scenes
    //--- Scene animations using Animation1 ----------------------------------------------------------------------------------------------------------------------------------
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation4")) != undefined) {
        var mta1 = initScene(gl, app, dictPars, new skyboxcubescene.SkyBoxCubeScene(gl), 70);
        mta1.scene.texture = mta1.skyboxtexture; // background texture is needed for reflection
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation1")) != undefined)
        initScene(gl, app, dictPars, new rotatingcubescene.MixedTextureScene(gl), 70);
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation3")) != undefined)
        initScene(gl, app, dictPars, new lightscene.LightScene(gl), 70);
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation0")) != undefined)
        initScene(gl, app, dictPars, new skyboxscene.SkyBoxScene(gl, dictPars), 70);
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation5")) != undefined)
        initScene(gl, app, dictPars, new manytexturescene.ManyTexturesScene(gl), 70);
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation6")) != undefined)
        initScene(gl, app, dictPars, new objectlistscene.ObjectListScene(gl), 70);
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation7")) != undefined)
        initScene(gl, app, dictPars, new drawinstancedscene.DrawInstancedScene(gl), 70);
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation8")) != undefined)
        initScene(gl, app, dictPars, new canvas3dtexturescene.Canvas3dTextureScene(gl), 70);
    //--- Animations with a specific parameter set based on baseapp ------------------------------------------------------------------------------------------------------------------
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("drawimagespace")) != undefined) {
        var ims = new drawimagespace.drawimagespace(gl, app, dictPars, cdiv);
        console.log("imscreated.");
        ims.main(gl, dictPars);
        console.log("ins.main done.");
        ims.initGUI({ move: false, teal: true, speed: 0.4, texture: 'geotriangle2', color0: "#D0A010" });
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("whalesapp")) != undefined) {
        var sk = new skeleton.Skeleton(gl, app, dictPars, cdiv);
        var baseapppars = { move: true, speed: 0.4, color0: "#A0A0A0" };
        sk.initGUI({ move: false, movetail: true, speed: 0.06, texture: "zelenskyy", color0: "#afb9af" });
        sk.main(gl, dictPars);
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("variousfishapp")) != undefined) {
        var fa = new fishanimation.FishAnimation(gl, app, dictPars, cdiv);
        var baseapppars = { move: true, speed: 0.4, color0: "#A0A0A0" };
        fa.initGUI({ b: baseapppars, movetail: true, texture: 'geotriangle2', sling: 117 });
        fa.main(gl, dictPars);
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("whales")) != undefined) {
        initScene(gl, app, dictPars, new skeletonscene.SkeletonScene(gl, app, dictPars, "c"), 70);
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("variousfish")) != undefined) {
        initScene(gl, app, dictPars, new fishanimationscene.FishAnimationScene(gl, app, dictPars, "c"), 70);
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("skyboxcube")) != undefined) {
        var sbc = new skyboxcube.skyboxcube(gl, app, dictPars, cdiv);
        sbc.main(gl, dictPars);
        sbc.initGUI({ movecube: false, moveenv: false, fieldOfViewDegrees: 32, radiusCam: 5.0, angVelocityCam: 0.005, angVelocityCube: 0.003 });
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("canvas3dtexture")) != undefined) {
        var mtat = new canvas3dtexture.Canvas3dTexture();
        mtat.main(gl);
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("objectlist")) != undefined) {
        var mtao = new objectlist.ObjectList();
        mtao.main(gl);
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("drawinstanced")) != undefined) {
        var mtai = new drawinstanced.DrawInstanced();
        mtai.main(gl);
    }
    //--------------------------------------------------------------------------------------------------
    else // any other, take first argument as OBJ/MTL to show
     {
        initScene(gl, app, dictPars, new matobjscene.MatObjScene(gl, app, dictPars), 170);
        document.getElementById("gridcells").style.gridTemplateRows = "170px";
        //var oi = new objmtlimportapp.MatObjApp(gl, app, dictPars!);
        //  oi.main(gl, dictPars!);
        //  oi.initGUI({ move: false,  speed: 0,  texture: '', color0: "#9cbbcd" });
    }
}
//=== ENTRY MAIN ===============================================================================================================================
function main() {
    // var canvas: HTMLCanvasElement = document.querySelector("#c")!;
    var canvas = document.querySelector("#c");
    var gl = canvas.getContext("webgl2", { premultipliedAlpha: false }); //, preserveDrawingBuffer: true}); // { preserveDrawingBuffer: true }); //,{ premultipliedAlpha: false, powerPreference: 'high-performance' } );
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
//# sourceMappingURL=indexAnimations.js.map