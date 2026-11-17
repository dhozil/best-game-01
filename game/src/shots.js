const params=new URLSearchParams(location.search);
export const requestedShot=params.get("shot")||"";
export const shot=requestedShot==="boss"?"play":requestedShot;
export const seed=Number(params.get("seed")||1731);
window.__shotReady=false;
