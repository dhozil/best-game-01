import { existsSync } from 'node:fs';
// Check captured views.
const captures = ['1-start.jpg', '2-play.jpg', '3-end.jpg'];
const directory = process.env.MAKEFUN_OUTPUT_DIR || 'out';
for (const capture of captures) {
  if (!existsSync(`${directory}/${capture}`)) throw new Error(`Screenshot pending: ${capture}`);
}
console.log('Prism Drift screenshots ready');
