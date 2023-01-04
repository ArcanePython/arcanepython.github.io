  // camera
 
  import * as twgl from "twgl.js";    // Greg's work
  import { m4 } from "twgl.js";

  import * as mtls from "./mouselistener";

  
  export class Camera
  {
    // camera
    target: number[] = [0,0,0];        // target of camera
    radius0 = 0.0;                     // camera distance, set at objectsize*2 when not in dictpar
    ahx = 0;                           // horizontal angle (hx)
    ahy = 0;                           // vertical angle (hy), for z-up this is actually hz
    fov:number=30.0;                   // field of view in degrees
    near: number=0.5;                  // near plane
    far: number=1000.0;                // far plane
    rotationVelocity = 0.012;          // mouse drag sensitivity for angle turns
    zoominVelocity = 1.0;                // mouse wheel sensitivity set at objectsize/40
    
    // lights
    ahorizlight = 3.0*Math.PI/2.0;     // light horizontal angle
    avertlight = Math.PI/4.0;          // light vertical angle
    lightpos: number[] = [8,8,20];
    difflightintensity: number = 0.9;
    speclightintensity: number = 0.9;

    // result state to pass to shader
    lookAt: m4.Mat4 = m4.identity();         // m4.lookAt(this.eye, this.target, this.up);
    viewProjection: m4.Mat4 = m4.identity();    // projection configured
      
    //----------------------------------------------------------------
    //local state

    private zaxis = [0,0,1];           // yaw axis
    private yaxis = [0,1,0];           // roll axis
    private up = [0, 1, 0];            // up vector (can be Z or Y)
    private radius = 0.0;              // distance of camera
    private eye: number[] = [-1,0,0];  // location of camera

    private myr: twgl.m4.Mat4 = m4.identity(); 
    private myrl: twgl.m4.Mat4 = m4.identity(); // light
    private projection:m4.Mat4 = m4.identity();
    private changelight = false;
    private changeeye = false;

    constructor( dictpar:Map<string,string>)
    { 
      {
        if (dictpar.get("radius0")!=undefined) this.radius0 = +dictpar.get("radius0")!;
        if (dictpar.get("hx")!=undefined) this.ahx = +dictpar.get("hx")!;
        if (dictpar.get("hy")!=undefined) this.ahy = +dictpar.get("hy")!;
        if (dictpar.get("hxl")!=undefined){ this.ahorizlight = +dictpar.get("hxl")!;this.changelight=true; }
        if (dictpar.get("hyl")!=undefined){ this.avertlight = +dictpar.get("hyl")!;this.changelight=true; }
        if (dictpar.get("difflight")!=undefined){ this.difflightintensity = +dictpar.get("difflight")!; this.changelight=true; }
        if (dictpar.get("speclight")!=undefined){ this.speclightintensity = +dictpar.get("speclight")!; this.changelight=true; }
      }
      this.radius = this.radius0;
      
    }
/*
    private static createYUpCamera(gl: WebGL2RenderingContext, dictpar: Map<string,string>, szobj: number, app: mtls.MouseListener)
    {
      var cam: Camera = new Camera(dictpar!);
      cam.zoominVelocity = szobj/20.0;
      if (cam.radius0==0) { cam.radius0 = 2.0*szobj; console.log("set cam.radius0 to 2*object size = "+cam.radius0); }
      cam.target = [0,0,0];
      cam.near = szobj/10.0;
      cam.far = 10.0*szobj;
      cam.setRadius(cam.radius0);
    
      cam.setYUpPerspective(gl,app);
      cam.setYUpEye();
      cam.setYUpLight();
      return cam;
    }

    private static createZUpCamera(gl: WebGL2RenderingContext, dictpar: Map<string,string>, szobj: number, app: mtls.MouseListener)
    {
       var cam: Camera = new Camera(dictpar!);
       cam.zoominVelocity = szobj/20.0;
       if (cam.radius0==0) { cam.radius0 = 2.0*szobj; console.log("set cam.radius0 to 2*object size = "+cam.radius0); }
       cam.target = [0,0,0];
       cam.near = szobj/10.0;
       cam.far = 10.0*szobj;
       cam.setRadius(cam.radius0);
     
       cam.setZUpPerspective(gl,app);
       cam.setZUpEye();
       cam.setZUpLight();
       return cam;
    }
*/
    static CamYUp: number = 1;
    static CamZUp: number = 2;

    public static createCamera(gl: WebGL2RenderingContext, dictpar: Map<string,string>, camtype: number, szobj: number, app: mtls.MouseListener): Camera
    {
      var cam: Camera = new Camera(dictpar!);
      cam.zoominVelocity = szobj/20.0;
      if (cam.radius0==0) { cam.radius0 = 2.0*szobj; console.log("set cam.radius0 to 2*object size = "+cam.radius0); }
      cam.target = [0,0,0];
      cam.near = szobj/10.0;
      cam.far = 10.0*szobj;
      cam.setRadius(cam.radius0);
      if (camtype==this.CamYUp) {
        cam.setYUpPerspective(gl,app);
        cam.setYUpEye();
        cam.setYUpLight();
      } else
      if (camtype==this.CamZUp) {
        cam.setZUpPerspective(gl,app);
        cam.setZUpEye();
        cam.setZUpLight();
      }
      else console.log("ERROR: ATTEMPT TO INITIALIZE INVALID CAMERA TYPE "+camtype); 
      return cam;
    }

    public translateEye(v: number[])
    {
      var t=m4.translation(v);
      this.eye=m4.transformPoint(t, this.eye) as number[]; 
      this.lookAt = m4.lookAt(this.eye, this.target, this.up);
      this.viewProjection = m4.multiply(this.projection, m4.inverse(this.lookAt));
     // console.log("translate eye "+this.eye);
    }

    public translateTarget(v: number[])
    {
      var t=m4.translation(v);
      this.target=m4.transformPoint(t, this.target) as number[]; 
      this.lookAt = m4.lookAt(this.eye, this.target, this.up);
      //console.log("translate target "+this.target);
      this.viewProjection = m4.multiply(this.projection, m4.inverse(this.lookAt));
    }

    public ReportEye()
    {
      var sEye = this.eye[0].toPrecision(4)+","+this.eye[1].toPrecision(4)+","+this.eye[2].toPrecision(4);
      var sTarget = this.target[0].toPrecision(4)+","+this.target[1].toPrecision(4)+","+this.target[2].toPrecision(4);
      var sLightPos = this.lightpos[0].toPrecision(4)+","+this.lightpos[1].toPrecision(4)+","+this.lightpos[2].toPrecision(4);
        (document.getElementById('projection') as HTMLDivElement).innerHTML = "hx:"+((180.0/Math.PI)*this.ahx).toPrecision(3)+" hy:"+((180.0/Math.PI)*this.ahy).toPrecision(3)+
        "<br>r0="+this.radius0.toPrecision(4)+", r="+this.radius.toPrecision(4)+"<br>eye:["+sEye+"]<br>target: ["+sTarget+"]<br>light: "+sLightPos; 
    }

    public Position(): number[]
    {  return this.eye; }

    //===================================================================================================================

    
    public setYUpPerspective(gl: WebGL2RenderingContext, app: mtls.MouseListener | undefined)
    {
      const afov =  (this.fov * Math.PI) / 180;
      const aspect = (gl.canvas  as HTMLCanvasElement).clientWidth / (gl.canvas  as HTMLCanvasElement).clientHeight;
      const zNear = this.near;
      const zFar = this.far;
      this.up = [0, 1, 0];
      this.projection = m4.perspective(afov, aspect, zNear, zFar);  
    }

    public setZUpPerspective(gl: WebGL2RenderingContext, app: mtls.MouseListener | undefined)
    {
      const afov =  (this.fov * Math.PI) / 180;
      const aspect = (gl.canvas as HTMLCanvasElement).clientWidth / (gl.canvas as HTMLCanvasElement).clientHeight;
      const zNear = this.near;
      const zFar = this.far;
      this.up = [0, 0, 1];
      this.projection = m4.perspective(afov, aspect, zNear, zFar);  
    }

    public setYUpEye()
    {
     // this.zaxis = m4.transformPoint(this.invworldmat, [0,0,1]) as number[];
      this.myr = m4.identity();
      m4.axisRotate(this.myr,this.yaxis, this.ahx, this.myr);
      m4.axisRotate(this.myr,this.zaxis, this.ahy, this.myr);
      this.eye = m4.transformPoint(this.myr, [this.radius, 0,0]) as number[];  
      this.lookAt = m4.lookAt(this.eye, this.target, this.up);
      this.viewProjection = m4.multiply(this.projection, m4.inverse(this.lookAt));
      this.ReportEye();
      console.log("< setYUpEye radius="+this.radius+" ("+this.radius0+")");
    }

    public setZUpEye()
    {
    //  this.yaxis = m4.transformPoint(this.invworldmat, [0,1,0]) as number[];    
      this.myr = m4.identity();
      m4.axisRotate(this.myr,this.zaxis, this.ahx, this.myr);
      //up = m4.transformPoint(myr,[0,1,0]) as number[];
      m4.axisRotate(this.myr,this.yaxis, this.ahy, this.myr);
      this.eye = m4.transformPoint(this.myr, [this.radius, 0,0]) as number[];      
      this.lookAt = m4.lookAt(this.eye, this.target, this.up);
      this.viewProjection = m4.multiply(this.projection, m4.inverse(this.lookAt));
      this.ReportEye();
      console.log("< setZUpEye radius="+this.radius+" ("+this.radius0+")");
   }

   public setYUpLight()
   {
     this.myrl = m4.identity();
     m4.axisRotate(this.myrl,this.yaxis, this.ahorizlight, this.myrl);
     this.up = m4.transformPoint(this.myrl,[0,1,0]) as number[];
     m4.axisRotate(this.myrl,this.zaxis, this.avertlight, this.myrl);
     this.lightpos = m4.transformPoint(this.myrl, [this.radius, 0,0]) as number[];  
   }

   public setZUpLight()
   {
     this.myrl = m4.identity();
     m4.axisRotate(this.myrl,this.zaxis, this.ahorizlight, this.myrl);
     this.up = m4.transformPoint(this.myrl,[0,1,0]) as number[];
     m4.axisRotate(this.myrl,this.yaxis, this.avertlight, this.myrl);
     this.lightpos = m4.transformPoint(this.myrl, [this.radius, 0,0]) as number[];  
   }

  public setRadius(r: number)
    { this.radius=this.radius0=r; }


    public CamHandlingYUp(gl:WebGL2RenderingContext, app: mtls.MouseListener | undefined, camsignX: number, camsignY: number )
    {          
    
      if (app?.mouse.dragvector!=undefined && app?.mouse.dragdistance>1e-2 )
      {
        const ctrldown = app?.controlkeydown;
        if (!ctrldown)
        {
          this.ahx = this.ahx - camsignX*(app.mouse.dragvector[0]*this.rotationVelocity);
          this.ahy =  this.ahy - camsignY*(app.mouse.dragvector[1]*this.rotationVelocity);
          if (this.ahy<(-Math.PI/2.0)) this.ahy = (-Math.PI/2.0 + 1e-3);
          if (this.ahy>(Math.PI/2.0)) this.ahy =(Math.PI/2.0 - 1e-3);
          this.changeeye = true;
        } else
        {
          this.ahorizlight = this.ahorizlight-app.mouse.dragvector[0]*this.rotationVelocity;
          this.avertlight = this.avertlight-app.mouse.dragvector[1]*this.rotationVelocity;
          this.changelight = true; 
        }
        app?.drageventdone();
      }
 
      if (app?.mouse.changewheel && app?.mouse.totaldelta != undefined) // && (this.radius0 + app?.mouse.totaldelta* this.zoominVelocity)> 1.0)
      {
        this.radius = this.radius0 + app?.mouse.totaldelta * this.zoominVelocity;
        this.changeeye = true;
        app?.mousewheeleventdone();
      }

      this.setYUpPerspective(gl, app);

      if (this.changeeye)
      {    
        this.setYUpEye();
        this.changeeye = false;
     }

     if (this.changelight)
     {
         this.setYUpLight();
        this.changelight =false;
     }
 
    }

    // Camera with Z-AXIS up

    public CamHandlingZUp(gl:WebGL2RenderingContext, app: mtls.MouseListener, camsignX: number, camsignY: number)
    {      
      this.setZUpPerspective(gl,app);
   //   var change = false;
      if (app?.mouse.dragvector!=undefined && app?.mouse.dragdistance>1e-2 )
      {
        this.ahx = this.ahx-(camsignX*app.mouse.dragvector[0]*this.rotationVelocity);
        this.ahy = this.ahy-(camsignY*app.mouse.dragvector[1]*this.rotationVelocity);
        if (this.ahy<(-Math.PI/2.0)) this.ahy =-Math.PI/2.0 + 1e-3;
        if (this.ahy>(Math.PI/2.0)) this.ahy =Math.PI/2.0 - 1e-3;
        this.changeeye = true;
      }
    //  if (app?.mouse.totaldelta != undefined && (this.radius0 + app?.mouse.totaldelta* zoominvelocity)> 1.0)
      if (app?.mouse.changewheel && app?.mouse.totaldelta != undefined)  
      {
        this.radius = this.radius0 + app?.mouse.totaldelta * this.zoominVelocity;
        this.changeeye = true;
        app?.mousewheeleventdone();
      //  console.log("wheel");
      }
   //!   this.target = [0, (mobj.meshMinMax.maxy+mobj.meshMinMax.miny)/2, 0];
      if (this.changeeye)
      {    
        this.setZUpEye();

        this.changeeye=false;
      }
    //  console.log("viewProjection= "+this.viewProjection);
     
     
    }

  }

