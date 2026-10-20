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
    reviewedBy: '规则核全量校验 + 人工复核',
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
    reviewedBy: '规则核全量校验 + 人工复核',
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
    reviewedBy: '规则核全量校验 + 人工复核',
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
{
  "id": "opening-classic-01",
  "kind": "opening",
  "title": "橘中秘 · 顺炮直车左炮巡河",
  "subtitle": "顺炮直车，左炮巡河",
  "level": 2,
  "order": 4,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》第010局 · 顺炮直车左炮巡河破横车",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/64696/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》“顺炮直车左炮巡河破横车”。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
  "keyPoints": [
    "古谱原谱主线",
    "逐着通过规则核校验",
    "用于开局思路学习，不作为胜负结论"
  ],
  "lines": [
    {
      "id": "main",
      "label": "原谱主线",
      "moves": [
        {
          "ucci": "h2e2",
          "comment": "炮二平五。"
        },
        {
          "ucci": "h7e7",
          "comment": "炮8平5。"
        },
        {
          "ucci": "h0g2",
          "comment": "马二进三。"
        },
        {
          "ucci": "h9g7",
          "comment": "马8进7。"
        },
        {
          "ucci": "i0h0",
          "comment": "车一平二。"
        },
        {
          "ucci": "i9i8",
          "comment": "车9进1。"
        },
        {
          "ucci": "h0h6",
          "comment": "车二进六。"
        },
        {
          "ucci": "i8d8",
          "comment": "车9平4。"
        },
        {
          "ucci": "h6g6",
          "comment": "车二平三。"
        },
        {
          "ucci": "d8d2",
          "comment": "车4进6。"
        },
        {
          "ucci": "b2b4",
          "comment": "炮八进二。"
        },
        {
          "ucci": "d2d4",
          "comment": "车4退2。"
        },
        {
          "ucci": "b4a4",
          "comment": "炮八平九。"
        },
        {
          "ucci": "b9a7",
          "comment": "马2进1。"
        },
        {
          "ucci": "c3c4",
          "comment": "兵七进一。"
        },
        {
          "ucci": "d4c4",
          "comment": "车4平3。"
        },
        {
          "ucci": "c0a2",
          "comment": "相七进九。"
        },
        {
          "ucci": "c4b4",
          "comment": "车3平2。"
        },
        {
          "ucci": "b0c2",
          "comment": "马八进七。"
        },
        {
          "ucci": "b4f4",
          "comment": "车2平6。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-02",
  "kind": "opening",
  "title": "橘中秘 · 屏风马破当头炮（让先）",
  "subtitle": "让先局，屏风马对中炮",
  "level": 2,
  "order": 5,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》第012局 · 让先屏风马破当头炮",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/64551/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》“让先屏风马破当头炮”。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
  "keyPoints": [
    "古谱原谱主线",
    "逐着通过规则核校验",
    "用于开局思路学习，不作为胜负结论"
  ],
  "lines": [
    {
      "id": "main",
      "label": "原谱主线",
      "moves": [
        {
          "ucci": "h2e2",
          "comment": "炮二平五。"
        },
        {
          "ucci": "h9g7",
          "comment": "马8进7。"
        },
        {
          "ucci": "h0g2",
          "comment": "马二进三。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "i0h0",
          "comment": "车一平二。"
        },
        {
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "h0h6",
          "comment": "车二进六。"
        },
        {
          "ucci": "c6c5",
          "comment": "卒3进1。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "g9e7",
          "comment": "象7进5。"
        },
        {
          "ucci": "h6g6",
          "comment": "车二平三。"
        },
        {
          "ucci": "c7d5",
          "comment": "马3进4。"
        },
        {
          "ucci": "g3g4",
          "comment": "兵三进一。"
        },
        {
          "ucci": "h7h3",
          "comment": "炮8进4。"
        },
        {
          "ucci": "e2e6",
          "comment": "炮五进四。"
        },
        {
          "ucci": "f9e8",
          "comment": "士6进5。"
        },
        {
          "ucci": "e6e5",
          "comment": "炮五退一。"
        },
        {
          "ucci": "h3g3",
          "comment": "炮8平7。"
        },
        {
          "ucci": "g6d6",
          "comment": "车三平六。"
        },
        {
          "ucci": "g3g0",
          "comment": "炮7进3。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-03",
  "kind": "opening",
  "title": "橘中秘 · 屏风马破当头炮 020",
  "subtitle": "起马局转屏风马，稳步反击",
  "level": 2,
  "order": 6,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》第020局 · 屏风马破当头炮",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69070/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》“屏风马破当头炮”。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
  "keyPoints": [
    "古谱原谱主线",
    "逐着通过规则核校验",
    "用于开局思路学习，不作为胜负结论"
  ],
  "lines": [
    {
      "id": "main",
      "label": "原谱主线",
      "moves": [
        {
          "ucci": "h0g2",
          "comment": "马二进三。"
        },
        {
          "ucci": "h7e7",
          "comment": "炮8平5。"
        },
        {
          "ucci": "b0c2",
          "comment": "马八进七。"
        },
        {
          "ucci": "h9g7",
          "comment": "马8进7。"
        },
        {
          "ucci": "g3g4",
          "comment": "兵三进一。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "i0h0",
          "comment": "车一平二。"
        },
        {
          "ucci": "h9h3",
          "comment": "车8进6。"
        },
        {
          "ucci": "c0e2",
          "comment": "相七进五。"
        },
        {
          "ucci": "c6c5",
          "comment": "卒3进1。"
        },
        {
          "ucci": "d0e1",
          "comment": "仕六进五。"
        },
        {
          "ucci": "b7c7",
          "comment": "炮2平3。"
        },
        {
          "ucci": "a0d0",
          "comment": "车九平六。"
        },
        {
          "ucci": "h3g3",
          "comment": "车8平7。"
        },
        {
          "ucci": "h2h9",
          "comment": "炮二进七。"
        },
        {
          "ucci": "g7h9",
          "comment": "马7退8。"
        },
        {
          "ucci": "h0h9",
          "comment": "车二进九。"
        },
        {
          "ucci": "g3g2",
          "comment": "车7进1。"
        },
        {
          "ucci": "b2b6",
          "comment": "炮八进四。"
        },
        {
          "ucci": "g6g5",
          "comment": "卒7进1。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
}
];
