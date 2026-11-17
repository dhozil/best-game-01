import {random} from "./utils.js";
import * as input from "./input.js";
import {create,step} from "./world.js";
import {wave} from "./waves.js";
import {upgrades} from "./upgrades.js";
import {render} from "./render.js";
import {mute,sound} from "./audio.js";
import {shot,seed} from "./shots.js";
const canvas=document.querySelector("canvas"),ctx=canvas.getContext("2d");
canvas.width=1280;canvas.height=800;
let w=create(random(seed)),state="title",options=[],glow=true,last=0;
function enter(next){window.__shotReady=false;state=next;if(next==="upgrade")options=upgrades(w);}
function restart(){w=create(random(seed));wave(w);enter("play");}
wave(w);
if(shot==="play"){w.sector=4;wave(w);for(let i=0;i<130;i++)step(w,input,1/60,true);w.score=18450;w.chain=8;w.timer=2.4;enter("play");}
if(shot==="upgrade"){w.sector=3;w.score=12800;enter("upgrade");}
if(shot==="end"){w.hull=0;w.sector=7;w.score=48750;enter("gameover");}
addEventListener("keydown",e=>{
 const k=e.key.toLowerCase();
 if(k==="m")mute();if(k==="q")glow=!glow;
 if(k==="enter"&&state==="title"){sound();restart();}
 if(k==="r"&&state==="gameover")restart();
 if(state==="upgrade"&&options[Number(k)-1]){options[Number(k)-1][2]();w.sector++;wave(w);sound(w.sector%5?880:90);enter("play");}
});
function frame(now){
 const dt=Math.min(.033,(now-last)/1000);last=now;
 if(state==="play"&&!shot){step(w,input,dt,false);if(w.hull<=0){sound(100);enter("gameover");}else if(!w.enemies.length)enter("upgrade");}
 render(ctx,w,state,options,glow);window.__shotReady=true;requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
