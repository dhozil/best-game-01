export function random(seed){
 return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
}
export const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
