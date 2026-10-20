import { describe, expect, it } from 'vitest';
import {
  CHECKERS_GOAL,
  CHECKERS_HOLES,
  CHECKERS_HOME,
  CHECKERS_NEIGHBORS,
  applyCheckersMove,
  checkersDestinations,
  createCheckersInitial,
  type CheckersBoard,
  type CheckersState,
} from './checkers';

function emptyState(): CheckersState {
  return {
    board: Array(CHECKERS_HOLES.length).fill(null) as CheckersBoard,
    turn: 'r',
    status: { status: 'playing' },
  };
}

describe('Chinese checkers', () => {
  it('builds a connected 121-hole star with ten-piece homes', () => {
    expect(CHECKERS_HOLES).toHaveLength(121);
    expect(CHECKERS_HOME.r.size).toBe(10);
    expect(CHECKERS_HOME.b.size).toBe(10);
    expect(CHECKERS_GOAL.r).toBe(CHECKERS_HOME.b);
    expect(CHECKERS_GOAL.b).toBe(CHECKERS_HOME.r);

    const seen = new Set([0]);
    const queue = [0];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current === undefined) break;
      for (const neighbor of CHECKERS_NEIGHBORS[current] ?? []) {
        if (seen.has(neighbor)) continue;
        seen.add(neighbor);
        queue.push(neighbor);
      }
    }
    expect(seen.size).toBe(121);
  });

  it('starts with ten pieces per side and red to move', () => {
    const state = createCheckersInitial();
    expect(state.turn).toBe('r');
    expect(state.board.filter((color) => color === 'r')).toHaveLength(10);
    expect(state.board.filter((color) => color === 'b')).toHaveLength(10);
  });

  it('allows a one-step move into an empty adjacent hole', () => {
    const state = emptyState();
    const from = CHECKERS_HOLES.find((hole) => hole.row === 8 && hole.x2 === 0)!.id;
    expect(from).toBeDefined();
    if (from === undefined) return;
    state.board[from] = 'r';
    const destinations = checkersDestinations(state, from);
    expect(destinations).toContain(CHECKERS_NEIGHBORS[from]![0]);
  });

  it('allows jumping over one piece and chaining through empty holes', () => {
    const state = emptyState();
    const from = CHECKERS_HOLES.find((hole) => hole.row === 8 && hole.x2 === 0)!.id;
    const middle = CHECKERS_HOLES.find((hole) => hole.row === 8 && hole.x2 === 2)!.id;
    const landing = CHECKERS_HOLES.find((hole) => hole.row === 8 && hole.x2 === 4)!.id;
    expect(from).toBeDefined();
    expect(middle).toBeDefined();
    expect(landing).toBeDefined();
    if (from === undefined || middle === undefined || landing === undefined) return;
    state.board[from] = 'r';
    state.board[middle] = 'b';
    expect(checkersDestinations(state, from)).toContain(landing);
  });

  it('wins when all ten pieces reach the opposite home', () => {
    const state = emptyState();
    const goalHoles = [...CHECKERS_HOME.b];
    const entry = goalHoles
      .map((target) => ({
        target,
        source: (CHECKERS_NEIGHBORS[target] ?? []).find((hole) => !CHECKERS_HOME.b.has(hole)),
      }))
      .find((candidate) => candidate.source !== undefined);
    expect(entry).toBeDefined();
    if (!entry?.source) return;
    const { target, source } = entry;

    for (const hole of goalHoles.filter((hole) => hole !== target)) state.board[hole] = 'r';
    state.board[source] = 'r';

    const next = applyCheckersMove(state, { from: source, to: target });
    expect(next.status).toEqual({ status: 'win', winner: 'r', reason: 'all-home' });
  });
});
