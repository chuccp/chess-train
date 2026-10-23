// AI 走子接口：调用 auto-chess 正式服务。
// 象棋走内置 ElephantEye；其余棋类走服务端引擎。
import { moveToUcci, parseFen, parseUcciMove, START_FEN } from '@qilian/xiangqi';
import { chooseFallbackXiangqiMove } from '../lib/trainingOpponent';
import { elephantEye } from './eleeye';
const API_BASE = ((import.meta.env.VITE_ENGINE_API_BASE as string | undefined) ??
  'https://home.usercao.com/auto-chess/api/v1'
).replace(/\/+$/, '');

export type EngineGame = 'xiangqi' | 'gomoku' | 'connect4' | 'jungle' | 'checkers';
export type EngineDifficulty = 'easy' | 'normal' | 'hard' | 'master';

export interface ApiCoord {
  index: number;
  row: number;
  col: number;
}

export interface ApiMove {
  uci?: string;
  index?: ApiCoord;
  from?: ApiCoord;
  to?: ApiCoord;
  notation?: string;
}

/** 禁着条目：未填的字段视为通配（如只填 to 表示禁走该落点）。 */
export interface ApiForbiddenMove {
  uci?: string;
  index?: number;
  from?: number;
  to?: number;
}

export interface EngineMoveProgress {
  depth: number;
  nodes: number;
  timeMs: number;
  score?: number;
}

export interface EngineMoveInput {
  game: EngineGame;
  /** FEN 棋种（象棋）传局面 FEN */
  fen?: string;
  /** 网格棋种传扁平棋盘 */
  board?: string[];
  turn?: string;
  level: 1 | 2 | 3;
  /** 思考时间上限；不传则默认 10 秒 */
  timeLimitMs?: number;
  /** 禁着列表：引擎不会走这些着法 */
  forbiddenMoves?: ApiForbiddenMove[];
  /** SSE 逐层进度（深度/节点/用时） */
  onProgress?: (progress: EngineMoveProgress) => void;
}

export interface EngineMoveResult {
  move: ApiMove;
  engine?: string;
  difficulty: string;
}

export const LEVEL_DIFFICULTY: Record<1 | 2 | 3, EngineDifficulty> = {
  1: 'easy',
  2: 'hard',
  3: 'master',
};

const MAX_THINK_MS = 10_000;

/** 解析 /move/stream 的 SSE 事件流，拿到 result 事件即返回。 */
async function readSseResult(
  body: ReadableStream<Uint8Array>,
  onProgress?: (progress: EngineMoveProgress) => void,
): Promise<EngineMoveResult> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let sep: number;
      while ((sep = buffer.indexOf('\n\n')) >= 0) {
        const chunk = buffer.slice(0, sep);
        buffer = buffer.slice(sep + 2);
        let event = 'message';
        const dataLines: string[] = [];
        for (const line of chunk.split('\n')) {
          if (line.startsWith('event:')) event = line.slice(6).trim();
          else if (line.startsWith('data:')) dataLines.push(line.slice(5).trim());
        }
        if (dataLines.length === 0) continue; // 心跳注释 / retry 行
        const data = JSON.parse(dataLines.join('\n')) as Record<string, unknown>;
        if (event === 'depth') {
          onProgress?.(data as unknown as EngineMoveProgress);
        } else if (event === 'result') {
          return data as unknown as EngineMoveResult;
        } else if (event === 'error') {
          const detail = (data as { error?: { message?: string } }).error;
          throw new Error(detail?.message || 'AI 走子失败');
        } else if (event === 'done' && data.ok === false) {
          throw new Error('AI 思考未完成，可以点重试');
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
  throw new Error('AI 未返回着法');
}

class EngineApi {
  private inflight = new Set<AbortController>();
  private version = '';

  engineInfo(): { version: string; options: Record<string, string | number | boolean> } {
    return { version: this.version || 'auto-chess', options: {} };
  }

  async health(): Promise<{ version: string; games: number }> {
    const res = await fetch(`${API_BASE}/health`);
    const body = (await res.json().catch(() => null)) as
      | { ok: boolean; data?: { version?: string; games?: number }; error?: { message?: string } }
      | null;
    if (!res.ok || !body?.ok) {
      throw new Error(body?.error?.message || `AI 服务不可用（HTTP ${res.status}）`);
    }
    this.version = body.data?.version ?? '';
    return { version: this.version, games: body.data?.games ?? 0 };
  }

  async localHealth(): Promise<{ version: string; games: number }> {
    await elephantEye.search(START_FEN, { depth: 1, timeoutMs: 6_000 });
    return { version: 'ElephantEye 3.3 · 内置', games: 1 };
  }

  private async localXiangqiSearch(input: EngineMoveInput): Promise<EngineMoveResult> {
    if (!input.fen) throw new Error('本地象棋引擎缺少局面 FEN');
    const position = parseFen(input.fen);
    const forbidden = input.forbiddenMoves ?? [];
    const isForbidden = (from: number, to: number) => {
      const ucci = moveToUcci(from, to);
      return forbidden.some(
        (item) =>
          item.uci === ucci ||
          ((item.from === undefined || item.from === from) &&
            (item.to === undefined || item.to === to) &&
            (item.from !== undefined || item.to !== undefined)),
      );
    };

    if (forbidden.length === 0) {
      try {
        const depth = input.level === 1 ? 4 : input.level === 2 ? 5 : 6;
        const result = await elephantEye.search(input.fen, {
          depth,
          timeoutMs: Math.min(input.timeLimitMs ?? 6_000, 10_000),
          onProgress: input.onProgress,
        });
        if (parseUcciMove(position, result.move)) {
          return {
            move: { uci: result.move },
            engine: 'ElephantEye 3.3',
            difficulty: LEVEL_DIFFICULTY[input.level],
          };
        }
      } catch {
        // Fall through to the smaller in-app search.
      }
    }

    const move = chooseFallbackXiangqiMove(position, isForbidden);
    if (!move) throw new Error('当前局面没有可用的本地 AI 着法');
    return {
      move: { uci: move },
      engine: '棋练本地搜索',
      difficulty: LEVEL_DIFFICULTY[input.level],
    };
  }

  /** 走 SSE 流式接口取最优着法：逐层进度走 onProgress，思考上限默认 10 秒。 */
  async search(input: EngineMoveInput): Promise<EngineMoveResult> {
    const controller = new AbortController();
    this.inflight.add(controller);
    const timeLimitMs = Math.min(input.timeLimitMs ?? MAX_THINK_MS, MAX_THINK_MS);
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, timeLimitMs + 1_000);
    try {
      const res = await fetch(`${API_BASE}/move/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
        signal: controller.signal,
        body: JSON.stringify({
          game: input.game,
          ...(input.fen ? { fen: input.fen } : {}),
          ...(input.board ? { board: input.board } : {}),
          ...(input.turn ? { turn: input.turn } : {}),
          difficulty: LEVEL_DIFFICULTY[input.level],
          timeLimitMs,
          ...(input.forbiddenMoves?.length ? { forbiddenMoves: input.forbiddenMoves } : {}),
        }),
      });
      if (!res.ok || !res.body) {
        const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
        throw new Error(body?.error?.message || `AI 走子失败（HTTP ${res.status}）`);
      }
      return await readSseResult(res.body, input.onProgress);
    } catch (error) {
      if (controller.signal.aborted) {
        if (timedOut && input.game === 'xiangqi' && input.fen) {
          return await this.localXiangqiSearch(input);
        }
        throw new Error('AI 思考超时（10 秒），可以点重试');
      }
      if (input.game === 'xiangqi' && input.fen) {
        try {
          return await this.localXiangqiSearch(input);
        } catch {
          // Report the original connectivity error when local fallback also fails.
        }
      }
      if (error instanceof TypeError) {
        throw new Error('网络异常，无法连接 AI 服务');
      }
      throw error instanceof Error ? error : new Error(String(error));
    } finally {
      clearTimeout(timer);
      this.inflight.delete(controller);
    }
  }

  /** 中止所有在途请求（悔棋 / 新局 / 离开时调用）。 */
  stop(): void {
    for (const controller of this.inflight) controller.abort();
    this.inflight.clear();
    elephantEye.stop();
  }

  reset(): void {
    this.stop();
    this.version = '';
  }
}

export const engineApi = new EngineApi();
