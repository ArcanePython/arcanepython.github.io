
export class AnimationClock
{
  frame:number=0;

  private vnow: Date = new Date();

  private tdt: number=0;
 
  getTime(cframe: number): number
  {
    const now = new Date();
    const ctime = now.getTime();
    const dt = ctime-this.vnow.getTime();
    if ((this.frame % 100)==0) 
    { 
      var fps = 1000.0/((this.tdt)/100.0);
      var s: string = "cframe="+cframe+" tdt="+(this.tdt/100.0).toPrecision(4)+" ms, fps: "+ fps.toPrecision(3);
     // var s: string = "cframe="+cframe+" tdt="+this.tdt+" ms, fps: "+(1000.0/(this.tdt/100.0)).toPrecision(3).toString();
      console.log(s); 
      (document.getElementById('app') as HTMLDivElement).innerHTML = s;
      this.tdt=0; 
    }
    this.tdt+=dt; 
    this.vnow = now; 
    this.frame++;
    return  ctime;
  }

}
