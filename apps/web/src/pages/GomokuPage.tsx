import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Flag, Loader2, RotateCcw, ShieldCheck, Undo2 } from 'lucide-react';
import {
  GOMOKU_SIZE,
  createGomokuInitial,
  oppositeGomokuColor,
  placeGomokuStone,
  type GomokuColor,
  type GomokuState,
} from '../games/gomoku';
import { GomokuBoard } from '../components/GomokuBoard';
import { BoardToast } from '../components/BoardToast';
import { Dialog } from '../components/Dialog';
import { GameBoardToolbar } from '../components/GameBoardToolbar';
import { OpponentPicker, type OpponentMode } from '../components/OpponentPicker';
import { GameEngineStatus, PlayToplineRight } from '../components/PlayToplineRight';
import { gomokuPosition, gridPositionKey, prunePlacementBans, requestGridMove } from '../engine/adapters';
import { useAiTurn } from '../lib/useAiTurn';
import { formatDuration } from '../lib/format';
import { useSettingsStore } from '../stores/settings';

type DialogAction = 'new' | 'resign' | null;
type AiReply = { index?: number; from?: number; to?: number };

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
  mode: OpponentMode;
  level: 1 | 2 | 3;
  /** 手动禁点：AI 不会落子的格子下标 */
  manualBans?: number[];
  /** 局面键 → AI 曾走过的着法；同局面重试时禁掉，换思路 */
  aiReplies?: Record<string, AiReply[]>;
}

const STORAGE_KEY = 'qilian.local-gomoku.v1';
/** 人机模式：你执黑先行，AI 执白。 */
const HUMAN_COLOR: GomokuColor = 'b';
const AI_COLOR: GomokuColor = 'w';
const AI_TIME_MS: Record<1 | 2 | 3, number> = { 1: 10_000, 2: 10_000, 3: 10_000 }; // SSE 思考，上限 10s

function freshGame(mode: OpponentMode = 'ai', level: 1 | 2 | 3 = 2): LocalGomoku {
  return { state: createGomokuInitial(), moves: [], startedAt: new Date().toISOString(), mode, level };
}

function loadGame(requestedMode?: OpponentMode): LocalGomoku {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshGame(requestedMode);
    const saved = JSON.parse(raw) as LocalGomoku;
    if (!saved?.state || saved.state.board?.length !== GOMOKU_SIZE * GOMOKU_SIZE || !Array.isArray(saved.moves)) {
      return freshGame(requestedMode);
    }
    const savedMode: OpponentMode = saved.mode === 'local' ? 'local' : 'ai';
    if (requestedMode && requestedMode !== savedMode) {
      return freshGame(requestedMode, saved.level);
    }
    return {
      ...saved,
      mode: savedMode,
      level: saved.level === 1 || saved.level === 3 ? saved.level : 2,
    };
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
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedMode = searchParams.get('mode') === 'local'
    ? 'local'
    : searchParams.get('mode') === 'ai'
      ? 'ai'
      : undefined;
  const [game, setGame] = useState<LocalGomoku>(() => loadGame(requestedMode));
  const [message, setMessage] = useState<string | null>(null);
  const [dialog, setDialog] = useState<DialogAction>(null);
  const [now, setNow] = useState(Date.now());
  const [aiThinking, setAiThinking] = useState(false);
  // 难度全局即时生效：设置里改了立刻影响本局 AI，不用开新局
  const preferredLevel = useSettingsStore((s) => s.preferredLevel);
  const [banMode, setBanMode] = useState(false);

  const finished = game.state.status.status !== 'playing';
  const isAi = game.mode === 'ai';
  const elapsed = new Date(game.endedAt ?? now).getTime() - new Date(game.startedAt).getTime();
  const turnName = game.state.turn === 'b' ? '黑方' : '白方';
  const winningLine = game.state.status.status === 'win' ? game.state.status.line : [];
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
      const position = gomokuPosition(game.state);
      const positionKey = gridPositionKey(position);
      const bans = [
        ...(game.manualBans ?? []).map((index) => ({ index })),
        ...(game.aiReplies?.[positionKey] ?? []),
      ];
      const move = await requestGridMove(
        position,
        preferredLevel,
        AI_TIME_MS[preferredLevel],
        prunePlacementBans(position.board, bans),
      );
      if (move.kind !== 'place') throw new Error('AI 返回的着法无法识别');
      setGame((previous) => {
        const next = placeGomokuStone(previous.state, move.index);
        if (next === previous.state) return previous;
        return {
          ...previous,
          state: next,
          endedAt: next.status.status === 'playing' ? undefined : new Date().toISOString(),
          moves: [...previous.moves, { index: move.index, color: AI_COLOR, ply: previous.moves.length + 1 }],
          aiReplies: {
            ...(previous.aiReplies ?? {}),
            [positionKey]: [...(previous.aiReplies?.[positionKey] ?? []), { index: move.index }],
          },
        };
      });
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
    setMessage(banned ? `已解除 ${pointLabel(index)}` : `已禁位置 ${pointLabel(index)}`);
  }

  function play(index: number) {
    if (finished || (isAi && game.state.turn !== HUMAN_COLOR) || aiThinking) return;
    if (game.state.board[index]) {
      setMessage('这个交叉点已经有棋子了。');
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
    if (game.moves.length === 0) return;
    // 人机模式：若最后一手是 AI 走的，连退两手把回合还给玩家。
    const removeCount = isAi && game.moves[game.moves.length - 1]?.color === AI_COLOR ? 2 : 1;
    const keep = game.moves.slice(0, Math.max(0, game.moves.length - removeCount));
    let state = createGomokuInitial();
    for (const move of keep) {
      state = placeGomokuStone(state, move.index);
    }
    setGame((previous) => ({
      ...previous,
      state,
      moves: keep,
      endedAt: undefined,
    }));
    setMessage(null);
  }

  function changeMode(mode: OpponentMode) {
    if (mode === game.mode) return;
    setGame(freshGame(mode, preferredLevel));
    setSearchParams({ mode }, { replace: true });
    setMessage(null);
  }

  function changeLevel(level: 1 | 2 | 3) {
    useSettingsStore.getState().setPreferredLevel(level);
  }

  function resign() {
    setGame((previous) => ({
      ...previous,
      state: {
        ...previous.state,
        status: {
          status: 'win',
          // 人机模式玩家认输；双人模式行棋方认输。
          winner: previous.mode === 'ai' ? AI_COLOR : oppositeGomokuColor(previous.state.turn),
          line: [],
          reason: 'resign',
        },
      },
      endedAt: new Date().toISOString(),
    }));
    setDialog(null);
  }

  function newGame() {
    setGame(freshGame(game.mode, preferredLevel));
    setMessage(null);
    setDialog(null);
  }

  return (
    <div className="page play-page local-game-page">
      <h1 className="sr-only">五子棋</h1>
      <GameEngineStatus engine={isAi ? 'local' : null} />

      <div className="play-topline">
        <Link to="/local" className="back-link">
          <ArrowLeft size={15} aria-hidden="true" />
          其它棋类
        </Link>
        <PlayToplineRight
          engine={isAi ? 'local' : null}
        />
      </div>

      <div className="play-layout local-game-layout">
        <section className="board-column">
          <GameBoardToolbar
            elapsedMs={elapsed}
            actions={<span className="local-game-rule-chip">15 × 15 · 黑先</span>}
          >
            <div className={`turn-chip${aiThinking ? ' is-thinking' : ''}`} aria-live="polite">
              <span className={`turn-disc ${game.state.turn === 'b' ? 'b' : 'w'}`} />
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
                <span className="turn-sub">{banMode ? '点格子标记/解除禁点' : '先连成五子的一方获胜'}</span>
              )}
            </div>
          </GameBoardToolbar>

          <div className="board-frame">
            <GomokuBoard
              state={game.state}
              winningLine={winningLine}
              lastMove={game.state.lastMove}
              disabled={banMode ? finished || aiThinking : finished || aiThinking || (isAi && game.state.turn === AI_COLOR)}
              onPoint={banMode ? toggleBan : play}
            />
            <BoardToast message={message} tone="error" onDismiss={() => setMessage(null)} />
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
          </div>

          <p className="board-help">点击空交叉点落子；横、竖、斜任意方向先连成五子即胜。</p>
        </section>

        <aside className="play-side">
          <div className="board-controls side-controls">
            <button
              type="button"
              className="control-button"
              disabled={game.moves.length === 0}
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
              title="标记 AI 不会走的位置"
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
              <span className="eyebrow">五子棋</span>
              <span className="side-level">{isAi ? '人机' : '双人'}</span>
            </div>
            <OpponentPicker
              mode={game.mode}
              level={preferredLevel}
              modeLocked={modeLocked}
              onMode={changeMode}
              onLevel={changeLevel}
            />
            <div className="player-row">
              <div className={`player-avatar black ${game.state.turn === 'b' ? 'active' : ''}`}>黑</div>
              <div>
                <strong>{isAi ? '你' : '黑方'}</strong>
                <span>{isAi ? '执黑 · 先行' : '本机棋手 · 先行'}</span>
              </div>
            </div>
            <div className="vs-line"><span /><em>VS</em><span /></div>
            <div className="player-row">
              <div className={`player-avatar ${game.state.turn === 'w' ? 'active' : ''}`}>白</div>
              <div>
                <strong>{isAi ? 'AI' : '白方'}</strong>
                <span>{isAi ? `AI · ${preferredLevel === 1 ? '入门' : preferredLevel === 2 ? '进阶' : '挑战'}` : '本机棋手 · 后行'}</span>
              </div>
              {isAi && aiThinking && <Loader2 size={16} className="spin" aria-label="思考中" />}
            </div>
            <div className="side-meta">
              <span>已走 {game.moves.length} 手</span>
              <span>{formatDuration(elapsed)}</span>
            </div>
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
