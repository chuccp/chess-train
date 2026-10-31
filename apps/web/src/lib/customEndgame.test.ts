import { describe, expect, it } from 'vitest';
import { clonePosition, createInitialPosition, squareAt } from '@qilian/xiangqi';
import {
  createKingsOnlyBoard,
  endgameTurnLabel,
  formatCustomFen,
  parseCustomFen,
  validatePosition,
} from './customEndgame';

const VALID_FEN = '4k4/9/9/9/9/4P4/9/9/9/4K4 w - - 0 1';

describe('validatePosition', () => {
  it('接受合法的稀疏残局并归零时钟', () => {
    const result = parseCustomFen('4k4/9/9/9/9/4P4/9/9/9/4K4 w - - 119 50');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.fen).toBe(VALID_FEN);
      expect(result.position.halfmoveClock).toBe(0);
      expect(result.position.fullmove).toBe(1);
    }
  });

  it('拒绝缺失将帅的局面', () => {
    const position = clonePosition(createInitialPosition());
    position.board[squareAt(4, 0)] = null;
    const result = validatePosition(position);
    expect(result).toEqual({ ok: false, error: '棋盘上必须同时有红方和黑方的将帅' });
  });

  it('拒绝每方多于一个将帅', () => {
    const result = parseCustomFen('4k4/9/9/9/9/4R4/9/9/9/3KK4 w - - 0 1');
    expect(result).toEqual({ ok: false, error: '每方只能有一个将帅' });
  });

  it('拒绝将帅走出九宫', () => {
    const position = clonePosition(createInitialPosition());
    position.board[squareAt(4, 0)] = null;
    position.board[squareAt(0, 0)] = { color: 'r', type: 'K' };
    const result = validatePosition(position);
    expect(result).toEqual({ ok: false, error: '将帅必须待在各自的九宫内' });
  });

  it('拒绝非行棋方已被将军的局面', () => {
    const result = parseCustomFen('4k4/4R4/9/9/9/9/9/9/9/4K4 w - - 0 1');
    expect(result).toEqual({ ok: false, error: '轮到走棋的一方不能处于被将军的状态' });
  });

  it('拒绝双方将帅照面', () => {
    const result = parseCustomFen('4k4/9/9/9/9/9/9/9/9/4K4 w - - 0 1');
    expect(result).toEqual({ ok: false, error: '轮到走棋的一方不能处于被将军的状态' });
  });

  it('拒绝行棋方已被将死的局面', () => {
    const result = parseCustomFen('4k4/9/9/9/9/9/9/9/4r4/r3K2r1 w - - 0 1');
    expect(result).toEqual({ ok: false, error: '这个局面已经分出胜负，换一个摆法' });
  });

  it('拒绝只剩双帅的局面', () => {
    const result = parseCustomFen('4k4/9/9/9/9/9/9/9/9/3K5 b - - 0 1');
    expect(result).toEqual({ ok: false, error: '至少要有一枚将帅以外的棋子' });
  });

  it('对格式错误给出友好提示', () => {
    const result = parseCustomFen('not a fen');
    expect(result).toEqual({
      ok: false,
      error: 'FEN 格式不正确，请检查将帅位置、行棋方和行数',
    });
  });
});

describe('helpers', () => {
  it('只有将帅的初始棋盘是 90 格且双方各一将', () => {
    const board = createKingsOnlyBoard();
    expect(board).toHaveLength(90);
    expect(board[squareAt(4, 0)]).toEqual({ color: 'r', type: 'K' });
    expect(board[squareAt(3, 9)]).toEqual({ color: 'b', type: 'K' });
    expect(board.filter(Boolean)).toHaveLength(2);
  });

  it('格式化 FEN 始终归零时钟', () => {
    const position = clonePosition(createInitialPosition());
    position.turn = 'b';
    position.halfmoveClock = 42;
    position.fullmove = 17;
    expect(formatCustomFen(position)).toMatch(/ b - - 0 1$/);
  });

  it('从 FEN 读出先手', () => {
    expect(endgameTurnLabel(VALID_FEN)).toBe('红先');
    expect(endgameTurnLabel(VALID_FEN.replace(' w ', ' b '))).toBe('黑先');
    expect(endgameTurnLabel('bad')).toBe('局面无效');
  });
});
