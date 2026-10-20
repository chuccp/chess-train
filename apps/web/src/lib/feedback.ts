let audioContext: AudioContext | null = null;

function context(): AudioContext | null {
  if (typeof window === 'undefined' || typeof AudioContext === 'undefined') return null;
  if (!audioContext) audioContext = new AudioContext();
  return audioContext;
}

export function playCue(kind: 'move' | 'capture' | 'check' | 'win' | 'error'): void {
  const ctx = context();
  if (!ctx) return;
  if (ctx.state === 'suspended') void ctx.resume();
  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const frequencies = {
    move: 520,
    capture: 320,
    check: 760,
    win: 880,
    error: 180,
  };
  oscillator.type = kind === 'capture' ? 'triangle' : 'sine';
  oscillator.frequency.setValueAtTime(frequencies[kind], now);
  if (kind === 'win') oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.18);
  if (kind === 'error') oscillator.frequency.exponentialRampToValueAtTime(120, now + 0.16);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.055, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.22);
}

export function vibrate(pattern: number | number[] = 10): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // ignore
    }
  }
}
