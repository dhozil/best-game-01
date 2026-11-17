import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const base = dirname(fileURLToPath(import.meta.url));
const out = resolve(process.env.MAKEFUN_OUTPUT_DIR || '/output');
const shots = JSON.parse(readFileSync(join(base, 'shots.json'), 'utf8'));
const names = shots.map((entry: { name: string }) => entry.name);
for (const name of names) {
  if (!existsSync(join(base, 'screenshots', name))) {
    throw new Error(`Screenshot pending: ${name}`);
  }
}
mkdirSync(out, { recursive: true });
cpSync(join(base, 'game'), join(out, 'game'), { recursive: true });
cpSync(join(base, 'screenshots'), join(out, 'screenshots'), { recursive: true });
writeFileSync(join(out, 'dossier.json'), buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, game_max_files: 993, game_max_bytes: 50331648, game_path_max_bytes: 1000 }));
