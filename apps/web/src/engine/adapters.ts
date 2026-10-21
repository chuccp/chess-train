// 各棋类与 auto-chess 接口之间的棋盘/着法适配。
// 棋盘都是「从上到下、从左到右」的扁平数组，与接口约定一致（index = row * cols + col）。
import { engineApi, type ApiForbiddenMove, type EngineMoveResult } from './api';
import type { GomokuState } from '../games/gomoku';
import type { Connect4State } from '../games/connect4';
import type { JungleState } from '../games/jungle';
import type { CheckersState } from '../games/checkers';

export type GridGameId = 'gomoku' | 'connect4' | 'jungle' | 'checkers';

export type GridAiMove =
  | { kind: 'place'; index: number }
  | { kind: 'move'; from: number; to: number };

export interface GridPosition {
  game: GridGameId;
  board: string[];
  turn: string;
}

function gridMoveFromResult(result: EngineMoveResult): GridAiMove {
  const move = result.move;
  if (move.index) return { kind: 'place', index: move.index.index };
  if (move.from && move.to) return { kind: 'move', from: move.from.index, to: move.to.index };
  throw new Error('AI 返回的着法无法识别');
}

export async function requestGridMove(
  position: GridPosition,
  level: 1 | 2 | 3,
  timeLimitMs?: number,
  forbiddenMoves?: ApiForbiddenMove[],
): Promise<GridAiMove> {
  const result = await engineApi.search({ ...position, level, timeLimitMs, forbiddenMoves });
  return gridMoveFromResult(result);
}

/** 局面标识：同一局面重试 AI 时用它禁掉上次的应手（悔棋后换思路）。 */
export function gridPositionKey(position: GridPosition): string {
  return `${position.turn}|${JSON.stringify(position.board)}`;
}

/** 落子类棋种：禁点覆盖全部空位时整体放弃（接口会 400）。 */
export function prunePlacementBans(board: string[], bans: ApiForbiddenMove[]): ApiForbiddenMove[] {
  const empty = board.reduce((count, cell) => (cell ? count : count + 1), 0);
  const bannedCells = new Set(bans.map((ban) => ban.index).filter((index): index is number => index !== undefined));
  const blocked = board.reduce((count, cell, index) => (!cell && bannedCells.has(index) ? count + 1 : count), 0);
  if (blocked === 0 || blocked >= empty) return [];
  return bans;
}

export function gomokuPosition(state: GomokuState): GridPosition {
  return {
    game: 'gomoku',
    board: state.board.map((cell) => cell ?? ''),
    turn: state.turn,
  };
}

export function connect4Position(state: Connect4State): GridPosition {
  return {
    game: 'connect4',
    board: state.board.map((cell) => cell ?? ''),
    turn: state.turn,
  };
}

export function junglePosition(state: JungleState): GridPosition {
  return {
    game: 'jungle',
    board: state.board.map((piece) => (piece ? `${piece.color}${piece.animal}` : '')),
    turn: state.turn,
  };
}

export function checkersPosition(state: CheckersState): GridPosition {
  return {
    game: 'checkers',
    board: state.board.map((cell) => cell ?? ''),
    turn: state.turn,
  };
}
