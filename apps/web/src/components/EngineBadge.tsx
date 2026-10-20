import { NavLink } from 'react-router-dom';
import { useEngineStore } from '../stores/engine';

export function EngineBadge() {
  const phase = useEngineStore((state) => state.phase);
  const loaded = useEngineStore((state) => state.loaded);
  const total = useEngineStore((state) => state.total);
  const engineReady = useEngineStore((state) => state.engineReady);
  const offlineReady = useEngineStore((state) => state.offlineReady);
  const error = useEngineStore((state) => state.error);

  let label = '准备棋力';
  let detail = '';
  let tone = 'neutral';

  if (phase === 'error') {
    label = '棋力不可用';
    detail = error ? ` · ${error}` : '';
    tone = 'error';
  } else if (offlineReady && engineReady) {
    label = '离线就绪';
    detail = ' · Pikafish';
    tone = 'ready';
  } else if (engineReady) {
    label = '引擎已就绪';
    detail = ' · 离线待确认';
    tone = 'warm';
  } else if (phase === 'downloading' || phase === 'verifying') {
    label = phase === 'verifying' ? '校验棋力' : '准备棋力';
    const percent = total > 0 ? Math.min(99, Math.round((loaded / total) * 100)) : 0;
    detail = ` · ${percent}%`;
    tone = 'busy';
  } else if (phase === 'initializing') {
    label = '启动引擎';
    detail = ' · 首次稍慢';
    tone = 'busy';
  } else if (phase === 'checking') {
    label = '检查缓存';
    tone = 'busy';
  }

  return (
    <NavLink to="/settings#engine" className={`engine-badge tone-${tone}`} aria-label={`引擎状态：${label}${detail}，前往设置`}>
      <span className="engine-dot" aria-hidden="true" />
      <span className="engine-label">{label}</span>
      {detail && <span className="engine-detail">{detail}</span>}
    </NavLink>
  );
}
