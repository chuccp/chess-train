import {
  ENGINE_DATA_URL,
  ENGINE_JS_URL,
  ENGINE_VERSION,
  ENGINE_WASM_URL,
  ENGINE_WORKER_URL,
} from './manifest';
import { ensureEngineAssets, type AssetProgress } from './assets';
import { START_FEN } from '@qilian/xiangqi';

export interface EngineSearchInput {
  initialFen: string;
  movesUcci: string[];
  level: 1 | 2 | 3;
  timeLimitMs: number;
}

export interface EngineSearchResult {
  ucci: string;
  requestId: number;
}

type Pending = {
  resolve: (result: EngineSearchResult) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
};

type WorkerMessage =
  | { type: 'ready'; version: string; options: Record<string, string | number | boolean> }
  | { type: 'bestmove'; requestId: number; ucci: string }
  | { type: 'error'; requestId: number; code: string; message: string }
  | { type: 'fatal'; message: string };

class PikafishClient {
  private worker: Worker | null = null;
  private initPromise: Promise<void> | null = null;
  private pending = new Map<number, Pending>();
  private nextRequestId = 1;
  private options: Record<string, string | number | boolean> = {};
  private version = '';
  private terminated = false;

  async initialize(onProgress?: (progress: AssetProgress) => void): Promise<void> {
    if (this.terminated) throw new Error('引擎已关闭，请刷新页面');
    if (this.initPromise) return this.initPromise;

    this.initPromise = this.start(onProgress).catch((error: unknown) => {
      this.initPromise = null;
      throw error;
    });
    return this.initPromise;
  }

  private async start(onProgress?: (progress: AssetProgress) => void): Promise<void> {
    await ensureEngineAssets(onProgress ?? (() => undefined));
    this.worker = new Worker(ENGINE_WORKER_URL);
    this.worker.onmessage = (event: MessageEvent<WorkerMessage>) => this.handleMessage(event.data);
    this.worker.onerror = (event) => {
      this.failAll(new Error(event.message || '引擎 Worker 启动失败'));
    };

    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.worker?.removeEventListener('message', wait);
        reject(new Error('引擎启动超时'));
      }, 30_000);
      const wait = (event: MessageEvent<WorkerMessage>) => {
        if (event.data.type === 'ready') {
          clearTimeout(timer);
          this.worker?.removeEventListener('message', wait);
          this.version = event.data.version;
          this.options = event.data.options;
          resolve();
        } else if (event.data.type === 'fatal') {
          clearTimeout(timer);
          this.worker?.removeEventListener('message', wait);
          reject(new Error(event.data.message));
        }
      };
      this.worker?.addEventListener('message', wait);
      this.worker?.postMessage({
        type: 'init',
        version: ENGINE_VERSION,
        jsUrl: ENGINE_JS_URL,
        wasmUrl: ENGINE_WASM_URL,
        dataUrl: ENGINE_DATA_URL,
      });
    });

    // A short smoke search proves the NNUE loaded and the UCI loop accepts
    // position/go commands before the UI announces readiness.
    await this.search({
      initialFen: START_FEN,
      movesUcci: [],
      level: 1,
      timeLimitMs: 120,
    });
  }

  private handleMessage(message: WorkerMessage): void {
    if (message.type === 'bestmove') {
      const pending = this.pending.get(message.requestId);
      if (!pending) return;
      clearTimeout(pending.timer);
      this.pending.delete(message.requestId);
      pending.resolve({ ucci: message.ucci, requestId: message.requestId });
      return;
    }
    if (message.type === 'error') {
      const pending = this.pending.get(message.requestId);
      if (!pending) return;
      clearTimeout(pending.timer);
      this.pending.delete(message.requestId);
      pending.reject(new Error(message.message));
      return;
    }
    if (message.type === 'fatal') {
      this.failAll(new Error(message.message));
    }
  }

  private failAll(error: Error): void {
    for (const pending of this.pending.values()) {
      clearTimeout(pending.timer);
      pending.reject(error);
    }
    this.pending.clear();
  }

  async search(input: EngineSearchInput): Promise<EngineSearchResult> {
    if (!this.worker) throw new Error('引擎尚未初始化');
    const requestId = this.nextRequestId++;
    const timeoutMs = Math.max(6000, input.timeLimitMs + 4000);
    return new Promise<EngineSearchResult>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(requestId);
        reject(new Error('AI 思考超时'));
      }, timeoutMs);
      this.pending.set(requestId, { resolve, reject, timer });
      this.worker?.postMessage({
        type: 'search',
        requestId,
        initialFen: input.initialFen,
        movesUcci: input.movesUcci,
        level: input.level,
        timeLimitMs: input.timeLimitMs,
      });
    });
  }

  stop(requestId?: number): void {
    this.worker?.postMessage({ type: 'stop', requestId });
  }

  engineInfo(): { version: string; options: Record<string, string | number | boolean> } {
    return { version: this.version, options: this.options };
  }

  terminate(): void {
    this.terminated = true;
    this.worker?.terminate();
    this.worker = null;
    this.failAll(new Error('引擎已关闭'));
  }

  reset(): void {
    this.worker?.terminate();
    this.worker = null;
    this.failAll(new Error('引擎已重置'));
    this.initPromise = null;
    this.options = {};
    this.version = '';
    this.terminated = false;
  }
}

export const pikafish = new PikafishClient();

export type { AssetProgress };
