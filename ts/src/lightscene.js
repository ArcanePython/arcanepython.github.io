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
exports.LightScene = void 0;
// local, invalid shading
const twgl = __importStar(require("twgl.js")); // Greg's work
const twgl_js_1 = require("twgl.js");
const basescene_1 = require("./basescene");
class LightScene extends basescene_1.basescene {
    constructor(gl) {
        super();
        // shaders to merge (here: none)
        this.twglprograminfo = null; // shaders are provided in interface string fields, in this scene twglprograminfo[] remains null
        // interface
        this.sceneenv = 1;
        this.ctime = 0;
        this.scenesize = 60;
        this.vertexShaderSourceSpotLight = `#version 300 es

  // an attribute is an input (in) to a vertex shader.
  // It will receive data from a buffer
  in vec4 a_position;
  in vec3 a_normal;
  
  uniform vec3 u_lightWorldPosition;
  uniform vec3 u_viewWorldPosition;
  
  uniform mat4 u_world;
  uniform mat4 u_worldViewProjection;
  uniform mat4 u_worldInverseTranspose;
  
  // varyings to pass values to the fragment shader
  out vec3 v_normal;
  out vec3 v_surfaceToLight;
  out vec3 v_surfaceToView;
  
  // all shaders have a main function
  void main() {
    // Multiply the position by the matrix.
    gl_Position = u_worldViewProjection * a_position;
  
    // orient the normals and pass to the fragment shader
    v_normal = mat3(u_worldInverseTranspose) * a_normal;
  
    // compute the world position of the surface
    vec3 surfaceWorldPosition = (u_world * a_position).xyz;
  
    // compute the vector of the surface to the light
    // and pass it to the fragment shader
    v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;
  
    // compute the vector of the surface to the view/camera
    // and pass it to the fragment shader
    v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;
  }
  `;
        this.fragmentShaderSourceSpotLight = `#version 300 es

  precision highp float;
  
  // Passed in and varied from the vertex shader.
  in vec3 v_normal;
  in vec3 v_surfaceToLight;
  in vec3 v_surfaceToView;
  
  uniform vec4 u_color;
  uniform float u_shininess;
  
  uniform float u_innerLimit;          // in dot space
  uniform float u_outerLimit;          // in dot space

  uniform vec3 u_lightDirection;

  uniform int u_typelight;

  uniform vec3 u_reverseLightDirection; // directional light
   
  // we need to declare an output for the fragment shader
  out vec4 outColor;

  void maingreen() {
    outColor = vec4(0.0,1.0,0.0,1.0);
  }

  void main() {
    // because v_normal is a varying it's interpolated
    // so it will not be a uint vector. Normalizing it
    // will make it a unit vector again
    vec3 normal = normalize(v_normal);
  
    vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
    vec3 surfaceToViewDirection = normalize(v_surfaceToView);
    vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);
  
    if (u_typelight==2)
    {
      // spot light
      float dotFromDirection = dot(surfaceToLightDirection, -u_lightDirection);
      float inLight = smoothstep(u_outerLimit, u_innerLimit, dotFromDirection);
      float light = inLight * dot(normal, surfaceToLightDirection);
      float specular = inLight * pow(dot(normal, halfVector), u_shininess);
    
      outColor = u_color;
    
      // Lets multiply just the color portion (not the alpha)
      // by the light
      outColor.rgb *= light;
    
      // Just add in the specular
      outColor.rgb += specular;
    } else  if (u_typelight==1)
    {
       
      // compute the light by taking the dot product
      // of the normal to the light's reverse direction
      float light = dot(normal, surfaceToLightDirection);
      float specular = 0.0;
      if (light > 0.0) {
        specular = pow(dot(normal, halfVector), u_shininess);
      }

      vec3 outcol =   u_color.rgb;
    
      // Lets multiply just the color portion (not the alpha)
      // by the light
      outcol *= light;
    
      // Just add in the specular (white)
      outcol += specular;

      outColor = vec4(outcol,1.0);

    } else
    {
      // compute the light by taking the dot product
      // of the normal to the light's reverse direction
      float dirlight = dot(normal, u_reverseLightDirection);

     
    
      outColor = u_color;

      outColor.rgb *=   dirlight * u_shininess/10.0 ;
    }
  }
  `;
        LightScene.instance = this;
        this.typelight = 1;
        this.vertexShaderSource = this.vertexShaderSourceSpotLight;
        this.fragmentShaderSource = this.fragmentShaderSourceSpotLight;
        //  constructor(gl: WebGL2RenderingContext)
        this.twglprograminfo = new Array(3);
        this.twglprograminfo[1] = twgl.createProgramInfo(gl, [this.vertexShaderSourceSpotLight, this.fragmentShaderSourceSpotLight]);
        this.fieldOfViewRadians = 60 * Math.PI / 180;
        this.fRotationRadians = 0;
        this.lightRotationX = 0;
        this.lightRotationY = 0;
        this.lightDirection = [0, 0, 1]; // this is computed in updateScene
        this.innerLimit = 10 * Math.PI / 180;
        this.outerLimit = 20 * Math.PI / 180;
    }
    resizeCanvas(gl) { twgl.resizeCanvasToDisplaySize(gl.canvas); }
    extendGUI(gui) {
        // Slider for shininess
        gui.add(this.animationParameters, 'shininess').min(0).max(20.0).step(0.1);
        gui.updateDisplay();
        var cel2 = gui.add(this.animationParameters, 'typelight', ['directed light', 'point light', 'spot light']);
        cel2.onChange(this.onChangeTextureCombo);
    }
    onChangeTextureCombo(value) {
        console.log("change " + value);
        var s = value;
        console.log("onChange [" + s + "]");
        if (s == "directed light")
            LightScene.instance.typelight = 0; // gl.uniform1i(this.typelightLocation!,0);
        else if (s == "point light")
            LightScene.instance.typelight = 1; // gl.uniform1i(this.typelightLocation!,1);
        else if (s == "spot light")
            LightScene.instance.typelight = 2; //gl.uniform1i(this.typelightLocation!,2);
    }
    initScene(gl, cap, dictpar, p, sceneReadyCallback) {
        var program = p.program;
        this.animationParameters = cap;
        this.viewWorldPositionLocation = gl.getUniformLocation(program, "u_viewWorldPosition");
        this.typelightLocation = gl.getUniformLocation(program, "u_typelight");
        this.colorLocation = gl.getUniformLocation(program, "u_color");
        this.shininessLocation = gl.getUniformLocation(program, "u_shininess");
        this.lightDirectionLocation = gl.getUniformLocation(program, "u_lightDirection");
        this.innerLimitLocation = gl.getUniformLocation(program, "u_innerLimit");
        this.outerLimitLocation = gl.getUniformLocation(program, "u_outerLimit");
        this.lightWorldPositionLocation = gl.getUniformLocation(program, "u_lightWorldPosition");
        this.reverseLightDirectionLocation = gl.getUniformLocation(program, "u_reverseLightDirection"); // directional
        this.initMatrixUniforms(gl, program);
        this.initSingleObject(gl, program, this.setGeometry, this.setNormals, sceneReadyCallback); // this will invoke the callback when done
    }
    drawScene(gl, cam, time) {
        //      this.cameraPosition = (this.animationParameters?.b.move)? [Math.cos(time * 0.04 * this.animationParameters.b.speed) * 4.0, 0, 
        //        Math.sin(time * 0.04 * this.animationParameters.b.speed) * 4.0] 
        //: [4.0,0.0,0.0];
        //if (!this.animationParameters?.b.move)
        //this.cameraPosition = cam?.Position() as [number,number,number]; // [cam?.Position()[0]!,cam?.Position()[1]!,cam?.Position()[2]!];
        //gl.enable(gl.CULL_FACE);
        //gl.enable(gl.DEPTH_TEST);
        var deltaTime = time - this.ctime;
        this.ctime = time;
        // Bind the vao, set world matrix and worldview matrix in GPU
        this.renderCameraSingleRotatingObjectPrologue(gl, cam, deltaTime);
        // Set the color to use for any light
        gl.uniform4fv(this.colorLocation, [1.0, 0, 0.2, 1]); // red
        // Set the shininess for any light. 
        // directional light it is intensity
        // for point light and spot light it is concentration of the light
        gl.uniform1f(this.shininessLocation, this.animationParameters.shininess);
        gl.uniform1i(this.typelightLocation, this.typelight);
        //        if (this.animationParameters!.typelight=="directed light") gl.uniform1i(this.typelightLocation!,0);
        //        else if (this.animationParameters!.typelight=="point light") gl.uniform1i(this.typelightLocation!,1);
        //        else if (this.animationParameters!.typelight=="spot light") gl.uniform1i(this.typelightLocation!,2);
        // set the light direction (directed light)
        gl.uniform3fv(this.reverseLightDirectionLocation, twgl.v3.normalize([1.0, 0.0, 0.0]));
        // Set the light position used in point light and spot light
        const lightPosition = [0, 0, 120];
        gl.uniform3fv(this.lightWorldPositionLocation, lightPosition);
        // Set the camera/view position used in point light and spot light
        gl.uniform3fv(this.viewWorldPositionLocation, cam.Position());
        // Set spotlight uniforms
        // since we don't have a plane like most spotlight examples
        // let's point the spot light at the F
        var target = [0, 0, 0];
        var up = [0, 0, 1]; // Z-up !
        // Set directional light unifos
        var lmat = twgl_js_1.m4.lookAt(lightPosition, target, up);
        lmat = twgl_js_1.m4.multiply(twgl_js_1.m4.axisRotation([1, 0, 0], this.lightRotationX), lmat);
        lmat = twgl_js_1.m4.multiply(twgl_js_1.m4.axisRotation([0, 1, 0], this.lightRotationY), lmat);
        // get the zAxis from the matrix
        // negate it because lookAt looks down the -Z axis
        this.lightDirection = [-lmat[8], -lmat[9], -lmat[10]];
        gl.uniform3fv(this.lightDirectionLocation, this.lightDirection); // spot light
        gl.uniform1f(this.innerLimitLocation, Math.cos(this.innerLimit));
        gl.uniform1f(this.outerLimitLocation, Math.cos(this.outerLimit));
        // --- Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 16 * 6;
        gl.drawArrays(primitiveType, offset, count);
    }
    //=========================================================================================================================================
    // Fill the buffer with the values that define a letter 'F'.
    setGeometry(gl) {
        var positions = new Float32Array([
            // left column front
            0, 0, 0,
            0, 150, 0,
            30, 0, 0,
            0, 150, 0,
            30, 150, 0,
            30, 0, 0,
            // top rung front
            30, 0, 0,
            30, 30, 0,
            100, 0, 0,
            30, 30, 0,
            100, 30, 0,
            100, 0, 0,
            // middle rung front
            30, 60, 0,
            30, 90, 0,
            67, 60, 0,
            30, 90, 0,
            67, 90, 0,
            67, 60, 0,
            // left column back
            0, 0, 30,
            30, 0, 30,
            0, 150, 30,
            0, 150, 30,
            30, 0, 30,
            30, 150, 30,
            // top rung back
            30, 0, 30,
            100, 0, 30,
            30, 30, 30,
            30, 30, 30,
            100, 0, 30,
            100, 30, 30,
            // middle rung back
            30, 60, 30,
            67, 60, 30,
            30, 90, 30,
            30, 90, 30,
            67, 60, 30,
            67, 90, 30,
            // top
            0, 0, 0,
            100, 0, 0,
            100, 0, 30,
            0, 0, 0,
            100, 0, 30,
            0, 0, 30,
            // top rung right
            100, 0, 0,
            100, 30, 0,
            100, 30, 30,
            100, 0, 0,
            100, 30, 30,
            100, 0, 30,
            // under top rung
            30, 30, 0,
            30, 30, 30,
            100, 30, 30,
            30, 30, 0,
            100, 30, 30,
            100, 30, 0,
            // between top rung and middle
            30, 30, 0,
            30, 60, 30,
            30, 30, 30,
            30, 30, 0,
            30, 60, 0,
            30, 60, 30,
            // top of middle rung
            30, 60, 0,
            67, 60, 30,
            30, 60, 30,
            30, 60, 0,
            67, 60, 0,
            67, 60, 30,
            // right of middle rung
            67, 60, 0,
            67, 90, 30,
            67, 60, 30,
            67, 60, 0,
            67, 90, 0,
            67, 90, 30,
            // bottom of middle rung.
            30, 90, 0,
            30, 90, 30,
            67, 90, 30,
            30, 90, 0,
            67, 90, 30,
            67, 90, 0,
            // right of bottom
            30, 90, 0,
            30, 150, 30,
            30, 90, 30,
            30, 90, 0,
            30, 150, 0,
            30, 150, 30,
            // bottom
            0, 150, 0,
            0, 150, 30,
            30, 150, 30,
            0, 150, 0,
            30, 150, 30,
            30, 150, 0,
            // left side
            0, 0, 0,
            0, 0, 30,
            0, 150, 30,
            0, 0, 0,
            0, 150, 30,
            0, 150, 0,
        ]);
        // Center the F around the origin and Flip it around. We do this because
        // we're in 3D now with and +Y is up where as before when we started with 2D
        // we had +Y as down.
        // We could do by changing all the values above but I'm lazy.
        // We could also do it with a matrix at draw time but you should
        // never do stuff at draw time if you can do it at init time.
        var matrix = twgl_js_1.m4.axisRotation([1, 0, 0], Math.PI);
        matrix = twgl_js_1.m4.translate(matrix, [-50, -75, -15]);
        for (var ii = 0; ii < positions.length; ii += 3) {
            var vector = twgl_js_1.m4.transformPoint(matrix, [positions[ii + 0], positions[ii + 1], positions[ii + 2], 1]);
            positions[ii + 0] = vector[0];
            positions[ii + 1] = vector[1];
            positions[ii + 2] = vector[2];
        }
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    }
    //=========================================================================================================================================
    setNormals(gl) {
        var normals = new Float32Array([
            // left column front
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // top rung front
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // middle rung front
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // left column back
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            // top rung back
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            // middle rung back
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            // top
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            // top rung right
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            // under top rung
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            // between top rung and middle
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            // top of middle rung
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            // right of middle rung
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            // bottom of middle rung.
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            // right of bottom
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            // bottom
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            // left side
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
    }
}
exports.LightScene = LightScene;
//# sourceMappingURL=lightscene.js.map