import type { EngineMoveProgress } from './api';

interface ElephantEyeResult {
  move: string;
  depth?: number;
}

interface WaitingSearch {
  requestId: number;
  resolve: (result: ElephantEyeResult) => void;
  reject: (error: Error) => void;
  timeout: number;
  onProgress?: (progress: EngineMoveProgress) => void;
}

class ElephantEyeClient {
  private worker: Worker | null = null;
  private nextRequestId = 1;
  private waiting = new Map<number, WaitingSearch>();

  private createWorker(): Worker {
    if (this.worker) return this.worker;
    const base = import.meta.env.BASE_URL;
    const worker = new Worker(`${base}engines/eleeye/worker.js`);
    worker.onmessage = (event: MessageEvent) => this.handleMessage(event.data);
    worker.onerror = () => this.failAll(new Error('ElephantEye Worker 运行失败'));
    this.worker = worker;
    return worker;
  }

  private handleMessage(data: Record<string, unknown>) {
    if (data.type === 'ERROR') {
      const requestId = Number(data.requestId);
      const error = new Error(String(data.message || 'ElephantEye 搜索失败'));
      if (requestId) this.fail(requestId, error);
      else this.failAll(error);
      return;
    }

    const requestId = Number(data.requestId);
    const search = this.waiting.get(requestId);
    if (!search) return;
    if (data.type === 'INFO') {
      search.onProgress?.({
        depth: Number((data.info as Record<string, unknown>)?.depth ?? 0),
        nodes: Number((data.info as Record<string, unknown>)?.nodes ?? 0),
        timeMs: Number((data.info as Record<string, unknown>)?.timeMs ?? 0),
        score: Number((data.info as Record<string, unknown>)?.score ?? 0),
      });
    } else if (data.type === 'BEST_MOVE') {
      window.clearTimeout(search.timeout);
      this.waiting.delete(requestId);
      search.resolve({
        move: String(data.move),
        depth: Number((data.info as Record<string, unknown>)?.depth ?? 0) || undefined,
      });
    }
  }

  private fail(requestId: number, error: Error) {
    const search = this.waiting.get(requestId);
    if (!search) return;
    window.clearTimeout(search.timeout);
    this.waiting.delete(requestId);
    search.reject(error);
  }

  private failAll(error: Error) {
    for (const [requestId, search] of this.waiting) {
      window.clearTimeout(search.timeout);
      this.waiting.delete(requestId);
      search.reject(error);
    }
    this.worker?.terminate();
    this.worker = null;
  }

  search(
    fen: string,
    options: { depth?: number; timeoutMs?: number; onProgress?: (progress: EngineMoveProgress) => void } = {},
  ): Promise<ElephantEyeResult> {
    const worker = this.createWorker();
    const requestId = this.nextRequestId++;
    return new Promise((resolve, reject) => {
      const timeout = window.setTimeout(() => {
        this.fail(requestId, new Error('ElephantEye 搜索超时'));
        this.worker?.terminate();
        this.worker = null;
      }, options.timeoutMs ?? 4_000);
      this.waiting.set(requestId, {
        requestId,
        resolve,
        reject,
        timeout,
        onProgress: options.onProgress,
      });
      worker.postMessage({
        type: 'SEARCH',
        requestId,
        fen,
        depth: options.depth ?? 4,
      });
    });
  }

  stop() {
    this.failAll(new Error('ElephantEye 搜索已停止'));
  }
}

export const elephantEye = new ElephantEyeClient();
