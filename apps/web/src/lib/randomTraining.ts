import type { TrainingItem, TrainingKind } from '@qilian/content';
import { itemsForKind } from '@qilian/content';

/** 从指定栏目的训练条目里随机抽一题，尽量避开当前题。 */
export function pickRandomTrainingItem(
  kind: TrainingKind,
  excludeId?: string | null,
  pool: readonly TrainingItem[] = itemsForKind(kind),
): TrainingItem | null {
  let candidates = pool;
  if (excludeId) {
    const remaining = candidates.filter((item) => item.id !== excludeId);
    if (remaining.length > 0) candidates = remaining;
  }
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)] ?? null;
}

export function randomTrainingPath(
  kind: TrainingKind,
  excludeId?: string | null,
  pool: readonly TrainingItem[] = itemsForKind(kind),
): string | null {
  const item = pickRandomTrainingItem(kind, excludeId, pool);
  return item ? `/train/${kind}/${item.id}?random=1` : null;
}
