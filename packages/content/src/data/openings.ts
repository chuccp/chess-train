import type { GuidedLesson } from '../types';
import { START_FEN } from '@qilian/xiangqi';

const source = {
  name: '公开布局常识整理',
  author: '棋练项目组',
  license: 'CC0-1.0',
};

const reviewedAt = '2026-10-20';

export const openingLessons: GuidedLesson[] = [
  {
    id: 'opening-central-cannon-screen-horses',
    kind: 'opening',
    title: '中炮对屏风马 · 直车正马',
    subtitle: '最常用的中炮对屏风马起手',
    level: 1,
    order: 1,
    tags: ['中炮', '屏风马', '直车'],
    source,
    reviewedAt,
    reviewedBy: '规则核主线校验 + 人工审阅',
    fen: START_FEN,
    userColor: 'r',
    objective: 'demonstration',
    intro:
      '红方先架中炮，黑方以屏风马守中，红方再出动正马与直车。这条主线展示双方最常见、最稳妥的出动顺序。',
    keyPoints: [
      '中炮先占中路，但不要急着冲兵',
      '屏风马先护中卒，再活通两翼',
      '红方双正马配合直车，形成堂堂正正的中炮阵势',
    ],
    lines: [
      {
        id: 'main',
        label: '主线 · 红方直车正马',
        moves: [
          { ucci: 'h2e2', comment: '炮二平五，红方架起中炮，瞄准黑方中卒。' },
          { ucci: 'h9g7', comment: '马8进7，黑方跳起左正马，为屏风马护中。' },
          { ucci: 'h0g2', comment: '马二进三，红方也跳正马，保护中兵并通车路。' },
          { ucci: 'b9c7', comment: '马2进3，黑方双马成屏风，守住中路。' },
          { ucci: 'i0h0', comment: '车一平二，红方出直车，压住黑方左翼。' },
          { ucci: 'i9h9', comment: '车9平8，黑方也出直车，双方进入中炮对屏风马的标准阵势。' },
        ],
      },
    ],
    completionText:
      '主线完成。中炮对屏风马的关键不是急着进攻，而是先把双马和直车摆到能够互相支援的位置。',
  },
  {
    id: 'opening-same-direction-cannon',
    kind: 'opening',
    title: '顺炮直车 · 对攻起手',
    subtitle: '双方同侧架炮，局面更直接',
    level: 2,
    order: 2,
    tags: ['顺炮', '直车', '对攻'],
    source,
    reviewedAt,
    reviewedBy: '规则核主线校验 + 人工审阅',
    fen: START_FEN,
    userColor: 'r',
    objective: 'demonstration',
    intro:
      '红方架中炮后，黑方也在同一侧架炮，形成顺炮。顺炮局面通常比屏风马更直接，双方都要尽快出动大子。',
    keyPoints: [
      '顺炮的火力集中，但中路也更薄',
      '红方先用正马护中，再出直车',
      '黑方起横车是顺炮中常见的反击思路',
    ],
    lines: [
      {
        id: 'main',
        label: '主线 · 顺炮直车对横车',
        moves: [
          { ucci: 'h2e2', comment: '炮二平五，红方先架中炮。' },
          { ucci: 'h7e7', comment: '炮8平5，黑方同侧还架中炮，形成顺炮。' },
          { ucci: 'h0g2', comment: '马二进三，红方先护中兵。' },
          { ucci: 'h9g7', comment: '马8进7，黑方也跳正马。' },
          { ucci: 'i0h0', comment: '车一平二，红方出直车，准备抢占要道。' },
          { ucci: 'i9i8', comment: '车9进1，黑方起横车，准备从肋道反击。' },
        ],
      },
    ],
    completionText:
      '主线完成。顺炮不是盲目对攻：先护住中兵，再把车开到能威胁对方弱点的位置。',
  },
  {
    id: 'opening-pawn-opening',
    kind: 'opening',
    title: '仙人指路 · 先探虚实',
    subtitle: '用一步兵先试探黑方布局',
    level: 2,
    order: 3,
    tags: ['仙人指路', '兵类开局', '柔性布局'],
    source,
    reviewedAt,
    reviewedBy: '规则核主线校验 + 人工审阅',
    fen: START_FEN,
    userColor: 'r',
    objective: 'demonstration',
    intro:
      '红方第一步先挺七兵，不急于架中炮。仙人指路把选择权留给自己，根据黑方的应手再决定中炮、飞相或起马。',
    keyPoints: [
      '先挺兵可以观察黑方布局方向',
      '黑方跳马后，红方仍可回到中炮或起马体系',
      '不要为了“仙人指路”而忘记出车',
    ],
    lines: [
      {
        id: 'main',
        label: '主线 · 先挺七兵，再出正马',
        moves: [
          { ucci: 'c3c4', comment: '兵七进一，红方先挺七兵，试探黑方应手。' },
          { ucci: 'h9g7', comment: '马8进7，黑方先出动左马。' },
          { ucci: 'h0g2', comment: '马二进三，红方也跳正马，保持阵形弹性。' },
          { ucci: 'b9c7', comment: '马2进3，黑方双马出动。' },
          { ucci: 'i0h0', comment: '车一平二，红方出直车，先占住二路。' },
          { ucci: 'i9h9', comment: '车9平8，黑方也出直车，局面转入柔性对峙。' },
        ],
      },
    ],
    completionText:
      '主线完成。仙人指路的价值在于保留选择；无论黑方怎么应，红方都要尽快把车和马走到有作用的位置。',
  },
];
