type EngineStatus = 'online' | 'local' | 'offline';

interface PlayToplineRightProps {
  engine?: EngineStatus | null;
}

const engineLabels: Record<EngineStatus, string> = {
  online: '在线 AI · 已就绪',
  local: '本地 AI · 已就绪',
  offline: 'AI 未连接',
};

export function PlayToplineRight({
  engine = null,
}: PlayToplineRightProps) {
  if (!engine) return null;
  const ready = engine === 'online' || engine === 'local';

  return (
    <div className="play-topline-right">
      {engine && (
        <span className={`mobile-engine-status ai-status-pill${ready ? ' is-ready' : ''}`}>
          <i className="ai-status-dot" aria-hidden="true" />
          {engineLabels[engine]}
        </span>
      )}
    </div>
  );
}

export function GameEngineStatus({ engine }: { engine: EngineStatus | null }) {
  if (!engine) return null;
  return (
    <div className="game-engine-status">
      <PlayToplineRight engine={engine} />
    </div>
  );
}
