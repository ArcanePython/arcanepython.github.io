"use strict";
// camera
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
const twgl_js_1 = require("twgl.js");
class Camera {
    constructor(dictpar) {
        // camera
        this.target = [0, 0, 0]; // target of camera
        this.radius0 = 0.0; // camera distance, set at objectsize*2 when not in dictpar
        this.ahx = 0; // horizontal angle (hx)
        this.ahy = 0; // vertical angle (hy), for z-up this is actually hz
        this.fov = 30.0; // field of view in degrees
        this.near = 0.5; // near plane
        this.far = 1000.0; // far plane
        this.rotationVelocity = 0.012; // mouse drag sensitivity for angle turns
        this.zoominVelocity = 1.0; // mouse wheel sensitivity set at objectsize/40
        // lights
        this.ahorizlight = 3.0 * Math.PI / 2.0; // light horizontal angle
        this.avertlight = Math.PI / 4.0; // light vertical angle
        this.lightpos = [8, 8, 20];
        this.difflightintensity = 0.9;
        this.speclightintensity = 0.9;
        // result state to pass to shader
        this.lookAt = twgl_js_1.m4.identity(); // m4.lookAt(this.eye, this.target, this.up);
        this.viewProjection = twgl_js_1.m4.identity(); // projection configured
        this.camHeight = 0.0;
        //----------------------------------------------------------------
        //local state
        this.zaxis = [0, 0, 1]; // yaw axis
        this.yaxis = [0, 1, 0]; // roll axis
        this.up = [0, 1, 0]; // up vector (can be Z or Y)
        this.radius = 0.0; // distance of camera
        this.eye = [-1, 0, 0]; // location of camera
        this.myr = twgl_js_1.m4.identity();
        this.myrl = twgl_js_1.m4.identity(); // light
        this.projection = twgl_js_1.m4.identity();
        this.changelight = false;
        this.changeeye = false;
        {
            if (dictpar.get("radius0") != undefined)
                this.radius0 = +dictpar.get("radius0");
            if (dictpar.get("hx") != undefined)
                this.ahx = +dictpar.get("hx");
            if (dictpar.get("hy") != undefined)
                this.ahy = +dictpar.get("hy");
            if (dictpar.get("hxl") != undefined) {
                this.ahorizlight = +dictpar.get("hxl");
                this.changelight = true;
            }
            if (dictpar.get("hyl") != undefined) {
                this.avertlight = +dictpar.get("hyl");
                this.changelight = true;
            }
            if (dictpar.get("difflight") != undefined) {
                this.difflightintensity = +dictpar.get("difflight");
                this.changelight = true;
            }
            if (dictpar.get("speclight") != undefined) {
                this.speclightintensity = +dictpar.get("speclight");
                this.changelight = true;
            }
        }
        this.radius = this.radius0;
    }
    static createCamera(gl, dictpar, camtype, szobj, app) {
        var cam = new Camera(dictpar);
        cam.zoominVelocity = szobj / 20.0;
        if (cam.radius0 == 0) {
            cam.radius0 = 2.0 * szobj;
            console.log("set cam.radius0 to 2*object size = " + cam.radius0);
        }
        cam.target = [0, 0, 0];
        cam.near = szobj / 10.0;
        cam.far = 10.0 * szobj;
        cam.setRadius(cam.radius0);
        if (camtype == this.CamYUp) {
            cam.setYUpPerspective(gl, app);
            cam.setYUpEye();
            cam.setYUpLight();
        }
        else if (camtype == this.CamZUp) {
            cam.setZUpPerspective(gl, app);
            cam.setZUpEye();
            cam.setZUpLight();
        }
        else
            console.log("ERROR: ATTEMPT TO INITIALIZE INVALID CAMERA TYPE " + camtype);
        return cam;
    }
    translateEye(v) {
        var t = twgl_js_1.m4.translation(v);
        this.eye = twgl_js_1.m4.transformPoint(t, this.eye);
        this.lookAt = twgl_js_1.m4.lookAt(this.eye, this.target, this.up);
        this.viewProjection = twgl_js_1.m4.multiply(this.projection, twgl_js_1.m4.inverse(this.lookAt));
        console.log("translate eye " + this.eye);
    }
    translateTarget(v) {
        var t = twgl_js_1.m4.translation(v);
        this.target = twgl_js_1.m4.transformPoint(t, this.target);
        this.lookAt = twgl_js_1.m4.lookAt(this.eye, this.target, this.up);
        //console.log("translate target "+this.target);
        this.viewProjection = twgl_js_1.m4.multiply(this.projection, twgl_js_1.m4.inverse(this.lookAt));
    }
    ReportEye() {
        var sEye = this.eye[0].toPrecision(4) + "," + this.eye[1].toPrecision(4) + "," + this.eye[2].toPrecision(4);
        var sTarget = this.target[0].toPrecision(4) + "," + this.target[1].toPrecision(4) + "," + this.target[2].toPrecision(4);
        var sLightPos = this.lightpos[0].toPrecision(4) + "," + this.lightpos[1].toPrecision(4) + "," + this.lightpos[2].toPrecision(4);
        document.getElementById('projection').innerHTML = "h:" + ((180.0 / Math.PI) * this.ahx).toPrecision(3) + ", " + ((180.0 / Math.PI) * this.ahy).toPrecision(3) +
            ", r0=" + this.radius0.toPrecision(4) + ", r=" + this.radius.toPrecision(4) + ", eye:[" + sEye + "], t[" + sTarget + "]"; //, light: "+sLightPos; 
    }
    Position() { return this.eye; }
    //===================================================================================================================
    setYUpPerspective(gl, app) {
        const afov = (this.fov * Math.PI) / 180;
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const zNear = this.near;
        const zFar = this.far;
        this.up = [0, 1, 0];
        this.projection = twgl_js_1.m4.perspective(afov, aspect, zNear, zFar);
    }
    setZUpPerspective(gl, app) {
        const afov = (this.fov * Math.PI) / 180;
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const zNear = this.near;
        const zFar = this.far;
        this.up = [0, 0, 1];
        this.projection = twgl_js_1.m4.perspective(afov, aspect, zNear, zFar);
    }
    setYUpEye() {
        // this.zaxis = m4.transformPoint(this.invworldmat, [0,0,1]) as number[];
        this.myr = twgl_js_1.m4.identity();
        twgl_js_1.m4.axisRotate(this.myr, this.yaxis, this.ahx, this.myr);
        twgl_js_1.m4.axisRotate(this.myr, this.zaxis, this.ahy, this.myr);
        twgl_js_1.m4.translate(this.myr, [0, this.camHeight, 0], this.myr);
        this.eye = twgl_js_1.m4.transformPoint(this.myr, [this.radius, 0, 0]);
        this.target[1] = this.camHeight;
        this.lookAt = twgl_js_1.m4.lookAt(this.eye, this.target, this.up);
        this.viewProjection = twgl_js_1.m4.multiply(this.projection, twgl_js_1.m4.inverse(this.lookAt));
        this.ReportEye();
        console.log("< setYUpEye radius=" + this.radius + " (" + this.radius0 + ")");
    }
    setZUpEye() {
        //  this.yaxis = m4.transformPoint(this.invworldmat, [0,1,0]) as number[];    
        this.myr = twgl_js_1.m4.identity();
        twgl_js_1.m4.axisRotate(this.myr, this.zaxis, this.ahx, this.myr);
        //up = m4.transformPoint(myr,[0,1,0]) as number[];
        twgl_js_1.m4.translate(this.myr, [0, 0, this.camHeight], this.myr);
        twgl_js_1.m4.axisRotate(this.myr, this.yaxis, this.ahy, this.myr);
        this.eye = twgl_js_1.m4.transformPoint(this.myr, [this.radius, 0, 0]);
        this.lookAt = twgl_js_1.m4.lookAt(this.eye, this.target, this.up);
        this.viewProjection = twgl_js_1.m4.multiply(this.projection, twgl_js_1.m4.inverse(this.lookAt));
        this.ReportEye();
        console.log("< setZUpEye radius=" + this.radius + " (" + this.radius0 + ")");
    }
    setYUpLight() {
        this.myrl = twgl_js_1.m4.identity();
        twgl_js_1.m4.axisRotate(this.myrl, this.yaxis, this.ahorizlight, this.myrl);
        this.up = twgl_js_1.m4.transformPoint(this.myrl, [0, 1, 0]);
        twgl_js_1.m4.axisRotate(this.myrl, this.zaxis, this.avertlight, this.myrl);
        this.lightpos = twgl_js_1.m4.transformPoint(this.myrl, [this.radius, 0, 0]);
    }
    setZUpLight() {
        this.myrl = twgl_js_1.m4.identity();
        twgl_js_1.m4.axisRotate(this.myrl, this.zaxis, this.ahorizlight, this.myrl);
        this.up = twgl_js_1.m4.transformPoint(this.myrl, [0, 1, 0]);
        twgl_js_1.m4.axisRotate(this.myrl, this.yaxis, this.avertlight, this.myrl);
        this.lightpos = twgl_js_1.m4.transformPoint(this.myrl, [this.radius, 0, 0]);
    }
    setRadius(r) { this.radius = this.radius0 = r; }
    CamHandlingYUp(gl, app, camsignX, camsignY) {
        if ((app === null || app === void 0 ? void 0 : app.mouse.dragvector) != undefined && (app === null || app === void 0 ? void 0 : app.mouse.dragdistance) > 1e-2) {
            const ctrldown = app === null || app === void 0 ? void 0 : app.controlkeydown;
            if (!ctrldown) {
                this.ahx = this.ahx - camsignX * (app.mouse.dragvector[0] * this.rotationVelocity);
                this.ahy = this.ahy - camsignY * (app.mouse.dragvector[1] * this.rotationVelocity);
                if (this.ahy < (-Math.PI / 2.0))
                    this.ahy = (-Math.PI / 2.0 + 1e-3);
                if (this.ahy > (Math.PI / 2.0))
                    this.ahy = (Math.PI / 2.0 - 1e-3);
                this.changeeye = true;
            }
            else {
                this.ahorizlight = this.ahorizlight - app.mouse.dragvector[0] * this.rotationVelocity;
                this.avertlight = this.avertlight - app.mouse.dragvector[1] * this.rotationVelocity;
                this.changelight = true;
            }
            app === null || app === void 0 ? void 0 : app.drageventdone();
        }
        if ((app === null || app === void 0 ? void 0 : app.mouse.changewheel) && (app === null || app === void 0 ? void 0 : app.mouse.totaldelta) != undefined) // && (this.radius0 + app?.mouse.totaldelta* this.zoominVelocity)> 1.0)
         {
            this.radius = this.radius0 + (app === null || app === void 0 ? void 0 : app.mouse.totaldelta) * this.zoominVelocity;
            this.changeeye = true;
            app === null || app === void 0 ? void 0 : app.mousewheeleventdone();
        }
        this.setYUpPerspective(gl, app);
        if (this.changeeye) {
            this.setYUpEye();
            this.changeeye = false;
        }
        if (this.changelight) {
            this.setYUpLight();
            this.changelight = false;
        }
    }
    // Camera with Z-AXIS up
    CamHandlingZUp(gl, app, camsignX, camsignY) {
        this.setZUpPerspective(gl, app);
        //   var change = false;
        if ((app === null || app === void 0 ? void 0 : app.mouse.dragvector) != undefined && (app === null || app === void 0 ? void 0 : app.mouse.dragdistance) > 1e-2) {
            this.ahx = this.ahx - (camsignX * app.mouse.dragvector[0] * this.rotationVelocity);
            this.ahy = this.ahy - (camsignY * app.mouse.dragvector[1] * this.rotationVelocity);
            if (this.ahy < (-Math.PI / 2.0))
                this.ahy = -Math.PI / 2.0 + 1e-3;
            if (this.ahy > (Math.PI / 2.0))
                this.ahy = Math.PI / 2.0 - 1e-3;
            this.changeeye = true;
        }
        //  if (app?.mouse.totaldelta != undefined && (this.radius0 + app?.mouse.totaldelta* zoominvelocity)> 1.0)
        if ((app === null || app === void 0 ? void 0 : app.mouse.changewheel) && (app === null || app === void 0 ? void 0 : app.mouse.totaldelta) != undefined) {
            this.radius = this.radius0 + (app === null || app === void 0 ? void 0 : app.mouse.totaldelta) * this.zoominVelocity;
            this.changeeye = true;
            app === null || app === void 0 ? void 0 : app.mousewheeleventdone();
            //  console.log("wheel");
        }
        //!   this.target = [0, (mobj.meshMinMax.maxy+mobj.meshMinMax.miny)/2, 0];
        if (this.changeeye) {
            this.setZUpEye();
            this.changeeye = false;
        }
        //  console.log("viewProjection= "+this.viewProjection);
    }
}
exports.Camera = Camera;
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
Camera.CamYUp = 1;
Camera.CamZUp = 2;
//# sourceMappingURL=camhandler.js.map