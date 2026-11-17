export function wave(w){
 w.enemies=[];
 for(let i=0;i<(w.sector%5?8+w.sector*2:1);i++){
 const a=w.rng()*7,boss=w.sector%5===0;
 w.enemies.push({x:640+Math.cos(a)*350,y:400+Math.sin(a)*290,type:boss?3:i%3,hp:boss?60:2,r:boss?50:17,flash:0});
 }
}
