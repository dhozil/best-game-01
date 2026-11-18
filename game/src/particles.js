export function burst(w,x,y,color){
 const boss=w.stop>0,n=boss?60:18+Math.floor(w.rng()*9);
 if(boss){w.particles.push({kind:"ring",x,y,radius:20,expand:250,life:1.25,max:1.25,color:"#fff4fa",vx:0,vy:0});w.particles.push({kind:"flash",x,y,life:.42,max:.42,color:"#ffffff",vx:0,vy:0});}
 else w.particles.push({kind:"ring",x,y,radius:8,expand:95,life:.72,max:.72,color,vx:0,vy:0});
 for(let i=0;i<n;i++){const a=w.rng()*Math.PI*2,s=(boss?100:65)+w.rng()*(boss?330:210),life=(boss?1.9:1.25)+w.rng()*(boss?1.3:1.1);w.particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life,max:life,color,size:(boss?2.2:1.8)+w.rng()*(boss?4.2:3.3),angle:a,phase:w.rng()*6.28,kind:"shard"});}
}
export function pickup(w,g){
 const now=w.time||0;if(g._emberAt!==undefined&&now-g._emberAt<.09)return;g._emberAt=now;
 const a=w.rng()*Math.PI*2,s=12+w.rng()*30,life=.32+w.rng()*.22;
 w.particles.push({x:g.x,y:g.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life,max:life,color:w.rng()>.5?"#ffd778":"#ff9e58",size:1.5+w.rng()*2,phase:w.rng()*6.28,kind:"ember"});
}
