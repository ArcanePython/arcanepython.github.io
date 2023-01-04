
export function getFileNamesKoenigsEgg(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[]  }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  var cobjname = require('./resources/models/koenigsegg/koenigsegg.obj');
  var cmatname = require('./resources/models/koenigsegg/koenigsegg.mtl');
  return { cobjname, cmatname, cfiles };
}

export function getFileNamesStone(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[]  }
{
 var cfiles: {fName:string, fNameResolved:string}[] = [];
 cfiles.push({fName:'stone12021_01.jpg',fNameResolved:require('./resources/models/stone/stone12021_01.jpg')});
  var cobjname = require('./resources/models/stone/stone12021_01.obj');
  var cmatname = require('./resources/models/stone/stone12021_01.mtl');
  return { cobjname, cmatname, cfiles };
}

export function getFileNamesBuilding(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  cfiles.push({fName:'stone12021_01.png',fNameResolved:require('./resources/models/stone/stone12021_01.png')});  
  var cobjname = require('./resources/models/building/building_04a.obj');
  var cmatname = require('./resources/models/building/building_04.mtl');
  return { cobjname, cmatname, cfiles };
}

export function getFileNamesGreenhouse(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  cfiles.push({fName:'greenhouse_flooring.png',fNameResolved:require('./resources/models/greenhouse/greenhouse_flooring.png')});
  var cobjname = require('./resources/models/greenhouse/greenhouse.obj');
  var cmatname = require('./resources/models/greenhouse/greenhouse.mtl');
  return { cobjname, cmatname, cfiles };
}

export function getFileNamesCat(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  var cobjname = require('./resources/models/cat/12221_Cat_v1_l3.obj');
  var cmatname = require('./resources/models/cat/12221_Cat_v1_l3.mtl');
  return { cobjname, cmatname, cfiles };
}

export function getFileNamesRubik(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  var cobjname = require('./resources/models/rubik/xrubik.obj');
  var cmatname = require('./resources/models/rubik/xrubik.mtl');
  return { cobjname, cmatname, cfiles  };
}

export function getFileNamesCube(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  cfiles.push({fName:'clover.jpg',fNameResolved:require('./resources/models/stone/clover.jpg')});
  cfiles.push({fName:'Di-3d.png',fNameResolved:require('./resources/models/stone/Di-3d.png')});
  cfiles.push({fName:'stone12021_01.png',fNameResolved:require('./resources/models/stone/stone12021_01.png')});
  cfiles.push({fName:'zelenskyycube.jpg',fNameResolved:require('./resources/models/stone/zelenskyycube.jpg')});
  var cobjname = require('./resources/models/cube/cube2.obj');
  var cmatname = require('./resources/models/cube/cube2.mtl');
  return { cobjname, cmatname, cfiles };
}

export function getFileNamesPlane(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  var cobjname = require('./resources/models/plane/plane.obj');
  var cmatname = require('./resources/models/plane/plane.mtl');
  return { cobjname, cmatname, cfiles };
}

export function getFileNamesMario(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  var cobjname = require('./resources/models/mario/mario-sculpture.obj');
  var cmatname = require('./resources/models/mario/mario-sculpture.mtl');
  return { cobjname, cmatname, cfiles };
}

export function getFileNamesChair2(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  var cobjname = require('./resources/models/chair/willisau_riale.obj');
  var cmatname = require('./resources/models/chair/willisau_riale.mtl');
  return { cobjname, cmatname, cfiles };
}

export function getFileNamesChair(): { cobjname: string, cmatname: string, cfiles:{fName:string, fNameResolved:string}[] }
{
  var cfiles: {fName:string, fNameResolved:string}[] = [];
  var cobjname = require('./resources/models/chair/chair.obj');
  var cmatname = require('./resources/models/chair/chair.mtl');
  return { cobjname, cmatname, cfiles };
}

