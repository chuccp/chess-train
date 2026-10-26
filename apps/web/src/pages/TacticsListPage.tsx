import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Shuffle, Star } from 'lucide-react';
import { tacticExercises } from '@qilian/content';
import { listTrainingProgress } from '../lib/storage';
import { favoriteKey, useFavorites } from '../lib/favorites';
import { randomTrainingPath } from '../lib/randomTraining';
import type { TrainingProgress } from '../types';

export function TacticsListPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<Record<string, TrainingProgress>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'todo' | 'done' | 'fav'>('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(30);
  const favorites = useFavorites();
  const favoritedTactics = useMemo(
    () => tacticExercises.filter((item) => favorites.includes(favoriteKey('tactics', item.id))),
    [favorites],
  );
  const favoriteCount = favoritedTactics.length;

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
        const favorited = favorites.includes(favoriteKey('tactics', item.id));
        if (filter === 'todo' && done) return false;
        if (filter === 'done' && !done) return false;
        if (filter === 'fav' && !favorited) return false;
        const needle = query.trim().toLowerCase();
        if (!needle) return true;
        return [item.title, item.subtitle, item.tags.join(' '), item.source.name]
          .join(' ')
          .toLowerCase()
          .includes(needle);
      }),
    [favorites, filter, progress, query],
  );
  const shown = visible.slice(0, visibleCount);

  const completed = Object.values(progress).filter((item) => item.status === 'completed').length;
  const practicePool = filter === 'fav' ? favoritedTactics : tacticExercises;
  const next =
    practicePool.find((item) => progress[item.id]?.status !== 'completed') ?? practicePool[0];

  return (
    <div className="page list-page">
      <Link to="/train" className="back-link">
        <ArrowLeft size={15} aria-hidden="true" />
        训练场
      </Link>

      <div className="page-heading list-heading">
        <div>
          <div className="eyebrow">一步杀法</div>
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
          <div className="segmented small">
            <button type="button" className={filter === 'fav' ? 'is-selected' : ''} onClick={() => setFilter('fav')}>
              收藏{favoriteCount > 0 ? ` ${favoriteCount}` : ''}
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
          <button
            type="button"
            className="btn btn-primary"
            disabled={practicePool.length === 0}
            onClick={() => {
              const target = randomTrainingPath('tactics', undefined, practicePool);
              if (!target) return;
              navigate(filter === 'fav' ? `${target}&source=favorites` : target);
            }}
          >
            <Shuffle size={16} aria-hidden="true" />
            {filter === 'fav' ? '随机练收藏' : '随机刷题'}
          </button>
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
          <h2>
            {query.trim()
              ? '没有找到匹配的杀法'
              : filter === 'fav'
                ? '还没有收藏的杀法'
                : filter === 'done'
                  ? '还没有完成的题目'
                  : '这一组已经练完了'}
          </h2>
          <p>
            {query.trim()
              ? '可以换一个标题、来源或标签再试。'
              : filter === 'fav'
                ? '打开一道题，点右上角「收藏」，就能在这里专项练习。'
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
            const favorited = favorites.includes(favoriteKey('tactics', item.id));
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
                    {favorited && (
                      <span className="favorite-label">
                        <Star size={13} fill="currentColor" aria-hidden="true" />
                        已收藏
                      </span>
                    )}
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
