import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Flag, RotateCcw, ShieldCheck, Undo2 } from 'lucide-react';
import {
  CHECKERS_HOLES,
  applyCheckersMove,
  checkersDestinations,
  checkersHoleLabel,
  createCheckersInitial,
  oppositeCheckersColor,
  type CheckersColor,
  type CheckersState,
} from '../games/checkers';
import { CheckersBoard } from '../components/CheckersBoard';
import { Dialog } from '../components/Dialog';
import { formatDuration } from '../lib/format';

type DialogAction = 'new' | 'resign' | null;

interface CheckersMoveRecord {
  from: number;
  to: number;
  color: CheckersColor;
  ply: number;
}

interface LocalCheckers {
  state: CheckersState;
  moves: CheckersMoveRecord[];
  startedAt: string;
  endedAt?: string;
}

const STORAGE_KEY = 'qilian.local-checkers.v1';

function freshGame(): LocalCheckers {
  return { state: createCheckersInitial(), moves: [], startedAt: new Date().toISOString() };
}

function loadGame(): LocalCheckers {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshGame();
    const saved = JSON.parse(raw) as LocalCheckers;
    if (!saved?.state || saved.state.board?.length !== CHECKERS_HOLES.length || !Array.isArray(saved.moves)) {
      return freshGame();
    }
    if (saved.state.turn !== 'r' && saved.state.turn !== 'b') return freshGame();
    return saved;
  } catch {
    return freshGame();
  }
}

function resultText(state: CheckersState): string {
  if (state.status.status !== 'win') return '';
  const winner = state.status.winner === 'r' ? '红方' : '黑方';
  const reason =
    state.status.reason === 'all-home'
      ? '十子归营'
      : state.status.reason === 'blocked'
        ? '对方无棋可走'
        : '对方认输';
  return `${winner}胜 · ${reason}`;
}

export function CheckersPage() {
  const [game, setGame] = useState<LocalCheckers>(() => loadGame());
  const [selected, setSelected] = useState<number | null>(null);
  const [targets, setTargets] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [dialog, setDialog] = useState<DialogAction>(null);
  const [now, setNow] = useState(Date.now());

  const finished = game.state.status.status !== 'playing';
  const lastMove = game.moves.length > 0 ? game.moves[game.moves.length - 1] : null;
  const elapsed = new Date(game.endedAt ?? now).getTime() - new Date(game.startedAt).getTime();
  const turnName = game.state.turn === 'r' ? '红方' : '黑方';
  const destinations = useMemo(
    () => (selected === null ? [] : checkersDestinations(game.state, selected)),
    [game.state, selected],
  );

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

  function clearSelection() {
    setSelected(null);
    setTargets([]);
  }

  function choose(hole: number) {
    if (finished) return;
    const piece = game.state.board[hole];
    if (piece === game.state.turn) {
      setSelected(hole);
      setTargets(checkersDestinations(game.state, hole));
      setMessage(null);
      return;
    }
    if (selected === null) return;
    if (!destinations.includes(hole)) {
      clearSelection();
      setMessage('这枚棋子不能跳到那里。');
      return;
    }

    const color = game.state.board[selected];
    if (!color) return;
    const next = applyCheckersMove(game.state, { from: selected, to: hole });
    const endedAt = next.status.status === 'playing' ? undefined : new Date().toISOString();
    setGame((previous) => ({
      ...previous,
      state: next,
      endedAt,
      moves: [
        ...previous.moves,
        { from: selected, to: hole, color, ply: previous.moves.length + 1 },
      ],
    }));
    clearSelection();
    setMessage(null);
  }

  function undo() {
    if (finished || game.moves.length === 0) return;
    let state = createCheckersInitial();
    for (const move of game.moves.slice(0, -1)) {
      const next = applyCheckersMove(state, { from: move.from, to: move.to });
      if (next.status.status !== 'playing') break;
      state = next;
    }
    setGame((previous) => ({
      ...previous,
      state,
      moves: previous.moves.slice(0, -1),
      endedAt: undefined,
    }));
    clearSelection();
    setMessage(null);
  }

  function resign() {
    setGame((previous) => ({
      ...previous,
      state: {
        ...previous.state,
        status: {
          status: 'win',
          winner: oppositeCheckersColor(previous.state.turn),
          reason: 'resign',
        },
      },
      endedAt: new Date().toISOString(),
    }));
    setDialog(null);
  }

  function newGame() {
    setGame(freshGame());
    clearSelection();
    setMessage(null);
    setDialog(null);
  }

  return (
    <div className="page play-page local-game-page">
      <h1 className="sr-only">中国跳棋</h1>

      <div className="play-topline">
        <Link to="/local" className="back-link">
          <ArrowLeft size={15} aria-hidden="true" />
          线下棋桌
        </Link>
        <div className="play-topline-right">
          <span className="mobile-engine-status is-ready">
            <i aria-hidden="true" />
            中国跳棋
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
              <span className={`turn-disc ${game.state.turn}`} />
              {finished ? resultText(game.state) : `${turnName}行棋`}
              {!finished && <span className="turn-sub">十枚棋子全部进入对面营区即胜</span>}
            </div>
            <span className="local-game-rule-chip">连跳 · 借桥 · 十子归营</span>
          </div>

          <CheckersBoard
            state={game.state}
            selected={selected}
            targets={targets}
            lastMove={lastMove ? { from: lastMove.from, to: lastMove.to } : null}
            disabled={finished}
            onPoint={choose}
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

          <p className="board-help">
            点击自己的棋子，再点空孔走一步或跳过相邻棋子；可以连续跳。
          </p>
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
              <span className="eyebrow">中国跳棋</span>
              <span className="side-level">双人</span>
            </div>
            <div className="player-row">
              <div className={`player-avatar red ${game.state.turn === 'r' ? 'active' : ''}`}>红</div>
              <div>
                <strong>红方</strong>
                <span>下方营区 · 前往上方</span>
              </div>
            </div>
            <div className="vs-line">
              <span />
              <em>VS</em>
              <span />
            </div>
            <div className="player-row">
              <div className={`player-avatar black ${game.state.turn === 'b' ? 'active' : ''}`}>黑</div>
              <div>
                <strong>黑方</strong>
                <span>上方营区 · 前往下方</span>
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
              <li>每次走一枚棋子：走一格，或跳过相邻棋子。</li>
              <li>跳过一枚棋子后可继续连跳，落点必须是空孔。</li>
              <li>被跳过的颜色不限，自己的棋子也能借桥。</li>
              <li>十枚棋子全部进入对面营区即胜。</li>
              <li>无棋可走时，当前方判负。</li>
            </ul>
          </section>

          <section className="side-card move-card">
            <div className="side-heading">
              <span className="eyebrow">棋谱</span>
              <span className="side-level">{game.moves.length} 手</span>
            </div>
            {game.moves.length === 0 ? (
              <p className="muted small">落子后，走法会显示在这里。</p>
            ) : (
              <div className="local-move-list">
                {game.moves.map((move) => {
                  const from = CHECKERS_HOLES[move.from]!;
                  const to = CHECKERS_HOLES[move.to]!;
                  return (
                    <div className="local-move-row" key={move.ply}>
                      <span>{move.ply}.</span>
                      <span className={`local-move-color ${move.color}`}>{move.color === 'r' ? '红' : '黑'}</span>
                      <span>{checkersHoleLabel(from)} → {checkersHoleLabel(to)}</span>
                    </div>
                  );
                })}
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
            <button type="button" className="btn btn-ghost" onClick={() => setDialog(null)}>
              继续下
            </button>
            <button type="button" className="btn btn-danger" onClick={resign}>
              确认认输
            </button>
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
