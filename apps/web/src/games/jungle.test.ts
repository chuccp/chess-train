import { describe, expect, it } from 'vitest';
import {
  JUNGLE_COLS,
  applyJungleMove,
  createJungleInitial,
  generateJungleMoves,
  jungleIndex,
  type JungleBoard,
  type JungleColor,
  type JunglePiece,
  type JungleState,
} from './jungle';

function emptyState(turn: JungleColor = 'r'): JungleState {
  return {
    board: Array(9 * JUNGLE_COLS).fill(null) as JungleBoard,
    turn,
    status: { status: 'playing' },
  };
}

function put(state: JungleState, row: number, col: number, color: JungleColor, animal: JunglePiece['animal']) {
  state.board[jungleIndex(row, col)] = { color, animal };
}

function hasMove(state: JungleState, from: [number, number], to: [number, number]) {
  const fromIndex = jungleIndex(...from);
  const toIndex = jungleIndex(...to);
  return generateJungleMoves(state).some((move) => move.from === fromIndex && move.to === toIndex);
}

describe('jungle chess', () => {
  it('starts with eight pieces per side and red to move', () => {
    const state = createJungleInitial();
    expect(state.turn).toBe('r');
    expect(state.board.filter((piece) => piece?.color === 'r')).toHaveLength(8);
    expect(state.board.filter((piece) => piece?.color === 'b')).toHaveLength(8);
    expect(state.board[jungleIndex(8, 0)]).toEqual({ color: 'r', animal: 'T' });
    expect(state.board[jungleIndex(0, 0)]).toEqual({ color: 'b', animal: 'L' });
  });

  it('lets a rat capture an elephant, but not the other way around', () => {
    const ratState = emptyState('r');
    put(ratState, 3, 0, 'r', 'R');
    put(ratState, 2, 0, 'b', 'E');
    expect(hasMove(ratState, [3, 0], [2, 0])).toBe(true);

    const elephantState = emptyState('b');
    put(elephantState, 2, 0, 'b', 'E');
    put(elephantState, 3, 0, 'r', 'R');
    expect(hasMove(elephantState, [2, 0], [3, 0])).toBe(false);
  });

  it('only lets the rat enter water', () => {
    const state = emptyState('r');
    put(state, 2, 1, 'r', 'W');
    put(state, 3, 6, 'r', 'R');
    expect(hasMove(state, [2, 1], [3, 1])).toBe(false);
    expect(hasMove(state, [3, 6], [3, 5])).toBe(true);
  });

  it('makes an enemy piece on a trap capturable by a lower-ranked piece', () => {
    const state = emptyState('b');
    put(state, 0, 2, 'r', 'L');
    put(state, 0, 1, 'b', 'R');
    expect(hasMove(state, [0, 1], [0, 2])).toBe(true);
  });

  it('lets a lion or tiger jump the river, and blocks the jump with a rat in the water', () => {
    const state = emptyState('r');
    put(state, 2, 1, 'r', 'L');
    expect(hasMove(state, [2, 1], [6, 1])).toBe(true);

    put(state, 4, 1, 'b', 'R');
    expect(hasMove(state, [2, 1], [6, 1])).toBe(false);
  });

  it('wins by entering the enemy den', () => {
    const state = emptyState('r');
    put(state, 1, 3, 'r', 'L');
    const move = generateJungleMoves(state).find((candidate) => candidate.to === jungleIndex(0, 3));
    expect(move).toBeDefined();
    if (!move) return;
    const next = applyJungleMove(state, move);
    expect(next.status).toEqual({ status: 'win', winner: 'r', reason: 'den' });
  });
});
