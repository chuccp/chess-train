import { useEffect, useRef } from 'react';

/**
 * 轮到 AI 走时自动请求一手棋。
 * `enabled` 为真且 `key`（局面标识，如步数）变化时触发一次；`play` 内部负责
 * 请求接口并落子。用 busy 标志防止 StrictMode / 状态回抖导致的重复请求。
 */
export function useAiTurn(enabled: boolean, key: string, play: () => Promise<void>): void {
  const busy = useRef(false);
  const playRef = useRef(play);
  playRef.current = play;

  useEffect(() => {
    if (!enabled || busy.current) return;
    busy.current = true;
    void playRef
      .current()
      .catch(() => undefined)
      .finally(() => {
        busy.current = false;
      });
  }, [enabled, key]);
}
