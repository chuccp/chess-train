import { describe, expect, it } from 'vitest';
import {
  START_FEN,
  applyMove,
  evaluateBoard,
  generateLegalMoves,
  hashPosition,
  isInCheck,
  moveToUcci,
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
    expect(contentStats).toEqual({ tactics: 164, endgame: 801, opening: 40 });
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

  it('every tactic records every legal one-move mate', () => {
    for (const tactic of tacticExercises) {
      const initial = parseFen(tactic.fen);
      expect(initial.turn, tactic.id).toBe('r');
      expect(isInCheck(initial, 'r'), tactic.id).toBe(false);
      expect(isInCheck(initial, 'b'), tactic.id).toBe(false);
      const actual = generateLegalMoves(initial)
        .filter((move) => {
          const result = applyMove(initial, move.from, move.to);
          if (!result.ok) return false;
          const end = evaluateBoard(result.position, { positionHashes: [] });
          return end.status === 'win' && end.winner === 'r' && end.reason === 'checkmate';
        })
        .map((move) => moveToUcci(move.from, move.to))
        .sort();
      const listed = tactic.solutions.map((solution) => solution[0]).sort();
      expect(new Set(listed).size, `${tactic.id} duplicate solution`).toBe(listed.length);
      expect(listed, `${tactic.id} missing or extra solutions`).toEqual(actual);
    }
  });

  it('opening move comments match the recorded notation', () => {
    for (const lesson of openingLessons) {
      for (const line of lesson.lines) {
        let position = parseFen(lesson.fen);
        for (const move of line.moves) {
          const parsed = parseUcci(move.ucci);
          expect(parsed, `${lesson.id}/${line.id} ${move.ucci}`).not.toBeNull();
          if (!parsed) continue;
          const result = applyMove(position, parsed.from, parsed.to);
          expect(result.ok, `${lesson.id}/${line.id} ${move.ucci}`).toBe(true);
          if (!result.ok) continue;
          expect(move.comment, `${lesson.id}/${line.id} comment`).toContain(result.notation);
          position = result.position;
        }
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

  it('endgame records are legal, forced and honestly labelled', () => {
    for (const lesson of endgameLessons) {
      const initial = parseFen(lesson.fen);
      expect(initial.turn, lesson.id).toBe('r');
      expect(isInCheck(initial, 'r'), lesson.id).toBe(false);
      expect(isInCheck(initial, 'b'), lesson.id).toBe(false);

      const immediateWins = generateLegalMoves(initial).filter((move) => {
        const result = applyMove(initial, move.from, move.to);
        if (!result.ok) return false;
        const end = evaluateBoard(result.position, { positionHashes: [] });
        return end.status === 'win' && end.winner === 'r' && end.reason === 'checkmate';
      });
      if (immediateWins.length > 0) {
        expect(lesson.title, lesson.id).not.toContain('两步成杀');
      }

      for (const line of lesson.lines) {
        let position = initial;
        for (const move of line.moves) {
          const parsed = parseUcci(move.ucci);
          expect(parsed, `${lesson.id}/${line.id} ${move.ucci}`).not.toBeNull();
          if (!parsed) continue;
          const result = applyMove(position, parsed.from, parsed.to);
          expect(result.ok, `${lesson.id}/${line.id} ${move.ucci}`).toBe(true);
          if (!result.ok) continue;
          expect(move.comment, `${lesson.id}/${line.id} comment`).toContain(result.notation);
          position = result.position;
        }

        const forcedReference = /^endgame-0[1-6]$/.test(lesson.id);
        if (forcedReference && line.moves.length === 3) {
          const first = parseUcci(line.moves[0]?.ucci ?? '');
          const final = parseUcci(line.moves[2]?.ucci ?? '');
          expect(first, `${lesson.id}/${line.id} first`).not.toBeNull();
          expect(final, `${lesson.id}/${line.id} final`).not.toBeNull();
          if (!first || !final) continue;
          const afterFirst = applyMove(initial, first.from, first.to);
          expect(afterFirst.ok, `${lesson.id}/${line.id} first move`).toBe(true);
          if (!afterFirst.ok) continue;
          for (const reply of generateLegalMoves(afterFirst.position)) {
            const afterReply = applyMove(afterFirst.position, reply.from, reply.to);
            expect(afterReply.ok, `${lesson.id}/${line.id} reply`).toBe(true);
            if (!afterReply.ok) continue;
            const finalMove = applyMove(afterReply.position, final.from, final.to);
            expect(finalMove.ok, `${lesson.id}/${line.id} final after reply`).toBe(true);
            if (!finalMove.ok) continue;
            const end = evaluateBoard(finalMove.position, { positionHashes: [] });
            expect(end, `${lesson.id}/${line.id} final after reply`).toMatchObject({
              status: 'win',
              winner: 'r',
              reason: 'checkmate',
            });
          }
        }
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
