import { useEffect, type RefObject } from 'react';

/** Scrolls a result into view on phones without affecting desktop layout. */
export function useMobileInView(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  delayMs = 0,
) {
  useEffect(() => {
    if (!active) return;
    if (!window.matchMedia('(max-width: 880px)').matches) return;
    const timer = window.setTimeout(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      ref.current?.scrollIntoView({
        block: 'center',
        behavior: reduced ? 'auto' : 'smooth',
      });
    }, delayMs);
    return () => window.clearTimeout(timer);
  }, [active, delayMs, ref]);
}
