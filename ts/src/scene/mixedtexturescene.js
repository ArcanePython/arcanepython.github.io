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
exports.MixedTextureScene = void 0;
const twgl = __importStar(require("twgl.js")); // Greg's work
const twgl_js_1 = require("twgl.js");
class MixedTextureScene {
    constructor(gl) {
        this.matrixLocation = 0;
        this.textureLocation1 = 0;
        this.textureLocation2 = 0;
        this.modelXRotationRadians = 0;
        this.modelYRotationRadians = 0;
        this.ctime = 0;
        this.scenesize = 40;
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
    uniform sampler2D u_texture1;
    uniform sampler2D u_texture2;

    // we need to declare an output for the fragment shader
    out vec4 outColor;

    void main() {
      outColor = texture(u_texture1, v_texcoord)/2. + texture(u_texture2, v_texcoord)/2.;
      //outColor = texture(u_texture2, v_texcoord);
    }
    `;
        //this.twglprograminfo=new Array(2);
        this.twglprograminfo = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
    }
    defaultCamera(gl, cam) { }
    extendGUI(gui) {
        // Slider for sling speed
        gui.add(this.animationParameters, 'movetail');
        gui.add(this.animationParameters, 'sling').min(9).max(120).step(1);
        gui.add(this.animationParameters, 'fov', 5.0, 85.0, 1.0);
        gui.remember(this.animationParameters);
        // Slider for shininess
        //gui.add(this.animationParameters!, 'shininess').min(0).max(20.0).step(0.1);
        gui.updateDisplay();
    }
    static degToRad(d) {
        return d * Math.PI / 180;
    }
    resizeCanvas(gl) { twgl.resizeCanvasToDisplaySize(gl.canvas); }
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
    initScene(gl, cap, cam, dictpar, sceneReadyCallback) {
        console.log("-> initScene MixedTextureScene");
        var p = this.twglprograminfo;
        gl.useProgram(p.program);
        this.animationParameters = cap;
        // Define shader syntax for attributes
        cap.movetail = false;
        // Camera: prepare vs-fs transformation
        this.matrixLocation = gl.getUniformLocation(p.program, "u_matrix");
        // Create the position buffer and decide where the current vertex data needs to go ------------------------------------ 
        this.positionBuffer = gl.createBuffer();
        this.positionAttributeLocation = gl.getAttribLocation(p.program, "a_position");
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);
        this.restorePositionAttributeContext(gl, this.positionBuffer, this.positionAttributeLocation, 3);
        /*  gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
          gl.enableVertexAttribArray(this.positionAttributeLocation);  // turn on
          // => Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
          var size = 3;          // 3 components per iteration
          var type = gl.FLOAT;   // the data is 32bit floats
          var normalize = false; // don't normalize the data
          var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
          var offset = 0;        // start at the beginning of the buffer
          gl.vertexAttribPointer(this.positionAttributeLocation, size, type, normalize, stride, offset);
    */
        // => Put setGeometry() result into position buffer 
        gl.bufferData(gl.ARRAY_BUFFER, this.setGeometry(gl), gl.STATIC_DRAW);
        // Create the texcoord buffer, make it the current ARRAY_BUFFER and copy in the texcoord values ---------------
        var texcoordBuffer1 = gl.createBuffer();
        var texcoordAttributeLocation = gl.getAttribLocation(p.program, "a_texcoord");
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer1);
        gl.enableVertexAttribArray(texcoordAttributeLocation); // turn on
        // => Tell the attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
        var size = 2; // 2 components per iteration
        var type = gl.FLOAT; // the data is 32bit floating point values
        var normalize = true; // convert from 0-255 to 0.0-1.0
        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next color
        var offset = 0; // start at the beginning of the buffer
        gl.vertexAttribPointer(texcoordAttributeLocation, size, type, normalize, stride, offset);
        // => Put setTexCoords() result into texcoord  buffer 
        gl.bufferData(gl.ARRAY_BUFFER, this.setTexcoords(gl), gl.STATIC_DRAW);
        // Create textures ----------------------------------------------------------------------------------------------------
        // => fill texture1 with 3x2 pixels red checkerboard
        this.texture1 = gl.createTexture();
        this.textureLocation1 = gl.getUniformLocation(p.program, "u_texture1");
        gl.bindTexture(gl.TEXTURE_2D, this.texture1);
        const level = 0;
        const internalFormat = gl.R8;
        const width = 3;
        const height = 2;
        const border = 0;
        const format = gl.RED;
        const ttype = gl.UNSIGNED_BYTE;
        const data = new Uint8Array([128, 64, 128, 0, 192, 0]);
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, ttype, data);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // => fill texture2 with clover jpg
        this.texture2 = gl.createTexture();
        this.textureLocation2 = gl.getUniformLocation(p.program, "u_texture2");
        gl.bindTexture(gl.TEXTURE_2D, this.texture2);
        console.log("=> Load texture bitmap");
        var fNameParcel = require('./../resources/models/stone/clover.jpg');
        //this.image = undefined;
        this.readimage = new Image();
        this.readimage.src = fNameParcel;
        this.readimage.onload = () => {
            //  this.image = this.readimage!;
            //  console.log("finished loading clover texture "+this.image.width+","+ this.image.height);
            var mipLevel = 0; // the largest mip
            var internalFormat = gl.RGBA; // format we want in the texture
            var srcFormat = gl.RGBA; // format of data we are supplying
            var srcType = gl.UNSIGNED_BYTE; // type of data we are supplying
            gl.texImage2D(gl.TEXTURE_2D, mipLevel, internalFormat, srcFormat, srcType, this.readimage);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            console.log("<- initScene MixedTextureScene texture read");
            if (sceneReadyCallback != undefined)
                sceneReadyCallback(0);
        };
    }
    drawScene(gl, cam, time) {
        gl.useProgram(this.twglprograminfo.program);
        gl.bindVertexArray(this.vao); //this always comes first !
        // 2023-01-03 prevent clear issues
        this.restorePositionAttributeContext(gl, this.positionBuffer, this.positionAttributeLocation, 3);
        gl.activeTexture(gl.TEXTURE0 + 0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture1);
        gl.uniform1i(this.textureLocation1, 0); // GPU will address unit 0 to find texture1
        gl.activeTexture(gl.TEXTURE0 + 1);
        gl.bindTexture(gl.TEXTURE_2D, this.texture2);
        gl.uniform1i(this.textureLocation2, 1); // GPU will address unit 1 to find texture2
        // Time elapsed
        var deltaTime = time - this.ctime;
        this.ctime = time;
        // Set world
        var world = twgl_js_1.m4.identity();
        world = twgl_js_1.m4.translation([0, 10.0, 0]);
        // Animate the rotation
        if (this.animationParameters.movetail) {
            this.modelYRotationRadians += 0.1 * this.animationParameters.speed * deltaTime;
            this.modelXRotationRadians += 0.005 * this.animationParameters.speed * this.animationParameters.sling * deltaTime;
        }
        var matrix = twgl_js_1.m4.rotateX(cam.viewProjection, this.modelXRotationRadians);
        matrix = twgl_js_1.m4.rotateY(matrix, this.modelYRotationRadians);
        matrix = twgl_js_1.m4.multiply(matrix, world);
        // Set projection matrix
        gl.uniformMatrix4fv(this.matrixLocation, false, matrix);
        // Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 6 * 6;
        gl.drawArrays(primitiveType, offset, count);
    }
    //================================================================================
    setGeometry(gl) {
        var positions = new Float32Array([
            -10.0, -10.0, -10.0,
            -10.0, 10.0, -10.0,
            10.0, -10.0, -10.0,
            -10.0, 10.0, -10.0,
            10.0, 10.0, -10.0,
            10.0, -10.0, -10.0,
            -10.0, -10.0, 10.0,
            10.0, -10.0, 10.0,
            -10.0, 10.0, 10.0,
            -10.0, 10.0, 10.0,
            10.0, -10.0, 10.0,
            10.0, 10.0, 10.0,
            -10.0, 10.0, -10.0,
            -10.0, 10.0, 10.0,
            10.0, 10.0, -10.0,
            -10.0, 10.0, 10.0,
            10.0, 10.0, 10.0,
            10.0, 10.0, -10.0,
            -10.0, -10.0, -10.0,
            10.0, -10.0, -10.0,
            -10.0, -10.0, 10.0,
            -10.0, -10.0, 10.0,
            10.0, -10.0, -10.0,
            10.0, -10.0, 10.0,
            -10.0, -10.0, -10.0,
            -10.0, -10.0, 10.0,
            -10.0, 10.0, -10.0,
            -10.0, -10.0, 10.0,
            -10.0, 10.0, 10.0,
            -10.0, 10.0, -10.0,
            10.0, -10.0, -10.0,
            10.0, 10.0, -10.0,
            10.0, -10.0, 10.0,
            10.0, -10.0, 10.0,
            10.0, 10.0, -10.0,
            10.0, 10.0, 10.0,
        ]);
        return positions;
    }
    // Fill the buffer with texture coordinates the cube.
    setTexcoords(gl) {
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
    }
}
exports.MixedTextureScene = MixedTextureScene;
//# sourceMappingURL=mixedtexturescene.js.map