import type { ReactNode } from 'react';
import { formatDuration } from '../lib/format';

interface GameBoardToolbarProps {
  elapsedMs: number;
  children: ReactNode;
  actions?: ReactNode;
}

export function GameBoardToolbar({
  elapsedMs,
  children,
  actions,
}: GameBoardToolbarProps) {
  const elapsed = formatDuration(elapsedMs);

  return (
    <div className="board-toolbar game-board-toolbar">
      {children}
      <span className="play-meta board-time" aria-label={`用时 ${elapsed}`}>{elapsed}</span>
      <div className="board-toolbar-actions">{actions}</div>
    </div>
  );
}
