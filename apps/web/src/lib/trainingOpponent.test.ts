import { describe, expect, it } from 'vitest';
import { applyMove, parseFen, parseUcci } from '@qilian/xiangqi';
import { chooseFallbackTrainingDefense, chooseTrainingDefense } from './trainingOpponent';

describe('training opponent', () => {
  it('returns a legal, deterministic defensive move', () => {
    const position = parseFen('3k5/9/9/9/9/9/9/9/9/R4K3 b - - 0 1');
    const first = chooseFallbackTrainingDefense(position, 'r');
    const second = chooseFallbackTrainingDefense(position, 'r');

    expect(first).toBe(second);
    expect(first).not.toBeNull();
    const parsed = parseUcci(first ?? '');
    expect(parsed).not.toBeNull();
    expect(parsed && applyMove(position, parsed.from, parsed.to).ok).toBe(true);
  });

  it('takes a free rook instead of choosing arbitrarily', () => {
    const position = parseFen('3k5/9/9/9/9/9/9/9/r8/R4K3 b - - 0 1');
    expect(chooseFallbackTrainingDefense(position, 'r')).toBe('a1a0');
  });

  it('falls back to a deterministic move outside the browser', async () => {
    const position = parseFen('3k5/9/9/9/9/9/9/9/9/R4K3 b - - 0 1');
    await expect(chooseTrainingDefense(position, 'r')).resolves.toEqual({
      move: chooseFallbackTrainingDefense(position, 'r'),
      engine: 'fallback',
    });
  });
});
