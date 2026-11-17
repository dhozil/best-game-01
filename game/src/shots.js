const params=new URLSearchParams(location.search);
export const shot=params.get("shot");
export const seed=Number(params.get("seed")||17);
