import { useEffect, useRef, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface BoardToastProps {
  message: string | null;
  tone?: 'info' | 'warning' | 'error';
  actionLabel?: string;
  onAction?: () => void;
  sticky?: boolean;
  onDismiss?: () => void;
}

export function BoardToast({
  message,
  tone = 'info',
  actionLabel,
  onAction,
  sticky = false,
  onDismiss,
}: BoardToastProps) {
  const [visible, setVisible] = useState(Boolean(message));
  const dismissRef = useRef(onDismiss);

  useEffect(() => {
    dismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    if (!message) {
      setVisible(false);
      return;
    }
    setVisible(true);
    if (sticky) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
      dismissRef.current?.();
    }, 2400);
    return () => window.clearTimeout(timer);
  }, [message, sticky]);

  if (!message || !visible) return null;

  return (
    <div className="board-toast" role={tone === 'error' ? 'alert' : 'status'} aria-live="polite">
      <div className={`board-toast-pill${tone === 'info' ? '' : ` is-${tone}`}`}>
        {tone !== 'info' && <AlertTriangle size={15} aria-hidden="true" />}
        <span>{message}</span>
        {actionLabel && (
          <button
            type="button"
            className="board-toast-action"
            onClick={() => {
              onAction?.();
              setVisible(false);
              dismissRef.current?.();
            }}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
