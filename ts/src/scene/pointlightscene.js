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
exports.PointLightScene = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work
const twgl_js_1 = require("twgl.js");
class PointLightScene {
    constructor() {
        this.twglprograminfo = null; // shaders are provided in interface string fields, in this scene twglprograminfo[] remains null
        this.sceneenv = 1;
        this.vertexShaderSource = `#version 300 es

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
        this.fragmentShaderSource = `#version 300 es

    precision highp float;
    
    // Passed in and varied from the vertex shader.
    in vec3 v_normal;
    in vec3 v_surfaceToLight;
    in vec3 v_surfaceToView;
    
    uniform vec4 u_color;
    uniform float u_shininess;
    
    // we need to declare an output for the fragment shader
    out vec4 outColor;
    
    void main() {
      // because v_normal is a varying it's interpolated
      // so it will not be a uint vector. Normalizing it
      // will make it a unit vector again
      vec3 normal = normalize(v_normal);
    
      vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
      vec3 surfaceToViewDirection = normalize(v_surfaceToView);
      vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);
    
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

    }
    `;
        this.modelXRotationRadians = 0;
        this.modelYRotationRadians = 0;
        this.ctime = 0;
        this.scenesize = 140;
        function radToDeg(r) {
            return r * 180 / Math.PI;
        }
        function degToRad(d) {
            return d * Math.PI / 180;
        }
        this.fieldOfViewRadians = degToRad(60);
        this.fRotationRadians = 0;
        this.shininess = 75;
        this.lightRotationX = 0;
        this.lightRotationY = 0;
        this.lightDirection = [0, 0, 1]; // this is computed in updateScene
        this.innerLimit = degToRad(10);
        this.outerLimit = degToRad(20);
    }
    defaultCamera(gl, cam) { }
    resizeCanvas(gl) { twgl.resizeCanvasToDisplaySize(gl.canvas); }
    extendGUI(gui) {
        // Slider for sling speed
        // gui.add(this.animationParameters!, 'sling').min(9).max(120).step(1);
        // Slider for shininess
        gui.add(this.animationParameters, 'shininess').min(0).max(20.0).step(0.1);
        gui.updateDisplay();
    }
    initScene(gl, cap, dictpar, p) {
        var program = p.program;
        this.animationParameters = cap;
        this.viewWorldPositionLocation = gl.getUniformLocation(program, "u_viewWorldPosition");
        this.worldLocation = gl.getUniformLocation(program, "u_world");
        // look up where the vertex data needs to go.
        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        var normalAttributeLocation = gl.getAttribLocation(program, "a_normal");
        // lookup uniforms
        this.worldViewProjectionLocation = gl.getUniformLocation(program, "u_worldViewProjection");
        this.worldInverseTransposeLocation = gl.getUniformLocation(program, "u_worldInverseTranspose");
        this.colorLocation = gl.getUniformLocation(program, "u_color");
        this.shininessLocation = gl.getUniformLocation(program, "u_shininess");
        this.lightDirectionLocation = gl.getUniformLocation(program, "u_lightDirection");
        this.innerLimitLocation = gl.getUniformLocation(program, "u_innerLimit");
        this.outerLimitLocation = gl.getUniformLocation(program, "u_outerLimit");
        this.lightWorldPositionLocation = gl.getUniformLocation(program, "u_lightWorldPosition");
        // Create a vertex array object (attribute state)
        this.vao = gl.createVertexArray();
        // and make it the one we're currently working with
        gl.bindVertexArray(this.vao);
        // Turn on the attribute
        gl.enableVertexAttribArray(positionAttributeLocation);
        // Create a buffer
        var positionBuffer = gl.createBuffer();
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // Set Geometry.
        this.setGeometry(gl);
        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 3; // 3 components per iteration
        var type = gl.FLOAT; // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0; // start at the beginning of the buffer
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        // create the normalr buffer, make it the current ARRAY_BUFFER
        // and copy in the normal values
        var normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        this.setNormals(gl);
        // Turn on the attribute
        gl.enableVertexAttribArray(normalAttributeLocation);
        // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
        var size = 3; // 3 components per iteration
        var type = gl.FLOAT; // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next color
        var offset = 0; // start at the beginning of the buffer
        gl.vertexAttribPointer(normalAttributeLocation, size, type, normalize, stride, offset);
    }
    drawScene(gl, cam, time) {
        var deltaTime = time - this.ctime;
        this.ctime = time;
        // Bind the attribute/buffer set we want.
        gl.bindVertexArray(this.vao);
        //---Camera - Compute the matrix
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var zNear = 1;
        var zFar = 2000;
        var projectionMatrix = twgl_js_1.m4.perspective(this.fieldOfViewRadians, aspect, zNear, zFar);
        // Compute the camera's matrix
        var camera = cam.Position();
        var cameraMatrix = cam.lookAt; // Lx delegate task elsewhere m4.lookAt(camera, target, up);
        // Make a view matrix from the camera matrix.
        var viewMatrix = twgl_js_1.m4.inverse(cameraMatrix);
        // create a viewProjection matrix. This will both apply perspective
        // AND move the world so that the camera is effectively the origin
        var viewProjectionMatrix = twgl_js_1.m4.multiply(projectionMatrix, viewMatrix);
        if (this.animationParameters.b.move) {
            this.modelYRotationRadians += 0.05 * this.animationParameters.b.speed * deltaTime;
            this.modelXRotationRadians += 0.05 * this.animationParameters.b.speed * deltaTime;
        }
        var matrixXRot = twgl_js_1.m4.axisRotation([1, 0, 0], this.modelXRotationRadians);
        var matrixYRot = twgl_js_1.m4.axisRotation([0, 1, 0], this.modelYRotationRadians);
        var worldMatrix = twgl_js_1.m4.multiply(matrixXRot, matrixYRot); // m4.axisRotation([0,1,0],this.fRotationRadians) ;
        var worldViewProjectionMatrix = twgl_js_1.m4.multiply(viewProjectionMatrix, worldMatrix);
        var worldInverseMatrix = twgl_js_1.m4.inverse(worldMatrix);
        var worldInverseTransposeMatrix = twgl_js_1.m4.transpose(worldInverseMatrix);
        // Set the matrices
        gl.uniformMatrix4fv(this.worldLocation, false, worldMatrix);
        gl.uniformMatrix4fv(this.worldViewProjectionLocation, false, worldViewProjectionMatrix);
        gl.uniformMatrix4fv(this.worldInverseTransposeLocation, false, worldInverseTransposeMatrix);
        // --- point light properties
        // Set the color to use
        gl.uniform4fv(this.colorLocation, [0.2, 1, 0.2, 1]); // green
        // set the light position
        gl.uniform3fv(this.lightWorldPositionLocation, [0, 0, 120]);
        // gl.uniform3fv(this.lightWorldPositionLocation!, [20, 30, 60]);
        // set the camera/view position
        gl.uniform3fv(this.viewWorldPositionLocation, camera);
        // set the shininess
        gl.uniform1f(this.shininessLocation, this.animationParameters.shininess);
        // --- Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 16 * 6;
        gl.drawArrays(primitiveType, offset, count);
    }
    //---------------------------------------------------------------------------------------------------
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
exports.PointLightScene = PointLightScene;
//# sourceMappingURL=pointlightscene.js.map