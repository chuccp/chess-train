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
  position: Position;
  positionHashes: string[];
  moves: MoveRecord[];
  phase: GamePhase;
  result: GameResult;
  startedAt: string;
  updatedAt: string;
  elapsedMs: number;
  historyResume?: boolean;
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
  updatedAt: string;
  completedAt?: string;
}

export function isFinal(result: GameResult): boolean {
  return result.status !== 'playing';
}
