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
const mtls = __importStar(require("./baseapp/mouselistener")); // baseapp connects events for mouse click, move and wheel to an app object
const twgl = __importStar(require("twgl.js"));
const skyboxcube = __importStar(require("./others/skyboxcube")); // baseapp derivative: show reflecting cube in skybox
const objectlist = __importStar(require("./others/objectlist")); // baseapp derivative: show bouncing guy node tree
const drawinstanced = __importStar(require("./others/drawinstanced")); // baseapp derivative: show texture space navigator
const canvas3dtexture = __importStar(require("./others/canvas3dtexture")); // baseapp derivative: show 3d on texture
const skeleton = __importStar(require("./others/skeleton")); // baseapp derivative: bone model (single object)
const fishanimation = __importStar(require("./others/fishanimation")); // baseapp derivative: bone model (multiple objects)
const drawimagespace = __importStar(require("./others/drawimagespace")); // baseapp derivative: image space texture
const animation2 = __importStar(require("./animation2")); // baseapp derivative: scene container
const manytexturescene = __importStar(require("./scene/manytexturescene")); // scene: many textures / objects
const rotatingcubescene = __importStar(require("./scene/mixedtexturescene")); // scene: two textures alpha-mixed
const lightscene = __importStar(require("./scene/lightscene")); // scene: lights directed, point, spot
const objectlistscene = __importStar(require("./scene/objectlistscene")); // scene: show bouncing guy node tree
const canvas3dtexturescene = __importStar(require("./scene/canvas3dtexturescene")); // scene: show 3d on texture
const canvas3dtexturescene2 = __importStar(require("./scene/canvas3dtexturescene2")); // scene: show 3d on texture
const drawinstancedscene = __importStar(require("./scene/drawinstancedscene")); // scene: show texture space navigator
const clothsimscene = __importStar(require("./scene/clothsimscene")); // scene: show texture space navigator
const skyboxcubescene = __importStar(require("./scene/skyboxcubescene")); // scene: show reflecting cube in skybox
const matobjscene = __importStar(require("./scene/matobjscene")); // scene: show textured objects from .obj/.mtl
const skeletonscene = __importStar(require("./scene/skeletonscene")); // scene: bone model (single object)
const fishanimationscene = __importStar(require("./scene/fishanimationscene")); // scene: bone model (multiple objects)
const clothsim = __importStar(require("./cloth/clothsim"));
var cdiv = 'c'; // name of canvas accessed by gl
var baseappParameters = { gravity: 0.02, move: true, speed: 0.01, color0: "#A0A0A0", texture: 'geotriangle2', fov: 60, movetail: true, typelight: 'point light', sling: 117, shininess: 11.0 };
//=== DEFAULT ANIMATIONS  =================================================================================================================
const ShowOBJMTL = 1;
const ShowFish = 3;
const ShowAnimation1 = 5;
var selectedShow = ShowFish; // default animation
function preparedefaultparameters(dictPars) {
    switch (selectedShow) {
        case ShowFish:
            {
                console.log("variousfish");
                dictPars.set("variousfish", "");
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
//--- DISPATCH SHOW DEPENDING ON URL ARGUMENT ----------------------------------------------------------------------------------------------------------------
function showScenesAnimation(gl, app, dictPars, scenes, heighttop) {
    document.getElementById("gridcells").style.gridTemplateRows = heighttop + "px";
    var mta1 = new animation2.Animation2(gl, app, scenes, dictPars, cdiv);
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("cloth")) != undefined)
        baseappParameters["color0"] = "#f2f0f0";
    mta1.main(gl, dictPars);
    if (scenes[0].sceneenv < 0)
        mta1.doShowBackgroundColorChoice = true;
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("backcolorchoice")) != undefined)
        mta1.doShowBackgroundColorChoice = ((+(dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("backcolorchoice"))) > 0);
    mta1.initGUI(baseappParameters, 0);
    return mta1;
}
function showBaseAppAnimation(gl, app, dictPars) {
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("drawimagespace")) != undefined) {
        var ims = new drawimagespace.drawimagespace(gl, app, dictPars, cdiv);
        console.log("imscreated.");
        ims.main(gl, dictPars);
        console.log("ins.main done.");
        ims.initGUI({ move: false, teal: true, speed: 0.4, texture: 'geotriangle2', color0: "#D0A010" });
        return ims;
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("whalesapp")) != undefined) {
        var sk = new skeleton.Skeleton(gl, app, dictPars, cdiv);
        //var baseapppars = {move: true, speed: 0.4, texture:"zelenskyy",fov:number,color0:"#A0A0A0"};
        //sk.initGUI({b: baseapppars, move:false,movetail:true, speed:0.06,color0:"#afb9af" });
        sk.initGUI(baseappParameters);
        sk.main(gl, dictPars);
        return sk;
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("variousfishapp")) != undefined) {
        var fa = new fishanimation.FishAnimation(gl, app, dictPars, cdiv);
        var baseapppars1 = { move: true, speed: 0.4, color0: "#A0A0A0", texture: 'geotriangle2', fov: 60 };
        fa.initGUI(baseappParameters);
        fa.main(gl, dictPars);
        return fa;
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("skyboxcube")) != undefined) {
        var sbc = new skyboxcube.skyboxcube(gl, app, dictPars, cdiv);
        sbc.main(gl, dictPars);
        sbc.initGUI({ movecube: false, moveenv: false, fieldOfViewDegrees: 32, radiusCam: 5.0, angVelocityCam: 0.005, angVelocityCube: 0.003 });
        return sbc;
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("cloth")) != undefined) {
        let accuracy = 5;
        let gravity = 0.02;
        let friction = 0.99;
        let bounce = 0.5;
        var clothSim = new clothsim.ClothSim(gl, app, dictPars, gl.POINTS, accuracy, gravity, friction, bounce);
        clothSim.main();
        return clothSim;
    }
    return undefined;
}
function showOtherAnimations(gl, app, dictPars) {
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("canvas3dtexture")) != undefined) {
        var mtat = new canvas3dtexture.Canvas3dTexture();
        mtat.main(gl);
        return true;
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("objectlist")) != undefined) {
        var mtao = new objectlist.ObjectList();
        mtao.main(gl);
        return true;
    }
    else if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("drawinstanced")) != undefined) {
        var mtai = new drawinstanced.DrawInstanced();
        mtai.main(gl);
        return true;
    }
    return false;
}
function show(gl, app, dictPars) {
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation4")) != undefined) // Sky Cube scene (requires copying the background texture for display as reflection !)
     {
        var mta1 = showScenesAnimation(gl, app, dictPars, [new skyboxcubescene.SkyBoxCubeScene(gl)], 70);
        mta1.scene[0].texture = mta1.skyboxtexture;
        return mta1;
    }
    let friction = 0.99;
    let bounce = 0.5;
    var a;
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("cloth")) != undefined)
        a = [new clothsimscene.ClothSimScene(gl, app, dictPars, gl.POINTS, 5, friction, bounce)];
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation7")) != undefined)
        a = [new objectlistscene.ObjectListScene(gl), new matobjscene.MatObjScene(gl, app, dictPars)];
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation3")) != undefined)
        a = [new canvas3dtexturescene.Canvas3dTextureScene(gl), new lightscene.LightScene(gl)];
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation1")) != undefined)
        a = [new rotatingcubescene.MixedTextureScene(gl), new drawinstancedscene.DrawInstancedScene(gl)];
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation2")) != undefined)
        a = [new canvas3dtexturescene.Canvas3dTextureScene(gl), new objectlistscene.ObjectListScene(gl)];
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("whales")) != undefined)
        a = [new skeletonscene.SkeletonScene(gl), new fishanimationscene.FishAnimationScene(gl)];
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation5")) != undefined)
        a = [new manytexturescene.ManyTexturesScene(gl)];
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation4")) != undefined)
        a = [new skyboxcubescene.SkyBoxCubeScene(gl)];
    if ((dictPars === null || dictPars === void 0 ? void 0 : dictPars.get("animation9")) != undefined)
        a = [new canvas3dtexturescene.Canvas3dTextureScene(gl), new canvas3dtexturescene2.Canvas3dTextureScene2(gl)];
    if (a != undefined)
        return showScenesAnimation(gl, app, dictPars, a, 70);
    else {
        var rv = showBaseAppAnimation(gl, app, dictPars);
        if (rv)
            return rv;
        if (!showOtherAnimations(gl, app, dictPars)) {
            return showScenesAnimation(gl, app, dictPars, [new matobjscene.MatObjScene(gl, app, dictPars)], 170);
        }
        return undefined;
    }
}
//=== ENTRY MAIN ===============================================================================================================================
function main() {
    // var canvas: HTMLCanvasElement = document.querySelector("#c")!;
    var canvas = document.querySelector("#c");
    twgl.resizeCanvasToDisplaySize(canvas, 1.0);
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