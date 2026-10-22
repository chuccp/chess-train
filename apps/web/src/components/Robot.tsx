interface RobotProps {
  /** AI 思考中：播放动画 */
  thinking?: boolean;
  /** 已思考秒数 */
  seconds?: number;
  /** SSE 报告的当前搜索深度 */
  depth?: number | null;
  /** 只渲染机器人本体（用作对局面板里的 AI 头像） */
  inline?: boolean;
}

/**
 * 3D 质感的小机器人：
 * 平时静静待着（轻微呼吸、偶尔眨眼），AI 思考时眼睛扫视、
 * 身体带透视地左右摇摆、天线与嘴巴打点亮起。
 */
export function Robot({ thinking = false, seconds, depth = null, inline = false }: RobotProps) {
  const stage = (
    <div className="robot-stage" aria-hidden="true">
      <svg className="robot" viewBox="0 0 120 124">
        <defs>
          <radialGradient id="robotHead" cx="34%" cy="26%" r="85%">
            <stop offset="0%" stopColor="#33695a" />
            <stop offset="52%" stopColor="#1c3b31" />
            <stop offset="100%" stopColor="#0c1d17" />
          </radialGradient>
          <linearGradient id="robotMetal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d6e5c" />
            <stop offset="55%" stopColor="#214237" />
            <stop offset="100%" stopColor="#122820" />
          </linearGradient>
          <radialGradient id="robotGold" cx="34%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#f4dc9e" />
            <stop offset="55%" stopColor="#c69a4d" />
            <stop offset="100%" stopColor="#8a6630" />
          </radialGradient>
          <radialGradient id="robotEye" cx="36%" cy="30%" r="85%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cfdcd5" />
          </radialGradient>
          <radialGradient id="robotChest" cx="36%" cy="28%" r="85%">
            <stop offset="0%" stopColor="#2b5a4a" />
            <stop offset="100%" stopColor="#14291f" />
          </radialGradient>
        </defs>

        {/* 地面阴影 */}
        <ellipse className="robot-shadow" cx="60" cy="114" rx="34" ry="6.5" />

        <g className="robot-body">
          {/* 天线 */}
          <line className="robot-antenna" x1="60" y1="28" x2="60" y2="13" />
          <circle className="robot-antenna-ball" cx="60" cy="9" r="6.5" fill="url(#robotGold)" />

          {/* 耳朵 */}
          <rect x="10" y="44" width="13" height="30" rx="6.5" fill="url(#robotMetal)" />
          <rect x="97" y="44" width="13" height="30" rx="6.5" fill="url(#robotMetal)" />

          {/* 头（大圆角 + 顶部高光，做出 3D 球面感） */}
          <rect x="22" y="24" width="76" height="68" rx="22" fill="url(#robotHead)" />
          <ellipse className="robot-shine" cx="46" cy="40" rx="17" ry="8.5" />
          <rect x="30" y="30" width="60" height="4" rx="2" fill="#ffffff" opacity="0.12" />

          {/* 眼睛 */}
          <g className="robot-eyes">
            <circle cx="44" cy="57" r="12" fill="url(#robotEye)" />
            <circle cx="76" cy="57" r="12" fill="url(#robotEye)" />
            <g className="robot-pupils">
              <circle cx="44" cy="57" r="5.2" fill="#10241e" />
              <circle cx="76" cy="57" r="5.2" fill="#10241e" />
            </g>
            <circle cx="41.2" cy="53.6" r="1.9" fill="#ffffff" />
            <circle cx="73.2" cy="53.6" r="1.9" fill="#ffffff" />
            {/* 眨眼帘 */}
            <rect className="robot-lid" x="31" y="45" width="26" height="24" rx="13" fill="url(#robotHead)" />
            <rect className="robot-lid" x="63" y="45" width="26" height="24" rx="13" fill="url(#robotHead)" />
          </g>

          {/* 思考打点的嘴 */}
          <g className="robot-mouth">
            <circle cx="46" cy="78" r="2.8" fill="url(#robotGold)" />
            <circle cx="60" cy="78" r="2.8" fill="url(#robotGold)" />
            <circle cx="74" cy="78" r="2.8" fill="url(#robotGold)" />
          </g>
        </g>

        {/* 身体（半露在头下方，增加体积层次） */}
        <g className="robot-torso">
          <rect x="34" y="92" width="52" height="22" rx="11" fill="url(#robotChest)" />
          <rect x="42" y="99" width="36" height="3" rx="1.5" fill="#ffffff" opacity="0.1" />
          <circle cx="60" cy="107" r="4" fill="url(#robotGold)" opacity="0.85" />
        </g>
      </svg>
    </div>
  );

  if (inline) {
    return (
      <div className={`robot-inline${thinking ? ' is-thinking' : ''}`} role="status" aria-live="polite">
        {stage}
      </div>
    );
  }

  return (
    <div
      className={`robot-card${thinking ? ' is-thinking' : ''}`}
      role="status"
      aria-live="polite"
    >
      {stage}

      <div className="robot-card-text">
        {thinking ? (
          <>
            <strong>
              AI 思考中{seconds !== undefined ? ` ${Math.min(10, seconds)}s` : ''}
            </strong>
            {depth !== null && <span>搜索深度 {depth}</span>}
          </>
        ) : (
          <strong>AI 在线</strong>
        )}
      </div>
    </div>
  );
}
