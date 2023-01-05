import * as mtls from "./baseapp/mouselistener";                       // app: connect events for mouse and mouse wheel

import * as objmtlimport from "./objreader/objmtlimport.js";           // main: obj/mtl file imports

import * as drawimagespace from "./others/drawimagespace"                     // baseapp derivative: image space texture
import * as animation1 from "./animation1"                             // baseapp derivative: scene container
import * as skyboxcube from "./others/skyboxcube"                             // baseapp derivative: show reflecting cube in skybox
import * as objectlist from "./others/objectlist";                            // baseapp derivative: show bouncing guy node tree
import * as drawinstanced from "./others/drawinstanced";                      // baseapp derivative: show texture space navigator
import * as canvas3dtexture from "./others/canvas3dtexture";                  // baseapp derivative: show 3d on texture

import * as skeleton from "./bonemodel/skeleton"                       // baseapp derivative: bone model (single)
import * as fish from "./bonemodel/fishanimation"                      // baseapp derivative: bone model (flock)

import * as scene from "./scene/scene";                                // scene: interface to implement
import * as manytexturescene from "./scene/manytexturescene"           // scene: many textures / objects
import * as rotatingcubescene from "./scene/mixedtexturescene";        // scene: two textures alpha-mixed
import * as lightscene from "./scene/lightscene";                      // scene: lights directed, point, spot
import * as objectlistscene from "./scene/objectlistscene";            // scene: show bouncing guy node tree
import * as canvas3dtexturescene from "./scene/canvas3dtexturescene";  // scene: show 3d on texture
import * as drawinstancedscene from "./scene/drawinstancedscene";      // scene: show texture space navigator
import * as skyboxscene from "./scene/skyboxscene";                    // scene: show skybox only (empty scene)
import * as skyboxcubescene from "./scene/skyboxcubescene";            // scene: show reflecting cube in skybox
import { BaseApp } from "./baseapp/baseapp";

const ShowOBJMTL     = 1;
const ShowFish       = 3; 
const ShowAnimation1 = 5; 

var selectedShow    = ShowAnimation1;

var cdiv = 'c';  // name of canvas accessed by gl

//=== DISPATCH TASKS =================================================================================================================

function preparedefaultparameters(dictPars: Map<string,string>)
{
  switch (selectedShow)
  {
        case ShowFish:
          {
            console.log("ShowFish");
            dictPars.set("fish","");
            dictPars.set("radius0","90");
            dictPars.set("mesh","strip");
            dictPars.set("hx","1.2");
            dictPars.set("hy","0.1");
            dictPars.set("stride","180");
            dictPars.set("numrows","39");
            break;
          }

        case ShowAnimation1:
          {
            dictPars.set("animation8","");
            dictPars.set("radius0","4");
            dictPars.set("hx","-0.06");
            dictPars.set("hy","0.47");
            break;
          }
        case ShowOBJMTL:
          {
            dictPars.set("radius0","45");
            dictPars.set("hx","-0.68");
            dictPars.set("hy","0.47");
            dictPars.set("hxl","-0.61");
            dictPars.set("difflight","0.5");
            dictPars.set("speclight","0.5"); 
            break;
          }
        default: return;
  }
}

var baseapppars = {move: true, speed: 0.01, color0:"#A0A0A0"};
var defaultParameters: scene.TAnimation1Parameters = { b: baseapppars, movetail: true, texture: 'geotriangle2',typelight:'point light',  sling:117,  shininess:11.0, fov: 60 };
 
function initScene(gl: WebGL2RenderingContext, app: mtls.MouseListener, dictPars: Map<string,string> | undefined, scene: scene.SceneInterface ): animation1.Animation1
{
  var mta1 = new animation1.Animation1(gl, app, scene, dictPars!, cdiv);
  mta1.main(gl, dictPars!);
  mta1.initGUI(defaultParameters);
  return mta1;
}

function show(gl: WebGL2RenderingContext, app: mtls.MouseListener, dictPars: Map<string,string> | undefined  )
{
  // Default parameters for all Animation1 scenes
 
  //--- Scene animations using Animation1 ----------------------------------------------------------------------------------------------------------------------------------

  if (dictPars?.get("animation4")!=undefined)
   {
     var mta1 = initScene(gl, app, dictPars, new skyboxcubescene.SkyBoxCubeScene(gl));
     (mta1.scene as skyboxcubescene.SkyBoxCubeScene).texture=mta1.texture!; // background texture is needed for reflection
   } 
  else if (dictPars?.get("animation1")!=undefined) initScene(gl, app, dictPars, new rotatingcubescene.MixedTextureScene(gl));
  else if (dictPars?.get("animation3")!=undefined) initScene(gl, app, dictPars, new lightscene.LightScene(gl)); 
  else if (dictPars?.get("animation0")!=undefined) initScene(gl, app, dictPars, new skyboxscene.SkyBoxScene(gl,dictPars)); 
  else if (dictPars?.get("animation5")!=undefined) initScene(gl, app, dictPars, new manytexturescene.ManyTexturesScene(gl)); 
  else if (dictPars?.get("animation6")!=undefined) initScene(gl, app, dictPars, new objectlistscene.ObjectListScene(gl)); 
  else if (dictPars?.get("animation7")!=undefined) initScene(gl, app, dictPars, new drawinstancedscene.DrawInstancedScene(gl)); 
  else if (dictPars?.get("animation8")!=undefined) initScene(gl, app, dictPars, new canvas3dtexturescene.Canvas3dTextureScene(gl)); 
 
  //--- Animations with a specific parameter set based on baseapp ------------------------------------------------------------------------------------------------------------------
  
  else 
  if (dictPars?.get("drawimagespace")!=undefined)
  {
    var ims = new drawimagespace.drawimagespace(gl,app,dictPars,cdiv); 
    console.log("imscreated.");
    ims.main(gl,dictPars);
    console.log("ins.main done.");
    ims.initGUI({ move: false, teal: true, speed: 0.4, texture: 'geotriangle2',color0: "#D0A010"  }); 
  } 
  else  if (dictPars?.get("skeleton")!=undefined)
  {
    var sk = new skeleton.Skeleton(gl, app, dictPars!, cdiv);
    var baseapppars = {move: true, speed: 0.4, color0:"#A0A0A0"};
    sk.initGUI({move:false,movetail:true, speed:0.06,texture:"zelenskyy",color0:"#afb9af" });
    sk.main(gl, dictPars);
  } 
  else if (dictPars?.get("fish")!=undefined)
  {  
    var fa = new fish.FishAnimation(gl, app, dictPars!, cdiv);
    var baseapppars = {move: true, speed: 0.4, color0:"#A0A0A0"};
    fa.initGUI({ b: baseapppars, movetail: true, texture: 'geotriangle2',  sling:117 });
    fa.main(gl, dictPars);
  } 
  else if (dictPars?.get("skyboxcube")!=undefined)
  {  
    var sbc  = new skyboxcube.skyboxcube(gl,app,dictPars, cdiv); 
    sbc.main(gl, dictPars);
    sbc.initGUI({movecube:false, moveenv:false, fieldOfViewDegrees:32, radiusCam:5.0, angVelocityCam:0.005, angVelocityCube:0.003 });
  } 
   else
   if(dictPars?.get("canvas3dtexture")!=undefined)
   {
     var mtat = new canvas3dtexture.Canvas3dTexture();
     mtat.main(gl);
   }
   else if (dictPars?.get("objectlist")!=undefined)
   {
     var mtao = new objectlist.ObjectList();
     mtao.main(gl);
   } 
   else if (dictPars?.get("drawinstanced")!=undefined)
   {
     var mtai = new drawinstanced.DrawInstanced();
     mtai.main(gl);
   } 
  //--------------------------------------------------------------------------------------------------
  else  // any other, take first argument as OBJ/MTL to show
  {
    var oi = new objmtlimport.ObjMtlImport(gl, app, dictPars!);
    oi.main(gl, dictPars!);
    oi.initGUI({ move: false,  speed: 0,  texture: '', color0: "#9cbbcd" });
  }      
}

//=== ENTRY MAIN ===============================================================================================================================

function main() 
{   
 // var canvas: HTMLCanvasElement = document.querySelector("#c")!;
  var canvas: HTMLCanvasElement = document.querySelector("#c")!;
  var gl: WebGL2RenderingContext|null = canvas.getContext("webgl2", {premultipliedAlpha: false });//, preserveDrawingBuffer: true}); // { preserveDrawingBuffer: true }); //,{ premultipliedAlpha: false, powerPreference: 'high-performance' } );
  if (canvas && gl)
  {
    var app: mtls.MouseListener | undefined; 
    var dictPars: Map<string,string> |undefined;
    var s = window.location.href;
    if (s.includes("?"))
    {
      // == fetch URL arguments
      dictPars = new Map<string,string>();
      var p = s.indexOf("?");
      var spar = s.substring(p+1),ppar="", cpar="";
      while (spar.indexOf("&")>0)
          {
            ppar = spar.substring(0,spar.indexOf("&"));
            var pp=ppar.indexOf("=");
            if (pp>=0)
            {
              cpar = ppar.substring(0,pp);
              ppar = ppar.substring(1+pp);
              dictPars.set(cpar,ppar);
            }
            else dictPars.set(ppar,"");
            spar = spar.substring(spar.indexOf("&")+1);
          }
      p = spar.indexOf("=");
      if (p>=0) 
        { 
          cpar=spar.substring(0,p);       
          ppar=spar.substring(1+p); 
          dictPars.set(cpar,ppar);
        } else dictPars.set(spar,"");  
    }    
    if (dictPars==undefined) // in case URL arguments, prepare the show parameters
    {  
      console.log("No URL arguments, prepare defaults for "+ selectedShow);
      preparedefaultparameters(dictPars= new Map<string,string>());
    }
    // report parameters set
    dictPars.forEach((value: string, key: string) => { console.log("UrlPars key="+key+" value="+value); });

    // context found, create app connecting canvas with default mouse listeners
    app = new mtls.MouseListener(canvas);
    app.OnMouseWheel = (eventstring: string ) =>  { (document.getElementById('app') as HTMLDivElement).innerHTML = "mousewheel: ["+eventstring+"]"; };
    app.OnMouseMove =  (eventstring: string ) =>  { (document.getElementById('comment') as HTMLDivElement).innerHTML = "mousemove: ["+eventstring+"]"; };
    app.OnMouseDown =  (eventstring: string ) =>  { (document.getElementById('app') as HTMLDivElement).innerHTML = "mousedown: ["+eventstring+"]"; };
    app.OnMouseUp =  (eventstring: string )   =>  { (document.getElementById('app') as HTMLDivElement).innerHTML = "mouseup: ["+eventstring+"] "; }

    show(gl, app, dictPars);  // LAUNCH
  }
}

main();