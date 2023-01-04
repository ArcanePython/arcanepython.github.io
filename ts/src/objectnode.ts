import * as twgl from "./../node_modules/twgl.js";    // Greg's work
import { m4 } from "./../node_modules/twgl.js";


export interface NodeJson {
    draw: boolean;
    name: string;
    scaling: number[];
    translation: number[];
    children: NodeJson[];
  }

export class NodeTransforms     // Gregg's TRS
{
    translation: number[] = [0, 0, 0];
    rotation: number[] = [0, 0, 0];
    scale: number[] = [1, 1, 1];

    getMatrix  (dst: m4.Mat4)  {
        dst = dst || m4.identity();
        var t = this.translation;
        var r = this.rotation;
        var s = this.scale;
        //console.log("t="+t+" r="+r+" s="+s);
        // compute a matrix from translation, rotation, and scale
        m4.translation(t, dst);
        m4.axisRotate(dst,[1,0,0], r[0], dst);
        //console.log("r[0]="+r[0]+" dst="+dst);
        m4.axisRotate(dst,[0,1,0], r[1], dst);
        m4.axisRotate(dst,[0,0,1], r[2], dst);
        m4.scale(dst, s, dst);
        return dst;
    };
};
  
export type NodeInfoByName =
{
    trs: NodeTransforms;
    node: Node;
};

export type NodeDescription = 
{
    draw: boolean,
    name: string;
    scaling: number[];
    translation: number[];
    children: NodeDescription[];
}


export class Node
{
    source: NodeTransforms;
    children: Node[] = [];
    localMatrix: m4.Mat4 = m4.identity();
    worldMatrix: m4.Mat4 = m4.identity();
    parent: Node|null = null;
    //  drawInfo: NodeDrawInfo|null = null;
    drawInfo: twgl.DrawObject | null = null;

    constructor (source:NodeTransforms) {
        this.source = source;
    };

    setParent (parent: Node) {
        // Disconnect from existing parent
        if (this.parent) 
        {
            var ndx = this.parent.children.indexOf(this);
            if (ndx >= 0)  this.parent.children.splice(ndx, 1);           
        }    
        // Add to new parent, assign
        if (parent) parent.children.push(this);
        this.parent = parent;
    };

    updateWorldMatrix(matrix:m4.Mat4|undefined) {
        var source = this.source;
        if (source) source.getMatrix(this.localMatrix);
        if (matrix) 
        // a matrix was passed in so do the math
        m4.multiply(matrix, this.localMatrix, this.worldMatrix);
        else 
        // no matrix was passed in so just copy.
        m4.copy(this.localMatrix, this.worldMatrix);      
        // now process all the children
        var worldMatrix = this.worldMatrix;
        this.children.forEach(function(child) {
        child.updateWorldMatrix(worldMatrix);
        });
    };
}

export class NodesProducer
{
    constructor (public programInfo: twgl.ProgramInfo | undefined,
                 public cubeBufferInfo: twgl.BufferInfo | undefined)
    { }

    // result
    nodeInfosByName : {[key:string]:NodeInfoByName} = {};
    objectsToDraw: twgl.DrawObject[] = [];
    objects : Node[] = [];

    makeNode = (nodeDescription: NodeDescription):Node => {
        var trs  = new NodeTransforms();
        var cnode = new Node(trs);
        this.nodeInfosByName[nodeDescription.name] = {
            trs: trs,
            node: cnode,
        };
        trs.rotation = [0,0,0];
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
                programInfo: this.programInfo!,
                bufferInfo: this.cubeBufferInfo!,
            };
            this.objectsToDraw.push(cnode.drawInfo!);
            this.objects.push(cnode);
        }
        var makeNodes = (nodeDescriptions: NodeDescription[])  => {
            return nodeDescriptions ? nodeDescriptions.map(this.makeNode) : [];
         }
        makeNodes(nodeDescription.children).forEach(function(child: Node) {
           child.setParent(cnode);
         });   
        return cnode;
    }
}
