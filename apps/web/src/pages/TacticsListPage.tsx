import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Target } from 'lucide-react';
import { tacticExercises } from '@qilian/content';
import { listTrainingProgress } from '../lib/storage';
import type { TrainingProgress } from '../types';

export function TacticsListPage() {
  const [progress, setProgress] = useState<Record<string, TrainingProgress>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'todo' | 'done'>('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(30);

  useEffect(() => {
    setVisibleCount(30);
  }, [filter, query]);

  useEffect(() => {
    let alive = true;
    void listTrainingProgress('tactics').then((items) => {
      if (!alive) return;
      setProgress(Object.fromEntries(items.map((item) => [item.itemId, item])));
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  const visible = useMemo(
    () =>
      tacticExercises.filter((item) => {
        const done = progress[item.id]?.status === 'completed';
        if (filter === 'todo' && done) return false;
        if (filter === 'done' && !done) return false;
        const needle = query.trim().toLowerCase();
        if (!needle) return true;
        return [item.title, item.subtitle, item.tags.join(' '), item.source.name]
          .join(' ')
          .toLowerCase()
          .includes(needle);
      }),
    [filter, progress, query],
  );
  const shown = visible.slice(0, visibleCount);

  const completed = Object.values(progress).filter((item) => item.status === 'completed').length;
  const next = tacticExercises.find((item) => progress[item.id]?.status !== 'completed') ?? tacticExercises[0];

  return (
    <div className="page list-page">
      <Link to="/train" className="back-link">
        <ArrowLeft size={15} aria-hidden="true" />
        训练场
      </Link>

      <div className="page-heading list-heading">
        <div>
          <div className="eyebrow">
            <Target size={15} aria-hidden="true" />
            一步杀法
          </div>
          <h1>一步杀法题库</h1>
          <p>
            {tacticExercises.length} 道红先杀法，按入门、进阶、挑战排序；将死与困毙都算完成。
          </p>
        </div>
        <div className="list-progress-badge">
          <strong>{completed}</strong>
          <span>/ {tacticExercises.length} 完成</span>
        </div>
      </div>

      <div className="list-toolbar">
        <div className="lesson-toolbar-primary">
          <div className="segmented small">
            <button type="button" className={filter === 'all' ? 'is-selected' : ''} onClick={() => setFilter('all')}>
              全部
            </button>
            <button type="button" className={filter === 'todo' ? 'is-selected' : ''} onClick={() => setFilter('todo')}>
              未完成
            </button>
            <button type="button" className={filter === 'done' ? 'is-selected' : ''} onClick={() => setFilter('done')}>
              已完成
            </button>
          </div>
          <span className="sort-note">由易到难排序</span>
        </div>
        <div className="list-actions">
          <input
            className="list-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索杀法或来源"
            aria-label="搜索杀法"
          />
          {next && (
            <Link to={`/train/tactics/${next.id}`} className="btn btn-dark">
              继续练习
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      {loading ? (
        <p className="muted">读取训练记录…</p>
      ) : visible.length === 0 ? (
        <div className="empty-state panel">
          <CheckCircle2 size={30} aria-hidden="true" />
          <h2>{query.trim() ? '没有找到匹配的杀法' : filter === 'done' ? '还没有完成的题目' : '这一组已经练完了'}</h2>
          <p>
            {query.trim()
              ? '可以换一个标题、来源或标签再试。'
              : filter === 'done'
                ? '先做几道题，完成记录会出现在这里。'
                : '可以切换筛选，或重新练一遍。'}
          </p>
        </div>
      ) : (
        <>
          <div className="tactic-grid">
            {shown.map((item) => {
            const record = progress[item.id];
            const done = record?.status === 'completed';
            return (
              <Link to={`/train/tactics/${item.id}`} className={`tactic-card${done ? ' is-done' : ''}`} key={item.id}>
                <div className="tactic-order">
                  {String(tacticExercises.indexOf(item) + 1).padStart(2, '0')}
                </div>
                <div className="tactic-content">
                  <span className="tactic-theme">{item.tags[0]}</span>
                  <h2>{item.title.replace(/^.*?·\s*/, '')}</h2>
                  <p>{item.hint}</p>
                  <div className="tactic-meta">
                    <span>{item.level === 1 ? '入门' : item.level === 2 ? '进阶' : '挑战'}</span>
                    <span>{item.solutions.length} 种胜法</span>
                    {done && (
                      <span className="done-label">
                        <CheckCircle2 size={13} aria-hidden="true" />
                        {record?.revealedAnswer ? '看答案完成' : record?.independentSolve ? '独立完成' : '提示后完成'}
                      </span>
                    )}
                  </div>
                </div>
                <span className={`tactic-status${done ? ' done' : ''}`}>
                  {done ? <CheckCircle2 size={19} aria-hidden="true" /> : <Circle size={19} aria-hidden="true" />}
                </span>
              </Link>
            );
          })}
          </div>
          {visibleCount < visible.length && (
            <button
              type="button"
              className="btn btn-outline list-more"
              onClick={() => setVisibleCount((count) => count + 30)}
            >
              显示更多（还剩 {visible.length - visibleCount} 题）
            </button>
          )}
        </>
      )}

      <p className="source-line list-source">
        原创题为棋练项目组 CC0；古谱题注明原书与局号。规则核逐题验证全部一步胜利终局，将死与困毙均计入。
      </p>
    </div>
  );
}
