import { create } from 'zustand';
import { engineApi } from '../engine/api';

export type EnginePhase = 'idle' | 'checking' | 'ready' | 'error';
export type EngineBackend = 'online' | 'local';

interface EngineState {
  phase: EnginePhase;
  engineReady: boolean;
  /** 应用外壳已缓存，可离线打开（人机对弈仍需联网）。 */
  offlineReady: boolean;
  error: string | null;
  version: string;
  games: number;
  backend: EngineBackend | null;
  bootstrap: () => Promise<void>;
  retry: () => Promise<void>;
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
  engineReady: false,
  offlineReady: false,
  error: null,
  version: '',
  games: 0,
  backend: null,

  async bootstrap() {
    if (get().engineReady && get().phase === 'ready') return;
    if (bootstrapPromise) return bootstrapPromise;

    bootstrapPromise = (async () => {
      set({ phase: 'checking', error: null });
      const localReady = engineApi.localHealth();
      try {
        let backend: EngineBackend = 'online';
        let info: { version: string; games: number };
        try {
          info = await engineApi.health();
        } catch {
          backend = 'local';
          info = await localReady;
        }
        set({
          phase: 'ready',
          engineReady: true,
          version: info.version,
          games: info.games,
          backend,
        });
        if (backend === 'online') void localReady.catch(() => {});
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
          backend: null,
          error: error instanceof Error ? error.message : String(error),
        });
      } finally {
        bootstrapPromise = null;
      }
    })();

    return bootstrapPromise;
  },

  async retry() {
    engineApi.reset();
    set({ phase: 'checking', engineReady: false, backend: null, error: null });
    await get().bootstrap();
  },

  async refreshOffline() {
    if (!get().engineReady) return;
    set({ offlineReady: await serviceWorkerControls() });
  },
}));
