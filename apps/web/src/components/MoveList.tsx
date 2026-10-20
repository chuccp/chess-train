import { useEffect, useRef } from 'react';
import type { MoveRecord } from '../types';
import { PIECE_GLYPHS } from '@qilian/xiangqi';

interface MoveListProps {
  moves: MoveRecord[];
  activePly?: number | null;
  onSelect?: (ply: number) => void;
  emptyText?: string;
}

export function MoveList({ moves, activePly = null, onSelect, emptyText = '还没有落子' }: MoveListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [moves.length]);

  if (moves.length === 0) {
    return <p className="muted small">{emptyText}</p>;
  }

  const rows: Array<{ number: number; red?: MoveRecord; black?: MoveRecord }> = [];
  for (let index = 0; index < moves.length; index += 2) {
    rows.push({ number: index / 2 + 1, red: moves[index], black: moves[index + 1] });
  }

  return (
    <div className="move-list" ref={scrollRef} aria-label="棋谱着法">
      {rows.map((row) => (
        <div className="move-row" key={row.number}>
          <span className="move-number">{row.number}.</span>
          {[row.red, row.black].map((move, index) => {
            if (!move) return <span key={`empty-${index}`} className="move-empty" />;
            const glyph = PIECE_GLYPHS[move.color][move.pieceType as keyof typeof PIECE_GLYPHS.r] ?? '?';
            const isActive = activePly === move.ply;
            return (
              <button
                key={move.ply}
                type="button"
                className={`move-item${isActive ? ' is-active' : ''}${move.capturedType ? ' is-capture' : ''}`}
                onClick={() => onSelect?.(move.ply)}
                disabled={!onSelect}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className={`move-glyph ${move.color}`}>{glyph}</span>
                <span>{move.notation}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
