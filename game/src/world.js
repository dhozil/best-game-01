import {distance} from "./utils.js";
import {burst} from "./particles.js";
import {sound} from "./audio.js";
export function create(rng){
 return {rng,p:{x:640,y:400,vx:300,vy:0},enemies:[],wake:[],bolts:[],particles:[],gold:[],sector:1,score:0,hull:3,chain:1,timer:0,chainTime:3,wakeLife:2,damage:2,magnet:120,time:0,cool:0,inv:0,trauma:0,stop:0};
}
export function step(w,input,dt,auto){
 w.time+=dt;w.stop=Math.max(0,w.stop-dt);w.trauma=Math.max(0,w.trauma-dt*2);
 const t=dt*(w.stop>0?.15:1),p=w.p,k=input.keys;
 let x=Number(k.has("d")||k.has("arrowright"))-Number(k.has("a")||k.has("arrowleft"));
 let y=Number(k.has("s")||k.has("arrowdown"))-Number(k.has("w")||k.has("arrowup"));
 if(auto){x=Math.cos(w.time);y=Math.sin(w.time);}
 p.vx+=(x*400-p.vx)*(1-Math.exp(-3*t));p.vy+=(y*400-p.vy)*(1-Math.exp(-3*t));
 p.x=Math.max(25,Math.min(1255,p.x+p.vx*t));p.y=Math.max(110,Math.min(755,p.y+p.vy*t));
 w.wake.push({x:p.x,y:p.y,life:w.wakeLife,hot:Math.hypot(p.vx,p.vy)>160});
 w.wake=w.wake.filter(a=>(a.life-=t)>0);
 w.cool-=t;w.inv-=t;w.timer-=t;if(w.timer<=0)w.chain=1;
 const target=auto?w.enemies[0]:input.mouse;
 if(target&&(auto||input.mouse.down)&&w.cool<=0){
 const a=Math.atan2(target.y-p.y,target.x-p.x);
 w.bolts.push({x:p.x,y:p.y,vx:Math.cos(a)*700,vy:Math.sin(a)*700,life:2});w.cool=.3;if(!auto)sound(650);
 }
 for(const b of w.bolts){b.x+=b.vx*t;b.y+=b.vy*t;b.life-=t;}
 const children=[];
 for(const e of w.enemies){
 e.flash=Math.max(0,e.flash-t);
 const a=Math.atan2(p.y-e.y,p.x-e.x)+(e.type===1?.9:0),s=e.type===3?60:110;
 e.x+=Math.cos(a)*s*t;e.y+=Math.sin(a)*s*t;
 for(const b of w.bolts)if(b.life>0&&distance(b,e)<e.r+5){e.hp-=w.damage;e.flash=.1;b.life=0;}
 if(w.wake.some(a=>a.hot&&distance(a,e)<e.r+9)){e.hp-=25*t;e.flash=.06;}
 if(e.hp<=0){
 w.chain++;w.timer=w.chainTime;w.score+=100*w.chain;w.trauma=.3;
 if(e.type===3){w.stop=.06;w.trauma=1;}
 burst(w,e.x,e.y,e.type===1?"#be9cff":"#ff756f");
 w.gold.push({x:e.x,y:e.y});if(!auto)sound(220+w.chain*25);
 if(e.type===2)for(const d of [-20,20])children.push({x:e.x+d,y:e.y,type:0,hp:1,r:9,flash:0});
 }else if(distance(p,e)<e.r+13&&w.inv<=0){
 w.hull--;w.inv=2;w.trauma=1;p.vx-=Math.cos(a)*500;p.vy-=Math.sin(a)*500;burst(w,p.x,p.y,"#6fffea");if(!auto)sound(90);
 }
 }
 w.enemies=w.enemies.filter(e=>e.hp>0).concat(children);
 w.bolts=w.bolts.filter(b=>b.life>0);
 w.gold=w.gold.filter(g=>{const d=distance(g,p);if(d<w.magnet){g.x+=(p.x-g.x)*(1-Math.exp(-8*t));g.y+=(p.y-g.y)*(1-Math.exp(-8*t));}if(d<20){w.score+=50;return false;}return true;});
 w.particles=w.particles.filter(a=>(a.life-=t)>0);
 for(const a of w.particles){a.x+=a.vx*t;a.y+=a.vy*t;a.vx*=Math.exp(-3*t);a.vy*=Math.exp(-3*t);}
}
