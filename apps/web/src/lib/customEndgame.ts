import {
  BOARD_SIZE,
  evaluateBoard,
  getKingSquare,
  hashPosition,
  isInCheck,
  isPalaceSquare,
  opposite,
  parseFen,
  fileOf,
  rankOf,
  squareAt,
  toFen,
  type Color,
  type Piece,
  type Position,
} from '@qilian/xiangqi';

export type CustomEndgameValidation =
  | { ok: true; position: Position; fen: string }
  | { ok: false; error: string };

/** 空白棋盘 + 双方将帅（红帅 e1、黑将 d10），错开一列避免将帅照面。 */
export function createKingsOnlyBoard(): (Piece | null)[] {
  const board: (Piece | null)[] = Array.from({ length: BOARD_SIZE }, () => null);
  board[squareAt(4, 0)] = { color: 'r', type: 'K' };
  board[squareAt(3, 9)] = { color: 'b', type: 'K' };
  return board;
}

/** 归零着法时钟，避免导入的 FEN 因技术性限着立即和棋。 */
export function normalizePosition(position: Position): Position {
  return { ...position, halfmoveClock: 0, fullmove: 1 };
}

export function formatCustomFen(position: Position): string {
  return toFen(normalizePosition(position));
}

export function validatePosition(position: Position): CustomEndgameValidation {
  const normalized = normalizePosition(position);
  const redKing = getKingSquare(normalized.board, 'r');
  const blackKing = getKingSquare(normalized.board, 'b');
  const redKings = normalized.board.filter((piece) => piece?.color === 'r' && piece.type === 'K').length;
  const blackKings = normalized.board.filter((piece) => piece?.color === 'b' && piece.type === 'K').length;

  if (redKing === null || blackKing === null) {
    return { ok: false, error: '棋盘上必须同时有红方和黑方的将帅' };
  }
  if (redKings !== 1 || blackKings !== 1) {
    return { ok: false, error: '每方只能有一个将帅' };
  }
  if (
    !isPalaceSquare('r', fileOf(redKing), rankOf(redKing)) ||
    !isPalaceSquare('b', fileOf(blackKing), rankOf(blackKing))
  ) {
    return { ok: false, error: '将帅必须待在各自的九宫内' };
  }
  if (isInCheck(normalized, opposite(normalized.turn))) {
    return { ok: false, error: '轮到走棋的一方不能处于被将军的状态' };
  }

  const outcome = evaluateBoard(normalized, { positionHashes: [hashPosition(normalized)] });
  if (outcome.status === 'draw' && outcome.reason === 'bare-kings') {
    return { ok: false, error: '至少要有一枚将帅以外的棋子' };
  }
  if (outcome.status !== 'playing') {
    return { ok: false, error: '这个局面已经分出胜负，换一个摆法' };
  }

  return { ok: true, position: normalized, fen: toFen(normalized) };
}

export function parseCustomFen(fen: string): CustomEndgameValidation {
  let position: Position;
  try {
    position = parseFen(fen);
  } catch {
    return { ok: false, error: 'FEN 格式不正确，请检查将帅位置、行棋方和行数' };
  }
  return validatePosition(position);
}

export function endgameTurnLabel(fen: string): string {
  try {
    return parseFen(fen).turn === 'r' ? '红先' : '黑先';
  } catch {
    return '局面无效';
  }
}

export function endgameTurn(fen: string): Color | null {
  try {
    return parseFen(fen).turn;
  } catch {
    return null;
  }
}
