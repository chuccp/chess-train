/**
 * Reproducible fetch of the pinned Pikafish WebAssembly pack.
 *
 * Usage: node tools/fetch-engine.mjs
 *
 * Binaries are intentionally kept out of Git. The browser downloads these same
 * files on first run, verifies the SHA-256 values in src/engine/manifest.ts, and
 * stores them in Cache Storage.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const VERSION = 'dev-20240226-98b20a33';
const BASE = 'https://github.com/ningh-o/engine-builds/releases/download/pikafish-20240226/';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'apps/web/public/engines/pikafish', VERSION);

const files = [
  {
    name: 'pikafish-single.js',
    bytes: 186745,
    sha256: '853b8b8489bb1f8b63b6ff39673f04ee2dbfc4009e732ed823dfa4f8033e9c3e',
    mime: 'application/javascript',
  },
  {
    name: 'pikafish-single.wasm',
    bytes: 500621,
    sha256: '625dbdd6cb7717204ec25fa0fc5e4ba9f6278ab901a52294ff29b975302cd9f6',
    mime: 'application/wasm',
  },
  {
    name: 'pikafish.data',
    bytes: 4103914,
    sha256: 'd19746bb9eccbb8d65b5f7eaf9f5a9622a1ddde5847c12a0ef18afe864296ee2',
    mime: 'application/octet-stream',
  },
];

function hash(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

async function existingIsValid(file) {
  try {
    const buffer = await fs.readFile(path.join(OUT, file.name));
    return buffer.byteLength === file.bytes && hash(buffer) === file.sha256;
  } catch {
    return false;
  }
}

await fs.mkdir(OUT, { recursive: true });

let downloaded = 0;
for (const file of files) {
  if (await existingIsValid(file)) {
    console.log(`✓ ${file.name}`);
    continue;
  }

  process.stdout.write(`↓ ${file.name} … `);
  const response = await fetch(BASE + file.name);
  if (!response.ok) throw new Error(`${file.name}: HTTP ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength !== file.bytes) {
    throw new Error(`${file.name}: expected ${file.bytes} bytes, got ${buffer.byteLength}`);
  }
  const actual = hash(buffer);
  if (actual !== file.sha256) {
    throw new Error(`${file.name}: SHA-256 mismatch\nexpected ${file.sha256}\ngot      ${actual}`);
  }
  await fs.writeFile(path.join(OUT, file.name), buffer);
  console.log(`${file.mime}, ${buffer.byteLength} bytes`);
  downloaded += 1;
}

console.log(`\nPikafish ${VERSION} ready in ${OUT} (${downloaded} downloaded).`);
