export const keys=new Set();
export const mouse={x:640,y:400,down:false};
addEventListener("keydown",e=>keys.add(e.key.toLowerCase()));
addEventListener("keyup",e=>keys.delete(e.key.toLowerCase()));
addEventListener("mousemove",e=>{mouse.x=e.clientX/innerWidth*1280;mouse.y=e.clientY/innerHeight*800;});
addEventListener("mousedown",()=>mouse.down=true);
addEventListener("mouseup",()=>mouse.down=false);
