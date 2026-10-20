import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Flag, SkipBack, SkipForward, Undo2 } from 'lucide-react';
import {
  START_FEN,
  applyMove,
  isInCheck,
  parseFen,
  type Position,
} from '@qilian/xiangqi';
import { Board } from '../components/Board';
import { MoveList } from '../components/MoveList';
import { getFinishedGame } from '../lib/storage';
import { useSettingsStore } from '../stores/settings';
import { formatDateTime, formatDuration } from '../lib/format';
import { levelLabel, resultLabel, useGameStore } from '../stores/game';
import type { FinishedGame, MoveRecord } from '../types';

export function ReviewPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const settings = useSettingsStore();
  const resumeFinishedGame = useGameStore((state) => state.resumeFinishedGame);
  const current = useGameStore((state) => state.current);
  const [game, setGame] = useState<FinishedGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [resuming, setResuming] = useState(false);

  useEffect(() => {
    let alive = true;
    void getFinishedGame(id).then((record) => {
      if (!alive) return;
      if (record) {
        setGame(record);
      } else if (current?.id === id) {
        setGame({
          id: current.id,
          mode: 'ai',
          playerColor: current.playerColor,
          level: current.level,
          initialFen: START_FEN,
          moves: current.moves,
          result: current.result,
          startedAt: current.startedAt,
          endedAt: current.updatedAt,
          elapsedMs: current.elapsedMs,
        });
      }
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [id, current]);

  const positions = useMemo(() => {
    if (!game) return [] as Position[];
    const initial = (() => {
      try {
        return parseFen(game.initialFen);
      } catch {
        return parseFen(START_FEN);
      }
    })();
    const list: Position[] = [initial];
    let position = initial;
    for (const move of game.moves) {
      const result = applyMove(position, move.from, move.to);
      if (!result.ok) break;
      position = result.position;
      list.push(position);
    }
    return list;
  }, [game]);

  useEffect(() => {
    setIndex(0);
  }, [id]);

  if (loading) {
    return <div className="page loading-page">正在读取棋谱…</div>;
  }

  if (!game) {
    return (
      <div className="page empty-state">
        <Flag size={32} aria-hidden="true" />
        <h1>没有找到这局棋</h1>
        <p>棋谱可能已经被删除，或只保存在另一台设备上。</p>
        <Link to="/history" className="btn btn-dark">返回棋谱</Link>
      </div>
    );
  }

  const boardPosition = positions[index] ?? positions[0] ?? parseFen(START_FEN);
  const activeMove: MoveRecord | undefined = index > 0 ? game.moves[index - 1] : undefined;
  const lastMove = activeMove ? { from: activeMove.from, to: activeMove.to } : null;
  const step = (delta: number) => setIndex((value) => Math.min(positions.length - 1, Math.max(0, value + delta)));
  const undoCount = settings.undoSteps === 10 ? index : Math.min(settings.undoSteps, index);
  const keepMoves = Math.max(0, index - undoCount);
  const checked = isInCheck(boardPosition, boardPosition.turn);
  const canResume = settings.allowUndo && index > 0 && (!checked || settings.allowUndoWhenChecked);

  async function resume() {
    if (!game || !canResume || resuming) return;
    setResuming(true);
    const ok = resumeFinishedGame(game, keepMoves);
    setResuming(false);
    if (ok) navigate('/play');
  }

  return (
    <div className="page review-page">
      <div className="play-topline">
        <Link to="/history" className="back-link">
          <ArrowLeft size={15} aria-hidden="true" />
          棋谱
        </Link>
        <span className="play-meta">
          {formatDateTime(game.endedAt)} · {levelLabel(game.level)} · {formatDuration(game.elapsedMs)}
        </span>
      </div>

      <div className="review-heading">
        <div>
          <span className="eyebrow">棋局回放</span>
          <h1>{resultLabel(game.result, game.playerColor)}</h1>
          <p>你执{game.playerColor === 'r' ? '红' : '黑'} · 共 {game.moves.length} 手</p>
        </div>
        <div className="review-heading-actions">
          <button
            type="button"
            className="btn btn-primary"
            disabled={!canResume || resuming}
            title={!settings.allowUndo ? '设置里已关闭悔棋' : checked && !settings.allowUndoWhenChecked ? '设置要求被将军时先应将' : undefined}
            onClick={() => void resume()}
          >
            <Undo2 size={16} aria-hidden="true" />
            {resuming ? '正在续弈…' : '悔棋并继续'}
          </button>
          <Link to="/play" className="btn btn-ghost">回到对弈</Link>
        </div>
      </div>

      <div className="play-layout review-layout">
        <section className="board-column">
          <Board
            position={boardPosition}
            orientation={game.playerColor}
            lastMove={lastMove}
            interactive={false}
          />
          <div className="review-controls">
            <button type="button" className="icon-button" aria-label="开局" onClick={() => setIndex(0)} disabled={index === 0}>
              <SkipBack size={18} aria-hidden="true" />
            </button>
            <button type="button" className="icon-button" aria-label="上一步" onClick={() => step(-1)} disabled={index === 0}>
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <span className="review-counter">{index} / {game.moves.length}</span>
            <button type="button" className="icon-button" aria-label="下一步" onClick={() => step(1)} disabled={index >= game.moves.length}>
              <ChevronRight size={20} aria-hidden="true" />
            </button>
            <button type="button" className="icon-button" aria-label="终局" onClick={() => setIndex(game.moves.length)} disabled={index >= game.moves.length}>
              <SkipForward size={18} aria-hidden="true" />
            </button>
          </div>
          <p className="board-help">回放只读；点棋谱中的任意一手可直接跳转。「悔棋并继续」会从当前手数退回设置步数，另开一局续弈。</p>
        </section>

        <aside className="play-side">
          <section className="side-card move-card">
            <div className="side-heading">
              <span className="eyebrow">棋谱</span>
              <span className="side-level">{index} / {game.moves.length}</span>
            </div>
            <MoveList
              moves={game.moves}
              activePly={index}
              onSelect={(ply) => setIndex(ply)}
            />
          </section>
          <section className="side-card">
            <span className="eyebrow">本局信息</span>
            <dl className="info-list">
              <div><dt>结果</dt><dd>{resultLabel(game.result, game.playerColor)}</dd></div>
              <div><dt>执子</dt><dd>{game.playerColor === 'r' ? '红方' : '黑方'}</dd></div>
              <div><dt>难度</dt><dd>{levelLabel(game.level)}</dd></div>
              <div><dt>用时</dt><dd>{formatDuration(game.elapsedMs)}</dd></div>
            </dl>
          </section>
        </aside>
      </div>
    </div>
  );
}
