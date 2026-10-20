import { GOMOKU_SIZE, type GomokuState } from '../games/gomoku';

interface GomokuBoardProps {
  state: GomokuState;
  winningLine?: number[];
  lastMove?: number | null;
  disabled?: boolean;
  onPoint?: (index: number) => void;
}

export function GomokuBoard({
  state,
  winningLine = [],
  lastMove = null,
  disabled = false,
  onPoint,
}: GomokuBoardProps) {
  return (
    <div className="gomoku-board" role="grid" aria-label="五子棋棋盘">
      {state.board.map((stone, index) => {
        const row = Math.floor(index / GOMOKU_SIZE);
        const col = index % GOMOKU_SIZE;
        return (
          <button
            type="button"
            key={index}
            data-gomoku-square={index}
            className={[
              'gomoku-cell',
              index === lastMove ? 'is-last' : '',
              winningLine.includes(index) ? 'is-win' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            disabled={disabled}
            onClick={() => onPoint?.(index)}
            aria-label={`第 ${row + 1} 行第 ${col + 1} 列${stone ? `，${stone === 'b' ? '黑' : '白'}子` : ''}`}
          >
            {stone && <span className={`gomoku-stone ${stone}`} />}
          </button>
        );
      })}
    </div>
  );
}
