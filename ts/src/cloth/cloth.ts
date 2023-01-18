
export class ClothMouse
{
   constructor( 
    public cut: number,
    public influence: number,
    public down: boolean,
    public button: number,
    public x: number,
    public y: number,
    public px: number,
    public py: number)
    { }

    public static DefaultMouse()
    {
        return new ClothMouse(
            -9999, //  no cuts 0.02,
            0.08, //   influence range
               false,
               1,
               0,
               0,
               0,
               0
           );
    }
}

class Point {
    pinX:number|undefined;
    pinY:number|undefined;
    constraints:Constraint[];

    px:number;
    py:number;
    pz: number;
    vx:number;
    vy:number;
    vz: number;



    constructor(public cloth: Cloth, public x: number, public y: number,public z:number,public texcoord: [number,number]) {
        this.x = this.px = x;
        this.y = this.py = y;
        this.z = this.pz = z;

        this.vx = this.vy = this.vz = 0;

        this.pinX = this.pinY = undefined;

        this.constraints = []
    }

    update(mouse: ClothMouse, delta: number, gravity: number, friction: number, bounce:number) {
        if (this.pinX && this.pinY) return this;

        if (mouse.down) {
            let dx = this.x - mouse.x;
            let dy = this.y - mouse.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (mouse.button === 1 && dist < mouse.influence) {
                this.px = this.x - (mouse.x - mouse.px);
                this.py = this.y - (mouse.y - mouse.py);
                console.log("seen mouse down, button="+mouse.button+" px="+this.px+" py="+this.py);
            } else if (dist < mouse.cut) {
              //  console.log("seen mouse down, button="+mouse.button+" dist="+dist+" >influence="+mouse.influence+" <cut="+mouse.cut);
              //  this.free();
            } // else       console.log("seen mouse down,bounce="+bounce+" button="+mouse.button+" nop"+" dist="+dist+" >influence="+mouse.influence+" <cut="+mouse.cut);

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
        } else if (this.y <= -1.0) {
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

    attach(point: Point, tearDist: number,  spacing: number) {
        this.constraints.push(new Constraint(this, point,tearDist,  spacing));
    }

    free() {
        this.constraints = [];
        this.cloth.removeIndex(this); 
    }

    addForce(x: number, y:number, z:number) {
        this.vx += x || 0;
        this.vy += y || 0;
        this.vz += z || 0;
    }

    pin(pinx: number, piny: number) {
        this.pinX = pinx
        this.pinY = piny
    }

    
}

class Constraint {
    length: number;
    
    constructor(public p1: Point, public p2: Point, public tearDist: number, public spacing: number) {
        this.p1 = p1;
        this.p2 = p2;
        this.length = spacing;
    }

    resolve() {
        let dx = this.p1.x - this.p2.x;
        let dy = this.p1.y - this.p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.length) return;

        let diff = (this.length - dist) / dist;

        if (dist > this.tearDist) this.p1.free();

        let mul = diff * 0.5 * (1 - this.length / dist);

        let px = dx * mul;
        let py = dy * mul;

        if (!this.p1.pinX) this.p1.x += px;
        if (!this.p1.pinY) this.p1.y += py;

        if (!this.p2.pinX) this.p2.x -= px;
        if (!this.p2.pinY) this.p2.y -= py;

        return this;
    }
}

export class Cloth {

   // public canvas: HTMLCanvasElement;
   vertices: Float32Array;
   texcoords: Float32Array;
   public indices: Uint32Array;
    points: Point[];
    dirty: boolean=false;

   
    constructor(public clothX:number, public clothY:number, startX: number, startY: number, tearDist:number, spacing: number, canvasName: string) {
      
        this.vertices = new Float32Array(((clothX + 1) * (clothY + 1)) * 3);
        this.texcoords = new Float32Array(((clothX + 1) * (clothY + 1)) * 2);
        this.indices = new Uint32Array(this.vertices.length * 2);
        this.points = [];
      
        let cnt = 0;
        let cnttex = 0;
        for (let y = 0; y <= clothY; y++) {
            for (let x = 0; x <= clothX; x++) {
                var texcoord: [number,number] = [x/clothX,y/clothY];
                let p = new Point(this, startX + x * spacing, startY - y * spacing, 0.0, texcoord);

                y === 0 && p.pin(p.x, p.y);
                x !== 0 && p.attach(this.points[this.points.length - 1],tearDist,spacing);
                y !== 0 && p.attach(this.points[x + (y - 1) * (clothX + 1)],tearDist,spacing);

                if (x !== clothX && y !== clothY) {
                    let b = cnt;
                    cnt *= 2;

                    this.indices[cnt++] = this.points.length;
                    this.indices[cnt++] = this.points.length + clothX + 1;
                    this.indices[cnt++] = this.points.length + 1;
                    this.indices[cnt++] = this.points.length + 1;
                    this.indices[cnt++] = this.points.length + clothX + 1;
                    this.indices[cnt++] = this.points.length + clothX + 2;

                    cnt = b;
                }

                this.points.push(p);
              //  p.attach(this.points[this.points.length - 1],tearDist,spacing);
              //  p.attach(this.points[x + (y - 1) * (clothX + 1)],tearDist,spacing);

               
               
                this.vertices[cnt++] = p.x;
                this.vertices[cnt++] = p.y;
                this.vertices[cnt++] = p.z;

                this.texcoords[cnttex++] = p.texcoord[0];
                this.texcoords[cnttex++] = p.texcoord[1];
            }
        }
    }

    

    removeIndex(p: Point) {

        let pos = this.points.indexOf(p);
        let posinx = this.indices.indexOf(pos);
        if (posinx >= 0) {
            let l = 6*( this.clothX + 3);
            if (posinx>(this.indices.length-l)) l=this.indices.length-posinx;
            let n = 0;
            for (var i =0; i < (this.indices.length-posinx); i++) {
                if (this.indices[posinx+i] == pos)
                {
                    let ii = 3*Math.floor((posinx+i)/3);
                    for (var iii=ii; iii<(ii+3); iii++)                      
                      this.indices[iii]=-1; // invalidate this index                      
                    n++;
                }
            }
            console.log("removing index for p=" + p.x + "," + p.y+" n="+n+" posinx="+posinx);           
            this.dirty = true;
        }
    }

    update(mouse: ClothMouse, delta: number, accuracy: number, gravity:number, friction:number, bounce:number) {
        let i = accuracy;

        while (i--) {
            this.points.forEach((point) => {
                point.resolve();
            });
        }

        let cnt = 0;
        this.points.forEach((point) => {
            point.update(mouse,delta,gravity, friction, bounce);
            this.vertices[cnt++] = point.x;
            this.vertices[cnt++] = point.y;
            this.vertices[cnt++] = point.z;
        });
    }
}


export class ClothProducer
{
     clothX = 400;
     clothY = 50;
     startX = -0.9;
     startY = 1.0;
     spacing = 1.8 / this.clothX;
     tearDist = 2.0*this.spacing * 8;
     cloth:Cloth;

     constructor()
     {
       this.cloth = new Cloth(this.clothX,this.clothY,this.startX,this.startY,this.tearDist,this.spacing,"c");
     }
}

