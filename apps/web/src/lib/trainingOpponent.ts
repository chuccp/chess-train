import {
  applyMove,
  evaluateBoard,
  generateLegalMoves,
  isInCheck,
  materialOf,
  moveToUcci,
  parseUcciMove,
  toFen,
  type Color,
  type Position,
} from '@qilian/xiangqi';
import { elephantEye } from '../engine/eleeye';

const MATE_SCORE = 1_000_000;

export interface TrainingDefense {
  move: string;
  engine: 'eleeye' | 'fallback';
}

function opposing(color: Color): Color {
  return color === 'r' ? 'b' : 'r';
}

function terminalScore(position: Position, defender: Color, ply: number): number | null {
  const end = evaluateBoard(position, { positionHashes: [] });
  if (end.status === 'playing') return null;
  if (end.status === 'draw') return 0;
  return end.winner === defender ? MATE_SCORE - ply : -MATE_SCORE + ply;
}

function evaluate(position: Position, defender: Color, ply: number): number {
  const terminal = terminalScore(position, defender, ply);
  if (terminal !== null) return terminal;

  const user = opposing(defender);
  const material = materialOf(position, defender) - materialOf(position, user);
  const mobility = generateLegalMoves(position).length;
  const tempo = position.turn === defender ? mobility : -mobility;
  const check = isInCheck(position, user) ? 18 : 0;
  return material * 10 + tempo + check;
}

function search(
  position: Position,
  defender: Color,
  depth: number,
  ply: number,
  alpha: number,
  beta: number,
): number {
  const terminal = terminalScore(position, defender, ply);
  if (terminal !== null) return terminal;
  if (depth === 0) return evaluate(position, defender, ply);

  const moves = generateLegalMoves(position);
  if (moves.length === 0) return evaluate(position, defender, ply);

  if (position.turn === defender) {
    let best = -Infinity;
    for (const move of moves) {
      const result = applyMove(position, move.from, move.to);
      if (!result.ok) continue;
      best = Math.max(best, search(result.position, defender, depth - 1, ply + 1, alpha, beta));
      alpha = Math.max(alpha, best);
      if (alpha >= beta) break;
    }
    return best;
  }

  let best = Infinity;
  for (const move of moves) {
    const result = applyMove(position, move.from, move.to);
    if (!result.ok) continue;
    best = Math.min(best, search(result.position, defender, depth - 1, ply + 1, alpha, beta));
    beta = Math.min(beta, best);
    if (alpha >= beta) break;
  }
  return best;
}

/**
 * Chooses a deterministic defensive reply for a lesson branch.
 * The depth is intentionally small so this remains a lightweight browser fallback.
 */
export function chooseFallbackTrainingDefense(
  position: Position,
  userColor: Color,
  isForbidden: (from: number, to: number) => boolean = () => false,
): string | null {
  const defender = opposing(userColor);
  if (position.turn !== defender) return null;

  const moves = generateLegalMoves(position);
  if (moves.length === 0) return null;
  const depth = moves.length <= 12 ? 4 : moves.length <= 28 ? 3 : 2;

  let bestMove: string | null = null;
  let bestScore = -Infinity;
  for (const move of moves) {
    if (isForbidden(move.from, move.to)) continue;
    const result = applyMove(position, move.from, move.to);
    if (!result.ok) continue;
    const score = search(result.position, defender, depth - 1, 1, -Infinity, Infinity);
    const ucci = moveToUcci(move.from, move.to);
    if (score > bestScore || (score === bestScore && (!bestMove || ucci < bestMove))) {
      bestMove = ucci;
      bestScore = score;
    }
  }
  return bestMove;
}

export function chooseFallbackXiangqiMove(
  position: Position,
  isForbidden: (from: number, to: number) => boolean = () => false,
): string | null {
  return chooseFallbackTrainingDefense(position, opposing(position.turn), isForbidden);
}

/**
 * Prefer the bundled ElephantEye WASM engine. The local minimax search keeps
 * training usable if the worker or its cached asset is unavailable.
 */
export async function chooseTrainingDefense(
  position: Position,
  userColor: Color,
  level: 1 | 2 | 3 = 2,
): Promise<TrainingDefense | null> {
  if (position.turn === userColor) return null;

  if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
    try {
      const depth = level === 1 ? 4 : level === 2 ? 5 : 6;
      const result = await elephantEye.search(toFen(position), {
        depth,
        timeoutMs: 4_000,
      });
      if (parseUcciMove(position, result.move)) {
        return { move: result.move, engine: 'eleeye' };
      }
    } catch {
      // Use the smaller built-in search when ElephantEye cannot start.
    }
  }

  const move = chooseFallbackTrainingDefense(position, userColor);
  return move ? { move, engine: 'fallback' } : null;
}
