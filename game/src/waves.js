import {requestedShot} from "./shots.js";
export function wave(w){
 w.enemies=[];
 const boss=w.sector%5===0||(requestedShot==="boss"&&w.sector===4);
 if(boss){w.sector=5*Math.max(1,Math.floor(w.sector/5));const hp=30+Math.min(30,w.sector*2);w.enemies.push({type:3,x:980,y:250,r:58,hp,maxHp:hp,name:"WARDEN OF THE GATE",flash:0});}
 else for(let i=0;i<8+w.sector*2;i++){const type=i%3,hp=type===2?7:4;w.enemies.push({type,x:80+w.rng()*1120,y:130+w.rng()*580,r:16+type*5,hp,maxHp:hp,flash:0});}
 w.bolts=[];w.timer=3;
}
