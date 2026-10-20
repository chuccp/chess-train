export type CheckersColor = 'r' | 'b';

export interface CheckersHole {
  id: number;
  row: number;
  x2: number;
}

export type CheckersBoard = (CheckersColor | null)[];

export type CheckersStatus =
  | { status: 'playing' }
  | { status: 'win'; winner: CheckersColor; reason: 'all-home' | 'blocked' | 'resign' };

export interface CheckersState {
  board: CheckersBoard;
  turn: CheckersColor;
  status: CheckersStatus;
}

export interface CheckersMove {
  from: number;
  to: number;
}

const ROW_COUNTS = [1, 2, 3, 4, 13, 12, 11, 10, 9, 10, 11, 12, 13, 4, 3, 2, 1] as const;

export const CHECKERS_HOLES: CheckersHole[] = [];
const holeByCoord = new Map<string, number>();

for (let row = 0; row < ROW_COUNTS.length; row += 1) {
  const count = ROW_COUNTS[row] ?? 0;
  for (let i = 0; i < count; i += 1) {
    const x2 = i * 2 - (count - 1);
    const id = CHECKERS_HOLES.length;
    CHECKERS_HOLES.push({ id, row, x2 });
    holeByCoord.set(`${row}:${x2}`, id);
  }
}

const DIRECTIONS: ReadonlyArray<[number, number]> = [
  [0, 2],
  [0, -2],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

function holeAt(row: number, x2: number): number | undefined {
  return holeByCoord.get(`${row}:${x2}`);
}

export const CHECKERS_NEIGHBORS: number[][] = CHECKERS_HOLES.map((hole) =>
  DIRECTIONS.map(([dr, dx]) => holeAt(hole.row + dr, hole.x2 + dx)).filter(
    (id): id is number => id !== undefined,
  ),
);

export const CHECKERS_HOME: Record<CheckersColor, ReadonlySet<number>> = {
  b: new Set(CHECKERS_HOLES.filter((hole) => hole.row <= 3).map((hole) => hole.id)),
  r: new Set(CHECKERS_HOLES.filter((hole) => hole.row >= 13).map((hole) => hole.id)),
};

export const CHECKERS_GOAL: Record<CheckersColor, ReadonlySet<number>> = {
  r: CHECKERS_HOME.b,
  b: CHECKERS_HOME.r,
};

export function oppositeCheckersColor(color: CheckersColor): CheckersColor {
  return color === 'r' ? 'b' : 'r';
}

export function createCheckersInitial(): CheckersState {
  const board: CheckersBoard = Array(CHECKERS_HOLES.length).fill(null);
  for (const hole of CHECKERS_HOME.r) board[hole] = 'r';
  for (const hole of CHECKERS_HOME.b) board[hole] = 'b';
  return { board, turn: 'r', status: { status: 'playing' } };
}

function isFree(board: CheckersBoard, hole: number): boolean {
  return board[hole] === null;
}

export function checkersDestinations(state: CheckersState, from: number): number[] {
  const color = state.board[from];
  if (!color || color !== state.turn || state.status.status !== 'playing') return [];

  const destinations = new Set<number>();
  for (const neighbor of CHECKERS_NEIGHBORS[from] ?? []) {
    if (isFree(state.board, neighbor)) destinations.add(neighbor);
  }

  const visited = new Set<number>([from]);
  const queue = [from];
  while (queue.length > 0) {
    const current = queue.shift();
    if (current === undefined) break;
    const hole = CHECKERS_HOLES[current]!;
    for (const [dr, dx] of DIRECTIONS) {
      const middle = holeAt(hole.row + dr, hole.x2 + dx);
      const landing = holeAt(hole.row + dr * 2, hole.x2 + dx * 2);
      if (middle === undefined || landing === undefined) continue;
      if (state.board[middle] === null || !isFree(state.board, landing)) continue;
      if (visited.has(landing)) continue;
      visited.add(landing);
      destinations.add(landing);
      queue.push(landing);
    }
  }

  return [...destinations];
}

export function generateCheckersMoves(state: CheckersState): CheckersMove[] {
  if (state.status.status !== 'playing') return [];
  const moves: CheckersMove[] = [];
  for (let from = 0; from < state.board.length; from += 1) {
    if (state.board[from] !== state.turn) continue;
    for (const to of checkersDestinations(state, from)) {
      moves.push({ from, to });
    }
  }
  return moves;
}

function hasWon(board: CheckersBoard, color: CheckersColor): boolean {
  let pieces = 0;
  for (const hole of CHECKERS_GOAL[color]) {
    if (board[hole] === color) pieces += 1;
  }
  return pieces === CHECKERS_HOME.r.size;
}

export function applyCheckersMove(state: CheckersState, move: CheckersMove): CheckersState {
  if (!checkersDestinations(state, move.from).includes(move.to)) return state;
  const board = state.board.slice();
  const color = board[move.from];
  if (!color) return state;
  board[move.from] = null;
  board[move.to] = color;

  if (hasWon(board, color)) {
    return { board, turn: oppositeCheckersColor(state.turn), status: { status: 'win', winner: color, reason: 'all-home' } };
  }

  const next: CheckersState = {
    board,
    turn: oppositeCheckersColor(state.turn),
    status: { status: 'playing' },
  };
  if (generateCheckersMoves(next).length === 0) {
    next.status = { status: 'win', winner: color, reason: 'blocked' };
  }
  return next;
}

export function checkersHoleLabel(hole: CheckersHole): string {
  return `${hole.row + 1} 行 ${hole.x2 >= 0 ? '+' : ''}${hole.x2}`;
}
