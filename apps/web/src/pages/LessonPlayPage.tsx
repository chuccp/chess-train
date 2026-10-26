import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Eye,
  ExternalLink,
  Lightbulb,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  Timer,
  Undo2,
} from 'lucide-react';
import {
  applyMove,
  evaluateBoard,
  generateLegalMoves,
  getKingSquare,
  isInCheck,
  parseFen,
  parseUcci,
  pieceAt,
  type Color,
  type Position,
} from '@qilian/xiangqi';
import {
  lessonById,
  nextTrainingItem,
  trainingKindLabels,
} from '@qilian/content';
import { Board } from '../components/Board';
import { BoardToast } from '../components/BoardToast';
import { getTrainingProgress, saveTrainingProgress } from '../lib/storage';
import { formatDuration } from '../lib/format';
import { playCue, vibrate } from '../lib/feedback';
import { chooseTrainingDefense } from '../lib/trainingOpponent';
import { useSettingsStore } from '../stores/settings';
import type { TrainingProgress } from '../types';

interface LessonPlayPageProps {
  kind: 'endgame' | 'opening';
}

type WinReason = 'checkmate' | 'stalemate';
type OpeningPhase = 'intro' | 'watching' | 'playing';

interface LessonUndoPoint {
  position: Position;
  ply: number;
  freeMode: boolean;
  deviationPending: boolean;
  freeUsed: number;
  failed: boolean;
  attempts: number;
  lastMove: { from: number; to: number } | null;
}

const OPENING_DEVIATION_MESSAGE =
  '这步不在主线。可以悔棋后点击提示获取下一步；继续走棋将进入自由对弈。';
const OPENING_FREE_MODE_MESSAGE =
  '已进入自由对弈模式，后续按人机对弈方式继续。';

function positionAt(fen: string, moves: string[], count: number): Position {
  let position = parseFen(fen);
  for (let index = 0; index < count; index += 1) {
    const ucci = moves[index];
    if (!ucci) break;
    const parsed = parseUcci(ucci);
    if (!parsed) break;
    const result = applyMove(position, parsed.from, parsed.to);
    if (!result.ok) break;
    position = result.position;
  }
  return position;
}

export function LessonPlayPage({ kind }: LessonPlayPageProps) {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const lesson = lessonById(kind, id);
  const settings = useSettingsStore();

  const [lineId, setLineId] = useState(lesson?.lines[0]?.id ?? '');
  const [ply, setPly] = useState(0);
  const [position, setPosition] = useState<Position | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [targets, setTargets] = useState<number[]>([]);
  const [lastMove, setLastMove] = useState<{ from: number; to: number } | null>(null);
  const [hint, setHint] = useState<{ from: number; to: number } | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [completedByWin, setCompletedByWin] = useState(false);
  const [completedReason, setCompletedReason] = useState<WinReason | null>(null);
  const [freeMode, setFreeMode] = useState(false);
  const [deviationPending, setDeviationPending] = useState(false);
  const [freeUsed, setFreeUsed] = useState(0);
  const [failed, setFailed] = useState(false);
  const [autoMoving, setAutoMoving] = useState(false);
  const [openingPhase, setOpeningPhase] = useState<OpeningPhase>('intro');
  const [openingRound, setOpeningRound] = useState<Color>('r');
  const [openingWatchPaused, setOpeningWatchPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [loadedProgress, setLoadedProgress] = useState<TrainingProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [undoPoints, setUndoPoints] = useState<LessonUndoPoint[]>([]);
  const startRef = useRef(Date.now());
  const completedElapsedRef = useRef(0);
  const initializedRef = useRef('');

  const line = lesson?.lines.find((item) => item.id === lineId) ?? lesson?.lines[0];
  const moves = line?.moves ?? [];
  const total = moves.length;
  const userColor: Color = kind === 'opening' ? openingRound : lesson?.userColor ?? 'r';

  useEffect(() => {
    if (!lesson) {
      setLoading(false);
      return;
    }
    const defaultLine = lesson.lines[0];
    setLineId(defaultLine?.id ?? '');
    setPly(0);
    setPosition(defaultLine ? parseFen(lesson.fen) : null);
    setSelected(null);
    setTargets([]);
    setLastMove(null);
    setHint(null);
    setMessage(null);
    setAttempts(0);
    setHintsUsed(0);
    setCompleted(false);
    setCompletedByWin(false);
    setCompletedReason(null);
    setFreeMode(false);
    setDeviationPending(false);
    setFreeUsed(0);
    setFailed(false);
    setOpeningPhase('intro');
    setOpeningRound('r');
    setOpeningWatchPaused(false);
    setUndoPoints([]);
    setElapsed(0);
    startRef.current = Date.now();
    completedElapsedRef.current = 0;
    initializedRef.current = '';
    setLoading(true);

    let alive = true;
    void getTrainingProgress(`${kind}:${lesson.id}`).then((record) => {
      if (!alive) return;
      setLoadedProgress(record);
      if (
        record?.status === 'in_progress' &&
        record.lineId &&
        (record.ply > 0 || (kind === 'opening' && record.openingRound === 'b'))
      ) {
        const savedLine = lesson.lines.find((item) => item.id === record.lineId);
        if (savedLine && savedLine.moves.length >= record.ply) {
          const savedRound = kind === 'opening' ? record.openingRound ?? 'r' : lesson.userColor;
          setLineId(savedLine.id);
          setOpeningRound(savedRound);
          setOpeningPhase(kind === 'opening' ? 'playing' : 'intro');
          setPly(record.ply);
          setPosition(positionAt(lesson.fen, savedLine.moves.map((move) => move.ucci), record.ply));
          setAttempts(record.attempts);
          setHintsUsed(record.hintsUsed);
          setLastMove(
            record.ply > 0
              ? (() => {
                  const ucci = savedLine.moves[record.ply - 1]?.ucci;
                  const parsed = ucci ? parseUcci(ucci) : null;
                  return parsed ? { from: parsed.from, to: parsed.to } : null;
                })()
              : null,
          );
        }
      }
      initializedRef.current = lesson.id;
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [kind, lesson]);

  useEffect(() => {
    if (completed || (kind === 'opening' && openingPhase === 'intro')) return;
    const timer = window.setInterval(() => setElapsed(Date.now() - startRef.current), 1000);
    return () => window.clearInterval(timer);
  }, [completed, kind, openingPhase]);

  // Follow the verified script on the main line. If the user leaves the book,
  // use a deterministic, rules-validated defensive search for the opponent.
  useEffect(() => {
    if (!lesson || !line || !position || completed || failed || loading) return;
    if (kind === 'opening' && openingPhase === 'intro') return;
    if (kind === 'opening' && openingPhase === 'watching' && openingWatchPaused) return;
    if (!freeMode && !deviationPending && ply >= total) return;
    if (kind !== 'opening' || openingPhase !== 'watching') {
      if (position.turn === userColor) return;
    }
    if (autoMoving) return;

    setAutoMoving(true);
    let cancelled = false;
    const timer = window.setTimeout(() => {
      void (async () => {
      if (freeMode || deviationPending) {
        const defense = await chooseTrainingDefense(position, lesson.userColor, lesson.level);
        if (cancelled) return;
        if (!defense) {
          const end = evaluateBoard(position, { positionHashes: [] });
          if (end.status === 'win' && end.winner === lesson.userColor) {
            setAutoMoving(false);
            finishLine(freeUsed, 'win', end.reason);
          } else {
            setAutoMoving(false);
            setFailed(true);
            setMessage('自研规则库没有找到可用的防守应手，本局暂停。可以悔棋或重来。');
          }
          return;
        }
        const ucci = defense.move;
        const reply = parseUcci(ucci);
        const result = reply ? applyMove(position, reply.from, reply.to) : null;
        if (!reply || !result?.ok) {
          setAutoMoving(false);
          setFailed(true);
          setMessage('自研规则库返回的应手未通过规则校验，本局暂停。可以悔棋或重来。');
          return;
        }
        const nextUsed = kind === 'endgame' ? freeUsed + 1 : Math.min(total, freeUsed + 1);
        setPosition(result.position);
        setFreeUsed(nextUsed);
        setLastMove({ from: reply.from, to: reply.to });
        setAutoMoving(false);
        feedback(result.givesCheck ? 'check' : result.move.captured ? 'capture' : 'move');

        const end = evaluateBoard(result.position, { positionHashes: [] });
        if (end.status === 'win' && end.winner !== lesson.userColor) {
          setFailed(true);
          setMessage('对手已完成将死或困毙，本局挑战失败。可以悔棋或重来。');
        } else if (end.status === 'draw') {
          setFailed(true);
          setMessage(
            kind === 'endgame'
              ? '局面已和棋，本局挑战失败。可以悔棋或重来。'
              : '局面已和棋，未能在限定步数内完成绝杀，本局挑战失败。可以悔棋或重来。',
          );
        }
        return;
      }

      const move = moves[ply];
      if (!move) {
        setAutoMoving(false);
        return;
      }
      const parsed = parseUcci(move.ucci);
      if (!parsed) {
        setAutoMoving(false);
        setMessage('主线着法无效，请重新开始。');
        return;
      }
      const result = applyMove(position, parsed.from, parsed.to);
      if (!result.ok) {
        setAutoMoving(false);
        setMessage('主线着法无效，请重新开始。');
        return;
      }
      const nextPly = ply + 1;
      setPosition(result.position);
      setPly(nextPly);
      setLastMove({ from: parsed.from, to: parsed.to });
      setAutoMoving(false);
      feedback(result.givesCheck ? 'check' : result.move.captured ? 'capture' : 'move');
      if (nextPly >= total) {
        if (kind === 'opening') {
          if (openingPhase === 'watching') {
            beginOpeningRound('r');
            return;
          }
          if (openingRound === 'r') {
            beginOpeningRound('b');
            return;
          }
        }
        const end = evaluateBoard(result.position, { positionHashes: [] });
        if (end.status === 'win' && end.winner === lesson.userColor) {
          finishLine(nextPly, 'win', end.reason);
        } else {
          finishLine(nextPly);
        }
      }
      })();
    }, freeMode ? 420 : 650);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      setAutoMoving(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    lesson,
    line,
    position,
    ply,
    total,
    completed,
    freeMode,
    deviationPending,
    freeUsed,
    failed,
    loading,
    kind,
    openingPhase,
    openingRound,
    openingWatchPaused,
    userColor,
  ]);

  if (!lesson) {
    return (
      <div className="page empty-state">
        <h1>课程不存在</h1>
        <Link to={`/train/${kind}`} className="btn btn-dark">返回列表</Link>
      </div>
    );
  }

  const initial = parseFen(lesson.fen);
  const boardPosition = position ?? initial;
  const userTurn = position?.turn === userColor;
  const checked = position && isInCheck(position, position.turn)
    ? getKingSquare(position.board, position.turn)
    : null;
  const next = nextTrainingItem(kind, lesson.id);
  const lastComment = !completedByWin && ply > 0 ? moves[ply - 1]?.comment : undefined;
  const completionLabel =
    kind === 'opening'
      ? '两轮训练通过'
      : completedReason === 'stalemate'
      ? '困毙成功'
      : completedReason === 'checkmate'
        ? '将死成功'
        : '挑战完成';
  const hasWon = (next: Position): boolean => {
    if (lesson?.objective !== 'win') return false;
    const end = evaluateBoard(next, { positionHashes: [] });
    return end.status === 'win' && end.winner === userColor;
  };
  const winningReason = (next: Position): WinReason | null => {
    if (lesson?.objective !== 'win') return null;
    const end = evaluateBoard(next, { positionHashes: [] });
    if (end.status !== 'win' || end.winner !== userColor) return null;
    return end.reason;
  };
  const stepsUsed = Math.min(total, freeMode || deviationPending ? freeUsed : ply);
  const openingRoundLabel = openingRound === 'r' ? '红方第一轮' : '黑方第二轮';
  const turnLabel = completed
    ? completionLabel
    : kind === 'opening' && openingPhase === 'intro'
      ? '先观看讲解，或跳过直接挑战'
      : kind === 'opening' && openingPhase === 'watching'
        ? `观看演示 · ${boardPosition.turn === 'r' ? '红方' : '黑方'}行棋`
        : autoMoving
          ? kind === 'opening'
            ? `${openingRoundLabel} · 演示应手…`
            : '对手应手…'
          : deviationPending
            ? '偏离主线 · 可悔棋或继续'
            : failed
              ? kind === 'endgame'
                ? '本局已暂停'
                : `自由走子 · ${boardPosition.turn === 'r' ? '红方' : '黑方'}`
              : freeMode
                ? kind === 'endgame'
                  ? userTurn ? '请你走这一步' : '等待对手'
                  : `自由走子 · ${boardPosition.turn === 'r' ? '红方' : '黑方'}`
                : userTurn
                  ? kind === 'opening'
                    ? `${openingRoundLabel} · 请你走这一步`
                    : '请你走这一步'
                  : kind === 'opening'
                    ? `${openingRoundLabel} · 等待演示`
                    : '等待演示';

  function feedback(cue: 'move' | 'capture' | 'check' | 'win' | 'error') {
    if (settings.sound) playCue(cue);
    if (settings.haptics) vibrate(cue === 'error' ? [20, 30, 20] : 10);
  }

  function completeRecord(nextPly: number) {
    if (!lesson) return;
    const finalElapsed = completedElapsedRef.current || Date.now() - startRef.current;
    completedElapsedRef.current = finalElapsed;
    const record: TrainingProgress = {
      key: `${kind}:${lesson.id}`,
      itemId: lesson.id,
      kind,
      status: 'completed',
      lineId: line?.id,
      completedLineIds: Array.from(new Set([...(loadedProgress?.completedLineIds ?? []), line?.id ?? 'main'])),
      ply: nextPly,
      attempts,
      hintsUsed,
      elapsedMs: finalElapsed,
      independentSolve: hintsUsed === 0,
      openingRound: kind === 'opening' ? openingRound : undefined,
      completedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLoadedProgress(record);
    void saveTrainingProgress(record);
  }

  function finishLine(
    nextPly: number,
    via: 'line' | 'win' = 'line',
    reason: WinReason | null = null,
  ) {
    if (completed || (kind === 'opening' && openingRound !== 'b')) return;
    setCompleted(true);
    setCompletedByWin(via === 'win');
    setCompletedReason(via === 'win' ? reason : null);
    setSelected(null);
    setTargets([]);
    setHint(null);
    setMessage(null);
    completedElapsedRef.current = Date.now() - startRef.current;
    feedback('win');
    completeRecord(nextPly);
  }

  function beginOpeningRound(round: Color, nextMessage: string | null = null) {
    if (!lesson) return;
    if (round === 'r') {
      startRef.current = Date.now();
      setElapsed(0);
      setAttempts(0);
      setHintsUsed(0);
    }
    completedElapsedRef.current = 0;
    setOpeningPhase('playing');
    setOpeningRound(round);
    setOpeningWatchPaused(false);
    setPosition(parseFen(lesson.fen));
    setPly(0);
    setSelected(null);
    setTargets([]);
    setLastMove(null);
    setHint(null);
    setMessage(nextMessage);
    setCompleted(false);
    setCompletedByWin(false);
    setCompletedReason(null);
    setFreeMode(false);
    setDeviationPending(false);
    setFreeUsed(0);
    setFailed(false);
    setUndoPoints([]);
    setAutoMoving(false);

    if (loadedProgress?.status !== 'completed') {
      const record: TrainingProgress = {
        key: `${kind}:${lesson.id}`,
        itemId: lesson.id,
        kind,
        status: 'in_progress',
        lineId: line?.id,
        completedLineIds: loadedProgress?.completedLineIds ?? [],
        ply: 0,
        attempts: round === 'r' ? 0 : attempts,
        hintsUsed: round === 'r' ? 0 : hintsUsed,
        elapsedMs: round === 'r' ? 0 : Date.now() - startRef.current,
        openingRound: round,
        updatedAt: new Date().toISOString(),
      };
      setLoadedProgress(record);
      void saveTrainingProgress(record);
    }
  }

  function startWatching() {
    if (!lesson) return;
    startRef.current = Date.now();
    setOpeningPhase('watching');
    setOpeningRound('r');
    setOpeningWatchPaused(false);
    setPosition(parseFen(lesson.fen));
    setPly(0);
    setSelected(null);
    setTargets([]);
    setLastMove(null);
    setHint(null);
    setMessage(null);
    setCompleted(false);
    setCompletedByWin(false);
    setCompletedReason(null);
    setFreeMode(false);
    setDeviationPending(false);
    setFreeUsed(0);
    setFailed(false);
    setUndoPoints([]);
    setAutoMoving(false);
    setAttempts(0);
    setHintsUsed(0);
    setElapsed(0);
    completedElapsedRef.current = 0;
  }

  function skipWatching() {
    beginOpeningRound('r', '已跳过观看，开始红方第一轮。请按主线走完红方的着法。');
  }

  function persistInProgress(nextPly: number) {
    if (completed || !lesson || loadedProgress?.status === 'completed') return;
    const record: TrainingProgress = {
      key: `${kind}:${lesson.id}`,
      itemId: lesson.id,
      kind,
      status: 'in_progress',
      lineId: line?.id,
      completedLineIds: loadedProgress?.completedLineIds ?? [],
      ply: nextPly,
      attempts,
      hintsUsed,
      elapsedMs: Date.now() - startRef.current,
      openingRound: kind === 'opening' ? openingRound : undefined,
      updatedAt: new Date().toISOString(),
    };
    setLoadedProgress(record);
    void saveTrainingProgress(record);
  }

  function rememberUndoPoint() {
    if (!position) return;
    setUndoPoints((points) => [
      ...points,
      {
        position,
        ply,
        freeMode,
        deviationPending,
        freeUsed,
        failed,
        attempts,
        lastMove,
      },
    ]);
  }

  function undoLastMove() {
    if (completed || autoMoving) return;
    const previous = undoPoints[undoPoints.length - 1];
    if (!previous) return;

    setUndoPoints((points) => points.slice(0, -1));
    setPosition(previous.position);
    setPly(previous.ply);
    setFreeMode(previous.freeMode);
    setDeviationPending(previous.deviationPending);
    setFreeUsed(previous.freeUsed);
    setFailed(previous.failed);
    setAttempts(previous.attempts);
    setLastMove(previous.lastMove);
    setSelected(null);
    setTargets([]);
    setHint(null);
    setAutoMoving(false);
    setMessage('已悔棋，可以重新选择这一步。');
    feedback('move');

    if (!lesson || loadedProgress?.status === 'completed') return;
    const record: TrainingProgress = {
      key: `${kind}:${lesson.id}`,
      itemId: lesson.id,
      kind,
      status: 'in_progress',
      lineId: line?.id,
      completedLineIds: loadedProgress?.completedLineIds ?? [],
      ply: previous.ply,
      attempts: previous.attempts,
      hintsUsed,
      elapsedMs: Date.now() - startRef.current,
      openingRound: kind === 'opening' ? openingRound : undefined,
      updatedAt: new Date().toISOString(),
    };
    setLoadedProgress(record);
    void saveTrainingProgress(record);
  }

  function handlePoint(square: number) {
    if (!position || completed || autoMoving) return;
    if (kind === 'opening' && openingPhase !== 'playing') return;
    if (position.turn !== userColor) return;
    const movableColor = userColor;
    const piece = pieceAt(position, square);
    if (selected === null) {
      if (piece?.color === movableColor) {
        const legal = generateLegalMoves(position).filter((move) => move.from === square).map((move) => move.to);
        setSelected(square);
        setTargets(legal);
        setMessage(null);
      } else {
        setMessage(`请选择${movableColor === 'r' ? '红' : '黑'}方棋子。`);
      }
      return;
    }

    if (selected === square) {
      setSelected(null);
      setTargets([]);
      return;
    }

    if (piece?.color === movableColor) {
      const legal = generateLegalMoves(position).filter((move) => move.from === square).map((move) => move.to);
      setSelected(square);
      setTargets(legal);
      return;
    }

    if (!targets.includes(square)) {
      setSelected(null);
      setTargets([]);
      setMessage('这枚棋子不能走到那里。');
      return;
    }

    if (freeMode || deviationPending) {
      const free = applyMove(position, selected, square);
      if (!free.ok) {
        setMessage(free.message);
        return;
      }
      rememberUndoPoint();
      setPosition(free.position);
      setSelected(null);
      setTargets([]);
      setHint(null);
      setLastMove({ from: free.move.from, to: free.move.to });
      feedback(free.givesCheck ? 'check' : free.move.captured ? 'capture' : 'move');

      if (failed) {
        setMessage('本局已暂停，不会记为完成。可以悔棋或重来。');
        return;
      }

      if (hasWon(free.position)) {
        const nextUsed = kind === 'endgame' ? freeUsed + 1 : Math.min(total, freeUsed + 1);
        setFreeUsed(nextUsed);
        finishLine(nextUsed, 'win', winningReason(free.position));
        return;
      }

      const used = kind === 'endgame' ? freeUsed + 1 : Math.min(total, freeUsed + 1);
      setFreeUsed(used);
      if (deviationPending) {
        setDeviationPending(false);
        setFreeMode(true);
        setMessage(OPENING_FREE_MODE_MESSAGE);
      } else {
        setMessage(null);
      }
      return;
    }

    const expected = moves[ply]?.ucci;
    const actual = `${'abcdefghi'[selected % 9]}${Math.floor(selected / 9)}${'abcdefghi'[square % 9]}${Math.floor(square / 9)}`;

    if (actual !== expected) {
      if (kind === 'opening') {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        setSelected(null);
        setTargets([]);
        setHint(null);
        setMessage(
          `这步不符合${openingRoundLabel}的主线。局面没有改变，请按棋谱重走这一步。`,
        );
        feedback('error');
        setLoadedProgress((record) =>
          record
            ? { ...record, attempts: nextAttempts, updatedAt: new Date().toISOString() }
            : record,
        );
        return;
      }
      // 不限制用户尝试：偏离主线后进入自由走子，并明确规则库能判断什么。
      const result = applyMove(position, selected, square);
      if (!result.ok) {
        setMessage(result.message);
        return;
      }
      rememberUndoPoint();
      setSelected(null);
      setTargets([]);
      setHint(null);
      if (hasWon(result.position)) {
        setPosition(result.position);
        setLastMove({ from: result.move.from, to: result.move.to });
        setPly(ply + 1);
        finishLine(ply + 1, 'win', winningReason(result.position));
        return;
      }
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setPosition(result.position);
      setLastMove({ from: result.move.from, to: result.move.to });
      const used = kind === 'endgame' ? ply + 1 : Math.min(total, ply + 1);
      setFreeUsed(used);
      if (kind === 'endgame') {
        setFreeMode(true);
        setDeviationPending(false);
        setMessage(null);
      } else {
        setDeviationPending(true);
        setMessage(OPENING_DEVIATION_MESSAGE);
      }
      feedback(result.givesCheck ? 'check' : result.move.captured ? 'capture' : 'move');
      setLoadedProgress((record) =>
        record
          ? { ...record, attempts: nextAttempts, updatedAt: new Date().toISOString() }
          : record,
      );
      return;
    }

    const result = applyMove(position, selected, square);
    if (!result.ok) {
      setMessage(result.message);
      return;
    }
    rememberUndoPoint();
    const nextPly = ply + 1;
    setPosition(result.position);
    setPly(nextPly);
    setSelected(null);
    setTargets([]);
    setHint(null);
    setLastMove({ from: result.move.from, to: result.move.to });
    setMessage(null);
    feedback(result.givesCheck ? 'check' : result.move.captured ? 'capture' : 'move');
    if (nextPly >= total) {
      if (kind === 'opening') {
        if (openingRound === 'r') {
          beginOpeningRound('b', '红方第一轮已完成。现在开始黑方第二轮，请按主线走完黑方的着法。');
        } else {
          finishLine(nextPly);
        }
        return;
      }
      const reason = winningReason(result.position);
      finishLine(nextPly, reason ? 'win' : 'line', reason);
    } else if (hasWon(result.position)) finishLine(nextPly, 'win', winningReason(result.position));
    else persistInProgress(nextPly);
  }

  function showHint() {
    if (
      completed ||
      freeMode ||
      deviationPending ||
      failed ||
      !lesson ||
      (kind === 'opening' && openingPhase !== 'playing')
    ) return;
    const expected = moves[ply]?.ucci;
    if (!expected) return;
    const parsed = parseUcci(expected);
    if (!parsed) return;
    setHint({ from: parsed.from, to: parsed.to });
    setHintsUsed((value) => value + 1);
    setMessage('金色箭头标出了主线下一步。');
    const record: TrainingProgress = {
      key: `${kind}:${lesson.id}`,
      itemId: lesson.id,
      kind,
      status: 'in_progress',
      lineId: line?.id,
      completedLineIds: loadedProgress?.completedLineIds ?? [],
      ply,
      attempts,
      hintsUsed: hintsUsed + 1,
      elapsedMs: Date.now() - startRef.current,
      openingRound: kind === 'opening' ? openingRound : undefined,
      updatedAt: new Date().toISOString(),
    };
    if (loadedProgress?.status !== 'completed') {
      setLoadedProgress(record);
      void saveTrainingProgress(record);
    }
  }

  function reset() {
    if (!lesson) return;
    if (kind === 'opening') {
      beginOpeningRound('r', '已重新开始，从红方第一轮由头走起。');
      return;
    }
    const defaultLine = lesson.lines.find((item) => item.id === lineId) ?? lesson.lines[0];
    setPosition(parseFen(lesson.fen));
    setPly(0);
    setSelected(null);
    setTargets([]);
    setLastMove(null);
    setHint(null);
    setMessage(null);
    setCompleted(false);
    setCompletedByWin(false);
    setCompletedReason(null);
    setFreeMode(false);
    setDeviationPending(false);
    setFreeUsed(0);
    setFailed(false);
    setOpeningPhase('intro');
    setOpeningRound('r');
    setOpeningWatchPaused(false);
    setUndoPoints([]);
    setAutoMoving(false);
    setAttempts(0);
    setHintsUsed(0);
    setElapsed(0);
    startRef.current = Date.now();
    completedElapsedRef.current = 0;
    if (defaultLine) setLineId(defaultLine.id);
  }

  function changeLine(nextLineId: string) {
    if (!lesson) return;
    const nextLine = lesson.lines.find((item) => item.id === nextLineId);
    if (!nextLine) return;
    setLineId(nextLineId);
    setPosition(parseFen(lesson.fen));
    setPly(0);
    setSelected(null);
    setTargets([]);
    setLastMove(null);
    setHint(null);
    setMessage(null);
    setCompleted(false);
    setCompletedByWin(false);
    setCompletedReason(null);
    setFreeMode(false);
    setDeviationPending(false);
    setFreeUsed(0);
    setFailed(false);
    setOpeningPhase('intro');
    setOpeningRound('r');
    setOpeningWatchPaused(false);
    setUndoPoints([]);
    setAutoMoving(false);
    setElapsed(0);
    startRef.current = Date.now();
    completedElapsedRef.current = 0;
    if (loadedProgress?.status !== 'completed') {
      void saveTrainingProgress({
        key: `${kind}:${lesson.id}`,
        itemId: lesson.id,
        kind,
        status: 'in_progress',
        lineId: nextLine.id,
        completedLineIds: loadedProgress?.completedLineIds ?? [],
        ply: 0,
        attempts,
        hintsUsed,
        elapsedMs: 0,
        openingRound: kind === 'opening' ? 'r' : undefined,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  const isOpeningFreePlay = kind === 'opening' && freeMode;

  return (
    <div className="page training-play-page lesson-play-page">
      <div className="play-topline">
        <Link to={`/train/${kind}`} className="back-link">
          <ArrowLeft size={15} aria-hidden="true" />
          {trainingKindLabels[kind]}
        </Link>
      </div>

      <div className="play-layout training-layout">
        <section className="board-column">
          <div className="board-toolbar">
            <div
              className={`turn-chip${autoMoving ? ' is-thinking' : ''}${
                kind === 'opening' && openingPhase === 'intro' ? ' is-placeholder' : ''
              }`}
              aria-hidden={kind === 'opening' && openingPhase === 'intro' ? true : undefined}
            >
              <span className={`turn-disc ${boardPosition.turn}`} />
              {turnLabel}
            </div>
            <div className="opening-board-toolbar-right">
              <span className="play-meta">
                <Timer size={14} aria-hidden="true" /> {formatDuration(completed ? completedElapsedRef.current : elapsed)}
              </span>
            </div>
          </div>

          <div className="board-frame">
            <Board
              position={boardPosition}
              orientation={userColor}
              selected={selected}
              legalTargets={targets}
              hint={hint}
              lastMove={lastMove}
              checkedSquare={checked}
              checkmate={completed && completedByWin}
              stalemate={completedReason === 'stalemate'}
              interactive={
                !completed &&
                !autoMoving &&
                (kind === 'opening'
                  ? openingPhase === 'playing' && userTurn
                  : freeMode || failed || userTurn)
              }
              onPoint={handlePoint}
            />
            {kind === 'opening' && !completed && openingPhase === 'intro' && (
              <div className="opening-board-float-actions">
                <div className="opening-review-panel">
                  <div className="opening-float-caption">
                    <span className="turn-disc r" aria-hidden="true" />
                    先观看讲解，或跳过直接挑战
                  </div>
                  <div className="opening-review-actions" aria-label="开局讲解操作">
                    <button
                      type="button"
                      className="btn btn-primary btn-small"
                      onClick={startWatching}
                    >
                      <Eye size={14} aria-hidden="true" />
                      观看
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-small"
                      onClick={skipWatching}
                    >
                      <SkipForward size={14} aria-hidden="true" />
                      跳过观看
                    </button>
                  </div>
                </div>
              </div>
            )}
            {kind === 'opening' && !completed && openingPhase === 'watching' && (
              <div className="opening-board-float-actions is-watch-controls">
                <div className="opening-watch-controls" role="group" aria-label="观看控制">
                  {openingWatchPaused ? (
                    <>
                      <button
                        type="button"
                        className="opening-icon-button"
                        aria-label="继续观看"
                        title="继续观看"
                        onClick={() => setOpeningWatchPaused(false)}
                      >
                        <Play size={17} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="opening-icon-button"
                        aria-label="跳过观看"
                        title="跳过观看"
                        onClick={skipWatching}
                      >
                        <SkipForward size={17} aria-hidden="true" />
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="opening-icon-button is-faint"
                      aria-label="暂停观看"
                      title="暂停观看"
                      onClick={() => setOpeningWatchPaused(true)}
                    >
                      <Pause size={17} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            )}
            <BoardToast
              message={message}
              tone={failed ? 'error' : 'info'}
              onDismiss={() => setMessage(null)}
            />
            {completed && (
              <div className="tactic-result lesson-result-card">
                <div className="result-mark"><CheckCircle2 size={24} aria-hidden="true" /></div>
                <div>
                  <span className="eyebrow">{completionLabel}</span>
                  <h2>
                    {kind === 'opening'
                      ? '红方、黑方两轮都走对了。'
                      : completedReason === 'stalemate'
                      ? '找到困毙，完成。'
                      : completedByWin
                        ? '找到将死，完成。'
                        : lesson.completionText}
                  </h2>
                  <p>
                    {kind === 'opening'
                      ? '两轮均按主线完成，本节开局训练已通过。'
                      : completedByWin
                      ? kind === 'endgame'
                        ? completedReason === 'stalemate'
                          ? '你完成了困毙，本关已按胜利完成。'
                          : '你完成了将死，本关已按胜利完成。'
                        : '你在限定步数内完成了绝杀，本关已按胜利完成。'
                      : '跟练完成。'}
                    用了 {formatDuration(completedElapsedRef.current)}，错试 {attempts} 次，提示 {hintsUsed} 次。
                  </p>
                </div>
                <div className="board-result-actions">
                  {next ? (
                    <button
                      type="button"
                      className="btn btn-primary btn-small"
                      onClick={() => navigate(`/train/${kind}/${next.id}`)}
                    >
                      <ArrowRight size={15} aria-hidden="true" />
                      下一节
                    </button>
                  ) : (
                    <Link to={`/train/${kind}`} className="btn btn-primary btn-small">
                      <ArrowRight size={15} aria-hidden="true" />
                      返回列表
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 固定高度的状态槽：提示出现/消失不改变棋盘与整页高度，避免“页面上下一晃” */}
          {kind === 'endgame' && !isOpeningFreePlay && !completed && (
            <div
              className={`inline-alert lesson-status is-hint${failed ? ' inline-alert-error' : ''}`}
              role="status"
              aria-live="polite"
            >
              按你的思路走子；规则库负责合法着法、将军与终局判定。
            </div>
          )}

          {kind === 'opening' && !freeMode && (
            <div className="line-progress">
              <div className="line-progress-label">
                <span>
                  {completed
                    ? kind === 'opening' ? '红黑两轮通过' : completionLabel
                    : deviationPending
                      ? '偏离主线'
                      : freeMode
                        ? '本关进度'
                        : openingPhase === 'intro'
                          ? '讲解与两轮训练'
                          : openingPhase === 'watching'
                            ? '观看主线讲解'
                            : `${openingRoundLabel} · ${line?.label ?? '主线'}`}
                </span>
                <span>
                  {completed
                    ? '已完成'
                    : openingPhase === 'intro'
                      ? '尚未开始'
                      : `${stepsUsed} / ${total} 步 · 第 ${openingRound === 'r' ? '1' : '2'} / 2 轮`}
                </span>
              </div>
              <div className="progress-track">
                <span style={{ width: completed ? '100%' : `${total ? Math.min(100, (stepsUsed / total) * 100) : 0}%` }} />
              </div>
            </div>
          )}

        </section>

        <aside className="play-side">
          <div className="board-controls side-controls">
            <button
              type="button"
              className="control-button"
              disabled={
                undoPoints.length === 0 ||
                completed ||
                autoMoving ||
                (kind === 'opening' && openingPhase !== 'playing')
              }
              onClick={undoLastMove}
            >
              <Undo2 size={18} aria-hidden="true" />
              <span>悔棋</span>
            </button>
            {!isOpeningFreePlay && (
              <button
                type="button"
                className="control-button"
                disabled={
                  completed ||
                  freeMode ||
                  deviationPending ||
                  failed ||
                  autoMoving ||
                  (kind === 'opening' && openingPhase !== 'playing')
                }
                onClick={showHint}
              >
                <Lightbulb size={18} aria-hidden="true" />
                <span>提示</span>
              </button>
            )}
            {kind === 'opening' && (
              <button type="button" className="control-button" onClick={startWatching}>
                <BookOpen size={18} aria-hidden="true" />
                <span>教程</span>
              </button>
            )}
            <button type="button" className="control-button" onClick={reset}>
              <RotateCcw size={18} aria-hidden="true" />
              <span>重来</span>
            </button>
            {!completed && (
              next ? (
                <button type="button" className="control-button primary" onClick={() => navigate(`/train/${kind}/${next.id}`)}>
                  <ArrowRight size={18} aria-hidden="true" />
                  <span>下一节</span>
                </button>
              ) : (
                <Link to={`/train/${kind}`} className="control-button primary">
                  <ArrowRight size={18} aria-hidden="true" />
                  <span>返回列表</span>
                </Link>
              )
            )}
          </div>
          <section className="side-card">
            <div className="side-heading">
              <span className="eyebrow">{trainingKindLabels[kind]}</span>
              <span className="side-level">
                {lesson.level === 1 ? '入门' : lesson.level === 2 ? '进阶' : '挑战'}
              </span>
            </div>
            <h1 className="exercise-title">{lesson.title}</h1>
            <p className="exercise-subtitle">{lesson.subtitle}</p>
            <p className="lesson-intro">{lesson.intro}</p>
            <div className="key-points">
              <span className="eyebrow">记住这几点</span>
              <ul className="plain-list compact-list">
                {lesson.keyPoints.map((point) => (
                  <li key={point}><ChevronRight size={14} aria-hidden="true" /> {point}</li>
                ))}
              </ul>
            </div>
            {lastComment && (
              <div className="comment-box">
                <span className="eyebrow">刚刚这步</span>
                <p>{lastComment}</p>
              </div>
            )}
            {autoMoving && <p className="muted small">演示正在应手，稍等。</p>}
          </section>

          {lesson.lines.length > 1 && (
            <section className="side-card">
              <span className="eyebrow">选择主线</span>
              <div className="line-selector">
                {lesson.lines.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={line?.id === item.id ? 'is-selected' : ''}
                    onClick={() => changeLine(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="side-card source-card">
            <span className="eyebrow">来源</span>
            <p>{lesson.source.name}</p>
            <p className="muted small">{lesson.source.author} · {lesson.source.license}</p>
            <p className="muted small">审阅：{lesson.reviewedBy}</p>
            {lesson.source.url && (
              <a className="text-link" href={lesson.source.url} target="_blank" rel="noreferrer">
                查看原谱来源
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            )}
            <Link to={`/train/${kind}`} className="text-link">
              回到{trainingKindLabels[kind]}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
