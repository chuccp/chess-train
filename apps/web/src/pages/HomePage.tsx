import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Crown,
  Flag,
  GraduationCap,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Swords,
  Target,
  Trophy,
  Users,
} from 'lucide-react';
import { contentStats, trainingKindLabels } from '@qilian/content';
import type { Color } from '@qilian/xiangqi';
import { useEngineStore } from '../stores/engine';
import { useGameStore, levelLabel, resultLabel } from '../stores/game';
import { useSettingsStore } from '../stores/settings';
import { engineTotalBytes } from '../engine/manifest';
import { EnginePrepCard } from '../components/EnginePrepCard';
import { MobileGameLobby } from '../components/MobileGameLobby';
import { listFinishedGames, listTrainingProgress } from '../lib/storage';
import { formatBytes, formatDate, formatDuration } from '../lib/format';
import type { FinishedGame, Level } from '../types';

export function HomePage() {
  const navigate = useNavigate();
  const engineReady = useEngineStore((state) => state.engineReady);
  const offlineReady = useEngineStore((state) => state.offlineReady);
  const enginePhase = useEngineStore((state) => state.phase);
  const engineError = useEngineStore((state) => state.error);
  const engineLoaded = useEngineStore((state) => state.loaded);
  const engineTotal = useEngineStore((state) => state.total);
  const current = useGameStore((state) => state.current);
  const hydrated = useGameStore((state) => state.hydrated);
  const startNewGame = useGameStore((state) => state.startNewGame);
  const settings = useSettingsStore();

  const [color, setColor] = useState<Color>(settings.preferredColor);
  const [level, setLevel] = useState<Level>(settings.preferredLevel);
  const [recentGames, setRecentGames] = useState<FinishedGame[]>([]);
  const [completed, setCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    let alive = true;
    void Promise.all([listFinishedGames(), listTrainingProgress()]).then(([games, progress]) => {
      if (!alive) return;
      setRecentGames(games.slice(0, 3));
      setCompleted(progress.filter((item) => item.status === 'completed').length);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [current?.updatedAt]);

  const activeGame = current && current.phase !== 'finished';
  const finishedCurrent = current && current.phase === 'finished';
  const completedTactics = completed;
  const totalTraining = contentStats.tactics + contentStats.endgame + contentStats.opening;

  const winCount = useMemo(
    () =>
      recentGames.filter(
        (game) => game.result.status === 'win' && game.result.winner === game.playerColor,
      ).length,
    [recentGames],
  );

  async function start() {
    setStarting(true);
    const ok = await startNewGame(color, level);
    setStarting(false);
    if (ok) navigate('/play');
  }

  function openCurrent() {
    navigate('/play');
  }

  return (
    <div className="page home-page">
      <MobileGameLobby
        current={current}
        engineReady={engineReady}
        offlineReady={offlineReady}
        enginePhase={enginePhase}
        engineError={engineError}
        engineLoaded={engineLoaded}
        engineTotal={engineTotal}
        hydrated={hydrated}
        color={color}
        level={level}
        starting={starting}
        onColor={setColor}
        onLevel={setLevel}
        onStart={() => void start()}
        onOpenCurrent={openCurrent}
      />

      <section className="home-hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            单机 · 离线 · 无账号
          </div>
          <h1>
            静下来，<br />
            下一盘<span className="text-red">好棋</span>。
          </h1>
          <p className="hero-lede">
            和本机 Pikafish 对弈，练杀法、拆残局、走开局。没有匹配、没有催促，棋谱和进度只留在这台设备。
          </p>

          <div className="hero-actions">
            {activeGame ? (
              <button type="button" className="btn btn-primary btn-large" onClick={openCurrent}>
                <Play size={19} aria-hidden="true" />
                继续这盘棋
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            ) : finishedCurrent ? (
              <button type="button" className="btn btn-primary btn-large" onClick={openCurrent}>
                <RotateCcw size={19} aria-hidden="true" />
                查看上局结果
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-large"
                onClick={() => void start()}
                disabled={!engineReady || starting || !hydrated}
              >
                <Swords size={19} aria-hidden="true" />
                {starting ? '正在摆棋…' : engineReady ? '和 AI 下一盘' : '棋力准备中…'}
              </button>
            )}
            <Link to="/train" className="btn btn-ghost btn-large">
              <GraduationCap size={18} aria-hidden="true" />
              去训练
            </Link>
            <Link to="/local" className="btn btn-ghost btn-large">
              <Users size={18} aria-hidden="true" />
              双人对弈
            </Link>
          </div>

          <div className="hero-note">
            <ShieldCheck size={16} aria-hidden="true" />
            {offlineReady
              ? '引擎已在缓存中，断网也能继续。'
              : engineReady
                ? '引擎可以启动，离线缓存正在确认。'
                : `首次会准备约 ${formatBytes(engineTotalBytes())} 的离线棋力，之后不再下载。`}
          </div>
        </div>

        <div className="hero-side">
          <div className="hero-emblem" aria-hidden="true">
            <div className="emblem-ring" />
            <span>棋</span>
            <small>QÍ LIÀN</small>
          </div>
          <div className="hero-stats">
            <div>
              <strong>{contentStats.tactics}</strong>
              <span>道杀法</span>
            </div>
            <div>
              <strong>{contentStats.endgame + contentStats.opening}</strong>
              <span>节定式与开局</span>
            </div>
            <div>
              <strong>{completedTactics}</strong>
              <span>项已完成</span>
            </div>
          </div>
          <div className="hero-side-caption">
            <span className="tiny-rule" />
            <span>Pikafish · 本地引擎</span>
          </div>
        </div>
      </section>

      {!engineReady && (
        <section className="section">
          <EnginePrepCard />
        </section>
      )}

      {!activeGame && !finishedCurrent && (
        <section className="quick-start panel">
          <div className="quick-start-copy">
            <div className="eyebrow">
              <Sparkles size={14} aria-hidden="true" />
              快速开局
            </div>
            <h2>今天想执哪一边？</h2>
            <p>难度可以随时在设置里调整；棋局只保存本机。</p>
          </div>
          <div className="quick-options">
            <div className="field">
              <span className="field-label">执子</span>
              <div className="segmented">
                <button
                  type="button"
                  className={color === 'r' ? 'is-selected' : ''}
                  onClick={() => setColor('r')}
                >
                  执红先行
                </button>
                <button
                  type="button"
                  className={color === 'b' ? 'is-selected' : ''}
                  onClick={() => setColor('b')}
                >
                  执黑后行
                </button>
              </div>
            </div>
            <div className="field">
              <span className="field-label">难度</span>
              <div className="segmented">
                {([1, 2, 3] as Level[]).map((value) => (
                  <button
                    type="button"
                    key={value}
                    className={level === value ? 'is-selected' : ''}
                    onClick={() => setLevel(value)}
                  >
                    {levelLabel(value)}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="btn btn-dark"
              disabled={!engineReady || !hydrated || starting}
              onClick={() => void start()}
            >
              {engineReady ? '开始对局' : '等待棋力'}
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </section>
      )}

      {activeGame && (
        <section className="continue-panel panel">
          <div className="continue-icon">
            <CircleDot size={22} aria-hidden="true" />
          </div>
          <div className="continue-copy">
            <span className="eyebrow">未完成的棋局</span>
            <h2>
              你执{current.playerColor === 'r' ? '红' : '黑'} · {levelLabel(current.level)}
            </h2>
            <p>
              {current.moves.length} 手 · {resultLabel(current.result, current.playerColor)} · 更新于{' '}
              {formatDateTime(current.updatedAt)}
            </p>
          </div>
          <button type="button" className="btn btn-primary" onClick={openCurrent}>
            继续
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </section>
      )}

      {finishedCurrent && (
        <section className="continue-panel panel finished-current">
          <div className="continue-icon">
            <Flag size={22} aria-hidden="true" />
          </div>
          <div className="continue-copy">
            <span className="eyebrow">上一局</span>
            <h2>{resultLabel(current.result, current.playerColor)}</h2>
            <p>
              {current.moves.length} 手 · {formatDuration(current.elapsedMs)} · 已保存到棋谱
            </p>
          </div>
          <button type="button" className="btn btn-dark" onClick={openCurrent}>
            查看棋局
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </section>
      )}

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">训练场</span>
            <h2>把定式练成直觉</h2>
          </div>
          <Link to="/train" className="text-link">
            全部训练
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className="training-grid">
          <Link to="/train/tactics" className="training-card training-card-red">
            <div className="training-card-icon">
              <Target size={23} aria-hidden="true" />
            </div>
            <div>
              <span className="training-kicker">杀法训练</span>
              <h3>找到那步将死</h3>
              <p>短题目、即时反馈，练的是看见杀形的眼睛。</p>
            </div>
            <div className="training-footer">
              <span>{contentStats.tactics} 道题</span>
              <span className="round-arrow">
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </div>
          </Link>

          <Link to="/train/endgame" className="training-card training-card-green">
            <div className="training-card-icon">
              <Crown size={23} aria-hidden="true" />
            </div>
            <div>
              <span className="training-kicker">残局定式</span>
              <h3>把少子下成胜势</h3>
              <p>古谱与短课，理解控将、收口和转换的次序。</p>
            </div>
            <div className="training-footer">
              <span>{contentStats.endgame} 节演示</span>
              <span className="round-arrow">
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </div>
          </Link>

          <Link to="/train/opening" className="training-card training-card-gold">
            <div className="training-card-icon">
              <BookOpen size={23} aria-hidden="true" />
            </div>
            <div>
              <span className="training-kicker">开局训练</span>
              <h3>把开局顺序走顺</h3>
              <p>从经典主线建立出动大子和占位的顺序感。</p>
            </div>
            <div className="training-footer">
              <span>{contentStats.opening} 套开局</span>
              <span className="round-arrow">
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="home-lower">
        <div className="panel progress-panel">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">进度</span>
              <h2>本机记录</h2>
            </div>
            <Trophy size={22} className="muted-icon" aria-hidden="true" />
          </div>
          <div className="stat-grid">
            <div className="stat">
              <strong>{completed}</strong>
              <span>训练完成</span>
            </div>
            <div className="stat">
              <strong>{recentGames.length > 0 ? recentGames.length : 0}</strong>
              <span>最近棋谱</span>
            </div>
            <div className="stat">
              <strong>{winCount}</strong>
              <span>最近胜局</span>
            </div>
          </div>
          <div className="progress-note">
            <CheckCircle2 size={16} aria-hidden="true" />
            共 {totalTraining} 项训练内容，完成度会随练习自动记录。
          </div>
          <div className="mini-progress">
            <span style={{ width: `${totalTraining ? Math.min(100, (completed / totalTraining) * 100) : 0}%` }} />
          </div>
        </div>

        <div className="panel recent-panel">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">棋谱</span>
              <h2>最近对局</h2>
            </div>
            <Link to="/history" className="text-link">
              全部
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          {loading ? (
            <p className="muted small">读取棋谱…</p>
          ) : recentGames.length === 0 ? (
            <div className="empty-mini">
              <Swords size={20} aria-hidden="true" />
              <p>还没有完成的棋局。下完一盘，它会出现在这里。</p>
            </div>
          ) : (
            <div className="recent-list">
              {recentGames.map((game) => (
                <Link to={`/review/${game.id}`} className="recent-row" key={game.id}>
                  <span className={`result-dot ${game.result.status === 'win' && game.result.winner === game.playerColor ? 'win' : ''}`} />
                  <span className="recent-main">
                    <strong>{resultLabel(game.result, game.playerColor)}</strong>
                    <small>
                      {formatDate(game.endedAt)} · {levelLabel(game.level)} · {game.moves.length} 手
                    </small>
                  </span>
                  <ChevronRight size={16} aria-hidden="true" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="home-footnote">
        <div>
          <GraduationCap size={18} aria-hidden="true" />
          <span>三种训练模式，内容独立于引擎，下载棋力时也能先练。</span>
        </div>
        <div>
          <ShieldCheck size={18} aria-hidden="true" />
          <span>无账号、无排行榜、无对局服务器。只把棋留在本机。</span>
        </div>
      </section>
    </div>
  );
}

function formatDateTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat('zh-CN', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
