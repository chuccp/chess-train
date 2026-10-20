import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const VERSION = 'dev-20240226-98b20a33';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'apps/web/public/engines/pikafish', VERSION);
const files = [
  ['pikafish-single.js', 186745, '853b8b8489bb1f8b63b6ff39673f04ee2dbfc4009e732ed823dfa4f8033e9c3e'],
  ['pikafish-single.wasm', 500621, '625dbdd6cb7717204ec25fa0fc5e4ba9f6278ab901a52294ff29b975302cd9f6'],
  ['pikafish.data', 4103914, 'd19746bb9eccbb8d65b5f7eaf9f5a9622a1ddde5847c12a0ef18afe864296ee2'],
];

let failed = false;
for (const [name, bytes, sha] of files) {
  try {
    const buffer = await fs.readFile(path.join(DIR, name));
    const actual = crypto.createHash('sha256').update(buffer).digest('hex');
    if (buffer.byteLength !== bytes || actual !== sha) {
      console.error(`✗ ${name}: size/hash mismatch`);
      failed = true;
    } else {
      console.log(`✓ ${name}`);
    }
  } catch {
    console.error(`✗ ${name}: missing (run node tools/fetch-engine.mjs)`);
    failed = true;
  }
}

const worker = path.join(ROOT, 'apps/web/public/engine/pikafish-worker.js');
try {
  await fs.access(worker);
  console.log('✓ pikafish-worker.js');
} catch {
  console.error('✗ pikafish-worker.js: missing');
  failed = true;
}

if (failed) process.exitCode = 1;
