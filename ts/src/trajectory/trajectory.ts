import { v3, m4 } from "twgl.js";

export class LinearTraject
{
    n: number=0;
    p: v3.Vec3; // current location
    d: v3.Vec3; // direction
    v: v3.Vec3; // displacement/ms
    ct: number = 0;
    dt: number;
    len: number;
    next:LinearTraject | null = null;
    den: number=0;
    vden: number= 0;

    constructor( public startpoint: v3.Vec3, public endpoint: v3.Vec3, public velocity: number)
    {
        this.next=null;
        this.d=v3.subtract(endpoint,this.startpoint);
        this.len = v3.length(this.d);
        this.d=v3.normalize(this.d);
        this.dt = this.len/velocity; 
        this.v=[this.d[0]*velocity,this.d[1]*velocity,this.d[2]*velocity];
        this.p = this.reset(); // initial value cursor is startpoint.slice()
    }

    proceed( dtms: number)
    {
        this.p[0]+=this.v[0]*dtms;
        this.p[1]+=this.v[1]*dtms;
        this.p[2]+=this.v[2]*dtms;
        this.vden = this.den;
        this.den = v3.distance( this.p,this.endpoint);
        //if (this.den>this.vden) console.log("found endpoint "+this.endpoint);
        this.ct+=dtms;
        return (this.den<this.vden);
    }

    reset(): v3.Vec3
    {
        this.ct = 0;
        this.den = 9999;
        return this.startpoint.slice();
    }

    toString(): string
    {
        return "ct="+this.ct.toPrecision(5)+" p = "+this.p+" start="+this.startpoint+" end="+this.endpoint+" d="+this.d+" v="+this.v+ " len="+this.len+ " dt="+this.dt+ " den="+this.den ;
    }
}

export class Trajectory
{
    root: LinearTraject|undefined = undefined;
    ct: LinearTraject|undefined|null = null;
    lastt: LinearTraject|undefined|null = null;

    constructor( path: v3.Vec3[], defaultspeed: number, circular: boolean)
    {
        console.log("=>Trajectory constructor built list v="+defaultspeed+" circ="+circular);
        var t: LinearTraject | undefined = undefined;   
        var vp: v3.Vec3 = path[0]; 
        for (var ii:number=1; ii<path.length; ii++)
        {
            var p = path[ii];
            if (t==undefined) t = this.root = this.ct = this.lastt = new LinearTraject(vp,p,defaultspeed);
            else { t.next = this.lastt = new LinearTraject(vp,p,defaultspeed); t = t.next; }
            vp = p;
        }
        console.log("Trajectory constructor built list, root: "+this.root?.toString());
        if (this.lastt==undefined) console.log("No points.");
        else if (this.root==this.lastt) console.log("single traject");
        else console.log("multiple trajects.");
        if (circular) t!.next = this.root!;
        this.reset();
    }

    reset()
    {
        this.ct= this.root;
    }

    toString()
    {
        var t: LinearTraject=this.root!;
        var s: string = "";
        for (t==this.root; t!=this.lastt; t=t.next!) s+=t.toString()+"\n";
        s+=this.lastt.toString();
        return s;
    }

    proceed( msdeltatime: number): { p:v3.Vec3, v:v3.Vec3, change: boolean } | undefined
    {
        if (this.ct!=null)
        {
            if (!this.ct.proceed(msdeltatime))
            {
            this.ct = this.ct.next;      
            if (this.ct!=undefined)
            {
                this.ct.p  = this.ct.reset(); 
                //console.log("start next traject: "+this.ct.toString()); 
                return { p: this.ct!.p, v: this.ct!.v, change: true };
            } 
            }
            else return { p: this.ct!.p, v: this.ct!.v, change: false }; // proceed
        }
        //console.log("proceed leaves without cursor set");
        return undefined;
    }

    testDump(maxtrajects: number)
    {    
        console.log("=> testDump trajectory=\n"+this.toString()+"\n")
        this.reset();
        for(var ii=0; ii<maxtrajects; ii++)
        {
            var pv = this.proceed(Math.random()*10+6);
            if (pv==undefined) break;
            console.log("p="+pv.p+" v="+pv.v +" t.startpoint="+this.ct?.startpoint+" change="+pv.change );
        }   
        console.log("<= listed trajectpry\n"+this.toString());
    }
}
