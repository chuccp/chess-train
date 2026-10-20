import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Circle, Crown } from 'lucide-react';
import { endgameLessons, openingLessons, trainingKindLabels } from '@qilian/content';
import { listTrainingProgress } from '../lib/storage';
import type { TrainingProgress } from '../types';

export function LessonListPage({ kind }: { kind: 'endgame' | 'opening' }) {
  const lessons = kind === 'endgame' ? endgameLessons : openingLessons;
  const [progress, setProgress] = useState<Record<string, TrainingProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    void listTrainingProgress(kind).then((items) => {
      if (!alive) return;
      setProgress(Object.fromEntries(items.map((item) => [item.itemId, item])));
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [kind]);

  const completed = Object.values(progress).filter((item) => item.status === 'completed').length;
  const next = lessons.find((item) => progress[item.id]?.status !== 'completed') ?? lessons[0];
  const totalPlies = useMemo(
    () => lessons.reduce((sum, lesson) => sum + (lesson.lines[0]?.moves.length ?? 0), 0),
    [lessons],
  );
  const Icon = kind === 'endgame' ? Crown : BookOpen;

  return (
    <div className="page list-page">
      <Link to="/train" className="back-link">
        <ArrowLeft size={15} aria-hidden="true" />
        训练场
      </Link>

      <div className="page-heading list-heading">
        <div>
          <div className="eyebrow">
            <Icon size={15} aria-hidden="true" />
            {trainingKindLabels[kind]}
          </div>
          <h1>{kind === 'endgame' ? '把少子下成胜势' : '把前六步走顺'}</h1>
          <p>
            {kind === 'endgame'
              ? '每节演示一段强制应手，先看目标，再跟着主线走。'
              : '每套开局一条主线，先理解出动顺序，不急着背变化。'}
          </p>
        </div>
        <div className="list-progress-badge">
          <strong>{completed}</strong>
          <span>/ {lessons.length} 完成</span>
        </div>
      </div>

      <div className="list-toolbar">
        <div className="lesson-meta-strip">
          <span>{lessons.length} 节</span>
          <span>{totalPlies} 步主线</span>
          <span>规则核校验</span>
        </div>
        {next && (
          <Link to={`/train/${kind}/${next.id}`} className="btn btn-dark">
            继续学习
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        )}
      </div>

      {loading ? (
        <p className="muted">读取学习记录…</p>
      ) : (
        <div className="lesson-list">
          {lessons.map((lesson) => {
            const record = progress[lesson.id];
            const done = record?.status === 'completed';
            const line = lesson.lines[0];
            return (
              <Link to={`/train/${kind}/${lesson.id}`} className={`lesson-row${done ? ' is-done' : ''}`} key={lesson.id}>
                <span className="lesson-number">{String(lesson.order).padStart(2, '0')}</span>
                <span className="lesson-icon">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="lesson-main">
                  <span className="lesson-topline">
                    <span className="tactic-theme">{lesson.tags[0]}</span>
                    <span className="lesson-level">{lesson.level === 1 ? '入门' : '进阶'}</span>
                  </span>
                  <strong>{lesson.title}</strong>
                  <small>{lesson.subtitle} · {line?.moves.length ?? 0} 步</small>
                </span>
                <span className={`lesson-state${done ? ' done' : ''}`}>
                  {done ? <CheckCircle2 size={18} aria-hidden="true" /> : <Circle size={18} aria-hidden="true" />}
                  {done ? '已完成' : '未开始'}
                </span>
                <ArrowRight size={17} className="lesson-arrow" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      )}

      <p className="source-line list-source">
        {kind === 'endgame'
          ? '残局演示为原创少子编排，规则核验证了全部黑方应手；来源：棋练项目组 · CC0-1.0。'
          : '开局主线由公开布局常识整理，规则核逐着校验；来源：棋练项目组 · CC0-1.0。'}
      </p>
    </div>
  );
}
