"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twglbasescene = void 0;
const twgl_js_1 = require("twgl.js");
class twglbasescene {
    constructor() {
        this.modelXRotationRadians = 0.0;
        this.modelYRotationRadians = 0.0;
    }
    initMatrixUniforms(gl, program) {
        // lookup uniforms
        this.worldViewProjectionLocation = gl.getUniformLocation(program, "u_worldViewProjection");
        this.worldInverseTransposeLocation = gl.getUniformLocation(program, "u_worldInverseTranspose");
        this.worldLocation = gl.getUniformLocation(program, "u_world");
    }
    initSingleObject(gl, program, setGeometry, setNormals) {
        // Create a vertex array object (attribute state)
        this.vao = gl.createVertexArray();
        // and make it the one we're currently working with
        gl.bindVertexArray(this.vao);
        // look up where the vertex data needs to go.
        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        var normalAttributeLocation = gl.getAttribLocation(program, "a_normal");
        // Turn on the attribute
        gl.enableVertexAttribArray(positionAttributeLocation);
        // Create a buffer
        var positionBuffer = gl.createBuffer();
        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // Set Geometry.
        setGeometry(gl);
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
        setNormals(gl);
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
    renderCameraSingleRotatingObjectPrologue(gl, cam, deltaTime) {
        var viewProjectionMatrix = cam.viewProjection; // m4.multiply(projectionMatrix, viewMatrix);
        this.renderMatrixSingleRotatingObjectPrologue(gl, viewProjectionMatrix, deltaTime);
        gl.bindVertexArray(this.vao);
    }
    renderMatrixSingleRotatingObjectPrologue(gl, viewProjectionMatrix, deltaTime) {
        if (this.animationParameters.b.move) {
            this.modelYRotationRadians += 0.05 * this.animationParameters.b.speed * deltaTime;
            this.modelXRotationRadians += 0.05 * this.animationParameters.b.speed * deltaTime;
        }
        var matrixXRot = twgl_js_1.m4.axisRotation([1, 0, 0], this.modelXRotationRadians);
        var matrixYRot = twgl_js_1.m4.axisRotation([0, 1, 0], this.modelYRotationRadians);
        var worldMatrix = twgl_js_1.m4.multiply(matrixXRot, matrixYRot); // m4.axisRotation([0,1,0],this.fRotationRadians) ;
        var worldViewProjectionMatrix = twgl_js_1.m4.multiply(viewProjectionMatrix, worldMatrix);
        // Set the matrices
        gl.uniformMatrix4fv(this.worldLocation, false, worldMatrix);
        gl.uniformMatrix4fv(this.worldViewProjectionLocation, false, worldViewProjectionMatrix);
        var worldInverseMatrix = twgl_js_1.m4.inverse(worldMatrix);
        var worldInverseTransposeMatrix = twgl_js_1.m4.transpose(worldInverseMatrix);
        gl.uniformMatrix4fv(this.worldInverseTransposeLocation, false, worldInverseTransposeMatrix);
    }
}
exports.twglbasescene = twglbasescene;
//# sourceMappingURL=twglbasescene.js.map