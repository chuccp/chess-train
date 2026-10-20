import { describe, expect, it } from 'vitest';
import {
  CONNECT4_COLS,
  CONNECT4_ROWS,
  createConnect4Initial,
  dropConnect4,
  type Connect4State,
} from './connect4';

function emptyState(): Connect4State {
  return createConnect4Initial();
}

function fillColumn(state: Connect4State, col: number, count: number) {
  for (let i = 0; i < count; i += 1) {
    const row = CONNECT4_ROWS - 1 - i;
    state.board[row * CONNECT4_COLS + col] = i % 2 === 0 ? 'r' : 'y';
  }
}

describe('connect four', () => {
  it('drops pieces to the lowest empty cell and switches turns', () => {
    const state = createConnect4Initial();
    const next = dropConnect4(state, 3);
    expect(next.board[(CONNECT4_ROWS - 1) * CONNECT4_COLS + 3]).toBe('r');
    expect(next.turn).toBe('y');
  });

  it('detects vertical and horizontal fours', () => {
    const vertical = emptyState();
    for (let i = 0; i < 3; i += 1) vertical.board[(5 - i) * CONNECT4_COLS + 3] = 'r';
    const v = dropConnect4(vertical, 3);
    expect(v.status.status).toBe('win');

    const horizontal = emptyState();
    for (let i = 0; i < 3; i += 1) horizontal.board[5 * CONNECT4_COLS + 1 + i] = 'r';
    const h = dropConnect4(horizontal, 4);
    expect(h.status.status).toBe('win');
  });

  it('does not allow dropping into a full column', () => {
    const state = emptyState();
    fillColumn(state, 0, CONNECT4_ROWS);
    expect(dropConnect4(state, 0)).toBe(state);
  });
});
