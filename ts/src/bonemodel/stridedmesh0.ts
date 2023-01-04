
export type Tarrays = {
  position: { numComponents: number; data: Float32Array; }
  boneNdx: { numComponents: number; data: Uint32Array; }
  weight: { numComponents: number; data: Float32Array; }
  indices: { numComponents: number; data: Uint32Array; }
  texcoord: { numComponents: number; data: Float32Array; }
}

export abstract class StridedMesh0
{
  nrows: number= 0;
  nsegments: number= 0;
  arrays: Tarrays = {position:{numComponents:0, data:new Float32Array()},
                     boneNdx: {numComponents:0, data:new Uint32Array()},
                     weight:{numComponents:0, data:new Float32Array()},
                     texcoord:{numComponents:0, data:new Float32Array()},
                     indices: {numComponents:0, data:new Uint32Array()},                    
                    };
  degen: boolean = true;
  segmentsize: number = 1.0;
  bonediv: number = 2.0;
  type: number = 0;
  squarevectorarray: number[][] | undefined;

  floatStraighten(datatitle: string, w: number, wdata: number[][]): Float32Array
  {
    var data = new Float32Array(wdata.length*w);
    console.log(">floatstraighten"+w +" "+datatitle+" wdata.length="+wdata.length);
    for(var i=0; i<wdata.length; i++) 
      for(var j=0; j<w; j++) data[i*w+j]=wdata[i][j]; 
    console.log("<floatstraighten"+w +" "+datatitle+": len="+data.length);
    return data;
  }

  intStraighten(datatitle: string, w: number, wdata: number[][]): Uint32Array
  {
    var data = new Uint32Array(wdata.length*w);
    console.log(">intstraighten"+w +" "+datatitle+" wdata.length="+wdata.length);
    for(var i=0; i<wdata.length; i++) 
      for(var j=0; j<w; j++) data[i*w+j]=wdata[i][j]; 
    console.log("<intstraighten"+w +" "+datatitle+": len="+data.length);
    return data;
  }

  intArray(datatitle: string, wdata: number[]): Uint32Array
  {
    var data = new Uint32Array(wdata.length);
    console.log(">intArray" +" "+datatitle+" wdata.length="+wdata.length);
    for(var i=0; i<wdata.length; i++) data[i]=wdata[i]; 
    console.log("<intArray" +" "+datatitle+": len="+data.length);
    return data;
  }

  abstract getFishHPositions(): {numComponents: number, data: Float32Array};
  abstract getFishVPositions(): {numComponents: number, data: Float32Array};
  

}
