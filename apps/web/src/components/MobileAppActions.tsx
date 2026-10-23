import { useEffect, useState } from 'react';
import { Share2, SquarePlus } from 'lucide-react';
import { Dialog } from './Dialog';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface NavigatorWithRelatedApps extends Navigator {
  getInstalledRelatedApps?: () => Promise<Array<{ id?: string; platform: string; url?: string }>>;
}

let deferredInstallPrompt: BeforeInstallPromptEvent | null = null;

if (
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 880px)').matches
) {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event as BeforeInstallPromptEvent;
    window.dispatchEvent(new Event('qilian:install-prompt-ready'));
  });
}

type InstallPlatform = 'ios' | 'android' | 'desktop';

function isStandalone(): boolean {
  const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    navigatorWithStandalone.standalone === true
  );
}

function installPlatform(): InstallPlatform {
  if (/iphone|ipad|ipod/i.test(navigator.userAgent)) return 'ios';
  // iPadOS can report a desktop Mac user agent while still supporting touch.
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return 'ios';
  if (/android/i.test(navigator.userAgent)) return 'android';
  return 'desktop';
}

function fallbackCopy(text: string): boolean {
  const input = document.createElement('textarea');
  input.value = text;
  input.setAttribute('readonly', '');
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand('copy');
  input.remove();
  return copied;
}

export function MobileAppActions() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(
    () => deferredInstallPrompt,
  );
  const [installed, setInstalled] = useState(isStandalone);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const [message, setMessage] = useState('');
  const platform = installPlatform();

  useEffect(() => {
    setInstallPrompt(deferredInstallPrompt);
    const standaloneMedia = window.matchMedia('(display-mode: standalone)');

    function capturePrompt() {
      setInstallPrompt(deferredInstallPrompt);
    }

    function markInstalled() {
      setInstalled(true);
      deferredInstallPrompt = null;
      setInstallPrompt(null);
      setMessage('快捷方式已创建');
    }

    function syncStandalone() {
      if (standaloneMedia.matches) setInstalled(true);
    }

    window.addEventListener('qilian:install-prompt-ready', capturePrompt);
    window.addEventListener('appinstalled', markInstalled);
    standaloneMedia.addEventListener('change', syncStandalone);
    syncStandalone();

    const relatedApps = (navigator as NavigatorWithRelatedApps).getInstalledRelatedApps;
    if (relatedApps) {
      void relatedApps.call(navigator).then((apps) => {
        if (apps.length > 0) setInstalled(true);
      }).catch(() => {
        // Installed-app detection is optional and not available in every browser.
      });
    }

    return () => {
      window.removeEventListener('qilian:install-prompt-ready', capturePrompt);
      window.removeEventListener('appinstalled', markInstalled);
      standaloneMedia.removeEventListener('change', syncStandalone);
    };
  }, []);

  async function share() {
    const data = {
      title: '棋练 · 中国象棋',
      text: '和在线 AI 下中国象棋，也能练杀法、残局和开局。',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(data);
        setMessage('');
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(data.url);
      setMessage('链接已复制，可粘贴分享');
    } catch {
      setMessage(fallbackCopy(data.url) ? '链接已复制，可粘贴分享' : '未能分享，请复制地址栏链接');
    }
  }

  async function createShortcut() {
    if (installed) return;
    if (platform === 'ios' || !installPrompt) {
      setShowInstallHelp(true);
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setMessage('正在添加到桌面…');
    } else {
      setMessage('');
    }
    deferredInstallPrompt = null;
    setInstallPrompt(null);
  }

  return (
    <>
      <div className="mobile-app-actions-wrap">
        <div className="mobile-lobby-app-actions">
          <button type="button" className="mobile-app-action" onClick={() => void share()}>
            <Share2 size={14} aria-hidden="true" />
            <span>分享</span>
          </button>
          {!installed && (
            <button
              type="button"
              className="mobile-app-action"
              onClick={() => void createShortcut()}
              aria-label="创建快捷方式"
            >
              <SquarePlus size={14} aria-hidden="true" />
              <span>创建快捷方式</span>
            </button>
          )}
        </div>
        <span className="mobile-app-action-message" role="status" aria-live="polite">
          {message}
        </span>
      </div>

      <Dialog
        open={showInstallHelp}
        title={platform === 'ios' ? '添加到主屏幕' : '创建快捷方式'}
        onClose={() => setShowInstallHelp(false)}
        footer={
          <button type="button" className="btn btn-dark" onClick={() => setShowInstallHelp(false)}>
            知道了
          </button>
        }
      >
        <div className="install-help">
          <p>
            {platform === 'ios'
              ? 'iPhone 和 iPad 需要从 Safari 的分享菜单手动添加。'
              : '把棋练放到手机桌面，下次打开更方便。'}
          </p>
          {platform === 'ios' ? (
            <ol>
              <li>使用 Safari 打开棋练，点击底部的“分享”按钮。</li>
              <li>在操作列表中向下滑动，选择“添加到主屏幕”。</li>
              <li>确认名称后，点右上角“添加”即可。</li>
            </ol>
          ) : platform === 'android' ? (
            <ol>
              <li>点击浏览器右上角的菜单按钮。</li>
              <li>选择“安装应用”或“添加到主屏幕”。</li>
              <li>按提示确认即可。</li>
            </ol>
          ) : (
            <ol>
              <li>在 Chrome 或 Edge 地址栏右侧找到安装图标。</li>
              <li>若没有图标，请打开浏览器菜单，选择“安装棋练”。</li>
            </ol>
          )}
          <p className="install-help-note">之后可从桌面图标直接打开棋练。</p>
        </div>
      </Dialog>
    </>
  );
}
