export function drawIcon(ctx,kind,x,y,size,colour="#70f7e9"){
 ctx.save();ctx.translate(x,y);ctx.strokeStyle=colour;ctx.fillStyle=colour;ctx.lineWidth=Math.max(2,size*.075);ctx.lineCap="round";ctx.lineJoin="round";ctx.shadowColor=colour;ctx.shadowBlur=size*.24;const s=size;
 if(kind==="bolt"){ctx.beginPath();ctx.moveTo(s*.58,0);ctx.lineTo(s*.25,s*.54);ctx.lineTo(s*.48,s*.54);ctx.lineTo(s*.39,s);ctx.lineTo(s*.77,s*.4);ctx.lineTo(s*.55,s*.4);ctx.closePath();ctx.fill()}
 else if(kind==="hull"){ctx.strokeRect(s*.12,s*.12,s*.76,s*.76);ctx.beginPath();ctx.moveTo(s*.5,s*.27);ctx.lineTo(s*.5,s*.73);ctx.moveTo(s*.27,s*.5);ctx.lineTo(s*.73,s*.5);ctx.stroke()}
 else if(kind==="magnet"){ctx.beginPath();ctx.moveTo(s*.22,s*.18);ctx.lineTo(s*.22,s*.58);ctx.quadraticCurveTo(s*.22,s*.82,s*.5,s*.82);ctx.quadraticCurveTo(s*.78,s*.82,s*.78,s*.58);ctx.lineTo(s*.78,s*.18);ctx.stroke();ctx.beginPath();ctx.moveTo(s*.14,s*.18);ctx.lineTo(s*.34,s*.18);ctx.moveTo(s*.66,s*.18);ctx.lineTo(s*.86,s*.18);ctx.stroke()}
 else if(kind==="wake"){ctx.beginPath();ctx.arc(s*.5,s*.55,s*.36,Math.PI*1.1,Math.PI*1.9);ctx.stroke();ctx.beginPath();ctx.moveTo(s*.16,s*.5);ctx.lineTo(s*.34,s*.5);ctx.moveTo(s*.26,s*.68);ctx.lineTo(s*.46,s*.68);ctx.moveTo(s*.44,s*.84);ctx.lineTo(s*.62,s*.84);ctx.stroke()}
 else{ctx.beginPath();ctx.ellipse(s*.5,s*.5,s*.39,s*.25,0,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(s*.5,s*.5,s*.1,0,Math.PI*2);ctx.fill()}
 ctx.restore()
}
