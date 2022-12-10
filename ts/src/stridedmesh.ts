import * as stridedmesh0 from "./stridedmesh0" // mesh and bones data

type number2 = [number,number];
type number3 = [number,number,number];
type number4 = [number,number,number,number];
 
export class StridedMesh extends stridedmesh0.StridedMesh0
{
  constructor( cnrows: number, cnsegments: number, scale: number)
  {
    super();
    this.segmentsize = scale*0.18;
    this.nsegments = cnsegments;
    this.nrows = cnrows;
    this.arrays = {
      position: {numComponents:0, data: new Float32Array()},                       // positions to be filled by caller
      boneNdx: this.buildBoneIndex( this.nrows, this.nsegments),                   // bone defined in X-axis direction
      weight: this.buildBoneWeights(this.nrows, this.nsegments),                   // weights for bone segments
      indices: this.buildIndicesStridedTriangleStrip( this.nrows, this.nsegments), // index for any triangle strip segmented quad
      texcoord: this.buildTexCoords( this.nrows, this.nsegments),                  // texture coords for any triangle strip quad
   };
  }

  buildPositions(n: number, nrows: number, stride: number)
  {
    var posdata: number3[] = [];
    var cx=0, cy=0, cz=0;   
    for (var y=0; y<nrows; y++)
    {
      for (var x=0; x<stride; x++)
      {
        var d = (Math.PI/4.0) * (y-nrows/2) / nrows;
        d = 1.0-Math.cos(d);
        cx = x*this.segmentsize;
        cy = y*this.segmentsize;
        cz = 88.0*d*this.segmentsize;
        posdata.push([cx,cy,cz]);
      }
    }
    var data = this.floatStraighten("Positions",3, posdata); // this.floatStraighten4("BoneWeights",wdata);
    return  { numComponents: 3, data };
  }

  buildCylPositions(n: number, nrows: number, stride: number, r1: number, r2: number)
  {
    var posdata: number3[] = [];
    var cx=0, cy=0, cz=0, a =0, da=Math.PI*2.0/(nrows-1), z=0, r=5;   
    for (var y=0; y<nrows; y++)
    {
      for (var x=0; x<stride; x++)
      {
        var d = (Math.PI/4.0) * (y-nrows/2) / nrows;
        d = 1.0-Math.cos(d);
        cx = x*this.segmentsize;
        cy = this.segmentsize*Math.sin(a)*r1;
        cz = this.segmentsize*Math.cos(a)*r2;
        posdata.push([cx,cy,cz]);
      }
      a+=da;
    }
    var data = this.floatStraighten("Positions",3, posdata); // this.floatStraighten4("BoneWeights",wdata);
    return  { numComponents: 3, data };
  }

  //-------------------------------------------------------------------------------------------------------------------------

  buildFishVPositions(n: number, nrows: number, stride: number)
  {
    var posdata: number3[] = [];
    var cx=0, cy=0, cz=0, a =0, da=Math.PI*2.0/(nrows-1), z=0, r=20;   
    var dtail = stride/4;
    var htail = stride*3/4;
    var dr = r/dtail;
    for (var y=0; y<nrows; y++)
    {
      r=1;
      for (var x=0; x<stride; x++)
      {
        var d = (Math.PI/4.0) * (y-nrows/2) / nrows;
        d = 1.0-Math.cos(d);
        cx = x*this.segmentsize;
        if (x<dtail)
        {
          r=r+dr;
        }
        var dtailr = (x-htail);
        if (dtailr<0)
        {           
            cy = this.segmentsize*Math.cos(-a)*r;
            cz = this.segmentsize*Math.sin(-a)*r;          
        } else
        {
          var cdr = 1.0 - dtailr/dtail;            
            cy = this.segmentsize*Math.cos(-a)*r*(cdr);
            cz = this.segmentsize*Math.sin(-a)*r*(2.0-cdr);          
        }
        posdata.push([cx,cy,cz]);
      }
      a+=da;
    }
    var data = this.floatStraighten("Positions",3, posdata); // this.floatStraighten4("BoneWeights",wdata);
    return  { numComponents: 3, data };
  }


  buildFishHPositions(n: number, nrows: number, stride: number)
  {
    var posdata: number3[] = [];
    var cx=0, cy=0, cz=0, a =0, da=Math.PI*2.0/(nrows-1), z=0, r=20;   
    var dtail = stride/4;
    var htail = stride*3/4;
    var dr = r/dtail;
    for (var y=0; y<nrows; y++)
    {
      r=1;
      for (var x=0; x<stride; x++)
      {
        var d = (Math.PI/4.0) * (y-nrows/2) / nrows;
        d = 1.0-Math.cos(d);
        cx = x*this.segmentsize;
        if (x<dtail)
        {
          r=r+dr;
        }
        var dtailr = (x-htail);
        if (dtailr<0)
        {
          cy = this.segmentsize*Math.sin(a)*r;
          cz = this.segmentsize*Math.cos(a)*r;
        } else
        {
          var cdr = 1.0 - dtailr/dtail;
          cy = this.segmentsize*Math.sin(a)*r*(2.0-cdr);
          cz = this.segmentsize*Math.cos(a)*r*(cdr);
        }
        posdata.push([cx,cy,cz]);
      }
      a+=da;
    }
    var data = this.floatStraighten("Positions",3, posdata); // this.floatStraighten4("BoneWeights",wdata);
    return  { numComponents: 3, data };
  }

  getFishHPositions()
  {
    var pos =  this.buildFishHPositions(this.nsegments, this.nrows, this.nsegments);   
    return pos;
  }

  getFishVPositions()
  {
    var pos =   this.buildFishVPositions(this.nsegments, this.nrows, this.nsegments);
    return pos;
  }

  getCylPositions(r1: number,r2: number)
  {
    var pos =  this.buildCylPositions(this.nsegments, this.nrows, this.nsegments, r1, r2);   
    return pos;
  }

  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

  buildIndicesStridedTriangleStrip( nrows: number, stride: number) 
  {
    var inxdata: number[] = [];     
    var crow = 1;
    var ca1 = stride; 
    while (crow < nrows)
    {
        var i = 0; 
        var val = 0;
        var ca0 = ca1-stride;
        while (i < stride) {
          val = ca0;
          if (this.degen)
            if (i==0) inxdata.push(val);
          inxdata.push(val);
          val = ca1;
          inxdata.push(val);
          ca1++;
          ca0++; 
          i++;             
        }
        if (this.degen) inxdata.push(val); 
        crow++;
    }
    var data = this.intArray("Indices", inxdata);
    return { numComponents: 1, data };
  }
  
  buildBoneIndex(nrows: number, stride: number)
  { 
     var ndxdata: number4[] = [];     
     var n1=0,n2=0;
     for (var y=0; y<nrows; y++)
     {
       for (var x=0; x<stride; x++)
       {
        if ((x%2)==0)
          if(this.bonediv>=2)
          {
            n1=x/this.bonediv; n2=99999;  ndxdata.push([n1,n2,99999,99999]);
            n2=1+x/this.bonediv; ndxdata.push([n1,n2,99999,99999]);
          } else 
          {
           n1=x;   n2=99999;  ndxdata.push([n1,n2,99999,99999]);
           n1=x+1; n2=99999;  ndxdata.push([n1,n2,99999,99999]);
          }       
       }
     }
    var data = this.intStraighten("BoneIndex",4,ndxdata);
    return { numComponents: 4, data };
  }

  buildTexCoords( nrows: number, stride: number)
  { 
    var i = 0, n1=1.0, n2=0.0; 
    var wdata: number2[] = [];     
    var crow = 0;
    while (crow < nrows)
    {
        for (var i=0; i<stride; i++)     
        {   
          var xt = i / +stride.toFixed(4);
          var yt = crow / +nrows.toFixed(4);
          wdata.push([xt,yt]);  
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

  buildBoneWeights( nrows: number, stride: number) 
  { 
      var wdata: number4[] = [];     
      var n1=1.0, n2=0.0; 
      for (var y=0; y<nrows; y++)
      {
        for (var x=0; x<stride; x++)
        {
          if ((x%2)==0)
          {
         //   if(this.bonediv==2) 
            {
              wdata.push([1.0,0.0,0,0]);
              wdata.push([0.5,0.5,0,0]);          
            }
         /*   else
            {
              wdata.push([n1,n2,0,0]);
              wdata.push([n1,n2,0,0]);
            } */
          }         
        }
      }
      var data = this.floatStraighten("BoneWeights",4, wdata); // this.floatStraighten4("BoneWeights",wdata);
      return { numComponents: 4, data };
  }
  
  
}
