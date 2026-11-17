import{setSeed}from './utils.js';export function shot(){let p=new URLSearchParams(location.search);setSeed(Number(p.get('seed'))||1);return p.get('shot')}
