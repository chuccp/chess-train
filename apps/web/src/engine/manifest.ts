const BASE_URL = import.meta.env.BASE_URL;

export const ENGINE_VERSION = 'dev-20240226-98b20a33';
export const ENGINE_BASE = `${BASE_URL}engines/pikafish/${ENGINE_VERSION}`;
export const ENGINE_CACHE_PREFIX = `qilian-engine-${ENGINE_VERSION}`;

export interface EngineAsset {
  name: string;
  bytes: number;
  sha256: string;
  mimeType: string;
}

export const ENGINE_ASSETS: EngineAsset[] = [
  {
    name: 'pikafish-single.js',
    bytes: 186745,
    sha256: '853b8b8489bb1f8b63b6ff39673f04ee2dbfc4009e732ed823dfa4f8033e9c3e',
    mimeType: 'application/javascript',
  },
  {
    name: 'pikafish-single.wasm',
    bytes: 500621,
    sha256: '625dbdd6cb7717204ec25fa0fc5e4ba9f6278ab901a52294ff29b975302cd9f6',
    mimeType: 'application/wasm',
  },
  {
    name: 'pikafish.data',
    bytes: 4103914,
    sha256: 'd19746bb9eccbb8d65b5f7eaf9f5a9622a1ddde5847c12a0ef18afe864296ee2',
    mimeType: 'application/octet-stream',
  },
];

export const ENGINE_JS_URL = `${ENGINE_BASE}/pikafish-single.js`;
export const ENGINE_WASM_URL = `${ENGINE_BASE}/pikafish-single.wasm`;
export const ENGINE_DATA_URL = `${ENGINE_BASE}/pikafish.data`;
export const ENGINE_WORKER_URL = `${BASE_URL}engine/pikafish-worker.js`;

export function engineTotalBytes(): number {
  return ENGINE_ASSETS.reduce((total, file) => total + file.bytes, 0);
}
