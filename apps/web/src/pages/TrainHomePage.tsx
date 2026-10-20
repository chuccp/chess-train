import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Crown,
  GraduationCap,
  Layers,
  ShieldCheck,
  Target,
} from 'lucide-react';
import {
  contentStats,
  endgameLessons,
  openingLessons,
  tacticExercises,
  type TrainingKind,
} from '@qilian/content';
import { listTrainingProgress } from '../lib/storage';
import type { TrainingProgress } from '../types';

const kindCards: Array<{
  kind: TrainingKind;
  title: string;
  eyebrow: string;
  description: string;
  detail: string;
  icon: typeof Target;
  tone: string;
  to: string;
}> = [
  {
    kind: 'tactics',
    eyebrow: '杀法训练',
    title: '找到那步将死',
    description: '短题目、即时反馈。先把“看见杀形”变成条件反射，再谈计算。',
    detail: `${contentStats.tactics} 道原创一步杀`,
    icon: Target,
    tone: 'red',
    to: '/train/tactics',
  },
  {
    kind: 'endgame',
    eyebrow: '残局定式',
    title: '把少子下成胜势',
    description: '古谱短局与原创短课，在限定步数内找到将死。每一步都有解释。',
    detail: `${contentStats.endgame} 节残局 · 含古谱`,
    icon: Crown,
    tone: 'green',
    to: '/train/endgame',
  },
  {
    kind: 'opening',
    eyebrow: '开局训练',
    title: '把开局顺序走顺',
    description: '从经典开局主线理解出动、护中和占位，再逐步扩展变化。',
    detail: `${contentStats.opening} 套开局 · 含古谱`,
    icon: BookOpen,
    tone: 'gold',
    to: '/train/opening',
  },
];

export function TrainHomePage() {
  const [progress, setProgress] = useState<TrainingProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    void listTrainingProgress().then((items) => {
      if (!alive) return;
      setProgress(items);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  const completedByKind = useMemo(() => {
    return progress.reduce<Record<string, number>>((acc, item) => {
      if (item.status === 'completed') acc[item.kind] = (acc[item.kind] ?? 0) + 1;
      return acc;
    }, {});
  }, [progress]);

  const totalCompleted = progress.filter((item) => item.status === 'completed').length;
  const totalItems = contentStats.tactics + contentStats.endgame + contentStats.opening;

  return (
    <div className="page train-page">
      <section className="page-heading">
        <div className="eyebrow">
          <GraduationCap size={15} aria-hidden="true" />
          训练场
        </div>
        <h1>把棋感练出来</h1>
        <p>三种模式，三种看法：找杀、收残局、走开局。训练内容不需要引擎，下载棋力时也能先练。</p>
      </section>

      <div className="training-grid training-grid-large">
        {kindCards.map((card) => {
          const Icon = card.icon;
          const count = card.kind === 'tactics' ? contentStats.tactics : card.kind === 'endgame' ? contentStats.endgame : contentStats.opening;
          const done = completedByKind[card.kind] ?? 0;
          return (
            <Link to={card.to} className={`training-card training-card-${card.tone}`} key={card.kind}>
              <div className="training-card-icon">
                <Icon size={24} aria-hidden="true" />
              </div>
              <div>
                <span className="training-kicker">{card.eyebrow}</span>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>
              <div className="training-footer">
                <span>{card.detail}</span>
                <span className="training-progress-label">
                  {done}/{count}
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </div>
              <div className="training-progress">
                <span style={{ width: `${count ? Math.min(100, (done / count) * 100) : 0}%` }} />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="train-summary">
        <div className="panel train-progress-panel">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">总进度</span>
              <h2>{loading ? '读取中…' : `${totalCompleted} / ${totalItems} 项`}</h2>
            </div>
            <Layers size={22} className="muted-icon" aria-hidden="true" />
          </div>
          <div className="progress-track large">
            <span style={{ width: `${totalItems ? (totalCompleted / totalItems) * 100 : 0}%` }} />
          </div>
          <p className="muted small">完成一次独立解答或走完一条主线，就会记录在这里。</p>
        </div>

        <div className="panel train-note-panel">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">内容原则</span>
              <h2>少而能讲清</h2>
            </div>
            <ShieldCheck size={22} className="muted-icon" aria-hidden="true" />
          </div>
          <ul className="plain-list">
            <li><CheckCircle2 size={15} aria-hidden="true" /> 每题都经规则核校验合法性与终局</li>
            <li><CheckCircle2 size={15} aria-hidden="true" /> 残局演示验证了黑方全部应手</li>
            <li><CheckCircle2 size={15} aria-hidden="true" /> 开局主线由公开布局常识整理</li>
          </ul>
          <p className="source-line">
            首批内容：{tacticExercises.length} 道杀法、{endgameLessons.length} 节残局、
            {openingLessons.length} 套开局 · 原创编排，CC0-1.0
          </p>
        </div>
      </div>

      <section className="train-tip">
        <span className="tip-mark">练</span>
        <div>
          <strong>训练时先想，再看解释。</strong>
          <p>答错不会扣分；点提示或看答案会计入记录，但不会阻止你继续练。</p>
        </div>
      </section>
    </div>
  );
}
