"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileNamesChair = exports.getFileNamesChair2 = exports.getFileNamesMario = exports.getFileNamesPlane = exports.getFileNamesCube = exports.getFileNamesRubik = exports.getFileNamesCat = exports.getFileNamesGreenhouse = exports.getFileNamesBuilding = exports.getFileNamesStone = exports.getFileNamesKoenigsEgg = void 0;
function getFileNamesKoenigsEgg() {
    var cfiles = [];
    var cobjname = require('./resources/models/koenigsegg/koenigsegg.obj');
    var cmatname = require('./resources/models/koenigsegg/koenigsegg.mtl');
    return { cobjname, cmatname, cfiles };
}
exports.getFileNamesKoenigsEgg = getFileNamesKoenigsEgg;
function getFileNamesStone() {
    var cfiles = [];
    cfiles.push({ fName: 'stone12021_01.jpg', fNameResolved: require('./resources/models/stone/stone12021_01.jpg') });
    var cobjname = require('./resources/models/stone/stone12021_01.obj');
    var cmatname = require('./resources/models/stone/stone12021_01.mtl');
    return { cobjname, cmatname, cfiles };
}
exports.getFileNamesStone = getFileNamesStone;
function getFileNamesBuilding() {
    var cfiles = [];
    cfiles.push({ fName: 'stone12021_01.png', fNameResolved: require('./resources/models/stone/stone12021_01.png') });
    var cobjname = require('./resources/models/building/building_04a.obj');
    var cmatname = require('./resources/models/building/building_04.mtl');
    return { cobjname, cmatname, cfiles };
}
exports.getFileNamesBuilding = getFileNamesBuilding;
function getFileNamesGreenhouse() {
    var cfiles = [];
    cfiles.push({ fName: 'greenhouse_flooring.png', fNameResolved: require('./resources/models/greenhouse/greenhouse_flooring.png') });
    var cobjname = require('./resources/models/greenhouse/greenhouse.obj');
    var cmatname = require('./resources/models/greenhouse/greenhouse.mtl');
    return { cobjname, cmatname, cfiles };
}
exports.getFileNamesGreenhouse = getFileNamesGreenhouse;
function getFileNamesCat() {
    var cfiles = [];
    var cobjname = require('./resources/models/cat/12221_Cat_v1_l3.obj');
    var cmatname = require('./resources/models/cat/12221_Cat_v1_l3.mtl');
    return { cobjname, cmatname, cfiles };
}
exports.getFileNamesCat = getFileNamesCat;
function getFileNamesRubik() {
    var cfiles = [];
    var cobjname = require('./resources/models/rubik/xrubik.obj');
    var cmatname = require('./resources/models/rubik/xrubik.mtl');
    return { cobjname, cmatname, cfiles };
}
exports.getFileNamesRubik = getFileNamesRubik;
function getFileNamesCube() {
    var cfiles = [];
    cfiles.push({ fName: 'clover.jpg', fNameResolved: require('./resources/models/stone/clover.jpg') });
    cfiles.push({ fName: 'Di-3d.png', fNameResolved: require('./resources/models/stone/Di-3d.png') });
    cfiles.push({ fName: 'stone12021_01.png', fNameResolved: require('./resources/models/stone/stone12021_01.png') });
    cfiles.push({ fName: 'zelenskyycube.jpg', fNameResolved: require('./resources/models/stone/zelenskyycube.jpg') });
    var cobjname = require('./resources/models/cube/cube2.obj');
    var cmatname = require('./resources/models/cube/cube2.mtl');
    return { cobjname, cmatname, cfiles };
}
exports.getFileNamesCube = getFileNamesCube;
function getFileNamesPlane() {
    var cfiles = [];
    var cobjname = require('./resources/models/plane/plane.obj');
    var cmatname = require('./resources/models/plane/plane.mtl');
    return { cobjname, cmatname, cfiles };
}
exports.getFileNamesPlane = getFileNamesPlane;
function getFileNamesMario() {
    var cfiles = [];
    var cobjname = require('./resources/models/mario/mario-sculpture.obj');
    var cmatname = require('./resources/models/mario/mario-sculpture.mtl');
    return { cobjname, cmatname, cfiles };
}
exports.getFileNamesMario = getFileNamesMario;
function getFileNamesChair2() {
    var cfiles = [];
    var cobjname = require('./resources/models/chair/willisau_riale.obj');
    var cmatname = require('./resources/models/chair/willisau_riale.mtl');
    return { cobjname, cmatname, cfiles };
}
exports.getFileNamesChair2 = getFileNamesChair2;
function getFileNamesChair() {
    var cfiles = [];
    var cobjname = require('./resources/models/chair/chair.obj');
    var cmatname = require('./resources/models/chair/chair.mtl');
    return { cobjname, cmatname, cfiles };
}
exports.getFileNamesChair = getFileNamesChair;
//# sourceMappingURL=matobjfiles.js.map