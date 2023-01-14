import * as baseapp from "./baseapp/baseapp"                           // baseapp providing environment skybox
import * as mtls from "./baseapp/mouselistener";                       // baseapp connects events for mouse click, move and wheel to an app object
import * as twgl from "twgl.js"; 

import * as skyboxcube from "./others/skyboxcube"                      // baseapp derivative: show reflecting cube in skybox
import * as objectlist from "./others/objectlist";                     // baseapp derivative: show bouncing guy node tree
import * as drawinstanced from "./others/drawinstanced";               // baseapp derivative: show texture space navigator
import * as canvas3dtexture from "./others/canvas3dtexture";           // baseapp derivative: show 3d on texture
import * as skeleton from "./others/skeleton"                          // baseapp derivative: bone model (single object)
import * as fishanimation from "./others/fishanimation"                // baseapp derivative: bone model (multiple objects)
import * as drawimagespace from "./others/drawimagespace"              // baseapp derivative: image space texture

import * as animation1 from "./animation1"                             // baseapp derivative: scene container
import * as animation2 from "./animation2"                             // baseapp derivative: scene container

import * as scene from "./scene/scene";                                // interface to implement for scenes

import * as skyboxscene from "./scene/skyboxscene";                    // scene: show skybox only (empty scene)
import * as manytexturescene from "./scene/manytexturescene"           // scene: many textures / objects
import * as rotatingcubescene from "./scene/mixedtexturescene";        // scene: two textures alpha-mixed
import * as lightscene from "./scene/lightscene";                      // scene: lights directed, point, spot
import * as objectlistscene from "./scene/objectlistscene";            // scene: show bouncing guy node tree
import * as canvas3dtexturescene from "./scene/canvas3dtexturescene";  // scene: show 3d on texture
import * as canvas3dtexturescene2 from "./scene/canvas3dtexturescene2";  // scene: show 3d on texture
import * as drawinstancedscene from "./scene/drawinstancedscene";      // scene: show texture space navigator
import * as clothsimscene from "./scene/clothsimscene";      // scene: show texture space navigator
import * as skyboxcubescene from "./scene/skyboxcubescene";            // scene: show reflecting cube in skybox
import * as matobjscene from "./scene/matobjscene";                    // scene: show textured objects from .obj/.mtl
import * as skeletonscene from "./scene/skeletonscene"                 // scene: bone model (single object)
import * as fishanimationscene from "./scene/fishanimationscene"       // scene: bone model (multiple objects)

import * as clothsim from "./cloth/clothsim"

var cdiv = 'c';  // name of canvas accessed by gl

var baseappParameters: baseapp.TAnimation1Parameters = { gravity: 0.02, move: true, speed: 0.01, color0:"#A0A0A0", texture: 'geotriangle2', fov: 60, movetail: true, typelight:'point light',  sling:117, shininess:11.0 };

//=== DEFAULT ANIMATIONS  =================================================================================================================

const ShowOBJMTL     = 1;
const ShowFish       = 3; 
const ShowAnimation1 = 5; 

var selectedShow    = ShowFish; // default animation

function preparedefaultparameters(dictPars: Map<string,string>)
{
  switch (selectedShow)
  {
        case ShowFish:
          {
            console.log("variousfish");
            dictPars.set("variousfish","");
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

//--- DISPATCH SHOW DEPENDING ON URL ARGUMENT ----------------------------------------------------------------------------------------------------------------

function showScenesAnimation(gl: WebGL2RenderingContext, app: mtls.MouseListener, dictPars: Map<string,string> | undefined, scenes: scene.SceneInterface[], heighttop: number): animation2.Animation2
{
  document.getElementById("gridcells")!.style.gridTemplateRows = heighttop+"px";
   
  var mta1 = new animation2.Animation2(gl, app, scenes, dictPars!, cdiv);
 if (dictPars?.get("cloth")!=undefined) baseappParameters["color0"]="#f2f0f0";
  
  mta1.main(gl, dictPars!);
  if (scenes[0].sceneenv<0)  mta1.doShowBackgroundColorChoice = true;
    else if (dictPars?.get("backcolorchoice")!=undefined) mta1.doShowBackgroundColorChoice = ((+dictPars?.get("backcolorchoice")!)>0);
  mta1.initGUI(baseappParameters,0);
  return mta1;
}

function showBaseAppAnimation( gl: WebGL2RenderingContext, app: mtls.MouseListener,dictPars: Map<string,string> | undefined ): baseapp.BaseApp | undefined
{
    if (dictPars?.get("drawimagespace")!=undefined)
    {
      var ims = new drawimagespace.drawimagespace(gl,app,dictPars,cdiv); 
      console.log("imscreated.");
      ims.main(gl,dictPars);
      console.log("ins.main done.");
      ims.initGUI({ move: false, teal: true, speed: 0.4, texture: 'geotriangle2',color0: "#D0A010"  }); 
      return ims;
    } 
    else  if (dictPars?.get("whalesapp")!=undefined)
    {
      var sk = new skeleton.Skeleton(gl, app, dictPars!, cdiv);
      //var baseapppars = {move: true, speed: 0.4, texture:"zelenskyy",fov:number,color0:"#A0A0A0"};
      //sk.initGUI({b: baseapppars, move:false,movetail:true, speed:0.06,color0:"#afb9af" });
      sk.initGUI(baseappParameters);
      sk.main(gl, dictPars);
      return sk;
    } 
    else if (dictPars?.get("variousfishapp")!=undefined)
    {  
      var fa = new fishanimation.FishAnimation(gl, app, dictPars!, cdiv);
      var baseapppars1 = {move: true, speed: 0.4, color0:"#A0A0A0", texture: 'geotriangle2', fov:60};
      fa.initGUI(baseappParameters);
      fa.main(gl, dictPars);
      return  fa;
    }
    else if (dictPars?.get("skyboxcube")!=undefined)
    {  
      var sbc  = new skyboxcube.skyboxcube(gl,app,dictPars, cdiv); 
      sbc.main(gl, dictPars);
      sbc.initGUI({movecube:false, moveenv:false, fieldOfViewDegrees:32, radiusCam:5.0, angVelocityCam:0.005, angVelocityCube:0.003 });
      return sbc;
    } 
    else if (dictPars?.get("cloth")!=undefined)
    {
      let accuracy = 5;
      let gravity = 0.02;
      let friction = 0.99;
      let bounce = 0.5;
      var clothSim = new clothsim.ClothSim(gl,app,dictPars,gl.POINTS, accuracy,gravity,friction,bounce);
      clothSim.main();
      return clothSim;
    }
     return undefined;
  }

function showOtherAnimations( gl: WebGL2RenderingContext, app: mtls.MouseListener,dictPars: Map<string,string> | undefined ): boolean
{
 
  if(dictPars?.get("canvas3dtexture")!=undefined)
  {
    var mtat = new canvas3dtexture.Canvas3dTexture();
    mtat.main(gl);
    return true;
  }
  else if (dictPars?.get("objectlist")!=undefined)
  {
    var mtao = new objectlist.ObjectList();
    mtao.main(gl);
    return true;
  } 
  else if (dictPars?.get("drawinstanced")!=undefined)
  {
    var mtai = new drawinstanced.DrawInstanced();
    mtai.main(gl);
    return true;
  } 
  
  return false;
}

function show(gl: WebGL2RenderingContext, app: mtls.MouseListener, dictPars: Map<string,string> | undefined  ): baseapp.BaseApp | undefined
{
  if (dictPars?.get("animation4")!=undefined) // Sky Cube scene (requires copying the background texture for display as reflection !)
   {
     var mta1 = showScenesAnimation(gl, app, dictPars, [new skyboxcubescene.SkyBoxCubeScene(gl)],70);
     (mta1.scene[0] as skyboxcubescene.SkyBoxCubeScene).texture = mta1.skyboxtexture!;
     return mta1;
   }
   let friction = 0.99;
   let bounce = 0.5;
   var a: scene.SceneInterface[]|undefined;
   if (dictPars?.get("cloth")!=undefined) a = [new clothsimscene.ClothSimScene(gl,app,dictPars,gl.POINTS,5,friction,bounce)];
   if (dictPars?.get("animation7")!=undefined) a = [new objectlistscene.ObjectListScene(gl),new matobjscene.MatObjScene(gl, app, dictPars!)];
   if (dictPars?.get("animation3")!=undefined) a = [new canvas3dtexturescene.Canvas3dTextureScene(gl),new lightscene.LightScene(gl)];
   if (dictPars?.get("animation1")!=undefined) a = [new rotatingcubescene.MixedTextureScene(gl), new drawinstancedscene.DrawInstancedScene(gl)];
   if (dictPars?.get("animation2")!=undefined) a = [new canvas3dtexturescene.Canvas3dTextureScene(gl), new objectlistscene.ObjectListScene(gl)];
   if (dictPars?.get("whales")!=undefined) a = [new skeletonscene.SkeletonScene(gl),new fishanimationscene.FishAnimationScene(gl)];
   if (dictPars?.get("animation5")!=undefined) a = [new manytexturescene.ManyTexturesScene(gl)];
   if (dictPars?.get("animation4")!=undefined) a = [new skyboxcubescene.SkyBoxCubeScene(gl)];
   if (dictPars?.get("animation9")!=undefined) a = [ new canvas3dtexturescene.Canvas3dTextureScene(gl),new canvas3dtexturescene2.Canvas3dTextureScene2(gl)];
   if (a!=undefined) return showScenesAnimation(gl, app, dictPars, a, 70);
    else {
      var rv = showBaseAppAnimation( gl, app,dictPars );
      if (rv) return rv;
      if (!showOtherAnimations(gl, app, dictPars ))
      {
        return showScenesAnimation(gl, app, dictPars, [new matobjscene.MatObjScene(gl, app, dictPars!)],170); 
      }    
      return undefined;
    }
}

//=== ENTRY MAIN ===============================================================================================================================

function main() 
{   
 // var canvas: HTMLCanvasElement = document.querySelector("#c")!;
  var canvas: HTMLCanvasElement = document.querySelector("#c")!;
  twgl.resizeCanvasToDisplaySize(canvas  as HTMLCanvasElement,1.0);
   
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