import * as stridedmesh0 from "./stridedmesh0" // mesh and bones data

type number2 = [number,number];
type number3 = [number,number,number];
type number4 = [number,number,number,number];
 
//type number4 = number[];
//type number2 = number[];
 
export class StridedMesh extends stridedmesh0.StridedMesh0
{
  
  
  getFishHPositions()
  {
    var pos =  this.build3DTrianglesPositions(this.nsegments, this.nrows, this.nsegments);   
    return pos;
  }
  
  getFishPPositions()
  {
    var pos =  this.build3DTrianglesPositions(this.nsegments, this.nrows, this.nsegments);   
    return pos;
  }

  getFishVPositions()
  {
    var pos =   this.build3DTrianglesPositions(this.nsegments, this.nrows, this.nsegments);
    return pos;
  }


  constructor( cnrows: number, cnsegments: number)
  {
    super();
    this.segmentsize=0.1;
    this.nsegments = cnsegments;
    this.nrows = cnrows;
    this.arrays = {
      position: this.build3DTrianglesPositions(this.nsegments, this.nrows, this.nsegments),
      boneNdx: this.buildBoneTrianglesNDX(this.nsegments, this.nrows, this.nsegments),
      weight: this.buildWeightsTriangles(this.nsegments, this.nrows, this.nsegments),  
      indices: this.buildIndicesTriangles(this.nsegments, this.nrows, this.nsegments), 
      texcoord: this.buildTexCoordTriangles(this.nsegments, this.nrows, this.nsegments)
   };
  }

  buildWeightsTriangles(n:number, nrows: number, stride: number) { 
    var i = 0, n1=1.0, n2=0.0; 
    var wdata: number4[] = [];     
    var crow = 0;
    while (crow < nrows)
    {
        for (var i=0; i<stride; i++)        
          for (var j=0; j<6; j++) wdata.push([n1,n2,0,0]);                              
        crow++;
    }
    var data = new Float32Array(wdata.length*4);
    console.log("=>copy weights len="+wdata.length+" stride="+stride+" nrows="+nrows);
    for(var i=0; i<wdata.length; i++)   
      for(var j=0; j<4; j++) data[i*4+j]=wdata[i][j];     
    console.log("NDX weights buffer: len="+data.length);
    return { numComponents: 4, data };
  }

  buildTexCoordTriangles(n:number, nrows: number, stride: number) { 
    var i = 0, n1=1.0, n2=0.0; 
    var wdata: number2[] = [];     
    var crow = 0;
    while (crow < nrows)
    {
        for (var i=0; i<stride; i++)     
        {   
          var xt = i / +stride.toFixed(4);
          var yt = crow / +nrows.toFixed(4);
          for (var j=0; j<6; j++) wdata.push([xt,yt]);  
        }                            
        crow++;
    }
    var data = new Float32Array(wdata.length*2);
    console.log("=>copy texcoords len="+wdata.length+" stride="+stride+" nrows="+nrows);
    for(var i=0; i<wdata.length; i++)   
      for(var j=0; j<2; j++) data[i*2+j]=wdata[i][j];     
    console.log("texcoords buffer: len="+data.length);
    console.log(data);
    return { numComponents: 2, data };
  }

  buildIndicesTriangles(n: number, nrows: number, stride: number) {
    var inxdata: number[] = [];     
    var crow = 0;
    var cpos = 0;
    while (crow < nrows)
    {
        for(var i=0; i<stride;i++) {         
          for (var j=0; j<6; j++) inxdata.push(cpos++);     
        }
        crow++;
    }
    var data = new Uint32Array(inxdata.length);
    for(var i=0; i<inxdata.length; i++) data[i]=inxdata[i];
    console.log("indices: len="+data.length);
    console.log(data);
    return { numComponents: 1, data };
  }
  
  buildBoneTrianglesNDX(n: number, nrows: number, stride: number)
  { 
   var ndxdata: number4[] = [];     
   var crow = 0;
   while (crow < nrows)
   {
       for (var i=0; i<stride; i++)
         for (var j=0; j<6; j++)  ndxdata.push([i/this.bonediv,99999,99999,99999]);                 
       crow++;
   }
   var data = new Uint32Array(ndxdata.length*4);
   crow = 0;
   console.log("ndxdat4.len="+ndxdata.length);
   console.log(ndxdata);
   for(var i=0; i<ndxdata.length; i++) 
   { 
     //console.log(i+"] "+ndxdata[i]);
     for(var j=0; j<4; j++) data[i*4+j]=ndxdata[i][j]; 
   }
   console.log("NDX indices buffer: len="+data.length);
   console.log(data);
   return { numComponents: 4, data };
  }



    build3DTrianglesPositions(n: number, nrows: number, stride: number)
    {
      var posdata: number[] = [];
      var z=0,sz,cx,cy,cz=0.0,dz=0.0;
      sz =this.segmentsize;
      dz = sz*dz;
        
      for (var y=0; y<nrows; y++)
      {
        var d = (Math.PI/4.0) * (y-nrows/2) / nrows;
        d = 1.0-Math.cos(d);
        z = 8.0*d;
        for (var x=0; x<stride; x++)
        {
          cx = sz*x;
          cy = sz*y;
          cz = sz*z;
          //if ((x%2)==0)
          {
            posdata.push(cx);   //  |_\
            posdata.push(cy);
            posdata.push(cz);
            posdata.push(cx);
            posdata.push(cy+sz);
            posdata.push(cz+dz);
            posdata.push(cx+sz);
            posdata.push(cy+sz);
            posdata.push(cz+dz);
          } //else
          {
            posdata.push(cx+sz);  //  \-|
            posdata.push(cy+sz);
            posdata.push(cz+dz);
            posdata.push(cx+sz);
            posdata.push(cy);
            posdata.push(cz);
            posdata.push(cx);
            posdata.push(cy);
            posdata.push(cz);
          }
        }
        cz=cz+dz;
    }
        var data3d = new Float32Array(posdata.length);
        for(var i=0; i<posdata.length; i++) data3d[i] = posdata[i];
        console.log("positions: len="+data3d.length+" nvect="+(data3d.length/3));
        console.log(data3d);
       return  { numComponents: 3, data: data3d };
    }

}
