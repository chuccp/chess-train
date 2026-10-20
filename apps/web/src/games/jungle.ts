export type JungleColor = 'r' | 'b';
export type JungleAnimal = 'E' | 'L' | 'T' | 'P' | 'W' | 'D' | 'C' | 'R';

export interface JunglePiece {
  color: JungleColor;
  animal: JungleAnimal;
}

export type JungleBoard = (JunglePiece | null)[];

export type JungleStatus =
  | { status: 'playing' }
  | { status: 'win'; winner: JungleColor; reason: 'den' | 'no-moves' | 'resign' };

export interface JungleState {
  board: JungleBoard;
  turn: JungleColor;
  status: JungleStatus;
}

export interface JungleMove {
  from: number;
  to: number;
  capture?: JunglePiece;
  jump?: boolean;
}

export const JUNGLE_ROWS = 9;
export const JUNGLE_COLS = 7;
export const JUNGLE_GLYPHS: Record<JungleAnimal, string> = {
  E: '象',
  L: '狮',
  T: '虎',
  P: '豹',
  W: '狼',
  D: '狗',
  C: '猫',
  R: '鼠',
};
export const JUNGLE_POWER: Record<JungleAnimal, number> = {
  E: 8,
  L: 7,
  T: 6,
  P: 5,
  W: 4,
  D: 3,
  C: 2,
  R: 1,
};

export const JUNGLE_DENS: Record<JungleColor, number> = {
  b: 3,
  r: 3 + 8 * JUNGLE_COLS,
};
export const JUNGLE_TRAPS: Record<JungleColor, ReadonlySet<number>> = {
  b: new Set([2, 4, 3 + JUNGLE_COLS]),
  r: new Set([2 + 8 * JUNGLE_COLS, 4 + 8 * JUNGLE_COLS, 3 + 7 * JUNGLE_COLS]),
};
export const JUNGLE_WATER: ReadonlySet<number> = new Set(
  [3, 4, 5].flatMap((row) => [1, 2, 4, 5].map((col) => row * JUNGLE_COLS + col)),
);

const DIRECTIONS: ReadonlyArray<[number, number]> = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export function jungleIndex(row: number, col: number): number {
  return row * JUNGLE_COLS + col;
}

export function jungleCoords(index: number): [number, number] {
  return [Math.floor(index / JUNGLE_COLS), index % JUNGLE_COLS];
}

export function oppositeJungleColor(color: JungleColor): JungleColor {
  return color === 'r' ? 'b' : 'r';
}

export function createJungleInitial(turn: JungleColor = 'r'): JungleState {
  const board: JungleBoard = Array(JUNGLE_ROWS * JUNGLE_COLS).fill(null);
  const place = (color: JungleColor, animal: JungleAnimal, row: number, col: number) => {
    board[jungleIndex(row, col)] = { color, animal };
  };

  // Standard starting position. Red is at the bottom and moves first.
  place('b', 'L', 0, 0);
  place('b', 'T', 0, 6);
  place('b', 'D', 1, 1);
  place('b', 'C', 1, 5);
  place('b', 'R', 2, 0);
  place('b', 'P', 2, 2);
  place('b', 'W', 2, 4);
  place('b', 'E', 2, 6);

  place('r', 'T', 8, 0);
  place('r', 'L', 8, 6);
  place('r', 'C', 7, 1);
  place('r', 'D', 7, 5);
  place('r', 'E', 6, 0);
  place('r', 'W', 6, 2);
  place('r', 'P', 6, 4);
  place('r', 'R', 6, 6);

  return { board, turn, status: { status: 'playing' } };
}

export function isJungleWater(index: number): boolean {
  return JUNGLE_WATER.has(index);
}

export function isJungleDen(index: number): boolean {
  return index === JUNGLE_DENS.r || index === JUNGLE_DENS.b;
}

export function isJungleTrap(index: number, owner: JungleColor): boolean {
  return JUNGLE_TRAPS[owner].has(index);
}

export function junglePower(piece: JunglePiece, index: number): number {
  const enemyTrap = isJungleTrap(index, oppositeJungleColor(piece.color));
  return enemyTrap ? 0 : JUNGLE_POWER[piece.animal];
}

function canEnter(piece: JunglePiece, to: number): boolean {
  if (to === JUNGLE_DENS[piece.color]) return false;
  if (isJungleWater(to) && piece.animal !== 'R') return false;
  return true;
}

function canCapture(attacker: JunglePiece, from: number, defender: JunglePiece, to: number): boolean {
  if (attacker.color === defender.color) return false;

  // The rat is safe from land animals while in the river.
  if (defender.animal === 'R' && isJungleWater(to) && attacker.animal !== 'R') return false;

  // The rat can kill the elephant, but only from land.
  if (attacker.animal === 'R' && defender.animal === 'E' && !isJungleWater(from)) return true;

  // The elephant cannot eat the rat.
  if (attacker.animal === 'E' && defender.animal === 'R') return false;

  return junglePower(attacker, from) >= junglePower(defender, to);
}

function jumpMoves(board: JungleBoard, from: number, piece: JunglePiece): JungleMove[] {
  if (piece.animal !== 'L' && piece.animal !== 'T') return [];
  const moves: JungleMove[] = [];
  const [row, col] = jungleCoords(from);

  for (const [dr, dc] of DIRECTIONS) {
    let r = row + dr;
    let c = col + dc;
    let crossedWater = false;
    let blocked = false;

    while (r >= 0 && r < JUNGLE_ROWS && c >= 0 && c < JUNGLE_COLS && isJungleWater(jungleIndex(r, c))) {
      crossedWater = true;
      const block = board[jungleIndex(r, c)];
      if (block?.animal === 'R') {
        blocked = true;
        break;
      }
      r += dr;
      c += dc;
    }

    if (!crossedWater || blocked) continue;
    if (r < 0 || r >= JUNGLE_ROWS || c < 0 || c >= JUNGLE_COLS) continue;

    const to = jungleIndex(r, c);
    if (!canEnter(piece, to)) continue;
    const target = board[to];
    if (!target) {
      moves.push({ from, to, jump: true });
    } else if (canCapture(piece, from, target, to)) {
      moves.push({ from, to, capture: target, jump: true });
    }
  }

  return moves;
}

export function generateJungleMoves(state: JungleState): JungleMove[] {
  if (state.status.status !== 'playing') return [];
  const moves: JungleMove[] = [];
  const seen = new Set<string>();

  for (let from = 0; from < state.board.length; from += 1) {
    const piece = state.board[from];
    if (!piece || piece.color !== state.turn) continue;
    const [row, col] = jungleCoords(from);

    for (const [dr, dc] of DIRECTIONS) {
      const r = row + dr;
      const c = col + dc;
      if (r < 0 || r >= JUNGLE_ROWS || c < 0 || c >= JUNGLE_COLS) continue;
      const to = jungleIndex(r, c);
      if (!canEnter(piece, to)) continue;
      const target = state.board[to];
      if (target && !canCapture(piece, from, target, to)) continue;
      const key = `${from}-${to}`;
      if (!seen.has(key)) {
        seen.add(key);
        moves.push({ from, to, capture: target ?? undefined });
      }
    }

    for (const move of jumpMoves(state.board, from, piece)) {
      const key = `${from}-${move.to}`;
      if (!seen.has(key)) {
        seen.add(key);
        moves.push(move);
      }
    }
  }

  return moves;
}

export function applyJungleMove(state: JungleState, move: JungleMove): JungleState {
  const legal = generateJungleMoves(state).find((candidate) => candidate.from === move.from && candidate.to === move.to);
  if (!legal) return state;

  const board = state.board.slice();
  const piece = board[move.from];
  if (!piece) return state;
  board[move.from] = null;
  board[move.to] = piece;

  const next: JungleState = {
    board,
    turn: oppositeJungleColor(state.turn),
    status: { status: 'playing' },
  };

  if (move.to === JUNGLE_DENS[oppositeJungleColor(piece.color)]) {
    next.status = { status: 'win', winner: piece.color, reason: 'den' };
    return next;
  }

  if (generateJungleMoves(next).length === 0) {
    next.status = { status: 'win', winner: piece.color, reason: 'no-moves' };
  }
  return next;
}

export function jungleMovesFor(state: JungleState, from: number): JungleMove[] {
  return generateJungleMoves(state).filter((move) => move.from === from);
}
