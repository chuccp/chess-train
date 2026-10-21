import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Flag, Loader2, RotateCcw, ShieldCheck, Swords, Undo2 } from 'lucide-react';
import {
  JUNGLE_GLYPHS,
  applyJungleMove,
  createJungleInitial,
  generateJungleMoves,
  jungleCoords,
  jungleMovesFor,
  oppositeJungleColor,
  type JungleAnimal,
  type JungleColor,
  type JungleMove,
  type JungleState,
} from '../games/jungle';
import { JungleBoard } from '../components/JungleBoard';
import { Dialog } from '../components/Dialog';
import { OpponentPicker, type OpponentMode } from '../components/OpponentPicker';
import { gridPositionKey, junglePosition, requestGridMove } from '../engine/adapters';
import { useAiTurn } from '../lib/useAiTurn';
import { formatDuration } from '../lib/format';

type DialogAction = 'new' | 'resign' | null;
type AiReply = { index?: number; from?: number; to?: number };

interface JungleMoveRecord extends JungleMove {
  color: JungleColor;
  animal: JungleAnimal;
  ply: number;
}

interface LocalJungle {
  state: JungleState;
  moves: JungleMoveRecord[];
  startedAt: string;
  endedAt?: string;
  mode: OpponentMode;
  level: 1 | 2 | 3;
  /** 手动禁点：任何子都不许落到的格子下标 */
  manualBans?: number[];
  /** 局面键 → AI 曾走过的着法；同局面重试时禁掉，换思路 */
  aiReplies?: Record<string, AiReply[]>;
}

const STORAGE_KEY = 'qilian.local-jungle.v1';
/** 人机模式：你执红先行，AI 执黑。 */
const HUMAN_COLOR: JungleColor = 'r';
const AI_COLOR: JungleColor = 'b';
const AI_TIME_MS: Record<1 | 2 | 3, number> = { 1: 300, 2: 700, 3: 1200 };

function freshGame(mode: OpponentMode = 'ai', level: 1 | 2 | 3 = 2): LocalJungle {
  return { state: createJungleInitial('r'), moves: [], startedAt: new Date().toISOString(), mode, level };
}

function loadGame(): LocalJungle {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshGame();
    const saved = JSON.parse(raw) as LocalJungle;
    if (!saved?.state || saved.state.board?.length !== 63 || !Array.isArray(saved.moves)) return freshGame();
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

function coordLabel(index: number): string {
  const [row, col] = jungleCoords(index);
  return `${'abcdefg'[col]}${row + 1}`;
}

function resultText(state: JungleState): string {
  if (state.status.status !== 'win') return '';
  const winner = state.status.winner === 'r' ? '红方' : '黑方';
  const reason =
    state.status.reason === 'den'
      ? '进入兽穴'
      : state.status.reason === 'no-moves'
        ? '对方无棋可走'
        : '对方认输';
  return `${winner}胜 · ${reason}`;
}

export function JunglePage() {
  const [game, setGame] = useState<LocalJungle>(() => loadGame());
  const [selected, setSelected] = useState<number | null>(null);
  const [targets, setTargets] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [captureNotice, setCaptureNotice] = useState<string | null>(null);
  const [dialog, setDialog] = useState<DialogAction>(null);
  const [now, setNow] = useState(Date.now());
  const [aiThinking, setAiThinking] = useState(false);
  const [banMode, setBanMode] = useState(false);

  useEffect(() => {
    if (!captureNotice) return;
    const timer = window.setTimeout(() => setCaptureNotice(null), 1800);
    return () => window.clearTimeout(timer);
  }, [captureNotice]);

  const finished = game.state.status.status !== 'playing';
  const isAi = game.mode === 'ai';
  const lastMove = game.moves.length > 0 ? game.moves[game.moves.length - 1] : null;
  const elapsed = new Date(game.endedAt ?? now).getTime() - new Date(game.startedAt).getTime();
  const turnName = game.state.turn === 'r' ? '红方' : '黑方';
  const legalMoves = useMemo(() => generateJungleMoves(game.state), [game.state]);
  const modeLocked = game.moves.length > 0 && !finished;

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
      const position = junglePosition(game.state);
      const positionKey = gridPositionKey(position);
      const bans = [
        ...(game.manualBans ?? []).map((to) => ({ to })),
        ...(game.aiReplies?.[positionKey] ?? []),
      ];
      const move = await requestGridMove(position, game.level, AI_TIME_MS[game.level], bans);
      if (move.kind !== 'move') throw new Error('AI 返回的着法无法识别');
      const full = generateJungleMoves(game.state).find((c) => c.from === move.from && c.to === move.to);
      const pieceAtFrom = full ? game.state.board[full.from] : null;
      if (!full || !pieceAtFrom) throw new Error('AI 返回的着法不合法');
      if (full.capture) {
        setCaptureNotice(
          `${pieceAtFrom.color === 'r' ? '红' : '黑'}${JUNGLE_GLYPHS[pieceAtFrom.animal]} 吃 ${full.capture.color === 'r' ? '红' : '黑'}${JUNGLE_GLYPHS[full.capture.animal]}`,
        );
      } else {
        setCaptureNotice(null);
      }
      setGame((previous) => {
        const next = applyJungleMove(previous.state, full);
        return {
          ...previous,
          state: next,
          endedAt: next.status.status === 'playing' ? undefined : new Date().toISOString(),
          moves: [
            ...previous.moves,
            {
              ...full,
              color: pieceAtFrom.color,
              animal: pieceAtFrom.animal,
              ply: previous.moves.length + 1,
            },
          ],
          aiReplies: {
            ...(previous.aiReplies ?? {}),
            [positionKey]: [...(previous.aiReplies?.[positionKey] ?? []), { from: full.from, to: full.to }],
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

  function toggleBan(index: number) {
    const banned = (game.manualBans ?? []).includes(index);
    setGame((previous) => {
      const list = previous.manualBans ?? [];
      return {
        ...previous,
        manualBans: banned ? list.filter((item) => item !== index) : [...list, index],
      };
    });
    clearSelection();
    setMessage(banned ? `已解除 ${coordLabel(index)}` : `已禁位置 ${coordLabel(index)}`);
  }

  function clearSelection() {
    setSelected(null);
    setTargets([]);
  }

  function choose(index: number) {
    if (finished || (isAi && game.state.turn !== HUMAN_COLOR) || aiThinking) return;
    const piece = game.state.board[index];
    if (piece?.color === game.state.turn) {
      setSelected(index);
      setTargets(jungleMovesFor(game.state, index).map((move) => move.to));
      setMessage(null);
      return;
    }
    if (selected === null) return;
    if (!targets.includes(index)) {
      clearSelection();
      setMessage('这枚棋子不能走到那里。');
      return;
    }

    const move = legalMoves.find((candidate) => candidate.from === selected && candidate.to === index);
    if (!move) {
      clearSelection();
      return;
    }
    const pieceAtFrom = game.state.board[move.from];
    if (!pieceAtFrom) return;
    if (move.capture) {
      setCaptureNotice(
        `${pieceAtFrom.color === 'r' ? '红' : '黑'}${JUNGLE_GLYPHS[pieceAtFrom.animal]} 吃 ${move.capture.color === 'r' ? '红' : '黑'}${JUNGLE_GLYPHS[move.capture.animal]}`,
      );
    } else {
      setCaptureNotice(null);
    }
    const next = applyJungleMove(game.state, move);
    const endedAt = next.status.status === 'playing' ? undefined : new Date().toISOString();
    setGame((previous) => ({
      ...previous,
      state: next,
      endedAt,
      moves: [
        ...previous.moves,
        {
          ...move,
          color: pieceAtFrom.color,
          animal: pieceAtFrom.animal,
          ply: previous.moves.length + 1,
        },
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
    let state = createJungleInitial('r');
    for (const move of keep) {
      const next = applyJungleMove(state, { from: move.from, to: move.to });
      if (next.status.status !== 'playing') break;
      state = next;
    }
    setCaptureNotice(null);
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
    setCaptureNotice(null);
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
          winner: previous.mode === 'ai' ? AI_COLOR : oppositeJungleColor(previous.state.turn),
          reason: 'resign',
        },
      },
      endedAt: new Date().toISOString(),
    }));
    setCaptureNotice(null);
    setDialog(null);
  }

  function newGame() {
    setGame(freshGame(game.mode, game.level));
    clearSelection();
    setCaptureNotice(null);
    setMessage(null);
    setDialog(null);
  }

  return (
    <div className="page play-page local-game-page">
      <h1 className="sr-only">斗兽棋</h1>

      <div className="play-topline">
        <Link to="/local" className="back-link">
          <ArrowLeft size={15} aria-hidden="true" />
          其它棋类
        </Link>
        <div className="play-topline-right">
          <span className="mobile-engine-status is-ready">
            <i aria-hidden="true" />
            斗兽棋
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
              {finished
                ? resultText(game.state)
                : aiThinking
                  ? 'AI 思考中…'
                  : isAi && game.state.turn === AI_COLOR
                    ? 'AI 行棋'
                    : isAi
                      ? '轮到你走'
                      : `${turnName}行棋`}
              {!finished && <span className="turn-sub">红方先行 · 同一设备轮流落子</span>}
            </div>
            <span className="local-game-rule-chip">象 &gt; 狮 &gt; 虎 &gt; 豹 &gt; 狼 &gt; 狗 &gt; 猫 &gt; 鼠</span>
          </div>

          <JungleBoard
            state={game.state}
            selected={selected}
            targets={targets}
            lastMove={lastMove ? { from: lastMove.from, to: lastMove.to } : null}
            disabled={finished || aiThinking || (isAi && game.state.turn === AI_COLOR)}
            onPoint={choose}
          />

          {captureNotice && (
            <div className="capture-banner" role="status">
              <Swords size={17} aria-hidden="true" />
              <span>{captureNotice}</span>
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
            点击自己的兽棋，再点亮的格子落子或吃子；狮、虎可以跳过小河。
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
              <span className="eyebrow">斗兽棋</span>
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
              <div className={`player-avatar red ${game.state.turn === 'r' ? 'active' : ''}`}>狮</div>
              <div>
                <strong>{isAi ? '你' : '红方'}</strong>
                <span>{isAi ? '执红 · 先行' : '本机棋手 · 先行'}</span>
              </div>
            </div>
            <div className="vs-line">
              <span />
              <em>VS</em>
              <span />
            </div>
            <div className="player-row">
              <div className={`player-avatar black ${game.state.turn === 'b' ? 'active' : ''}`}>虎</div>
              <div>
                <strong>{isAi ? 'AI' : '黑方'}</strong>
                <span>{isAi ? `AI · ${game.level === 1 ? '入门' : game.level === 2 ? '进阶' : '挑战'}` : '本机棋手 · 后行'}</span>
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
              <span className="eyebrow">规则</span>
              <span className="side-level">简版</span>
            </div>
            <ul className="local-rule-list">
              <li>象最大，鼠最小；鼠可吃象，象不能吃鼠。</li>
              <li>鼠能下水，水中的鼠不能被岸上棋子吃。</li>
              <li>狮、虎可跳过小河；河里有鼠时不能跳。</li>
              <li>进入对方兽穴即胜；对方无棋可走也胜。</li>
              <li>敌棋踩进己方陷阱后，任何己方棋子都可吃它。</li>
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
                {game.moves.map((move) => (
                  <div className="local-move-row" key={move.ply}>
                    <span>{move.ply}.</span>
                    <span className={`local-move-color ${move.color}`}>{move.color === 'r' ? '红' : '黑'}</span>
                    <span>{JUNGLE_GLYPHS[move.animal]} {coordLabel(move.from)} → {coordLabel(move.to)}</span>
                    {move.capture && <span className="local-move-note">吃</span>}
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

