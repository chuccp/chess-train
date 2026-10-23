import { AlertCircle, CheckCircle2, Loader2, RotateCw } from 'lucide-react';
import { useEngineStore } from '../stores/engine';

interface EnginePrepProps {
  compact?: boolean;
  showReady?: boolean;
}

/** ElephantEye/Pikafish AI 可用状态。 */
export function EnginePrepCard({ compact = false, showReady = true }: EnginePrepProps) {
  const phase = useEngineStore((state) => state.phase);
  const engineReady = useEngineStore((state) => state.engineReady);
  const error = useEngineStore((state) => state.error);
  const version = useEngineStore((state) => state.version);
  const retry = useEngineStore((state) => state.retry);
  const backend = useEngineStore((state) => state.backend);

  if (engineReady) {
    if (!showReady) return null;
    return (
      <div className={`prep-card prep-ready${compact ? ' prep-compact' : ''}`}>
        <CheckCircle2 size={20} aria-hidden="true" />
        <div>
          <strong>{backend === 'local' ? '本地 AI 已就绪' : '在线 AI 已连接'}</strong>
          <p>{backend === 'local' ? '当前可离线进行象棋人机对弈。' : '象棋走子由在线 AI 计算。'}</p>
        </div>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className={`prep-card prep-error${compact ? ' prep-compact' : ''}`} role="alert">
        <AlertCircle size={20} aria-hidden="true" />
        <div>
          <strong>AI 不可用</strong>
          <p>{error || '在线接口和内置引擎均未能启动。'}</p>
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
        <strong>正在准备 AI 引擎…</strong>
        {version && <p>服务版本 {version}。</p>}
      </div>
    </div>
  );
}
