

//--- MOUSE EVENT LISTENERS ------------------------------------------------------------------------------------------------

export type MouseDelegate = (input: string) => void;

export class MouseState
{
  down:boolean | undefined;
  button: number | undefined;
  x: number;
  y: number;
  px: number | undefined;
  py: number | undefined;
  sx: string;
  sy: string;
  dragging: boolean;
  dragx0: number;
  dragy0: number;
  dragpx0: number;
  dragpy0: number;
  dragvector: number[] | undefined;
  dragdistance: number;
  dragpdistance: number;
  delta: number;
  totaldelta: number;
  changewheel:boolean;
  changedrag:boolean;
  constructor()
  {
    this.changewheel = false;
    this.changedrag = false;
    this.dragging = false;
    this.totaldelta=0.0;
    this.delta=0.0;
    this.sx = this.sy= "0.5";
    this.x=this.y=0.5;
    this.dragpx0=this.dragpy0=0.0;
    this.dragx0=this.dragy0=0;
    this.dragdistance=10;  
    this.dragpdistance=0;  
  }
}

export class MouseListener {
 
  state = {count: 0};
  controlkeydown = false;
  mouse = new MouseState();
  OnMouseDown: MouseDelegate | undefined;
  OnMouseUp: MouseDelegate | undefined;
  OnMouseMove: MouseDelegate | undefined;
  OnMouseWheel: MouseDelegate | undefined;  

  public mousewheeleventdone()
  {
    this.mouse.changewheel = false;
  }

  public drageventdone()
  {
    this.mouse.changedrag = false;
  }

  constructor(canvas: HTMLCanvasElement ) 
  {
    this.state = {count: 0};  
    canvas.addEventListener("keydown", event => { console.log("keydown "+event.ctrlKey); if (event.ctrlKey) this.controlkeydown = true; });
    canvas.addEventListener("keyup", event => { console.log("keyup "+event.ctrlKey);  if (!event.ctrlKey) this.controlkeydown = false; });
    
    canvas.addEventListener("wheel", event => {
      this.mouse.changewheel = true;
      this.mouse.delta = Math.sign(event.deltaY);
      console.log("delta="+this.mouse.delta+" totaldelta="+this.mouse.totaldelta);
      if (this.mouse.delta<0) this.mouse.totaldelta--;
      if (this.mouse.delta>0) this.mouse.totaldelta++;
      if (this.OnMouseWheel!=undefined)
        this.OnMouseWheel(this.mouse.totaldelta.toString());
      event.preventDefault();
      event.stopPropagation();
      return false; 
     });   

     canvas.addEventListener("mousedown", e => {
      this.mouse.button = e.button;
      this.mouse.down = true;
      this.mouse.dragpx0=e.x; 
      this.mouse.dragpy0=canvas.height-e.y;
      if (this.OnMouseDown!=undefined) this.OnMouseDown(this.mouse.sx+" "+this.mouse.sy);  
      this.mouse.dragx0 = this.mouse.x;
      this.mouse.dragy0 = this.mouse.y;
      this.mouse.dragging = true;
     });

   canvas.addEventListener("mouseup", e => {  
      (this.mouse.down = false); 
      if (this.mouse.dragvector == undefined)
      {
        if (this.OnMouseUp!=undefined)
          this.OnMouseUp(this.mouse.sx+" "+this.mouse.sy+" clickat");        
      } else
      if (this.OnMouseUp!=undefined)
        this.OnMouseUp(this.mouse.sx+" "+this.mouse.sy+" dragging: v="+this.mouse.dragvector+" d="+this.mouse.dragdistance);  
      this.mouse.dragging = false;
      delete this.mouse.dragvector;
    });

    canvas.addEventListener("mousemove", e => {  
      var canvas =  (document.getElementById('c') as HTMLCanvasElement);
      let rect = canvas.getBoundingClientRect();
      this.mouse.px =e.x; 
      this.mouse.py = canvas.height-e.y;
      this.mouse.x = (e.x - rect.left) / canvas.width;
      this.mouse.x = (this.mouse.x * 2.0) - 1.0;
      this.mouse.y = (canvas.height - (e.y - rect.top)) / canvas.height;
      this.mouse.y = (this.mouse.y * 2.0) - 1.0;
      this.mouse.sy = this.mouse.y.toFixed(2); 
      this.mouse.sx = this.mouse.x.toFixed(2);
      this.state.count +=1;
      if (this.mouse.dragging)
      {
        var dpx = this.mouse.px-this.mouse.dragpx0;
        var dpy = this.mouse.py-this.mouse.dragpy0;
        var dx = this.mouse.x-this.mouse.dragx0;
        var dy = this.mouse.y-this.mouse.dragy0;
        var d = Math.sqrt(dx*dx+dy*dy);
        var dp = Math.sqrt(dpx*dpx+dpy*dpy);
        this.mouse.dragvector = [dx/d,dy/d];
        this.mouse.dragdistance = d;
        this.mouse.dragpdistance = dp;
      }
      if (this.OnMouseMove!=undefined)
          this.OnMouseMove(this.mouse.sx+" "+this.mouse.sy);
      //console.log("setmouse "+this.mouse.x+","+this.mouse.y);
      canvas.oncontextmenu = (e) => e.preventDefault();
     });
   }
}
