import { create } from 'zustand';
import { ensureEngineAssets, clearEngineCache } from '../engine/assets';
import { pikafish } from '../engine/client';
import { ENGINE_VERSION } from '../engine/manifest';

export type EnginePhase =
  | 'idle'
  | 'checking'
  | 'downloading'
  | 'verifying'
  | 'initializing'
  | 'ready'
  | 'error';

interface EngineState {
  phase: EnginePhase;
  loaded: number;
  total: number;
  engineReady: boolean;
  offlineReady: boolean;
  error: string | null;
  version: string;
  options: Record<string, string | number | boolean>;
  bootstrap: () => Promise<void>;
  retry: () => Promise<void>;
  clear: () => Promise<void>;
  refreshOffline: () => Promise<void>;
}

let bootstrapPromise: Promise<void> | null = null;
let controllerListenerAttached = false;

async function serviceWorkerControls(): Promise<boolean> {
  if (!('serviceWorker' in navigator)) return false;
  try {
    await Promise.race([
      navigator.serviceWorker.ready,
      new Promise((resolve) => setTimeout(resolve, 2500)),
    ]);
  } catch {
    return false;
  }
  if (navigator.serviceWorker.controller) return true;
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve(Boolean(navigator.serviceWorker.controller));
    };
    navigator.serviceWorker.addEventListener('controllerchange', finish, { once: true });
    setTimeout(finish, 2000);
  });
}

export const useEngineStore = create<EngineState>((set, get) => ({
  phase: 'idle',
  loaded: 0,
  total: 0,
  engineReady: false,
  offlineReady: false,
  error: null,
  version: ENGINE_VERSION,
  options: {},

  async bootstrap() {
    if (get().engineReady && get().phase === 'ready') return;
    if (bootstrapPromise) return bootstrapPromise;

    bootstrapPromise = (async () => {
      set({ phase: 'checking', error: null, loaded: 0 });
      try {
        await ensureEngineAssets((progress) => {
          set({
            phase:
              progress.phase === 'checking'
                ? 'checking'
                : progress.phase === 'verifying'
                  ? 'verifying'
                  : 'downloading',
            loaded: progress.loaded,
            total: progress.total,
          });
        });
        set({ phase: 'initializing' });
        await pikafish.initialize();
        const info = pikafish.engineInfo();
        set({
          phase: 'ready',
          engineReady: true,
          version: info.version || ENGINE_VERSION,
          options: info.options,
        });
        const offline = await serviceWorkerControls();
        set({ offlineReady: offline });
        if (!offline && !controllerListenerAttached && 'serviceWorker' in navigator) {
          controllerListenerAttached = true;
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (get().engineReady && navigator.serviceWorker.controller) {
              set({ offlineReady: true });
            }
          });
        }
      } catch (error) {
        set({
          phase: 'error',
          engineReady: false,
          offlineReady: false,
          error: error instanceof Error ? error.message : String(error),
        });
      } finally {
        bootstrapPromise = null;
      }
    })();

    return bootstrapPromise;
  },

  async retry() {
    pikafish.reset();
    set({
      phase: 'checking',
      engineReady: false,
      offlineReady: false,
      error: null,
      loaded: 0,
    });
    await get().bootstrap();
  },

  async clear() {
    await clearEngineCache();
    pikafish.reset();
    set({
      phase: 'idle',
      engineReady: false,
      offlineReady: false,
      loaded: 0,
      total: 0,
      error: null,
    });
  },

  async refreshOffline() {
    if (!get().engineReady) return;
    set({ offlineReady: await serviceWorkerControls() });
  },
}));
