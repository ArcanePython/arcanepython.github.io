
export function getFileNamesKoenigsEgg(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[]  }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  console.log("Resolve: ./resources/models/koenigsegg/koenigsegg.obj");
  var cobjname = require('./resources/models/koenigsegg/koenigsegg.obj');
  console.log("Resolved: cparcelname="+cobjname);
 
  console.log("Resolve: ./resources/models/koenigsegg/koenigsegg.mtl"); 
  var cmatname = require('./resources/models/koenigsegg/koenigsegg.mtl');
  console.log("Resolved: cparcelname="+cmatname);

  return { cobjname, cmatname, cfiles };
}

export function getFileNamesStone(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[]  }
{
 // var cfiles: {fName:string, fNameResolved:string}[] = [];
 // cfiles.push({fName:'stone12021_01.png',fNameResolved:require('./resources/models/stone/stone12021_01.png')});
 // cfiles.push({fName:'Material.001_diffuse.png',fNameResolved:require('./resources/models/stone/Material.001_diffuse.png')});
 var cfiles: {fName:string, fNameResolved:string}[] = [];
 cfiles.push({fName:'stone12021_01.jpg',fNameResolved:require('./resources/models/stone/stone12021_01.jpg')});

  console.log("Resolve: ./resources/models/stone/stone12021_01.obj");
  var cobjname = require('./resources/models/stone/stone12021_01.obj');
  console.log("Resolved: cparcelname="+cobjname);
 
  console.log("Resolve: ./resources/models/stone/stone12021_01.mtl"); 
  var cmatname = require('./resources/models/stone/stone12021_01.mtl');
  console.log("Resolved: cparcelname="+cmatname);

  return { cobjname, cmatname, cfiles };
}

export function getFileNamesBuilding(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{

  var cfiles: {fName:string, fNameResolved:string}[] = [];
  cfiles.push({fName:'stone12021_01.png',fNameResolved:require('./resources/models/stone/stone12021_01.png')});
  
  console.log("Resolve: ./resources/models/building/building_04a.obj");
  var cobjname = require('./resources/models/building/building_04a.obj');
  console.log("Resolved: cparcelname="+cobjname);
 
  console.log("Resolve: ./resources/models/building/building_04.mtl"); 
  var cmatname = require('./resources/models/building/building_04.mtl');
  console.log("Resolved: cparcelname="+cmatname);

  return { cobjname, cmatname, cfiles };
}

export function getFileNamesGreenhouse(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  cfiles.push({fName:'greenhouse_flooring.png',fNameResolved:require('./resources/models/greenhouse/greenhouse_flooring.png')});
  
  console.log("Resolve: ./resources/models/greenhouse/greenhouse.obj");
  var cobjname = require('./resources/models/greenhouse/greenhouse.obj');
  console.log("Resolved: cparcelname="+cobjname);
 
  console.log("Resolve: ./resources/models/greenhouse/greenhouse.mtl"); 
  var cmatname = require('./resources/models/greenhouse/greenhouse.mtl');
  console.log("Resolved: cparcelname="+cmatname);

  return { cobjname, cmatname, cfiles };
}

export function getFileNamesCat(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  console.log("Resolve: ./resources/models/cat/12221_Cat_v1_l3.obj");
  var cobjname = require('./resources/models/cat/12221_Cat_v1_l3.obj');
  console.log("Resolved: cparcelname="+cobjname);
 
  console.log("Resolve: ./resources/models/cat/12221_Cat_v1_l3.mtl"); 
  var cmatname = require('./resources/models/cat/12221_Cat_v1_l3.mtl');
  console.log("Resolved: cparcelname="+cmatname);

  return { cobjname, cmatname, cfiles };
}

export function getFileNamesRubik(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  console.log("Resolve: ./resources/models/rubik/xrubik.obj");
  var cobjname = require('./resources/models/rubik/xrubik.obj');
  console.log("Resolved: cparcelname="+cobjname);
 
  console.log("Resolve: ./resources/models/rubik/xrubik.mtl"); 
  var cmatname = require('./resources/models/rubik/xrubik.mtl');
  console.log("Resolved: cparcelname="+cmatname);

  return { cobjname, cmatname, cfiles  };
}

export function getFileNamesCube(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  cfiles.push({fName:'clover.jpg',fNameResolved:require('./resources/models/stone/clover.jpg')});
  cfiles.push({fName:'Di-3d.png',fNameResolved:require('./resources/models/stone/Di-3d.png')});
  cfiles.push({fName:'stone12021_01.png',fNameResolved:require('./resources/models/stone/stone12021_01.png')});
  cfiles.push({fName:'zelenskyycube.jpg',fNameResolved:require('./resources/models/stone/zelenskyycube.jpg')});
  
  console.log("Resolve: ./resources/models/cube/cube2.obj");
  var cobjname = require('./resources/models/cube/cube2.obj');
  console.log("Resolved: cparcelname="+cobjname);
 
  console.log("Resolve: ./resources/models/cube/cube2.mtl"); 
  var cmatname = require('./resources/models/cube/cube2.mtl');
  console.log("Resolved: cparcelname="+cmatname);

  return { cobjname, cmatname, cfiles };
}

/*
export function getFileNamesBike(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  console.log("Resolve: ./resources/models/bike/bike.obj");
  var cobjname = require('./resources/models/bike/bike.obj');
  console.log("Resolved: cparcelname="+cobjname);
 
  console.log("Resolve: ./resources/models/bike/bike.mtl"); 
  var cmatname = require('./resources/models/bike/bike.mtl');
  console.log("Resolved: cparcelname="+cmatname);

  return { cobjname, cmatname, cfiles };
}
*/

export function getFileNamesPlane(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  console.log("Resolve: ./resources/models/plane/plane.obj");
  var cobjname = require('./resources/models/plane/plane.obj');
  console.log("Resolved: cparcelname="+cobjname);
 
  console.log("Resolve: ./resources/models/plane/plane.mtl"); 
  var cmatname = require('./resources/models/plane/plane.mtl');
  console.log("Resolved: cparcelname="+cmatname);

  return { cobjname, cmatname, cfiles };
}

/*
export function getFileNamesMario(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  console.log("Resolve: ./resources/models/mario/mario-sculpture.obj");
  var cobjname = require('./resources/models/mario/mario-sculpture.obj');
  console.log("Resolved: cparcelname="+cobjname);
 
  console.log("Resolve: ./resources/models/mario/mario-sculpture.mtl"); 
  var cmatname = require('./resources/models/mario/mario-sculpture.mtl');
  console.log("Resolved: cparcelname="+cmatname);

  return { cobjname, cmatname, cfiles };
}
*/

export function getFileNamesChair2(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  console.log("Resolve: ./resources/models/chair/willisau_riale.obj");
  var cobjname = require('./resources/models/chair/willisau_riale.obj');
  console.log("Resolved: cparcelname="+cobjname);
 
  console.log("Resolve: ./resources/models/chair/willisau_riale.mtl"); 
  var cmatname = require('./resources/models/chair/willisau_riale.mtl');
  console.log("Resolved: cparcelname="+cmatname);

  return { cobjname, cmatname, cfiles };
}

export function getFileNamesChair(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  console.log("Resolve: ./resources/models/chair/chair.obj");
  var cobjname = require('./resources/models/chair/chair.obj');
  console.log("Resolved: cparcelname="+cobjname);
 
  console.log("Resolve: ./resources/models/chair/chair.mtl"); 
  var cmatname = require('./resources/models/chair/chair.mtl');
  console.log("Resolved: cparcelname="+cmatname);

  return { cobjname, cmatname, cfiles };
}

