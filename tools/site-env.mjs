import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));

if (typeof config.siteUrl !== 'string' || !config.siteUrl.trim()) {
  throw new Error('site.config.json must define a non-empty siteUrl');
}

const siteUrl = new URL(config.siteUrl.trim());
siteUrl.hash = '';
siteUrl.search = '';
if (!siteUrl.pathname.endsWith('/')) {
  siteUrl.pathname = `${siteUrl.pathname}/`;
}

// Print the env values used by a custom deployment build.
console.log(`VITE_SITE_URL=${siteUrl.href}`);
console.log(`VITE_BASE_PATH=${siteUrl.pathname}`);
