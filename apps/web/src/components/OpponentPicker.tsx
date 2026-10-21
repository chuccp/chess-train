export type OpponentMode = 'ai' | 'local';

export const OPPONENT_LEVELS: ReadonlyArray<{ value: 1 | 2 | 3; label: string }> = [
  { value: 1, label: '入门' },
  { value: 2, label: '进阶' },
  { value: 3, label: '挑战' },
];

interface OpponentPickerProps {
  mode: OpponentMode;
  level: 1 | 2 | 3;
  /** 对局进行中时锁定模式切换，避免误开新局。 */
  modeLocked?: boolean;
  onMode: (mode: OpponentMode) => void;
  onLevel: (level: 1 | 2 | 3) => void;
}

export function OpponentPicker({ mode, level, modeLocked = false, onMode, onLevel }: OpponentPickerProps) {
  return (
    <div className="opponent-picker">
      <div className="field">
        <span className="field-label">对手</span>
        <div className="segmented">
          <button
            type="button"
            className={mode === 'ai' ? 'is-selected' : ''}
            disabled={modeLocked && mode !== 'ai'}
            title={modeLocked ? '对局结束后可更改' : undefined}
            onClick={() => onMode('ai')}
          >
            人机
          </button>
          <button
            type="button"
            className={mode === 'local' ? 'is-selected' : ''}
            disabled={modeLocked && mode !== 'local'}
            title={modeLocked ? '对局结束后可更改' : undefined}
            onClick={() => onMode('local')}
          >
            双人
          </button>
        </div>
      </div>
      {mode === 'ai' && (
        <div className="field">
          <span className="field-label">难度</span>
          <div className="segmented">
            {OPPONENT_LEVELS.map((item) => (
              <button
                type="button"
                key={item.value}
                className={level === item.value ? 'is-selected' : ''}
                onClick={() => onLevel(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
