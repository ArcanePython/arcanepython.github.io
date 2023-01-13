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
exports.Canvas3dTextureScene = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work
const twgl_js_1 = require("twgl.js");
class Canvas3dTextureScene {
    constructor(gl) {
        this.scenesize = 60;
        this.sceneenv = 2;
        this.widthTextureToRenderOn = 512;
        this.heighttextureToRenderOn = 512;
        this.fieldOfViewRadians = (60 * Math.PI / 180);
        this.vertexShaderSource = `#version 300 es

    // an attribute is an input (in) to a vertex shader.
    // It will receive data from a buffer
    in vec4 a_position;
    in vec2 a_texcoord;

    // default matrices
    uniform mat4 u_worldViewProjection;
    uniform mat4 u_world;
    uniform mat4 u_worldInverseTranspose;

    // a varying to pass the texture coordinates to the fragment shader
    out vec2 v_texcoord;

    // all shaders have a main function
    void main() {
      // Multiply the position by the matrix.
      gl_Position = u_worldViewProjection * a_position;

      // Pass the texcoord to the fragment shader.
      v_texcoord = a_texcoord;
    }
    `;
        this.fragmentShaderSource = `#version 300 es

    precision highp float;

    // Passed in from the vertex shader.
    in vec2 v_texcoord;

    // The texture.
    uniform sampler2D u_texture;
    uniform vec4 u_colorMult;

    // we need to declare an output for the fragment shader
    out vec4 outColor;

    void main() {
      outColor = vec4(texture(u_texture, v_texcoord).rrr, 1) * u_colorMult;
    }
    `;
        this.ctime = 0;
        this.modelXRotationRadians = 0;
        this.modelYRotationRadians = 0;
        console.log("=> scene constructor 3dtexture");
        this.twglprograminfo = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
        console.log("<= scene constructor 3dtexture");
    }
    resizeCanvas(gl) { twgl.resizeCanvasToDisplaySize(gl.canvas); }
    extendGUI(gui) {
        gui.add(this.animationParameters, 'fov', 5.0, 85.0, 1.0);
    }
    defaultCamera(gl, cam) { }
    restoreContext(gl, posBuffer, posAttributeLocation, size) {
        // ==> 2023-03-01 restore this part to solve the clear error
        // 1. Bind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        // 2. Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        //var size = 2;          // 2 components per iteration
        var type = gl.FLOAT; // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0; // start at the beginning of the buffer
        gl.vertexAttribPointer(posAttributeLocation, size, type, normalize, stride, offset);
        // 3. Enable this
        gl.enableVertexAttribArray(posAttributeLocation);
        // <==
    }
    initScene(gl, cap, cam, dictpar, sceneReadyCallback) {
        /** @type {HTMLCanvasElement} */
        var canvas = gl.canvas; // document.querySelector("#canvas");
        //var gl = canvas.getContext("webgl2");
        if (!gl) {
            console.log("ERROR: gl found null in canvas3dtexturescene.initScene()");
            return;
        }
        var p = this.twglprograminfo;
        console.log("=> canvas3dtexturescene.initScene()");
        // Use our boilerplate utils to compile the shaders and link into a program
        //this.program = p.program;
        // twgl.createProgramFromSources(gl,
        //    [this.vertexShaderSource, this.fragmentShaderSource]);
        // look up where the vertex data needs to go.
        this.positionAttributeLocation = gl.getAttribLocation(p.program, "a_position");
        var texcoordAttributeLocation = gl.getAttribLocation(p.program, "a_texcoord");
        // look up uniform locations
        this.worldViewProjectionLocation = gl.getUniformLocation(p.program, "u_worldViewProjection");
        this.textureLocation = gl.getUniformLocation(p.program, "u_texture");
        this.colorMultLocation = gl.getUniformLocation(p.program, "u_colorMult");
        // Create a buffer
        this.positionBuffer = gl.createBuffer();
        // Create a vertex array object (attribute state)
        this.vao = gl.createVertexArray();
        // and make it the one we're currently working with
        gl.bindVertexArray(this.vao);
        this.restoreContext(gl, this.positionBuffer, this.positionAttributeLocation, 3);
        /*
        // Turn on the attribute
        gl.enableVertexAttribArray(this.positionAttributeLocation);
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        // Set Geometry.
        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 3;          // 3 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer( this.positionAttributeLocation, size, type, normalize, stride, offset);
      */
        var positions = this.setGeometry(gl);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        // create the texcoord buffer, make it the current ARRAY_BUFFER
        // and copy in the texcoord values
        var texcoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        var texbuffer = this.setTexcoords(gl);
        gl.bufferData(gl.ARRAY_BUFFER, texbuffer, gl.STATIC_DRAW);
        // Turn on the attribute
        gl.enableVertexAttribArray(texcoordAttributeLocation);
        // Tell the attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
        var size = 2; // 2 components per iteration
        var type = gl.FLOAT; // the data is 32bit floating point values
        var normalize = true; // convert from 0-255 to 0.0-1.0
        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next color
        var offset = 0; // start at the beginning of the buffer
        gl.vertexAttribPointer(texcoordAttributeLocation, size, type, normalize, stride, offset);
        // Create a texture.
        this.textureOn3DCube = gl.createTexture();
        // use texture unit 0
        gl.activeTexture(gl.TEXTURE0 + 0);
        // bind to the TEXTURE_2D bind point of texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.textureOn3DCube);
        // fill texture with 3x2 pixels
        {
            const level = 0;
            const internalFormat = gl.R8;
            const width = 3;
            const height = 2;
            const border = 0;
            const format = gl.RED;
            const type = gl.UNSIGNED_BYTE;
            const data = new Uint8Array([
                128, 64, 128,
                0, 192, 0,
            ]);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, data);
        }
        // set the filtering so we don't need mips
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // Create a texture to render to
        //const targetTextureWidth = 256;
        //const targetTextureHeight = 256;
        this.textureToRenderOn = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.textureToRenderOn);
        {
            // define size and format of level 0
            const level = 0;
            const internalFormat = gl.RGBA;
            const border = 0;
            const format = gl.RGBA;
            const type = gl.UNSIGNED_BYTE;
            const data = null;
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, this.widthTextureToRenderOn, this.heighttextureToRenderOn, border, format, type, data);
            // set the filtering so we don't need mips
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
        // Create and bind the framebuffer
        this.fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
        // attach the texture as the first color attachment
        const attachmentPoint = gl.COLOR_ATTACHMENT0;
        const level = 0;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, this.textureToRenderOn, level);
        // create a depth texture
        const depthTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, depthTexture);
        // make a depth buffer and the same size as the targetTexture
        {
            // define size and format of level 0
            const level = 0;
            const internalFormat = gl.DEPTH_COMPONENT24;
            const border = 0;
            const format = gl.DEPTH_COMPONENT;
            const type = gl.UNSIGNED_INT;
            const data = null;
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, this.widthTextureToRenderOn, this.heighttextureToRenderOn, border, format, type, data);
            // set the filtering so we don't need mips
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            // attach the depth texture to the framebuffer
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture, level);
        }
        //  var modelXRotationRadians = (0);
        //  var modelYRotationRadians = (0);
        // Get the starting time.
        // var then = 0;
        //this.gl = gl;
        this.ctime = 0.0;
        console.log("<= canvas3dtexturescene.initScene()");
        if (sceneReadyCallback != undefined)
            sceneReadyCallback(-1);
        //  requestAnimationFrame((time)=>this.drawScene(time));
        //  requestAnimationFrame(drawScene);
    }
    drawCube(gl, program, aspect, cam) {
        // Tell it to use our program (pair of shaders)
        //var gl = this.gl!;
        //var program= this.program!;
        gl.useProgram(program);
        // Bind the attribute/buffer set we want.
        gl.bindVertexArray(this.vao);
        //if(cam!=null)  this.restoreContext(gl, this.positionBuffer!,this.positionAttributeLocation!,3);
        // Compute the projection matrix
        var projectionMatrix = twgl_js_1.m4.perspective(this.fieldOfViewRadians, aspect, 1, 2000);
        var viewProjectionMatrix = twgl_js_1.m4.identity();
        if (cam == null) {
            var cameraPosition = [0, 0, 15];
            var up = [0, 1, 0];
            var target = [0, 0, 0];
            // Compute the camera's matrix using look at.
            var cameraMatrix = twgl_js_1.m4.lookAt(cameraPosition, target, up);
            // Make a view matrix from the camera matrix.
            var viewMatrix = twgl_js_1.m4.inverse(cameraMatrix);
            viewProjectionMatrix = twgl_js_1.m4.multiply(projectionMatrix, viewMatrix);
        }
        else {
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
            viewProjectionMatrix = twgl_js_1.m4.multiply(projectionMatrix, viewMatrix);
        }
        if (cam == null) {
            var matrix = twgl_js_1.m4.translate(viewProjectionMatrix, [0, 0, 0]); // [x * .9, 0, 0]);
            matrix = twgl_js_1.m4.axisRotate(matrix, [1, 0, 0], this.modelXRotationRadians * 1.0);
            matrix = twgl_js_1.m4.axisRotate(matrix, [0, 1, 0], this.modelYRotationRadians * 1.0);
            // Set the matrix.
            gl.uniformMatrix4fv(this.worldViewProjectionLocation, false, matrix);
            // Tell the shader to use texture unit 0 for u_texture
            gl.uniform1i(this.textureLocation, 0);
            var c = 0;
            gl.uniform4fv(this.colorMultLocation, [c * .5 + .5, 1, 1 - c, 1]);
            // Draw the geometry.
            var primitiveType = gl.TRIANGLES;
            var offset = 0;
            var count = 6 * 6;
            gl.drawArrays(primitiveType, offset, count);
        }
        else {
            var x = 1;
            for (let x = -1; x <= 1; ++x) {
                var matrix = twgl_js_1.m4.translate(viewProjectionMatrix, [0, 0, 0]); // [x * .9, 0, 0]);
                matrix = twgl_js_1.m4.axisRotate(matrix, [1, 0, 0], this.modelXRotationRadians * x);
                matrix = twgl_js_1.m4.axisRotate(matrix, [0, 1, 0], this.modelYRotationRadians * x);
                if (cam != null)
                    matrix = twgl_js_1.m4.translate(matrix, [x * 10.0, 0, 0]);
                // Set the matrix.
                gl.uniformMatrix4fv(this.worldViewProjectionLocation, false, matrix);
                // Tell the shader to use texture unit 0 for u_texture
                gl.uniform1i(this.textureLocation, 0);
                var c = x * .1 + .5;
                gl.uniform4fv(this.colorMultLocation, [c * .5 + .5, 1, 1 - c, 1]);
                // Draw the geometry.
                var primitiveType = gl.TRIANGLES;
                var offset = 0;
                var count = 6 * 6;
                gl.drawArrays(primitiveType, offset, count);
            }
        }
    }
    restorePositionAttributeContext(gl, posBuffer, posAttributeLocation, size) {
        // ==> 2023-03-01 restore this part to solve the clear error
        // 1. Bind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        // 2. Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        //var size = 2;          // 2 components per iteration
        var type = gl.FLOAT; // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0; // start at the beginning of the buffer
        gl.vertexAttribPointer(posAttributeLocation, size, type, normalize, stride, offset);
        // 3. Enable this
        gl.enableVertexAttribArray(posAttributeLocation);
        // <==
    }
    // Draw the scene.
    drawScene(gl, cam, time) {
        // convert to seconds
        time *= 0.001;
        // Subtract the previous time from the current time
        var deltaTime = time - this.ctime;
        // Remember the current time for the next frame.
        this.ctime = time;
        // Animate the rotation
        this.modelYRotationRadians += -0.7 * deltaTime;
        this.modelXRotationRadians += -0.4 * deltaTime;
        //  twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
        gl.useProgram(this.twglprograminfo.program);
        // render to our targetTexture by binding the framebuffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
        // render cube with our 3x2 texture
        gl.bindTexture(gl.TEXTURE_2D, this.textureOn3DCube);
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, this.widthTextureToRenderOn, this.heighttextureToRenderOn);
        // Clear the canvas AND the depth buffer.
        gl.clearColor(.5, .7, 1, 1); // clear to blue
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var aspect = this.widthTextureToRenderOn / this.heighttextureToRenderOn;
        this.drawCube(gl, this.twglprograminfo.program, aspect, null);
        // render to the canvas
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        // render the cube with the texture we just rendered to
        gl.bindTexture(gl.TEXTURE_2D, this.textureToRenderOn);
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        // Clear the canvas AND the depth buffer.
        // gl.clearColor(1, 1, 1, 1);   // clear to white
        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        this.drawCube(gl, this.twglprograminfo.program, aspect, cam);
        //console.log("<- scene1");
        //requestAnimationFrame((time)=>this.drawScene(time));
    }
    // Fill the buffer with the values that define a cube.
    setGeometry(gl) {
        var positions = new Float32Array([
            -3.0, -3.0, -3.0,
            -3.0, 3.0, -3.0,
            3.0, -3.0, -3.0,
            -3.0, 3.0, -3.0,
            3.0, 3.0, -3.0,
            3.0, -3.0, -3.0,
            -3.0, -3.0, 3.0,
            3.0, -3.0, 3.0,
            -3.0, 3.0, 3.0,
            -3.0, 3.0, 3.0,
            3.0, -3.0, 3.0,
            3.0, 3.0, 3.0,
            -3.0, 3.0, -3.0,
            -3.0, 3.0, 3.0,
            3.0, 3.0, -3.0,
            -3.0, 3.0, 3.0,
            3.0, 3.0, 3.0,
            3.0, 3.0, -3.0,
            -3.0, -3.0, -3.0,
            3.0, -3.0, -3.0,
            -3.0, -3.0, 3.0,
            -3.0, -3.0, 3.0,
            3.0, -3.0, -3.0,
            3.0, -3.0, 3.0,
            -3.0, -3.0, -3.0,
            -3.0, -3.0, 3.0,
            -3.0, 3.0, -3.0,
            -3.0, -3.0, 3.0,
            -3.0, 3.0, 3.0,
            -3.0, 3.0, -3.0,
            3.0, -3.0, -3.0,
            3.0, 3.0, -3.0,
            3.0, -3.0, 3.0,
            3.0, -3.0, 3.0,
            3.0, 3.0, -3.0,
            3.0, 3.0, 3.0,
        ]);
        // 
        return positions;
    }
    // Fill the buffer with texture coordinates the cube.
    setTexcoords(gl) {
        //
        //   
        return new Float32Array([
            0, 0,
            0, 1,
            1, 0,
            0, 1,
            1, 1,
            1, 0,
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
            0, 0,
            0, 1,
            1, 0,
            0, 1,
            1, 1,
            1, 0,
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
            0, 0,
            0, 1,
            1, 0,
            0, 1,
            1, 1,
            1, 0,
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
        ]);
        //),
        //gl.STATIC_DRAW);
    }
}
exports.Canvas3dTextureScene = Canvas3dTextureScene;
//# sourceMappingURL=canvas3dtexturescene.js.map