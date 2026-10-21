import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowLeftRight,
  Check,
  Flag,
  Lightbulb,
  Loader2,
  RotateCcw,
  ShieldCheck,
  Swords,
  Undo2,
} from 'lucide-react';
import {
  PIECE_GLYPHS,
  getKingSquare,
  isInCheck,
  type Color,
} from '@qilian/xiangqi';
import { Board, type BoardUndoAnimation } from '../components/Board';
import { EnginePrepCard } from '../components/EnginePrepCard';
import { Dialog } from '../components/Dialog';
import { MoveList } from '../components/MoveList';
import { useEngineStore } from '../stores/engine';
import { useGameStore, levelLabel, resultLabel } from '../stores/game';
import { useSettingsStore } from '../stores/settings';
import { formatDuration } from '../lib/format';
import type { GameMode, Level } from '../types';

type DialogAction = 'resign' | 'new' | 'switch' | null;

export function PlayPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setupRequested = searchParams.get('setup') === '1';
  const engineReady = useEngineStore((state) => state.engineReady);
  const offlineReady = useEngineStore((state) => state.offlineReady);
  const enginePhase = useEngineStore((state) => state.phase);
  const current = useGameStore((state) => state.current);
  const hydrated = useGameStore((state) => state.hydrated);
  const selected = useGameStore((state) => state.selected);
  const legalTargets = useGameStore((state) => state.legalTargets);
  const notice = useGameStore((state) => state.notice);
  const error = useGameStore((state) => state.error);
  const hint = useGameStore((state) => state.hint);
  const hintLoading = useGameStore((state) => state.hintLoading);
  const aiInFlight = useGameStore((state) => state.aiInFlight);
  const aiError = useGameStore((state) => state.aiError);
  const playSquare = useGameStore((state) => state.playSquare);
  const requestHint = useGameStore((state) => state.requestHint);
  const undo = useGameStore((state) => state.undo);
  const resign = useGameStore((state) => state.resign);
  const startNewGame = useGameStore((state) => state.startNewGame);
  const retryAi = useGameStore((state) => state.retryAi);
  const dismissNotice = useGameStore((state) => state.dismissNotice);
  const settings = useSettingsStore();

  const [dialog, setDialog] = useState<DialogAction>(null);
  const [starting, setStarting] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [captureNotice, setCaptureNotice] = useState<string | null>(null);
  const [undoAnimation, setUndoAnimation] = useState<BoardUndoAnimation | null>(null);

  useEffect(() => {
    if (!undoAnimation) return;
    const timer = window.setTimeout(() => setUndoAnimation(null), 320);
    return () => window.clearTimeout(timer);
  }, [undoAnimation]);
  const seenMoveCountRef = useRef(current?.moves.length ?? 0);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const count = current?.moves.length ?? 0;
    if (count <= seenMoveCountRef.current) {
      seenMoveCountRef.current = count;
      setCaptureNotice(null);
      return;
    }
    seenMoveCountRef.current = count;
    const move = current?.moves[count - 1];
    if (!move?.capturedType) {
      setCaptureNotice(null);
      return;
    }
    const capturedColor = move.color === 'r' ? 'b' : 'r';
    const glyph = (color: Color, type: string) =>
      PIECE_GLYPHS[color][type as keyof (typeof PIECE_GLYPHS)['r']] ?? type;
    setCaptureNotice(
      `${move.color === 'r' ? '红' : '黑'}${glyph(move.color, move.pieceType)} 吃 ${capturedColor === 'r' ? '红' : '黑'}${glyph(capturedColor, move.capturedType)}`,
    );
  }, [current?.id, current?.moves.length]);

  useEffect(() => {
    if (!captureNotice) return;
    const timer = window.setTimeout(() => setCaptureNotice(null), 1800);
    return () => window.clearTimeout(timer);
  }, [captureNotice]);

  useEffect(() => {
    setDialog(null);
    setUndoAnimation(null);
  }, [current?.id]);

  const checked = useMemo(() => {
    if (!current) return null;
    if (!isInCheck(current.position, current.position.turn)) return null;
    return getKingSquare(current.position.board, current.position.turn);
  }, [current]);

  if (!hydrated) {
    return (
      <div className="page loading-page">
        <Loader2 className="spin" size={26} aria-hidden="true" />
        <p>正在读取棋局…</p>
      </div>
    );
  }

  if (!current || setupRequested) {
    return (
      <NewGameSetup
        engineReady={engineReady}
        enginePhase={enginePhase}
        onStart={async (color, level, opponent) => {
          setStarting(true);
          const ok = await startNewGame(color, level, opponent);
          setStarting(false);
          if (ok) navigate('/play', { replace: true });
          return ok;
        }}
        starting={starting}
        initialColor={settings.preferredColor}
        initialLevel={settings.preferredLevel}
        hasActiveGame={Boolean(current && current.phase !== 'finished')}
      />
    );
  }

  const isHuman = current.mode === 'human';
  const playerColor = current.playerColor;
  const aiColor: Color = playerColor === 'r' ? 'b' : 'r';
  const nextPlayerColor: Color = playerColor === 'r' ? 'b' : 'r';
  const orientation: Color =
    settings.boardOrientation === 'auto'
      ? isHuman
        ? 'r'
        : playerColor
      : settings.boardOrientation === 'black'
        ? 'b'
        : 'r';
  const playerTurn = isHuman ? true : current.position.turn === playerColor;
  const interactive = current.phase === 'playing' && (isHuman || playerTurn);
  const lastMove = current.moves.length > 0 ? current.moves[current.moves.length - 1] : null;
  const isFinished = current.phase === 'finished';
  const elapsed = current.elapsedMs + (isFinished ? 0 : now - new Date(current.startedAt).getTime() - current.elapsedMs);
  const lastMoveColor = current.moves[current.moves.length - 1]?.color;
  const canUndo =
    settings.allowUndo &&
    (!checked || settings.allowUndoWhenChecked) &&
    ((current.historyResume && current.moves.length > 0) ||
      ((current.phase === 'playing' || current.phase === 'ai_thinking') &&
        current.moves.length > 0 &&
        (isHuman ||
          lastMoveColor === playerColor ||
          (current.moves.length >= 2 && current.moves[current.moves.length - 2]?.color === playerColor))));

  function handleUndo() {
    if (!current || !canUndo) {
      undo();
      return;
    }
    const last = current.moves[current.moves.length - 1];
    const piece = last ? current.position.board[last.to] : null;
    if (last && piece) {
      setUndoAnimation({
        from: last.from,
        to: last.to,
        piece,
        key: `${last.ucci}-${Date.now()}`,
      });
    }
    undo();
  }

  const statusText = isFinished
    ? resultLabel(current.result, playerColor, current.mode)
    : current.phase === 'ai_thinking'
      ? 'Pikafish 正在思考…'
      : isHuman
        ? `轮到${current.position.turn === 'r' ? '红方' : '黑方'}`
        : playerTurn
          ? '轮到你走'
          : '等待引擎';

  return (
    <div className="page play-page">
      <h1 className="sr-only">人机对局</h1>
      <div className="play-topline">
        <Link to="/" className="back-link">
          <ArrowLeft size={15} aria-hidden="true" />
          返回首页
        </Link>
        <div className="play-topline-right">
          <span className={`mobile-engine-status${engineReady ? ' is-ready' : ''}`}>
            <i aria-hidden="true" />
            {engineReady ? 'AI 引擎' : 'AI 离线'}
          </span>
          <span className="play-meta">
            {isHuman ? '双人对局' : `${levelLabel(current.level)} · 你执${playerColor === 'r' ? '红' : '黑'}`} ·{' '}
            {formatDuration(elapsed)}
          </span>
        </div>
      </div>

      <div className="play-layout">
        <section className="board-column">
          <div className="board-toolbar">
            <div className={`turn-chip${current.phase === 'ai_thinking' ? ' is-thinking' : ''}`} aria-live="polite">
              <span className={`turn-disc ${current.position.turn}`} />
              {statusText}
              {!isFinished && current.phase === 'playing' && (
                <span className="turn-sub">{playerTurn ? '请落子' : '请稍候'}</span>
              )}
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-small"
              onClick={() => {
                if (isHuman) {
                  settings.setBoardOrientation(orientation === 'r' ? 'black' : 'red');
                } else {
                  setDialog('switch');
                }
              }}
              aria-label={isHuman ? '翻转棋盘' : '换边并开始新局'}
              disabled={isHuman ? isFinished : !engineReady || starting}
            >
              <ArrowLeftRight size={15} aria-hidden="true" />
              {isHuman ? '翻转' : '换边'}
            </button>
          </div>

          <Board
            position={current.position}
            orientation={orientation}
            selected={selected}
            legalTargets={legalTargets}
            lastMove={lastMove ? { from: lastMove.from, to: lastMove.to } : null}
            hint={hint}
            checkedSquare={checked}
            checkmate={isFinished && current.result.status === 'win' && current.result.reason === 'checkmate'}
            interactive={interactive}
            undoAnimation={undoAnimation}
            onPoint={playSquare}
          />

          {captureNotice && (
            <div className="capture-banner" role="status">
              <Swords size={17} aria-hidden="true" />
              <span>{captureNotice}</span>
            </div>
          )}

          {checked && !isFinished && (
            <div className="check-banner" role="status">
              <AlertTriangle size={17} aria-hidden="true" />
              {isHuman
                ? `${current.position.turn === 'r' ? '红方' : '黑方'}被将军了。`
                : current.position.turn === playerColor
                  ? '你被将军了。'
                  : '将军！'}
            </div>
          )}

          {(notice || error) && (
            <div className="inline-alert" role="status">
              <span>{notice || error}</span>
              <button type="button" className="text-button" onClick={dismissNotice}>
                知道了
              </button>
            </div>
          )}

          {aiError && (
            <div className="inline-alert inline-alert-error" role="alert">
              <AlertTriangle size={17} aria-hidden="true" />
              <span>{aiError}</span>
              <button type="button" className="text-button" onClick={retryAi}>
                重试
              </button>
            </div>
          )}

          {!engineReady && (
            <div className="engine-inline">
              <EnginePrepCard compact />
            </div>
          )}

          {isFinished && (
            <div className={`result-card result-${current.result.status}`}>
              <div className="result-mark">
                {current.result.status === 'win' && current.result.winner === playerColor ? (
                  <ShieldCheck size={26} aria-hidden="true" />
                ) : (
                  <Flag size={26} aria-hidden="true" />
                )}
              </div>
              <div>
                <span className="eyebrow">棋局结束</span>
                <h2>{resultLabel(current.result, playerColor, current.mode)}</h2>
                <p>
                  {current.moves.length} 手 · {formatDuration(current.elapsedMs)} ·{' '}
                  {isHuman ? '双人对局' : `${levelLabel(current.level)}难度`}
                </p>
              </div>
              <div className="result-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!isHuman && !engineReady}
                  onClick={() => void handleNewGame()}
                >
                  <RotateCcw size={16} aria-hidden="true" />
                  再来一盘
                </button>
                <Link to={`/review/${current.id}`} className="btn btn-ghost">
                  复盘
                </Link>
                <Link to="/play?setup=1" className="btn btn-ghost">
                  调整对手
                </Link>
              </div>
            </div>
          )}



          <p className="board-help">
            点击棋子，再点目标位置；也可用 Tab 聚焦棋格、方向键移动、回车落子。
          </p>
        </section>

        <aside className="play-side">
          <div className="board-controls side-controls">
            <button
              type="button"
              className="control-button"
              disabled={!canUndo}
              onClick={handleUndo}
              title={
                isHuman
                  ? '退一手'
                  : lastMoveColor === playerColor
                    ? '退一手'
                    : '退两步（含机器应手）'
              }
            >
              <Undo2 size={18} aria-hidden="true" />
              <span>悔棋</span>
            </button>
            <button
              type="button"
              className="control-button"
              disabled={!interactive || hintLoading || !engineReady || aiInFlight}
              onClick={() => void requestHint()}
            >
              {hintLoading ? <Loader2 size={18} className="spin" aria-hidden="true" /> : <Lightbulb size={18} aria-hidden="true" />}
              <span>{hintLoading ? '思考中' : '提示'}</span>
            </button>
            <button
              type="button"
              className="control-button"
              disabled={isFinished}
              onClick={() => setDialog('new')}
            >
              <RotateCcw size={18} aria-hidden="true" />
              <span>新局</span>
            </button>
            <button
              type="button"
              className="control-button danger"
              disabled={isFinished}
              onClick={() => setDialog('resign')}
            >
              <Flag size={18} aria-hidden="true" />
              <span>认输</span>
            </button>
          </div>
          <section className="side-card">
            <div className="side-heading">
              <span className="eyebrow">对局</span>
              <span className="side-level">{isHuman ? '双人' : levelLabel(current.level)}</span>
            </div>
            <div className="player-row">
              <div className={`player-avatar ${aiColor === 'r' ? 'red' : 'black'} ${current.position.turn === aiColor ? 'active' : ''}`}>
                {PIECE_GLYPHS[aiColor].K}
              </div>
              <div>
                <strong>{isHuman ? (aiColor === 'r' ? '红方' : '黑方') : 'Pikafish'}</strong>
                <span>{isHuman ? '本地棋手' : `${levelLabel(current.level)}引擎`}</span>
              </div>
              {current.phase === 'ai_thinking' && <Loader2 size={16} className="spin" aria-label="思考中" />}
            </div>
            <div className="vs-line">
              <span />
              <em>VS</em>
              <span />
            </div>
            <div className="player-row">
              <div className={`player-avatar ${playerColor === 'r' ? 'red' : 'black'} ${current.position.turn === playerColor ? 'active' : ''}`}>
                {PIECE_GLYPHS[playerColor].K}
              </div>
              <div>
                <strong>{isHuman ? (playerColor === 'r' ? '红方' : '黑方') : '你'}</strong>
                <span>
                  {isHuman
                    ? '本地棋手'
                    : `执${playerColor === 'r' ? '红' : '黑'} · 本地棋手`}
                </span>
              </div>
              {(isHuman ? current.phase === 'playing' : playerTurn && current.phase === 'playing') && (
                <Check size={16} aria-label="轮到走棋" />
              )}
            </div>
            <div className="side-meta">
              <span>已走 {current.moves.length} 手</span>
              <span>{formatDuration(elapsed)}</span>
            </div>
          </section>

          <section className="side-card move-card">
            <div className="side-heading">
              <span className="eyebrow">棋谱</span>
              <span className="side-level">本局</span>
            </div>
            <MoveList moves={current.moves} emptyText="落子后，棋谱会显示在这里。" />
            {hint && (
              <div className="hint-note">
                <Lightbulb size={15} aria-hidden="true" />
                提示：看棋盘上的金色箭头。
              </div>
            )}
          </section>

          <section className="side-card engine-note">
            <span className="eyebrow">说明</span>
            <p>
              AI 走子由服务端 Pikafish 计算，只发送当前局面，棋谱保存在本机。双人对局与训练可离线使用。
            </p>
            <Link to="/settings#engine" className="text-link">
              引擎状态
            </Link>
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
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                setDialog(null);
                void resign();
              }}
            >
              确认认输
            </button>
          </>
        }
      >
        <p>认输后本局会保存到棋谱，不能再继续落子。</p>
      </Dialog>

      <Dialog
        open={dialog === 'switch'}
        title="换边重开？"
        onClose={() => setDialog(null)}
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setDialog(null)}>
              取消
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!engineReady || starting}
              onClick={() => void handleSwitchSides()}
            >
              {starting ? '正在摆棋…' : '换边开局'}
            </button>
          </>
        }
      >
        <p>
          你会改执{nextPlayerColor === 'r' ? '红' : '黑'}。
          {nextPlayerColor === 'b' ? 'Pikafish 会自动先走。' : '你先走。'}
          若当前棋局已经落子，会以“未完成”保存到棋谱。
        </p>
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
            <button
              type="button"
              className="btn btn-primary"
              disabled={!engineReady}
              onClick={() => {
                setDialog(null);
                void handleNewGame();
              }}
            >
              开始新局
            </button>
          </>
        }
      >
        <p>当前棋局会以“未完成”保存到棋谱，然后按相同执子和难度重新开局。</p>
      </Dialog>
    </div>
  );

  async function handleNewGame() {
    const ok = await startNewGame(current!.playerColor, current!.level, current!.mode);
    if (ok) {
      setDialog(null);
    }
  }

  async function handleSwitchSides() {
    setStarting(true);
    const ok = await startNewGame(nextPlayerColor, current!.level);
    setStarting(false);
    if (ok) setDialog(null);
  }
}

function NewGameSetup({
  engineReady,
  enginePhase,
  onStart,
  starting,
  initialColor,
  initialLevel,
  hasActiveGame,
}: {
  engineReady: boolean;
  enginePhase: string;
  onStart: (color: Color, level: Level, opponent: GameMode) => Promise<boolean>;
  starting: boolean;
  initialColor: Color;
  initialLevel: Level;
  hasActiveGame: boolean;
}) {
  const [opponent, setOpponent] = useState<GameMode>('ai');
  const [color, setColor] = useState<Color>(initialColor);
  const [level, setLevel] = useState<Level>(initialLevel);
  const isHuman = opponent === 'human';

  return (
    <div className="page setup-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={15} aria-hidden="true" />
        返回首页
      </Link>
      <div className="setup-heading">
        <span className="eyebrow">象棋对弈</span>
        <h1>{isHuman ? '两个人，一盘棋' : '和 Pikafish 下一盘'}</h1>
        <p>
          {isHuman
            ? '同屏轮流落子，支持悔棋、翻转和棋谱记录，不需要联网。'
            : '选择一个执子方向与难度。棋局只保存在本机，随时可以回看。'}
        </p>
      </div>

      <div className="setup-grid">
        <section className="panel setup-panel">
          <div className="field">
            <span className="field-label">对手</span>
            <div className="segmented">
              <button type="button" className={opponent === 'ai' ? 'is-selected' : ''} onClick={() => setOpponent('ai')}>
                人机对战
              </button>
              <button
                type="button"
                className={opponent === 'human' ? 'is-selected' : ''}
                onClick={() => setOpponent('human')}
              >
                双人对战
              </button>
            </div>
          </div>

          {!isHuman && (
            <div className="field">
              <span className="field-label">你执哪一边？</span>
              <div className="choice-grid">
                <button
                  type="button"
                  className={`choice-card${color === 'r' ? ' is-selected' : ''}`}
                  onClick={() => setColor('r')}
                >
                  <span className="choice-emblem red">{PIECE_GLYPHS.r.K}</span>
                  <strong>执红先行</strong>
                  <span>你先走，掌握主动</span>
                </button>
                <button
                  type="button"
                  className={`choice-card${color === 'b' ? ' is-selected' : ''}`}
                  onClick={() => setColor('b')}
                >
                  <span className="choice-emblem">{PIECE_GLYPHS.b.K}</span>
                  <strong>执黑后行</strong>
                  <span>先看 AI 如何开局</span>
                </button>
              </div>
            </div>
          )}

          {!isHuman && (
            <div className="field">
              <span className="field-label">难度</span>
              <div className="level-list">
                {([
                  [1, '入门', '更短思考，适合熟悉规则'],
                  [2, '进阶', '默认强度，兼顾棋力与速度'],
                  [3, '挑战', '完整强度，适合认真对弈'],
                ] as const).map(([value, label, desc]) => (
                  <button
                    type="button"
                    key={value}
                    className={`level-row${level === value ? ' is-selected' : ''}`}
                    onClick={() => setLevel(value)}
                  >
                    <span className="level-number">0{value}</span>
                    <span>
                      <strong>{label}</strong>
                      <small>{desc}</small>
                    </span>
                    {level === value && <Check size={18} aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isHuman && (
            <div className="field">
              <span className="field-label">规则</span>
              <ul className="plain-list">
                <li><Check size={15} aria-hidden="true" /> 红方先行，轮流在同屏落子</li>
                <li><Check size={15} aria-hidden="true" /> 可翻转棋盘，方便对坐观看</li>
                <li><Check size={15} aria-hidden="true" /> 悔棋、认输、棋谱记录与人机一致</li>
              </ul>
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary btn-large btn-block"
            disabled={(!isHuman && !engineReady) || starting}
            onClick={() => void onStart(color, level, opponent)}
          >
            <Swords size={19} aria-hidden="true" />
            {starting
              ? '正在摆棋…'
              : isHuman
                ? '开始双人对局'
                : engineReady
                  ? '开始对局'
                  : enginePhase === 'error'
                    ? 'AI 引擎不可用'
                    : '等待 AI 引擎'}
          </button>
          <p className="setup-footnote">
            {hasActiveGame && '开始新局会把当前未完成棋局保存为“未完成”。'}
            {hasActiveGame && ' '}
            {isHuman
              ? '双人模式红先；随时可以在设置里打开声音与震动反馈。'
              : engineReady
                ? '执黑时，Pikafish 会自动先走。'
                : '人机对弈需要联网获取 AI 走子；准备完成后按钮会自动可用。'}
          </p>
        </section>

        <aside className="setup-side">
          <EnginePrepCard />
          <section className="side-card setup-about">
            <span className="eyebrow">这一局</span>
            <ul className="plain-list">
              <li><Check size={15} aria-hidden="true" /> 无账号、无匹配等待</li>
              <li><Check size={15} aria-hidden="true" /> 每步自动保存到本机</li>
              <li><Check size={15} aria-hidden="true" /> 结束可回放、可继续练</li>
              <li><Check size={15} aria-hidden="true" /> AI 只看当前局面，不保存棋谱</li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
