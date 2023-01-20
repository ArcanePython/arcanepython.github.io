"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClothMouseHandler = void 0;
const cloth = __importStar(require("./cloth"));
class ClothMouseHandler {
    constructor(canvas) {
        this.canvas = canvas;
        this.mouse = cloth.ClothMouse.DefaultMouse();
        ClothMouseHandler.instance = this;
        var cp = new cloth.ClothProducer([0.0, 0.0, 0.0]);
        this.cloth = cp.cloth;
        if (canvas == null || canvas == undefined)
            console.log("ClothMouseHandler finds unknown canvas");
        else {
            canvas.onmousedown = (e) => {
                var athis = ClothMouseHandler.instance;
                athis.mouse.button = e.which; // e.button;
                athis.mouse.down = true;
                athis.setMouse(e);
            };
            canvas.onmousemove = this.setMouse;
            canvas.onmouseup = () => { var athis = ClothMouseHandler.instance; athis.mouse.down = false; };
            canvas.oncontextmenu = (e) => e.preventDefault();
        }
    }
    setMouse(e) {
        var athis = ClothMouseHandler.instance;
        var rect = athis.canvas.getBoundingClientRect();
        athis.mouse.px = athis.mouse.x;
        athis.mouse.py = athis.mouse.y;
        athis.mouse.x = (e.x - rect.left) / athis.canvas.width;
        athis.mouse.y = (athis.canvas.height - (e.y - rect.top)) / athis.canvas.height;
        athis.mouse.x = (athis.mouse.x * 2.0) - 1.0;
        athis.mouse.y = (athis.mouse.y * 2.0) - 1.0;
    }
}
exports.ClothMouseHandler = ClothMouseHandler;
//# sourceMappingURL=clothmousehandler.js.map