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
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(30);

  useEffect(() => {
    setVisibleCount(30);
  }, [kind, query]);

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
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return lessons;
    return lessons.filter((lesson) =>
      [lesson.title, lesson.subtitle, lesson.tags.join(' '), lesson.source.name]
        .join(' ')
        .toLowerCase()
        .includes(needle),
    );
  }, [lessons, query]);
  const shown = filtered.slice(0, visibleCount);
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
          <h1>{kind === 'endgame' ? '把少子下成胜势' : '把开局顺序走顺'}</h1>
          <p>
            {kind === 'endgame'
              ? '古谱与短课都在限定步数内完成；先看目标，再跟着主线走。'
              : '每套开局一条主线，先理解出动顺序，再逐步扩展变化。'}
          </p>
        </div>
        <div className="list-progress-badge">
          <strong>{completed}</strong>
          <span>/ {lessons.length} 完成</span>
        </div>
      </div>

      <div className="list-toolbar">
        <div className="lesson-meta-strip">
          <span>
            {filtered.length === lessons.length
              ? `${lessons.length} 节`
              : `${filtered.length} / ${lessons.length} 节`}
          </span>
          <span>{totalPlies} 步主线</span>
          <span>规则核校验</span>
        </div>
        <div className="list-actions">
          <input
            className="list-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索标题、来源或标签"
            aria-label="搜索棋谱"
          />
          {next && (
            <Link to={`/train/${kind}/${next.id}`} className="btn btn-dark">
              继续学习
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      {loading ? (
        <p className="muted">读取学习记录…</p>
      ) : filtered.length === 0 ? (
        <div className="empty-state panel">
          <h2>没有找到匹配的棋谱</h2>
          <p>可以换一个标题、来源或标签再试。</p>
        </div>
      ) : (
        <>
          <div className="lesson-list">
            {shown.map((lesson) => {
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
                      <span className="lesson-level">
                        {lesson.level === 1 ? '入门' : lesson.level === 2 ? '进阶' : '挑战'}
                      </span>
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
          {visibleCount < filtered.length && (
            <button
              type="button"
              className="btn btn-outline list-more"
              onClick={() => setVisibleCount((count) => count + 30)}
            >
              显示更多（还剩 {filtered.length - visibleCount} 节）
            </button>
          )}
        </>
      )}

      <p className="source-line list-source">
        {kind === 'endgame'
          ? '古谱条目注明原书与局号，原创短课为棋练项目组 CC0；所有主线均经规则核校验。'
          : '古谱条目注明原书与局号，原创条目为棋练项目组 CC0；所有主线均经规则核逐着校验。'}
      </p>
    </div>
  );
}
