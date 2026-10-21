import { describe, expect, it } from 'vitest';
import { gridPositionKey, prunePlacementBans } from './adapters';

describe('prunePlacementBans', () => {
  it('keeps bans that still leave playable cells', () => {
    const board = ['', 'b', '', '', 'w'];
    const bans = [{ index: 0 }];
    expect(prunePlacementBans(board, bans)).toEqual(bans);
  });

  it('drops bans when every empty cell would be blocked', () => {
    const board = ['', 'b', '', '', 'w'];
    const bans = [{ index: 0 }, { index: 2 }, { index: 3 }];
    expect(prunePlacementBans(board, bans)).toEqual([]);
  });

  it('drops bans that match no empty cell', () => {
    const board = ['', 'b', ''];
    expect(prunePlacementBans(board, [{ index: 1 }])).toEqual([]);
  });
});

describe('gridPositionKey', () => {
  it('differs by turn and board', () => {
    const base = { game: 'gomoku' as const, board: ['', 'b'], turn: 'b' };
    const flippedTurn = { ...base, turn: 'w' };
    const moved = { ...base, board: ['w', 'b'] };
    expect(gridPositionKey(base)).toBe(gridPositionKey({ ...base }));
    expect(gridPositionKey(base)).not.toBe(gridPositionKey(flippedTurn));
    expect(gridPositionKey(base)).not.toBe(gridPositionKey(moved));
  });
});
