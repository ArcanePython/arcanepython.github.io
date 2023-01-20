// fishtrajectoryscene.ts
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
import * as twgl from "twgl.js";
import { m4 } from "twgl.js";

import * as camhandler from "../baseapp/camhandler"
import * as datgui from "dat.gui"
import * as animationclock from "../baseapp/animationclock"
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

export class hoard2 implements fish.hoard
{
    // shapes
    fish: fish.Fish[] = [                               // SIZE   R1 R2    FWSP  PH0  DELTAP  AR   AMPL  TEX            V       JOINT JOINTAX
        new whale.Whale                     ("cloverwhale",1.0,  0.2,0.3,  0.8,  0.0085, 0.5, 2.50, "clover",       [0,0,0]),
        new fishwithjoints.FishWithJoints   ("fishjN",0.06, 40.0,24.0, 0.0, 0.0055, -9999.0, 2.1, "gradient",       [0,0,0], 0.6, [0.0,0.0,1.0]),
        new fishonejoint.FishOneJoint      ("fish1joint", 1.0,  2.0,2.0,  0.1, 0.0045, 0.1, 0.5, "gradient",       [0,0,0]),
        new fishv.FishV                     ("largefishv",0.5,  0.2,0.3,  0.8,  0.0085, 0.5, 2.50, "flagofukraine", [0,0,0]),
        new whaletranslated.WhaleTranslated ("whaletrans",2.0,  2.0,0.3,  0.8, 0.0016, 0.5, 2.0, "zelenskyy",       [0,0,0]),
        new fishv.FishV                     ("fishv",     0.25,  0.2,0.3, 1.0,  0.0150, 0.5, 5.00, "flagofukraine", [0,0,0]),
    ]; 
    fishjointcounts: number[] = [1, 28, 1,1, 1, 1, 1];  
 
    // Velocity (move), values are set at start of scene. WHhen kept, fish keep move in directions indicated
    vx = -0.007; 
    fishvelocitiesV : twgl.v3.Vec3[][] = [
        [twgl.v3.create(this.vx,0.003,0)], 
        [twgl.v3.create(-0.003,-0.0003,-0.003)],  // forward 1.2*default, rise -0.001, approach -0.002
        [twgl.v3.create(this.vx,0,0)],
        [twgl.v3.create(-0.003,-0.0003,-0.003), twgl.v3.create(this.vx,0,0)],
        [twgl.v3.create(this.vx,0,0)],
        [twgl.v3.create(this.vx,0,0),twgl.v3.create(this.vx,0,0),twgl.v3.create(this.vx,0,0)],
    ];

    // Position, values are set at start of scene and updated on every frame, according to fishvelocitiesV
    fishpositionsV : twgl.v3.Vec3[][] = [
        [twgl.v3.create( 40.0, 20.0,60.0)], 
        [twgl.v3.create(65,35,0)],
        [twgl.v3.create(30.0, 30.0, -35.0)],
        [twgl.v3.create(70.0, 35.0, -15.0),twgl.v3.create(40.0, 35.0, -15.0)],
        [twgl.v3.create(70.0, 15.0, 1.0)],
        [twgl.v3.create(20.0, 25.0, 0.0),twgl.v3.create(0.0, 15.0, 0.0),twgl.v3.create(30.0, 15.0, -30.0)],
    ];

    // Posture (rotation) matrices are kept for each fish and should change with direction while animating
    // When any velocity has changed in fishvelocitiesV, "change" is set to true for corresponding fish
    // a new matrix is generated in drawScene() from fisvelocitiesV and default posture [-1,0,0]
    fishmatricesR : {change: boolean, matrix: twgl.m4.Mat4}[][] = [
        [ { change:true, matrix:m4.identity() }], 
        [ { change:true, matrix:m4.identity() }],  
        [ { change:true, matrix:m4.identity() }],
        [ { change:true, matrix:m4.identity() }, { change:true, matrix:m4.identity() }],
        [ { change:true, matrix:m4.identity() }],
        [ { change:true, matrix:m4.identity() }, { change:true, matrix:m4.identity() }, { change:true, matrix:m4.identity() }],
    ];
}

//-------------------------------------------------------------------------------------------------------------------------------------------

export class FishTrajectoryScene implements scene.SceneInterface
{              
        scenesize: number = 140;
        sceneenv: number = -1;
        animationParameters: TAnimation1Parameters | undefined;
        vertexShaderSource = ``;
        fragmentShaderSource = ``; 
        private twglprograminfo: twgl.ProgramInfo|undefined;
        cameraPosition: [number,number,number] | undefined
        positionLocation: number | undefined;
        resizeCanvas(gl: WebGL2RenderingContext) { twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement); }
        defaultCamera(gl: WebGL2RenderingContext, cam: camhandler.Camera) {}
       
        clock: animationclock.AnimationClock = new animationclock.AnimationClock();
        h: hoard2 = new hoard2();
        firstframe: boolean=true;
        dtime: number=0;
        vtime: number=0;

        extendGUI(gui: datgui.GUI)
        {
            gui.add(this.animationParameters!, 'movetail');
        }
                   
        constructor( cgl: WebGL2RenderingContext, ch: hoard2)
        {       
            this.h = ch;
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
            });   
        }
        
        anglebetween( vectora: twgl.v3.Vec3,  vectorb: twgl.v3.Vec3): number
        {
            var vector1 = twgl.v3.normalize(vectora);
            var vector2 = twgl.v3.normalize(vectorb);
            if (twgl.v3.distanceSq(vector1,vector2)<1e-9) return 0.0;
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
            var localmatrix = m4.identity();            
            if (!this.firstframe) this.dtime=time-this.vtime; 
                        
            gl.useProgram(this.twglprograminfo!.program);
            for (var cfishtype=0; cfishtype<this.h.fish.length; cfishtype++)
                this.h.fish[cfishtype].uniforms!.viewprojection = cam.viewProjection; 
        
            for (var cfishtype=0; cfishtype<this.h.fishpositionsV.length; cfishtype++)
            {                   
                gl.bindVertexArray(this.h.fish[cfishtype].skinVAO);
                
                gl.bindTexture(gl.TEXTURE_2D, this.h.fish[cfishtype].boneMatrixTexture!);
        
                // since we want to use the texture for pure data we turn off filtering
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            
                var jointcount = this.h.fishjointcounts[cfishtype];
                    
                for (var cfish=0; cfish<this.h.fishpositionsV[cfishtype].length; cfish++)
                {
                    // move (always done)
                    var velo = this.h.fishvelocitiesV[cfishtype][cfish];
                    if (!this.firstframe) velocitytrans = twgl.m4.translation([velo[0]*this.dtime,velo[1]*this.dtime,velo[2]*this.dtime]);  
                        else velocitytrans = m4.identity();
                
                    // posture (costly math, this is only done when model is changed)
                    if (this.h.fishmatricesR[cfishtype][cfish].change)
                    {           
                        var modeldir = [-1,0,0];
                        var velonorm = twgl.v3.normalize(velo);
                        if (twgl.v3.distanceSq(modeldir,velonorm)<1e-9) localmatrix = m4.identity();
                            else {
                                var axis = twgl.v3.cross(modeldir, velonorm);
                                var angle = this.anglebetween(modeldir, velonorm);
                                localmatrix = m4.axisRotation(axis,angle);
                                }
                        this.h.fishmatricesR[cfishtype][cfish].matrix = localmatrix;
                        this.h.fishmatricesR[cfishtype][cfish].change =false;
                    } else                
                            localmatrix =  this.h.fishmatricesR[cfishtype][cfish].matrix;
                        
                    if (jointcount==1) // single joint fish
                    {           
                        this.h.fishpositionsV[cfishtype][cfish] =  m4.transformPoint(velocitytrans, this.h.fishpositionsV[cfishtype][cfish]);   
                        this.h.fish[cfishtype].computeBone(time, this.animationParameters!.move, this.animationParameters!.movetail);
                        this.h.fish[cfishtype].prepareBoneTexture(gl,this.h.fish[cfishtype].bindPoseInv2); // freeform bones need to keep their initial transformations
                        this.h.fish[cfishtype].uniforms!.world = m4.multiply( m4.translation(this.h.fishpositionsV[cfishtype][cfish]),localmatrix); // transformation for joint part depends on previous
                        twgl.setUniforms(this.twglprograminfo!, this.h.fish[cfishtype].uniforms)
                        twgl.drawBufferInfo(gl, this.h.fish[cfishtype].bufferInfo!, this.h.fish[cfishtype].mesh.type);           
                        }
                    else  // multiple joint segments
                    {                     
                        this.h.fishpositionsV[cfishtype][cfish]=  m4.transformPoint(velocitytrans, this.h.fishpositionsV[cfishtype][cfish]);   
                        var ampl0 = this.h.fish[cfishtype].ampl;
                        var sling = this.animationParameters!.sling;
                        var cmatrix = localmatrix; 
                        for (var i=0; i<jointcount; i++)  // there are fishjointcounts joints for this fish type
                        {
                            var timeoffs = i*sling;
                            var nx = i/jointcount;
                            this.h.fish[cfishtype].ampl = ampl0 * nx;
                            this.h.fish[cfishtype].computeJoint(time-timeoffs, this.animationParameters!.move, this.animationParameters!.movetail);
                            this.h.fish[cfishtype].prepareBoneTexture(gl, null); // for a segment, bindPoseInv2 need not be set (null)                           
                            this.h.fish[cfishtype].uniforms!.world = m4.multiply( m4.translation(this.h.fishpositionsV[cfishtype][cfish]),cmatrix); // transformation for joint part depends on previous joint
                            twgl.setUniforms(this.twglprograminfo!, this.h.fish[cfishtype].uniforms)
                            twgl.drawBufferInfo(gl, this.h.fish[cfishtype].bufferInfo!, this.h.fish[cfishtype].mesh.type);     
                            cmatrix = m4.multiply(cmatrix, this.h.fish[cfishtype].EndOfBoneTrans);  // stack the end-transformation of this segment into matrix cm         
                        }
                        this.h.fish[cfishtype].ampl = ampl0;                     
                    }
                }
            }         
            this.vtime=time;
            this.firstframe=false;   
        }  
}
      