import * as mtls from "./mouselistener";   // connect events for mouse and mouse wheel

import * as skeleton from "./skeleton"     // read geometry from .obj / .mtl files
import * as fish from "./fishanimation"     // read geometry from .obj / .mtl files

import * as manytextures from "./manytextures" // camera projection

import { ObjMtlImport } from "./objmtlimport.js";

const ShowOBJMTL = 1;
const ShowTextures  = 2;
const ShowTriangleBone = 3;
const ShowFish = 4; 

var selectedShow = ShowFish;

//-----------------------------------------------------------------------------------------

var dictPars: Map<string,string> | undefined;

function GetUrlPars(s: string, dictPars: Map<string,string>)
{
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
  return dictPars; 
}

function main() 
{
  var s = window.location.href;
  if (s.includes("?"))
  {
    console.log("url parameters "+s);
    dictPars = GetUrlPars(s, new Map<string,string>());
  }
  if (dictPars == undefined) console.log("No arguments");
    else dictPars.forEach((value: string, key: string) => { console.log("UrlPars key="+key+" value="+value); });

  // == Canvas and mouse

  const canvas: HTMLCanvasElement = document.querySelector("#c")!;
  var app: mtls.MouseListener | undefined;
  function OnMouseWheel(eventstring: string)
  { (document.getElementById('app') as HTMLDivElement).innerHTML = "mousewheel: ["+eventstring+"]"; }
  function OnMouseMove(eventstring: string)
  { // (document.getElementById('comment') as HTMLDivElement).innerHTML = "mousemove: ["+eventstring+"]"; 
  }
  function OnMouseDown(eventstring: string)
  { (document.getElementById('app') as HTMLDivElement).innerHTML = "mousedown: ["+eventstring+"]"; }
  function OnMouseUp(eventstring: string)
  { (document.getElementById('app') as HTMLDivElement).innerHTML = "mouseup: ["+eventstring+"] "; }
    
  if (canvas)
  {
    app = new mtls.MouseListener(canvas);
    app.OnMouseWheel = OnMouseWheel;
    app.OnMouseMove = OnMouseMove;
    app.OnMouseDown = OnMouseDown;
    app.OnMouseUp = OnMouseUp;
  }

  //== WebGL2

  const gl = canvas.getContext("webgl2")!; // allow for vs300 shaders

  //== dispatch to class

  if (dictPars?.get("textures")!=undefined)
  {
    new manytextures.ManyTextures(gl, app, dictPars);
    return;
  } else
  if (dictPars?.get("skeleton")!=undefined)
  {
    new skeleton.Skeleton(gl, app, dictPars!);
    return;
  } else if (dictPars?.get("fish")!=undefined)
  {  
    new fish.FishAnimation(gl, app, dictPars!);
    return;
  } else
  if (dictPars==undefined)
  {  
    dictPars = new Map<string,string>();
      
    switch (selectedShow)
    {
      case ShowTriangleBone:
      case ShowFish:
      {
       dictPars?.set("radius0","60");
       dictPars?.set("mesh","strip");
       dictPars?.set("hx","1.2");
       dictPars?.set("hy","0.1");
       dictPars?.set("stride","180");
       dictPars?.set("numrows","39");
       console.log("run default skeleton "+dictPars);
       if (selectedShow==ShowFish) new fish.FishAnimation(gl, app, dictPars); 
         else new skeleton.Skeleton(gl, app, dictPars!);
       return; 
     }

     case ShowTextures:
     {
        dictPars?.set("textures","");
        new manytextures.ManyTextures(gl, app, dictPars);
        return;
     }

     case ShowOBJMTL:
     {
        console.log("no entries");
        //show building index.html?building&radius0=45&hx=-0.68&hy=0.47&hxl=-0.61&difflight=1&speclight=0
        dictPars?.set("building","");
        dictPars?.set("radius0","45");
        dictPars?.set("hx","-0.68");
        dictPars?.set("hy","0.47");
        dictPars?.set("hxl","-0.61");
        dictPars?.set("difflight","0.5");
        dictPars?.set("speclight","0.5"); 
        new ObjMtlImport(gl, app, dictPars);
        return;
     }
      default: return;
    }
  } else {
    new ObjMtlImport(gl, app, dictPars);
    return;


  }
}

main();