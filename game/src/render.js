export function render(c,w,state,options,glow){
 const text=(s,x,y,n=20,color="#b3cadb")=>{c.font=n+"px monospace";c.fillStyle=color;c.fillText(s,x,y);};
 c.fillStyle="#050d1c";c.fillRect(0,0,1280,800);
 c.strokeStyle="#11263b";
 for(let x=0;x<1280;x+=40){c.beginPath();c.moveTo(x,0);c.lineTo(x,800);c.stroke();}
 for(let y=0;y<800;y+=40){c.beginPath();c.moveTo(0,y);c.lineTo(1280,y);c.stroke();}
 c.save();c.translate(Math.sin(w.time*80)*w.trauma*10,Math.cos(w.time*90)*w.trauma*10);
 c.shadowBlur=glow?18:0;c.shadowColor="#6fffea";
 for(let i=1;i<w.wake.length;i++){const a=w.wake[i-1],b=w.wake[i];c.globalAlpha=b.life/w.wakeLife;c.strokeStyle="#6fffea";c.lineWidth=b.hot?10:2;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();}
 c.globalAlpha=1;
 const gem=(p,r,color)=>{c.save();c.translate(p.x,p.y);c.rotate(w.time+Math.PI/4);c.fillStyle=color;c.fillRect(-r/2,-r/2,r,r);c.restore();};
 for(const e of w.enemies){gem(e,e.r*1.5,e.flash?"white":e.type===1?"#be9cff":"#ff756f");if(e.type===3){for(let i=0;i<8;i++){const a=i*Math.PI/4+w.time;gem({x:e.x+Math.cos(a)*65,y:e.y+Math.sin(a)*65},20,"#ffd683");}text("THE REFRACTION CROWN",470,120);c.fillStyle="#ff756f";c.fillRect(390,135,e.hp/60*500,6);}}
 for(const g of w.gold)gem(g,9,"#ffd683");
 for(const b of w.bolts)gem(b,8,"white");
 for(const p of w.particles){c.globalAlpha=p.life;gem(p,5,p.color);}
 c.globalAlpha=1;gem(w.p,28,"#6fffea");c.restore();
 text("PRISM / DRIFT",35,35,16,"#6fffea");text(String(w.score).padStart(8,"0"),35,70,30,"white");
 text("SECTOR "+w.sector,570,40);text("HULL "+"◆".repeat(Math.max(0,w.hull)),1040,35,22,"#6fffea");
 text("CHAIN ×"+w.chain,1040,70,24,"#ffd683");c.fillStyle="#ffd683";c.fillRect(1040,85,190*Math.max(0,w.timer/w.chainTime),3);
 text("WASD / ARROWS — DRIFT     MOUSE — AIM + FIRE",35,780,14);text("M SOUND / Q GLOW",1040,780,14);
 if(state==="play")return;
 c.fillStyle="rgba(5,13,28,.93)";c.fillRect(0,100,1280,640);
 if(state==="title"){
 text("01 / ENDLESS REFRACTION",390,190,20,"#ffd683");text("PRISM",390,320,110,"white");text("DRIFT",390,425,110,"#6fffea");
 text("Your wake is a weapon.",390,490,25,"white");text("Build speed. Cut light. Let them cross it.",390,540,18);
 text("WASD / ARROWS — STEER    CLICK — BOLT",390,590,16);text("PRESS ENTER TO DRIFT",390,660,24,"#ffd683");
 }else if(state==="upgrade"){
 text("SECTOR CLEAR / SIGNAL AMPLIFIED",350,230,22,"#6fffea");text("CHOOSE YOUR EDGE",350,300,46,"white");
 options.forEach((o,i)=>{const x=130+i*350;c.fillStyle="#10253b";c.fillRect(x,370,320,220);text("0"+(i+1),x+22,420,28,"#ffd683");text(o[0],x+22,470,22,"white");text(o[1],x+22,515,16);text("PRESS "+(i+1),x+22,560,16,"#6fffea");});
 }else{
 text("SIGNAL LOST",380,285,65,"#ff756f");text("FINAL SCORE",470,360);text(String(w.score).padStart(8,"0"),380,440,70,"white");text("SECTOR "+w.sector+" / THE LIGHT TRAVELS ON",380,515);text("PRESS R TO RESTART",400,625,26,"#ffd683");
 }
}
