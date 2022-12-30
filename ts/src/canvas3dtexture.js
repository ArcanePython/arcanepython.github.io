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
exports.Canvas3dTexture = void 0;
const twgl = __importStar(require("./../node_modules/twgl.js")); // Greg's work
const twgl_js_1 = require("./../node_modules/twgl.js");
class Canvas3dTexture {
    constructor() {
        this.vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;
in vec2 a_texcoord;

// A matrix to transform the positions by
uniform mat4 u_matrix;

// a varying to pass the texture coordinates to the fragment shader
out vec2 v_texcoord;

// all shaders have a main function
void main() {
  // Multiply the position by the matrix.
  gl_Position = u_matrix * a_position;

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
    }
    main(gl) {
        // Get A WebGL context
        /** @type {HTMLCanvasElement} */
        var canvas = gl.canvas; // document.querySelector("#canvas");
        //var gl = canvas.getContext("webgl2");
        if (!gl) {
            return;
        }
        // Use our boilerplate utils to compile the shaders and link into a program
        var program = twgl.createProgramFromSources(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
        // look up where the vertex data needs to go.
        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        var texcoordAttributeLocation = gl.getAttribLocation(program, "a_texcoord");
        // look up uniform locations
        var matrixLocation = gl.getUniformLocation(program, "u_matrix");
        var textureLocation = gl.getUniformLocation(program, "u_texture");
        var colorMultLocation = gl.getUniformLocation(program, "u_colorMult");
        // Create a buffer
        var positionBuffer = gl.createBuffer();
        // Create a vertex array object (attribute state)
        var vao = gl.createVertexArray();
        // and make it the one we're currently working with
        gl.bindVertexArray(vao);
        // Turn on the attribute
        gl.enableVertexAttribArray(positionAttributeLocation);
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
        // create the texcoord buffer, make it the current ARRAY_BUFFER
        // and copy in the texcoord values
        var texcoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        this.setTexcoords(gl);
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
        var texture = gl.createTexture();
        // use texture unit 0
        gl.activeTexture(gl.TEXTURE0 + 0);
        // bind to the TEXTURE_2D bind point of texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, texture);
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
        const targetTextureWidth = 256;
        const targetTextureHeight = 256;
        const targetTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, targetTexture);
        {
            // define size and format of level 0
            const level = 0;
            const internalFormat = gl.RGBA;
            const border = 0;
            const format = gl.RGBA;
            const type = gl.UNSIGNED_BYTE;
            const data = null;
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, targetTextureWidth, targetTextureHeight, border, format, type, data);
            // set the filtering so we don't need mips
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }
        // Create and bind the framebuffer
        const fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
        // attach the texture as the first color attachment
        const attachmentPoint = gl.COLOR_ATTACHMENT0;
        const level = 0;
        gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, targetTexture, level);
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
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, targetTextureWidth, targetTextureHeight, border, format, type, data);
            // set the filtering so we don't need mips
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            // attach the depth texture to the framebuffer
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture, level);
        }
        var fieldOfViewRadians = (60 * Math.PI / 180);
        var modelXRotationRadians = (0);
        var modelYRotationRadians = (0);
        // Get the starting time.
        var then = 0;
        requestAnimationFrame(drawScene);
        function drawCube(aspect) {
            // Tell it to use our program (pair of shaders)
            gl.useProgram(program);
            // Bind the attribute/buffer set we want.
            gl.bindVertexArray(vao);
            // Compute the projection matrix
            var projectionMatrix = twgl_js_1.m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
            var cameraPosition = [0, 0, 2];
            var up = [0, 1, 0];
            var target = [0, 0, 0];
            // Compute the camera's matrix using look at.
            var cameraMatrix = twgl_js_1.m4.lookAt(cameraPosition, target, up);
            // Make a view matrix from the camera matrix.
            var viewMatrix = twgl_js_1.m4.inverse(cameraMatrix);
            var viewProjectionMatrix = twgl_js_1.m4.multiply(projectionMatrix, viewMatrix);
            for (let x = -1; x <= 1; ++x) {
                var matrix = twgl_js_1.m4.translate(viewProjectionMatrix, [x * .9, 0, 0]);
                matrix = twgl_js_1.m4.axisRotate(matrix, [1, 0, 0], modelXRotationRadians * x);
                matrix = twgl_js_1.m4.axisRotate(matrix, [0, 1, 0], modelYRotationRadians * x);
                // Set the matrix.
                gl.uniformMatrix4fv(matrixLocation, false, matrix);
                // Tell the shader to use texture unit 0 for u_texture
                gl.uniform1i(textureLocation, 0);
                const c = x * .5 + .5;
                gl.uniform4fv(colorMultLocation, [c * .5 + .5, 1, 1 - c, 1]);
                // Draw the geometry.
                var primitiveType = gl.TRIANGLES;
                var offset = 0;
                var count = 6 * 6;
                gl.drawArrays(primitiveType, offset, count);
            }
        }
        // Draw the scene.
        function drawScene(time) {
            // convert to seconds
            time *= 0.001;
            // Subtract the previous time from the current time
            var deltaTime = time - then;
            // Remember the current time for the next frame.
            then = time;
            // Animate the rotation
            modelYRotationRadians += -0.7 * deltaTime;
            modelXRotationRadians += -0.4 * deltaTime;
            twgl.resizeCanvasToDisplaySize(gl.canvas);
            gl.enable(gl.CULL_FACE);
            gl.enable(gl.DEPTH_TEST);
            {
                // render to our targetTexture by binding the framebuffer
                gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
                // render cube with our 3x2 texture
                gl.bindTexture(gl.TEXTURE_2D, texture);
                // Tell WebGL how to convert from clip space to pixels
                gl.viewport(0, 0, targetTextureWidth, targetTextureHeight);
                // Clear the canvas AND the depth buffer.
                gl.clearColor(.5, .7, 1, 1); // clear to blue
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                const aspect = targetTextureWidth / targetTextureHeight;
                drawCube(aspect);
            }
            {
                // render to the canvas
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                // render the cube with the texture we just rendered to
                gl.bindTexture(gl.TEXTURE_2D, targetTexture);
                // Tell WebGL how to convert from clip space to pixels
                gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
                // Clear the canvas AND the depth buffer.
                gl.clearColor(1, 1, 1, 1); // clear to white
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
                drawCube(aspect);
            }
            requestAnimationFrame(drawScene);
        }
    }
    // Fill the buffer with the values that define a cube.
    setGeometry(gl) {
        var positions = new Float32Array([
            -0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
            0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,
            0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,
            -0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
            -0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,
            -0.5, 0.5, -0.5,
            -0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            -0.5, 0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, -0.5,
            0.5, 0.5, 0.5,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    }
    // Fill the buffer with texture coordinates the cube.
    setTexcoords(gl) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
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
        ]), gl.STATIC_DRAW);
    }
}
exports.Canvas3dTexture = Canvas3dTexture;
//# sourceMappingURL=canvas3dtexture.js.map