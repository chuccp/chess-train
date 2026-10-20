/**
 * Xiangqi rules core.
 *
 * Internal coordinates:
 *   file 0..8 = a..i, left-to-right from Red's perspective
 *   rank 0..9 = Red baseline to Black baseline
 *   square = rank * 9 + file
 *
 * FEN rows are top-down (rank 9 first), as in standard Xiangqi FEN.
 */

export const BOARD_FILES = 9;
export const BOARD_RANKS = 10;
export const BOARD_SIZE = BOARD_FILES * BOARD_RANKS;

export const START_FEN =
  'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1';

export type Color = 'r' | 'b';
export type PieceType = 'K' | 'A' | 'B' | 'N' | 'R' | 'C' | 'P';

export interface Piece {
  color: Color;
  type: PieceType;
}

export interface Position {
  board: (Piece | null)[];
  turn: Color;
  halfmoveClock: number;
  fullmove: number;
}

export interface Move {
  from: number;
  to: number;
  piece: Piece;
  captured: Piece | null;
}

export type BoardEnd =
  | { status: 'playing' }
  | { status: 'win'; winner: Color; reason: 'checkmate' | 'stalemate' }
  | { status: 'draw'; reason: 'repetition' | 'no-capture' | 'bare-kings' };

export interface GameContext {
  /** Position hashes in play order, including the current position. */
  positionHashes: string[];
}

export type MoveErrorCode = 'ILLEGAL_MOVE' | 'NOT_YOUR_TURN' | 'NO_PIECE' | 'INVALID_COORDINATE';

export type MoveResult =
  | {
      ok: true;
      position: Position;
      move: Move;
      ucci: string;
      notation: string;
      givesCheck: boolean;
    }
  | { ok: false; code: MoveErrorCode; message: string };

const FILES = 'abcdefghi';
const CHINESE_NUMERALS = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

const RED_NAMES: Record<PieceType, string> = {
  K: '帅',
  A: '仕',
  B: '相',
  N: '马',
  R: '车',
  C: '炮',
  P: '兵',
};

const BLACK_NAMES: Record<PieceType, string> = {
  K: '将',
  A: '士',
  B: '象',
  N: '马',
  R: '车',
  C: '炮',
  P: '卒',
};

const LETTER_TO_TYPE: Record<string, PieceType> = {
  k: 'K',
  a: 'A',
  b: 'B',
  n: 'N',
  r: 'R',
  c: 'C',
  p: 'P',
};

export const PIECE_GLYPHS: Record<Color, Record<PieceType, string>> = {
  r: { K: '帅', A: '仕', B: '相', N: '马', R: '车', C: '炮', P: '兵' },
  b: { K: '将', A: '士', B: '象', N: '馬', R: '車', C: '砲', P: '卒' },
};

export function fileOf(square: number): number {
  return square % BOARD_FILES;
}

export function rankOf(square: number): number {
  return Math.floor(square / BOARD_FILES);
}

export function squareAt(file: number, rank: number): number {
  return rank * BOARD_FILES + file;
}

export function inBoard(file: number, rank: number): boolean {
  return file >= 0 && file < BOARD_FILES && rank >= 0 && rank < BOARD_RANKS;
}

export function opposite(color: Color): Color {
  return color === 'r' ? 'b' : 'r';
}

export function pieceAt(position: Position, square: number): Piece | null {
  return position.board[square] ?? null;
}

export function cloneBoard(board: (Piece | null)[]): (Piece | null)[] {
  return board.slice();
}

export function clonePosition(position: Position): Position {
  return { ...position, board: cloneBoard(position.board) };
}

export function isPalaceSquare(color: Color, file: number, rank: number): boolean {
  if (file < 3 || file > 5) return false;
  return color === 'r' ? rank >= 0 && rank <= 2 : rank >= 7 && rank <= 9;
}

export function getKingSquare(board: (Piece | null)[], color: Color): number | null {
  for (let square = 0; square < board.length; square += 1) {
    const piece = board[square];
    if (piece?.color === color && piece.type === 'K') return square;
  }
  return null;
}

export function parseUcci(ucci: string): { from: number; to: number } | null {
  if (!/^[a-i][0-9][a-i][0-9]$/.test(ucci)) return null;
  const fromFile = FILES.indexOf(ucci[0] as string);
  const fromRank = Number(ucci[1]);
  const toFile = FILES.indexOf(ucci[2] as string);
  const toRank = Number(ucci[3]);
  if (!inBoard(fromFile, fromRank) || !inBoard(toFile, toRank)) return null;
  return { from: squareAt(fromFile, fromRank), to: squareAt(toFile, toRank) };
}

export function moveToUcci(from: number, to: number): string {
  return `${FILES[fileOf(from)]}${rankOf(from)}${FILES[fileOf(to)]}${rankOf(to)}`;
}

export function parseFen(fen: string): Position {
  const parts = fen.trim().split(/\s+/);
  if (parts.length < 4) throw new Error('Invalid FEN: expected at least 4 fields');
  const placement = parts[0];
  if (!placement) throw new Error('Invalid FEN: missing placement');
  const [turnToken, , , halfmoveToken, fullmoveToken] = parts.slice(1);
  const rows = placement.split('/');
  if (rows.length !== 10) throw new Error('Invalid FEN: expected 10 ranks');

  const board: (Piece | null)[] = Array.from({ length: BOARD_SIZE }, () => null);

  for (let row = 0; row < 10; row += 1) {
    const rank = 9 - row;
    let file = 0;
    for (const char of rows[row] as string) {
      if (char >= '1' && char <= '9') {
        file += Number(char);
      } else {
        const type = LETTER_TO_TYPE[char.toLowerCase()];
        if (!type) throw new Error(`Invalid FEN piece: ${char}`);
        const color: Color = char === char.toUpperCase() ? 'r' : 'b';
        if (!inBoard(file, rank)) throw new Error('Invalid FEN: too many files');
        board[squareAt(file, rank)] = { color, type };
        file += 1;
      }
    }
    if (file !== 9) throw new Error('Invalid FEN: each rank must contain 9 files');
  }

  const redKing = getKingSquare(board, 'r');
  const blackKing = getKingSquare(board, 'b');
  if (redKing === null || blackKing === null) throw new Error('Invalid FEN: both kings are required');
  if (!isPalaceSquare('r', fileOf(redKing), rankOf(redKing)) || !isPalaceSquare('b', fileOf(blackKing), rankOf(blackKing))) {
    throw new Error('Invalid FEN: kings must start inside their palaces');
  }

  const turn: Color = turnToken === 'w' ? 'r' : turnToken === 'b' ? 'b' : (() => {
    throw new Error('Invalid FEN: side to move must be w or b');
  })();

  const halfmoveClock = Number(halfmoveToken ?? 0);
  const fullmove = Number(fullmoveToken ?? 1);
  if (!Number.isInteger(halfmoveClock) || halfmoveClock < 0) throw new Error('Invalid FEN: bad halfmove clock');
  if (!Number.isInteger(fullmove) || fullmove < 1) throw new Error('Invalid FEN: bad fullmove number');

  return { board, turn, halfmoveClock, fullmove };
}

export function toFen(position: Position): string {
  const rows: string[] = [];
  for (let rank = 9; rank >= 0; rank -= 1) {
    let row = '';
    let empty = 0;
    for (let file = 0; file < 9; file += 1) {
      const piece = position.board[squareAt(file, rank)];
      if (!piece) {
        empty += 1;
        continue;
      }
      if (empty > 0) {
        row += String(empty);
        empty = 0;
      }
      const letter = piece.type.toLowerCase();
      row += piece.color === 'r' ? letter.toUpperCase() : letter;
    }
    if (empty > 0) row += String(empty);
    rows.push(row);
  }
  return `${rows.join('/')} ${position.turn === 'r' ? 'w' : 'b'} - - ${position.halfmoveClock} ${position.fullmove}`;
}

export function createInitialPosition(): Position {
  return parseFen(START_FEN);
}

export function hashPosition(position: Position): string {
  let hash = position.turn;
  for (const piece of position.board) {
    if (!piece) {
      hash += '.';
    } else {
      hash += piece.color + piece.type;
    }
  }
  return hash;
}

function pushIfFree(
  board: (Piece | null)[],
  moves: Move[],
  from: number,
  toFile: number,
  toRank: number,
  piece: Piece,
): void {
  if (!inBoard(toFile, toRank)) return;
  const to = squareAt(toFile, toRank);
  const target = board[to];
  if (target?.color === piece.color) return;
  moves.push({ from, to, piece, captured: target ?? null });
}

function pushSlidingMoves(
  board: (Piece | null)[],
  moves: Move[],
  from: number,
  piece: Piece,
  directions: ReadonlyArray<readonly [number, number]>,
  cannon: boolean,
): void {
  const fromFile = fileOf(from);
  const fromRank = rankOf(from);
  for (const [df, dr] of directions) {
    let file = fromFile + df;
    let rank = fromRank + dr;
    let screens = 0;

    while (inBoard(file, rank)) {
      const to = squareAt(file, rank);
      const target = board[to];

      if (!target) {
        if (!cannon || screens === 0) {
          moves.push({ from, to, piece, captured: null });
        }
      } else if (!cannon) {
        if (target.color !== piece.color) moves.push({ from, to, piece, captured: target });
        break;
      } else {
        screens += 1;
        if (screens === 2) {
          if (target.color !== piece.color) moves.push({ from, to, piece, captured: target });
          break;
        }
      }

      file += df;
      rank += dr;
    }
  }
}

export function generatePseudoMoves(position: Position, color: Color = position.turn): Move[] {
  const board = position.board;
  const moves: Move[] = [];

  for (let from = 0; from < board.length; from += 1) {
    const piece = board[from];
    if (!piece || piece.color !== color) continue;
    const fromFile = fileOf(from);
    const fromRank = rankOf(from);

    switch (piece.type) {
      case 'K': {
        for (const [df, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
          const file = fromFile + df;
          const rank = fromRank + dr;
          if (isPalaceSquare(color, file, rank)) {
            pushIfFree(board, moves, from, file, rank, piece);
          }
        }
        break;
      }
      case 'A': {
        for (const [df, dr] of [[1, 1], [1, -1], [-1, 1], [-1, -1]] as const) {
          const file = fromFile + df;
          const rank = fromRank + dr;
          if (isPalaceSquare(color, file, rank)) {
            pushIfFree(board, moves, from, file, rank, piece);
          }
        }
        break;
      }
      case 'B': {
        for (const [df, dr] of [[2, 2], [2, -2], [-2, 2], [-2, -2]] as const) {
          const file = fromFile + df;
          const rank = fromRank + dr;
          if (!inBoard(file, rank)) continue;
          if (color === 'r' ? rank > 4 : rank < 5) continue;
          const eye = squareAt(fromFile + df / 2, fromRank + dr / 2);
          if (board[eye]) continue;
          pushIfFree(board, moves, from, file, rank, piece);
        }
        break;
      }
      case 'N': {
        const candidates = [
          [1, 2],
          [-1, 2],
          [1, -2],
          [-1, -2],
          [2, 1],
          [2, -1],
          [-2, 1],
          [-2, -1],
        ] as const;
        for (const [df, dr] of candidates) {
          const file = fromFile + df;
          const rank = fromRank + dr;
          if (!inBoard(file, rank)) continue;
          const legFile = fromFile + (Math.abs(df) === 2 ? Math.sign(df) : 0);
          const legRank = fromRank + (Math.abs(dr) === 2 ? Math.sign(dr) : 0);
          if (board[squareAt(legFile, legRank)]) continue;
          pushIfFree(board, moves, from, file, rank, piece);
        }
        break;
      }
      case 'R':
        pushSlidingMoves(board, moves, from, piece, [[1, 0], [-1, 0], [0, 1], [0, -1]], false);
        break;
      case 'C':
        pushSlidingMoves(board, moves, from, piece, [[1, 0], [-1, 0], [0, 1], [0, -1]], true);
        break;
      case 'P': {
        const forwardRank = fromRank + (color === 'r' ? 1 : -1);
        if (inBoard(fromFile, forwardRank)) pushIfFree(board, moves, from, fromFile, forwardRank, piece);
        const crossed = color === 'r' ? fromRank >= 5 : fromRank <= 4;
        if (crossed) {
          pushIfFree(board, moves, from, fromFile - 1, fromRank, piece);
          pushIfFree(board, moves, from, fromFile + 1, fromRank, piece);
        }
        break;
      }
    }
  }

  return moves;
}

export function isSquareAttacked(position: Position, target: number, byColor: Color): boolean {
  return generatePseudoMoves(position, byColor).some((move) => move.to === target);
}

function kingsFace(board: (Piece | null)[], redKing: number, blackKing: number): boolean {
  if (fileOf(redKing) !== fileOf(blackKing)) return false;
  const from = Math.min(rankOf(redKing), rankOf(blackKing)) + 1;
  const to = Math.max(rankOf(redKing), rankOf(blackKing));
  for (let rank = from; rank < to; rank += 1) {
    if (board[squareAt(fileOf(redKing), rank)]) return false;
  }
  return true;
}

export function isInCheck(position: Position, color: Color): boolean {
  const king = getKingSquare(position.board, color);
  if (king === null) return true;
  const enemy = opposite(color);
  const enemyKing = getKingSquare(position.board, enemy);
  if (enemyKing !== null) {
    const redKing = color === 'r' ? king : enemyKing;
    const blackKing = color === 'b' ? king : enemyKing;
    if (kingsFace(position.board, redKing, blackKing)) return true;
  }
  return isSquareAttacked(position, king, enemy);
}

export function applyMoveToBoard(position: Position, move: Move): Position {
  const board = cloneBoard(position.board);
  const piece = board[move.from];
  if (!piece) throw new Error('Cannot apply a move from an empty square');
  board[move.to] = piece;
  board[move.from] = null;

  const nextTurn = opposite(position.turn);
  const wasCapture = move.captured !== null;
  return {
    board,
    turn: nextTurn,
    halfmoveClock: wasCapture ? 0 : position.halfmoveClock + 1,
    fullmove: position.fullmove + (nextTurn === 'r' ? 1 : 0),
  };
}

export function generateLegalMoves(position: Position): Move[] {
  const color = position.turn;
  const legal: Move[] = [];
  for (const move of generatePseudoMoves(position, color)) {
    if (move.captured?.type === 'K') continue;
    const next = applyMoveToBoard(position, move);
    if (!isInCheck(next, color)) legal.push(move);
  }
  return legal;
}

export function findLegalMove(position: Position, from: number, to: number): Move | null {
  return generateLegalMoves(position).find((move) => move.from === from && move.to === to) ?? null;
}

function chineseNumberFor(color: Color, value: number): string {
  if (value < 1 || value > 9) return String(value);
  return color === 'r' ? (CHINESE_NUMERALS[value - 1] as string) : String(value);
}

function fileNumber(color: Color, file: number): number {
  return color === 'r' ? 9 - file : file + 1;
}

function pieceName(color: Color, type: PieceType): string {
  return color === 'r' ? RED_NAMES[type] : BLACK_NAMES[type];
}

/** Produces standard Chinese notation when unambiguous; otherwise UCCI. */
export function formatNotation(position: Position, move: Move): string {
  const { from, to, piece } = move;
  const fromFile = fileOf(from);
  const fromRank = rankOf(from);
  const toFile = fileOf(to);
  const toRank = rankOf(to);
  const name = pieceName(piece.color, piece.type);

  const sameFile = position.board
    .map((candidate, square) => ({ candidate, square }))
    .filter(
      (entry): entry is { candidate: Piece; square: number } =>
        Boolean(entry.candidate && entry.candidate.color === piece.color && entry.candidate.type === piece.type),
    )
    .filter((entry) => fileOf(entry.square) === fromFile)
    .sort((a, b) => (piece.color === 'r' ? rankOf(b.square) - rankOf(a.square) : rankOf(a.square) - rankOf(b.square)));

  let prefix = '';
  if (sameFile.length > 2) return moveToUcci(from, to);
  if (sameFile.length === 2) {
    const index = sameFile.findIndex((entry) => entry.square === from);
    if (index < 0) return moveToUcci(from, to);
    prefix = index === 0 ? '前' : '后';
  }

  const origin = chineseNumberFor(piece.color, fileNumber(piece.color, fromFile));
  const destination = chineseNumberFor(piece.color, fileNumber(piece.color, toFile));
  const leading = `${prefix}${name}${prefix ? '' : origin}`;

  if (fromRank === toRank) {
    return `${leading}平${destination}`;
  }

  const isAdvancing = piece.color === 'r' ? toRank > fromRank : toRank < fromRank;
  const direction = isAdvancing ? '进' : '退';

  let amount: string;
  if (piece.type === 'N' || piece.type === 'A' || piece.type === 'B') {
    amount = destination;
  } else {
    amount = chineseNumberFor(piece.color, Math.abs(toRank - fromRank));
  }

  return `${leading}${direction}${amount}`;
}

export function moveToUcciWithPosition(position: Position, from: number, to: number): string {
  const piece = pieceAt(position, from);
  if (!piece) return '';
  return moveToUcci(from, to);
}
export function parseUcciMove(position: Position, ucci: string): Move | null {
  const parsed = parseUcci(ucci);
  if (!parsed) return null;
  const piece = pieceAt(position, parsed.from);
  if (!piece || piece.color !== position.turn) return null;
  const legal = findLegalMove(position, parsed.from, parsed.to);
  return legal;
}

export function applyMove(position: Position, from: number, to: number): MoveResult {
  if (!inBoard(fileOf(from), rankOf(from)) || !inBoard(fileOf(to), rankOf(to))) {
    return { ok: false, code: 'INVALID_COORDINATE', message: '落点不在棋盘内' };
  }
  const piece = pieceAt(position, from);
  if (!piece) return { ok: false, code: 'NO_PIECE', message: '起始位置没有棋子' };
  if (piece.color !== position.turn) return { ok: false, code: 'NOT_YOUR_TURN', message: '还没有轮到这一方' };
  const move = findLegalMove(position, from, to);
  if (!move) return { ok: false, code: 'ILLEGAL_MOVE', message: '这步棋不能走' };

  const next = applyMoveToBoard(position, move);
  const givesCheck = isInCheck(next, opposite(piece.color));
  return {
    ok: true,
    position: next,
    move,
    ucci: moveToUcci(from, to),
    notation: formatNotation(position, move),
    givesCheck,
  };
}

export function evaluateBoard(position: Position, context: GameContext = { positionHashes: [hashPosition(position)] }): BoardEnd {
  const legal = generateLegalMoves(position);
  if (legal.length === 0) {
    if (isInCheck(position, position.turn)) {
      return { status: 'win', winner: opposite(position.turn), reason: 'checkmate' };
    }
    return { status: 'win', winner: opposite(position.turn), reason: 'stalemate' };
  }

  const pieces = position.board.filter((piece): piece is Piece => piece !== null);
  if (pieces.length === 2 && pieces.every((piece) => piece.type === 'K')) {
    return { status: 'draw', reason: 'bare-kings' };
  }
  if (position.halfmoveClock >= 120) {
    return { status: 'draw', reason: 'no-capture' };
  }

  const currentHash = hashPosition(position);
  const occurrences = context.positionHashes.filter((hash) => hash === currentHash).length;
  if (occurrences >= 3) {
    return { status: 'draw', reason: 'repetition' };
  }

  return { status: 'playing' };
}

export const PIECE_TYPE_VALUES: Record<PieceType, number> = {
  K: 100000,
  R: 900,
  C: 450,
  N: 400,
  B: 200,
  A: 200,
  P: 100,
};

export function materialOf(position: Position, color: Color): number {
  return position.board.reduce((total, piece) => {
    if (!piece || piece.color !== color) return total;
    return total + PIECE_TYPE_VALUES[piece.type];
  }, 0);
}
