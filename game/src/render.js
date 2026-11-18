import {requestedShot} from "./shots.js";
import {burst} from "./particles.js";
const cyan="#58f6d8",gold="#ffd683",coral="#ff6b5e";
function text(c,s,x,y,size=18,color="#dcebf4"){c.fillStyle=color;c.font=`${size}px monospace`;c.fillText(s,x,y);}
function polygon(c,x,y,r,n,a,color){c.beginPath();for(let i=0;i<=n;i++){const t=a+i*Math.PI*2/n;c.lineTo(x+Math.cos(t)*r,y+Math.sin(t)*r);}c.strokeStyle=color;c.stroke();}
export function render(c,w,state,options=[],glow=true){
 const boss=w.enemies.find(e=>e.type===3);
 if(requestedShot==="boss"&&boss&&!w.bossShot){w.bossShot=true;boss.x=900;boss.y=290;boss.hp=boss.maxHp*.64;w.chain=8;burst(w,900,290,gold,80);}
 if(requestedShot==="play"&&!w.actionShot){w.actionShot=true;burst(w,w.p.x-80,w.p.y,coral,60);}
 const dt=w.renderTime===undefined?0:Math.min(.04,(performance.now()-w.renderTime)/1000);w.renderTime=performance.now();
 if(!requestedShot&&state==="play"&&boss){
 boss.attack=(boss.attack||0)+dt;boss.summon=(boss.summon||0)+dt;
 if(boss.attack>1.8){boss.attack=0;const a=Math.atan2(w.p.y-boss.y,w.p.x-boss.x);for(let i=-2;i<=2;i++)(w.hostile||=[]).push({x:boss.x,y:boss.y,vx:Math.cos(a+i*.18)*240,vy:Math.sin(a+i*.18)*240,life:5});}
 if(boss.summon>6){boss.summon=0;for(let i=0;i<2+w.sector%3;i++)w.enemies.push({type:0,x:boss.x+(w.rng()-.5)*130,y:boss.y+(w.rng()-.5)*130,r:16,hp:4,maxHp:4,flash:0});}
 }
 c.fillStyle="#050d1c";c.fillRect(0,0,1280,800);
 for(let i=0;i<100;i++){c.fillStyle=i%3?"#193149":"#35516b";c.fillRect((i*173.7+w.time*4)%1280,(i*97.3)%800,1.5,1.5);}
 c.lineWidth=2;c.shadowBlur=glow?16:0;c.shadowColor=cyan;
 for(let i=1;i<w.wake.length;i++){const a=w.wake[i-1],b=w.wake[i];c.globalAlpha=Math.min(1,b.life/w.wakeLife);c.strokeStyle=cyan;c.lineWidth=9*c.globalAlpha;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();}c.globalAlpha=1;c.lineWidth=2;
 for(const e of w.enemies){const color=e.flash>0?"#ffffff":e.type===3?gold:e.type===1?cyan:coral;c.shadowColor=color;polygon(c,e.x,e.y,e.r,e.type===3?6:3+e.type,w.time*(e.type===3?.6:1),color);if(e.type===3){polygon(c,e.x,e.y,e.r*.65,3,-w.time,color);for(let i=0;i<6;i++){const a=w.time+i*Math.PI/3;polygon(c,e.x+Math.cos(a)*82,e.y+Math.sin(a)*82,10,4,a,cyan);}}}
 c.shadowColor=cyan;polygon(c,w.p.x,w.p.y,17,3,Math.atan2(w.p.vy,w.p.vx),cyan);
 for(const b of w.bolts){c.strokeStyle=cyan;c.beginPath();c.moveTo(b.x,b.y);c.lineTo(b.x-b.vx*.025,b.y-b.vy*.025);c.stroke();}
 for(const b of w.hostile||[]){if(state==="play"&&!requestedShot){b.x+=b.vx*dt;b.y+=b.vy*dt;b.life-=dt;if(Math.hypot(b.x-w.p.x,b.y-w.p.y)<20&&w.inv<=0){w.hull--;w.inv=1.5;b.life=0;}}polygon(c,b.x,b.y,5,4,0,coral);}w.hostile=(w.hostile||[]).filter(b=>b.life>0);
 c.shadowColor=gold;for(const g of w.gold)polygon(c,g.x,g.y,6+Math.sin(w.time*5)*2,4,w.time,gold);
 for(const p of w.particles){c.globalAlpha=Math.min(1,p.life);c.fillStyle=p.color;c.fillRect(p.x,p.y,3,3);}c.globalAlpha=1;c.shadowBlur=0;
 const v=c.createRadialGradient(640,400,180,640,400,760);v.addColorStop(0,"transparent");v.addColorStop(1,"#000b");c.fillStyle=v;c.fillRect(0,0,1280,800);
 text(c,"PRISM / DRIFT",35,42,22,cyan);text(c,`SCORE ${w.score.toString().padStart(7,"0")}`,35,72);text(c,`SECTOR ${String(w.sector).padStart(2,"0")}`,1060,42);text(c,`HULL ${"◆".repeat(Math.max(0,w.hull))}`,1060,72,18,coral);
 if(w.chain>1)text(c,`CHAIN ×${w.chain}`,45,740,w.chain>=6?36:24,gold);
 if(boss){c.textAlign="center";text(c,boss.name,640,40,18,gold);c.fillStyle="#293342";c.fillRect(400,55,480,12);c.fillStyle=gold;c.fillRect(400,55,480*Math.max(0,boss.hp/boss.maxHp),12);c.textAlign="left";}
 if(state!=="play"){c.fillStyle="#050d1cdd";c.fillRect(0,100,1280,600);c.textAlign="center";
 if(state==="title"){text(c,"PRISM DRIFT",640,320,76,cyan);text(c,"CARVE LIGHT. BREAK THE SWARM.",640,380,22);text(c,"PRESS ENTER TO BEGIN",640,490,24,gold);text(c,"WASD MOVE / MOUSE AIM + FIRE",640,550);}
 if(state==="upgrade"){text(c,"REFRACT / EVOLVE",640,245,48,cyan);options.forEach((o,i)=>{const x=190+i*390;c.strokeStyle=cyan;c.strokeRect(x-155,310,310,200);text(c,`0${i+1}`,x,355,28,gold);text(c,o[0],x,410,23,cyan);text(c,o[1],x,455,17);});text(c,"PRESS 1 / 2 / 3 TO SELECT",640,590,20,gold);}
 if(state==="gameover"){text(c,"SIGNAL LOST",640,310,64,coral);text(c,`FINAL SCORE  ${w.score}`,640,405,32,gold);text(c,"PRESS R TO RESTART",640,505,24,cyan);}
 c.textAlign="left";}
}
export const draw=render;
