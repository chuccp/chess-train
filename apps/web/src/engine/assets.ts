import { ENGINE_ASSETS, ENGINE_CACHE_PREFIX, ENGINE_VERSION, ENGINE_BASE } from './manifest';

const META_KEY = 'qilian.engine.v1';

export interface EngineMeta {
  version: string;
  cacheName: string;
  verifiedAt: string;
  bytes: number;
}

export interface AssetProgress {
  loaded: number;
  total: number;
  phase: 'checking' | 'downloading' | 'verifying';
}

function readMeta(): EngineMeta | null {
  try {
    const raw = localStorage.getItem(META_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as EngineMeta;
    return parsed.version === ENGINE_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

function writeMeta(meta: EngineMeta): void {
  localStorage.setItem(META_KEY, JSON.stringify(meta));
}

function engineCacheName(): string {
  return `${ENGINE_CACHE_PREFIX}-${ENGINE_ASSETS.map((file) => file.sha256.slice(0, 8)).join('')}`;
}

async function cacheIsValid(cacheName: string): Promise<boolean> {
  if (typeof caches === 'undefined') return false;
  if (!(await caches.has(cacheName))) return false;
  const cache = await caches.open(cacheName);
  for (const file of ENGINE_ASSETS) {
    const response = await cache.match(`${ENGINE_BASE}/${file.name}`);
    if (!response) return false;
    const buffer = await response.arrayBuffer();
    if (buffer.byteLength !== file.bytes) return false;
    if ((await digest(buffer)) !== file.sha256) return false;
  }
  return true;
}

function hex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function digest(buffer: ArrayBuffer): Promise<string> {
  return hex(await crypto.subtle.digest('SHA-256', buffer));
}

async function readWithProgress(
  response: Response,
  expectedBytes: number,
  onLoaded: (loaded: number, total: number) => void,
): Promise<ArrayBuffer> {
  const total = Number(response.headers.get('content-length')) || expectedBytes;
  if (!response.body) return response.arrayBuffer();

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.byteLength;
    onLoaded(loaded, total);
  }
  const combined = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return combined.buffer;
}

/**
 * Ensures the Pikafish asset pack is present in Cache Storage and hashes match
 * the manifest. Returns the cache name. Throws when assets cannot be cached.
 */
let assetsPromise: Promise<string> | null = null;

export function ensureEngineAssets(onProgress: (progress: AssetProgress) => void): Promise<string> {
  if (!assetsPromise) {
    assetsPromise = doEnsureEngineAssets(onProgress).catch((error: unknown) => {
      assetsPromise = null;
      throw error;
    });
  }
  return assetsPromise;
}

async function doEnsureEngineAssets(onProgress: (progress: AssetProgress) => void): Promise<string> {
  if (typeof caches === 'undefined') {
    throw new Error('此浏览器不支持 Cache Storage，无法准备离线棋力');
  }

  const cacheName = engineCacheName();
  const total = ENGINE_ASSETS.reduce((sum, file) => sum + file.bytes, 0);
  const meta = readMeta();
  onProgress({ loaded: 0, total, phase: 'checking' });

  if (meta && (await cacheIsValid(cacheName))) {
    onProgress({ loaded: total, total, phase: 'checking' });
    return cacheName;
  }
  if (meta) {
    await caches.delete(cacheName);
    localStorage.removeItem(META_KEY);
  }

  const cache = await caches.open(cacheName);
  let loadedTotal = 0;

  for (const file of ENGINE_ASSETS) {
    onProgress({ loaded: loadedTotal, total, phase: 'downloading' });
    const url = `${ENGINE_BASE}/${file.name}`;
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`引擎资源下载失败（${file.name}: ${response.status}）`);

    let loadedThisFile = 0;
    const buffer = await readWithProgress(response, file.bytes, (loaded) => {
      loadedThisFile = loaded;
      onProgress({ loaded: loadedTotal + loaded, total, phase: 'downloading' });
    });
    loadedTotal += loadedThisFile || file.bytes;

    onProgress({ loaded: loadedTotal, total, phase: 'verifying' });
    if (buffer.byteLength !== file.bytes) {
      throw new Error(`引擎资源大小不匹配（${file.name}）`);
    }
    const hash = await digest(buffer);
    if (hash !== file.sha256) {
      throw new Error(`引擎资源校验失败（${file.name}）`);
    }

    await cache.put(
      new Request(url),
      new Response(buffer, {
        headers: {
          'Content-Type': file.mimeType,
          'Cache-Control': 'public, max-age=31536000, immutable',
          'X-Engine-Version': ENGINE_VERSION,
        },
      }),
    );
    loadedTotal = Math.max(loadedTotal, ENGINE_ASSETS.slice(0, ENGINE_ASSETS.indexOf(file) + 1).reduce((sum, item) => sum + item.bytes, 0));
    onProgress({ loaded: loadedTotal, total, phase: 'verifying' });
  }

  writeMeta({
    version: ENGINE_VERSION,
    cacheName,
    verifiedAt: new Date().toISOString(),
    bytes: total,
  });
  return cacheName;
}

export function clearEngineCache(): Promise<void> {
  return (async () => {
    assetsPromise = null;
    localStorage.removeItem(META_KEY);
    if (typeof caches === 'undefined') return;
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith(ENGINE_CACHE_PREFIX)).map((name) => caches.delete(name)));
  })();
}

export function cachedEngineMeta(): EngineMeta | null {
  return readMeta();
}
