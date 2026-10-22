import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Check,
  Database,
  Info,
  RefreshCw,
  RotateCcw,
  Settings2,
  ShieldCheck,
  Trash2,
  Undo2,
  Volume2,
  Vibrate,
  Wifi,
} from 'lucide-react';
import { useEngineStore } from '../stores/engine';
import { useSettingsStore } from '../stores/settings';
import { clearAllLocalData } from '../lib/storage';
import { formatBytes } from '../lib/format';
import type { Level } from '../types';

export function SettingsPage() {
  const engine = useEngineStore();
  const settings = useSettingsStore();
  const [storage, setStorage] = useState<{ usage?: number; quota?: number } | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    if (window.location.hash === '#engine') {
      document.getElementById('engine')?.scrollIntoView({ block: 'start' });
    }
    if (navigator.storage?.estimate) {
      void navigator.storage.estimate().then((estimate) => {
        setStorage({ usage: estimate.usage, quota: estimate.quota });
      });
    }
  }, []);

  async function reconnectEngine() {
    setBusy('engine');
    await engine.retry();
    setBusy(null);
  }

  async function clearData() {
    if (!window.confirm('清除本机所有棋谱、训练进度和设置？此操作不可恢复。')) return;
    setBusy('data');
    await clearAllLocalData();
    settings.reset();
    setBusy(null);
    window.location.reload();
  }

  return (
    <div className="page settings-page">
      <div className="page-heading">
        <div className="eyebrow">
          <Settings2 size={15} aria-hidden="true" />
          设置
        </div>
        <h1>把这台设备调成你的棋桌</h1>
        <p>所有偏好只保存在本机；没有账号，也没有云端同步。</p>
      </div>

      <div className="settings-layout">
        <div className="settings-main">
          <section className="panel settings-section">
            <div className="section-heading compact">
              <div>
                <span className="eyebrow">对弈偏好</span>
                <h2>开局与难度</h2>
              </div>
            </div>
            <div className="settings-row">
              <div>
                <strong>默认执子</strong>
                <p>快速开局时默认选择，不影响已有棋局。</p>
              </div>
              <div className="segmented small">
                <button type="button" className={settings.preferredColor === 'r' ? 'is-selected' : ''} onClick={() => settings.setPreferredColor('r')}>
                  执红
                </button>
                <button type="button" className={settings.preferredColor === 'b' ? 'is-selected' : ''} onClick={() => settings.setPreferredColor('b')}>
                  执黑
                </button>
              </div>
            </div>
            <div className="settings-row">
              <div>
                <strong>默认难度</strong>
                <p>入门更短思考，挑战使用完整强度。</p>
              </div>
              <div className="segmented small">
                {([1, 2, 3] as Level[]).map((value) => (
                  <button type="button" key={value} className={settings.preferredLevel === value ? 'is-selected' : ''} onClick={() => settings.setPreferredLevel(value)}>
                    {value === 1 ? '入门' : value === 2 ? '进阶' : '挑战'}
                  </button>
                ))}
              </div>
            </div>
            <div className="settings-row">
              <div>
                <strong>棋盘方向</strong>
                <p>自动时，你的执子方在下方。</p>
              </div>
              <div className="segmented small">
                <button type="button" className={settings.boardOrientation === 'auto' ? 'is-selected' : ''} onClick={() => settings.setBoardOrientation('auto')}>
                  自动
                </button>
                <button type="button" className={settings.boardOrientation === 'red' ? 'is-selected' : ''} onClick={() => settings.setBoardOrientation('red')}>
                  红方在下
                </button>
              </div>
            </div>
            <div className="settings-row">
              <div>
                <strong>落子反馈</strong>
                <p>轻量音效与触感，移动端会跟随系统设置。</p>
              </div>
              <div className="toggle-group">
                <button
                  type="button"
                  className={`toggle${settings.sound ? ' is-on' : ''}`}
                  onClick={() => settings.setSound(!settings.sound)}
                  aria-pressed={settings.sound}
                >
                  <Volume2 size={16} aria-hidden="true" />
                  音效 {settings.sound ? '开' : '关'}
                </button>
                <button
                  type="button"
                  className={`toggle${settings.haptics ? ' is-on' : ''}`}
                  onClick={() => settings.setHaptics(!settings.haptics)}
                  aria-pressed={settings.haptics}
                >
                  <Vibrate size={16} aria-hidden="true" />
                  震动 {settings.haptics ? '开' : '关'}
                </button>
              </div>
            </div>
            <div className="settings-row">
              <div>
                <strong>允许悔棋</strong>
                <p>关闭后，中国象棋对弈中的悔棋按钮不可用。</p>
              </div>
              <button
                type="button"
                className={`toggle${settings.allowUndo ? ' is-on' : ''}`}
                onClick={() => settings.setAllowUndo(!settings.allowUndo)}
                aria-pressed={settings.allowUndo}
              >
                <Undo2 size={16} aria-hidden="true" />
                悔棋 {settings.allowUndo ? '开' : '关'}
              </button>
            </div>
            {settings.allowUndo && (
              <>
                <div className="settings-row">
                  <div>
                    <strong>将军后也可悔棋</strong>
                    <p>关闭后，被将军时必须先应将，不能退棋。</p>
                  </div>
                  <button
                    type="button"
                    className={`toggle${settings.allowUndoWhenChecked ? ' is-on' : ''}`}
                    onClick={() => settings.setAllowUndoWhenChecked(!settings.allowUndoWhenChecked)}
                    aria-pressed={settings.allowUndoWhenChecked}
                  >
                    <ShieldCheck size={16} aria-hidden="true" />
                    将军悔棋 {settings.allowUndoWhenChecked ? '开' : '关'}
                  </button>
                </div>
                <div className="settings-row">
                  <div>
                    <strong>悔棋步数</strong>
                    <p>线下双人每次悔棋步数；1 步 = 一方走一手，10 = 不限制。人机对战按最后一步自动退：机器最后一步退 2 手，自己最后一步退 1 手。</p>
                  </div>
                  <div className="undo-range">
                    <div className="undo-range-value">
                      {settings.undoSteps === 10 ? '不限制' : `${settings.undoSteps} 步`}
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={settings.undoSteps}
                      aria-label="悔棋步数"
                      aria-valuetext={settings.undoSteps === 10 ? '不限制' : `${settings.undoSteps} 步`}
                      onChange={(event) => settings.setUndoSteps(Number(event.target.value))}
                    />
                    <div className="undo-range-labels">
                      <span>1 步</span>
                      <span>10 · 不限制</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>

          <section className="panel settings-section" id="engine">
            <div className="section-heading compact">
              <div>
                <span className="eyebrow">在线 AI</span>
                <h2>AI 服务连接</h2>
              </div>
              <span className={`status-pill ${engine.engineReady ? 'ready' : engine.phase === 'error' ? 'error' : 'busy'}`}>
                {engine.engineReady ? '已连接' : engine.phase === 'error' ? '不可用' : '连接中'}
              </span>
            </div>
            <p className="settings-lede">
              <Wifi size={14} aria-hidden="true" /> 人机走子由在线 AI 服务计算，只发送当前局面，不保存棋谱。双人对局与训练可离线使用。
            </p>

            {!engine.engineReady && (
              <div className="engine-settings-progress">
                {engine.error && <p className="form-error" role="alert">{engine.error}</p>}
                <button type="button" className="btn btn-dark" disabled={busy === 'engine'} onClick={() => void reconnectEngine()}>
                  <RefreshCw size={16} aria-hidden="true" />
                  {busy === 'engine' ? '连接中…' : '重新连接'}
                </button>
              </div>
            )}

            {engine.engineReady && (
              <div className="engine-details">
                <dl className="info-list">
                  <div><dt>服务版本</dt><dd>{engine.version || 'auto-chess'}</dd></div>
                  <div><dt>棋类</dt><dd>{engine.games || 7} 种（象棋、五子棋、四子棋、斗兽棋、跳棋等）</dd></div>
                  <div><dt>离线缓存</dt><dd>{engine.offlineReady ? '应用外壳已缓存' : '等待 Service Worker 接管'}</dd></div>
                  <div><dt>隐私</dt><dd>只上传当前局面，棋谱留在本机</dd></div>
                </dl>
                <div className="engine-actions">
                  <button type="button" className="btn btn-ghost" onClick={() => void engine.refreshOffline()}>
                    <RefreshCw size={15} aria-hidden="true" />
                    重新检查离线
                  </button>
                  <button type="button" className="btn btn-ghost" disabled={busy === 'engine'} onClick={() => void reconnectEngine()}>
                    <Wifi size={15} aria-hidden="true" />
                    重新连接
                  </button>
                </div>
              </div>
            )}

            <p className="fine-print">
              <Info size={14} aria-hidden="true" />
              断网时人机对弈不可用，双人对局、训练和棋谱回放不受影响。
            </p>
          </section>

          <section className="panel settings-section">
            <div className="section-heading compact">
              <div>
                <span className="eyebrow">本机数据</span>
                <h2>棋谱与训练进度</h2>
              </div>
              <Database size={21} className="muted-icon" aria-hidden="true" />
            </div>
            <p className="settings-lede">
              目前本机约使用 {storage?.usage ? formatBytes(storage.usage) : '未知'}。棋谱和训练进度保存在 IndexedDB，设置保存在本地存储。
            </p>
            <div className="settings-actions">
              <button type="button" className="btn btn-ghost danger-text" disabled={busy === 'data'} onClick={() => void clearData()}>
                <Trash2 size={16} aria-hidden="true" />
                清除所有本地数据
              </button>
            </div>
            <p className="fine-print"><AlertTriangle size={14} aria-hidden="true" /> 清除数据只影响本机棋谱与进度，不影响在线 AI 服务。</p>
          </section>
        </div>

        <aside className="settings-side">
          <section className="side-card">
            <span className="eyebrow">关于棋练</span>
            <h2>一个安静的象棋练习场</h2>
            <p>不做账号、不做匹配、不做排行榜。棋局和训练进度留在本机。</p>
            <Link to="/about" className="text-link">
              关于与许可
              <Info size={14} aria-hidden="true" />
            </Link>
          </section>
          <section className="side-card license-note">
            <ShieldCheck size={20} aria-hidden="true" />
            <span className="eyebrow">授权</span>
            <p>应用代码 GPL-3.0；Pikafish GPL-3.0；NNUE 权重免费非商业使用。</p>
            <Link to="/about#licenses" className="text-link">查看第三方声明</Link>
          </section>
          <section className="side-card">
            <span className="eyebrow">恢复默认</span>
            <p className="small muted">只会重置执子、难度、棋盘方向和反馈偏好，不会删除棋谱。</p>
            <button type="button" className="btn btn-ghost btn-small" onClick={settings.reset}>
              <RotateCcw size={14} aria-hidden="true" />
              恢复默认设置
            </button>
          </section>
        </aside>
      </div>

      <p className="settings-version">棋练 v0.1 · 在线 AI · GPL-3.0</p>
    </div>
  );
}
