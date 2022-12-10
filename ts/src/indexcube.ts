//==================================================================================================================================

import * as mtls from "./mouselistener";   // connect events for mouse and mouse wheel

import * as skeleton from "./skeleton"             // task: bone model (single)
import * as fish from "./fishanimation"            // task: bone model (flock)
import * as manytextures from "./manytextures"     // task: camera projection
import * as drawimagespace from "./drawimagespace" // task: image space texture
import * as skybox from "./skybox" // task: image space texture
import * as animation1 from "./animation1" // task: image space texture
//import * as animation2 from "./animation2" // task: image space texture
import * as skyboxcube from "./skyboxcube"         // task: show reflecting box
import * as objmtlimport from "./objmtlimport.js"; // task: obj/mtl file imports
import * as rotatingcubescene from "./rotatingcubescene";
import * as lightedscene from "./lightedscene";

const ShowOBJMTL     = 1;
const ShowTextures   = 2;
const ShowFish       = 3; 
const ShowSkyBox     = 4; 
const ShowAnimation1 = 5; 

var selectedShow    = ShowAnimation1;

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

          case ShowSkyBox:
            {
              console.log("Skybox");
              dictPars.set("skybox","");
              dictPars.set("radius0","60");
              dictPars.set("mesh","strip");
              dictPars.set("hx","1.2");
              dictPars.set("hy","0.1");
              dictPars.set("stride","180");
              dictPars.set("numrows","39");
              break;
            }

        case ShowTextures:
          {
            console.log("ShowTextures");
            dictPars.set("textures","");
            break; 
          }

        case ShowAnimation1:
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

function show(gl: WebGL2RenderingContext, app: mtls.MouseListener, dictPars: Map<string,string> | undefined  )
{
 
  // perform show
  if (dictPars?.get("drawimagespace")!=undefined)
  {
    var ims = new drawimagespace.drawimagespace(gl,app,dictPars); 
    console.log("imscreated.");
    ims.main(gl,dictPars);
    console.log("ins.main done.");
    ims.initGUI({ move: false, teal: true, speed: 0.4, texture: 'geotriangle2',color0: "#D0A010"  }); 
  } 
  else  if (dictPars?.get("animation1")!=undefined)
  {
    var mta1 = new animation1.Animation1(gl, app, new rotatingcubescene.RotatingCubeScene(), dictPars);
    mta1.main(gl, dictPars);
    var baseapppars = {move: false, movetail: true, speed: 0.01, color0:"#A0A0A0"};
    mta1.initGUI({ b: baseapppars, texture: 'geotriangle2',  sling:117 });
  } 
  else  if (dictPars?.get("animation2")!=undefined)
  {
    var mta1 = new animation1.Animation1(gl, app, new lightedscene.LightedScene(), dictPars);
    mta1.main(gl, dictPars);
    var baseapppars = {move: false, movetail: true, speed: 0.01, color0:"#A0A0A0"};
    mta1.initGUI({ b: baseapppars, texture: 'geotriangle2',  sling:117 });

  /*  var mta2 = new animation2.Animation2(gl, app, dictPars);
    mta2.main(gl, dictPars);
    var baseapppars = {move: false, movetail: true, speed: 0.01, color0:"#A0A0A0"};
    //mta2.initGUI({ b: baseapppars, texture: 'geotriangle2',  sling:117 });
    */
  } 
  else  if (dictPars?.get("textures")!=undefined)
  {
    var mt = new manytextures.ManyTextures(gl, app, dictPars);
    mt.main(gl, dictPars);
    mt.initGUI({ move: true,speed: 0.4,texture: 'geotriangle2', color0: "#A0A0A0",});
  } 
  else if (dictPars?.get("skeleton")!=undefined)
  {
    var sk = new skeleton.Skeleton(gl, app, dictPars!);
    sk.main(gl, dictPars);
    sk.initGUI({move:false,movetail:true, speed:0.06,texture:"zelenskyy",color0:"#afb9af" });
  } 
  else if (dictPars?.get("fish")!=undefined)
  {  
    var fa = new fish.FishAnimation(gl, app, dictPars!);
    fa.main(gl, dictPars);
    var baseapppars = {move: true, movetail: true, speed: 0.4, color0:"#A0A0A0"};
   
    fa.initGUI({ b: baseapppars, texture: 'geotriangle2',  sling:117 });
  } 
  else if (dictPars?.get("skyboxcube")!=undefined)
  {  
    var sbc  = new skyboxcube.skyboxcube(gl,app,dictPars); 
    sbc.main(gl, dictPars);
    sbc.initGUI({movecube:true, moveenv:true, fieldOfViewDegrees:32, radiusCam:5.0, angVelocityCam:0.005, angVelocityCube:0.003 });
  } 
  else if (dictPars?.get("skybox")!=undefined)
  {  
    var sb  = new skybox.skybox(gl,app,dictPars); 
    sb.initGUI({movecube:false, moveenv:false, fieldOfViewDegrees:32, radiusCam:5.0, angVelocityCam:0.005, angVelocityCube:0.003 });
    sb.main(gl,dictPars);
  } 
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
  var canvas: HTMLCanvasElement = document.querySelector("#c")!;
 // const gl = someCanvas.getContext('webgl', {powerPreference: 'high-performance'});
  var gl: WebGL2RenderingContext|null = canvas.getContext("webgl2",{ premultipliedAlpha: false, powerPreference: 'high-performance' } );
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