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
exports.DrawInstanced = void 0;
const twgl = __importStar(require("./../node_modules/twgl.js")); // Greg's work
const twgl_js_1 = require("./../node_modules/twgl.js");
class DrawInstanced {
    constructor() {
        this.vertexShaderSource = `#version 300 es
in vec4 a_position;
in vec4 color;
in mat4 matrix;
uniform mat4 projection;
uniform mat4 view;

out vec4 v_color;

void main() {
  // Multiply the position by the matrix.
  gl_Position = projection * view * matrix * a_position;

  // Pass the vertex color to the fragment shader.
  v_color = color;
}
`;
        this.fragmentShaderSource = `#version 300 es
precision highp float;

// Passed in from the vertex shader.
in vec4 v_color;

out vec4 outColor;

void main() {
  outColor = v_color;
}
`;
        this.numVertices = 12;
        this.numInstances = 5;
        this.matrices = [];
    }
    resizeCanvas(gl) { twgl.resizeCanvasToDisplaySize(gl.canvas); }
    main(gl) {
        twgl.setAttributePrefix("a_");
        this.gl = gl;
        const programInfo = twgl.createProgramInfo(gl, [this.vertexShaderSource, this.fragmentShaderSource]);
        this.program = programInfo.program;
        const positionLoc = gl.getAttribLocation(this.program, 'a_position');
        const colorLoc = gl.getAttribLocation(this.program, 'color');
        const matrixLoc = gl.getAttribLocation(this.program, 'matrix');
        this.projectionLoc = gl.getUniformLocation(this.program, 'projection');
        this.viewLoc = gl.getUniformLocation(this.program, 'view');
        // Create a vertex array object (attribute state)
        this.vao = gl.createVertexArray();
        // and make it the one we're currently working with
        gl.bindVertexArray(this.vao);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            /*    -0.1,  0.4,
                -0.1, -0.4,
                 0.1, -0.4,
                 0.1, -0.4,
                -0.1,  0.4,
                 0.1,  0.4,
                 0.4, -0.1,
                -0.4, -0.1,
                -0.4,  0.1,
                -0.4,  0.1,
                 0.4, -0.1,
                 0.4,  0.1, */ // corrected Greggs list to have the triangles of each spoke turn in the same direction.
            // this will allow  gl.enable(gl.DEPTH_TEST) and gl.enable(gl.CULL_FACE) in the
            // preparation when this is ported to a scene class.
            -0.1, 0.4,
            -0.1, -0.4,
            0.1, -0.4,
            -0.1, 0.4,
            0.1, -0.4,
            0.1, 0.4,
            -0.4, -0.1,
            0.4, -0.1,
            -0.4, 0.1,
            -0.4, 0.1,
            0.4, -0.1,
            0.4, 0.1,
        ]), gl.STATIC_DRAW);
        this.numVertices = 12;
        // setup the position attribute
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, // location
        2, // size (num values to pull from buffer per iteration)
        gl.FLOAT, // type of data in buffer
        false, // normalize
        0, // stride (0 = compute from size and type above)
        0);
        // setup matrixes, one per instance
        this.numInstances = 5;
        // make a typed array with one view per matrix
        this.matrixData = new Float32Array(this.numInstances * 16);
        for (let i = 0; i < this.numInstances; ++i) {
            const byteOffsetToMatrix = i * 16 * 4;
            const numFloatsForView = 16;
            this.matrices.push(new Float32Array(this.matrixData.buffer, byteOffsetToMatrix, numFloatsForView));
        }
        this.matrixBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.matrixBuffer);
        // just allocate the buffer
        gl.bufferData(gl.ARRAY_BUFFER, this.matrixData.byteLength, gl.DYNAMIC_DRAW);
        // set all 4 attributes for matrix
        const bytesPerMatrix = 4 * 16;
        for (let i = 0; i < 4; ++i) {
            const loc = matrixLoc + i;
            gl.enableVertexAttribArray(loc);
            // note the stride and offset
            const offset = i * 16; // 4 floats per row, 4 bytes per float
            gl.vertexAttribPointer(loc, // location
            4, // size (num values to pull from buffer per iteration)
            gl.FLOAT, // type of data in buffer
            false, // normalize
            bytesPerMatrix, // stride, num bytes to advance to get to next set of values
            offset);
            // this line says this attribute only changes for each 1 instance
            gl.vertexAttribDivisor(loc, 1);
        }
        // setup colors, one per instance
        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            1, 0, 0, 1,
            0, 1, 0, 1,
            0, 0, 1, 1,
            1, 0, 1, 1,
            0, 1, 1, 1, // cyan
        ]), gl.STATIC_DRAW);
        // set attribute for color
        gl.enableVertexAttribArray(colorLoc);
        gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
        // this line says this attribute only changes for each 1 instance
        gl.vertexAttribDivisor(colorLoc, 1);
        requestAnimationFrame(() => this.drawScene(0.0));
    }
    drawScene(time) {
        var gl = this.gl;
        time *= 0.001; // seconds
        twgl.resizeCanvasToDisplaySize(gl.canvas);
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.useProgram(this.program);
        // set the view and projection matrices since
        // they are shared by all instances
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        gl.uniformMatrix4fv(this.projectionLoc, false, twgl_js_1.m4.ortho(-aspect, aspect, -1, 1, -1, 1));
        gl.uniformMatrix4fv(this.viewLoc, false, twgl_js_1.m4.axisRotation([0, 0, 1], time * .1));
        // setup all attributes
        gl.bindVertexArray(this.vao);
        // update all the matrices
        this.matrices.forEach((mat, ndx) => {
            twgl_js_1.m4.translation([-0.5 + ndx * 0.25, 0, 0], mat);
            twgl_js_1.m4.axisRotate(mat, [0, 0, 1], time * (0.1 + 0.1 * ndx), mat);
        });
        // upload the new matrix data
        gl.bindBuffer(gl.ARRAY_BUFFER, this.matrixBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.matrixData);
        gl.drawArraysInstanced(gl.TRIANGLES, 0, // offset
        this.numVertices, // num vertices per instance
        this.numInstances);
        //requestAnimationFrame(render);
        requestAnimationFrame((time) => this.drawScene(time));
    }
}
exports.DrawInstanced = DrawInstanced;
//# sourceMappingURL=drawinstanced.js.map