import type {
  ContentStats,
  GuidedLesson,
  TacticsExercise,
  TrainingItem,
  TrainingKind,
} from './types';
import tacticsJson from './data/tactics.json';
import endgamesJson from './data/endgames.json';
import { openingLessons } from './data/openings';

export type {
  ContentLevel,
  ContentSource,
  ContentStats,
  GuidedLesson,
  GuidedLine,
  GuidedMove,
  TacticsExercise,
  TrainingItem,
  TrainingKind,
  TrainingMeta,
} from './types';
export { openingLessons };

export const tacticExercises = tacticsJson as TacticsExercise[];
export const endgameLessons = endgamesJson as GuidedLesson[];

export const contentStats: ContentStats = {
  tactics: tacticExercises.length,
  endgame: endgameLessons.length,
  opening: openingLessons.length,
};

export const trainingKindLabels: Record<TrainingKind, string> = {
  tactics: '杀法训练',
  endgame: '残局定式',
  opening: '开局训练',
};

export function itemsForKind(kind: TrainingKind): TrainingItem[] {
  if (kind === 'tactics') return tacticExercises;
  if (kind === 'endgame') return endgameLessons;
  return openingLessons;
}

export function findTrainingItem(kind: TrainingKind, id: string): TrainingItem | null {
  return itemsForKind(kind).find((item) => item.id === id) ?? null;
}

export function tacticById(id: string): TacticsExercise | null {
  return tacticExercises.find((item) => item.id === id) ?? null;
}

export function lessonById(kind: 'endgame' | 'opening', id: string): GuidedLesson | null {
  return itemsForKind(kind).find((item): item is GuidedLesson => item.id === id) ?? null;
}

export function nextTrainingItem(kind: TrainingKind, id: string): TrainingItem | null {
  const items = itemsForKind(kind);
  const index = items.findIndex((item) => item.id === id);
  return index >= 0 ? (items[index + 1] ?? null) : null;
}
