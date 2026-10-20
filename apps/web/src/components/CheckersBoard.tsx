import {
  CHECKERS_HOLES,
  type CheckersState,
} from '../games/checkers';

interface CheckersBoardProps {
  state: CheckersState;
  selected?: number | null;
  targets?: number[];
  lastMove?: { from: number; to: number } | null;
  disabled?: boolean;
  onPoint?: (hole: number) => void;
}

export function CheckersBoard({
  state,
  selected = null,
  targets = [],
  lastMove = null,
  disabled = false,
  onPoint,
}: CheckersBoardProps) {
  return (
    <div className="checkers-board" role="grid" aria-label="中国跳棋棋盘">
      <span className="checkers-home-label top">黑方营</span>
      <span className="checkers-home-label bottom">红方营</span>
      {CHECKERS_HOLES.map((hole) => {
        const piece = state.board[hole.id];
        const isTarget = targets.includes(hole.id);
        const isSelected = selected === hole.id;
        const isLast = lastMove?.to === hole.id;
        const left = ((hole.x2 + 12) / 24) * 100;
        const top = ((hole.row + 0.5) / 17) * 100;
        return (
          <button
            type="button"
            key={hole.id}
            data-checkers-hole={hole.id}
            className={[
              'checkers-hole',
              hole.row <= 3 ? 'in-black-home' : '',
              hole.row >= 13 ? 'in-red-home' : '',
              isSelected ? 'is-selected' : '',
              isTarget ? 'is-target' : '',
              isLast ? 'is-last' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ left: `${left}%`, top: `${top}%` }}
            disabled={disabled}
            onClick={() => onPoint?.(hole.id)}
            aria-label={`第 ${hole.row + 1} 行，${hole.x2 >= 0 ? '+' : ''}${hole.x2}${
              piece ? `，${piece === 'r' ? '红方' : '黑方'}棋子` : ''
            }`}
          >
            {piece && <span className={`checkers-piece ${piece}`} />}
            {isTarget && <span className="checkers-target" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}
