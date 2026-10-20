export type GomokuColor = 'b' | 'w';
export type GomokuCell = GomokuColor | null;
export type GomokuBoard = GomokuCell[];

export type GomokuStatus =
  | { status: 'playing' }
  | { status: 'win'; winner: GomokuColor; line: number[]; reason?: 'five' | 'resign' }
  | { status: 'draw' };

export interface GomokuState {
  board: GomokuBoard;
  turn: GomokuColor;
  status: GomokuStatus;
  lastMove: number | null;
}

export const GOMOKU_SIZE = 15;

export function createGomokuInitial(): GomokuState {
  return {
    board: Array(GOMOKU_SIZE * GOMOKU_SIZE).fill(null),
    turn: 'b',
    status: { status: 'playing' },
    lastMove: null,
  };
}

export function oppositeGomokuColor(color: GomokuColor): GomokuColor {
  return color === 'b' ? 'w' : 'b';
}

const DIRECTIONS: ReadonlyArray<[number, number]> = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1],
];

function findLine(board: GomokuBoard, index: number, color: GomokuColor): number[] | null {
  const row = Math.floor(index / GOMOKU_SIZE);
  const col = index % GOMOKU_SIZE;

  for (const [dr, dc] of DIRECTIONS) {
    const line = [index];
    for (const sign of [-1, 1]) {
      let r = row + dr * sign;
      let c = col + dc * sign;
      while (r >= 0 && r < GOMOKU_SIZE && c >= 0 && c < GOMOKU_SIZE) {
        const square = r * GOMOKU_SIZE + c;
        if (board[square] !== color) break;
        if (sign < 0) line.unshift(square);
        else line.push(square);
        r += dr * sign;
        c += dc * sign;
      }
    }
    if (line.length >= 5) return line.slice(0, 5);
  }
  return null;
}

export function placeGomokuStone(state: GomokuState, index: number): GomokuState {
  if (state.status.status !== 'playing') return state;
  if (index < 0 || index >= state.board.length || state.board[index]) return state;

  const board = state.board.slice();
  board[index] = state.turn;
  const line = findLine(board, index, state.turn);
  if (line) {
    return {
      board,
      turn: oppositeGomokuColor(state.turn),
      status: { status: 'win', winner: state.turn, line },
      lastMove: index,
    };
  }

  if (board.every(Boolean)) {
    return {
      board,
      turn: oppositeGomokuColor(state.turn),
      status: { status: 'draw' },
      lastMove: index,
    };
  }

  return {
    board,
    turn: oppositeGomokuColor(state.turn),
    status: { status: 'playing' },
    lastMove: index,
  };
}
