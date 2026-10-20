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
        if (filter === 'todo') return !done;
        if (filter === 'done') return done;
        return true;
      }),
    [filter, progress],
  );

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
            杀法训练
          </div>
          <h1>找到那步将死</h1>
          <p>每题红先，一步将死。先自己找，再看提示或解释。</p>
        </div>
        <div className="list-progress-badge">
          <strong>{completed}</strong>
          <span>/ {tacticExercises.length} 完成</span>
        </div>
      </div>

      <div className="list-toolbar">
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
        {next && (
          <Link to={`/train/tactics/${next.id}`} className="btn btn-dark">
            继续练习
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        )}
      </div>

      {loading ? (
        <p className="muted">读取训练记录…</p>
      ) : visible.length === 0 ? (
        <div className="empty-state panel">
          <CheckCircle2 size={30} aria-hidden="true" />
          <h2>{filter === 'done' ? '还没有完成的题目' : '这一组已经练完了'}</h2>
          <p>{filter === 'done' ? '先做几道题，完成记录会出现在这里。' : '可以切换筛选，或重新练一遍。'}</p>
        </div>
      ) : (
        <div className="tactic-grid">
          {visible.map((item) => {
            const record = progress[item.id];
            const done = record?.status === 'completed';
            return (
              <Link to={`/train/tactics/${item.id}`} className={`tactic-card${done ? ' is-done' : ''}`} key={item.id}>
                <div className="tactic-order">{String(item.order).padStart(2, '0')}</div>
                <div className="tactic-content">
                  <span className="tactic-theme">{item.tags[0]}</span>
                  <h2>{item.title.replace(/^.*?·\s*/, '')}</h2>
                  <p>{item.hint}</p>
                  <div className="tactic-meta">
                    <span>{item.level === 1 ? '入门' : item.level === 2 ? '进阶' : '挑战'}</span>
                    <span>{item.solutions.length} 种杀法</span>
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
      )}

      <p className="source-line list-source">
        题型为原创一步杀，规则核逐题验证；来源：棋练项目组 · CC0-1.0。
      </p>
    </div>
  );
}
