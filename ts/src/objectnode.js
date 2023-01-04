"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodesProducer = exports.Node = exports.NodeTransforms = void 0;
const twgl_js_1 = require("./../node_modules/twgl.js");
class NodeTransforms // Gregg's TRS
 {
    constructor() {
        this.translation = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
    }
    getMatrix(dst) {
        dst = dst || twgl_js_1.m4.identity();
        var t = this.translation;
        var r = this.rotation;
        var s = this.scale;
        //console.log("t="+t+" r="+r+" s="+s);
        // compute a matrix from translation, rotation, and scale
        twgl_js_1.m4.translation(t, dst);
        twgl_js_1.m4.axisRotate(dst, [1, 0, 0], r[0], dst);
        //console.log("r[0]="+r[0]+" dst="+dst);
        twgl_js_1.m4.axisRotate(dst, [0, 1, 0], r[1], dst);
        twgl_js_1.m4.axisRotate(dst, [0, 0, 1], r[2], dst);
        twgl_js_1.m4.scale(dst, s, dst);
        return dst;
    }
    ;
}
exports.NodeTransforms = NodeTransforms;
;
class Node {
    constructor(source) {
        this.children = [];
        this.localMatrix = twgl_js_1.m4.identity();
        this.worldMatrix = twgl_js_1.m4.identity();
        this.parent = null;
        //  drawInfo: NodeDrawInfo|null = null;
        this.drawInfo = null;
        this.source = source;
    }
    ;
    setParent(parent) {
        // Disconnect from existing parent
        if (this.parent) {
            var ndx = this.parent.children.indexOf(this);
            if (ndx >= 0)
                this.parent.children.splice(ndx, 1);
        }
        // Add to new parent, assign
        if (parent)
            parent.children.push(this);
        this.parent = parent;
    }
    ;
    updateWorldMatrix(matrix) {
        var source = this.source;
        if (source)
            source.getMatrix(this.localMatrix);
        if (matrix)
            // a matrix was passed in so do the math
            twgl_js_1.m4.multiply(matrix, this.localMatrix, this.worldMatrix);
        else
            // no matrix was passed in so just copy.
            twgl_js_1.m4.copy(this.localMatrix, this.worldMatrix);
        // now process all the children
        var worldMatrix = this.worldMatrix;
        this.children.forEach(function (child) {
            child.updateWorldMatrix(worldMatrix);
        });
    }
    ;
}
exports.Node = Node;
class NodesProducer {
    constructor(programInfo, cubeBufferInfo) {
        this.programInfo = programInfo;
        this.cubeBufferInfo = cubeBufferInfo;
        // result
        this.nodeInfosByName = {};
        this.objectsToDraw = [];
        this.objects = [];
        this.makeNode = (nodeDescription) => {
            var trs = new NodeTransforms();
            var cnode = new Node(trs);
            this.nodeInfosByName[nodeDescription.name] = {
                trs: trs,
                node: cnode,
            };
            trs.rotation = [0, 0, 0];
            // if (orientationAnglexz!=undefined) trs.rotation = [0,orientationAnglexz,0]; // Lx initial rotation of the model
            trs.scale = nodeDescription.scaling || trs.scale;
            trs.translation = nodeDescription.translation || trs.translation;
            if (nodeDescription.draw !== false) {
                cnode.drawInfo = {
                    uniforms: {
                        u_colorOffset: [0, 0, 0.6, 0],
                        u_colorMult: [0.4, 0.4, 0.4, 1],
                        u_matrix: undefined
                    },
                    programInfo: this.programInfo,
                    bufferInfo: this.cubeBufferInfo,
                };
                this.objectsToDraw.push(cnode.drawInfo);
                this.objects.push(cnode);
            }
            var makeNodes = (nodeDescriptions) => {
                return nodeDescriptions ? nodeDescriptions.map(this.makeNode) : [];
            };
            makeNodes(nodeDescription.children).forEach(function (child) {
                child.setParent(cnode);
            });
            return cnode;
        };
    }
}
exports.NodesProducer = NodesProducer;
//# sourceMappingURL=objectnode.js.map