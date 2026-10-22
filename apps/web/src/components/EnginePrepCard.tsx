import { AlertCircle, CheckCircle2, Loader2, RotateCw } from 'lucide-react';
import { useEngineStore } from '../stores/engine';

interface EnginePrepProps {
  compact?: boolean;
  showReady?: boolean;
}

/** 在线 AI（auto-chess 服务）连接状态。 */
export function EnginePrepCard({ compact = false, showReady = true }: EnginePrepProps) {
  const phase = useEngineStore((state) => state.phase);
  const engineReady = useEngineStore((state) => state.engineReady);
  const error = useEngineStore((state) => state.error);
  const version = useEngineStore((state) => state.version);
  const retry = useEngineStore((state) => state.retry);

  if (engineReady) {
    if (!showReady) return null;
    return (
      <div className={`prep-card prep-ready${compact ? ' prep-compact' : ''}`}>
        <CheckCircle2 size={20} aria-hidden="true" />
        <div>
          <strong>在线 AI 已连接</strong>
          <p>走子由在线 AI 服务计算。</p>
        </div>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className={`prep-card prep-error${compact ? ' prep-compact' : ''}`} role="alert">
        <AlertCircle size={20} aria-hidden="true" />
        <div>
          <strong>在线 AI 不可用</strong>
          <p>{error || '无法连接 AI 服务，请检查网络。'}</p>
          <p className="prep-meta">双人对局与训练内容不受影响。</p>
        </div>
        <button type="button" className="btn btn-small" onClick={() => void retry()}>
          <RotateCw size={15} aria-hidden="true" />
          重试
        </button>
      </div>
    );
  }

  return (
    <div className={`prep-card prep-working${compact ? ' prep-compact' : ''}`} aria-live="polite">
      <div className="prep-icon">
        <Loader2 size={20} className="spin" aria-hidden="true" />
      </div>
      <div className="prep-body">
        <strong>正在连接在线 AI…</strong>
        {version && <p>服务版本 {version}。</p>}
      </div>
    </div>
  );
}
