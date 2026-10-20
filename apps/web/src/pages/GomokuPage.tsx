import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Flag, RotateCcw, ShieldCheck, Undo2 } from 'lucide-react';
import {
  GOMOKU_SIZE,
  createGomokuInitial,
  oppositeGomokuColor,
  placeGomokuStone,
  type GomokuColor,
  type GomokuState,
} from '../games/gomoku';
import { GomokuBoard } from '../components/GomokuBoard';
import { Dialog } from '../components/Dialog';
import { formatDuration } from '../lib/format';

type DialogAction = 'new' | 'resign' | null;

interface GomokuMoveRecord {
  index: number;
  color: GomokuColor;
  ply: number;
}

interface LocalGomoku {
  state: GomokuState;
  moves: GomokuMoveRecord[];
  startedAt: string;
  endedAt?: string;
}

const STORAGE_KEY = 'qilian.local-gomoku.v1';

function freshGame(): LocalGomoku {
  return { state: createGomokuInitial(), moves: [], startedAt: new Date().toISOString() };
}

function loadGame(): LocalGomoku {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshGame();
    const saved = JSON.parse(raw) as LocalGomoku;
    if (!saved?.state || saved.state.board?.length !== GOMOKU_SIZE * GOMOKU_SIZE || !Array.isArray(saved.moves)) {
      return freshGame();
    }
    return saved;
  } catch {
    return freshGame();
  }
}

function pointLabel(index: number): string {
  return `${String.fromCharCode(65 + (index % GOMOKU_SIZE))}${Math.floor(index / GOMOKU_SIZE) + 1}`;
}

function resultText(state: GomokuState): string {
  if (state.status.status === 'draw') return '和棋';
  if (state.status.status !== 'win') return '';
  const winner = state.status.winner === 'b' ? '黑方' : '白方';
  return `${winner}胜 · ${state.status.reason === 'resign' ? '对方认输' : '五子连珠'}`;
}

export function GomokuPage() {
  const [game, setGame] = useState<LocalGomoku>(() => loadGame());
  const [message, setMessage] = useState<string | null>(null);
  const [dialog, setDialog] = useState<DialogAction>(null);
  const [now, setNow] = useState(Date.now());

  const finished = game.state.status.status !== 'playing';
  const elapsed = new Date(game.endedAt ?? now).getTime() - new Date(game.startedAt).getTime();
  const turnName = game.state.turn === 'b' ? '黑方' : '白方';
  const winningLine = game.state.status.status === 'win' ? game.state.status.line : [];

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
    } catch {
      // Storage can be unavailable in private browsing.
    }
  }, [game]);

  useEffect(() => {
    if (finished) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [finished]);

  function play(index: number) {
    if (finished || game.state.board[index]) {
      if (game.state.board[index]) setMessage('这个交叉点已经有棋子了。');
      return;
    }
    const color = game.state.turn;
    const next = placeGomokuStone(game.state, index);
    if (next === game.state) return;
    setGame((previous) => ({
      ...previous,
      state: next,
      endedAt: next.status.status === 'playing' ? undefined : new Date().toISOString(),
      moves: [...previous.moves, { index, color, ply: previous.moves.length + 1 }],
    }));
    setMessage(null);
  }

  function undo() {
    if (finished || game.moves.length === 0) return;
    let state = createGomokuInitial();
    for (const move of game.moves.slice(0, -1)) {
      state = placeGomokuStone(state, move.index);
    }
    setGame((previous) => ({
      ...previous,
      state,
      moves: previous.moves.slice(0, -1),
      endedAt: undefined,
    }));
    setMessage(null);
  }

  function resign() {
    setGame((previous) => ({
      ...previous,
      state: {
        ...previous.state,
        status: {
          status: 'win',
          winner: oppositeGomokuColor(previous.state.turn),
          line: [],
          reason: 'resign',
        },
      },
      endedAt: new Date().toISOString(),
    }));
    setDialog(null);
  }

  function newGame() {
    setGame(freshGame());
    setMessage(null);
    setDialog(null);
  }

  return (
    <div className="page play-page local-game-page">
      <h1 className="sr-only">五子棋</h1>

      <div className="play-topline">
        <Link to="/local" className="back-link">
          <ArrowLeft size={15} aria-hidden="true" />
          线下棋桌
        </Link>
        <div className="play-topline-right">
          <span className="mobile-engine-status is-ready">
            <i aria-hidden="true" />
            五子棋
          </span>
          <span className="play-meta">
            同一设备轮流走 · {turnName}行棋 · {formatDuration(elapsed)}
          </span>
        </div>
      </div>

      <div className="play-layout local-game-layout">
        <section className="board-column">
          <div className="board-toolbar">
            <div className="turn-chip" aria-live="polite">
              <span className={`turn-disc ${game.state.turn === 'b' ? 'b' : 'w'}`} />
              {finished ? resultText(game.state) : `${turnName}行棋`}
              {!finished && <span className="turn-sub">先连成五子的一方获胜</span>}
            </div>
            <span className="local-game-rule-chip">15 × 15 · 黑先</span>
          </div>

          <GomokuBoard
            state={game.state}
            winningLine={winningLine}
            lastMove={game.state.lastMove}
            disabled={finished}
            onPoint={play}
          />

          {message && (
            <div className="inline-alert" role="status">
              <span>{message}</span>
              <button type="button" className="text-button" onClick={() => setMessage(null)}>
                知道了
              </button>
            </div>
          )}

          {finished && (
            <div className="result-card result-win">
              <div className="result-mark">
                <ShieldCheck size={26} aria-hidden="true" />
              </div>
              <div>
                <span className="eyebrow">对局结束</span>
                <h2>{resultText(game.state)}</h2>
                <p>{game.moves.length} 手 · {formatDuration(elapsed)}</p>
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

          <p className="board-help">点击空交叉点落子；横、竖、斜任意方向先连成五子即胜。</p>
        </section>

        <aside className="play-side">
          <div className="board-controls side-controls">
            <button
              type="button"
              className="control-button"
              disabled={finished || game.moves.length === 0}
              onClick={undo}
            >
              <Undo2 size={18} aria-hidden="true" />
              <span>悔棋</span>
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
              <span className="eyebrow">五子棋</span>
              <span className="side-level">双人</span>
            </div>
            <div className="player-row">
              <div className={`player-avatar black ${game.state.turn === 'b' ? 'active' : ''}`}>黑</div>
              <div>
                <strong>黑方</strong>
                <span>本机棋手 · 先行</span>
              </div>
            </div>
            <div className="vs-line"><span /><em>VS</em><span /></div>
            <div className="player-row">
              <div className={`player-avatar ${game.state.turn === 'w' ? 'active' : ''}`}>白</div>
              <div>
                <strong>白方</strong>
                <span>本机棋手 · 后行</span>
              </div>
            </div>
            <div className="side-meta">
              <span>已走 {game.moves.length} 手</span>
              <span>{formatDuration(elapsed)}</span>
            </div>
          </section>

          <section className="side-card">
            <div className="side-heading">
              <span className="eyebrow">规则</span>
              <span className="side-level">简版</span>
            </div>
            <ul className="local-rule-list">
              <li>15 × 15 棋盘，黑方先行。</li>
              <li>横、竖、斜任意方向连成五子即胜。</li>
              <li>超过五子也算连成。</li>
              <li>棋盘下满仍无五子则和棋。</li>
              <li>不设禁手，适合轻松对弈。</li>
            </ul>
          </section>

          <section className="side-card move-card">
            <div className="side-heading">
              <span className="eyebrow">棋谱</span>
              <span className="side-level">{game.moves.length} 手</span>
            </div>
            {game.moves.length === 0 ? (
              <p className="muted small">落子后，坐标会显示在这里。</p>
            ) : (
              <div className="local-move-list">
                {game.moves.map((move) => (
                  <div className="local-move-row" key={move.ply}>
                    <span>{move.ply}.</span>
                    <span className={`local-move-color ${move.color}`}>{move.color === 'b' ? '黑' : '白'}</span>
                    <span>{pointLabel(move.index)}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </aside>
      </div>

      <Dialog
        open={dialog === 'resign'}
        title="确认认输？"
        onClose={() => setDialog(null)}
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setDialog(null)}>继续下</button>
            <button type="button" className="btn btn-danger" onClick={resign}>确认认输</button>
          </>
        }
      >
        <p>当前行棋方认输，本局结束。</p>
      </Dialog>

      <Dialog
        open={dialog === 'new'}
        title="开始新的一局？"
        onClose={() => setDialog(null)}
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setDialog(null)}>取消</button>
            <button type="button" className="btn btn-primary" onClick={newGame}>重新摆棋</button>
          </>
        }
      >
        <p>当前这盘棋会被新局替换。</p>
      </Dialog>
    </div>
  );
}
