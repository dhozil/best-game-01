let context;
export let muted=false;
export function mute(){muted=!muted;}
export function sound(f=440){
 if(muted)return;
 context??=new AudioContext();
 const o=context.createOscillator(),g=context.createGain(),t=context.currentTime;
 o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f/2,t+.15);
 g.gain.setValueAtTime(.05,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);
 o.connect(g);g.connect(context.destination);o.start();o.stop(t+.2);
}
