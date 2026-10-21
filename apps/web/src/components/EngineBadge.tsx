import { NavLink } from 'react-router-dom';
import { useEngineStore } from '../stores/engine';

export function EngineBadge() {
  const phase = useEngineStore((state) => state.phase);
  const engineReady = useEngineStore((state) => state.engineReady);
  const error = useEngineStore((state) => state.error);

  let label = '连接引擎';
  let detail = '';
  let tone = 'neutral';

  if (phase === 'error') {
    label = 'AI 不可用';
    detail = error ? ` · ${error}` : '';
    tone = 'error';
  } else if (engineReady) {
    label = 'AI 已就绪';
    detail = ' · Pikafish';
    tone = 'ready';
  } else if (phase === 'checking') {
    label = '连接引擎';
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
