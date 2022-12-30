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
exports.FishAnimation = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work
const twgl_js_1 = require("twgl.js");
const camhandler = __importStar(require("./camhandler")); // camera projection
const boneanimation = __importStar(require("./boneanimation"));
const fish = __importStar(require("./fish"));
const twglbaseapp = __importStar(require("./twglbaseapp"));
const animationclock = __importStar(require("./animationclock"));
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
class FishAnimation extends twglbaseapp.twglbaseapp {
    constructor(cgl, capp, dictpar, cdiv) {
        super(cgl, capp, dictpar, cdiv);
        this.fishAnimationParameters = {
            b: this.baseappParameters,
            movetail: true,
            texture: 'geotriangle2',
            sling: 117,
        };
        this.fish = [
            new fish.FishHTranslated(1.0, 2.0, 0.3, 0.03, 0.8, 0.0016, 0.5, 2.0, "zelenskyy"),
            new fish.FishOneJoint(0.06, 40.0, 24.0, 0.03, 0.0, 0.0055, -9999.0, 2.1, "gradient", 0.6, [0.0, 1.0, 0.0]),
            new fish.FishHRotated(0.5, 16.0, 22.0, 0.03, 0.1, 0.0015, 1.0, 0.5, "gradient"),
            new fish.FishV(0.2, 0.2, 0.3, 0.03, 1.0, 0.0150, 0.5, 5.00, "flagofukraine"),
            new fish.FishHTranslated(0.3, 0.2, 0.3, 0.03, 0.8, 0.0085, 0.5, 2.50, "zelenskyy")
        ];
        this.fishjointcounts = [1, 28, 1, 1, 1];
        this.fishpositions = [
            [[0.0, -20.0, 0.0]],
            [[-15, 15, 0]],
            [[20.0, -5.0, -15.0]],
            [[-10.0, -5.0, 0.0]],
            [[0.0, 0.0, 1.0]]
        ];
        this.clock = new animationclock.AnimationClock();
        FishAnimation.instance = this;
        this.twglprograminfo = new Array(2);
        this.twglprograminfo[1] = twgl.createProgramInfo(cgl, [boneanimation.vsSkeleton, boneanimation.fsSkeleton]);
    }
    main(gl, dictpar) {
        //  super.maininfo(gl, dictpar,boneanimation.vsSkeleton, boneanimation.fsSkeleton );
        twgl.setAttributePrefix("a_");
        var gl = this.gl;
        //this.programInfo = this.twglprograminfo![0];// twgl.createProgramInfo(gl, [boneanimation.vsSkeleton, boneanimation.fsSkeleton]);          
        var nFish = 0;
        var time0 = 0; // (this.vnow=new Date()).getTime();
        this.fish.forEach((afish) => {
            afish.prepareSurfaceTextures(gl, afish.surfacetexturefile);
            afish.mesh = afish.prepareMesh(gl, dictpar, afish.size);
            afish.setNumBones(gl);
            afish.createBoneTexture(gl, time0, dictpar);
            afish.createSurfaceTexture(gl);
            afish.uniforms = afish.createUniforms(gl, dictpar);
            afish.bufferInfo = twgl.createBufferInfoFromArrays(gl, afish.mesh.arrays);
            afish.skinVAO = twgl.createVAOFromBufferInfo(gl, this.twglprograminfo[1], afish.bufferInfo);
            nFish++;
        });
        this.cam = camhandler.Camera.createCamera(gl, dictpar, camhandler.Camera.CamZUp, 30.0, this.app);
        this.cam.zoominVelocity = 0.5;
        requestAnimationFrame(() => this.render(time0));
    }
    onChangeColorValue(value) {
        //console.log("we are in color=["+value+"]");
        var thisinstance = FishAnimation.instance;
        if (thisinstance.gl != null) {
            var cc = thisinstance.gl.canvas.parentNode;
            var ccd = cc;
            ccd.style.backgroundColor = value;
        }
    }
    initGUI(parameters) {
        this.fishAnimationParameters = parameters;
        // The base GUI provides checkboxes for move and move of objects,
        // a color dialog to choose background, Slider for animation speed
        var gui = super.createGUI(this.fishAnimationParameters.b, this.fishAnimationParameters);
        // add a slider for sling
        gui.add(this.fishAnimationParameters, 'sling').min(9).max(120).step(1);
        gui.updateDisplay();
        return gui;
    }
    render(time) {
        var gl = this.gl;
        gl.useProgram(this.twglprograminfo[1].program);
        twgl.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        //gl.clearColor(0.1, 0.1, 0.1, 1.0);       
        //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);     
        var cam = this.cam;
        cam.CamHandlingZUp(gl, this.app, 1.0, -1.0);
        for (var fishtype = 0; fishtype < this.fish.length; fishtype++)
            this.fish[fishtype].uniforms.viewprojection = cam.viewProjection;
        for (var fishtype = 0; fishtype < this.fish.length; fishtype++) {
            gl.bindVertexArray(this.fish[fishtype].skinVAO);
            this.fish[fishtype].forwardspeed = this.fishAnimationParameters.b.move ? this.fishAnimationParameters.b.speed : 0.0;
            if (this.fishjointcounts[fishtype] == 1) // single joint fish
             {
                this.fish[fishtype].computeBone(time, this.fishAnimationParameters.b.move, this.fishAnimationParameters.movetail);
                this.fish[fishtype].prepareBoneTexture(gl, this.fish[fishtype].bindPoseInv2); // freeform bones need to keep their initial transformations
                this.fish[fishtype].uniforms.world = twgl_js_1.m4.translation(this.fishpositions[fishtype][0]); // draw a fish at some position
                twgl.setUniforms(this.twglprograminfo[1], this.fish[fishtype].uniforms);
                twgl.drawBufferInfo(gl, this.fish[fishtype].bufferInfo, this.fish[fishtype].mesh.type);
            }
            else // multiple joint segments
             {
                var localmatrix = twgl_js_1.m4.translation(this.fishpositions[fishtype][0]); // start transforming origin of joint #0 to fish position
                var ampl0 = this.fish[fishtype].ampl;
                var sling = this.fishAnimationParameters.sling;
                for (var i = 0; i < this.fishjointcounts[fishtype]; i++) // there are fishjointcounts joints for this fish type
                 {
                    var timeoffs = i * sling;
                    var nx = i / this.fishjointcounts[fishtype];
                    this.fish[fishtype].ampl = ampl0 * nx;
                    this.fish[fishtype].computeBone(time - timeoffs, this.fishAnimationParameters.b.move, this.fishAnimationParameters.movetail);
                    this.fish[fishtype].prepareBoneTexture(gl, null); // for a segment, bindPoseInv2 need not be set (null)
                    this.fish[fishtype].uniforms.world = localmatrix; // transformation for joint part depends on previous joint
                    twgl.setUniforms(this.twglprograminfo[1], this.fish[fishtype].uniforms);
                    twgl.drawBufferInfo(gl, this.fish[fishtype].bufferInfo, this.fish[fishtype].mesh.type);
                    localmatrix = twgl_js_1.m4.multiply(localmatrix, this.fish[fishtype].EndOfBoneTrans); // stack the end-transformation of this segment into matrix cm         
                }
                this.fish[fishtype].ampl = ampl0;
            }
        }
        requestAnimationFrame(() => this.render(this.clock.getTime(this.clock.frame)));
    }
}
exports.FishAnimation = FishAnimation;
//# sourceMappingURL=fishanimation.js.map