export function upgrades(w){
 const all=[
 ["HARD LIGHT","+1 bolt damage",()=>w.damage++],
 ["AFTERIMAGE","+40% wake duration",()=>w.wakeLife*=1.4],
 ["HULL MEND","Repair one hull",()=>w.hull=Math.min(3,w.hull+1)],
 ["GRAVITY WELL","+80 pickup radius",()=>w.magnet+=80],
 ["CHAIN MEMORY","+1 second chain time",()=>w.chainTime++]];
 for(let i=all.length-1;i>0;i--){const j=Math.floor(w.rng()*(i+1));[all[i],all[j]]=[all[j],all[i]];}
 return all.slice(0,3);
}
