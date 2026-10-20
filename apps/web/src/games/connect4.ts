export type Connect4Color = 'r' | 'y';
export type Connect4Cell = Connect4Color | null;
export type Connect4Board = Connect4Cell[];

export type Connect4Status =
  | { status: 'playing' }
  | { status: 'win'; winner: Connect4Color; line: number[]; reason?: 'four' | 'resign' }
  | { status: 'draw' };

export interface Connect4State {
  board: Connect4Board;
  turn: Connect4Color;
  status: Connect4Status;
  lastMove: number | null;
}

export const CONNECT4_ROWS = 6;
export const CONNECT4_COLS = 7;

export function createConnect4Initial(): Connect4State {
  return {
    board: Array(CONNECT4_ROWS * CONNECT4_COLS).fill(null),
    turn: 'r',
    status: { status: 'playing' },
    lastMove: null,
  };
}

export function oppositeConnect4Color(color: Connect4Color): Connect4Color {
  return color === 'r' ? 'y' : 'r';
}

function cellAt(row: number, col: number): number {
  return row * CONNECT4_COLS + col;
}

const DIRECTIONS: ReadonlyArray<[number, number]> = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1],
];

function winningLine(board: Connect4Board, index: number, color: Connect4Color): number[] | null {
  const row = Math.floor(index / CONNECT4_COLS);
  const col = index % CONNECT4_COLS;
  for (const [dr, dc] of DIRECTIONS) {
    const line = [index];
    for (const sign of [-1, 1]) {
      let r = row + dr * sign;
      let c = col + dc * sign;
      while (r >= 0 && r < CONNECT4_ROWS && c >= 0 && c < CONNECT4_COLS) {
        const square = cellAt(r, c);
        if (board[square] !== color) break;
        if (sign < 0) line.unshift(square);
        else line.push(square);
        r += dr * sign;
        c += dc * sign;
      }
    }
    if (line.length >= 4) return line.slice(0, 4);
  }
  return null;
}

export function dropConnect4(state: Connect4State, col: number): Connect4State {
  if (state.status.status !== 'playing' || col < 0 || col >= CONNECT4_COLS) return state;
  let row = CONNECT4_ROWS - 1;
  while (row >= 0 && state.board[cellAt(row, col)]) row -= 1;
  if (row < 0) return state;

  const index = cellAt(row, col);
  const board = state.board.slice();
  board[index] = state.turn;
  const line = winningLine(board, index, state.turn);
  if (line) {
    return {
      board,
      turn: oppositeConnect4Color(state.turn),
      status: { status: 'win', winner: state.turn, line },
      lastMove: index,
    };
  }

  if (board.every(Boolean)) {
    return {
      board,
      turn: oppositeConnect4Color(state.turn),
      status: { status: 'draw' },
      lastMove: index,
    };
  }

  return {
    board,
    turn: oppositeConnect4Color(state.turn),
    status: { status: 'playing' },
    lastMove: index,
  };
}
