import { create } from 'zustand';
import { engineApi } from '../engine/api';

export type EnginePhase = 'idle' | 'checking' | 'ready' | 'error';

interface EngineState {
  phase: EnginePhase;
  engineReady: boolean;
  /** 应用外壳已缓存，可离线打开（人机对弈仍需联网）。 */
  offlineReady: boolean;
  error: string | null;
  version: string;
  games: number;
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

  async bootstrap() {
    if (get().engineReady && get().phase === 'ready') return;
    if (bootstrapPromise) return bootstrapPromise;

    bootstrapPromise = (async () => {
      set({ phase: 'checking', error: null });
      try {
        const info = await engineApi.health();
        set({
          phase: 'ready',
          engineReady: true,
          version: info.version,
          games: info.games,
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
    set({ phase: 'checking', engineReady: false, error: null });
    await get().bootstrap();
  },

  async refreshOffline() {
    if (!get().engineReady) return;
    set({ offlineReady: await serviceWorkerControls() });
  },
}));
