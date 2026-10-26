import { describe, expect, it } from 'vitest';
import { endgameLessons, itemsForKind, tacticExercises } from '@qilian/content';
import { favoriteKey, parseFavoriteKeys } from './favorites';
import { pickRandomTrainingItem, randomTrainingPath } from './randomTraining';

describe('favorites', () => {
  it('builds and parses favorite keys', () => {
    expect(favoriteKey('tactics', 'tactic-01')).toBe('tactics:tactic-01');
    expect(
      parseFavoriteKeys(
        '["tactics:tactic-01","bad",1,"tactics:tactic-01","endgame:endgame-03"]',
      ),
    ).toEqual(['tactics:tactic-01', 'endgame:endgame-03']);
    expect(parseFavoriteKeys('not json')).toEqual([]);
    expect(parseFavoriteKeys(null)).toEqual([]);
  });
});

describe('random training', () => {
  it('picks an existing item from each kind', () => {
    for (const kind of ['tactics', 'endgame', 'opening'] as const) {
      const item = pickRandomTrainingItem(kind);
      expect(item).not.toBeNull();
      expect(itemsForKind(kind)).toContain(item);
    }
  });

  it('avoids the current item when possible', () => {
    const excluded = tacticExercises[0]!;
    for (let index = 0; index < 100; index += 1) {
      expect(pickRandomTrainingItem('tactics', excluded.id)?.id).not.toBe(excluded.id);
    }
  });

  it('can draw from a favorites pool', () => {
    const pool = [tacticExercises[0]!, tacticExercises[1]!];
    for (let index = 0; index < 50; index += 1) {
      expect(pool).toContain(pickRandomTrainingItem('tactics', undefined, pool));
    }
  });

  it('returns null when the pool is empty', () => {
    expect(pickRandomTrainingItem('tactics', undefined, [])).toBeNull();
    expect(randomTrainingPath('tactics', undefined, [])).toBeNull();
  });

  it('builds a random-mode play path for a kind', () => {
    const excluded = endgameLessons[0]!;
    const path = randomTrainingPath('endgame', excluded.id);
    expect(path).toMatch(/^\/train\/endgame\/[^?]+\?random=1$/);
    expect(path).not.toContain(`/${excluded.id}?`);
  });
});
