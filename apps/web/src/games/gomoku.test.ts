import { describe, expect, it } from 'vitest';
import {
  GOMOKU_SIZE,
  createGomokuInitial,
  placeGomokuStone,
  type GomokuState,
} from './gomoku';

function emptyState(): GomokuState {
  return createGomokuInitial();
}

describe('gomoku', () => {
  it('starts empty with black to move', () => {
    const state = createGomokuInitial();
    expect(state.turn).toBe('b');
    expect(state.board).toHaveLength(GOMOKU_SIZE * GOMOKU_SIZE);
    expect(state.board.every((cell) => cell === null)).toBe(true);
  });

  it('detects horizontal, vertical and diagonal five-in-a-row', () => {
    const horizontal = emptyState();
    for (let i = 0; i < 5; i += 1) horizontal.board[7 * GOMOKU_SIZE + 3 + i] = 'b';
    const h = placeGomokuStone(horizontal, 7 * GOMOKU_SIZE + 8);
    expect(h.status.status).toBe('win');

    const vertical = emptyState();
    vertical.turn = 'w';
    for (let i = 0; i < 5; i += 1) vertical.board[(3 + i) * GOMOKU_SIZE + 7] = 'w';
    const v = placeGomokuStone(vertical, 8 * GOMOKU_SIZE + 7);
    expect(v.status.status).toBe('win');

    const diagonal = emptyState();
    for (let i = 0; i < 4; i += 1) diagonal.board[(2 + i) * GOMOKU_SIZE + 2 + i] = 'b';
    const d = placeGomokuStone(diagonal, 6 * GOMOKU_SIZE + 6);
    expect(d.status.status).toBe('win');
  });

  it('rejects occupied points', () => {
    const state = emptyState();
    state.board[0] = 'b';
    expect(placeGomokuStone(state, 0)).toBe(state);
  });
});
