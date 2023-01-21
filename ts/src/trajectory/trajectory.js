"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trajectory = exports.LinearTraject = void 0;
const twgl_js_1 = require("twgl.js");
class LinearTraject {
    constructor(startpoint, endpoint, velocity) {
        this.startpoint = startpoint;
        this.endpoint = endpoint;
        this.velocity = velocity;
        this.n = 0;
        this.ct = 0;
        this.next = null;
        this.den = 0;
        this.vden = 0;
        this.next = null;
        this.d = twgl_js_1.v3.subtract(endpoint, this.startpoint);
        this.len = twgl_js_1.v3.length(this.d);
        this.d = twgl_js_1.v3.normalize(this.d);
        this.dt = this.len / velocity;
        this.v = [this.d[0] * velocity, this.d[1] * velocity, this.d[2] * velocity];
        this.p = this.reset(); // initial value cursor is startpoint.slice()
    }
    proceed(dtms) {
        this.p[0] += this.v[0] * dtms;
        this.p[1] += this.v[1] * dtms;
        this.p[2] += this.v[2] * dtms;
        this.vden = this.den;
        this.den = twgl_js_1.v3.distance(this.p, this.endpoint);
        //if (this.den>this.vden) console.log("found endpoint "+this.endpoint);
        this.ct += dtms;
        return (this.den < this.vden);
    }
    reset() {
        this.ct = 0;
        this.den = 9999;
        return this.startpoint.slice();
    }
    toString() {
        return "ct=" + this.ct.toPrecision(5) + " p = " + this.p + " start=" + this.startpoint + " end=" + this.endpoint + " d=" + this.d + " v=" + this.v + " len=" + this.len + " dt=" + this.dt + " den=" + this.den;
    }
}
exports.LinearTraject = LinearTraject;
class Trajectory {
    constructor(path, defaultspeed, circular) {
        var _a;
        this.root = undefined;
        this.ct = null;
        this.lastt = null;
        console.log("=>Trajectory constructor built list v=" + defaultspeed + " circ=" + circular);
        var t = undefined;
        var vp = path[0];
        for (var ii = 1; ii < path.length; ii++) {
            var p = path[ii];
            if (t == undefined)
                t = this.root = this.ct = this.lastt = new LinearTraject(vp, p, defaultspeed);
            else {
                t.next = this.lastt = new LinearTraject(vp, p, defaultspeed);
                t = t.next;
            }
            vp = p;
        }
        console.log("Trajectory constructor built list, root: " + ((_a = this.root) === null || _a === void 0 ? void 0 : _a.toString()));
        if (this.lastt == undefined)
            console.log("No points.");
        else if (this.root == this.lastt)
            console.log("single traject");
        else
            console.log("multiple trajects.");
        if (circular)
            t.next = this.root;
        this.reset();
    }
    reset() {
        this.ct = this.root;
    }
    toString() {
        var t = this.root;
        var s = "";
        for (t == this.root; t != this.lastt; t = t.next)
            s += t.toString() + "\n";
        s += this.lastt.toString();
        return s;
    }
    proceed(msdeltatime) {
        if (this.ct != null) {
            if (!this.ct.proceed(msdeltatime)) {
                this.ct = this.ct.next;
                if (this.ct != undefined) {
                    this.ct.p = this.ct.reset();
                    //console.log("start next traject: "+this.ct.toString()); 
                    return { p: this.ct.p, v: this.ct.v, change: true };
                }
            }
            else
                return { p: this.ct.p, v: this.ct.v, change: false }; // proceed
        }
        //console.log("proceed leaves without cursor set");
        return undefined;
    }
    testDump(maxtrajects) {
        var _a;
        console.log("=> testDump trajectory=\n" + this.toString() + "\n");
        this.reset();
        for (var ii = 0; ii < maxtrajects; ii++) {
            var pv = this.proceed(Math.random() * 10 + 6);
            if (pv == undefined)
                break;
            console.log("p=" + pv.p + " v=" + pv.v + " t.startpoint=" + ((_a = this.ct) === null || _a === void 0 ? void 0 : _a.startpoint) + " change=" + pv.change);
        }
        console.log("<= listed trajectpry\n" + this.toString());
    }
}
exports.Trajectory = Trajectory;
//# sourceMappingURL=trajectory.js.map