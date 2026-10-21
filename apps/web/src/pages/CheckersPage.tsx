import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Flag, Loader2, RotateCcw, ShieldCheck, Undo2 } from 'lucide-react';
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
import { OpponentPicker, type OpponentMode } from '../components/OpponentPicker';
import { checkersPosition, gridPositionKey, requestGridMove } from '../engine/adapters';
import { useAiTurn } from '../lib/useAiTurn';
import { formatDuration } from '../lib/format';

type DialogAction = 'new' | 'resign' | null;
type AiReply = { index?: number; from?: number; to?: number };

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
  mode: OpponentMode;
  level: 1 | 2 | 3;
  /** 手动禁点：任何子都不许落到的孔位下标 */
  manualBans?: number[];
  /** 局面键 → AI 曾走过的着法；同局面重试时禁掉，换思路 */
  aiReplies?: Record<string, AiReply[]>;
}

const STORAGE_KEY = 'qilian.local-checkers.v1';
/** 人机模式：你执红先行，AI 执黑。 */
const HUMAN_COLOR: CheckersColor = 'r';
const AI_COLOR: CheckersColor = 'b';
const AI_TIME_MS: Record<1 | 2 | 3, number> = { 1: 300, 2: 700, 3: 1200 };

function freshGame(mode: OpponentMode = 'ai', level: 1 | 2 | 3 = 2): LocalCheckers {
  return { state: createCheckersInitial(), moves: [], startedAt: new Date().toISOString(), mode, level };
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
    return {
      ...saved,
      mode: saved.mode === 'local' ? 'local' : 'ai',
      level: saved.level === 1 || saved.level === 3 ? saved.level : 2,
    };
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

function holeLabel(index: number): string {
  const hole = CHECKERS_HOLES[index];
  return hole ? checkersHoleLabel(hole) : `孔 ${index}`;
}

export function CheckersPage() {
  const [game, setGame] = useState<LocalCheckers>(() => loadGame());
  const [selected, setSelected] = useState<number | null>(null);
  const [targets, setTargets] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [dialog, setDialog] = useState<DialogAction>(null);
  const [now, setNow] = useState(Date.now());
  const [aiThinking, setAiThinking] = useState(false);
  const [banMode, setBanMode] = useState(false);

  const finished = game.state.status.status !== 'playing';
  const isAi = game.mode === 'ai';
  const lastMove = game.moves.length > 0 ? game.moves[game.moves.length - 1] : null;
  const elapsed = new Date(game.endedAt ?? now).getTime() - new Date(game.startedAt).getTime();
  const turnName = game.state.turn === 'r' ? '红方' : '黑方';
  const modeLocked = game.moves.length > 0 && !finished;
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

  useAiTurn(isAi && !finished && game.state.turn === AI_COLOR, `${game.startedAt}:${game.moves.length}`, async () => {
    setAiThinking(true);
    try {
      const position = checkersPosition(game.state);
      const positionKey = gridPositionKey(position);
      const bans = [
        ...(game.manualBans ?? []).map((to) => ({ to })),
        ...(game.aiReplies?.[positionKey] ?? []),
      ];
      const move = await requestGridMove(position, game.level, AI_TIME_MS[game.level], bans);
      if (move.kind !== 'move') throw new Error('AI 返回的着法无法识别');
      setGame((previous) => {
        const color = previous.state.board[move.from];
        if (color !== AI_COLOR) return previous;
        const next = applyCheckersMove(previous.state, { from: move.from, to: move.to });
        return {
          ...previous,
          state: next,
          endedAt: next.status.status === 'playing' ? undefined : new Date().toISOString(),
          moves: [
            ...previous.moves,
            { from: move.from, to: move.to, color, ply: previous.moves.length + 1 },
          ],
          aiReplies: {
            ...(previous.aiReplies ?? {}),
            [positionKey]: [...(previous.aiReplies?.[positionKey] ?? []), { from: move.from, to: move.to }],
          },
        };
      });
      clearSelection();
      setMessage(null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setAiThinking(false);
    }
  });

  function toggleBan(hole: number) {
    const banned = (game.manualBans ?? []).includes(hole);
    setGame((previous) => {
      const list = previous.manualBans ?? [];
      return {
        ...previous,
        manualBans: banned ? list.filter((item) => item !== hole) : [...list, hole],
      };
    });
    clearSelection();
    setMessage(banned ? `已解除 ${holeLabel(hole)}` : `已禁位置 ${holeLabel(hole)}`);
  }

  function clearSelection() {
    setSelected(null);
    setTargets([]);
  }

  function choose(hole: number) {
    if (finished || (isAi && game.state.turn !== HUMAN_COLOR) || aiThinking) return;
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
    // 人机模式：若最后一手是 AI 走的，连退两手把回合还给玩家。
    const removeCount = isAi && game.moves[game.moves.length - 1]?.color === AI_COLOR ? 2 : 1;
    const keep = game.moves.slice(0, Math.max(0, game.moves.length - removeCount));
    let state = createCheckersInitial();
    for (const move of keep) {
      const next = applyCheckersMove(state, { from: move.from, to: move.to });
      if (next.status.status !== 'playing') break;
      state = next;
    }
    setGame((previous) => ({
      ...previous,
      state,
      moves: keep,
      endedAt: undefined,
    }));
    clearSelection();
    setMessage(null);
  }

  function changeMode(mode: OpponentMode) {
    if (mode === game.mode) return;
    setGame(freshGame(mode, game.level));
    clearSelection();
    setMessage(null);
  }

  function changeLevel(level: 1 | 2 | 3) {
    if (level === game.level) return;
    setGame((previous) => ({ ...previous, level }));
  }

  function resign() {
    setGame((previous) => ({
      ...previous,
      state: {
        ...previous.state,
        status: {
          status: 'win',
          // 人机模式玩家认输；双人模式行棋方认输。
          winner: previous.mode === 'ai' ? AI_COLOR : oppositeCheckersColor(previous.state.turn),
          reason: 'resign',
        },
      },
      endedAt: new Date().toISOString(),
    }));
    setDialog(null);
  }

  function newGame() {
    setGame(freshGame(game.mode, game.level));
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
          其它棋类
        </Link>
        <div className="play-topline-right">
          <span className="mobile-engine-status is-ready">
            <i aria-hidden="true" />
            中国跳棋
          </span>
          <span className="play-meta">
            {isAi ? '人机对战 · 你执红' : '双人对战'} · {formatDuration(elapsed)}
          </span>
        </div>
      </div>

      <div className="play-layout local-game-layout">
        <section className="board-column">
          <div className="board-toolbar">
            <div className={`turn-chip${aiThinking ? ' is-thinking' : ''}`} aria-live="polite">
              <span className={`turn-disc ${game.state.turn}`} />
              {banMode
                ? '禁着模式'
                : finished
                  ? resultText(game.state)
                  : aiThinking
                    ? 'AI 思考中…'
                    : isAi && game.state.turn === AI_COLOR
                      ? 'AI 行棋'
                      : isAi
                        ? '轮到你走'
                        : `${turnName}行棋`}
              {!finished && (
                <span className="turn-sub">{banMode ? '点格子标记/解除禁点' : '十枚棋子全部进入对面营区即胜'}</span>
              )}
            </div>
            <span className="local-game-rule-chip">连跳 · 借桥 · 十子归营</span>
          </div>

          <CheckersBoard
            state={game.state}
            selected={selected}
            targets={targets}
            lastMove={lastMove ? { from: lastMove.from, to: lastMove.to } : null}
            disabled={banMode ? finished || aiThinking : finished || aiThinking || (isAi && game.state.turn === AI_COLOR)}
            onPoint={banMode ? toggleBan : choose}
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
            <button
              type="button"
              className={`control-button${banMode ? ' is-active' : ''}`}
              disabled={finished}
              onClick={() => setBanMode((value) => !value)}
              title="标记任何子都不会走到的孔位"
            >
              <ShieldCheck size={18} aria-hidden="true" />
              <span>禁着</span>
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
              <span className="side-level">{isAi ? '人机' : '双人'}</span>
            </div>
            <OpponentPicker
              mode={game.mode}
              level={game.level}
              modeLocked={modeLocked}
              onMode={changeMode}
              onLevel={changeLevel}
            />
            <div className="player-row">
              <div className={`player-avatar red ${game.state.turn === 'r' ? 'active' : ''}`}>红</div>
              <div>
                <strong>{isAi ? '你' : '红方'}</strong>
                <span>{isAi ? '执红 · 下方营区' : '下方营区 · 前往上方'}</span>
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
                <strong>{isAi ? 'AI' : '黑方'}</strong>
                <span>{isAi ? `AI · ${game.level === 1 ? '入门' : game.level === 2 ? '进阶' : '挑战'}` : '上方营区 · 前往下方'}</span>
              </div>
              {isAi && aiThinking && <Loader2 size={16} className="spin" aria-label="思考中" />}
            </div>
            <div className="side-meta">
              <span>已走 {game.moves.length} 手</span>
              <span>{formatDuration(elapsed)}</span>
            </div>
          </section>

          <section className="side-card">
            <div className="side-heading">
              <span className="eyebrow">禁着</span>
              <span className="side-level">{(game.manualBans ?? []).length} 个</span>
            </div>
            {(game.manualBans ?? []).length === 0 ? (
              <p className="muted small">按下「禁着」后点棋盘孔位，标记任何子都不会走到的位置；再点一次解除。</p>
            ) : (
              <div className="local-move-list">
                {(game.manualBans ?? []).map((hole) => (
                  <div className="local-move-row" key={hole}>
                    <span>{holeLabel(hole)}</span>
                    <button type="button" className="text-button" onClick={() => toggleBan(hole)}>
                      解除
                    </button>
                  </div>
                ))}
              </div>
            )}
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
