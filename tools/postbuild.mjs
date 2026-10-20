import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = process.env.VITE_OUT_DIR || 'dist';
const dir = path.join(ROOT, 'apps/web', outDir);

await fs.access(path.join(dir, 'index.html'));
await fs.copyFile(path.join(dir, 'index.html'), path.join(dir, '404.html'));
await fs.writeFile(path.join(dir, '.nojekyll'), '');
console.log(`postbuild: wrote ${path.join(dir, '404.html')} and .nojekyll`);
