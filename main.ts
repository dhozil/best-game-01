import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const source = dirname(fileURLToPath(import.meta.url));
const destination = resolve(process.env.MAKEFUN_OUTPUT_DIR || '/output');
const expectedShots = JSON.parse(readFileSync(join(source, 'shots.json'), 'utf8'));

// Require every screenshot listed in the runtime manifest.
for (const shot of expectedShots) {
  if (!existsSync(join(source, 'screenshots', shot.name))) {
    throw new Error(`Screenshot pending: ${shot.name}`);
  }
}

mkdirSync(destination, { recursive: true });
for (const folder of ['game', 'screenshots']) {
  cpSync(join(source, folder), join(destination, folder), { recursive: true });
}

// Preserve the exact dossier bytes returned by the builder.
const dossier = await buildDossier(destination, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});
writeFileSync(join(destination, 'dossier.json'), dossier);
