export function burst(w,x,y,color){
 for(let i=0;i<24;i++){const a=w.rng()*7,s=80+w.rng()*200;w.particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,color});}
}
