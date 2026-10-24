import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  RotateCcw,
  Target,
  Timer,
  XCircle,
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
} from '@qilian/xiangqi';
import {
  nextTrainingItem,
  tacticById,
} from '@qilian/content';
import { Board } from '../components/Board';
import { BoardToast } from '../components/BoardToast';
import { getTrainingProgress, saveTrainingProgress } from '../lib/storage';
import { playCue, vibrate } from '../lib/feedback';
import { formatDuration } from '../lib/format';
import { useSettingsStore } from '../stores/settings';
import type { TrainingProgress } from '../types';

type Phase = 'solving' | 'solved';

export function TacticsPlayPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const exercise = tacticById(id);
  const settings = useSettingsStore();

  const initial = useMemo(() => {
    if (!exercise) return null;
    try {
      return parseFen(exercise.fen);
    } catch {
      return null;
    }
  }, [exercise]);

  const [position, setPosition] = useState(initial);
  const [selected, setSelected] = useState<number | null>(null);
  const [targets, setTargets] = useState<number[]>([]);
  const [phase, setPhase] = useState<Phase>('solving');
  const [attempts, setAttempts] = useState(0);
  const [hints, setHints] = useState(0);
  const [hint, setHint] = useState<{ from: number; to: number } | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [solvedNotation, setSolvedNotation] = useState<string | null>(null);
  const [lastMove, setLastMove] = useState<{ from: number; to: number } | null>(null);
  const [successBarVisible, setSuccessBarVisible] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [loadedProgress, setLoadedProgress] = useState<TrainingProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const startRef = useRef(Date.now());
  const solvedElapsedRef = useRef(0);

  useEffect(() => {
    setPosition(initial);
    setSelected(null);
    setTargets([]);
    setPhase('solving');
    setAttempts(0);
    setHints(0);
    setHint(null);
    setMessage(null);
    setSolvedNotation(null);
    setLastMove(null);
    setElapsed(0);
    startRef.current = Date.now();
    solvedElapsedRef.current = 0;
  }, [id, initial]);

  useEffect(() => {
    let alive = true;
    if (!exercise) {
      setLoading(false);
      return;
    }
    void getTrainingProgress(`tactics:${exercise.id}`).then((record) => {
      if (!alive) return;
      setLoadedProgress(record);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [exercise]);

  useEffect(() => {
    if (phase === 'solving') {
      setSuccessBarVisible(false);
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setSuccessBarVisible(true);
      return;
    }
    const timer = window.setTimeout(() => setSuccessBarVisible(true), 1950);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'solving') return;
    const timer = window.setInterval(() => {
      setElapsed(Date.now() - startRef.current);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase]);

  if (!exercise || !initial || !position) {
    return (
      <div className="page empty-state">
        <h1>题目不存在</h1>
        <Link to="/train/tactics" className="btn btn-dark">返回杀法训练</Link>
      </div>
    );
  }

  const next = nextTrainingItem('tactics', exercise.id);
  const checked = position && isInCheck(position, position.turn)
    ? getKingSquare(position.board, position.turn)
    : null;
  const isSolved = phase !== 'solving';
  const recordCompleted = loadedProgress?.status === 'completed';

  function feedback(kind: 'move' | 'capture' | 'check' | 'win' | 'error') {
    if (settings.sound) playCue(kind);
    if (settings.haptics) vibrate(kind === 'error' ? [20, 30, 20] : 10);
  }

  async function persist(completed: boolean) {
    if (!exercise) return;
    const finalElapsed = solvedElapsedRef.current || (completed ? Date.now() - startRef.current : elapsed);
    if (completed) solvedElapsedRef.current = finalElapsed;
    const record: TrainingProgress = {
      key: `tactics:${exercise.id}`,
      itemId: exercise.id,
      kind: 'tactics',
      status: completed ? 'completed' : 'in_progress',
      ply: completed ? 1 : 0,
      attempts: attempts + (completed ? 1 : 0),
      hintsUsed: hints,
      elapsedMs: finalElapsed,
      revealedAnswer: false,
      independentSolve: completed && hints === 0,
      updatedAt: new Date().toISOString(),
      completedAt: completed ? new Date().toISOString() : undefined,
      completedLineIds: [],
    };
    setLoadedProgress(record);
    await saveTrainingProgress(record);
  }

  function handlePoint(square: number) {
    if (!position || !exercise || isSolved) return;
    const piece = pieceAt(position, square);
    if (selected === null) {
      if (piece?.color === 'r') {
        const legal = generateLegalMoves(position).filter((move) => move.from === square).map((move) => move.to);
        setSelected(square);
        setTargets(legal);
        setMessage(null);
      } else {
        setMessage('先选择红方棋子。');
      }
      return;
    }

    if (selected === square) {
      setSelected(null);
      setTargets([]);
      return;
    }

    if (piece?.color === 'r') {
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

    const result = applyMove(position, selected, square);
    if (!result.ok) {
      setMessage(result.message);
      return;
    }
    const end = evaluateBoard(result.position, { positionHashes: [] });
    if (end.status !== 'win' || end.winner !== 'r' || end.reason !== 'checkmate') {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setSelected(null);
      setTargets([]);
      setMessage('这步没有形成将死，再找找。');
      feedback('error');
      if (loadedProgress?.status !== 'completed') {
        void saveTrainingProgress({
          key: `tactics:${exercise.id}`,
          itemId: exercise.id,
          kind: 'tactics',
          status: 'in_progress',
          ply: 0,
          attempts: nextAttempts,
          hintsUsed: hints,
          elapsedMs: Date.now() - startRef.current,
          updatedAt: new Date().toISOString(),
          completedLineIds: [],
        });
      }
      return;
    }

    solvedElapsedRef.current = Date.now() - startRef.current;
    setPosition(result.position);
    setSelected(null);
    setTargets([]);
    setLastMove({ from: result.move.from, to: result.move.to });
    setPhase('solved');
    setSolvedNotation(result.notation);
    setMessage(null);
    feedback('win');
    void persist(true);
  }

  function showHint() {
    if (!exercise || isSolved) return;
    const first = exercise.solutions[0]?.[0];
    if (!first) return;
    const parsed = parseUcci(first);
    if (!parsed) return;
    setHint({ from: parsed.from, to: parsed.to });
    setHints((value) => value + 1);
    setMessage('金色箭头标出了一步可行的杀着。先顺着它想一想。');
    if (loadedProgress?.status !== 'completed') {
      void saveTrainingProgress({
        key: `tactics:${exercise.id}`,
        itemId: exercise.id,
        kind: 'tactics',
        status: 'in_progress',
        ply: 0,
        attempts,
        hintsUsed: hints + 1,
        elapsedMs: Date.now() - startRef.current,
        updatedAt: new Date().toISOString(),
        completedLineIds: [],
      });
    }
  }

  function reset() {
    setPosition(initial);
    setSelected(null);
    setTargets([]);
    setPhase('solving');
    setAttempts(0);
    setHints(0);
    setHint(null);
    setMessage(null);
    setSolvedNotation(null);
    setLastMove(null);
    setSuccessBarVisible(false);
    setElapsed(0);
    startRef.current = Date.now();
    solvedElapsedRef.current = 0;
  }

  return (
    <div className={`page training-play-page${isSolved ? ' has-success' : ''}`}>
      <div className="play-topline">
        <Link to="/train/tactics" className="back-link">
          <ArrowLeft size={15} aria-hidden="true" />
          杀法训练
        </Link>
        <span className="play-meta">
          <Target size={14} aria-hidden="true" /> 红先 · 一步将死
          {recordCompleted && <span className="done-label">已练过</span>}
        </span>
      </div>

      <div className="play-layout training-layout">
        <section className="board-column">
          <div className="board-toolbar">
            <div className="turn-chip">
              <span className="turn-disc r" />
              {isSolved ? '将死成立' : '找出一步将死'}
            </div>
            <span className="play-meta">
              <Timer size={14} aria-hidden="true" /> {formatDuration(isSolved ? solvedElapsedRef.current : elapsed)}
            </span>
          </div>

          <div className="board-frame">
            <Board
              position={position}
              orientation="r"
              selected={selected}
              legalTargets={targets}
              hint={hint}
              lastMove={lastMove}
              checkedSquare={checked}
              checkmate={isSolved && checked !== null}
              interactive={!isSolved}
              onPoint={handlePoint}
            />
            <BoardToast
              message={message}
              tone={phase === 'solving' && message?.includes('不是') ? 'error' : 'info'}
              onDismiss={() => setMessage(null)}
            />
            {isSolved && successBarVisible && (
              <div className="tactic-result lesson-result-card" role="status" aria-live="polite">
                <div className="result-mark">
                  <CheckCircle2 size={24} aria-hidden="true" />
                </div>
                <div>
                  <span className="eyebrow">杀法成立</span>
                  <h2>{solvedNotation}</h2>
                  <p>
                    {hints === 0
                      ? '独立找到杀着'
                      : '借助提示找到杀着'}
                    ，用时 {formatDuration(solvedElapsedRef.current)}，错试 {attempts} 次，提示 {hints} 次。
                  </p>
                </div>
                <div className="board-result-actions">
                  {next ? (
                    <button
                      type="button"
                      className="btn btn-primary btn-small"
                      onClick={() => navigate(`/train/tactics/${next.id}`)}
                    >
                      <ArrowRight size={15} aria-hidden="true" />
                      下一题
                    </button>
                  ) : (
                    <Link to="/train/tactics" className="btn btn-primary btn-small">
                      <ArrowRight size={15} aria-hidden="true" />
                      返回列表
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <aside className="play-side">
          <div className="board-controls side-controls">
            <button type="button" className="control-button" disabled={isSolved} onClick={showHint}>
              <Lightbulb size={18} aria-hidden="true" />
              <span>提示</span>
            </button>
            <button type="button" className="control-button" onClick={reset}>
              <RotateCcw size={18} aria-hidden="true" />
              <span>重做</span>
            </button>
            {!isSolved && (
              next ? (
                <button type="button" className="control-button primary" onClick={() => navigate(`/train/tactics/${next.id}`)}>
                  <ArrowRight size={18} aria-hidden="true" />
                  <span>下一题</span>
                </button>
              ) : (
                <Link to="/train/tactics" className="control-button primary">
                  <ArrowRight size={18} aria-hidden="true" />
                  <span>返回列表</span>
                </Link>
              )
            )}
          </div>
          <section className="side-card">
            <div className="side-heading">
              <span className="eyebrow">本题</span>
              <span className="side-level">
                {exercise.level === 1 ? '入门' : exercise.level === 2 ? '进阶' : '挑战'}
              </span>
            </div>
            <h1 className="exercise-title">{exercise.title}</h1>
            <p className="exercise-subtitle">{exercise.subtitle}</p>
            <div className="exercise-stats">
              <span><Timer size={14} aria-hidden="true" /> {formatDuration(isSolved ? solvedElapsedRef.current : elapsed)}</span>
              <span><XCircle size={14} aria-hidden="true" /> 错试 {attempts}</span>
              <span><Lightbulb size={14} aria-hidden="true" /> 提示 {hints}</span>
            </div>
            <p className="exercise-goal">
              <strong>目标</strong> 红方先行，一步将死黑方。
            </p>
            {!isSolved && (
              <div className="hint-box">
                <Lightbulb size={16} aria-hidden="true" />
                <p>{hints > 0 ? exercise.hint : '先看黑将的九宫退路：哪些格子已经被红子控制？'}</p>
              </div>
            )}
            {isSolved && (
              <div className="explanation-box">
                <span className="eyebrow">为什么</span>
                <p>
                  {`${solvedNotation} 之后，黑将没有合法应手，形成将死。`}
                </p>
              </div>
            )}
            <div className="source-info">
              <span>来源：{exercise.source.name}</span>
              <span>{exercise.source.license}</span>
            </div>
          </section>

          <section className="side-card">
            <span className="eyebrow">本题思路</span>
            <ul className="plain-list compact-list">
              <li><Target size={15} aria-hidden="true" /> 先找所有能将军的着法</li>
              <li><Target size={15} aria-hidden="true" /> 再看黑将还能走到哪里</li>
              <li><Target size={15} aria-hidden="true" /> 如果都有子控制，就是杀</li>
            </ul>
            <Link to="/train" className="text-link">
              回到训练场
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </section>
        </aside>
      </div>

    </div>
  );
}
