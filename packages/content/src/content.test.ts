import { describe, expect, it } from 'vitest';
import {
  START_FEN,
  applyMove,
  evaluateBoard,
  fileOf,
  generateLegalMoves,
  hashPosition,
  isInCheck,
  moveToUcci,
  parseFen,
  parseUcci,
  rankOf,
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
    expect(contentStats).toEqual({ tactics: 861, endgame: 737, opening: 209 });
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

  it('has unique positions and excludes full-game start positions', () => {
    const seen = new Set<string>();
    const limits = { K: 1, A: 2, B: 2, N: 2, R: 2, C: 2, P: 5 } as const;
    for (const lesson of endgameLessons) {
      expect(lesson.fen, lesson.id).not.toBe(START_FEN);
      expect(seen.has(lesson.fen), `${lesson.id} duplicate FEN`).toBe(false);
      seen.add(lesson.fen);
      const position = parseFen(lesson.fen);
      expect(position.board.filter(Boolean).length, `${lesson.id} full board`).toBeLessThan(32);
      for (const color of ['r', 'b'] as const) {
        for (const [type, max] of Object.entries(limits)) {
          const count = position.board.filter((piece) => piece?.color === color && piece.type === type).length;
          expect(count, `${lesson.id} ${color}${type}`).toBeLessThanOrEqual(max);
        }
      }
    }
  });

  it('places every advisor on a reachable palace diagonal point', () => {
    const legalAdvisorSquares = {
      r: new Set(['d0', 'f0', 'e1', 'd2', 'f2']),
      b: new Set(['d9', 'f9', 'e8', 'd7', 'f7']),
    } as const;
    const files = 'abcdefghi';
    for (const item of [...tacticExercises, ...endgameLessons]) {
      const position = parseFen(item.fen);
      position.board.forEach((piece, square) => {
        if (piece?.type !== 'A') return;
        const coordinate = `${files[fileOf(square)]}${rankOf(square)}`;
        expect(
          legalAdvisorSquares[piece.color].has(coordinate),
          `${item.id} ${piece.color === 'r' ? '仕' : '士'} at ${coordinate}`,
        ).toBe(true);
      });
    }
  });

  it('has unique opening sequences and tactic positions', () => {
    const openingSequences = new Set<string>();
    const openingTitles = new Set<string>();
    for (const lesson of openingLessons) {
      const sequence = lesson.lines[0]?.moves.map((move) => move.ucci).join(' ') ?? '';
      expect(openingSequences.has(sequence), `${lesson.id} duplicate line`).toBe(false);
      openingSequences.add(sequence);
      expect(openingTitles.has(lesson.title), `${lesson.id} duplicate title`).toBe(false);
      openingTitles.add(lesson.title);
    }
    const tacticFens = new Set<string>();
    for (const tactic of tacticExercises) {
      expect(tacticFens.has(tactic.fen), `${tactic.id} duplicate FEN`).toBe(false);
      tacticFens.add(tactic.fen);
    }
    for (const lesson of endgameLessons) {
      expect(tacticFens.has(lesson.fen), `${lesson.id} duplicates a tactic FEN`).toBe(false);
    }
  });
  it('does not repeat endgame main lines', () => {
    const lines = new Set<string>();
    for (const lesson of endgameLessons) {
      for (const line of lesson.lines) {
        const signature = line.moves.map((move) => move.ucci).join(' ');
        expect(lines.has(signature), `${lesson.id}/${line.id} duplicate main line`).toBe(false);
        lines.add(signature);
      }
    }
  });
  it('uses consistent difficulty levels', () => {
    for (const lesson of endgameLessons) {
      const branch = generateLegalMoves(parseFen(lesson.fen)).length;
      const score = Math.ceil(lesson.lines[0].moves.length / 2) + branch / 30;
      const expected = score <= 5 ? 1 : score <= 10 ? 2 : 3;
      expect(lesson.level, `${lesson.id} difficulty`).toBe(expected);
    }
    for (const tactic of tacticExercises) {
      const branch = generateLegalMoves(parseFen(tactic.fen)).length;
      const score = branch - 3 * tactic.solutions.length;
      const expected = score <= 20 ? 1 : score <= 34 ? 2 : 3;
      expect(tactic.level, `${tactic.id} difficulty`).toBe(expected);
    }
    for (const lesson of openingLessons) {
      const plies = lesson.lines[0].moves.length;
      const expected = plies <= 12 ? 1 : plies <= 36 ? 2 : 3;
      expect(lesson.level, `${lesson.id} difficulty`).toBe(expected);
    }
  });
  it('orders endgames from easier and shorter to harder and longer', () => {
    for (let index = 1; index < endgameLessons.length; index += 1) {
      const previous = endgameLessons[index - 1];
      const current = endgameLessons[index];
      expect(previous.level, `${previous.id} level order`).toBeLessThanOrEqual(current.level);
      if (previous.level === current.level) {
        expect(previous.lines[0]?.moves.length ?? 0, `${previous.id} depth order`)
          .toBeLessThanOrEqual(current.lines[0]?.moves.length ?? 0);
      }
    }
  });
  it('orders one-move tactics from easier to harder', () => {
    for (let index = 1; index < tacticExercises.length; index += 1) {
      const previous = tacticExercises[index - 1];
      const current = tacticExercises[index];
      expect(previous.level, `${previous.id} level order`).toBeLessThanOrEqual(current.level);
      if (previous.level === current.level) {
        expect(previous.solutions.length, `${previous.id} winning-path order`)
          .toBeGreaterThanOrEqual(current.solutions.length);
      }
    }
  });
  it('orders openings from easier and shorter to harder and longer', () => {
    for (let index = 1; index < openingLessons.length; index += 1) {
      const previous = openingLessons[index - 1];
      const current = openingLessons[index];
      expect(previous.level, `${previous.id} level order`).toBeLessThanOrEqual(current.level);
      if (previous.level === current.level) {
        expect(previous.lines[0]?.moves.length ?? 0, `${previous.id} depth order`)
          .toBeLessThanOrEqual(current.lines[0]?.moves.length ?? 0);
      }
    }
  });
  it('every tactic is legal and every listed solution wins in one', () => {
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
        });
        expect(['checkmate', 'stalemate'], `${tactic.id} winning reason`).toContain(end.reason);
      }
    }
  });

  it('every tactic records every legal one-move win', () => {
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
          return end.status === 'win' && end.winner === 'r';
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
  it('every endgame guided line is legal and ends in a win', () => {
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
        });
        expect(['checkmate', 'stalemate'], `${lesson.id}/${line.id} winning reason`).toContain(end.reason);
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
        return end.status === 'win' && end.winner === 'r';
      });
      expect(immediateWins, `${lesson.id} must not have a one-move mate`).toHaveLength(0);

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
            });
            expect(['checkmate', 'stalemate'], `${lesson.id}/${line.id} reply winning reason`)
              .toContain(end.reason);
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
