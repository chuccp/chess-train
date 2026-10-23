import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Lightbulb,
  RotateCcw,
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

interface LessonUndoPoint {
  position: Position;
  ply: number;
  freeMode: boolean;
  freeUsed: number;
  failed: boolean;
  attempts: number;
  lastMove: { from: number; to: number } | null;
}

const FREE_PLAY_MESSAGE =
  '已偏离主线，继续自由走子；自研规则库校验合法性与终局，对手不随机应手。';

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
  const [freeMode, setFreeMode] = useState(false);
  const [freeUsed, setFreeUsed] = useState(0);
  const [failed, setFailed] = useState(false);
  const [autoMoving, setAutoMoving] = useState(false);
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
    setFreeMode(false);
    setFreeUsed(0);
    setFailed(false);
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
      if (record?.status === 'in_progress' && record.lineId && record.ply > 0) {
        const savedLine = lesson.lines.find((item) => item.id === record.lineId);
        if (savedLine && savedLine.moves.length >= record.ply) {
          setLineId(savedLine.id);
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
    if (completed) return;
    const timer = window.setInterval(() => setElapsed(Date.now() - startRef.current), 1000);
    return () => window.clearInterval(timer);
  }, [completed]);

  // Follow the verified script on the main line. If the user leaves the book,
  // use a deterministic, rules-validated defensive search for the opponent.
  useEffect(() => {
    if (!lesson || !line || !position || completed || failed || loading) return;
    if (!freeMode && ply >= total) return;
    if (position.turn === lesson.userColor) return;
    if (autoMoving) return;

    setAutoMoving(true);
    let cancelled = false;
    const timer = window.setTimeout(() => {
      void (async () => {
      if (freeMode) {
        const defense = await chooseTrainingDefense(position, lesson.userColor, lesson.level);
        if (cancelled) return;
        if (!defense) {
          const end = evaluateBoard(position, { positionHashes: [] });
          if (end.status === 'win' && end.winner === lesson.userColor) {
            setAutoMoving(false);
            finishLine(freeUsed, 'win');
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
          setMessage('对手已形成将死，本局挑战失败。可以悔棋或重来。');
        } else if (end.status === 'draw') {
          setFailed(true);
          setMessage(
            kind === 'endgame'
              ? '局面已和棋，本局挑战失败。可以悔棋或重来。'
              : '局面已和棋，未能在限定步数内将死，本局挑战失败。可以悔棋或重来。',
          );
        } else if (kind !== 'endgame' && nextUsed >= total) {
          setFailed(true);
          setMessage('步数已用完，未能在限定步数内将死，挑战失败。可以悔棋或重来。');
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
        finishLine(nextPly);
      }
      })();
    }, freeMode ? 420 : 650);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      setAutoMoving(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson, line, position, ply, total, completed, freeMode, freeUsed, failed, loading]);

  if (!lesson) {
    return (
      <div className="page empty-state">
        <h1>课程不存在</h1>
        <Link to={`/train/${kind}`} className="btn btn-dark">返回列表</Link>
      </div>
    );
  }

  const initial = parseFen(lesson.fen);
  const userColor: Color = lesson.userColor;
  const userTurn = position?.turn === userColor;
  const checked = position && isInCheck(position, position.turn)
    ? getKingSquare(position.board, position.turn)
    : null;
  const next = nextTrainingItem(kind, lesson.id);
  const lastComment = !completedByWin && ply > 0 ? moves[ply - 1]?.comment : undefined;
  const hasWon = (next: Position): boolean => {
    if (lesson?.objective !== 'win') return false;
    const end = evaluateBoard(next, { positionHashes: [] });
    return end.status === 'win' && end.winner === userColor;
  };
  const stepsUsed = Math.min(total, freeMode ? freeUsed : ply);

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
      completedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLoadedProgress(record);
    void saveTrainingProgress(record);
  }

  function finishLine(nextPly: number, via: 'line' | 'win' = 'line') {
    if (completed) return;
    setCompleted(true);
    setCompletedByWin(via === 'win');
    setSelected(null);
    setTargets([]);
    setHint(null);
    setMessage(null);
    completedElapsedRef.current = Date.now() - startRef.current;
    feedback('win');
    completeRecord(nextPly);
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
      updatedAt: new Date().toISOString(),
    };
    setLoadedProgress(record);
    void saveTrainingProgress(record);
  }

  function rememberUndoPoint() {
    if (kind !== 'endgame' || !position) return;
    setUndoPoints((points) => [
      ...points,
      {
        position,
        ply,
        freeMode,
        freeUsed,
        failed,
        attempts,
        lastMove,
      },
    ]);
  }

  function undoLastMove() {
    if (kind !== 'endgame' || completed || autoMoving) return;
    const previous = undoPoints[undoPoints.length - 1];
    if (!previous) return;

    setUndoPoints((points) => points.slice(0, -1));
    setPosition(previous.position);
    setPly(previous.ply);
    setFreeMode(previous.freeMode);
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
      updatedAt: new Date().toISOString(),
    };
    setLoadedProgress(record);
    void saveTrainingProgress(record);
  }

  function handlePoint(square: number) {
    if (!position || completed || autoMoving) return;
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

    if (freeMode) {
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
        finishLine(nextUsed, 'win');
        return;
      }

      const used = kind === 'endgame' ? freeUsed + 1 : Math.min(total, freeUsed + 1);
      setFreeUsed(used);
      if (kind !== 'endgame' && used >= total) {
        setFailed(true);
        setMessage('步数已用完，未能在限定步数内将死，挑战失败。可以悔棋或重来。');
      } else {
        setMessage(kind === 'opening' ? FREE_PLAY_MESSAGE : null);
      }
      return;
    }

    const expected = moves[ply]?.ucci;
    const actual = `${'abcdefghi'[selected % 9]}${Math.floor(selected / 9)}${'abcdefghi'[square % 9]}${Math.floor(square / 9)}`;

    if (actual !== expected) {
      // 不限制用户尝试：偏离主线后进入自由走子，并明确规则库能判断什么。
      const result = applyMove(position, selected, square);
      if (result.ok) rememberUndoPoint();
      setSelected(null);
      setTargets([]);
      setHint(null);
      if (result.ok && hasWon(result.position)) {
        setPosition(result.position);
        setLastMove({ from: result.move.from, to: result.move.to });
        setPly(ply + 1);
        finishLine(ply + 1, 'win');
        return;
      }
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setFreeMode(true);
      if (result.ok) {
        setPosition(result.position);
        setLastMove({ from: result.move.from, to: result.move.to });
      }
      const used = kind === 'endgame' ? ply + 1 : Math.min(total, ply + 1);
      setFreeUsed(used);
      if (kind !== 'endgame' && used >= total) {
        setFailed(true);
        setMessage('步数已用完，未能在限定步数内将死，挑战失败。可以悔棋或重来。');
      } else {
        setMessage(kind === 'opening' ? FREE_PLAY_MESSAGE : null);
      }
      if (result.ok) {
        feedback(result.givesCheck ? 'check' : result.move.captured ? 'capture' : 'move');
      }
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
    if (nextPly >= total) finishLine(nextPly);
    else if (hasWon(result.position)) finishLine(nextPly, 'win');
    else persistInProgress(nextPly);
  }

  function showHint() {
    if (completed || freeMode || failed || !lesson) return;
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
      updatedAt: new Date().toISOString(),
    };
    if (loadedProgress?.status !== 'completed') {
      setLoadedProgress(record);
      void saveTrainingProgress(record);
    }
  }

  function reset() {
    if (!lesson) return;
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
    setFreeMode(false);
    setFreeUsed(0);
    setFailed(false);
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
    setFreeMode(false);
    setFreeUsed(0);
    setFailed(false);
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
        updatedAt: new Date().toISOString(),
      });
    }
  }

  const boardPosition = position ?? initial;

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
            <div className={`turn-chip${autoMoving ? ' is-thinking' : ''}`}>
              <span className={`turn-disc ${boardPosition.turn}`} />
              {completed
                ? completedByWin ? '将死成功' : '挑战完成'
                : autoMoving
                  ? '对手应手…'
                  : failed
                    ? kind === 'endgame'
                      ? '本局已暂停'
                      : `自由走子 · ${boardPosition.turn === 'r' ? '红方' : '黑方'}`
                    : freeMode
                      ? kind === 'endgame'
                        ? userTurn ? '请你走这一步' : '等待对手'
                        : `自由走子 · ${boardPosition.turn === 'r' ? '红方' : '黑方'}`
                    : userTurn
                      ? '请你走这一步'
                      : '等待演示'}
            </div>
            <span className="play-meta">
              <Timer size={14} aria-hidden="true" /> {formatDuration(completed ? completedElapsedRef.current : elapsed)}
            </span>
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
              checkmate={completed && checked !== null}
              interactive={!completed && (freeMode || failed || userTurn) && !autoMoving}
              onPoint={handlePoint}
            />
            <BoardToast
              message={message}
              tone={failed ? 'error' : 'info'}
              onDismiss={() => setMessage(null)}
            />
            {completed && (
              <div className="tactic-result lesson-result-card">
                <div className="result-mark"><CheckCircle2 size={24} aria-hidden="true" /></div>
                <div>
                  <span className="eyebrow">{completedByWin ? '将死成功' : '挑战完成'}</span>
                  <h2>{completedByWin ? '找到将死，完成。' : lesson.completionText}</h2>
                  <p>
                    {completedByWin
                      ? kind === 'endgame'
                        ? '你完成了将死，本关已按胜利完成。'
                        : '你在限定步数内完成了将死，本关已按胜利完成。'
                      : '跟练完成。'}
                    用了 {formatDuration(completedElapsedRef.current)}，错试 {attempts} 次，提示 {hintsUsed} 次。
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 固定高度的状态槽：提示出现/消失不改变棋盘与整页高度，避免“页面上下一晃” */}
          <div
            className={`inline-alert lesson-status${completed ? ' is-success' : ' is-hint'}${failed ? ' inline-alert-error' : ''}`}
            role="status"
            aria-live="polite"
          >
            {completed
              ? completedByWin
                ? '将死成功，本关已完成。'
                : '挑战完成，本关已完成。'
              : kind === 'endgame'
                ? '按你的思路走子；规则库负责合法着法、将军与终局判定。'
                : '主线中对手按固定应手；可自由尝试，规则库只校验合法性与终局。'}
          </div>

          {kind === 'opening' && (
            <div className="line-progress">
              <div className="line-progress-label">
                <span>{completedByWin ? '将死成功' : freeMode ? '本关进度' : (line?.label ?? '主线')}</span>
                <span>{completedByWin ? '已完成' : `${stepsUsed} / ${total} 步`}</span>
              </div>
              <div className="progress-track">
                <span style={{ width: completedByWin ? '100%' : `${total ? Math.min(100, (stepsUsed / total) * 100) : 0}%` }} />
              </div>
            </div>
          )}

        </section>

        <aside className="play-side">
          <div className="board-controls side-controls">
            {kind === 'endgame' && (
              <button
                type="button"
                className="control-button"
                disabled={undoPoints.length === 0 || completed || autoMoving}
                onClick={undoLastMove}
              >
                <Undo2 size={18} aria-hidden="true" />
                <span>悔棋</span>
              </button>
            )}
            <button type="button" className="control-button" disabled={completed || freeMode || failed || autoMoving} onClick={showHint}>
              <Lightbulb size={18} aria-hidden="true" />
              <span>提示</span>
            </button>
            <button type="button" className="control-button" onClick={reset}>
              <RotateCcw size={18} aria-hidden="true" />
              <span>重来</span>
            </button>
            {next ? (
              <button type="button" className="control-button primary" onClick={() => navigate(`/train/${kind}/${next.id}`)}>
                <ArrowRight size={18} aria-hidden="true" />
                <span>下一节</span>
              </button>
            ) : (
              <Link to={`/train/${kind}`} className="control-button primary">
                <ArrowRight size={18} aria-hidden="true" />
                <span>返回列表</span>
              </Link>
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
            {kind === 'opening' && (
              <p className="muted small lesson-flow-note">
                你走红方，主线中黑方按预设应手；也可以自由尝试，偏离后由自研规则库校验。
              </p>
            )}
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
