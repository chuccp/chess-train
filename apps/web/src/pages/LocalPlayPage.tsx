import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowLeftRight,
  Check,
  Flag,
  RotateCcw,
  ShieldCheck,
  Swords,
  Undo2,
  Users,
} from 'lucide-react';
import {
  PIECE_GLYPHS,
  START_FEN,
  applyMove,
  evaluateBoard,
  generateLegalMoves,
  getKingSquare,
  hashPosition,
  isInCheck,
  parseFen,
  toFen,
  type Color,
} from '@qilian/xiangqi';
import { Board } from '../components/Board';
import { Dialog } from '../components/Dialog';
import { MoveList } from '../components/MoveList';
import { formatDuration } from '../lib/format';
import { playCue, vibrate } from '../lib/feedback';
import { useSettingsStore } from '../stores/settings';
import type { GameResult, MoveRecord } from '../types';

type DialogAction = 'new' | 'resign' | null;

interface LocalGame {
  fen: string;
  moves: MoveRecord[];
  positionHashes: string[];
  result: GameResult;
  startedAt: string;
  endedAt?: string;
  orientation: Color;
}

const STORAGE_KEY = 'qilian.local-game.v1';

function freshGame(orientation: Color = 'r'): LocalGame {
  const position = parseFen(START_FEN);
  return {
    fen: START_FEN,
    moves: [],
    positionHashes: [hashPosition(position)],
    result: { status: 'playing' },
    startedAt: new Date().toISOString(),
    orientation,
  };
}

function loadGame(): LocalGame {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshGame();
    const saved = JSON.parse(raw) as LocalGame;
    parseFen(saved.fen);
    if (!Array.isArray(saved.moves) || !Array.isArray(saved.positionHashes)) return freshGame();
    return {
      ...freshGame(saved.orientation === 'b' ? 'b' : 'r'),
      ...saved,
      orientation: saved.orientation === 'b' ? 'b' : 'r',
    };
  } catch {
    return freshGame();
  }
}

function opposite(color: Color): Color {
  return color === 'r' ? 'b' : 'r';
}

function localResultLabel(result: GameResult): string {
  if (result.status === 'win') {
    const winner = result.winner === 'r' ? '红方' : '黑方';
    const reason =
      result.reason === 'checkmate' ? '将死' : result.reason === 'stalemate' ? '困毙' : '认输';
    return `${winner}胜 · ${reason}`;
  }
  if (result.status === 'draw') {
    const reason =
      result.reason === 'repetition'
        ? '三次重复'
        : result.reason === 'no-capture'
          ? '自然限着'
          : '双方无子可胜';
    return `和棋 · ${reason}`;
  }
  return '对局结束';
}

export function LocalPlayPage() {
  const [game, setGame] = useState<LocalGame>(() => loadGame());
  const [selected, setSelected] = useState<number | null>(null);
  const [targets, setTargets] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [captureNotice, setCaptureNotice] = useState<string | null>(null);
  const settings = useSettingsStore();
  const [dialog, setDialog] = useState<DialogAction>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!captureNotice) return;
    const timer = window.setTimeout(() => setCaptureNotice(null), 1800);
    return () => window.clearTimeout(timer);
  }, [captureNotice]);

  const position = useMemo(() => parseFen(game.fen), [game.fen]);
  const finished = game.result.status !== 'playing';
  const checked = useMemo(() => {
    if (!isInCheck(position, position.turn)) return null;
    return getKingSquare(position.board, position.turn);
  }, [position]);
  const lastMove = game.moves.length > 0 ? game.moves[game.moves.length - 1] : null;
  const elapsed = new Date(game.endedAt ?? now).getTime() - new Date(game.startedAt).getTime();
  const turnName = position.turn === 'r' ? '红方' : '黑方';
  const undoPlies = settings.undoSteps === 10 ? game.moves.length : settings.undoSteps;
  const canUndo =
    settings.allowUndo &&
    !finished &&
    game.moves.length > 0 &&
    game.moves.length >= undoPlies &&
    (!checked || settings.allowUndoWhenChecked);
  const finishedWinner =
    game.result.status === 'win' ? game.result.winner : null;

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
    } catch {
      // Private browsing or blocked storage should not break the board.
    }
  }, [game]);

  useEffect(() => {
    if (finished) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [finished]);

  function clearSelection() {
    setSelected(null);
    setTargets([]);
  }

  function selectPiece(square: number) {
    const piece = position.board[square];
    if (!piece || piece.color !== position.turn) {
      clearSelection();
      return;
    }
    const legal = generateLegalMoves(position).filter((move) => move.from === square);
    setSelected(square);
    setTargets(legal.map((move) => move.to));
    setMessage(null);
  }

  function handlePoint(square: number) {
    if (finished) return;
    const piece = position.board[square];

    if (selected === null) {
      selectPiece(square);
      return;
    }

    if (square === selected) {
      clearSelection();
      return;
    }

    if (piece?.color === position.turn) {
      selectPiece(square);
      return;
    }

    if (!targets.includes(square)) {
      clearSelection();
      setMessage('这枚棋子不能走到那里。');
      return;
    }

    const result = applyMove(position, selected, square);
    if (!result.ok) {
      setMessage(result.message);
      clearSelection();
      return;
    }

    const positionHashes = [...game.positionHashes, hashPosition(result.position)];
    const end = evaluateBoard(result.position, { positionHashes });
    const move: MoveRecord = {
      ply: game.moves.length + 1,
      from: result.move.from,
      to: result.move.to,
      ucci: result.ucci,
      notation: result.notation,
      color: result.move.piece.color,
      pieceType: result.move.piece.type,
      capturedType: result.move.captured?.type ?? null,
      givesCheck: result.givesCheck,
      playedAt: new Date().toISOString(),
    };
    if (result.move.captured) {
      const attacker = result.move.piece;
      const captured = result.move.captured;
      setCaptureNotice(
        `${attacker.color === 'r' ? '红' : '黑'}${PIECE_GLYPHS[attacker.color][attacker.type]} 吃 ${captured.color === 'r' ? '红' : '黑'}${PIECE_GLYPHS[captured.color][captured.type]}`,
      );
      if (settings.sound) playCue('capture');
      if (settings.haptics) vibrate(10);
    } else {
      setCaptureNotice(null);
    }
    const endedAt = end.status === 'playing' ? undefined : new Date().toISOString();
    setGame((previous) => ({
      ...previous,
      fen: toFen(result.position),
      moves: [...previous.moves, move],
      positionHashes,
      result: end,
      endedAt,
    }));
    clearSelection();
    setMessage(null);
  }

  function undo() {
    if (!canUndo) return;
    const moves = game.moves.slice(0, -undoPlies);
    let position = parseFen(START_FEN);
    const positionHashes = [hashPosition(position)];
    for (const move of moves) {
      const result = applyMove(position, move.from, move.to);
      if (!result.ok) return;
      position = result.position;
      positionHashes.push(hashPosition(position));
    }
    setCaptureNotice(null);
    setGame((previous) => ({
      ...previous,
      fen: toFen(position),
      moves,
      positionHashes,
      result: { status: 'playing' },
      endedAt: undefined,
    }));
    clearSelection();
    setMessage(null);
  }

  function resign() {
    const result: GameResult = {
      status: 'win',
      winner: opposite(position.turn),
      reason: 'resign',
    };
    setGame((previous) => ({
      ...previous,
      result,
      endedAt: new Date().toISOString(),
    }));
    setCaptureNotice(null);
    setDialog(null);
  }

  function newGame() {
    setGame(freshGame(game.orientation));
    clearSelection();
    setCaptureNotice(null);
    setMessage(null);
    setDialog(null);
  }

  function flipBoard() {
    setGame((previous) => ({
      ...previous,
      orientation: previous.orientation === 'r' ? 'b' : 'r',
    }));
  }

  return (
    <div className="page play-page">
      <h1 className="sr-only">线下双人对弈</h1>

      <div className="play-topline">
        <Link to="/local" className="back-link">
          <ArrowLeft size={15} aria-hidden="true" />
          线下棋桌
        </Link>
        <div className="play-topline-right">
          <span className="mobile-engine-status is-ready">
            <i aria-hidden="true" />
            线下双人
          </span>
          <span className="play-meta">
            同一设备轮流走 · {turnName}行棋 · {formatDuration(elapsed)}
          </span>
        </div>
      </div>

      <div className="play-layout">
        <section className="board-column">
          <div className="board-toolbar">
            <div className="turn-chip" aria-live="polite">
              <span className={`turn-disc ${position.turn}`} />
              {finished ? localResultLabel(game.result) : `${turnName}行棋`}
              {!finished && <span className="turn-sub">同一设备轮流落子</span>}
            </div>
            <button type="button" className="btn btn-ghost btn-small" onClick={flipBoard}>
              <ArrowLeftRight size={15} aria-hidden="true" />
              翻转棋盘
            </button>
          </div>

          <Board
            position={position}
            orientation={game.orientation}
            selected={selected}
            legalTargets={targets}
            lastMove={lastMove ? { from: lastMove.from, to: lastMove.to } : null}
            checkedSquare={checked}
            checkmate={
              finished &&
              game.result.status === 'win' &&
              game.result.reason === 'checkmate' &&
              game.result.winner === finishedWinner
            }
            interactive={!finished}
            onPoint={handlePoint}
          />

          {captureNotice && (
            <div className="capture-banner" role="status">
              <Swords size={17} aria-hidden="true" />
              <span>{captureNotice}</span>
            </div>
          )}

          {checked && !finished && (
            <div className="check-banner" role="status">
              <AlertTriangle size={17} aria-hidden="true" />
              {turnName}被将军。
            </div>
          )}

          {message && (
            <div className="inline-alert" role="status">
              <span>{message}</span>
              <button type="button" className="text-button" onClick={() => setMessage(null)}>
                知道了
              </button>
            </div>
          )}

          {finished && (
            <div className={`result-card result-${game.result.status}`}>
              <div className="result-mark">
                {game.result.status === 'win' ? (
                  <ShieldCheck size={26} aria-hidden="true" />
                ) : (
                  <Flag size={26} aria-hidden="true" />
                )}
              </div>
              <div>
                <span className="eyebrow">对局结束</span>
                <h2>{localResultLabel(game.result)}</h2>
                <p>
                  {game.moves.length} 手 · {formatDuration(elapsed)}
                </p>
              </div>
              <div className="result-actions">
                <button type="button" className="btn btn-primary" onClick={newGame}>
                  <RotateCcw size={16} aria-hidden="true" />
                  再来一局
                </button>
                <Link to="/local" className="btn btn-ghost">
                  返回棋桌
                </Link>
              </div>
            </div>
          )}

          <p className="board-help">
            两个人轮流点选棋子落子；也可用 Tab 聚焦棋格、方向键移动、回车落子。
          </p>
        </section>

        <aside className="play-side">
          <div className="board-controls side-controls">
            <button
              type="button"
              className="control-button"
              disabled={!canUndo}
              onClick={undo}
            >
              <Undo2 size={18} aria-hidden="true" />
              <span>悔棋</span>
            </button>
            <button type="button" className="control-button" onClick={flipBoard}>
              <ArrowLeftRight size={18} aria-hidden="true" />
              <span>翻转</span>
            </button>
            <button type="button" className="control-button" disabled={finished} onClick={() => setDialog('new')}>
              <RotateCcw size={18} aria-hidden="true" />
              <span>新局</span>
            </button>
            <button
              type="button"
              className="control-button danger"
              disabled={finished}
              onClick={() => setDialog('resign')}
            >
              <Flag size={18} aria-hidden="true" />
              <span>认输</span>
            </button>
          </div>

          <section className="side-card">
            <div className="side-heading">
              <span className="eyebrow">线下对棋</span>
              <span className="side-level">
                <Users size={13} aria-hidden="true" /> 双人
              </span>
            </div>
            <div className="player-row">
              <div className={`player-avatar red ${position.turn === 'r' ? 'active' : ''}`}>
                {PIECE_GLYPHS.r.K}
              </div>
              <div>
                <strong>红方</strong>
                <span>本机棋手 · 先行</span>
              </div>
              {!finished && position.turn === 'r' && <Check size={16} aria-label="轮到红方" />}
            </div>
            <div className="vs-line">
              <span />
              <em>VS</em>
              <span />
            </div>
            <div className="player-row">
              <div className={`player-avatar black ${position.turn === 'b' ? 'active' : ''}`}>
                {PIECE_GLYPHS.b.K}
              </div>
              <div>
                <strong>黑方</strong>
                <span>本机棋手 · 后行</span>
              </div>
              {!finished && position.turn === 'b' && <Check size={16} aria-label="轮到黑方" />}
            </div>
            <div className="side-meta">
              <span>已走 {game.moves.length} 手</span>
              <span>{formatDuration(elapsed)}</span>
            </div>
          </section>

          <section className="side-card move-card">
            <div className="side-heading">
              <span className="eyebrow">棋谱</span>
              <span className="side-level">本局</span>
            </div>
            <MoveList moves={game.moves} emptyText="落子后，棋谱会显示在这里。" />
          </section>

          <section className="side-card engine-note">
            <span className="eyebrow">线下说明</span>
            <p>
              同一台设备轮流落子，不调用引擎，也不上传棋局。离开页面后这盘棋会保存在本机。
            </p>
          </section>
        </aside>
      </div>

      <Dialog
        open={dialog === 'resign'}
        title="确认认输？"
        onClose={() => setDialog(null)}
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setDialog(null)}>
              继续下
            </button>
            <button type="button" className="btn btn-danger" onClick={resign}>
              确认认输
            </button>
          </>
        }
      >
        <p>当前行棋方认输，本局立即结束。</p>
      </Dialog>

      <Dialog
        open={dialog === 'new'}
        title="开始新的一局？"
        onClose={() => setDialog(null)}
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setDialog(null)}>
              取消
            </button>
            <button type="button" className="btn btn-primary" onClick={newGame}>
              重新摆棋
            </button>
          </>
        }
      >
        <p>当前这盘棋会被新局替换。</p>
      </Dialog>
    </div>
  );
}
