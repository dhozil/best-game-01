import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const root = dirname(fileURLToPath(import.meta.url));
const destination = resolve(process.env.MAKEFUN_OUTPUT_DIR || '/output');
const shots = JSON.parse(readFileSync(join(root, 'shots.json'), 'utf8')) as { shots: { name: string }[] };
for (const { name } of shots.shots) {
  const exists = existsSync(join(root, 'screenshots', name)) ||
    (await import('node:fs')).readdirSync(join(root, 'screenshots')).some((file) => file.endsWith('-' + name + '.png') || file === name + '.png' || file === name + '.jpg' || file === name + '.jpeg');
  if (!exists) throw new Error('Screenshot pending: ' + name);
}
mkdirSync(destination, { recursive: true });
cpSync(join(root, 'game'), join(destination, 'game'), { recursive: true });
cpSync(join(root, 'screenshots'), join(destination, 'screenshots'), { recursive: true, filter: (source) => !source.endsWith('shots.json') });
const dossierBytes = buildDossier(destination, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});
writeFileSync(join(destination, 'dossier.json'), dossierBytes);
