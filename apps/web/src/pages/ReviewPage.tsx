import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Flag, SkipBack, SkipForward } from 'lucide-react';
import {
  START_FEN,
  applyMove,
  parseFen,
  type Position,
} from '@qilian/xiangqi';
import { Board } from '../components/Board';
import { MoveList } from '../components/MoveList';
import { getFinishedGame } from '../lib/storage';
import { formatDateTime, formatDuration } from '../lib/format';
import { levelLabel, resultLabel, useGameStore } from '../stores/game';
import type { FinishedGame, MoveRecord } from '../types';

export function ReviewPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const resumeFinishedGame = useGameStore((state) => state.resumeFinishedGame);
  const current = useGameStore((state) => state.current);
  const [game, setGame] = useState<FinishedGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let alive = true;
    void getFinishedGame(id).then((record) => {
      if (!alive) return;
      if (record) {
        setGame(record);
      } else if (current?.id === id) {
        setGame({
          id: current.id,
          mode: current.mode,
          playerColor: current.playerColor,
          level: current.level,
          initialFen: current.initialFen ?? START_FEN,
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
  function resume() {
    if (!game) return;
    const ok = resumeFinishedGame(game, game.moves.length);
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
        <Link
          to="/play"
          className="btn btn-ghost"
          onClick={(event) => {
            event.preventDefault();
            resume();
          }}
        >
          回到对弈
        </Link>
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
          <p className="board-help">回放只读；点棋谱中的任意一手可直接跳转。点「回到对弈」会载入终局结果；人机历史同样按人机规则退棋：机器最后一步退 2 手，人最后一步退 1 手。</p>
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
