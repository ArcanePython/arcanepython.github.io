import * as twgl from "twgl.js";    // Greg's work
import { m4 } from "twgl.js";

import * as camhandler from "../baseapp/camhandler"   // camera projection
import * as datgui from "dat.gui";
import * as animationclock from "../baseapp/animationclock";

import { LinearTraject, Trajectory } from "../trajectory/trajectory";

import * as scene from "./../scene/scene"

import * as boneanimation from "./../bonemodel/boneanimation"
import * as fish from "./../bonemodel/fish"
import * as fishwithjoints from "../bonemodel/fishwithjoints"
import * as fishv from "./../bonemodel/fishv"
import * as whale from "../bonemodel/whale"
import * as fishonejoint from "../bonemodel/fishonejoint"
import * as whaletranslated from "../bonemodel/whaletranslated"


import { TAnimation1Parameters }  from "./../baseapp/baseapp"

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

export class hoard1 implements fish.hoard
{
  traj: Trajectory[] = [];

  constructor(defaultspeed: number)
  {
    var path: twgl.v3.Vec3[] = [[0,0,0],[2,0,0],[0,0,0]];
    this.traj.push( new Trajectory(path, defaultspeed, false));
    this.traj[0].testDump(400);    
  }


    fish: fish.Fish[] = [                               // SIZE   R1 R2    FWSP  PH0  DELTAP  AR   AMPL  TEX            V       JOINT JOINTAX
    new whale.Whale                     ("cloverwhale",1.0,  0.2,0.3,  0.8,  0.0085, 0.5, 2.50, "clover",       [0,0,0]),
    new fishwithjoints.FishWithJoints   ("fishjN",0.06, 40.0,24.0, 0.0, 0.0055, -9999.0, 2.1, "gradient",       [0,0,0], 0.6, [0.0,0.0,1.0]),
    new fishonejoint.FishOneJoint      ("fish1joint", 1.0,  2.0,2.0,  0.1, 0.0045, 0.1, 0.5, "gradient",       [0,0,0]),
    new fishv.FishV                     ("largefishv",0.5,  0.2,0.3,  0.8,  0.0085, 0.5, 2.50, "flagofukraine", [0,0,0]),
    new whaletranslated.WhaleTranslated ("whaletrans",2.0,  2.0,0.3,  0.8, 0.0016, 0.5, 2.0, "zelenskyy",       [0,0,0]),
    new fishv.FishV                     ("fishv",     0.25,  0.2,0.3, 1.0,  0.0150, 0.5, 5.00, "flagofukraine", [0,0,0]),
  ]; 

  fishjointcounts: number[] = [1, 28, 1,1, 1, 1, 1];  

  fishpositionsV : twgl.v3.Vec3[][] = [
    [twgl.v3.create( 40.0, 20.0,60.0)], 
    [twgl.v3.create(65,35,0)],
    [twgl.v3.create(30.0, 30.0, -35.0)],
    [twgl.v3.create(70.0, 35.0, -15.0)],
    [twgl.v3.create(70.0, 15.0, 1.0)],
    [twgl.v3.create(20.0, 25.0, 0.0),twgl.v3.create(80.0, 35.0, 0.0),twgl.v3.create(30.0, 15.0, -30.0)],
  ];

  vx = -0.007; 
  fishvelocitiesV : twgl.v3.Vec3[][] = [
    [twgl.v3.create(this.vx,0,0)], 
    [twgl.v3.create(this.vx,0,0)],
    [twgl.v3.create(this.vx,0,0)],
    [twgl.v3.create(this.vx,0,0)],
    [twgl.v3.create(this.vx,0,0)],
    [twgl.v3.create(this.vx,0,0),twgl.v3.create(this.vx*2,0,0),twgl.v3.create(this.vx,0,0)],
  ];

     // Posture (rotation) matrices are kept for each fish and should change with direction while animating
    // When any velocity has changed in fishvelocitiesV, "change" is set to true for corresponding fish
    // a new matrix is generated in drawScene() from fisvelocitiesV and default posture [-1,0,0]
    fishmatricesR : {inxtraj: number, change: boolean, matrix: twgl.m4.Mat4}[][] = [
      [ { inxtraj: 0, change:true, matrix:m4.identity() }], 
      [ { inxtraj: 0, change:true, matrix:m4.identity() }],  
      [ { inxtraj: 0, change:true, matrix:m4.identity() }],
      [ { inxtraj: 0, change:true, matrix:m4.identity() }],
      [ { inxtraj: 0, change:true, matrix:m4.identity() }],
      [ { inxtraj: 0, change:true, matrix:m4.identity() }, { inxtraj: 0, change:true, matrix:m4.identity() }, { inxtraj: 0, change:true, matrix:m4.identity() }],
  ];

}

export class FishAnimationScene implements scene.SceneInterface
{          
  scenesize: number = 40;
  sceneenv: number = -1;
  animationParameters: TAnimation1Parameters | undefined;
  vertexShaderSource = ``;
  fragmentShaderSource = ``; 
  private twglprograminfo: twgl.ProgramInfo|undefined;
  cameraPosition: [number,number,number] | undefined
  positionLocation: number | undefined;
  resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }
  defaultCamera(gl: WebGL2RenderingContext, cam: camhandler.Camera) {}
 
  extendGUI(gui: datgui.GUI)
   {
      gui.add(this.animationParameters!, 'fov', 5.0,85.0,1.0 );
      gui.add(this.animationParameters!, 'movetail');
   }
      
    clock: animationclock.AnimationClock = new animationclock.AnimationClock();

    static instance: FishAnimationScene;

    constructor( cgl: WebGL2RenderingContext, ch: fish.hoard)
    {       
      this.h = ch;
      FishAnimationScene.instance=this;
      //this.twglprograminfo = new Array(2);
      this.twglprograminfo = twgl.createProgramInfo(cgl, [boneanimation.BoneAnimation.vsSkeleton, boneanimation.BoneAnimation.fsSkeleton]);
    }

    initScene(gl: WebGL2RenderingContext,  cap:TAnimation1Parameters, cam: camhandler.Camera, dictpar:Map<string,string>| undefined,  textureReadyCallback: undefined | ((a:any)=>void))
    {
      gl.useProgram(this.twglprograminfo!.program);
      var nFish: number = 0;
      var time0: number = 0;
      this.h.fish.forEach((afish)=>{
        afish.prepareSurfaceTextures(gl,afish.surfacetexturefile);
        afish.mesh = afish.prepareMesh(gl, dictpar!, afish.size);
        afish.setNumBones(gl);
        afish.createBoneTexture(gl, time0, dictpar!);
        afish.createSurfaceTexture(gl);
        afish.uniforms= afish.createUniforms(gl, dictpar!);
        afish.bufferInfo = twgl.createBufferInfoFromArrays(gl, afish.mesh!.arrays);
        afish.skinVAO = twgl.createVAOFromBufferInfo(gl, this.twglprograminfo!, afish.bufferInfo);
        nFish++;
        if (nFish==this.h.fish.length && textureReadyCallback!=undefined) textureReadyCallback(0);
       
      //  textureReadyCallback(0);
      });   
    }

    h: fish.hoard; // = new hoard1(-0.007);
    //private velocitytrans: m4.Mat4 | undefined;

     firstframe: boolean=true;
    dtime: number=0;
    vtime: number=0;

    anglebetween( vectora: twgl.v3.Vec3,  vectorb: twgl.v3.Vec3): number
        {
          var vector1 = twgl.v3.normalize(vectora);
          var vector2 = twgl.v3.normalize(vectorb);
          if (twgl.v3.distanceSq(vector1,vector2)<1e-9) return 0.0;
         // if (twgl.v3.dot(vector1,vector2)<1e-9) return 0.0;
          var num = twgl.v3.dot(vector1,vector2);
          var vd1 =twgl.v3.subtract( vector1,vector2);
          var vd2 =twgl.v3.subtract( [-vector1[0],-vector1[1],-vector1[2]],vector2);
          var l1 = twgl.v3.length(vd1);
          var l2 = twgl.v3.length(vd2);
          return ((!(num < 0.0)) ? (2.0 * Math.asin(l1 / 2.0)) : (Math.PI - 2.0 * Math.asin(l2 / 2.0)));
        }

    drawScene(gl: WebGL2RenderingContext, cam: camhandler.Camera, time: number)
    {      
        var velocitytrans: m4.Mat4;
        if (!this.firstframe)
        {
          this.dtime=time-this.vtime; 
          //this.h.velocitytrans = twgl.m4.translation([this.h.vx*this.h.dtime,this.h.vy*this.h.dtime,this.h.vz*this.h.dtime]);  
        }
      
        gl.useProgram(this.twglprograminfo!.program);
          for (var fishtype=0; fishtype<this.h.fish.length; fishtype++)
            this.h.fish[fishtype].uniforms!.viewprojection = cam.viewProjection; 
      
        for (var fishtype=0; fishtype<this.h.fishpositionsV.length; fishtype++)
        {                   
          gl.bindVertexArray(this.h.fish[fishtype].skinVAO);
          
          gl.bindTexture(gl.TEXTURE_2D, this.h.fish[fishtype].boneMatrixTexture!);

          // since we want to use the texture for pure data we turn off filtering
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
   
          var jointcount = this.h.fishjointcounts[fishtype];
      
          for (var cfish=0; cfish<this.h.fishpositionsV[fishtype].length; cfish++)
          {
            // move
            var velo = this.h.fishvelocitiesV[fishtype][cfish];
            if (!this.firstframe) velocitytrans = twgl.m4.translation([velo[0]*this.dtime,velo[1]*this.dtime,velo[2]*this.dtime]);  
               else velocitytrans = m4.identity();

            // posture
            var modeldir = [-1,0,0];
            var velonorm = twgl.v3.normalize(velo);
            var localmatrix =m4.identity();            
            if (twgl.v3.distanceSq(modeldir,velonorm)<1e-9) localmatrix = m4.identity();
               else {
                 var axis = twgl.v3.cross(modeldir, velonorm);
                 var angle = this.anglebetween(modeldir, velonorm);
                 localmatrix = m4.axisRotation(axis,angle);
               }
       
            if (jointcount==1) // single joint fish
            {           
              this.h.fishpositionsV[fishtype][cfish] =  m4.transformPoint(velocitytrans, this.h.fishpositionsV[fishtype][cfish]);   
              this.h.fish[fishtype].computeBone(time, this.animationParameters!.move, this.animationParameters!.movetail);
              this.h.fish[fishtype].prepareBoneTexture(gl,this.h.fish[fishtype].bindPoseInv2); // freeform bones need to keep their initial transformations
              this.h.fish[fishtype].uniforms!.world = m4.multiply( m4.translation(this.h.fishpositionsV[fishtype][cfish]),localmatrix); // transformation for joint part depends on previous
              twgl.setUniforms(this.twglprograminfo!, this.h.fish[fishtype].uniforms)
              twgl.drawBufferInfo(gl, this.h.fish[fishtype].bufferInfo!, this.h.fish[fishtype].mesh.type);           
            }
            else  // multiple joint segments
            {
              this.h.fishpositionsV[fishtype][cfish]=  m4.transformPoint(velocitytrans, this.h.fishpositionsV[fishtype][cfish]);   
              var ampl0 = this.h.fish[fishtype].ampl;
              var sling = this.animationParameters!.sling;
              for (var i=0; i<jointcount; i++)  // there are fishjointcounts joints for this fish type
              {
                var timeoffs = i*sling;
                var nx = i/jointcount;
                this.h.fish[fishtype].ampl = ampl0 * nx;
                this.h.fish[fishtype].computeJoint(time-timeoffs, this.animationParameters!.move, this.animationParameters!.movetail);
                this.h.fish[fishtype].prepareBoneTexture(gl, null); // for a segment, bindPoseInv2 need not be set (null)
                this.h.fish[fishtype].uniforms!.world = m4.multiply( m4.translation(this.h.fishpositionsV[fishtype][cfish]),localmatrix); // transformation for joint part depends on previous joint
                twgl.setUniforms(this.twglprograminfo!, this.h.fish[fishtype].uniforms)
                twgl.drawBufferInfo(gl, this.h.fish[fishtype].bufferInfo!, this.h.fish[fishtype].mesh.type);     
                localmatrix = m4.multiply(localmatrix, this.h.fish[fishtype].EndOfBoneTrans);  // stack the end-transformation of this segment into matrix cm         
               }
              this.h.fish[fishtype].ampl = ampl0;          
           }
          }
          this.vtime=time;
          this.firstframe=false;
        }         
 
        
    }  
}
