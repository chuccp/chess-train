import type {
  ContentStats,
  GuidedLesson,
  TacticsExercise,
  TrainingItem,
  TrainingKind,
} from './types';
import tacticsJson from './data/tactics.json';
import tacticsExtraJson from './data/tactics-extra.json';
import endgamesJson from './data/endgames.json';
import endgamesExtraJson from './data/endgame-extra.json';
import { openingLessons as rawOpeningLessons } from './data/openings';
import openingsExtraJson from './data/openings-extra.json';

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
export const openingLessons = [
  ...rawOpeningLessons,
  ...(openingsExtraJson as GuidedLesson[]),
].sort((left, right) => {
  if (left.level !== right.level) return left.level - right.level;
  const leftDepth = left.lines[0]?.moves.length ?? 0;
  const rightDepth = right.lines[0]?.moves.length ?? 0;
  if (leftDepth !== rightDepth) return leftDepth - rightDepth;
  return left.order - right.order;
});

const baseTacticExercises = [
  ...(tacticsJson as TacticsExercise[]),
  ...(tacticsExtraJson as TacticsExercise[]),
];
const rawEndgameLessons = endgamesJson as GuidedLesson[];
const extraEndgameLessons = endgamesExtraJson as GuidedLesson[];
/** These duplicate tactic positions are already present as one-move exercises. */
const oneMoveEndgameIds = new Set(['endgame-01', 'endgame-02']);
const stalemateLessons: GuidedLesson[] = [
  {
    id: 'endgame-stalemate-01',
    kind: 'endgame',
    title: '原创困毙 · 帅控将门',
    subtitle: '红先，两步困毙黑方',
    level: 1,
    order: 1001,
    tags: ['原创', '困毙', '两步杀'],
    source: { name: '棋练原创编排', author: '棋练项目组', license: 'CC0-1.0' },
    reviewedAt: '2026-10-25',
    reviewedBy: '规则核全量校验',
    fen: '2b1R4/4a4/4k4/3N5/9/9/9/9/9/5K3 w - - 0 1',
    userColor: 'r',
    objective: 'win',
    intro: '困毙也是中国象棋的胜法。黑方没有被将军，但若没有任何合法着法，同样判红方获胜。',
    keyPoints: ['先用車控制九宫横线', '等黑方退士后再吃掉最后的挡子', '确认黑方无子可走，而不是把将帅照面当成普通走子'],
    lines: [{
      id: 'main',
      label: '主线 · 两步困毙',
      moves: [
        { ucci: 'e9c9', comment: '先手：车五平七。先吃掉九宫外侧的挡子。' },
        { ucci: 'e8d9', comment: '黑方应 士5退4，九宫里的空间进一步缩小。' },
        { ucci: 'c9d9', comment: '收口：车七平六。黑方无合法着法，形成困毙。' },
      ],
    }],
    completionText: '困毙完成。将死与困毙都属于杀法胜利。',
  },
];

export const tacticExercises = baseTacticExercises.slice().sort((left, right) => {
  if (left.level !== right.level) return left.level - right.level;
  if (left.solutions.length !== right.solutions.length) {
    return right.solutions.length - left.solutions.length;
  }
  return left.order - right.order;
});
const uniqueEndgameLines = new Set<string>();
export const endgameLessons = [...rawEndgameLessons, ...extraEndgameLessons, ...stalemateLessons]
  .filter((lesson) => {
    if (oneMoveEndgameIds.has(lesson.id)) return false;
    const signature = lesson.lines[0]?.moves.map((move) => move.ucci).join(' ') ?? '';
    if (!signature || uniqueEndgameLines.has(signature)) return false;
    uniqueEndgameLines.add(signature);
    return true;
  })
  .sort((left, right) => {
    if (left.level !== right.level) return left.level - right.level;
    const leftDepth = left.lines[0]?.moves.length ?? 0;
    const rightDepth = right.lines[0]?.moves.length ?? 0;
    if (leftDepth !== rightDepth) return leftDepth - rightDepth;
    return left.order - right.order;
  });

export const contentStats: ContentStats = {
  tactics: tacticExercises.length,
  endgame: endgameLessons.length,
  opening: openingLessons.length,
};

export const trainingKindLabels: Record<TrainingKind, string> = {
  tactics: '一步杀法',
  endgame: '残棋定式',
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
