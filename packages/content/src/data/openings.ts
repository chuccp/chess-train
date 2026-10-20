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
,
{
  "id": "opening-classic-04",
  "kind": "opening",
  "title": "橘中秘 · 顺炮直车夹马炮破横车",
  "subtitle": "让先顺炮，夹马炮破横车",
  "level": 2,
  "order": 7,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》第006局 · 让先顺炮直车夹马炮起相保马破横车",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69092/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自《橘中秘》第006局。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "i0i1",
          "comment": "车一进一。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "i1d1",
          "comment": "车一平六。"
        },
        {
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "d1d6",
          "comment": "车六进五。"
        },
        {
          "ucci": "c9a7",
          "comment": "象3进1。"
        },
        {
          "ucci": "d6c6",
          "comment": "车六平七。"
        },
        {
          "ucci": "a9c9",
          "comment": "车1平3。"
        },
        {
          "ucci": "b2c2",
          "comment": "炮八平七。"
        },
        {
          "ucci": "c7e8",
          "comment": "马3退5。"
        },
        {
          "ucci": "c6b6",
          "comment": "车七平八。"
        },
        {
          "ucci": "b7c7",
          "comment": "炮2平3。"
        },
        {
          "ucci": "b6c6",
          "comment": "车八平七。"
        },
        {
          "ucci": "c7c3",
          "comment": "炮3进4。"
        },
        {
          "ucci": "c6c9",
          "comment": "车七进三。"
        },
        {
          "ucci": "c3c0",
          "comment": "炮3进3。"
        },
        {
          "ucci": "d0e1",
          "comment": "仕六进五。"
        },
        {
          "ucci": "c0a0",
          "comment": "炮3平1。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "a7c9",
          "comment": "象1退3。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-05",
  "kind": "opening",
  "title": "橘中秘 · 右炮直车破左单提马",
  "subtitle": "右炮直车，攻击单提马",
  "level": 2,
  "order": 8,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》第012局 · 右炮直车破左单提马士象局",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69067/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自《橘中秘》第012局。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "b9a7",
          "comment": "马2进1。"
        },
        {
          "ucci": "i0h0",
          "comment": "车一平二。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "h0h6",
          "comment": "车二进六。"
        },
        {
          "ucci": "g6g5",
          "comment": "卒7进1。"
        },
        {
          "ucci": "e3e4",
          "comment": "兵五进一。"
        },
        {
          "ucci": "f9e8",
          "comment": "士6进5。"
        },
        {
          "ucci": "b0c2",
          "comment": "马八进七。"
        },
        {
          "ucci": "h7i7",
          "comment": "炮8平9。"
        },
        {
          "ucci": "h6g6",
          "comment": "车二平三。"
        },
        {
          "ucci": "g9e7",
          "comment": "象7进5。"
        },
        {
          "ucci": "e4e5",
          "comment": "兵五进一。"
        },
        {
          "ucci": "e6e5",
          "comment": "卒5进1。"
        },
        {
          "ucci": "c2e3",
          "comment": "马七进五。"
        },
        {
          "ucci": "i7i8",
          "comment": "炮9退1。"
        },
        {
          "ucci": "e3f5",
          "comment": "马五进四。"
        },
        {
          "ucci": "i8g8",
          "comment": "炮9平7。"
        },
        {
          "ucci": "f5g7",
          "comment": "马四进三。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-06",
  "kind": "opening",
  "title": "橘中秘 · 顺炮横车破先补士角炮",
  "subtitle": "顺炮横车，破士角炮",
  "level": 2,
  "order": 9,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》第007局 · 顺炮横车破先补士角炮",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69071/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自《橘中秘》第007局。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "i0i1",
          "comment": "车一进一。"
        },
        {
          "ucci": "b7d7",
          "comment": "炮2平4。"
        },
        {
          "ucci": "i1d1",
          "comment": "车一平六。"
        },
        {
          "ucci": "f9e8",
          "comment": "士6进5。"
        },
        {
          "ucci": "a3a4",
          "comment": "兵九进一。"
        },
        {
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "a9b9",
          "comment": "车1平2。"
        },
        {
          "ucci": "a0b0",
          "comment": "车九平八。"
        },
        {
          "ucci": "b9b5",
          "comment": "车2进4。"
        },
        {
          "ucci": "d1d4",
          "comment": "车六进三。"
        },
        {
          "ucci": "g6g5",
          "comment": "卒7进1。"
        },
        {
          "ucci": "a2b4",
          "comment": "马九进八。"
        },
        {
          "ucci": "b5f5",
          "comment": "车2平6。"
        },
        {
          "ucci": "b4c6",
          "comment": "马八进七。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "b2c2",
          "comment": "炮八平七。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-07",
  "kind": "opening",
  "title": "橘中秘 · 顺炮横车破直车沉炮",
  "subtitle": "让先顺炮，横车沉炮",
  "level": 2,
  "order": 10,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》第003局 · 让先顺炮横车破直车沉炮",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/64548/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自《橘中秘》第003局。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "i9i8",
          "comment": "车9进1。"
        },
        {
          "ucci": "i0h0",
          "comment": "车一平二。"
        },
        {
          "ucci": "h9g7",
          "comment": "马8进7。"
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
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "f0e1",
          "comment": "仕四进五。"
        },
        {
          "ucci": "e7e8",
          "comment": "炮5退1。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "c6c5",
          "comment": "卒3进1。"
        },
        {
          "ucci": "b2d2",
          "comment": "炮八平六。"
        },
        {
          "ucci": "d8d7",
          "comment": "车4进1。"
        },
        {
          "ucci": "a0b0",
          "comment": "车九平八。"
        },
        {
          "ucci": "a9b9",
          "comment": "车1平2。"
        },
        {
          "ucci": "b0b4",
          "comment": "车八进四。"
        },
        {
          "ucci": "c5c4",
          "comment": "卒3进1。"
        },
        {
          "ucci": "b4c4",
          "comment": "车八平七。"
        },
        {
          "ucci": "e8g8",
          "comment": "炮5平7。"
        },
        {
          "ucci": "g6h6",
          "comment": "车三平二。"
        },
        {
          "ucci": "g8c8",
          "comment": "炮7平3。"
        },
        {
          "ucci": "c4g4",
          "comment": "车七平三。"
        },
        {
          "ucci": "c7b5",
          "comment": "马3进2。"
        },
        {
          "ucci": "g4c4",
          "comment": "车三平七。"
        },
        {
          "ucci": "b7c7",
          "comment": "炮2平3。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-08",
  "kind": "opening",
  "title": "梅花谱 · 巡河炮攻横车拦河去兵",
  "subtitle": "巡河炮攻横车，拦河去兵",
  "level": 2,
  "order": 11,
  "tags": [
    "古谱",
    "梅花谱",
    "开局"
  ],
  "source": {
    "name": "《梅花谱》第2局 · 巡河炮攻横车拦河去兵",
    "author": "清·王再越",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/64436/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自《梅花谱》第2局。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "c3c4",
          "comment": "兵七进一。"
        },
        {
          "ucci": "d4c4",
          "comment": "车4平3。"
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
          "ucci": "c0a2",
          "comment": "相七进九。"
        },
        {
          "ucci": "c4c1",
          "comment": "车3进3。"
        },
        {
          "ucci": "a4g4",
          "comment": "炮九平三。"
        },
        {
          "ucci": "c1b1",
          "comment": "车3平2。"
        },
        {
          "ucci": "b0d1",
          "comment": "马八进六。"
        },
        {
          "ucci": "b1d1",
          "comment": "车2平4。"
        },
        {
          "ucci": "a0b0",
          "comment": "车九平八。"
        },
        {
          "ucci": "a9b9",
          "comment": "车1平2。"
        },
        {
          "ucci": "f0e1",
          "comment": "仕四进五。"
        },
        {
          "ucci": "g7i8",
          "comment": "马7退9。"
        },
        {
          "ucci": "g6g8",
          "comment": "车三进二。"
        },
        {
          "ucci": "i8g7",
          "comment": "马9进7。"
        },
        {
          "ucci": "b0b7",
          "comment": "车八进七。"
        },
        {
          "ucci": "b9b7",
          "comment": "车2进2。"
        },
        {
          "ucci": "g8g7",
          "comment": "车三退一。"
        },
        {
          "ucci": "g9i7",
          "comment": "象7进9。"
        },
        {
          "ucci": "g7i7",
          "comment": "车三平一。"
        },
        {
          "ucci": "e7g7",
          "comment": "炮5平7。"
        },
        {
          "ucci": "e2e6",
          "comment": "炮五进四。"
        },
        {
          "ucci": "e9e8",
          "comment": "将5进1。"
        },
        {
          "ucci": "i7i8",
          "comment": "车一进一。"
        },
        {
          "ucci": "e8e7",
          "comment": "将5进1。"
        },
        {
          "ucci": "i8g8",
          "comment": "车一平三。"
        },
        {
          "ucci": "g7g3",
          "comment": "炮7进4。"
        },
        {
          "ucci": "g4e4",
          "comment": "炮三平五。"
        },
        {
          "ucci": "e7d7",
          "comment": "将5平4。"
        },
        {
          "ucci": "g8g7",
          "comment": "车三退一。"
        },
        {
          "ucci": "c9e7",
          "comment": "象3进5。"
        },
        {
          "ucci": "g7e7",
          "comment": "车三平五。"
        },
        {
          "ucci": "d7d8",
          "comment": "将4退1。"
        },
        {
          "ucci": "e7b7",
          "comment": "车五平八。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-09",
  "kind": "opening",
  "title": "吴氏梅花谱 · 屏风马破士角马",
  "subtitle": "让先屏风马，破士角马",
  "level": 2,
  "order": 12,
  "tags": [
    "古谱",
    "梅花谱",
    "开局"
  ],
  "source": {
    "name": "《吴氏梅花谱》局5 · 让先屏风马破士角马局",
    "author": "吴氏梅花谱原编",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/68381/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自《吴氏梅花谱》局5。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "g0e2",
          "comment": "相三进五。"
        },
        {
          "ucci": "h9g7",
          "comment": "马8进7。"
        },
        {
          "ucci": "h0f1",
          "comment": "马二进四。"
        },
        {
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "h2i2",
          "comment": "炮二平一。"
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
          "ucci": "h7h3",
          "comment": "炮8进4。"
        },
        {
          "ucci": "g3g4",
          "comment": "兵三进一。"
        },
        {
          "ucci": "c6c5",
          "comment": "卒3进1。"
        },
        {
          "ucci": "f1d2",
          "comment": "马四进六。"
        },
        {
          "ucci": "c7d5",
          "comment": "马3进4。"
        },
        {
          "ucci": "c3c4",
          "comment": "兵七进一。"
        },
        {
          "ucci": "d5e3",
          "comment": "马4进5。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "c5c4",
          "comment": "卒3进1。"
        },
        {
          "ucci": "e2c4",
          "comment": "相五进七。"
        },
        {
          "ucci": "e3d1",
          "comment": "马5进4。"
        },
        {
          "ucci": "b2c2",
          "comment": "炮八平七。"
        },
        {
          "ucci": "b7e7",
          "comment": "炮2平5。"
        },
        {
          "ucci": "i2e2",
          "comment": "炮一平五。"
        },
        {
          "ucci": "h3e3",
          "comment": "炮8平5。"
        },
        {
          "ucci": "e2h2",
          "comment": "炮五平二。"
        },
        {
          "ucci": "d1f2",
          "comment": "马4退6。"
        },
        {
          "ucci": "c2f2",
          "comment": "炮七平四。"
        },
        {
          "ucci": "e3h3",
          "comment": "前炮平8。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
}
,
{
  "id": "opening-classic-10",
  "kind": "opening",
  "title": "橘中秘 · 让先-小列手炮弃相陷车011",
  "subtitle": "《橘中秘》让先-小列手炮弃相陷车011",
  "level": 2,
  "order": 13,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》让先-小列手炮弃相陷车011",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69085/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "b7e7",
          "comment": "炮2平5。"
        },
        {
          "ucci": "h0g2",
          "comment": "马二进三。"
        },
        {
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "i0h0",
          "comment": "车一平二。"
        },
        {
          "ucci": "h9g7",
          "comment": "马8进7。"
        },
        {
          "ucci": "h0h6",
          "comment": "车二进六。"
        },
        {
          "ucci": "a9a8",
          "comment": "车1进1。"
        },
        {
          "ucci": "h6g6",
          "comment": "车二平三。"
        },
        {
          "ucci": "g7h9",
          "comment": "马7退8。"
        },
        {
          "ucci": "g6g9",
          "comment": "车三进三。"
        },
        {
          "ucci": "e7g7",
          "comment": "炮5平7。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "c9e7",
          "comment": "象3进5。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-11",
  "kind": "opening",
  "title": "橘中秘 · 右炮横车破缠角马象局015",
  "subtitle": "《橘中秘》右炮横车破缠角马象局015",
  "level": 2,
  "order": 14,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》右炮横车破缠角马象局015",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69064/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "c9e7",
          "comment": "象3进5。"
        },
        {
          "ucci": "h0g2",
          "comment": "马二进三。"
        },
        {
          "ucci": "b9d8",
          "comment": "马2进4。"
        },
        {
          "ucci": "i0i1",
          "comment": "车一进一。"
        },
        {
          "ucci": "h9i7",
          "comment": "马8进9。"
        },
        {
          "ucci": "i1f1",
          "comment": "车一平四。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "f1f8",
          "comment": "车四进七。"
        },
        {
          "ucci": "d8f7",
          "comment": "马4进6。"
        },
        {
          "ucci": "e2e6",
          "comment": "炮五进四。"
        },
        {
          "ucci": "d9e8",
          "comment": "士4进5。"
        },
        {
          "ucci": "b2f2",
          "comment": "炮八平四。"
        },
        {
          "ucci": "f7g5",
          "comment": "马6进7。"
        },
        {
          "ucci": "f2f9",
          "comment": "炮四进七。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-12",
  "kind": "opening",
  "title": "橘中秘 · 顺炮横车破夹马炮009",
  "subtitle": "《橘中秘》顺炮横车破夹马炮009",
  "level": 2,
  "order": 15,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》顺炮横车破夹马炮009",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69072/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "i0i1",
          "comment": "车一进一。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "i1d1",
          "comment": "车一平六。"
        },
        {
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "d1d6",
          "comment": "车六进五。"
        },
        {
          "ucci": "e6e5",
          "comment": "卒5进1。"
        },
        {
          "ucci": "d6c6",
          "comment": "车六平七。"
        },
        {
          "ucci": "c7e6",
          "comment": "马3进5。"
        },
        {
          "ucci": "b2b6",
          "comment": "炮八进四。"
        },
        {
          "ucci": "e6g5",
          "comment": "马5进7。"
        },
        {
          "ucci": "g3g4",
          "comment": "兵三进一。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-13",
  "kind": "opening",
  "title": "橘中秘 · 让先-顺炮直车巡河破横车005",
  "subtitle": "《橘中秘》让先-顺炮直车巡河破横车005",
  "level": 2,
  "order": 16,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》让先-顺炮直车巡河破横车005",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69093/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "i0i1",
          "comment": "车一进一。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "i1d1",
          "comment": "车一平六。"
        },
        {
          "ucci": "h9h5",
          "comment": "车8进4。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "b9a7",
          "comment": "马2进1。"
        },
        {
          "ucci": "a3a4",
          "comment": "兵九进一。"
        },
        {
          "ucci": "a6a5",
          "comment": "卒1进1。"
        },
        {
          "ucci": "a4a5",
          "comment": "兵九进一。"
        },
        {
          "ucci": "h5a5",
          "comment": "车8平1。"
        },
        {
          "ucci": "d1d7",
          "comment": "车六进六。"
        },
        {
          "ucci": "b7b3",
          "comment": "炮2进4。"
        },
        {
          "ucci": "d0e1",
          "comment": "仕六进五。"
        },
        {
          "ucci": "d9e8",
          "comment": "士4进5。"
        },
        {
          "ucci": "d7b7",
          "comment": "车六平八。"
        },
        {
          "ucci": "a7b5",
          "comment": "马1进2。"
        },
        {
          "ucci": "b7b5",
          "comment": "车八退二。"
        },
        {
          "ucci": "b3a3",
          "comment": "炮2平1。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-14",
  "kind": "opening",
  "title": "橘中秘 · 让先-顺炮直车破横车004",
  "subtitle": "《橘中秘》让先-顺炮直车破横车004",
  "level": 2,
  "order": 17,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》让先-顺炮直车破横车004",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69094/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "i0i1",
          "comment": "车一进一。"
        },
        {
          "ucci": "b9a7",
          "comment": "马2进1。"
        },
        {
          "ucci": "i1d1",
          "comment": "车一平六。"
        },
        {
          "ucci": "b7c7",
          "comment": "炮2平3。"
        },
        {
          "ucci": "d1d7",
          "comment": "车六进六。"
        },
        {
          "ucci": "c7c3",
          "comment": "炮3进4。"
        },
        {
          "ucci": "d7d3",
          "comment": "车六退四。"
        },
        {
          "ucci": "a9b9",
          "comment": "车1平2。"
        },
        {
          "ucci": "b2d2",
          "comment": "炮八平六。"
        },
        {
          "ucci": "b9b1",
          "comment": "车2进8。"
        },
        {
          "ucci": "d3c3",
          "comment": "车六平七。"
        },
        {
          "ucci": "e7c7",
          "comment": "炮5平3。"
        },
        {
          "ucci": "c3c2",
          "comment": "车七退一。"
        },
        {
          "ucci": "i9i8",
          "comment": "车9进1。"
        },
        {
          "ucci": "f0e1",
          "comment": "仕四进五。"
        },
        {
          "ucci": "c7c2",
          "comment": "炮3进5。"
        },
        {
          "ucci": "e2c2",
          "comment": "炮五平七。"
        },
        {
          "ucci": "i8b8",
          "comment": "车9平2。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-15",
  "kind": "opening",
  "title": "橘中秘 · 右炮横车破象局014",
  "subtitle": "《橘中秘》右炮横车破象局014",
  "level": 2,
  "order": 18,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》右炮横车破象局014",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69065/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "h0g2",
          "comment": "马二进三。"
        },
        {
          "ucci": "h9i7",
          "comment": "马8进9。"
        },
        {
          "ucci": "i0i1",
          "comment": "车一进一。"
        },
        {
          "ucci": "c9e7",
          "comment": "象3进5。"
        },
        {
          "ucci": "i1d1",
          "comment": "车一平六。"
        },
        {
          "ucci": "d9e8",
          "comment": "士4进5。"
        },
        {
          "ucci": "d1d6",
          "comment": "车六进五。"
        },
        {
          "ucci": "a9d9",
          "comment": "车1平4。"
        },
        {
          "ucci": "d6c6",
          "comment": "车六平七。"
        },
        {
          "ucci": "b7b9",
          "comment": "炮2退2。"
        },
        {
          "ucci": "b0c2",
          "comment": "马八进七。"
        },
        {
          "ucci": "b9c9",
          "comment": "炮2平3。"
        },
        {
          "ucci": "c6c7",
          "comment": "车七进一。"
        },
        {
          "ucci": "h7c7",
          "comment": "炮8平3。"
        },
        {
          "ucci": "b2b9",
          "comment": "炮八进七。"
        },
        {
          "ucci": "c7c2",
          "comment": "前炮进5。"
        },
        {
          "ucci": "a0a2",
          "comment": "车九进二。"
        },
        {
          "ucci": "c2g2",
          "comment": "前炮平7。"
        },
        {
          "ucci": "e2e6",
          "comment": "炮五进四。"
        },
        {
          "ucci": "g2g1",
          "comment": "炮7进1。"
        },
        {
          "ucci": "a2d2",
          "comment": "车九平六。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-16",
  "kind": "opening",
  "title": "橘中秘 · 让先-顺炮直车卧槽马007",
  "subtitle": "《橘中秘》让先-顺炮直车卧槽马007",
  "level": 2,
  "order": 19,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》让先-顺炮直车卧槽马007",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69091/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "h0h6",
          "comment": "车二进六。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "h6g6",
          "comment": "车二平三。"
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
          "ucci": "c7d5",
          "comment": "马3进4。"
        },
        {
          "ucci": "g3g4",
          "comment": "兵三进一。"
        },
        {
          "ucci": "d5c3",
          "comment": "马4进3。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "c3b1",
          "comment": "马3进2。"
        },
        {
          "ucci": "b2d2",
          "comment": "炮八平六。"
        },
        {
          "ucci": "a9a8",
          "comment": "车1进1。"
        },
        {
          "ucci": "a0a1",
          "comment": "车九进一。"
        },
        {
          "ucci": "b1d2",
          "comment": "马2退4。"
        },
        {
          "ucci": "e1d2",
          "comment": "仕五进六。"
        },
        {
          "ucci": "b7b0",
          "comment": "炮2进7。"
        },
        {
          "ucci": "e0e1",
          "comment": "帅五进一。"
        },
        {
          "ucci": "h9h1",
          "comment": "车8进8。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-17",
  "kind": "opening",
  "title": "橘中秘 · 顺炮横车破直车弃马001",
  "subtitle": "《橘中秘》顺炮横车破直车弃马001",
  "level": 2,
  "order": 20,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》顺炮横车破直车弃马001",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69075/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "i0i1",
          "comment": "车一进一。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "i1d1",
          "comment": "车一平六。"
        },
        {
          "ucci": "h9h3",
          "comment": "车8进6。"
        },
        {
          "ucci": "d1d8",
          "comment": "车六进七。"
        },
        {
          "ucci": "b9a7",
          "comment": "马2进1。"
        },
        {
          "ucci": "a0a1",
          "comment": "车九进一。"
        },
        {
          "ucci": "b7b0",
          "comment": "炮2进7。"
        },
        {
          "ucci": "b2b7",
          "comment": "炮八进五。"
        },
        {
          "ucci": "g7h9",
          "comment": "马7退8。"
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
          "ucci": "a1d1",
          "comment": "车九平六。"
        },
        {
          "ucci": "e9f9",
          "comment": "将5平6。"
        },
        {
          "ucci": "d8d9",
          "comment": "前车进一。"
        },
        {
          "ucci": "e8d9",
          "comment": "士5退4。"
        },
        {
          "ucci": "d1f1",
          "comment": "车六平四。"
        },
        {
          "ucci": "e7f7",
          "comment": "炮5平6。"
        },
        {
          "ucci": "f1f7",
          "comment": "车四进六。"
        },
        {
          "ucci": "f9e9",
          "comment": "将6平5。"
        },
        {
          "ucci": "b7e7",
          "comment": "炮八平五。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-18",
  "kind": "opening",
  "title": "橘中秘 · 顺炮直车左炮巡河破横车夹马011",
  "subtitle": "《橘中秘》顺炮直车左炮巡河破横车夹马011",
  "level": 2,
  "order": 21,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》顺炮直车左炮巡河破横车夹马011",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69080/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "d8d1",
          "comment": "车4进7。"
        },
        {
          "ucci": "b0c2",
          "comment": "马八进七。"
        },
        {
          "ucci": "d1c1",
          "comment": "车4平3。"
        },
        {
          "ucci": "b2b4",
          "comment": "炮八进二。"
        },
        {
          "ucci": "b9a7",
          "comment": "马2进1。"
        },
        {
          "ucci": "g2e1",
          "comment": "马三退五。"
        },
        {
          "ucci": "b7c7",
          "comment": "炮2平3。"
        },
        {
          "ucci": "b4g4",
          "comment": "炮八平三。"
        },
        {
          "ucci": "g7i8",
          "comment": "马7退9。"
        },
        {
          "ucci": "e2h2",
          "comment": "炮五平二。"
        },
        {
          "ucci": "c1d1",
          "comment": "车3平4。"
        },
        {
          "ucci": "h2h8",
          "comment": "炮二进六。"
        },
        {
          "ucci": "f9e8",
          "comment": "士6进5。"
        },
        {
          "ucci": "g4g9",
          "comment": "炮三进五。"
        },
        {
          "ucci": "e9f9",
          "comment": "将5平6。"
        },
        {
          "ucci": "g6g8",
          "comment": "车三进二。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-19",
  "kind": "opening",
  "title": "橘中秘 · 让先-大列手炮局008",
  "subtitle": "《橘中秘》让先-大列手炮局008",
  "level": 2,
  "order": 22,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》让先-大列手炮局008",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69084/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "b7e7",
          "comment": "炮2平5。"
        },
        {
          "ucci": "h0g2",
          "comment": "马二进三。"
        },
        {
          "ucci": "h9i7",
          "comment": "马8进9。"
        },
        {
          "ucci": "i0h0",
          "comment": "车一平二。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "a0b0",
          "comment": "车九平八。"
        },
        {
          "ucci": "a9b9",
          "comment": "车1平2。"
        },
        {
          "ucci": "a3a4",
          "comment": "兵九进一。"
        },
        {
          "ucci": "i6i5",
          "comment": "卒9进1。"
        },
        {
          "ucci": "h0h4",
          "comment": "车二进四。"
        },
        {
          "ucci": "b9b5",
          "comment": "车2进4。"
        },
        {
          "ucci": "a2b4",
          "comment": "马九进八。"
        },
        {
          "ucci": "b5f5",
          "comment": "车2平6。"
        },
        {
          "ucci": "h4d4",
          "comment": "车二平六。"
        },
        {
          "ucci": "h7h0",
          "comment": "炮8进7。"
        },
        {
          "ucci": "g2h0",
          "comment": "马三退二。"
        },
        {
          "ucci": "h9h1",
          "comment": "车8进8。"
        },
        {
          "ucci": "b4d5",
          "comment": "马八进六。"
        },
        {
          "ucci": "e7h7",
          "comment": "炮5平8。"
        },
        {
          "ucci": "d5c7",
          "comment": "马六进七。"
        },
        {
          "ucci": "f5f0",
          "comment": "车6进5。"
        },
        {
          "ucci": "e0f0",
          "comment": "帅五平四。"
        },
        {
          "ucci": "h7h0",
          "comment": "炮8进7。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-20",
  "kind": "opening",
  "title": "橘中秘 · 列炮破补士角炮019",
  "subtitle": "《橘中秘》列炮破补士角炮019",
  "level": 2,
  "order": 23,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》列炮破补士角炮019",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69063/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "b7e7",
          "comment": "炮2平5。"
        },
        {
          "ucci": "h0g2",
          "comment": "马二进三。"
        },
        {
          "ucci": "h9i7",
          "comment": "马8进9。"
        },
        {
          "ucci": "i0h0",
          "comment": "车一平二。"
        },
        {
          "ucci": "h7f7",
          "comment": "炮8平6。"
        },
        {
          "ucci": "h0h8",
          "comment": "车二进八。"
        },
        {
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "h8f8",
          "comment": "车二平四。"
        },
        {
          "ucci": "f9e8",
          "comment": "士6进5。"
        },
        {
          "ucci": "c3c4",
          "comment": "兵七进一。"
        },
        {
          "ucci": "a9b9",
          "comment": "车1平2。"
        },
        {
          "ucci": "b0c2",
          "comment": "马八进七。"
        },
        {
          "ucci": "b9b3",
          "comment": "车2进6。"
        },
        {
          "ucci": "a0b0",
          "comment": "车九平八。"
        },
        {
          "ucci": "b3c3",
          "comment": "车2平3。"
        },
        {
          "ucci": "b2b9",
          "comment": "炮八进七。"
        },
        {
          "ucci": "c3c2",
          "comment": "车3进1。"
        },
        {
          "ucci": "b9a9",
          "comment": "炮八平九。"
        },
        {
          "ucci": "g6g5",
          "comment": "卒7进1。"
        },
        {
          "ucci": "b0b9",
          "comment": "车八进九。"
        },
        {
          "ucci": "e8f9",
          "comment": "士5退6。"
        },
        {
          "ucci": "a9c9",
          "comment": "炮九平七。"
        },
        {
          "ucci": "d9e8",
          "comment": "士4进5。"
        },
        {
          "ucci": "c9c8",
          "comment": "炮七退一。"
        },
        {
          "ucci": "e8d9",
          "comment": "士5退4。"
        },
        {
          "ucci": "f8d8",
          "comment": "车四平六。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-21",
  "kind": "opening",
  "title": "橘中秘 · 顺炮窝心横车破士角炮008",
  "subtitle": "《橘中秘》顺炮窝心横车破士角炮008",
  "level": 2,
  "order": 24,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》顺炮窝心横车破士角炮008",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69081/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "i0i1",
          "comment": "车一进一。"
        },
        {
          "ucci": "b7d7",
          "comment": "炮2平4。"
        },
        {
          "ucci": "i1d1",
          "comment": "车一平六。"
        },
        {
          "ucci": "d9e8",
          "comment": "士4进5。"
        },
        {
          "ucci": "e2e1",
          "comment": "炮五退一。"
        },
        {
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "b2e2",
          "comment": "炮八平五。"
        },
        {
          "ucci": "a9b9",
          "comment": "车1平2。"
        },
        {
          "ucci": "b0c2",
          "comment": "马八进七。"
        },
        {
          "ucci": "b9b3",
          "comment": "车2进6。"
        },
        {
          "ucci": "e3e4",
          "comment": "兵五进一。"
        },
        {
          "ucci": "b3c3",
          "comment": "车2平3。"
        },
        {
          "ucci": "c2e3",
          "comment": "马七进五。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "e4e5",
          "comment": "兵五进一。"
        },
        {
          "ucci": "e6e5",
          "comment": "卒5进1。"
        },
        {
          "ucci": "e2e5",
          "comment": "前炮进三。"
        },
        {
          "ucci": "d7d9",
          "comment": "炮4退2。"
        },
        {
          "ucci": "d1d7",
          "comment": "车六进六。"
        },
        {
          "ucci": "g7e6",
          "comment": "马7进5。"
        },
        {
          "ucci": "e5e7",
          "comment": "前炮进二。"
        },
        {
          "ucci": "e8d7",
          "comment": "士5进4。"
        },
        {
          "ucci": "e1e6",
          "comment": "后炮进五。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-22",
  "kind": "opening",
  "title": "橘中秘 · 让先-小列手破大列手炮局009",
  "subtitle": "《橘中秘》让先-小列手破大列手炮局009",
  "level": 2,
  "order": 25,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》让先-小列手破大列手炮局009",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69086/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "b7e7",
          "comment": "炮2平5。"
        },
        {
          "ucci": "h0g2",
          "comment": "马二进三。"
        },
        {
          "ucci": "h9i7",
          "comment": "马8进9。"
        },
        {
          "ucci": "i0h0",
          "comment": "车一平二。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "h0h6",
          "comment": "车二进六。"
        },
        {
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "a9b9",
          "comment": "车1平2。"
        },
        {
          "ucci": "a0b0",
          "comment": "车九平八。"
        },
        {
          "ucci": "b9b5",
          "comment": "车2进4。"
        },
        {
          "ucci": "b2d2",
          "comment": "炮八平六。"
        },
        {
          "ucci": "b5f5",
          "comment": "车2平6。"
        },
        {
          "ucci": "b0b6",
          "comment": "车八进六。"
        },
        {
          "ucci": "e7f7",
          "comment": "炮5平6。"
        },
        {
          "ucci": "a3a4",
          "comment": "兵九进一。"
        },
        {
          "ucci": "f7f6",
          "comment": "炮6进1。"
        },
        {
          "ucci": "h6g6",
          "comment": "车二平三。"
        },
        {
          "ucci": "h7h0",
          "comment": "炮8进7。"
        },
        {
          "ucci": "g6g7",
          "comment": "车三进一。"
        },
        {
          "ucci": "f6g6",
          "comment": "炮6平7。"
        },
        {
          "ucci": "g7c7",
          "comment": "车三平七。"
        },
        {
          "ucci": "f5f0",
          "comment": "车6进5。"
        },
        {
          "ucci": "g2f0",
          "comment": "马三退四。"
        },
        {
          "ucci": "g6g0",
          "comment": "炮7进6。"
        },
        {
          "ucci": "e0e1",
          "comment": "帅五进一。"
        },
        {
          "ucci": "h9h1",
          "comment": "车8进8。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-23",
  "kind": "opening",
  "title": "橘中秘 · 让先-顺炮横车破直车沉炮003",
  "subtitle": "《橘中秘》让先-顺炮横车破直车沉炮003",
  "level": 2,
  "order": 26,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》让先-顺炮横车破直车沉炮003",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69090/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "i9i8",
          "comment": "车9进1。"
        },
        {
          "ucci": "i0h0",
          "comment": "车一平二。"
        },
        {
          "ucci": "h9g7",
          "comment": "马8进7。"
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
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "f0e1",
          "comment": "仕四进五。"
        },
        {
          "ucci": "e7e8",
          "comment": "炮5退1。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "c6c5",
          "comment": "卒3进1。"
        },
        {
          "ucci": "b2d2",
          "comment": "炮八平六。"
        },
        {
          "ucci": "d8d7",
          "comment": "车4进1。"
        },
        {
          "ucci": "a0b0",
          "comment": "车九平八。"
        },
        {
          "ucci": "a9b9",
          "comment": "车1平2。"
        },
        {
          "ucci": "b0b4",
          "comment": "车八进四。"
        },
        {
          "ucci": "c5c4",
          "comment": "卒3进1。"
        },
        {
          "ucci": "b4c4",
          "comment": "车八平七。"
        },
        {
          "ucci": "e8g8",
          "comment": "炮5平7。"
        },
        {
          "ucci": "g6h6",
          "comment": "车三平二。"
        },
        {
          "ucci": "g8c8",
          "comment": "炮7平3。"
        },
        {
          "ucci": "c4g4",
          "comment": "车七平三。"
        },
        {
          "ucci": "c7b5",
          "comment": "马3进2。"
        },
        {
          "ucci": "g4c4",
          "comment": "车三平七。"
        },
        {
          "ucci": "b7c7",
          "comment": "炮2平3。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-24",
  "kind": "opening",
  "title": "橘中秘 · 顺炮横车破直车用马004",
  "subtitle": "《橘中秘》顺炮横车破直车用马004",
  "level": 2,
  "order": 27,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》顺炮横车破直车用马004",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69076/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "i0i1",
          "comment": "车一进一。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "i1d1",
          "comment": "车一平六。"
        },
        {
          "ucci": "d9e8",
          "comment": "士4进5。"
        },
        {
          "ucci": "d1d8",
          "comment": "车六进七。"
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
          "ucci": "h9h3",
          "comment": "车8进6。"
        },
        {
          "ucci": "b0c2",
          "comment": "马八进七。"
        },
        {
          "ucci": "h3g3",
          "comment": "车8平7。"
        },
        {
          "ucci": "c2d4",
          "comment": "马七进六。"
        },
        {
          "ucci": "g6g5",
          "comment": "卒7进1。"
        },
        {
          "ucci": "d4c6",
          "comment": "马六进七。"
        },
        {
          "ucci": "b7d7",
          "comment": "炮2平4。"
        },
        {
          "ucci": "c6e7",
          "comment": "马七进五。"
        },
        {
          "ucci": "g9e7",
          "comment": "象7进5。"
        },
        {
          "ucci": "b2b7",
          "comment": "炮八进五。"
        },
        {
          "ucci": "g7f5",
          "comment": "马7进6。"
        },
        {
          "ucci": "e2e6",
          "comment": "炮五进四。"
        },
        {
          "ucci": "g3g2",
          "comment": "车7进1。"
        },
        {
          "ucci": "e6g6",
          "comment": "炮五平三。"
        },
        {
          "ucci": "g2b2",
          "comment": "车7平2。"
        },
        {
          "ucci": "b7e7",
          "comment": "炮八平五。"
        },
        {
          "ucci": "f5e7",
          "comment": "马6退5。"
        },
        {
          "ucci": "g6g9",
          "comment": "炮三进三。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-25",
  "kind": "opening",
  "title": "橘中秘 · 列炮破敛炮018",
  "subtitle": "《橘中秘》列炮破敛炮018",
  "level": 2,
  "order": 28,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》列炮破敛炮018",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69062/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "b7e7",
          "comment": "炮2平5。"
        },
        {
          "ucci": "h0g2",
          "comment": "马二进三。"
        },
        {
          "ucci": "h9i7",
          "comment": "马8进9。"
        },
        {
          "ucci": "i0h0",
          "comment": "车一平二。"
        },
        {
          "ucci": "h7g7",
          "comment": "炮8平7。"
        },
        {
          "ucci": "h0h8",
          "comment": "车二进八。"
        },
        {
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "c3c4",
          "comment": "兵七进一。"
        },
        {
          "ucci": "a9b9",
          "comment": "车1平2。"
        },
        {
          "ucci": "b0c2",
          "comment": "马八进七。"
        },
        {
          "ucci": "b9b3",
          "comment": "车2进6。"
        },
        {
          "ucci": "a0b0",
          "comment": "车九平八。"
        },
        {
          "ucci": "b3c3",
          "comment": "车2平3。"
        },
        {
          "ucci": "b2b9",
          "comment": "炮八进七。"
        },
        {
          "ucci": "c7b9",
          "comment": "马3退2。"
        },
        {
          "ucci": "b0b9",
          "comment": "车八进九。"
        },
        {
          "ucci": "c3c2",
          "comment": "车3进1。"
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
          "ucci": "h8e8",
          "comment": "车二平五。"
        },
        {
          "ucci": "e9f9",
          "comment": "将5平6。"
        },
        {
          "ucci": "b9c9",
          "comment": "车八平七。"
        },
        {
          "ucci": "c2d2",
          "comment": "车3平4。"
        },
        {
          "ucci": "e8e9",
          "comment": "车五进一。"
        },
        {
          "ucci": "f9f8",
          "comment": "将6进1。"
        },
        {
          "ucci": "e9e7",
          "comment": "车五退二。"
        },
        {
          "ucci": "d9e8",
          "comment": "士4进5。"
        },
        {
          "ucci": "c9c8",
          "comment": "车七退一。"
        },
        {
          "ucci": "g7g8",
          "comment": "炮7退1。"
        },
        {
          "ucci": "e6e8",
          "comment": "炮五进二。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-26",
  "kind": "opening",
  "title": "橘中秘 · 让先-列手炮兑车压马010",
  "subtitle": "《橘中秘》让先-列手炮兑车压马010",
  "level": 2,
  "order": 29,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》让先-列手炮兑车压马010",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69083/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "b7e7",
          "comment": "炮2平5。"
        },
        {
          "ucci": "h0g2",
          "comment": "马二进三。"
        },
        {
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "i0h0",
          "comment": "车一平二。"
        },
        {
          "ucci": "h7g7",
          "comment": "炮8平7。"
        },
        {
          "ucci": "h0h8",
          "comment": "车二进八。"
        },
        {
          "ucci": "a9a8",
          "comment": "车1进1。"
        },
        {
          "ucci": "b2b8",
          "comment": "炮八进六。"
        },
        {
          "ucci": "e7e8",
          "comment": "炮5退1。"
        },
        {
          "ucci": "b8b4",
          "comment": "炮八退四。"
        },
        {
          "ucci": "e8e3",
          "comment": "炮5进5。"
        },
        {
          "ucci": "e2e6",
          "comment": "炮五进四。"
        },
        {
          "ucci": "e3e5",
          "comment": "炮5退2。"
        },
        {
          "ucci": "h8a8",
          "comment": "车二平九。"
        },
        {
          "ucci": "c7a8",
          "comment": "马3退1。"
        },
        {
          "ucci": "a0a1",
          "comment": "车九进一。"
        },
        {
          "ucci": "a8c7",
          "comment": "马1进3。"
        },
        {
          "ucci": "b4b6",
          "comment": "炮八进二。"
        },
        {
          "ucci": "c6c5",
          "comment": "卒3进1。"
        },
        {
          "ucci": "a1d1",
          "comment": "车九平六。"
        },
        {
          "ucci": "c7e6",
          "comment": "马3进5。"
        },
        {
          "ucci": "d1d6",
          "comment": "车六进五。"
        },
        {
          "ucci": "e6g5",
          "comment": "马5进7。"
        },
        {
          "ucci": "b6g6",
          "comment": "炮八平三。"
        },
        {
          "ucci": "g7e7",
          "comment": "炮7平5。"
        },
        {
          "ucci": "g6e6",
          "comment": "炮三平五。"
        },
        {
          "ucci": "g5e6",
          "comment": "马7退5。"
        },
        {
          "ucci": "d6e6",
          "comment": "车六平五。"
        },
        {
          "ucci": "h9g7",
          "comment": "马8进7。"
        },
        {
          "ucci": "e6e7",
          "comment": "车五进一。"
        },
        {
          "ucci": "g9e7",
          "comment": "象7进5。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-27",
  "kind": "opening",
  "title": "橘中秘 · 让先-屏风马破当头炮012",
  "subtitle": "《橘中秘》让先-屏风马破当头炮012",
  "level": 2,
  "order": 30,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》让先-屏风马破当头炮012",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69087/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
        },
        {
          "ucci": "f0e1",
          "comment": "仕四进五。"
        },
        {
          "ucci": "g0i0",
          "comment": "炮7平9。"
        },
        {
          "ucci": "d6d5",
          "comment": "车六退一。"
        },
        {
          "ucci": "h9h0",
          "comment": "车8进9。"
        },
        {
          "ucci": "e1f0",
          "comment": "仕五退四。"
        },
        {
          "ucci": "h0h5",
          "comment": "车8退5。"
        },
        {
          "ucci": "f0e1",
          "comment": "仕四进五。"
        },
        {
          "ucci": "b7b5",
          "comment": "炮2进2。"
        },
        {
          "ucci": "d5c5",
          "comment": "车六平七。"
        },
        {
          "ucci": "b5e5",
          "comment": "炮2平5。"
        },
        {
          "ucci": "c5e5",
          "comment": "车七平五。"
        },
        {
          "ucci": "h5e5",
          "comment": "车8平5。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-28",
  "kind": "opening",
  "title": "橘中秘 · 让先-顺炮横车破直车夺先001",
  "subtitle": "《橘中秘》让先-顺炮横车破直车夺先001",
  "level": 2,
  "order": 31,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》让先-顺炮横车破直车夺先001",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69088/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "d8d1",
          "comment": "车4进7。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "a6a5",
          "comment": "卒1进1。"
        },
        {
          "ucci": "f0e1",
          "comment": "仕四进五。"
        },
        {
          "ucci": "b9a7",
          "comment": "马2进1。"
        },
        {
          "ucci": "b2d2",
          "comment": "炮八平六。"
        },
        {
          "ucci": "a7b5",
          "comment": "马1进2。"
        },
        {
          "ucci": "g3g4",
          "comment": "兵三进一。"
        },
        {
          "ucci": "a9a8",
          "comment": "车1进1。"
        },
        {
          "ucci": "g4g5",
          "comment": "兵三进一。"
        },
        {
          "ucci": "a8f8",
          "comment": "车1平6。"
        },
        {
          "ucci": "g6h6",
          "comment": "车三平二。"
        },
        {
          "ucci": "f8f1",
          "comment": "车6进7。"
        },
        {
          "ucci": "g5g6",
          "comment": "兵三进一。"
        },
        {
          "ucci": "b5d4",
          "comment": "马2进4。"
        },
        {
          "ucci": "e2f2",
          "comment": "炮五平四。"
        },
        {
          "ucci": "e7e3",
          "comment": "炮5进4。"
        },
        {
          "ucci": "f2e2",
          "comment": "炮四平五。"
        },
        {
          "ucci": "b7b2",
          "comment": "炮2进5。"
        },
        {
          "ucci": "d2d9",
          "comment": "炮六进七。"
        },
        {
          "ucci": "d4c2",
          "comment": "马4进3。"
        },
        {
          "ucci": "g2e3",
          "comment": "马三进五。"
        },
        {
          "ucci": "b2e2",
          "comment": "炮2平5。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-29",
  "kind": "opening",
  "title": "橘中秘 · 顺炮横车破直车用马005",
  "subtitle": "《橘中秘》顺炮横车破直车用马005",
  "level": 2,
  "order": 32,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》顺炮横车破直车用马005",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69077/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "i0i1",
          "comment": "车一进一。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "i1d1",
          "comment": "车一平六。"
        },
        {
          "ucci": "d9e8",
          "comment": "士4进5。"
        },
        {
          "ucci": "d1d8",
          "comment": "车六进七。"
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
          "ucci": "h9h3",
          "comment": "车8进6。"
        },
        {
          "ucci": "b0c2",
          "comment": "马八进七。"
        },
        {
          "ucci": "h3g3",
          "comment": "车8平7。"
        },
        {
          "ucci": "c2d4",
          "comment": "马七进六。"
        },
        {
          "ucci": "g6g5",
          "comment": "卒7进1。"
        },
        {
          "ucci": "a3a4",
          "comment": "兵九进一。"
        },
        {
          "ucci": "g5g4",
          "comment": "卒7进1。"
        },
        {
          "ucci": "a4a5",
          "comment": "兵九进一。"
        },
        {
          "ucci": "a6a5",
          "comment": "卒1进1。"
        },
        {
          "ucci": "a0a5",
          "comment": "车九进五。"
        },
        {
          "ucci": "b7c7",
          "comment": "炮2平3。"
        },
        {
          "ucci": "d8b8",
          "comment": "车六平八。"
        },
        {
          "ucci": "g4f4",
          "comment": "卒7平6。"
        },
        {
          "ucci": "d4e6",
          "comment": "马六进五。"
        },
        {
          "ucci": "g7e6",
          "comment": "马7进5。"
        },
        {
          "ucci": "e2e6",
          "comment": "炮五进四。"
        },
        {
          "ucci": "g3g2",
          "comment": "车7进1。"
        },
        {
          "ucci": "a5a7",
          "comment": "车九进二。"
        },
        {
          "ucci": "a9a7",
          "comment": "车1进2。"
        },
        {
          "ucci": "b8e8",
          "comment": "车八平五。"
        },
        {
          "ucci": "f9e8",
          "comment": "士6进5。"
        },
        {
          "ucci": "b2b9",
          "comment": "炮八进七。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-30",
  "kind": "opening",
  "title": "橘中秘 · 让先-中炮破士象转角马局013",
  "subtitle": "《橘中秘》让先-中炮破士象转角马局013",
  "level": 2,
  "order": 33,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》让先-中炮破士象转角马局013",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69082/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "g0e2",
          "comment": "相三进五。"
        },
        {
          "ucci": "h7e7",
          "comment": "炮8平5。"
        },
        {
          "ucci": "h0f1",
          "comment": "马二进四。"
        },
        {
          "ucci": "h9g7",
          "comment": "马8进7。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "e6e5",
          "comment": "卒5进1。"
        },
        {
          "ucci": "f1d2",
          "comment": "马四进六。"
        },
        {
          "ucci": "e7e3",
          "comment": "炮5进4。"
        },
        {
          "ucci": "f0e1",
          "comment": "仕四进五。"
        },
        {
          "ucci": "e3d3",
          "comment": "炮5平4。"
        },
        {
          "ucci": "i0f0",
          "comment": "车一平四。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "h2g2",
          "comment": "炮二平三。"
        },
        {
          "ucci": "b7e7",
          "comment": "炮2平5。"
        },
        {
          "ucci": "a0b0",
          "comment": "车九平八。"
        },
        {
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "f0f4",
          "comment": "车四进四。"
        },
        {
          "ucci": "e5e4",
          "comment": "卒5进1。"
        },
        {
          "ucci": "f4e4",
          "comment": "车四平五。"
        },
        {
          "ucci": "h9h0",
          "comment": "车8进9。"
        },
        {
          "ucci": "g2g0",
          "comment": "炮三退二。"
        },
        {
          "ucci": "c7e6",
          "comment": "马3进5。"
        },
        {
          "ucci": "e4b4",
          "comment": "车五平八。"
        },
        {
          "ucci": "d3i3",
          "comment": "炮4平9。"
        },
        {
          "ucci": "g0f0",
          "comment": "炮三平四。"
        },
        {
          "ucci": "i3i0",
          "comment": "炮9进3。"
        },
        {
          "ucci": "b4b8",
          "comment": "前车进四。"
        },
        {
          "ucci": "e6f4",
          "comment": "马5进6。"
        },
        {
          "ucci": "d2e4",
          "comment": "马六进五。"
        },
        {
          "ucci": "e7e2",
          "comment": "炮5进5。"
        },
        {
          "ucci": "c0e2",
          "comment": "相七进五。"
        },
        {
          "ucci": "f4e2",
          "comment": "马6进5。"
        },
        {
          "ucci": "e1f2",
          "comment": "仕五进四。"
        },
        {
          "ucci": "e2f0",
          "comment": "马5进6。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-31",
  "kind": "opening",
  "title": "橘中秘 · 大列手炮局016",
  "subtitle": "《橘中秘》大列手炮局016",
  "level": 2,
  "order": 34,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》大列手炮局016",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69068/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "b7e7",
          "comment": "炮2平5。"
        },
        {
          "ucci": "h0g2",
          "comment": "马二进三。"
        },
        {
          "ucci": "h9i7",
          "comment": "马8进9。"
        },
        {
          "ucci": "i0h0",
          "comment": "车一平二。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "a0b0",
          "comment": "车九平八。"
        },
        {
          "ucci": "a9b9",
          "comment": "车1平2。"
        },
        {
          "ucci": "a3a4",
          "comment": "兵九进一。"
        },
        {
          "ucci": "i6i5",
          "comment": "卒9进1。"
        },
        {
          "ucci": "h0h4",
          "comment": "车二进四。"
        },
        {
          "ucci": "b9b5",
          "comment": "车2进4。"
        },
        {
          "ucci": "a2b4",
          "comment": "马九进八。"
        },
        {
          "ucci": "b5f5",
          "comment": "车2平6。"
        },
        {
          "ucci": "h4d4",
          "comment": "车二平六。"
        },
        {
          "ucci": "i7h5",
          "comment": "马9进8。"
        },
        {
          "ucci": "b4d5",
          "comment": "马八进六。"
        },
        {
          "ucci": "c6c5",
          "comment": "卒3进1。"
        },
        {
          "ucci": "d5c7",
          "comment": "马六进七。"
        },
        {
          "ucci": "h7c7",
          "comment": "炮8平3。"
        },
        {
          "ucci": "b2b9",
          "comment": "炮八进七。"
        },
        {
          "ucci": "f9e8",
          "comment": "士6进5。"
        },
        {
          "ucci": "e2e6",
          "comment": "炮五进四。"
        },
        {
          "ucci": "e9f9",
          "comment": "将5平6。"
        },
        {
          "ucci": "b0b8",
          "comment": "车八进八。"
        },
        {
          "ucci": "h9h8",
          "comment": "车8进1。"
        },
        {
          "ucci": "b8e8",
          "comment": "车八平五。"
        },
        {
          "ucci": "h8e8",
          "comment": "车8平5。"
        },
        {
          "ucci": "d4d9",
          "comment": "车六进五。"
        },
        {
          "ucci": "e8e9",
          "comment": "车5退1。"
        },
        {
          "ucci": "d9e9",
          "comment": "车六平五。"
        },
        {
          "ucci": "f9f8",
          "comment": "将6进1。"
        },
        {
          "ucci": "e9f9",
          "comment": "车五平四。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-32",
  "kind": "opening",
  "title": "橘中秘 · 让先-顺炮横车破直车弃马002",
  "subtitle": "《橘中秘》让先-顺炮横车破直车弃马002",
  "level": 2,
  "order": 35,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》让先-顺炮横车破直车弃马002",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69089/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "d8d1",
          "comment": "车4进7。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "a9a8",
          "comment": "车1进1。"
        },
        {
          "ucci": "b2b9",
          "comment": "炮八进七。"
        },
        {
          "ucci": "b7b2",
          "comment": "炮2进5。"
        },
        {
          "ucci": "g6g7",
          "comment": "车三进一。"
        },
        {
          "ucci": "b2g2",
          "comment": "炮2平7。"
        },
        {
          "ucci": "g7h7",
          "comment": "车三平二。"
        },
        {
          "ucci": "d1g1",
          "comment": "车4平7。"
        },
        {
          "ucci": "g0i2",
          "comment": "相三进一。"
        },
        {
          "ucci": "e7e3",
          "comment": "炮5进4。"
        },
        {
          "ucci": "f0e1",
          "comment": "仕四进五。"
        },
        {
          "ucci": "g1i1",
          "comment": "车7平9。"
        },
        {
          "ucci": "h7h0",
          "comment": "车二退七。"
        },
        {
          "ucci": "a8h8",
          "comment": "车1平8。"
        },
        {
          "ucci": "h0f0",
          "comment": "车二平四。"
        },
        {
          "ucci": "g2h2",
          "comment": "炮7平8。"
        },
        {
          "ucci": "a0b0",
          "comment": "车九平八。"
        },
        {
          "ucci": "h2h0",
          "comment": "炮8进2。"
        },
        {
          "ucci": "f0f3",
          "comment": "车四进三。"
        },
        {
          "ucci": "h0i0",
          "comment": "炮8平9。"
        },
        {
          "ucci": "f3e3",
          "comment": "车四平五。"
        },
        {
          "ucci": "h8h0",
          "comment": "车8进8。"
        },
        {
          "ucci": "e1f0",
          "comment": "仕五退四。"
        },
        {
          "ucci": "i1e1",
          "comment": "车9平5。"
        },
        {
          "ucci": "e0e1",
          "comment": "帅五进一。"
        },
        {
          "ucci": "h0h1",
          "comment": "车8退1。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-33",
  "kind": "opening",
  "title": "橘中秘 · 顺炮横车破背补士角炮006",
  "subtitle": "《橘中秘》顺炮横车破背补士角炮006",
  "level": 2,
  "order": 36,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》顺炮横车破背补士角炮006",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69078/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "i0i1",
          "comment": "车一进一。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "i1d1",
          "comment": "车一平六。"
        },
        {
          "ucci": "f9e8",
          "comment": "士6进5。"
        },
        {
          "ucci": "d1d8",
          "comment": "车六进七。"
        },
        {
          "ucci": "b9a7",
          "comment": "马2进1。"
        },
        {
          "ucci": "a3a4",
          "comment": "兵九进一。"
        },
        {
          "ucci": "h9h3",
          "comment": "车8进6。"
        },
        {
          "ucci": "b0a2",
          "comment": "马八进九。"
        },
        {
          "ucci": "h3g3",
          "comment": "车8平7。"
        },
        {
          "ucci": "a0a1",
          "comment": "车九进一。"
        },
        {
          "ucci": "b7d7",
          "comment": "炮2平4。"
        },
        {
          "ucci": "a2b4",
          "comment": "马九进八。"
        },
        {
          "ucci": "g3g4",
          "comment": "车7退1。"
        },
        {
          "ucci": "b4d5",
          "comment": "马八进六。"
        },
        {
          "ucci": "a9b9",
          "comment": "车1平2。"
        },
        {
          "ucci": "d5f6",
          "comment": "马六进四。"
        },
        {
          "ucci": "g4g3",
          "comment": "车7进1。"
        },
        {
          "ucci": "f6g8",
          "comment": "马四进三。"
        },
        {
          "ucci": "e9f9",
          "comment": "将5平6。"
        },
        {
          "ucci": "a1f1",
          "comment": "车九平四。"
        },
        {
          "ucci": "e7f7",
          "comment": "炮5平6。"
        },
        {
          "ucci": "b2b8",
          "comment": "炮八进六。"
        },
        {
          "ucci": "f7f8",
          "comment": "炮6退1。"
        },
        {
          "ucci": "d8e8",
          "comment": "车六平五。"
        },
        {
          "ucci": "d9e8",
          "comment": "士4进5。"
        },
        {
          "ucci": "f1f8",
          "comment": "车四进七。"
        },
        {
          "ucci": "f9e9",
          "comment": "将6平5。"
        },
        {
          "ucci": "f8f5",
          "comment": "车四退三。"
        },
        {
          "ucci": "e9d9",
          "comment": "将5平4。"
        },
        {
          "ucci": "e2d2",
          "comment": "炮五平六。"
        },
        {
          "ucci": "d7e7",
          "comment": "炮4平5。"
        },
        {
          "ucci": "f5d5",
          "comment": "车四平六。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-34",
  "kind": "opening",
  "title": "橘中秘 · 右炮直车破右单提马士象局013",
  "subtitle": "《橘中秘》右炮直车破右单提马士象局013",
  "level": 2,
  "order": 37,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》右炮直车破右单提马士象局013",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69066/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "b9c7",
          "comment": "马2进3。"
        },
        {
          "ucci": "h0g2",
          "comment": "马二进三。"
        },
        {
          "ucci": "h9i7",
          "comment": "马8进9。"
        },
        {
          "ucci": "i0h0",
          "comment": "车一平二。"
        },
        {
          "ucci": "h7f7",
          "comment": "炮8平6。"
        },
        {
          "ucci": "e3e4",
          "comment": "兵五进一。"
        },
        {
          "ucci": "c9e7",
          "comment": "象3进5。"
        },
        {
          "ucci": "e4e5",
          "comment": "兵五进一。"
        },
        {
          "ucci": "e6e5",
          "comment": "卒5进1。"
        },
        {
          "ucci": "h0h5",
          "comment": "车二进五。"
        },
        {
          "ucci": "d9e8",
          "comment": "士4进5。"
        },
        {
          "ucci": "h5e5",
          "comment": "车二平五。"
        },
        {
          "ucci": "a9d9",
          "comment": "车1平4。"
        },
        {
          "ucci": "b0c2",
          "comment": "马八进七。"
        },
        {
          "ucci": "f7f2",
          "comment": "炮6进5。"
        },
        {
          "ucci": "b2a2",
          "comment": "炮八平九。"
        },
        {
          "ucci": "f2c2",
          "comment": "炮6平3。"
        },
        {
          "ucci": "g2e3",
          "comment": "马三进五。"
        },
        {
          "ucci": "d9d3",
          "comment": "车4进6。"
        },
        {
          "ucci": "a0b0",
          "comment": "车九平八。"
        },
        {
          "ucci": "b7a7",
          "comment": "炮2平1。"
        },
        {
          "ucci": "b0b7",
          "comment": "车八进七。"
        },
        {
          "ucci": "a7a3",
          "comment": "炮1进4。"
        },
        {
          "ucci": "e3d5",
          "comment": "马五进六。"
        },
        {
          "ucci": "c7d9",
          "comment": "马3退4。"
        },
        {
          "ucci": "a2a6",
          "comment": "炮九进四。"
        },
        {
          "ucci": "a3a0",
          "comment": "炮1进3。"
        },
        {
          "ucci": "a6a9",
          "comment": "炮九进三。"
        },
        {
          "ucci": "e7c9",
          "comment": "象5退3。"
        },
        {
          "ucci": "e5e8",
          "comment": "车五进三。"
        },
        {
          "ucci": "e9e8",
          "comment": "将5进1。"
        },
        {
          "ucci": "b7b8",
          "comment": "车八进一。"
        },
        {
          "ucci": "e8e9",
          "comment": "将5退1。"
        },
        {
          "ucci": "d5e7",
          "comment": "马六进五。"
        },
        {
          "ucci": "f9e8",
          "comment": "士6进5。"
        },
        {
          "ucci": "b8e8",
          "comment": "车八平五。"
        },
        {
          "ucci": "e9f9",
          "comment": "将5平6。"
        },
        {
          "ucci": "e8e9",
          "comment": "车五进一。"
        },
        {
          "ucci": "f9f8",
          "comment": "将6进1。"
        },
        {
          "ucci": "e9f9",
          "comment": "车五平四。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-35",
  "kind": "opening",
  "title": "橘中秘 · 顺炮横车破直车不食弃马003",
  "subtitle": "《橘中秘》顺炮横车破直车不食弃马003",
  "level": 2,
  "order": 38,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》顺炮横车破直车不食弃马003",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69073/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "i0i1",
          "comment": "车一进一。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "i1d1",
          "comment": "车一平六。"
        },
        {
          "ucci": "h9h3",
          "comment": "车8进6。"
        },
        {
          "ucci": "d1d8",
          "comment": "车六进七。"
        },
        {
          "ucci": "b9a7",
          "comment": "马2进1。"
        },
        {
          "ucci": "a0a1",
          "comment": "车九进一。"
        },
        {
          "ucci": "f9e8",
          "comment": "士6进5。"
        },
        {
          "ucci": "a1f1",
          "comment": "车九平四。"
        },
        {
          "ucci": "b7d7",
          "comment": "炮2平4。"
        },
        {
          "ucci": "f1f8",
          "comment": "车四进七。"
        },
        {
          "ucci": "a9b9",
          "comment": "车1平2。"
        },
        {
          "ucci": "b2b8",
          "comment": "炮八进六。"
        },
        {
          "ucci": "c6c5",
          "comment": "卒3进1。"
        },
        {
          "ucci": "e2b2",
          "comment": "炮五平八。"
        },
        {
          "ucci": "a7c6",
          "comment": "马1进3。"
        },
        {
          "ucci": "b2b9",
          "comment": "后炮进七。"
        },
        {
          "ucci": "c6d8",
          "comment": "马3退4。"
        },
        {
          "ucci": "b8c8",
          "comment": "后炮平七。"
        },
        {
          "ucci": "h3g3",
          "comment": "车8平7。"
        },
        {
          "ucci": "g2i1",
          "comment": "马三退一。"
        },
        {
          "ucci": "e7e3",
          "comment": "炮5进4。"
        },
        {
          "ucci": "b9b7",
          "comment": "炮八退二。"
        },
        {
          "ucci": "d7d5",
          "comment": "炮4进2。"
        },
        {
          "ucci": "e0e1",
          "comment": "帅五进一。"
        },
        {
          "ucci": "g3g1",
          "comment": "车7进2。"
        },
        {
          "ucci": "e1e2",
          "comment": "帅五进一。"
        },
        {
          "ucci": "g1i1",
          "comment": "车7平9。"
        },
        {
          "ucci": "b7c7",
          "comment": "炮八平七。"
        },
        {
          "ucci": "c9a7",
          "comment": "象3进1。"
        },
        {
          "ucci": "c8b8",
          "comment": "前炮平八。"
        },
        {
          "ucci": "e8d7",
          "comment": "士5进4。"
        },
        {
          "ucci": "f8d8",
          "comment": "车四平六。"
        },
        {
          "ucci": "d5d8",
          "comment": "炮4退3。"
        },
        {
          "ucci": "c7c9",
          "comment": "炮七进二。"
        },
        {
          "ucci": "d9e8",
          "comment": "后士进5。"
        },
        {
          "ucci": "b8b9",
          "comment": "炮八进一。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-36",
  "kind": "opening",
  "title": "橘中秘 · 顺炮直车左炮巡河破横车010",
  "subtitle": "《橘中秘》顺炮直车左炮巡河破横车010",
  "level": 2,
  "order": 39,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》顺炮直车左炮巡河破横车010",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69079/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
        },
        {
          "ucci": "a0b0",
          "comment": "车九平八。"
        },
        {
          "ucci": "b7c7",
          "comment": "炮2平3。"
        },
        {
          "ucci": "c2b4",
          "comment": "马七进八。"
        },
        {
          "ucci": "f4f2",
          "comment": "车6进2。"
        },
        {
          "ucci": "b4d5",
          "comment": "马八进六。"
        },
        {
          "ucci": "c7d7",
          "comment": "炮3平4。"
        },
        {
          "ucci": "a4g4",
          "comment": "炮九平三。"
        },
        {
          "ucci": "g7i8",
          "comment": "马7退9。"
        },
        {
          "ucci": "e2e6",
          "comment": "炮五进四。"
        },
        {
          "ucci": "d9e8",
          "comment": "士4进5。"
        },
        {
          "ucci": "b0b8",
          "comment": "车八进八。"
        },
        {
          "ucci": "a9b9",
          "comment": "车1平2。"
        },
        {
          "ucci": "b8d8",
          "comment": "车八平六。"
        },
        {
          "ucci": "b9b7",
          "comment": "车2进2。"
        },
        {
          "ucci": "g4g9",
          "comment": "炮三进五。"
        },
        {
          "ucci": "i8g9",
          "comment": "马9退7。"
        },
        {
          "ucci": "g6g9",
          "comment": "车三进三。"
        },
        {
          "ucci": "f2f8",
          "comment": "车6退6。"
        },
        {
          "ucci": "d5e7",
          "comment": "马六进五。"
        },
        {
          "ucci": "d7d5",
          "comment": "炮4进2。"
        },
        {
          "ucci": "g9f9",
          "comment": "车三平四。"
        },
        {
          "ucci": "e9f9",
          "comment": "将5平6。"
        },
        {
          "ucci": "d8d9",
          "comment": "车六进一。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
},
{
  "id": "opening-classic-37",
  "kind": "opening",
  "title": "橘中秘 · 顺炮横车破直车他先上马弃马002",
  "subtitle": "《橘中秘》顺炮横车破直车他先上马弃马002",
  "level": 2,
  "order": 40,
  "tags": [
    "古谱",
    "橘中秘",
    "开局"
  ],
  "source": {
    "name": "《橘中秘》顺炮横车破直车他先上马弃马002",
    "author": "明·朱晋桢",
    "license": "公有领域（古谱原文）",
    "url": "https://www.xqdao.com/qipu/show/69074/"
  },
  "reviewedAt": "2026-10-20",
  "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
  "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
  "userColor": "r",
  "objective": "demonstration",
  "intro": "本局录自明代《橘中秘》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
          "ucci": "i0i1",
          "comment": "车一进一。"
        },
        {
          "ucci": "i9h9",
          "comment": "车9平8。"
        },
        {
          "ucci": "i1d1",
          "comment": "车一平六。"
        },
        {
          "ucci": "b9a7",
          "comment": "马2进1。"
        },
        {
          "ucci": "d1d8",
          "comment": "车六进七。"
        },
        {
          "ucci": "a6a5",
          "comment": "卒1进1。"
        },
        {
          "ucci": "a3a4",
          "comment": "兵九进一。"
        },
        {
          "ucci": "a5a4",
          "comment": "卒1进1。"
        },
        {
          "ucci": "a0a4",
          "comment": "车九进四。"
        },
        {
          "ucci": "b7b0",
          "comment": "炮2进7。"
        },
        {
          "ucci": "b2b7",
          "comment": "炮八进五。"
        },
        {
          "ucci": "h9h7",
          "comment": "车8进2。"
        },
        {
          "ucci": "d8g8",
          "comment": "车六平三。"
        },
        {
          "ucci": "a9b9",
          "comment": "车1平2。"
        },
        {
          "ucci": "b7g7",
          "comment": "炮八平三。"
        },
        {
          "ucci": "g9i7",
          "comment": "象7进9。"
        },
        {
          "ucci": "e2e6",
          "comment": "炮五进四。"
        },
        {
          "ucci": "d9e8",
          "comment": "士4进5。"
        },
        {
          "ucci": "a4d4",
          "comment": "车九平六。"
        },
        {
          "ucci": "b9b5",
          "comment": "车2进4。"
        },
        {
          "ucci": "d4d8",
          "comment": "车六进四。"
        },
        {
          "ucci": "b5e5",
          "comment": "车2平5。"
        },
        {
          "ucci": "g7i7",
          "comment": "炮三平一。"
        },
        {
          "ucci": "h7h9",
          "comment": "车8退2。"
        },
        {
          "ucci": "g8g7",
          "comment": "车三退一。"
        },
        {
          "ucci": "e5e6",
          "comment": "车5退1。"
        },
        {
          "ucci": "i7e7",
          "comment": "炮一平五。"
        },
        {
          "ucci": "e8d9",
          "comment": "士5退4。"
        },
        {
          "ucci": "g3g4",
          "comment": "兵三进一。"
        },
        {
          "ucci": "a7b5",
          "comment": "马1进2。"
        },
        {
          "ucci": "g2f4",
          "comment": "马三进四。"
        },
        {
          "ucci": "e6e3",
          "comment": "车5进3。"
        },
        {
          "ucci": "g0e2",
          "comment": "相三进五。"
        },
        {
          "ucci": "b5c3",
          "comment": "马2进3。"
        },
        {
          "ucci": "e7e6",
          "comment": "炮五退一。"
        },
        {
          "ucci": "e3e6",
          "comment": "车5退3。"
        },
        {
          "ucci": "f4e6",
          "comment": "马四进五。"
        },
        {
          "ucci": "c3e2",
          "comment": "马3进5。"
        },
        {
          "ucci": "e6c7",
          "comment": "马五进七。"
        },
        {
          "ucci": "f9e8",
          "comment": "士6进5。"
        },
        {
          "ucci": "e0e1",
          "comment": "帅五进一。"
        }
      ]
    }
  ],
  "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
}
];
