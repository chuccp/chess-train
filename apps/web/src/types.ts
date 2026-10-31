import type { BoardEnd, Color, Position } from '@qilian/xiangqi';

export type Level = 1 | 2 | 3;
export type GamePhase = 'playing' | 'ai_thinking' | 'finished';
/** ai = 人机对战；human = 同屏双人（人人对战） */
export type GameMode = 'ai' | 'human';
export type GameResult =
  | BoardEnd
  | { status: 'win'; winner: Color; reason: 'resign' }
  | { status: 'aborted' };

export interface MoveRecord {
  ply: number;
  from: number;
  to: number;
  ucci: string;
  notation: string;
  color: Color;
  pieceType: string;
  capturedType: string | null;
  givesCheck: boolean;
  playedAt: string;
}

export interface GameSnapshot {
  id: string;
  mode: GameMode;
  playerColor: Color;
  level: Level;
  /** 自定义残局等非标准开局的起始 FEN；旧快照没有这个字段。 */
  initialFen?: string;
  position: Position;
  positionHashes: string[];
  moves: MoveRecord[];
  phase: GamePhase;
  result: GameResult;
  startedAt: string;
  updatedAt: string;
  elapsedMs: number;
  historyResume?: boolean;
  /** 手动禁点：被禁止的落点格子（AI 与提示都不会走） */
  manualBans?: number[];
  /** 每个局面哈希下 AI 曾走过的着法（uci）；悔棋后重试时禁掉，让 AI 换思路 */
  aiReplies?: Record<string, string[]>;
  /** 当前局面已给出的提示着法（uci）；「换一个提示」时排除 */
  hintBans?: string[];
}

export interface FinishedGame {
  id: string;
  mode: GameMode;
  playerColor: Color;
  level: Level;
  initialFen: string;
  moves: MoveRecord[];
  result: GameResult;
  startedAt: string;
  endedAt: string;
  elapsedMs: number;
}

export interface CustomEndgame {
  id: string;
  name: string;
  fen: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrainingProgress {
  key: string;
  itemId: string;
  kind: 'tactics' | 'endgame' | 'opening';
  status: 'in_progress' | 'completed';
  lineId?: string;
  completedLineIds?: string[];
  ply: number;
  attempts: number;
  hintsUsed: number;
  elapsedMs: number;
  revealedAnswer?: boolean;
  independentSolve?: boolean;
  /** 开局训练当前进行到哪一方；两轮都完成后才写入 completed。 */
  openingRound?: Color;
  updatedAt: string;
  completedAt?: string;
}

export function isFinal(result: GameResult): boolean {
  return result.status !== 'playing';
}
