import {
  JUNGLE_COLS,
  JUNGLE_DENS,
  JUNGLE_GLYPHS,
  JUNGLE_ROWS,
  JUNGLE_TRAPS,
  JUNGLE_WATER,
  jungleCoords,
  type JungleState,
} from '../games/jungle';

interface JungleBoardProps {
  state: JungleState;
  selected?: number | null;
  targets?: number[];
  lastMove?: { from: number; to: number } | null;
  disabled?: boolean;
  onPoint?: (square: number) => void;
}

export function JungleBoard({
  state,
  selected = null,
  targets = [],
  lastMove = null,
  disabled = false,
  onPoint,
}: JungleBoardProps) {
  return (
    <div className="jungle-board" role="grid" aria-label="斗兽棋棋盘">
      {Array.from({ length: JUNGLE_ROWS * JUNGLE_COLS }, (_, index) => {
        const piece = state.board[index];
        const [row, col] = jungleCoords(index);
        const water = JUNGLE_WATER.has(index);
        const den = index === JUNGLE_DENS.r || index === JUNGLE_DENS.b;
        const trap = JUNGLE_TRAPS.r.has(index) || JUNGLE_TRAPS.b.has(index);
        const owner = JUNGLE_DENS.r === index || JUNGLE_TRAPS.r.has(index) ? 'r' : 'b';
        const terrain = water ? '水' : den ? '穴' : trap ? '陷' : '';
        const isTarget = targets.includes(index);
        const isSelected = selected === index;
        const isLast = lastMove?.to === index;

        return (
          <button
            type="button"
            key={index}
            data-jungle-square={index}
            className={[
              'jungle-cell',
              water ? 'is-water' : '',
              den ? 'is-den' : '',
              trap ? 'is-trap' : '',
              den || trap ? `terrain-${owner}` : '',
              isSelected ? 'is-selected' : '',
              isTarget ? 'is-target' : '',
              isLast ? 'is-last' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            disabled={disabled}
            onClick={() => onPoint?.(index)}
            aria-label={`${col + 1} 列第 ${row + 1} 行${terrain ? `，${terrain}` : ''}${
              piece ? `，${piece.color === 'r' ? '红' : '黑'}${JUNGLE_GLYPHS[piece.animal]}` : ''
            }`}
          >
            {terrain && !piece && <span className="jungle-terrain-label">{terrain}</span>}
            {piece && (
              <span className={`jungle-piece ${piece.color}`}>
                <span>{JUNGLE_GLYPHS[piece.animal]}</span>
              </span>
            )}
            {isTarget && <span className="jungle-target" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}
