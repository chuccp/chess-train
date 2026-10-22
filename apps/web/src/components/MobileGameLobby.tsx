import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Play, RotateCcw, ShieldCheck, Swords } from 'lucide-react';
import { createInitialPosition, type Color } from '@qilian/xiangqi';
import { Board } from './Board';
import { levelLabel, resultLabel } from '../stores/game';
import type { GameSnapshot, Level } from '../types';

interface MobileGameLobbyProps {
  current: GameSnapshot | null;
  engineReady: boolean;
  enginePhase: string;
  engineError: string | null;
  hydrated: boolean;
  color: Color;
  level: Level;
  starting: boolean;
  onColor: (color: Color) => void;
  onLevel: (level: Level) => void;
  onStart: () => void;
  onNewGame: () => void;
  onOpenCurrent: () => void;
}

export function MobileGameLobby({
  current,
  engineReady,
  enginePhase,
  engineError,
  hydrated,
  color,
  level,
  starting,
  onColor,
  onLevel,
  onStart,
  onNewGame,
  onOpenCurrent,
}: MobileGameLobbyProps) {
  const initial = useMemo(() => createInitialPosition(), []);
  const active = Boolean(current && current.phase !== 'finished');
  const finished = Boolean(current && current.phase === 'finished');
  const position = current?.position ?? initial;
  const isHuman = current?.mode === 'human';
  const orientation: Color = isHuman ? 'r' : (current?.playerColor ?? color);

  const statusText = active
    ? isHuman
      ? `${current?.moves.length ?? 0} 手 · 轮到${current?.position.turn === 'r' ? '红方' : '黑方'}`
      : `${current?.moves.length ?? 0} 手 · ${current?.position.turn === current?.playerColor ? '轮到你' : 'AI 思考中'}`
    : finished
      ? `${current?.moves.length ?? 0} 手 · 已保存棋谱`
      : `${color === 'r' ? '执红先行' : '执黑后行'} · ${levelLabel(level)}`;

  const engineLabel = engineReady
    ? 'AI 已就绪'
    : enginePhase === 'error'
      ? 'AI 不可用'
      : '连接 AI 中';

  return (
    <section className="mobile-game-lobby" aria-labelledby="mobile-lobby-title">
      <div className="mobile-lobby-head">
        <div>
          <span className="eyebrow mobile-lobby-brand">
            <span className="mobile-lobby-seal" aria-hidden="true">棋</span>
            棋练 · 棋桌
          </span>
          <h1 id="mobile-lobby-title">
            {active ? '继续这盘棋' : finished ? '上局已结束' : '下一盘好棋'}
          </h1>
          <p>
            {active || finished
              ? resultLabel(current!.result, current!.playerColor, current!.mode)
              : '你走你的，AI 走它的。'}
          </p>
        </div>
        <span className={`mobile-engine-pill ${engineReady ? 'is-ready' : ''}`} aria-live="polite">
          <i aria-hidden="true" />
          {engineLabel}
        </span>
      </div>

      <div className="mobile-board-stage">
        <div className="mobile-board-surface">
          <div aria-hidden="true">
            <Board position={position} orientation={orientation} preview />
          </div>
          <div className="mobile-lobby-float-actions">
            {active || finished ? (
              <>
                <button type="button" className="btn btn-primary mobile-lobby-cta is-floating" onClick={onOpenCurrent}>
                  {active ? <Play size={18} aria-hidden="true" /> : <ShieldCheck size={18} aria-hidden="true" />}
                  {active ? '继续对局' : '查看这盘棋'}
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="btn mobile-lobby-cta is-floating is-secondary"
                  onClick={onNewGame}
                  disabled={starting || (!isHuman && !engineReady)}
                >
                  <RotateCcw size={16} aria-hidden="true" />
                  开新局
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary mobile-lobby-cta is-floating"
                onClick={onStart}
                disabled={!engineReady || !hydrated || starting}
              >
                <Swords size={18} aria-hidden="true" />
                {starting ? '正在摆棋…' : engineReady ? '和 AI 下一盘' : '等待在线 AI'}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        <span className="mobile-board-caption">{statusText}</span>
      </div>

      {active || finished ? (
        <div className="mobile-lobby-secondary">
          <span>
            {isHuman
              ? '双人对局'
              : `你执${current!.playerColor === 'r' ? '红' : '黑'} · ${levelLabel(current!.level)}`}
          </span>
          <Link to="/play?setup=1" className="text-link">
            换个对手
          </Link>
        </div>
      ) : (
        <div className="mobile-lobby-actions">
          <div className="mobile-lobby-options">
              <div className="mobile-option-row">
                <span className="mobile-option-label">执子</span>
                <div className="segmented small">
                  <button type="button" className={color === 'r' ? 'is-selected' : ''} onClick={() => onColor('r')}>
                    执红
                  </button>
                  <button type="button" className={color === 'b' ? 'is-selected' : ''} onClick={() => onColor('b')}>
                    执黑
                  </button>
                </div>
              </div>
              <div className="mobile-option-row">
                <span className="mobile-option-label">难度</span>
                <div className="segmented small">
                  {([1, 2, 3] as Level[]).map((value) => (
                    <button
                      type="button"
                      key={value}
                      className={level === value ? 'is-selected' : ''}
                      onClick={() => onLevel(value)}
                    >
                      {levelLabel(value)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {enginePhase === 'error' && engineError && (
              <p className="mobile-lobby-error">
                {engineError} · <Link to="/settings#engine">去设置重试</Link>
              </p>
            )}
        </div>
      )}

      <div className="mobile-lobby-foot">
        <Link to="/train" className="text-link">
          <GraduationCap size={14} aria-hidden="true" />
          先去训练
        </Link>
      </div>
    </section>
  );
}
