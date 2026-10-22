import { NavLink } from 'react-router-dom';
import { useEngineStore } from '../stores/engine';

export function EngineBadge() {
  const phase = useEngineStore((state) => state.phase);
  const engineReady = useEngineStore((state) => state.engineReady);
  const error = useEngineStore((state) => state.error);

  let label = '连接 AI';
  let detail = '';
  let tone = 'neutral';

  if (phase === 'error') {
    label = 'AI 不可用';
    detail = error ? ` · ${error}` : '';
    tone = 'error';
  } else if (engineReady) {
    label = 'AI 已就绪';
    detail = ' · 在线';
    tone = 'ready';
  } else if (phase === 'checking') {
    label = '连接 AI';
    tone = 'busy';
  }

  return (
    <NavLink to="/settings#engine" className={`engine-badge tone-${tone}`} aria-label={`AI 服务状态：${label}${detail}，前往设置`}>
      <span className="engine-dot" aria-hidden="true" />
      <span className="engine-label">{label}</span>
      {detail && <span className="engine-detail">{detail}</span>}
    </NavLink>
  );
}
