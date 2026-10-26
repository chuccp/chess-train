import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Circle, Crown, Shuffle, Star } from 'lucide-react';
import { endgameLessons, openingLessons, trainingKindLabels } from '@qilian/content';
import { listTrainingProgress } from '../lib/storage';
import { favoriteKey, useFavorites } from '../lib/favorites';
import { randomTrainingPath } from '../lib/randomTraining';
import type { TrainingProgress } from '../types';

export function LessonListPage({ kind }: { kind: 'endgame' | 'opening' }) {
  const navigate = useNavigate();
  const lessons = kind === 'endgame' ? endgameLessons : openingLessons;
  const [progress, setProgress] = useState<Record<string, TrainingProgress>>({});
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<0 | 1 | 2 | 3>(0);
  const [favOnly, setFavOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(30);
  const favorites = useFavorites();

  useEffect(() => {
    setVisibleCount(30);
  }, [favOnly, kind, levelFilter, query]);

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
  const favoriteLessons = useMemo(
    () => lessons.filter((lesson) => favorites.includes(favoriteKey(kind, lesson.id))),
    [favorites, kind, lessons],
  );
  const favoriteCount = favoriteLessons.length;
  const scopedLessons = favOnly ? favoriteLessons : lessons;
  const next =
    scopedLessons.find((item) => progress[item.id]?.status !== 'completed') ?? scopedLessons[0];
  const filtered = useMemo(() => {
    const byLevel =
      levelFilter === 0 ? scopedLessons : scopedLessons.filter((lesson) => lesson.level === levelFilter);
    const needle = query.trim().toLowerCase();
    if (!needle) return byLevel;
    return byLevel.filter((lesson) =>
      [lesson.title, lesson.subtitle, lesson.tags.join(' '), lesson.source.name]
        .join(' ')
        .toLowerCase()
        .includes(needle),
    );
  }, [levelFilter, query, scopedLessons]);
  const shown = filtered.slice(0, visibleCount);
  const Icon = kind === 'endgame' ? Crown : BookOpen;

  return (
    <div className={`page list-page${kind === 'opening' ? ' is-opening-list' : ''}`}>
      <Link to="/train" className="back-link">
        <ArrowLeft size={15} aria-hidden="true" />
        训练场
      </Link>

      <div className="page-heading list-heading">
        <div>
          <div className="eyebrow">{trainingKindLabels[kind]}</div>
        </div>
        <div className="list-progress-badge">
          <strong>{completed}</strong>
          <span>/ {lessons.length} 完成</span>
        </div>
      </div>

      <div className="list-toolbar">
        <div className="lesson-toolbar-primary">
          <div
            className="segmented small lesson-level-filter"
            aria-label={kind === 'endgame' ? '筛选残棋难度' : '筛选开局难度'}
          >
            {[
              [0, '全部'],
              [1, '入门'],
              [2, '进阶'],
              [3, '挑战'],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={levelFilter === value ? 'is-selected' : ''}
                onClick={() => setLevelFilter(value as 0 | 1 | 2 | 3)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="segmented small">
            <button
              type="button"
              aria-pressed={favOnly}
              className={favOnly ? 'is-selected' : ''}
              onClick={() => setFavOnly((value) => !value)}
            >
              收藏{favoriteCount > 0 ? ` ${favoriteCount}` : ''}
            </button>
          </div>
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
          <button
            type="button"
            className="btn btn-primary"
            disabled={scopedLessons.length === 0}
            onClick={() => {
              const target = randomTrainingPath(kind, undefined, scopedLessons);
              if (!target) return;
              navigate(favOnly ? `${target}&source=favorites` : target);
            }}
          >
            <Shuffle size={16} aria-hidden="true" />
            {favOnly ? '随机练收藏' : '随机刷题'}
          </button>
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
          <h2>
            {favOnly
              ? favoriteCount === 0
                ? '这一组还没有收藏'
                : '没有找到匹配的收藏'
              : '没有找到匹配的棋谱'}
          </h2>
          <p>
            {favOnly
              ? favoriteCount === 0
                ? '打开一节课程，点右上角「收藏」，就能在这里专项练习。'
                : '可以调整难度筛选，或换一个搜索词。'
              : '可以换一个标题、来源或标签再试。'}
          </p>
        </div>
      ) : (
        <>
          <div className="lesson-list">
            {shown.map((lesson) => {
              const record = progress[lesson.id];
              const done = record?.status === 'completed';
              const favorited = favorites.includes(favoriteKey(kind, lesson.id));
              const line = lesson.lines[0];
              return (
                <Link to={`/train/${kind}/${lesson.id}`} className={`lesson-row${done ? ' is-done' : ''}`} key={lesson.id}>
                  <span className="lesson-number">{String(lessons.indexOf(lesson) + 1).padStart(2, '0')}</span>
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
                  {favorited && (
                    <Star
                      size={15}
                      fill="currentColor"
                      className="favorite-mark"
                      aria-label="已收藏"
                    />
                  )}
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
