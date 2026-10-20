import { describe, expect, it } from 'vitest';
import {
  START_FEN,
  applyMove,
  evaluateBoard,
  hashPosition,
  isInCheck,
  parseFen,
  parseUcci,
  type Position,
} from '@qilian/xiangqi';
import {
  contentStats,
  endgameLessons,
  openingLessons,
  tacticExercises,
} from './index';

function playLine(fen: string, uccis: string[]): { position: Position; hashes: string[] } {
  let position = parseFen(fen);
  const hashes = [hashPosition(position)];
  for (const ucci of uccis) {
    const parsed = parseUcci(ucci);
    expect(parsed, `bad UCCI ${ucci}`).not.toBeNull();
    if (!parsed) throw new Error(`bad UCCI ${ucci}`);
    const result = applyMove(position, parsed.from, parsed.to);
    expect(result.ok, `${ucci}: ${result.ok ? '' : result.message}`).toBe(true);
    if (!result.ok) throw new Error(result.message);
    position = result.position;
    hashes.push(hashPosition(position));
  }
  return { position, hashes };
}

describe('starter content', () => {
  it('has the promised starter counts', () => {
    expect(contentStats).toEqual({ tactics: 20, endgame: 6, opening: 3 });
  });

  it('has unique ids and valid provenance metadata', () => {
    const all = [...tacticExercises, ...endgameLessons, ...openingLessons];
    const ids = new Set(all.map((item) => item.id));
    expect(ids.size).toBe(all.length);
    for (const item of all) {
      expect(item.source.name.length).toBeGreaterThan(0);
      expect(item.source.license).toBeTruthy();
      expect(item.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(item.title.length).toBeGreaterThan(0);
    }
  });

  it('every tactic is legal and every listed solution mates in one', () => {
    for (const tactic of tacticExercises) {
      const position = parseFen(tactic.fen);
      expect(position.turn, tactic.id).toBe('r');
      expect(isInCheck(position, 'r'), tactic.id).toBe(false);
      expect(isInCheck(position, 'b'), tactic.id).toBe(false);
      expect(tactic.solutions.length, tactic.id).toBeGreaterThan(0);

      for (const solution of tactic.solutions) {
        expect(solution.length, tactic.id).toBe(1);
        const parsed = parseUcci(solution[0] ?? '');
        expect(parsed, `${tactic.id} ${solution[0]}`).not.toBeNull();
        if (!parsed) continue;
        const result = applyMove(position, parsed.from, parsed.to);
        expect(result.ok, `${tactic.id} ${solution[0]}`).toBe(true);
        if (!result.ok) continue;
        const end = evaluateBoard(result.position, {
          positionHashes: [hashPosition(position), hashPosition(result.position)],
        });
        expect(end, `${tactic.id} ${solution[0]}`).toMatchObject({
          status: 'win',
          winner: 'r',
          reason: 'checkmate',
        });
      }
    }
  });

  it('every endgame guided line is legal and ends in mate', () => {
    for (const lesson of endgameLessons) {
      expect(lesson.userColor).toBe('r');
      expect(lesson.lines.length).toBeGreaterThan(0);
      for (const line of lesson.lines) {
        expect(line.moves.length).toBeGreaterThan(0);
        expect(line.moves.length % 2).toBe(1);
        const { position, hashes } = playLine(lesson.fen, line.moves.map((move) => move.ucci));
        const end = evaluateBoard(position, { positionHashes: hashes });
        expect(end, `${lesson.id}/${line.id}`).toMatchObject({
          status: 'win',
          winner: 'r',
          reason: 'checkmate',
        });
      }
    }
  });

  it('every opening line is legal and starts from the standard position', () => {
    for (const lesson of openingLessons) {
      expect(lesson.fen).toBe(START_FEN);
      expect(lesson.userColor).toBe('r');
      for (const line of lesson.lines) {
        expect(line.moves.length).toBeGreaterThanOrEqual(2);
        playLine(lesson.fen, line.moves.map((move) => move.ucci));
      }
    }
  });
});
