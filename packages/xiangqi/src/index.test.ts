import { describe, expect, it } from 'vitest';
import {
  START_FEN,
  applyMove,
  evaluateBoard,
  findLegalMove,
  generateLegalMoves,
  getKingSquare,
  hashPosition,
  isInCheck,
  moveToUcci,
  parseFen,
  parseUcci,
  toFen,
  type Position,
} from './index';

function fenAfter(moves: string[], fen = START_FEN): Position {
  let position = parseFen(fen);
  for (const ucci of moves) {
    const parsed = parseUcci(ucci);
    if (!parsed) throw new Error(`bad ucci ${ucci}`);
    const result = applyMove(position, parsed.from, parsed.to);
    if (!result.ok) throw new Error(`${ucci}: ${result.message}`);
    position = result.position;
  }
  return position;
}

describe('FEN and coordinates', () => {
  it('parses and serializes the initial position', () => {
    const position = parseFen(START_FEN);
    expect(position.turn).toBe('r');
    expect(toFen(position)).toBe(START_FEN);
    expect(generateLegalMoves(position)).toHaveLength(44);
  });

  it('maps UCCI files and ranks to internal squares', () => {
    expect(parseUcci('h2e2')).toEqual({ from: 25, to: 22 });
    expect(moveToUcci(25, 22)).toBe('h2e2');
    expect(parseUcci('a0i9')).toEqual({ from: 0, to: 89 });
    expect(parseUcci('z9a0')).toBeNull();
  });
});

describe('move application and notation', () => {
  it('plays the central cannon and a black horse reply', () => {
    const first = applyMove(parseFen(START_FEN), 25, 22);
    expect(first.ok).toBe(true);
    if (!first.ok) return;
    expect(first.notation).toBe('炮二平五');
    expect(first.ucci).toBe('h2e2');
    expect(first.givesCheck).toBe(false);

    const reply = applyMove(first.position, 88, 69);
    expect(reply.ok).toBe(true);
    if (!reply.ok) return;
    expect(reply.notation).toBe('马8进7');
    expect(reply.ucci).toBe('h9g7');
  });

  it('formats pawn, horse and king moves', () => {
    const pawn = applyMove(parseFen(START_FEN), 29, 38);
    expect(pawn.ok && pawn.notation).toBe('兵七进一');

    const horse = applyMove(parseFen(START_FEN), 7, 24);
    expect(horse.ok && horse.notation).toBe('马二进三');

    const king = applyMove(parseFen(START_FEN), 4, 13);
    expect(king.ok && king.notation).toBe('帅五进一');
  });

  it('rejects moves when it is not that side’s turn', () => {
    const position = parseFen(START_FEN);
    const result = applyMove(position, 88, 69);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.code).toBe('NOT_YOUR_TURN');
  });

  it('does not allow a rook to expose the two kings', () => {
    const position = parseFen('4k4/9/9/9/9/4P4/9/9/9/4K4 w - - 0 1');
    const result = applyMove(position, 49, 48);
    expect(result.ok).toBe(false);
    expect(isInCheck(position, 'r')).toBe(false);
    expect(isInCheck(position, 'b')).toBe(false);
  });
});

describe('piece rules', () => {
  it('blocks a horse by its leg', () => {
    const position = parseFen('4k4/9/9/9/9/9/4P4/4N4/9/4K4 w - - 0 1');
    expect(findLegalMove(position, parseUcci('e2f4')!.from, parseUcci('e2f4')!.to)).toBeNull();
    expect(findLegalMove(position, parseUcci('e2g3')!.from, parseUcci('e2g3')!.to)).not.toBeNull();
  });

  it('requires exactly one screen for a cannon capture', () => {
    const position = parseFen('4k4/9/9/9/9/4r4/4P4/4C4/9/4K4 w - - 0 1');
    const target = parseUcci('e2e4')!;
    const move = findLegalMove(position, target.from, target.to);
    expect(move?.captured?.type).toBe('R');
  });

  it('detects flying-general check', () => {
    const position = parseFen('4k4/9/9/9/9/9/9/9/9/4K4 w - - 0 1');
    expect(isInCheck(position, 'r')).toBe(true);
    expect(isInCheck(position, 'b')).toBe(true);
  });

  it('does not let a king leave its palace', () => {
    const position = parseFen('4k4/9/9/9/9/9/9/9/9/3K5 w - - 0 1');
    const king = getKingSquare(position.board, 'r')!;
    expect(findLegalMove(position, king, parseUcci('d0c0')!.to)).toBeNull();
  });
});

describe('terminal states', () => {
  it('finds a one-move checkmate', () => {
    const position = parseFen('9/3k5/8b/4R4/4R4/9/9/9/4K4/9 w - - 0 1');
    const target = parseUcci('e5d5')!;
    const result = applyMove(position, target.from, target.to);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const end = evaluateBoard(result.position, {
      positionHashes: [hashPosition(position), hashPosition(result.position)],
    });
    expect(end).toMatchObject({ status: 'win', winner: 'r', reason: 'checkmate' });
  });

  it('draws at the 120-ply no-capture limit', () => {
    const position = parseFen(START_FEN.replace(' w - - 0 1', ' w - - 120 1'));
    expect(evaluateBoard(position)).toMatchObject({ status: 'draw', reason: 'no-capture' });
  });

  it('draws on the third occurrence of a position', () => {
    const position = parseFen(START_FEN);
    const hash = hashPosition(position);
    expect(
      evaluateBoard(position, { positionHashes: [hash, hash, hash] }),
    ).toMatchObject({ status: 'draw', reason: 'repetition' });
  });

  it('draws with bare kings', () => {
    const position = parseFen('4k4/9/9/9/9/9/9/9/9/4K4 w - - 0 1');
    expect(evaluateBoard(position)).toMatchObject({ status: 'draw', reason: 'bare-kings' });
  });
});
