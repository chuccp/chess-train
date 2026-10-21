// AI 走子接口：调用 auto-chess 正式服务。
// 象棋走 Pikafish NNUE，其余棋类走服务端内置引擎；页面不再下载引擎文件。
const API_BASE = ((import.meta.env.VITE_ENGINE_API_BASE as string | undefined) ??
  'https://home.usercao.com/auto-chess/api/v1'
).replace(/\/+$/, '');

export type EngineGame = 'xiangqi' | 'gomoku' | 'connect4' | 'jungle' | 'checkers';
export type EngineDifficulty = 'easy' | 'normal' | 'hard';

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

export interface EngineMoveInput {
  game: EngineGame;
  /** FEN 棋种（象棋）传局面 FEN */
  fen?: string;
  /** 网格棋种传扁平棋盘 */
  board?: string[];
  turn?: string;
  level: 1 | 2 | 3;
  timeLimitMs?: number;
  /** 禁着列表：引擎不会走这些着法 */
  forbiddenMoves?: ApiForbiddenMove[];
}

export interface EngineMoveResult {
  move: ApiMove;
  engine?: string;
  difficulty: string;
}

export const LEVEL_DIFFICULTY: Record<1 | 2 | 3, EngineDifficulty> = {
  1: 'easy',
  2: 'normal',
  3: 'hard',
};

function requestTimeout(input: EngineMoveInput): number {
  return Math.max(10_000, (input.timeLimitMs ?? 3000) + 8_000);
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

  async search(input: EngineMoveInput): Promise<EngineMoveResult> {
    const controller = new AbortController();
    this.inflight.add(controller);
    const timer = setTimeout(() => controller.abort(), requestTimeout(input));
    try {
      const res = await fetch(`${API_BASE}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          game: input.game,
          ...(input.fen ? { fen: input.fen } : {}),
          ...(input.board ? { board: input.board } : {}),
          ...(input.turn ? { turn: input.turn } : {}),
          difficulty: LEVEL_DIFFICULTY[input.level],
          timeLimitMs: input.timeLimitMs,
          ...(input.forbiddenMoves?.length ? { forbiddenMoves: input.forbiddenMoves } : {}),
        }),
      });
      const body = (await res.json().catch(() => null)) as
        | { ok: boolean; data?: EngineMoveResult; error?: { message?: string } }
        | null;
      if (!res.ok || !body?.ok || !body.data?.move) {
        throw new Error(body?.error?.message || `AI 走子失败（HTTP ${res.status}）`);
      }
      return body.data;
    } catch (error) {
      if (controller.signal.aborted) {
        throw new Error('AI 思考超时，可以点重试');
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
  }

  reset(): void {
    this.stop();
    this.version = '';
  }
}

export const engineApi = new EngineApi();
