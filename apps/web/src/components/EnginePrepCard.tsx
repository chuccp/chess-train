import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, CloudOff, Download, Loader2, RotateCw } from 'lucide-react';
import { useEngineStore } from '../stores/engine';
import { engineTotalBytes } from '../engine/manifest';
import { formatBytes } from '../lib/format';

interface EnginePrepProps {
  compact?: boolean;
  showReady?: boolean;
}

export function EnginePrepCard({ compact = false, showReady = true }: EnginePrepProps) {
  const phase = useEngineStore((state) => state.phase);
  const loaded = useEngineStore((state) => state.loaded);
  const total = useEngineStore((state) => state.total);
  const engineReady = useEngineStore((state) => state.engineReady);
  const offlineReady = useEngineStore((state) => state.offlineReady);
  const error = useEngineStore((state) => state.error);
  const retry = useEngineStore((state) => state.retry);

  const percent = total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : 0;
  const totalBytes = total || engineTotalBytes();

  if (engineReady && (offlineReady || !showReady)) {
    if (!showReady) return null;
    return (
      <div className={`prep-card prep-ready${compact ? ' prep-compact' : ''}`}>
        <CheckCircle2 size={20} aria-hidden="true" />
        <div>
          <strong>{offlineReady ? '离线棋力已就绪' : '引擎已就绪'}</strong>
          <p>{offlineReady ? '断网、关闭浏览器后再打开，也可以继续人机对弈。' : '引擎可以启动；离线缓存还在确认中。'}</p>
        </div>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className={`prep-card prep-error${compact ? ' prep-compact' : ''}`} role="alert">
        <AlertCircle size={20} aria-hidden="true" />
        <div>
          <strong>棋力准备失败</strong>
          <p>{error || '引擎资源未能完成准备。'}</p>
          <p className="prep-meta">训练内容仍可使用；有网络时重试即可。</p>
        </div>
        <button type="button" className="btn btn-small" onClick={() => void retry()}>
          <RotateCw size={15} aria-hidden="true" />
          重试
        </button>
      </div>
    );
  }

  const working = !engineReady;
  return (
    <div className={`prep-card prep-working${compact ? ' prep-compact' : ''}`} aria-live="polite">
      <div className="prep-icon">
        {working ? <Loader2 size={20} className="spin" aria-hidden="true" /> : <CloudOff size={20} aria-hidden="true" />}
      </div>
      <div className="prep-body">
        <strong>
          {phase === 'checking' && '检查本机棋力…'}
          {phase === 'downloading' && '正在准备离线棋力'}
          {phase === 'verifying' && '正在校验引擎文件'}
          {phase === 'initializing' && '正在启动 Pikafish'}
          {(phase === 'idle' || phase === 'ready') && '准备离线棋力'}
        </strong>
        <p>
          首次需要下载约 {formatBytes(totalBytes)} 的引擎与神经网络，完成后断网也能对弈。
        </p>
        <div
          className="progress-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-label="离线棋力准备进度"
        >
          <span style={{ width: `${percent}%` }} />
        </div>
        <div className="prep-meta">
          <span>{phase === 'checking' ? '读取缓存' : `${percent}%`}</span>
          <span>
            {loaded > 0 ? `${formatBytes(loaded)} / ${formatBytes(totalBytes)}` : `约 ${formatBytes(totalBytes)}`}
          </span>
        </div>
        <p className="prep-hint">
          下载时可以先浏览<Link to="/train">训练内容</Link>，不必停在首页等待。
        </p>
      </div>
      {phase === 'idle' && (
        <button type="button" className="btn btn-small" onClick={() => void useEngineStore.getState().bootstrap()}>
          <Download size={15} aria-hidden="true" />
          开始
        </button>
      )}
    </div>
  );
}
