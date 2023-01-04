"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mat4tools = void 0;
const twgl_js_1 = require("./../node_modules/twgl.js");
// below addendum to Greg's tools was ported from mat4.js
class mat4tools {
    quatFromRotationMatrix(m, dst) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
        //var m2 =m4.inverse(m);
        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        const m11 = m[0];
        const m12 = m[4];
        const m13 = m[8];
        const m21 = m[1];
        const m22 = m[5];
        const m23 = m[9];
        const m31 = m[2];
        const m32 = m[6];
        const m33 = m[10];
        const trace = m11 + m22 + m33;
        if (trace > 0) {
            const s = 0.5 / Math.sqrt(trace + 1);
            dst[3] = 0.25 / s;
            dst[0] = (m32 - m23) * s;
            dst[1] = (m13 - m31) * s;
            dst[2] = (m21 - m12) * s;
        }
        else if (m11 > m22 && m11 > m33) {
            const s = 2 * Math.sqrt(1 + m11 - m22 - m33);
            dst[3] = (m32 - m23) / s;
            dst[0] = 0.25 * s;
            dst[1] = (m12 + m21) / s;
            dst[2] = (m13 + m31) / s;
        }
        else if (m22 > m33) {
            const s = 2 * Math.sqrt(1 + m22 - m11 - m33);
            dst[3] = (m13 - m31) / s;
            dst[0] = (m12 + m21) / s;
            dst[1] = 0.25 * s;
            dst[2] = (m23 + m32) / s;
        }
        else {
            const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
            dst[3] = (m21 - m12) / s;
            dst[0] = (m13 + m31) / s;
            dst[1] = (m23 + m32) / s;
            dst[2] = 0.25 * s;
        }
    }
    lengthnum4(v) {
        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    }
    lengthfa(v) {
        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    }
    determinate(m) {
        var m00 = m[0 * 4 + 0];
        var m01 = m[0 * 4 + 1];
        var m02 = m[0 * 4 + 2];
        var m03 = m[0 * 4 + 3];
        var m10 = m[1 * 4 + 0];
        var m11 = m[1 * 4 + 1];
        var m12 = m[1 * 4 + 2];
        var m13 = m[1 * 4 + 3];
        var m20 = m[2 * 4 + 0];
        var m21 = m[2 * 4 + 1];
        var m22 = m[2 * 4 + 2];
        var m23 = m[2 * 4 + 3];
        var m30 = m[3 * 4 + 0];
        var m31 = m[3 * 4 + 1];
        var m32 = m[3 * 4 + 2];
        var m33 = m[3 * 4 + 3];
        var tmp_0 = m22 * m33;
        var tmp_1 = m32 * m23;
        var tmp_2 = m12 * m33;
        var tmp_3 = m32 * m13;
        var tmp_4 = m12 * m23;
        var tmp_5 = m22 * m13;
        var tmp_6 = m02 * m33;
        var tmp_7 = m32 * m03;
        var tmp_8 = m02 * m23;
        var tmp_9 = m22 * m03;
        var tmp_10 = m02 * m13;
        var tmp_11 = m12 * m03;
        var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
            (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
            (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
            (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
            (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
        return 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
    }
    decompose(mat, translation, quaternion, scale) {
        var fasx = new Float32Array(mat.slice(0, 3));
        let sx = this.lengthfa(fasx);
        var fasy = new Float32Array(mat.slice(4, 7));
        const sy = this.lengthfa(fasy);
        var fasz = new Float32Array(mat.slice(8, 11));
        const sz = this.lengthfa(fasz);
        // if determinate is negative, we need to invert one scale
        const det = this.determinate(mat);
        if (det < 0) {
            sx = -sx;
        }
        translation[0] = mat[12];
        translation[1] = mat[13];
        translation[2] = mat[14];
        // scale the rotation part
        const matrix = twgl_js_1.m4.copy(mat);
        const invSX = 1 / sx;
        const invSY = 1 / sy;
        const invSZ = 1 / sz;
        matrix[0] *= invSX;
        matrix[1] *= invSX;
        matrix[2] *= invSX;
        matrix[4] *= invSY;
        matrix[5] *= invSY;
        matrix[6] *= invSY;
        matrix[8] *= invSZ;
        matrix[9] *= invSZ;
        matrix[10] *= invSZ;
        this.quatFromRotationMatrix(matrix, quaternion);
        scale[0] = sx;
        scale[1] = sy;
        scale[2] = sz;
    }
    /**
     * creates a matrix from translation, quaternion, scale
     * @param {Number[]} translation [x, y, z] translation
     * @param {Number[]} quaternion [x, y, z, z] quaternion rotation
     * @param {Number[]} scale [x, y, z] scale
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     */
    compose(translation, quaternion, scale, dst) {
        //dst = dst || new m4.Mat4();
        const x = quaternion[0];
        const y = quaternion[1];
        const z = quaternion[2];
        const w = quaternion[3];
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const xy = x * y2;
        const xz = x * z2;
        const yy = y * y2;
        const yz = y * z2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        const sx = scale[0];
        const sy = scale[1];
        const sz = scale[2];
        dst[0] = (1 - (yy + zz)) * sx;
        dst[1] = (xy + wz) * sx;
        dst[2] = (xz - wy) * sx;
        dst[3] = 0;
        dst[4] = (xy - wz) * sy;
        dst[5] = (1 - (xx + zz)) * sy;
        dst[6] = (yz + wx) * sy;
        dst[7] = 0;
        dst[8] = (xz + wy) * sz;
        dst[9] = (yz - wx) * sz;
        dst[10] = (1 - (xx + yy)) * sz;
        dst[11] = 0;
        dst[12] = translation[0];
        dst[13] = translation[1];
        dst[14] = translation[2];
        dst[15] = 1;
        return dst;
    }
    /**
 * Computes the inverse of a matrix.
 * @param {Matrix4} m matrix to compute inverse of
 * @param {Matrix4} [dst] optional matrix to store result
 * @return {Matrix4} dst or a new matrix if none provided
 * @memberOf module:webgl-3d-math
 */
    inverse(m, dst) {
        //dst = dst || new MatType(16);
        var m00 = m[0 * 4 + 0];
        var m01 = m[0 * 4 + 1];
        var m02 = m[0 * 4 + 2];
        var m03 = m[0 * 4 + 3];
        var m10 = m[1 * 4 + 0];
        var m11 = m[1 * 4 + 1];
        var m12 = m[1 * 4 + 2];
        var m13 = m[1 * 4 + 3];
        var m20 = m[2 * 4 + 0];
        var m21 = m[2 * 4 + 1];
        var m22 = m[2 * 4 + 2];
        var m23 = m[2 * 4 + 3];
        var m30 = m[3 * 4 + 0];
        var m31 = m[3 * 4 + 1];
        var m32 = m[3 * 4 + 2];
        var m33 = m[3 * 4 + 3];
        var tmp_0 = m22 * m33;
        var tmp_1 = m32 * m23;
        var tmp_2 = m12 * m33;
        var tmp_3 = m32 * m13;
        var tmp_4 = m12 * m23;
        var tmp_5 = m22 * m13;
        var tmp_6 = m02 * m33;
        var tmp_7 = m32 * m03;
        var tmp_8 = m02 * m23;
        var tmp_9 = m22 * m03;
        var tmp_10 = m02 * m13;
        var tmp_11 = m12 * m03;
        var tmp_12 = m20 * m31;
        var tmp_13 = m30 * m21;
        var tmp_14 = m10 * m31;
        var tmp_15 = m30 * m11;
        var tmp_16 = m10 * m21;
        var tmp_17 = m20 * m11;
        var tmp_18 = m00 * m31;
        var tmp_19 = m30 * m01;
        var tmp_20 = m00 * m21;
        var tmp_21 = m20 * m01;
        var tmp_22 = m00 * m11;
        var tmp_23 = m10 * m01;
        var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
            (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
            (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
            (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
            (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
        var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
        dst[0] = d * t0;
        dst[1] = d * t1;
        dst[2] = d * t2;
        dst[3] = d * t3;
        dst[4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
            (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
        dst[5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
            (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
        dst[6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
            (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
        dst[7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
            (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
        dst[8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
            (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
        dst[9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
            (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
        dst[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
            (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
        dst[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
            (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
        dst[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
            (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
        dst[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
            (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
        dst[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
            (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
        dst[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
            (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));
        return dst;
    }
}
exports.mat4tools = mat4tools;
//# sourceMappingURL=mat4tools.js.map