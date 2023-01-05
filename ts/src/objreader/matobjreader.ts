// https://www.npmjs.com/package/webgl-obj-loader

import * as webglobjloader from 'webgl-obj-loader';

import { ExtendedGLBuffer, MaterialLibrary, Mesh } from 'webgl-obj-loader';

export var mesh: webglobjloader.Mesh;

export var meshMinMax: {
  minx: number;
  maxx: number;
  miny: number;
  maxy: number;
  minz: number;
  maxz: number;
}

export var meshWithBuffers: webglobjloader.MeshWithBuffers;

export function CreateMeshWithBuffers(gl: WebGL2RenderingContext)
{
  meshWithBuffers = webglobjloader.initMeshBuffers(gl, mesh); // use lib
  console.log("meshWithBuffers.vertexBuffer.numItems="+meshWithBuffers.vertexBuffer.numItems);
  console.log("meshWithBuffers.vertexBuffer.vertices.length="+meshWithBuffers.vertices.values.length);
  console.log("meshWithBuffers.vertexBuffer.vertices.values.length="+meshWithBuffers.vertices.values.length);
  console.log("meshWithBuffers.normalBuffer.numItems="+meshWithBuffers.normalBuffer.numItems);
  console.log("meshWithBuffers.indices.length="+meshWithBuffers.indices.length);
  console.log("meshWithBuffers.indexBuffer.numItems="+meshWithBuffers.indexBuffer.numItems);
  console.log("meshWithBuffers.textureBuffer.numItems="+meshWithBuffers.textureBuffer.numItems);
}

export function NumElements()
{ return meshWithBuffers?.indexBuffer.numItems; }

function buildBuffer(gl: WebGLRenderingContext, type: GLenum, data: number[], itemSize: number): ExtendedGLBuffer {
  const buffer = gl.createBuffer() as ExtendedGLBuffer;
  const arrayView = type === gl.ARRAY_BUFFER ? Float32Array : Uint16Array;
  gl.bindBuffer(type, buffer);
  gl.bufferData(type, new arrayView(data), gl.STATIC_DRAW);
  buffer.itemSize = itemSize;
  buffer.numItems = data.length / itemSize;
  return buffer;
}

export function render(gl: WebGLRenderingContext, vertexPositionAttribute: number, normalAttribute: number, texCoordAttribute: number, offset: number )
{
    gl.bindBuffer(gl.ARRAY_BUFFER, meshWithBuffers.vertexBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, meshWithBuffers.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, meshWithBuffers.normalBuffer);
    gl.vertexAttribPointer(normalAttribute, meshWithBuffers.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);  
    var cindexBuffer = buildBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, mesh.indicesPerMaterial[offset], 1);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cindexBuffer);
    if(!mesh.textures.length){
            gl.disableVertexAttribArray(texCoordAttribute);
           }
           else{
             gl.enableVertexAttribArray(texCoordAttribute);
             gl.bindBuffer(gl.ARRAY_BUFFER, meshWithBuffers.textureBuffer);
             gl.vertexAttribPointer(texCoordAttribute, meshWithBuffers.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);
           }
   gl.drawElements(gl.TRIANGLES,mesh.indicesPerMaterial[offset].length, gl.UNSIGNED_SHORT, 0);
}

//===============================================================================================================================================================

var matlib: webglobjloader.MaterialLibrary;
var indexBuffers: ExtendedGLBuffer[] = [];

export function renderIndexBuffer(gl: WebGLRenderingContext, vertexPositionAttribute: number, normalAttribute: number, texCoordAttribute: number, offset: number, 
                                  texItemSize:number, tex: WebGLTexture )
{
  gl.bindBuffer(gl.ARRAY_BUFFER, meshWithBuffers.vertexBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, meshWithBuffers.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, meshWithBuffers.normalBuffer);
    gl.vertexAttribPointer(normalAttribute, meshWithBuffers.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);  
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffers[offset]);
    gl.bindTexture(gl.TEXTURE_2D,  tex);
    gl.enableVertexAttribArray(texCoordAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, meshWithBuffers.textureBuffer);
    gl.vertexAttribPointer(texCoordAttribute, texItemSize, gl.FLOAT, false, 0, 0);
    gl.drawElements(gl.TRIANGLES,mesh.indicesPerMaterial[offset].length, gl.UNSIGNED_SHORT, 0);
}

export function PrepareIndexBuffers(gl: WebGLRenderingContext )
{
  for (var i=0; i<mesh.materialNames.length; i++)
  {
    indexBuffers.push( buildBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, mesh.indicesPerMaterial[i], 1));
  }
}

function MeshMinMax(): {minx: number, maxx: number, miny: number, maxy: number, minz: number, maxz: number}
{
  var minx: number = 1e8;
  var maxx: number = -1e8;
  var miny: number = 1e8;
  var maxy: number = -1e8;
  var minz: number = 1e8;
  var maxz: number = -1e8;
  var i: number;
  for (i=0; i<mesh.vertices.length; i+=3)
  { 
    if (mesh.vertices[i+0]<minx) minx=mesh.vertices[i+0]; 
    if (mesh.vertices[i+1]<miny) miny=mesh.vertices[i+1]; 
    if (mesh.vertices[i+2]<minz) minz=mesh.vertices[i+2]; 
    if (mesh.vertices[i+0]>maxx) maxx=mesh.vertices[i+0]; 
    if (mesh.vertices[i+1]>maxy) maxy=mesh.vertices[i+1]; 
    if (mesh.vertices[i+2]>maxz) maxz=mesh.vertices[i+2]; 
  }  
  return {minx,maxx, miny,maxy, minz, maxz};
}

function meshReport(): { smatreport: string; smeshreport: string}
{
  var rv = { smatreport: "", smeshreport: "" }
  rv.smeshreport+=("mesh.indices.length="+mesh.indices.length+" mesh.vertices.length="+mesh.vertices.length+" mesh.vertexNormals.length="+mesh.vertexNormals.length+"<br />");
  rv.smeshreport+=("mesh.vertexMaterialIndices.length="+mesh.vertexMaterialIndices.length); //+" vertices.length="+mesh.vertices.length+" vertexNormals.length="+mesh.vertexNormals.length);

  var mats = matlib.materials;    
  for (let key in mats) {
    var value = mats[key];
    rv.smatreport+=value.name+ " dif="+value.diffuse+" amb="+value.ambient+" emis="+value.emissive+" spec="+value.specular+" mapamb=" +value.mapDiffuse.filename+" ill="+value.illumination+"<br/>";
  }
  meshMinMax = MeshMinMax();
  rv.smeshreport+="<br/>";
  rv.smeshreport+="minx="+meshMinMax.minx+", maxx="+meshMinMax.maxx+"<br />";
  rv.smeshreport+="miny="+meshMinMax.miny+", maxy="+meshMinMax.maxy+"<br />";
  rv.smeshreport+="minz="+meshMinMax.minz+", maxz="+meshMinMax.maxz+"<br />";
  return rv;
}

//--- FETCH OBJ+MTL --------------------------------------------------------------------------------------

async function FetchText(cparcelname: string){
  const res = await fetch(cparcelname);
  var b= await res.arrayBuffer();
  var enc = new TextDecoder("utf-8");
  return enc.decode(b);
}

export async function FetchImage(cparcelname: string): Promise<ArrayBuffer> {
  const res = await fetch(cparcelname);
  return res.arrayBuffer();
}

export async function asyncFetchObjMtl(cobjname: string, cmatname: string)
{  
  var abobj = await FetchText(cobjname);
  var abmtl = await FetchText(cmatname);
    
  matlib = new MaterialLibrary(abmtl);     
  if (matlib)
    {
      var l = matlib.materials["Material"];
      if (l!=undefined) console.log("ambient="+l.ambient+" diffuse="+l.diffuse+" specular="+l.specular);     
      var cMeshOptions =  {           
          enableWTextureCoord: false,
          calcTangentsAndBitangents: false,
          materials:  matlib.materials
        };       
      mesh = new Mesh(abobj, cMeshOptions);
      if (mesh) {
          mesh.addMaterialLibrary(matlib);
          var rv = meshReport();
          const mydiv: HTMLDivElement = document.querySelector("#cdiv")!;
          var cstyle = "<style> thead {color: green;} tbody {color: blue;}tfoot {color: red;}table, th, td { border: 1px solid black;}</style>";
          if (mydiv) mydiv.innerHTML = cstyle+"<table><thead><tr><th style='horizontal-align:left'>MTL Material</th><th>OBJ Mesh</th></tr></thead><tbody><tr><td style='vertical-align:top;width:600px'>"+rv.smatreport +"</td><td style='vertical-align:top'>"+rv.smeshreport+"</td></tr></tbody></table>";     
       } else  console.log("object file  "+cobjname+" could not be read.");
     } else console.log("materials file "+cmatname+" could not be read"); 
}

//===========================================================================================================================================
//===========================================================================================================================================

export function GetDeclaredObjMtl()
{  
   console.log("strings fetched");
   var abobj= cubegeo;
   var abmtl= cubemat;
   //const arr = abobj.toString().replace(/\r\n/g,'\n').split('\n');
   if (webglobjloader)
  {    
      matlib = new MaterialLibrary(abmtl);
      if (matlib)
      {    
        var l = matlib.materials["Material"];
        console.log("Found material: "+l );
        if (l!=undefined) console.log("ambient="+l.ambient+" diffuse="+l.diffuse+" specular="+l.specular+" l.illum="+l.illumination);
        var cMeshOptions =  {
               enableWTextureCoord: false,
               calcTangentsAndBitangents: false,
               materials: matlib.materials
        };
        mesh = new Mesh(abobj, cMeshOptions);
        if (mesh) {
          mesh.addMaterialLibrary(matlib);
          var rv = meshReport();     
          const mydiv: HTMLDivElement = document.querySelector("#cdiv")!;
          var cstyle = "<style> thead {color: green;} tbody {color: blue;}tfoot {color: red;}table, th, td { border: 1px solid black;}</style>";
          if (mydiv) mydiv.innerHTML = cstyle+"<table><thead><tr><th style='horizontal-align:left'>MTL Material</th><th>OBJ Mesh</th></tr></thead><tbody><tr><td style='vertical-align:top;width:auto'>"+rv.smatreport +"</td><td style='width:600px;vertical-align:top'>"+rv.smeshreport+"</td></tr></tbody></table>";    
        } else  console.log("Cube obj in memory could not be read.");
     } else console.log("Cube obj materials could not be read"); 
   } else console.log("OBJ import library not accessible");  
    
}

//========================================================================================================================================================

/*
  function* triangulate(elements: string[]) {
    if (elements.length <= 3) {
        yield elements;
    } else if (elements.length === 4) {
        yield [elements[0], elements[1], elements[2]];
        yield [elements[2], elements[3], elements[0]];
    } else {
        for (let i = 1; i < elements.length - 1; i++) {
            yield [elements[0], elements[i], elements[i + 1]];
        }
    }
}
   //--- my own converter for  the obj
   const currentMaterialIndex = 0;
   const currentObjectByMaterialIndex = 0;
   const enableWTextureCoord=false;
   const verts = [];
   const vertNormals = [];
   const textures = [];
   const faces = [];
   const unpackedverts = [];
   const unpackedtextures = [];
   const unpackednorms = [];
   const unpackedhashindices: { [k: string]: number } = {}
   const unpackedindices: number[][] = [];
   var unpackedindex = 0;
   unpackedindices.push([]);
   for(let s of arr) {
    const elements = s.split(' ');
    elements.shift();
    if (s.startsWith('v '))
         verts.push(...elements);
       else
       if (s.startsWith('vt '))
         textures.push(...elements);
       else
       if (s.startsWith('vn '))
         vertNormals.push(...elements);
       else 
       if (s.startsWith('f '))
       {
        const triangles = triangulate(elements);
        for (let e of elements) console.log("["+e+"] ");
        var ntr=0;
        for (const triangle of triangles) {
            var srep = "";            
            for (const trianglepoint of triangle)
            {
              const hash = trianglepoint + "," + currentMaterialIndex;
              if (hash in unpackedhashindices) {
                unpackedindices[currentObjectByMaterialIndex].push(unpackedhashindices[hash]);
                srep+="{ Ref: "+hash+" },";
               } else 
                  {
                   const vertex = trianglepoint.split("/");
                   var v1 = +verts[(+vertex[0] - 1) * 3 + 0];
                   var v2 = +verts[(+vertex[0] - 1) * 3 + 1];
                   var v3 = +verts[(+vertex[0] - 1) * 3 + 2];
                   unpackedverts.push(v1);
                   unpackedverts.push(v2);
                   unpackedverts.push(v3);      
                   srep+="{ V["+v1+","+v2+","+v3+"], ";     
                   if (textures.length) {
                     const stride = enableWTextureCoord ? 3 : 2;
                     var t1=+textures[(+vertex[1] - 1) * stride + 0];
                     var t2=+textures[(+vertex[1] - 1) * stride + 1];
                     unpackedtextures.push(t1);
                     unpackedtextures.push(t2);
                     srep+="T["+t1+","+t2+"], ";
                     if (enableWTextureCoord) {
                       unpackedtextures.push(+textures[(+vertex[1] - 1) * stride + 2]);
                      }
                   } 
                   const normalIndex = vertex.length - 1;
                   var n1 = +vertNormals[(+vertex[normalIndex] - 1) * 3 + 0];
                   var n2 = +vertNormals[(+vertex[normalIndex] - 1) * 3 + 1];
                   var n3 = +vertNormals[(+vertex[normalIndex] - 1) * 3 + 2];
                   unpackednorms.push(n1);
                   unpackednorms.push(n2);
                   unpackednorms.push(n3);           
                   srep+="N["+n1+","+n2+","+n3+"] }, ";
                   unpackedhashindices[hash] = unpackedindex;
                   unpackedindices[currentObjectByMaterialIndex].push(unpackedhashindices[hash]);
                   unpackedindex += 1;     
                  }                         
            }
            console.log("Tr: { "+srep + "}") ;
            ntr+=triangle.length;
          }
        console.log("ntr="+ntr);
        faces.push(...elements);   
       }   
    
  }
*/  
/*
  console.log("Indices found:");
  unpackedindices[currentObjectByMaterialIndex].forEach((num)=>{console.log(num+" "); });
  console.log("Norms found:");
  unpackednorms.forEach((num)=>{console.log(num+" "); });
  console.log("Vertices found:");
  unpackedverts.forEach((num)=>{console.log(num+" "); });
*/

//========================================================================================================================================================

const cubemat = `# Blender MTL File: 'None'
# Material Count: 11

newmtl Material
Ns 323.999994
Ka 1.000000 1.000000 0.000000
Kd 0.500000 0.500000 1.000000
Ks 0.500000 0.500000 1.000000
Ke 0.0 1.0 0.0
Ni 1.000000
d 1.000000
illum 6

newmtl Material2
Ns 323.999994
Ka 0.000000 1.000000 0.000000
Kd 1.000000 0.500000 1.000000
Ks 1.000000 1.000000 0.000000
Ke 0.0 1.0 0.0
Ni 1.000000
d 1.000000
illum 6
`;

const cubegeo = `# Blender v2.80 (sub 75) OBJ File: ''
# www.blender.org
mtllib cube2.mtl
o Cube
v 1.000000 1.000000 -1.000000
v 1.000000 -1.000000 -1.000000
v 1.000000 1.000000 1.000000
v 1.000000 -1.000000 1.000000
v -1.000000 1.000000 -1.000000
v -1.000000 -1.000000 -1.000000
v -1.000000 1.000000 1.000000
v -1.000000 -1.000000 1.000000
v 4.000000 1.000000 -1.000000
v 4.000000 -1.000000 -1.000000
v 4.000000 1.000000 1.000000
v 4.000000 -1.000000 1.000000
v 3.000000 1.000000 -1.000000
v 3.000000 -1.000000 -1.000000
v 3.000000 1.000000 1.000000
v 3.000000 -1.000000 1.000000
vt 0.375000 0.000000
vt 0.625000 0.000000
vt 0.625000 0.250000
vt 0.375000 0.250000
vt 0.375000 0.250000
vt 0.625000 0.250000
vt 0.625000 0.500000
vt 0.375000 0.500000
vt 0.625000 0.750000
vt 0.375000 0.750000
vt 0.625000 0.750000
vt 0.625000 1.000000
vt 0.375000 1.000000
vt 0.125000 0.500000
vt 0.375000 0.500000
vt 0.375000 0.750000
vt 0.125000 0.750000
vt 0.625000 0.500000
vt 0.875000 0.500000
vt 0.875000 0.750000
vn 0.0000 1.0000 0.0000
vn 0.0000 0.0000 1.0000
vn -1.0000 0.0000 0.0000
vn 0.0000 -1.0000 0.0000
vn 1.0000 0.0000 0.0000
vn 0.0000 0.0000 -1.0000
usemtl Material
s off
f 1/1/1 5/2/1 7/3/1 3/4/1
f 4/5/2 3/6/2 7/7/2 8/8/2
f 8/8/3 7/7/3 5/9/3 6/10/3
f 6/10/4 2/11/4 4/12/4 8/13/4
f 2/14/5 1/15/5 3/16/5 4/17/5
f 6/18/6 5/19/6 1/20/6 2/11/6
usemtl Material2
f 9/1/1 13/2/1 15/3/1 11/4/1
f 12/5/2 11/6/2 15/7/2 16/8/2
f 16/8/3 15/7/3 13/9/3 14/10/3
f 14/10/4 10/11/4 12/12/4 16/13/4
f 10/14/5 9/15/5 11/16/5 12/17/5
f 14/18/6 13/19/6 9/20/6 10/11/6
`;
