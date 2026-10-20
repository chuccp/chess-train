import { CONNECT4_COLS, CONNECT4_ROWS, type Connect4State } from '../games/connect4';

interface Connect4BoardProps {
  state: Connect4State;
  winningLine?: number[];
  lastMove?: number | null;
  disabled?: boolean;
  onColumn?: (column: number) => void;
}

export function Connect4Board({
  state,
  winningLine = [],
  lastMove = null,
  disabled = false,
  onColumn,
}: Connect4BoardProps) {
  return (
    <div className="connect4-board" role="grid" aria-label="四子棋棋盘">
      {Array.from({ length: CONNECT4_ROWS * CONNECT4_COLS }, (_, index) => {
        const row = Math.floor(index / CONNECT4_COLS);
        const col = index % CONNECT4_COLS;
        const color = state.board[index];
        return (
          <button
            type="button"
            key={index}
            data-connect4-column={col}
            className={[
              'connect4-cell',
              index === lastMove ? 'is-last' : '',
              winningLine.includes(index) ? 'is-win' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            disabled={disabled}
            onClick={() => onColumn?.(col)}
            aria-label={`第 ${row + 1} 行第 ${col + 1} 列${color ? `，${color === 'r' ? '红' : '黄'}子` : ''}`}
          >
            {color && <span className={`connect4-disc ${color}`} />}
          </button>
        );
      })}
    </div>
  );
}
