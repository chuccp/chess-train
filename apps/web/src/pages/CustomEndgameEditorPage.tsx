import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { ArrowLeft, Check, Copy, Crown, Save, X } from 'lucide-react';
import {
  PIECE_GLYPHS,
  fileOf,
  isPalaceSquare,
  rankOf,
  type Color,
  type Piece,
  type PieceType,
  type Position,
} from '@qilian/xiangqi';
import { Board } from '../components/Board';
import { Dialog } from '../components/Dialog';
import { copyText } from '../lib/clipboard';
import {
  createKingsOnlyBoard,
  formatCustomFen,
  parseCustomFen,
  validatePosition,
} from '../lib/customEndgame';
import { getCustomEndgame, saveCustomEndgame } from '../lib/storage';
import type { CustomEndgame } from '../types';

type Brush = { color: Color; type: PieceType };

const PIECE_TYPES: PieceType[] = ['K', 'A', 'B', 'N', 'R', 'C', 'P'];

const PIECE_LABELS: Record<Color, Record<PieceType, string>> = {
  r: { K: '帅', A: '仕', B: '相', N: '马', R: '车', C: '炮', P: '兵' },
  b: { K: '将', A: '士', B: '象', N: '马', R: '车', C: '炮', P: '卒' },
};

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `endgame-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
}

function emptyPosition(): Position {
  return { board: createKingsOnlyBoard(), turn: 'r', halfmoveClock: 0, fullmove: 1 };
}

export function CustomEndgameEditorPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');
  const importedFen = editId ? null : searchParams.get('fen');
  const imported = importedFen ? parseCustomFen(importedFen) : null;
  const [name, setName] = useState('');
  const [position, setPosition] = useState<Position>(() =>
    imported?.ok ? imported.position : emptyPosition(),
  );
  const [resetPosition, setResetPosition] = useState<Position>(() =>
    imported?.ok ? imported.position : emptyPosition(),
  );
  const [brush, setBrush] = useState<Brush | null>(null);
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [fenInput, setFenInput] = useState('');
  const [actionError, setActionError] = useState<string | null>(() =>
    imported && !imported.ok ? imported.error : null,
  );
  const [loading, setLoading] = useState(Boolean(editId));
  const [notFound, setNotFound] = useState(false);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const [dragGhost, setDragGhost] = useState<{ piece: Piece; x: number; y: number } | null>(null);
  const [dragOrigin, setDragOrigin] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!editId) return;
    let alive = true;
    void getCustomEndgame(editId).then((record) => {
      if (!alive) return;
      if (!record) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      const parsed = parseCustomFen(record.fen);
      if (parsed.ok) {
        setPosition(parsed.position);
        setResetPosition(parsed.position);
      } else {
        setActionError(parsed.error);
      }
      setName(record.name);
      setCreatedAt(record.createdAt);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [editId]);

  const validation = useMemo(() => validatePosition(position), [position]);
  const currentFen = useMemo(() => formatCustomFen(position), [position]);
  const displayPosition = useMemo(() => {
    if (dragOrigin === null) return position;
    const board = [...position.board];
    board[dragOrigin] = null;
    return { ...position, board };
  }, [position, dragOrigin]);
  const selectedPoint = useMemo(() => {
    if (selectedSquare === null) return null;
    return {
      left: `${((fileOf(selectedSquare) + 0.5) / 9) * 100}%`,
      top: `${((9 - rankOf(selectedSquare) + 0.5) / 10) * 100}%`,
    };
  }, [selectedSquare]);

  function placeAt(square: number, piece: Piece) {
    if (piece.type === 'K' && !isPalaceSquare(piece.color, fileOf(square), rankOf(square))) {
      setActionError('将帅只能放在各自的九宫内');
      return;
    }
    setPosition((current) => {
      const board = [...current.board];
      if (piece.type === 'K') {
        for (let index = 0; index < board.length; index += 1) {
          const existing = board[index];
          if (existing?.color === piece.color && existing.type === 'K') board[index] = null;
        }
      }
      board[square] = { color: piece.color, type: piece.type };
      return { ...current, board };
    });
    setActionError(null);
  }

  function eraseAt(square: number) {
    setPosition((current) => {
      if (!current.board[square]) return current;
      const board = [...current.board];
      board[square] = null;
      return { ...current, board };
    });
    setSelectedSquare((current) => (current === square ? null : current));
    setActionError(null);
  }

  function movePiece(from: number, to: number, piece: Piece) {
    if (piece.type === 'K' && !isPalaceSquare(piece.color, fileOf(to), rankOf(to))) {
      setActionError('将帅只能放在各自的九宫内');
      return;
    }
    setPosition((current) => {
      const source = current.board[from];
      if (source?.color !== piece.color || source.type !== piece.type) return current;
      const board = [...current.board];
      board[from] = null;
      board[to] = { color: piece.color, type: piece.type };
      return { ...current, board };
    });
    setActionError(null);
  }

  function handlePoint(square: number) {
    if (position.board[square]) {
      setSelectedSquare((current) => (current === square ? null : square));
      return;
    }
    setSelectedSquare(null);
    if (!brush) return;
    placeAt(square, brush);
  }

  function beginPointerDrag(
    event: ReactPointerEvent<HTMLElement>,
    piece: Piece,
    origin: number | null,
  ) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const startX = event.clientX;
    const startY = event.clientY;
    let active = false;
    setSelectedSquare(null);

    function onMove(moveEvent: PointerEvent) {
      if (!active && Math.hypot(moveEvent.clientX - startX, moveEvent.clientY - startY) > 6) {
        active = true;
        setDragOrigin(origin);
      }
      if (!active) return;
      moveEvent.preventDefault();
      setDragGhost({ piece, x: moveEvent.clientX, y: moveEvent.clientY });
    }

    function cleanup() {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onCancel);
      setDragGhost(null);
      setDragOrigin(null);
    }

    function onUp(upEvent: PointerEvent) {
      cleanup();
      if (!active) return;
      const hit = document
        .elementFromPoint(upEvent.clientX, upEvent.clientY)
        ?.closest<HTMLElement>('[data-square]');
      const target = Number(hit?.dataset.square);
      const overBoard = Boolean(hit) && Number.isInteger(target);

      if (origin === null) {
        if (overBoard) {
          placeAt(target, piece);
          setBrush({ color: piece.color, type: piece.type });
        }
        return;
      }

      if (!overBoard) {
        eraseAt(origin);
        return;
      }
      if (target !== origin) movePiece(origin, target, piece);
    }

    function onCancel() {
      cleanup();
    }

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
  }

  function handleBoardPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const hit = (event.target as Element).closest<HTMLElement>('[data-square]');
    const square = Number(hit?.dataset.square);
    if (!hit || !Number.isInteger(square)) return;
    const piece = position.board[square];
    if (!piece) return;
    beginPointerDrag(event, piece, square);
  }

  function importFen() {
    const result = parseCustomFen(fenInput);
    if (!result.ok) {
      setActionError(result.error);
      return;
    }
    setPosition(result.position);
    setFenInput('');
    setSelectedSquare(null);
    setActionError(null);
  }

  async function copyFen() {
    if (await copyText(currentFen)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }

  function openSave() {
    if (!validation.ok) {
      showToast(validation.error);
      return;
    }
    setNameDraft(name);
    setSaveOpen(true);
  }

  async function save() {
    if (!validation.ok) {
      setActionError(validation.error);
      setSaveOpen(false);
      return;
    }
    setSaving(true);
    const now = new Date().toISOString();
    const finalName = nameDraft.trim() || '未命名残局';
    const record: CustomEndgame = {
      id: editId ?? createId(),
      name: finalName,
      fen: validation.fen,
      createdAt: createdAt ?? now,
      updatedAt: now,
    };
    await saveCustomEndgame(record);
    setName(finalName);
    setSaving(false);
    setSaveOpen(false);
    navigate('/endgames');
  }

  if (loading) {
    return <div className="page loading-page">正在读取残局…</div>;
  }

  if (notFound) {
    return (
      <div className="page empty-state">
        <Crown size={34} aria-hidden="true" />
        <h1>没有找到这个残局</h1>
        <p>它可能已经被删除，或只保存在另一台设备上。</p>
        <Link to="/endgames" className="btn btn-dark">返回残局列表</Link>
      </div>
    );
  }

  const palette = (
    <div className="endgame-palette">
      {(['r', 'b'] as Color[]).map((color) => (
        <div className="endgame-palette-row" key={color}>
          {PIECE_TYPES.map((type) => {
            const selected = brush?.color === color && brush?.type === type;
            return (
              <button
                type="button"
                key={`${color}-${type}`}
                className={`endgame-piece-btn is-${color}${selected ? ' is-selected' : ''}`}
                aria-label={`${color === 'r' ? '红方' : '黑方'}${PIECE_LABELS[color][type]}`}
                aria-pressed={selected}
                onPointerDown={(event) => beginPointerDrag(event, { color, type }, null)}
                onClick={() => {
                  setBrush({ color, type });
                  setSelectedSquare(null);
                  setActionError(null);
                }}
              >
                {PIECE_GLYPHS[color][type]}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <div className="page endgame-editor-page">
      <div className="play-topline">
        <Link to="/endgames" className="back-link">
          <ArrowLeft size={15} aria-hidden="true" />
          自定义残局
        </Link>
      </div>

      <div className="page-heading endgame-editor-heading">
        <div className="eyebrow">
          <Crown size={15} aria-hidden="true" />
          {editId ? '编辑残局' : '新建残局'}
        </div>
        <h1>摆一局残局</h1>
        <p>选好棋子后点棋盘落子，或直接拖到棋盘上；单击棋子可移除，拖出棋盘也会删除。</p>
      </div>

      <div className="endgame-editor-layout">
        <section className="endgame-editor-board">
          <div className="endgame-palette-mobile">
            {palette}
            <button
              type="button"
              className="btn btn-ghost btn-small endgame-copy-mobile"
              aria-label="复制棋盘"
              onClick={() => void copyFen()}
            >
              {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              <span className="endgame-copy-label">{copied ? '已复制' : '复制棋盘'}</span>
            </button>
          </div>
          <div className="endgame-board-toolbar">
            <button
              type="button"
              className="btn btn-ghost btn-small"
              onClick={() => void copyFen()}
            >
              {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              {copied ? '已复制' : '复制棋盘'}
            </button>
          </div>
          <div className="board-frame" onPointerDown={handleBoardPointerDown}>
            <Board position={displayPosition} orientation="r" interactive onPoint={handlePoint} />
            {selectedPoint && (
              <button
                type="button"
                className="endgame-remove-piece"
                style={{ left: selectedPoint.left, top: selectedPoint.top }}
                aria-label="移除这枚棋子"
                onClick={() => {
                  if (selectedSquare !== null) eraseAt(selectedSquare);
                }}
              >
                <X size={12} aria-hidden="true" />
              </button>
            )}
          </div>
        </section>

        <aside className="panel endgame-editor-panel">
          <div className="field endgame-palette-desktop">
            <span className="field-label">棋子</span>
            {palette}
          </div>

          <div className="field">
            <span className="field-label">谁先走</span>
            <div className="segmented small">
              <button
                type="button"
                className={position.turn === 'r' ? 'is-selected' : ''}
                onClick={() => setPosition({ ...position, turn: 'r' })}
              >
                红先
              </button>
              <button
                type="button"
                className={position.turn === 'b' ? 'is-selected' : ''}
                onClick={() => setPosition({ ...position, turn: 'b' })}
              >
                黑先
              </button>
            </div>
          </div>

          <div className="field endgame-fen-import">
            <span className="field-label">导入 FEN</span>
            <textarea
              className="endgame-fen-input"
              rows={2}
              value={fenInput}
              placeholder="粘贴别人分享的 FEN，例如 4k4/9/... w - - 0 1"
              onChange={(event) => setFenInput(event.target.value)}
            />
            <button
              type="button"
              className="btn btn-ghost btn-small"
              disabled={!fenInput.trim()}
              onClick={importFen}
            >
              导入到棋盘
            </button>
          </div>

          {actionError && (
            <p className="form-error" role="alert">
              {actionError}
            </p>
          )}

          <div className="endgame-editor-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setPosition(resetPosition);
                setSelectedSquare(null);
                setActionError(null);
              }}
            >
              复位
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={saving}
              onClick={openSave}
            >
              <Save size={16} aria-hidden="true" />
              保存残局
            </button>
          </div>
        </aside>
      </div>

      <Dialog
        open={saveOpen}
        title={editId ? '保存残局' : '保存新残局'}
        onClose={() => setSaveOpen(false)}
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setSaveOpen(false)}>
              取消
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={saving}
              onClick={() => void save()}
            >
              {saving ? '保存中…' : '保存'}
            </button>
          </>
        }
      >
        <label className="field">
          <span className="field-label">残局名称</span>
          <input
            className="endgame-name-input"
            value={nameDraft}
            maxLength={40}
            placeholder="例如：单车擒王"
            autoFocus
            onChange={(event) => setNameDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                void save();
              }
            }}
          />
        </label>
        <p className="fine-print">名称只保存在本机，留空则为“未命名残局”。</p>
      </Dialog>

      {toast &&
        createPortal(
          <div className="endgame-toast" role="status" aria-live="polite">
            {toast}
          </div>,
          document.body,
        )}

      {dragGhost &&
        createPortal(
          <div
            className={`endgame-drag-ghost is-${dragGhost.piece.color}`}
            style={{ left: dragGhost.x, top: dragGhost.y }}
            aria-hidden="true"
          >
            {PIECE_GLYPHS[dragGhost.piece.color][dragGhost.piece.type]}
          </div>,
          document.body,
        )}
    </div>
  );
}
