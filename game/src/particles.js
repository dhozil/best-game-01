export function burst(w,x,y,color,n=32){for(let i=0;i<n;i++){const a=w.rng()*6.283,s=60+w.rng()*260;w.particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.5+w.rng(),color});}}
export class ParticleSystem{
 constructor(){this.particles=[];this.rng=Math.random;}
 burst(x,y,c,n){burst(this,x,y,c,n);}
 ring(x,y,c){for(let i=0;i<48;i++){const a=i*Math.PI/24;this.particles.push({x,y,vx:180*Math.cos(a),vy:180*Math.sin(a),life:.8,color:c});}}
 bossDeath(x,y){this.burst(x,y,"#ffd683",120);this.ring(x,y,"#58f6d8");}
 playerTrail(x,y){this.burst(x,y,"#58f6d8",2);}
 update(dt){this.particles=this.particles.filter(p=>(p.life-=dt)>0);for(const p of this.particles){p.x+=p.vx*dt;p.y+=p.vy*dt;}}
 draw(c){for(const p of this.particles){c.globalAlpha=Math.min(1,p.life);c.fillStyle=p.color;c.fillRect(p.x,p.y,3,3);}c.globalAlpha=1;}
}
