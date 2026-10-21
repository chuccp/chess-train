import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  PIECE_GLYPHS,
  fileOf,
  rankOf,
  squareAt,
  type Color,
  type Piece,
  type Position,
} from '@qilian/xiangqi';

const PADDING = 50;
const CELL = 100;
const VIEW_WIDTH = 900;
const VIEW_HEIGHT = 1000;

interface MoveAnimation {
  from: number;
  to: number;
  piece: Piece;
  key: string;
}

export interface BoardUndoAnimation {
  from: number;
  to: number;
  piece: Piece;
  key: string;
}

interface BoardProps {
  position: Position;
  orientation?: Color;
  selected?: number | null;
  legalTargets?: number[];
  lastMove?: { from: number; to: number } | null;
  undoAnimation?: BoardUndoAnimation | null;
  hint?: { from: number; to: number } | null;
  checkedSquare?: number | null;
  checkmate?: boolean;
  interactive?: boolean;
  preview?: boolean;
  onPoint?: (square: number) => void;
}

function displayPoint(square: number, orientation: Color): { x: number; y: number; row: number; col: number } {
  const file = fileOf(square);
  const rank = rankOf(square);
  const flipped = orientation === 'b';
  const col = flipped ? 8 - file : file;
  const row = flipped ? rank : 9 - rank;
  return { x: PADDING + col * CELL, y: PADDING + row * CELL, row, col };
}

function squareName(square: number): string {
  const file = fileOf(square);
  const rank = rankOf(square);
  return `${'abcdefghi'[file]} 列第 ${rank} 线`;
}

export function Board({
  position,
  orientation = 'r',
  selected = null,
  legalTargets = [],
  lastMove = null,
  undoAnimation = null,
  hint = null,
  checkedSquare = null,
  checkmate = false,
  interactive = true,
  preview = false,
  onPoint,
}: BoardProps) {
  const [focusedSquare, setFocusedSquare] = useState<number>(() => {
    const kingSquare = position.board.findIndex((piece) => piece?.color === position.turn && piece.type === 'K');
    return kingSquare >= 0 ? kingSquare : 0;
  });
  const buttonRefs = useRef(new Map<number, HTMLButtonElement>());
  const [moveAnimation, setMoveAnimation] = useState<MoveAnimation | null>(null);
  const [rollbackAnimation, setRollbackAnimation] = useState<BoardUndoAnimation | null>(null);
  const previousBoardRef = useRef(position.board);
  const mountedRef = useRef(false);
  const animationKeyRef = useRef<string | null>(null);
  const ghostRef = useRef<SVGGElement | null>(null);
  const undoGhostRef = useRef<SVGGElement | null>(null);

  useLayoutEffect(() => {
    if (preview) {
      previousBoardRef.current = position.board;
      mountedRef.current = true;
      return;
    }

    if (undoAnimation) {
      previousBoardRef.current = position.board;
      animationKeyRef.current = lastMove ? `${lastMove.from}-${lastMove.to}` : null;
      setMoveAnimation(null);
      return;
    }

    const previousBoard = previousBoardRef.current;
    previousBoardRef.current = position.board;

    if (!mountedRef.current) {
      mountedRef.current = true;
      animationKeyRef.current = lastMove ? `${lastMove.from}-${lastMove.to}` : null;
      return;
    }

    if (!lastMove) {
      animationKeyRef.current = null;
      setMoveAnimation(null);
      return;
    }

    const key = `${lastMove.from}-${lastMove.to}`;
    if (animationKeyRef.current === key) return;
    animationKeyRef.current = key;

    const piece = position.board[lastMove.to];
    const previousPiece = previousBoard[lastMove.from];
    if (!piece || !previousPiece || previousPiece.color !== piece.color || previousPiece.type !== piece.type) {
      setMoveAnimation(null);
      return;
    }

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setMoveAnimation(null);
      return;
    }

    setMoveAnimation({ from: lastMove.from, to: lastMove.to, piece, key });
    const timer = window.setTimeout(() => {
      setMoveAnimation((current) => (current?.key === key ? null : current));
    }, 230);

    return () => {
      window.clearTimeout(timer);
    };
  }, [lastMove?.from, lastMove?.to, position.board, preview, undoAnimation]);

  useLayoutEffect(() => {
    if (!undoAnimation || preview) {
      setRollbackAnimation(null);
      return;
    }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setRollbackAnimation(null);
      return;
    }
    setRollbackAnimation(undoAnimation);
    const timer = window.setTimeout(() => {
      setRollbackAnimation((current) => (current?.key === undoAnimation.key ? null : current));
    }, 260);
    return () => window.clearTimeout(timer);
  }, [undoAnimation, preview]);

  useEffect(() => {
    if (!rollbackAnimation) return;
    const from = displayPoint(rollbackAnimation.to, orientation);
    const to = displayPoint(rollbackAnimation.from, orientation);
    const started = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - started) / 230);
      const eased = 1 - (1 - t) ** 3;
      const x = from.x + (to.x - from.x) * eased;
      const y = from.y + (to.y - from.y) * eased;
      undoGhostRef.current?.setAttribute('transform', `translate(${x} ${y})`);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [rollbackAnimation, orientation]);

  useEffect(() => {
    if (!moveAnimation) return;
    const from = displayPoint(moveAnimation.from, orientation);
    const to = displayPoint(moveAnimation.to, orientation);
    const started = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const t = Math.min(1, (now - started) / 200);
      const eased = 1 - (1 - t) ** 3;
      const x = from.x + (to.x - from.x) * eased;
      const y = from.y + (to.y - from.y) * eased;
      ghostRef.current?.setAttribute('transform', `translate(${x} ${y})`);
      if (t < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [moveAnimation, orientation]);

  const points = Array.from({ length: 90 }, (_, square) => {
    const point = displayPoint(square, orientation);
    const piece = position.board[square];
    return { square, ...point, piece };
  });

  const filePositions = Array.from({ length: 9 }, (_, file) => PADDING + file * CELL);
  const rankPositions = Array.from({ length: 10 }, (_, rank) => rankPositionsForOrientation(rank, orientation));

  function rankPositionsForOrientation(rank: number, orient: Color): number {
    const row = orient === 'b' ? rank : 9 - rank;
    return PADDING + row * CELL;
  }

  function moveFocus(square: number, df: number, dr: number): void {
    const file = fileOf(square);
    const rank = rankOf(square);
    const flipped = orientation === 'b';
    const displayDf = flipped ? -df : df;
    const displayDr = flipped ? -dr : dr;
    const nextFile = file + displayDf;
    // rank movement is screen-down in display terms; translate it to board rank
    const nextRank = rank + (flipped ? displayDr : -displayDr);
    if (nextFile < 0 || nextFile > 8 || nextRank < 0 || nextRank > 9) return;
    const nextSquare = squareAt(nextFile, nextRank);
    setFocusedSquare(nextSquare);
    requestAnimationFrame(() => buttonRefs.current.get(nextSquare)?.focus());
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, square: number): void {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      if (event.key === 'ArrowUp') moveFocus(square, 0, -1);
      if (event.key === 'ArrowDown') moveFocus(square, 0, 1);
      if (event.key === 'ArrowLeft') moveFocus(square, -1, 0);
      if (event.key === 'ArrowRight') moveFocus(square, 1, 0);
      return;
    }
  }

  const legalSet = new Set(legalTargets);

  return (
    <div className={`board-shell${preview ? ' board-preview' : ''}${checkmate ? ' board-checkmate' : ''}`} role="group" aria-label={preview ? '中国象棋棋盘预览' : '中国象棋棋盘'}>
      <svg
        className="board-svg"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        role="img"
        aria-label={`棋盘，轮到${position.turn === 'r' ? '红方' : '黑方'}走棋`}
      >
        <defs>
          <marker id="hint-arrow" markerWidth="16" markerHeight="16" refX="10" refY="6" orient="auto">
            <path d="M 0 0 L 12 6 L 0 12 z" fill="var(--gold)" />
          </marker>
          <filter id="piece-shadow" x="-30%" y="-30%" width="160%" height="180%">
            <feDropShadow dx="0" dy="5" stdDeviation="3" floodColor="#3f2a1a" floodOpacity="0.24" />
          </filter>
          <pattern id="wood-grain" width="70" height="70" patternUnits="userSpaceOnUse">
            <path d="M 0 34 Q 20 22 38 34 T 70 34" stroke="rgba(125, 82, 44, 0.09)" fill="none" strokeWidth="1.2" />
            <path d="M 10 18 Q 28 8 50 18 T 82 18" stroke="rgba(125, 82, 44, 0.07)" fill="none" strokeWidth="1" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="900" height="1000" rx="22" fill="var(--board)" />
        <rect x="0" y="0" width="900" height="1000" rx="22" fill="url(#wood-grain)" />
        <rect x="25" y="25" width="850" height="950" rx="8" fill="none" stroke="rgba(118, 76, 41, 0.55)" strokeWidth="3" />
        <rect x="35" y="35" width="830" height="930" rx="4" fill="none" stroke="rgba(118, 76, 41, 0.28)" strokeWidth="1.5" />

        {rankPositions.map((y, index) => (
          <line key={`h-${index}`} x1={PADDING} y1={y} x2={VIEW_WIDTH - PADDING} y2={y} className="board-grid-line" />
        ))}
        {filePositions.map((x, index) => (
          <g key={`v-${index}`}>
            <line x1={x} y1={PADDING} x2={x} y2={PADDING + CELL * 4} className="board-grid-line" />
            <line x1={x} y1={PADDING + CELL * 5} x2={x} y2={VIEW_HEIGHT - PADDING} className="board-grid-line" />
          </g>
        ))}

        <line
          x1={displayPoint(squareAt(3, 0), orientation).x}
          y1={displayPoint(squareAt(3, 0), orientation).y}
          x2={displayPoint(squareAt(5, 2), orientation).x}
          y2={displayPoint(squareAt(5, 2), orientation).y}
          className="palace-line"
        />
        <line
          x1={displayPoint(squareAt(5, 0), orientation).x}
          y1={displayPoint(squareAt(5, 0), orientation).y}
          x2={displayPoint(squareAt(3, 2), orientation).x}
          y2={displayPoint(squareAt(3, 2), orientation).y}
          className="palace-line"
        />
        <line
          x1={displayPoint(squareAt(3, 7), orientation).x}
          y1={displayPoint(squareAt(3, 7), orientation).y}
          x2={displayPoint(squareAt(5, 9), orientation).x}
          y2={displayPoint(squareAt(5, 9), orientation).y}
          className="palace-line"
        />
        <line
          x1={displayPoint(squareAt(5, 7), orientation).x}
          y1={displayPoint(squareAt(5, 7), orientation).y}
          x2={displayPoint(squareAt(3, 9), orientation).x}
          y2={displayPoint(squareAt(3, 9), orientation).y}
          className="palace-line"
        />

        <text x="265" y="513" textAnchor="middle" className="river-text">
          楚 河
        </text>
        <text x="635" y="513" textAnchor="middle" className="river-text">
          汉 界
        </text>

        {lastMove && (
          <g key={`last-${lastMove.from}-${lastMove.to}`} className="last-move-marks">
            <circle cx={displayPoint(lastMove.from, orientation).x} cy={displayPoint(lastMove.from, orientation).y} r="15" />
            <circle cx={displayPoint(lastMove.to, orientation).x} cy={displayPoint(lastMove.to, orientation).y} r="43" />
          </g>
        )}

        {legalSet.size > 0 &&
          legalTargets.map((square) => {
            const point = displayPoint(square, orientation);
            const targetPiece = position.board[square];
            return targetPiece ? (
              <circle key={`target-${square}`} cx={point.x} cy={point.y} r="44" className="legal-capture-mark" />
            ) : (
              <circle key={`target-${square}`} cx={point.x} cy={point.y} r="10" className="legal-dot" />
            );
          })}

        {hint && (
          <g key={`hint-${hint.from}-${hint.to}`} className="hint-layer">
            <line
              x1={displayPoint(hint.from, orientation).x}
              y1={displayPoint(hint.from, orientation).y}
              x2={displayPoint(hint.to, orientation).x}
              y2={displayPoint(hint.to, orientation).y}
              markerEnd="url(#hint-arrow)"
              className="hint-arrow"
            />
          </g>
        )}

        {points.map(({ square, x, y, piece }) => {
          if (!piece) return null;
          if ((moveAnimation && square === moveAnimation.to) || (rollbackAnimation && square === rollbackAnimation.from)) return null;
          const isSelected = selected === square;
          const isChecked = checkedSquare === square;
          const isHintTarget = hint?.to === square;
          return (
            <g
              key={`piece-${square}-${piece.color}-${piece.type}`}
              className={[
                'piece',
                piece.color === 'r' ? 'piece-red' : 'piece-black',
                isSelected ? 'piece-selected' : '',
                isChecked ? 'piece-checked' : '',
                isHintTarget ? 'piece-hint' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              transform={`translate(${x} ${y})`}
              filter="url(#piece-shadow)"
            >
              <circle r="43" className="piece-disc" />
              <circle r="36" className="piece-ring" />
              <text className="piece-glyph" textAnchor="middle" dominantBaseline="central">
                {PIECE_GLYPHS[piece.color][piece.type]}
              </text>
            </g>
          );
        })}
        {checkmate && checkedSquare !== null && (() => {
          const point = displayPoint(checkedSquare, orientation);
          return (
            <g className="checkmate-burst" transform={`translate(${point.x} ${point.y})`} aria-hidden="true">
              <circle r="46" className="mate-ring mate-ring-a" />
              <circle r="46" className="mate-ring mate-ring-b" />
              <circle r="30" className="mate-flash" />
              <g className="mate-rays">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <line key={angle} x1="58" y1="0" x2="88" y2="0" transform={`rotate(${angle})`} />
                ))}
              </g>
            </g>
          );
        })()}

        {moveAnimation && (() => {
          const from = displayPoint(moveAnimation.from, orientation);
          const to = displayPoint(moveAnimation.to, orientation);
          return (
            <g
              key={`ghost-${moveAnimation.key}`}
              className={`piece piece-ghost ${moveAnimation.piece.color === 'r' ? 'piece-red' : 'piece-black'}`}
              aria-hidden="true"
              filter="url(#piece-shadow)"
              ref={ghostRef}
              transform={`translate(${from.x} ${from.y})`}
            >
              <circle r="43" className="piece-disc" />
              <circle r="36" className="piece-ring" />
              <text className="piece-glyph" textAnchor="middle" dominantBaseline="central">
                {PIECE_GLYPHS[moveAnimation.piece.color][moveAnimation.piece.type]}
              </text>
            </g>
          );
        })()}
        {rollbackAnimation && (() => {
          const from = displayPoint(rollbackAnimation.to, orientation);
          return (
            <g
              key={`undo-ghost-${rollbackAnimation.key}`}
              className={`piece piece-ghost piece-rollback ${rollbackAnimation.piece.color === 'r' ? 'piece-red' : 'piece-black'}`}
              aria-hidden="true"
              filter="url(#piece-shadow)"
              ref={undoGhostRef}
              transform={`translate(${from.x} ${from.y})`}
            >
              <circle r="43" className="piece-disc" />
              <circle r="36" className="piece-ring" />
              <text className="piece-glyph" textAnchor="middle" dominantBaseline="central">
                {PIECE_GLYPHS[rollbackAnimation.piece.color][rollbackAnimation.piece.type]}
              </text>
            </g>
          );
        })()}
      </svg>



      {!preview && <div className="board-hit-layer">
        {points.map(({ square, x, y, row, col, piece }) => {
          const label = `${piece ? `${piece.color === 'r' ? '红方' : '黑方'}${PIECE_GLYPHS[piece.color][piece.type]}` : '空位'}，${squareName(square)}`;
          return (
            <button
              key={square}
              ref={(element) => {
                if (element) buttonRefs.current.set(square, element);
                else buttonRefs.current.delete(square);
              }}
              type="button"
              className="board-hit"
              style={{
                left: `${(x / VIEW_WIDTH) * 100}%`,
                top: `${(y / VIEW_HEIGHT) * 100}%`,
                width: `${(CELL / VIEW_WIDTH) * 100}%`,
                height: `${(CELL / VIEW_HEIGHT) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
              tabIndex={focusedSquare === square ? 0 : -1}
              aria-label={`${label}${selected === square ? '，已选中' : ''}${legalSet.has(square) ? '，可落子' : ''}`}
              aria-pressed={selected === square}
              data-square={square}
              data-row={row}
              data-col={col}
              onFocus={() => setFocusedSquare(square)}
              onKeyDown={(event) => handleKeyDown(event, square)}
              onClick={() => {
                if (interactive) onPoint?.(square);
              }}
            >
              <span className="sr-only">{label}</span>
            </button>
          );
        })}
      </div>}

      {checkmate && (
        <div className="checkmate-stamp" aria-hidden="true">
          <span>绝杀</span>
          <em>将死</em>
        </div>
      )}
    </div>
  );
}
