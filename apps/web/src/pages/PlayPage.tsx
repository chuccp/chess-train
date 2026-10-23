import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
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
  X,
} from 'lucide-react';
import {
  PIECE_GLYPHS,
  generateLegalMoves,
  getKingSquare,
  isInCheck,
  type Color,
} from '@qilian/xiangqi';
import { Board, type BoardUndoAnimation } from '../components/Board';
import { Robot } from '../components/Robot';
import { EnginePrepCard } from '../components/EnginePrepCard';
import { Dialog } from '../components/Dialog';
import { useEngineStore } from '../stores/engine';
import { useGameStore, levelLabel, resultLabel } from '../stores/game';
import { useSettingsStore } from '../stores/settings';
import { formatDuration } from '../lib/format';
import type { GameMode, Level } from '../types';

type DialogAction = 'resign' | 'new' | null;

const MOVE_TIPS = '点击棋子，再点目标位置；也可用 Tab 聚焦棋格、方向键移动、回车落子。';

function ComicTip({
  id,
  role,
  notice = false,
  closeLabel,
  onClose,
  children,
}: {
  id?: string;
  role: 'status' | 'note';
  notice?: boolean;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className={`comic-tip${notice ? ' is-notice' : ''}`}
      id={id}
      role={role}
      aria-live={role === 'status' ? 'polite' : undefined}
    >
      <svg className="comic-tip-tail" viewBox="0 0 16 34" aria-hidden="true">
        <path className="comic-tip-tail-fill" d="M16 0 L16 12 L2 30 Z" />
        <path className="comic-tip-tail-line" d="M14 12 L2 30 L14 0" />
      </svg>
      <p>{children}</p>
      <button type="button" className="comic-tip-close" onClick={onClose} aria-label={closeLabel}>
        <X size={13} aria-hidden="true" />
      </button>
    </div>
  );
}

export function PlayPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setupRequested = searchParams.get('setup') === '1';
  const engineReady = useEngineStore((state) => state.engineReady);
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
  const aiThinkingSince = useGameStore((state) => state.aiThinkingSince);
  const aiError = useGameStore((state) => state.aiError);
  const playSquare = useGameStore((state) => state.playSquare);
  const toggleManualBan = useGameStore((state) => state.toggleManualBan);
  const manualBans = useGameStore((state) => state.current?.manualBans);
  const requestHint = useGameStore((state) => state.requestHint);
  const undo = useGameStore((state) => state.undo);
  const resign = useGameStore((state) => state.resign);
  const startNewGame = useGameStore((state) => state.startNewGame);
  const switchSides = useGameStore((state) => state.switchSides);
  const retryAi = useGameStore((state) => state.retryAi);
  const dismissNotice = useGameStore((state) => state.dismissNotice);
  const settings = useSettingsStore();

  const [dialog, setDialog] = useState<DialogAction>(null);
  const [starting, setStarting] = useState(false);
  const [banMode, setBanMode] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [undoAnimation, setUndoAnimation] = useState<BoardUndoAnimation | null>(null);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const [tipsOpen, setTipsOpen] = useState(true);
  const [robotSay, setRobotSay] = useState<string | null>(null);
  const toastIdRef = useRef(0);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // 操作提示展示一会儿自动收起，避免一直盖住对局面板
  useEffect(() => {
    if (!tipsOpen || robotSay) return;
    const timer = window.setTimeout(() => setTipsOpen(false), 6000);
    return () => window.clearTimeout(timer);
  }, [tipsOpen, robotSay, current?.id]);

  // 终局时收起机器人提示，把注意力留给结果浮层
  useEffect(() => {
    if (current?.phase !== 'finished') return;
    setTipsOpen(false);
    setRobotSay(null);
  }, [current?.phase]);

  // 将死时先让棋盘播完「将死」动画，再浮出结果面板
  const [resultVisible, setResultVisible] = useState(false);
  useEffect(() => {
    if (!current || current.phase !== 'finished') {
      setResultVisible(false);
      return;
    }
    const checkmate = current.result.status === 'win' && current.result.reason === 'checkmate';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = checkmate && !reduced ? 1950 : 0;
    if (delay === 0) {
      setResultVisible(true);
      return;
    }
    const timer = window.setTimeout(() => setResultVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [current?.id, current?.phase, current?.result]);

  // 双人模式：刚吃子的那一方冒个对话气泡
  const [captureSay, setCaptureSay] = useState<{ side: Color; glyph: string; color: Color } | null>(null);
  const captureSeenRef = useRef(current?.moves.length ?? 0);
  useEffect(() => {
    const count = current?.moves.length ?? 0;
    if (count <= captureSeenRef.current) {
      captureSeenRef.current = count;
      setCaptureSay(null);
      return;
    }
    captureSeenRef.current = count;
    if (current?.mode !== 'human') {
      setCaptureSay(null);
      return;
    }
    const move = current.moves[count - 1];
    if (!move?.capturedType) {
      setCaptureSay(null);
      return;
    }
    const capturedColor: Color = move.color === 'r' ? 'b' : 'r';
    const glyph =
      PIECE_GLYPHS[capturedColor][move.capturedType as keyof (typeof PIECE_GLYPHS)['r']] ?? move.capturedType;
    setCaptureSay({ side: move.color, glyph, color: capturedColor });
    const timer = window.setTimeout(() => setCaptureSay(null), 2400);
    return () => window.clearTimeout(timer);
  }, [current?.moves.length, current?.id]);

  useEffect(() => {
    if (!undoAnimation) return;
    const timer = window.setTimeout(() => setUndoAnimation(null), 320);
    return () => window.clearTimeout(timer);
  }, [undoAnimation]);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setDialog(null);
    setUndoAnimation(null);
    setTipsOpen(true);
  }, [current?.id]);

  const checked = useMemo(() => {
    if (!current) return null;
    if (!isInCheck(current.position, current.position.turn)) return null;
    return getKingSquare(current.position.board, current.position.turn);
  }, [current]);

  // 被将军也由机器人来说
  const checkMessage =
    current && current.phase !== 'finished' && checked !== null
      ? current.mode === 'human'
        ? `${current.position.turn === 'r' ? '红方' : '黑方'}被将军了。`
        : current.position.turn === current.playerColor
          ? '你被将军了。'
          : '将军！'
      : null;

  // 走子/悔棋/将军等提示由机器人说出来，不再占用棋盘下方的位置
  const robotMessage = notice || error || checkMessage;
  useEffect(() => {
    if (!robotMessage) {
      setRobotSay(null);
      return;
    }
    if (current?.mode === 'human') return;
    setRobotSay(robotMessage);
    setTipsOpen(false);
    const timer = window.setTimeout(() => {
      setRobotSay(null);
      dismissNotice();
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [robotMessage, current?.mode, dismissNotice]);

  // 只提示“最新一步”这枚棋子接下来能吃的子，短暂显示后自动消失
  const [capturableSquares, setCapturableSquares] = useState<number[]>([]);
  useEffect(() => {
    if (!current || current.phase === 'finished' || current.moves.length === 0) {
      setCapturableSquares([]);
      return;
    }
    const last = current.moves[current.moves.length - 1];
    if (!last) {
      setCapturableSquares([]);
      return;
    }
    const probe = { ...current.position, turn: last.color };
    const targets = new Set<number>();
    for (const move of generateLegalMoves(probe)) {
      if (move.from === last.to && move.captured && move.captured.type !== 'K') targets.add(move.to);
    }
    setCapturableSquares([...targets]);
    if (targets.size === 0) return;
    const timer = window.setTimeout(() => setCapturableSquares([]), 2400);
    return () => window.clearTimeout(timer);
  }, [current?.moves.length, current?.position, current?.phase]);

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
        hasActiveGame={Boolean(current && current.phase !== 'finished')}
      />
    );
  }

  const isHuman = current.mode === 'human';
  const playerColor = current.playerColor;
  const aiColor: Color = playerColor === 'r' ? 'b' : 'r';
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
  const resultTone =
    current.result.status === 'win'
      ? current.result.winner === playerColor
        ? ' is-win'
        : ' is-loss'
      : ' is-draw';
  const elapsed = current.elapsedMs + (isFinished ? 0 : now - new Date(current.startedAt).getTime() - current.elapsedMs);
  const metaText = `${isHuman ? '双人对局' : `${levelLabel(settings.preferredLevel)} · 你执${playerColor === 'r' ? '红' : '黑'}`} · ${formatDuration(elapsed)}`;
  const lastMoveColor = current.moves[current.moves.length - 1]?.color;
  const canUndo =
    settings.allowUndo &&
    current.moves.length > 0 &&
    (isFinished
      ? // 终局（绝杀/认输/和棋）随时可以悔棋，退回去继续下
        true
      : (!checked || settings.allowUndoWhenChecked) &&
        (isHuman ||
          lastMoveColor === playerColor ||
          (current.moves.length >= 2 && current.moves[current.moves.length - 2]?.color === playerColor)));

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

  const thinkingSeconds = aiThinkingSince
    ? Math.max(0, Math.min(10, Math.floor((now - aiThinkingSince) / 1000)))
    : 0;
  const statusText = isFinished
    ? resultLabel(current.result, playerColor, current.mode)
    : current.phase === 'ai_thinking'
      ? `AI 思考中 ${thinkingSeconds}s`
      : isHuman
        ? `轮到${current.position.turn === 'r' ? '红方' : '黑方'}`
        : playerTurn
          ? '轮到你走'
          : '等待 AI';

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
            {engineReady ? '在线 AI' : 'AI 未连接'}
          </span>
          <span className="play-meta play-topline-meta">{metaText}</span>
        </div>
      </div>

      <div className="play-layout">
          <div className="board-toolbar">
            <div className={`turn-chip${current.phase === 'ai_thinking' ? ' is-thinking' : ''}`} aria-live="polite">
              <span className={`turn-disc ${current.position.turn}`} />
              {banMode ? '禁着模式' : statusText}
              {!isFinished && (banMode ? (
                <span className="turn-sub">点格子标记/解除禁点</span>
              ) : current.phase === 'playing' && (
                <span className="turn-sub">{playerTurn ? '请落子' : '请稍候'}</span>
              ))}
            </div>
            <span className="play-meta board-meta">{metaText}</span>
            <button
              type="button"
              className="btn btn-ghost btn-small"
              onClick={() => {
                if (isHuman) {
                  settings.setBoardOrientation(orientation === 'r' ? 'black' : 'red');
                } else {
                  const nextColor = switchSides();
                  if (nextColor) {
                    toastIdRef.current += 1;
                    setToast({
                      id: toastIdRef.current,
                      text: `已换成执${nextColor === 'r' ? '红' : '黑'}，当前棋局继续`,
                    });
                  }
                }
              }}
              aria-label={isHuman ? '翻转棋盘' : '换边，换成另一方继续当前棋局'}
              title={isHuman ? '翻转棋盘' : '换成另一方，当前棋局继续'}
              disabled={isHuman ? isFinished : isFinished || !engineReady}
            >
              <ArrowLeftRight size={15} aria-hidden="true" />
              {isHuman ? '翻转' : '换边'}
            </button>
          </div>
        <section className="board-column">

          <Board
            position={current.position}
            orientation={orientation}
            selected={selected}
            legalTargets={legalTargets}
            lastMove={lastMove ? { from: lastMove.from, to: lastMove.to } : null}
            hint={hint}
            bannedPoints={manualBans ?? []}
            checkedSquare={checked}
            capturableSquares={capturableSquares}
            checkmate={isFinished && current.result.status === 'win' && current.result.reason === 'checkmate'}
            interactive={banMode ? !isFinished : interactive}
            undoAnimation={undoAnimation}
            onPoint={banMode ? toggleManualBan : playSquare}
          />

          {toast && (
            <div className="board-toast" role="status" aria-live="polite" key={toast.id}>
              <span className="board-toast-pill">
                <ArrowLeftRight size={15} aria-hidden="true" />
                <span>{toast.text}</span>
              </span>
            </div>
          )}

          {resultVisible && isFinished && (
            <div className="board-result-layer">
              <div className={`board-result${resultTone}`} role="status" aria-live="polite">
                <div className="board-result-head">
                  <span className="board-result-mark" aria-hidden="true">
                    {current.result.status === 'win' && current.result.winner === playerColor ? (
                      <ShieldCheck size={20} />
                    ) : (
                      <Flag size={20} />
                    )}
                  </span>
                  <div className="board-result-copy">
                    <strong>{resultLabel(current.result, playerColor, current.mode)}</strong>
                    <span>
                      {current.moves.length} 手 · {formatDuration(current.elapsedMs)} ·{' '}
                      {isHuman ? '双人对局' : `${levelLabel(settings.preferredLevel)}难度`}
                    </span>
                  </div>
                </div>
                <div className="board-result-actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-small"
                    disabled={!isHuman && !engineReady}
                    onClick={() => void handleNewGame()}
                  >
                    <RotateCcw size={15} aria-hidden="true" />
                    再来一盘
                  </button>
                  <Link to={`/review/${current.id}`} className="btn btn-ghost btn-small">
                    复盘
                  </Link>
                  <Link to="/play?setup=1" className="btn btn-ghost btn-small">
                    调整对手
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 棋盘下方的提示与横幅。结构上独立于棋盘的网格行，PC 侧栏才能与棋盘严格等高。 */}
        <div className="board-under">
          {isHuman && checked !== null && !isFinished && (
            <div className="check-banner" role="status">
              <AlertTriangle size={17} aria-hidden="true" />
              {current.position.turn === 'r' ? '红方' : '黑方'}被将军了。
            </div>
          )}

          {/* 双人模式没有机器人，仍用棋盘下方的提示条；人机模式由机器人气泡来说 */}
          {isHuman && (notice || error) && (
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

          {isHuman && <p className="board-help">{MOVE_TIPS}</p>}
        </div>

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
              <span>{hintLoading ? '思考中' : hint ? '换一个' : '提示'}</span>
            </button>
            <button
              type="button"
              className={`control-button${banMode ? ' is-active' : ''}`}
              disabled={isFinished}
              onClick={() => setBanMode((value) => !value)}
              title="标记 AI 与提示都不会走的位置"
            >
              <ShieldCheck size={18} aria-hidden="true" />
              <span>禁着</span>
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
              className="control-button"
              onClick={() => navigate('/play?setup=1')}
              title="换成人人对战或更换 AI 难度"
            >
              <ArrowLeftRight size={18} aria-hidden="true" />
              <span>换对手</span>
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
              <span className="side-level">{isHuman ? '双人' : levelLabel(settings.preferredLevel)}</span>
            </div>
            <div className="player-block">
              <div className="player-row">
                {isHuman ? (
                  <div className={`player-avatar ${aiColor === 'r' ? 'red' : 'black'} ${current.position.turn === aiColor ? 'active' : ''}`}>
                    {PIECE_GLYPHS[aiColor].K}
                  </div>
                ) : (
                  <button
                    type="button"
                    className="robot-speak"
                    onClick={() => {
                      if (robotSay) {
                        setRobotSay(null);
                        setTipsOpen(false);
                        dismissNotice();
                        return;
                      }
                      setTipsOpen((open) => !open);
                    }}
                    aria-label="查看操作提示"
                    aria-expanded={Boolean(robotSay) || tipsOpen}
                    aria-controls="play-tips"
                    title="操作提示"
                  >
                    <Robot inline thinking={current.phase === 'ai_thinking' || hintLoading} />
                    <span className="robot-speak-badge" aria-hidden="true">?</span>
                  </button>
                )}
                <div>
                  <strong>{isHuman ? (aiColor === 'r' ? '红方' : '黑方') : '在线 AI'}</strong>
                  <span>
                    {isHuman
                      ? '本地棋手'
                      : `执${aiColor === 'r' ? '红' : '黑'} · ${levelLabel(settings.preferredLevel)} AI`}
                  </span>
                </div>
                {current.phase === 'ai_thinking' && <Loader2 size={16} className="spin" aria-label="思考中" />}
              </div>
              {!isHuman && (robotSay || tipsOpen) && (
                <ComicTip
                  id="play-tips"
                  role={robotSay ? 'status' : 'note'}
                  notice={Boolean(robotSay)}
                  closeLabel={robotSay ? '关闭提示' : '收起操作提示'}
                  onClose={() => {
                    setRobotSay(null);
                    setTipsOpen(false);
                    dismissNotice();
                  }}
                >
                  {robotSay ?? MOVE_TIPS}
                </ComicTip>
              )}
              {isHuman && captureSay?.side === aiColor && (
                <ComicTip role="status" closeLabel="关闭提示" onClose={() => setCaptureSay(null)}>
                  吃你一个
                  <span className={`capture-glyph ${captureSay.color === 'r' ? 'red' : 'black'}`}>
                    {captureSay.glyph}
                  </span>
                </ComicTip>
              )}
            </div>
            <div className="vs-line">
              <span />
              <em>VS</em>
              <span />
            </div>
            <div className="player-block">
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
              {isHuman && captureSay?.side === playerColor && (
                <ComicTip role="status" closeLabel="关闭提示" onClose={() => setCaptureSay(null)}>
                  吃你一个
                  <span className={`capture-glyph ${captureSay.color === 'r' ? 'red' : 'black'}`}>
                    {captureSay.glyph}
                  </span>
                </ComicTip>
              )}
            </div>
            <div className="side-meta">
              <span>已走 {current.moves.length} 手</span>
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
        <p>当前棋局会以“未完成”保存到棋谱，然后按相同执子、按设置里的默认难度重新开局。</p>
      </Dialog>
    </div>
  );

  async function handleNewGame() {
    // 新局跟随设置里的默认难度，避免沿用旧局难度把设置覆盖回去
    const ok = await startNewGame(current!.playerColor, settings.preferredLevel, current!.mode);
    if (ok) {
      setDialog(null);
    }
  }
}

function NewGameSetup({
  engineReady,
  enginePhase,
  onStart,
  starting,
  initialColor,
  hasActiveGame,
}: {
  engineReady: boolean;
  enginePhase: string;
  onStart: (color: Color, level: Level, opponent: GameMode) => Promise<boolean>;
  starting: boolean;
  initialColor: Color;
  hasActiveGame: boolean;
}) {
  const [opponent, setOpponent] = useState<GameMode>('ai');
  const [color, setColor] = useState<Color>(initialColor);
  const settingsStore = useSettingsStore();
  const level = settingsStore.preferredLevel;
  const isHuman = opponent === 'human';

  return (
    <div className="page setup-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={15} aria-hidden="true" />
        返回首页
      </Link>
      <div className="setup-heading">
        <span className="eyebrow">象棋对弈</span>
        <h1>{isHuman ? '两个人，一盘棋' : '和 AI 下一盘'}</h1>
        <p>
          {isHuman
            ? '同屏轮流落子，支持悔棋、翻转和棋谱记录。'
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
                    onClick={() => settingsStore.setPreferredLevel(value)}
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
                    ? '在线 AI 不可用'
                    : '等待在线 AI'}
          </button>
          <p className="setup-footnote">
            {hasActiveGame && '开始新局会把当前未完成棋局保存为“未完成”。'}
            {hasActiveGame && ' '}
            {isHuman
              ? '双人模式红先；随时可以在设置里打开声音与震动反馈。'
              : engineReady
                ? '执黑时，AI 会自动先走。'
                : '准备完成后按钮会自动可用。'}
          </p>
        </section>

        <aside className="setup-side">
          <EnginePrepCard showReady={false} />
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
