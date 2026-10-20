import type { Color } from '@qilian/xiangqi';

export type TrainingKind = 'tactics' | 'endgame' | 'opening';
export type ContentLevel = 1 | 2 | 3;

export interface ContentSource {
  name: string;
  author: string;
  license: string;
  url?: string;
}

export interface TrainingMeta {
  id: string;
  kind: TrainingKind;
  title: string;
  subtitle: string;
  level: ContentLevel;
  order: number;
  tags: string[];
  source: ContentSource;
  reviewedAt: string;
  reviewedBy: string;
}

export interface TacticsExercise extends TrainingMeta {
  kind: 'tactics';
  fen: string;
  goal: 'mate';
  solutions: string[][];
  hint: string;
  explanation: string;
}

export interface GuidedMove {
  ucci: string;
  comment?: string;
}

export interface GuidedLine {
  id: string;
  label: string;
  moves: GuidedMove[];
}

export interface GuidedLesson extends TrainingMeta {
  kind: 'endgame' | 'opening';
  fen: string;
  userColor: Color;
  objective: 'win' | 'draw' | 'demonstration';
  intro: string;
  keyPoints: string[];
  lines: GuidedLine[];
  completionText: string;
}

export type TrainingItem = TacticsExercise | GuidedLesson;

export interface ContentStats {
  tactics: number;
  endgame: number;
  opening: number;
}
