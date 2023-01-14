"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cloth = exports.ClothMouse = void 0;
class ClothMouse {
    constructor(cut, influence, down, button, x, y, px, py) {
        this.cut = cut;
        this.influence = influence;
        this.down = down;
        this.button = button;
        this.x = x;
        this.y = y;
        this.px = px;
        this.py = py;
    }
}
exports.ClothMouse = ClothMouse;
class Point {
    constructor(cloth, x, y, z) {
        this.cloth = cloth;
        this.x = x;
        this.y = y;
        this.z = z;
        this.x = this.px = x;
        this.y = this.py = y;
        this.z = this.pz = z;
        this.vx = this.vy = this.vz = 0;
        this.pinX = this.pinY = undefined;
        this.constraints = [];
    }
    update(mouse, delta, gravity, friction, bounce) {
        if (this.pinX && this.pinY)
            return this;
        if (mouse.down) {
            let dx = this.x - mouse.x;
            let dy = this.y - mouse.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (mouse.button === 1 && dist < mouse.influence) {
                this.px = this.x - (mouse.x - mouse.px);
                this.py = this.y - (mouse.y - mouse.py);
                //  console.log("seen mouse down, button="+mouse.button+" px="+this.px+" py="+this.py);
            }
            else if (dist < mouse.cut) {
                //  console.log("seen mouse down, button="+mouse.button+" dist="+dist+" >influence="+mouse.influence+" <cut="+mouse.cut);
                //  this.free();
            } // else       console.log("seen mouse down, button="+mouse.button+" nop"+" dist="+dist+" >influence="+mouse.influence+" <cut="+mouse.cut);
        }
        this.addForce(0, gravity, 0);
        let nx = this.x + (this.x - this.px) * friction + this.vx * delta;
        let ny = this.y + (this.y - this.py) * friction + this.vy * delta;
        this.px = this.x;
        this.py = this.y;
        this.x = nx;
        this.y = ny;
        this.vy = this.vx = 0;
        if (this.x >= 1) {
            this.px = 1 + (1 - this.px) * bounce;
            this.x = 1;
        }
        if (this.y >= 1) {
            this.py = 1 + (1 - this.py) * bounce;
            this.y = 1;
        }
        else if (this.y <= -1.0) {
            this.py *= -1.0 * bounce;
            this.y = -1.0;
        }
        return this;
    }
    resolve() {
        if (this.pinX && this.pinY) {
            this.x = this.pinX;
            this.y = this.pinY;
            return;
        }
        this.constraints.forEach((constraint) => constraint.resolve());
    }
    attach(point, tearDist, spacing) {
        this.constraints.push(new Constraint(this, point, tearDist, spacing));
    }
    free() {
        this.constraints = [];
        this.cloth.removeIndex(this);
    }
    addForce(x, y, z) {
        this.vx += x || 0;
        this.vy += y || 0;
        this.vz += z || 0;
    }
    pin(pinx, piny) {
        this.pinX = pinx;
        this.pinY = piny;
    }
}
class Constraint {
    constructor(p1, p2, tearDist, spacing) {
        this.p1 = p1;
        this.p2 = p2;
        this.tearDist = tearDist;
        this.spacing = spacing;
        this.p1 = p1;
        this.p2 = p2;
        this.length = spacing;
    }
    resolve() {
        let dx = this.p1.x - this.p2.x;
        let dy = this.p1.y - this.p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.length)
            return;
        let diff = (this.length - dist) / dist;
        if (dist > this.tearDist)
            this.p1.free();
        let mul = diff * 0.5 * (1 - this.length / dist);
        let px = dx * mul;
        let py = dy * mul;
        if (!this.p1.pinX)
            this.p1.x += px;
        if (!this.p1.pinY)
            this.p1.y += py;
        if (!this.p2.pinX)
            this.p2.x -= px;
        if (!this.p2.pinY)
            this.p2.y -= py;
        return this;
    }
}
class Cloth {
    constructor(clothX, clothY, startX, startY, tearDist, spacing, canvasName) {
        this.clothX = clothX;
        this.clothY = clothY;
        this.dirty = false;
        // this.canvas = ccanvas;
        this.vertices = new Float32Array(((clothX + 1) * (clothY + 1)) * 3);
        this.indices = new Uint32Array(this.vertices.length * 3);
        this.points = [];
        //this.canvas = document.getElementsByTagName(canvasName)[0] as HTMLCanvasElement; // "canvas")[0];
        let cnt = 0;
        for (let y = 0; y <= clothY; y++) {
            for (let x = 0; x <= clothX; x++) {
                let p = new Point(this, startX + x * spacing, startY - y * spacing, 0.0);
                y === 0 && p.pin(p.x, p.y);
                x !== 0 && p.attach(this.points[this.points.length - 1], tearDist, spacing);
                y !== 0 && p.attach(this.points[x + (y - 1) * (clothX + 1)], tearDist, spacing);
                if (x !== clothX && y !== clothY) {
                    let b = cnt;
                    cnt *= 2;
                    this.indices[cnt++] = this.points.length;
                    this.indices[cnt++] = this.points.length + 1;
                    this.indices[cnt++] = this.points.length + clothX + 1;
                    this.indices[cnt++] = this.points.length + 1;
                    this.indices[cnt++] = this.points.length + clothX + 1;
                    this.indices[cnt++] = this.points.length + clothX + 2;
                    cnt = b;
                }
                this.points.push(p);
                this.vertices[cnt++] = p.x;
                this.vertices[cnt++] = p.y;
                this.vertices[cnt++] = p.z;
            }
        }
    }
    removeIndex(p) {
        let pos = this.points.indexOf(p);
        let posinx = this.indices.indexOf(pos);
        if (posinx >= 0) {
            let l = (posinx + this.clothX * 2);
            l = (l > this.indices.length) ? this.indices.length : l;
            let n = 0;
            for (var i = posinx; i < l; i++) {
                if (this.indices[i] == pos) {
                    let ii = 3 * Math.floor(i / 3);
                    for (var iii = ii; iii < (ii + 3); iii++) {
                        this.indices[iii] = -1;
                    }
                    n++;
                }
            }
            console.log("removing index for p=" + p.x + "," + p.y + " n=" + n);
            this.dirty = true;
        }
        /*
        let pp = [
            this.points[pos - clothX - 2],  // top-left
            this.points[pos - clothX - 1],  // top-mid
            this.points[pos - 1],           // mid-left
            this.points[pos + 1],           // mid-right
            this.points[pos + clothX],      // bot-left
            this.points[pos + clothX + 1],  // bot-mid
            this.points[pos + clothX + 2]   // bot-right
        ];

        let ppp = [
            pos - clothX - 2,
            pos - clothX - 1,
            pos - 1,
            pos + 1,
            pos + clothX,
            pos + clothX + 1,
            pos + clothX + 2
        ];
      
        let cnt = pos * 6;

        this.indices[cnt++] = ppp[0] + 1;
        this.indices[cnt++] = ppp[0] + clothX + 1;
        this.indices[cnt++] = ppp[0] + clothX + 2;
        this.indices[cnt++] = this.indices[cnt++] = this.indices[cnt++] = null;

        cnt = ppp[0] * 6;

        this.indices[cnt++] = ppp[0];
        this.indices[cnt++] = ppp[0] + 1;
        this.indices[cnt++] = ppp[0] + clothX + 1;
        this.indices[cnt++] = this.indices[cnt++] = this.indices[cnt++] = null;

        cnt = ppp[1] * 6;

        this.indices[cnt++] = ppp[0];
        this.indices[cnt++] = ppp[0] + 1;
        this.indices[cnt++] = ppp[0] + clothX + 2;
        this.indices[cnt++] = this.indices[cnt++] = this.indices[cnt++] = null;

        cnt = ppp[2] * 6;

        this.indices[cnt++] = ppp[0];
        this.indices[cnt++] = ppp[0] + clothX + 1;
        this.indices[cnt++] = ppp[0] + clothX + 2;
        this.indices[cnt++] = this.indices[cnt++] = this.indices[cnt++] = null;
*/
    }
    update(mouse, delta, accuracy, gravity, friction, bounce) {
        let i = accuracy;
        while (i--) {
            this.points.forEach((point) => {
                point.resolve();
            });
        }
        let cnt = 0;
        this.points.forEach((point) => {
            point.update(mouse, delta, gravity, friction, bounce);
            this.vertices[cnt++] = point.x;
            this.vertices[cnt++] = point.y;
            this.vertices[cnt++] = point.z;
        });
    }
}
exports.Cloth = Cloth;
//# sourceMappingURL=cloth.js.map