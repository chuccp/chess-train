import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Crown,
  Lightbulb,
  RotateCcw,
  Timer,
} from 'lucide-react';
import {
  applyMove,
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
import { getTrainingProgress, saveTrainingProgress } from '../lib/storage';
import { formatDuration } from '../lib/format';
import { playCue, vibrate } from '../lib/feedback';
import { useSettingsStore } from '../stores/settings';
import type { TrainingProgress } from '../types';

interface LessonPlayPageProps {
  kind: 'endgame' | 'opening';
}

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
  const [failed, setFailed] = useState(false);
  const [autoMoving, setAutoMoving] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [loadedProgress, setLoadedProgress] = useState<TrainingProgress | null>(null);
  const [loading, setLoading] = useState(true);
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
    setFailed(false);
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

  // Automatically play the scripted opponent moves. This is a guided line, not
  // free play, so the opponent side never searches.
  useEffect(() => {
    if (!lesson || !line || !position || completed || failed || loading) return;
    if (ply >= total) return;
    if (position.turn === lesson.userColor) return;
    if (autoMoving) return;

    setAutoMoving(true);
    const move = moves[ply];
    const timer = window.setTimeout(() => {
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
    }, 650);

    return () => {
      window.clearTimeout(timer);
      setAutoMoving(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson, line, position, ply, total, completed, failed, loading]);

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
  const lastComment = ply > 0 ? moves[ply - 1]?.comment : undefined;
  const recordCompleted = loadedProgress?.status === 'completed';

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

  function finishLine(nextPly: number) {
    if (completed) return;
    setCompleted(true);
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

  function handlePoint(square: number) {
    if (!position || completed || autoMoving) return;
    // 失败后进入自由走子：双方都能动，不再强制主线；但不会记为完成。
    if (!failed && !userTurn) return;
    const movableColor = failed ? position.turn : userColor;
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

    const expected = moves[ply]?.ucci;
    const actual = `${'abcdefghi'[selected % 9]}${Math.floor(selected / 9)}${'abcdefghi'[square % 9]}${Math.floor(square / 9)}`;

    // 已经失败：自由走子只改棋盘，不再推进讲解主线，也不弹整页结果。
    if (failed) {
      const free = applyMove(position, selected, square);
      if (!free.ok) {
        setMessage(free.message);
        return;
      }
      setPosition(free.position);
      setSelected(null);
      setTargets([]);
      setHint(null);
      setLastMove({ from: free.move.from, to: free.move.to });
      setMessage('自由练习中：这步不按主线，不会记为完成。点「重来」可以重新挑战。');
      feedback(free.givesCheck ? 'check' : free.move.captured ? 'capture' : 'move');
      return;
    }

    if (actual !== expected) {
      const nextAttempts = attempts + 1;
      // **不拦这步**：先按用户真实走的落子，再给失败提示。
      // 这样棋盘不会“点了没反应”，页面也不会因为消息块插入而整体跳动。
      const result = applyMove(position, selected, square);
      setAttempts(nextAttempts);
      setSelected(null);
      setTargets([]);
      setHint(null);
      feedback('error');
      if (result.ok) {
        setPosition(result.position);
        setLastMove({ from: result.move.from, to: result.move.to });
      }
      setFailed(true);
      setMessage('这步没有达到本关主线，挑战失败。现在可以自由走子，或点「重来」再试。');
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
    else persistInProgress(nextPly);
  }

  function showHint() {
    if (completed || !lesson) return;
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
    setFailed(false);
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
    setFailed(false);
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
  const Icon = kind === 'endgame' ? Crown : BookOpen;

  return (
    <div className="page training-play-page lesson-play-page">
      <div className="play-topline">
        <Link to={`/train/${kind}`} className="back-link">
          <ArrowLeft size={15} aria-hidden="true" />
          {trainingKindLabels[kind]}
        </Link>
        <span className="play-meta">
          <Icon size={14} aria-hidden="true" /> {lesson.title}
          {recordCompleted && <span className="done-label">已完成</span>}
        </span>
      </div>

      <div className="play-layout training-layout">
        <section className="board-column">
          <div className="board-toolbar">
            <div className={`turn-chip${autoMoving ? ' is-thinking' : ''}`}>
              <span className={`turn-disc ${boardPosition.turn}`} />
              {completed
                ? '主线完成'
                : autoMoving
                  ? '对手应手…'
                  : failed
                    ? `自由走子 · ${boardPosition.turn === 'r' ? '红方' : '黑方'}`
                    : userTurn
                      ? '请你走这一步'
                      : '等待演示'}
            </div>
            <span className="play-meta">
              <Timer size={14} aria-hidden="true" /> {formatDuration(completed ? completedElapsedRef.current : elapsed)}
            </span>
          </div>

          <Board
            position={boardPosition}
            orientation={userColor}
            selected={selected}
            legalTargets={targets}
            hint={hint}
            lastMove={lastMove}
            checkedSquare={checked}
            interactive={!completed && (failed || userTurn) && !autoMoving}
            onPoint={handlePoint}
          />

          {/* 固定高度的状态槽：提示出现/消失不改变棋盘与整页高度，避免“页面上下一晃” */}
          <div
            className={`inline-alert lesson-status${message ? '' : ' is-hint'}${failed ? ' inline-alert-error' : ''}`}
            role="status"
            aria-live="polite"
          >
            {message ?? '按主线走；如果不按步骤，会提示失败并进入自由走子。'}
          </div>

          <div className="line-progress">
            <div className="line-progress-label">
              <span>{line?.label ?? '主线'}</span>
              <span>{Math.min(ply, total)} / {total} 步</span>
            </div>
            <div className="progress-track">
              <span style={{ width: `${total ? Math.min(100, (ply / total) * 100) : 0}%` }} />
            </div>
          </div>

          {completed && (
            <div className="tactic-result">
              <div className="result-mark"><CheckCircle2 size={24} aria-hidden="true" /></div>
              <div>
                <span className="eyebrow">主线完成</span>
                <h2>{lesson.completionText}</h2>
                <p>用了 {formatDuration(completedElapsedRef.current)}，错试 {attempts} 次，提示 {hintsUsed} 次。</p>
              </div>
            </div>
          )}


        </section>

        <aside className="play-side">
          <div className="board-controls side-controls">
            <button type="button" className="control-button" disabled={completed || failed || autoMoving} onClick={showHint}>
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
              <span className="side-level">{lesson.level === 1 ? '入门' : '进阶'}</span>
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
            <p>{lesson.source.name} · {lesson.source.license}</p>
            <p className="muted small">审阅：{lesson.reviewedBy}</p>
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
