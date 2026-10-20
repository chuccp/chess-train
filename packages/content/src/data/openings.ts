import type { GuidedLesson } from '../types';

export const openingLessons: GuidedLesson[] = [
  {
    "id": "opening-central-cannon-screen-horses",
    "kind": "opening",
    "title": "中炮对屏风马 · 直车正马",
    "subtitle": "最常用的中炮对屏风马起手",
    "level": 1,
    "order": 1,
    "tags": [
      "中炮",
      "屏风马",
      "直车"
    ],
    "source": {
      "name": "公开布局常识整理",
      "author": "棋练项目组",
      "license": "CC0-1.0"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "规则核全量校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "红方先架中炮，黑方以屏风马守中，红方再出动正马与直车。这条主线展示双方最常见、最稳妥的出动顺序。",
    "keyPoints": [
      "中炮先占中路，但不要急着冲兵",
      "屏风马先护中卒，再活通两翼",
      "红方双正马配合直车，形成堂堂正正的中炮阵势"
    ],
    "lines": [
      {
        "id": "main",
        "label": "主线 · 红方直车正马",
        "moves": [
          {
            "ucci": "h2e2",
            "comment": "炮二平五，红方架起中炮，瞄准黑方中卒。"
          },
          {
            "ucci": "h9g7",
            "comment": "马8进7，黑方跳起左正马，为屏风马护中。"
          },
          {
            "ucci": "h0g2",
            "comment": "马二进三，红方也跳正马，保护中兵并通车路。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3，黑方双马成屏风，守住中路。"
          },
          {
            "ucci": "i0h0",
            "comment": "车一平二，红方出直车，压住黑方左翼。"
          },
          {
            "ucci": "i9h9",
            "comment": "车9平8，黑方也出直车，双方进入中炮对屏风马的标准阵势。"
          }
        ]
      }
    ],
    "completionText": "主线完成。中炮对屏风马的关键不是急着进攻，而是先把双马和直车摆到能够互相支援的位置。"
  },
  {
    "id": "opening-same-direction-cannon",
    "kind": "opening",
    "title": "顺炮直车 · 对攻起手",
    "subtitle": "双方同侧架炮，局面更直接",
    "level": 1,
    "order": 2,
    "tags": [
      "顺炮",
      "直车",
      "对攻"
    ],
    "source": {
      "name": "公开布局常识整理",
      "author": "棋练项目组",
      "license": "CC0-1.0"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "规则核全量校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "红方架中炮后，黑方也在同一侧架炮，形成顺炮。顺炮局面通常比屏风马更直接，双方都要尽快出动大子。",
    "keyPoints": [
      "顺炮的火力集中，但中路也更薄",
      "红方先用正马护中，再出直车",
      "黑方起横车是顺炮中常见的反击思路"
    ],
    "lines": [
      {
        "id": "main",
        "label": "主线 · 顺炮直车对横车",
        "moves": [
          {
            "ucci": "h2e2",
            "comment": "炮二平五，红方先架中炮。"
          },
          {
            "ucci": "h7e7",
            "comment": "炮8平5，黑方同侧还架中炮，形成顺炮。"
          },
          {
            "ucci": "h0g2",
            "comment": "马二进三，红方先护中兵。"
          },
          {
            "ucci": "h9g7",
            "comment": "马8进7，黑方也跳正马。"
          },
          {
            "ucci": "i0h0",
            "comment": "车一平二，红方出直车，准备抢占要道。"
          },
          {
            "ucci": "i9i8",
            "comment": "车9进1，黑方起横车，准备从肋道反击。"
          }
        ]
      }
    ],
    "completionText": "主线完成。顺炮不是盲目对攻：先护住中兵，再把车开到能威胁对方弱点的位置。"
  },
  {
    "id": "opening-pawn-opening",
    "kind": "opening",
    "title": "仙人指路 · 先探虚实",
    "subtitle": "用一步兵先试探黑方布局",
    "level": 1,
    "order": 3,
    "tags": [
      "仙人指路",
      "兵类开局",
      "柔性布局"
    ],
    "source": {
      "name": "公开布局常识整理",
      "author": "棋练项目组",
      "license": "CC0-1.0"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "规则核全量校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "红方第一步先挺七兵，不急于架中炮。仙人指路把选择权留给自己，根据黑方的应手再决定中炮、飞相或起马。",
    "keyPoints": [
      "先挺兵可以观察黑方布局方向",
      "黑方跳马后，红方仍可回到中炮或起马体系",
      "不要为了“仙人指路”而忘记出车"
    ],
    "lines": [
      {
        "id": "main",
        "label": "主线 · 先挺七兵，再出正马",
        "moves": [
          {
            "ucci": "c3c4",
            "comment": "兵七进一，红方先挺七兵，试探黑方应手。"
          },
          {
            "ucci": "h9g7",
            "comment": "马8进7，黑方先出动左马。"
          },
          {
            "ucci": "h0g2",
            "comment": "马二进三，红方也跳正马，保持阵形弹性。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3，黑方双马出动。"
          },
          {
            "ucci": "i0h0",
            "comment": "车一平二，红方出直车，先占住二路。"
          },
          {
            "ucci": "i9h9",
            "comment": "车9平8，黑方也出直车，局面转入柔性对峙。"
          }
        ]
      }
    ],
    "completionText": "主线完成。仙人指路的价值在于保留选择；无论黑方怎么应，红方都要尽快把车和马走到有作用的位置。"
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
  },
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
    "level": 3,
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
  },
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
    "level": 3,
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
    "level": 3,
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
    "level": 3,
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
    "level": 3,
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
    "level": 3,
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
  },
  {
    "id": "opening-classic-38",
    "kind": "opening",
    "title": "梅花谱 · 第7局飞象进马破过河车边马",
    "subtitle": "《梅花谱》第7局飞象进马破过河车边马",
    "level": 2,
    "order": 41,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第7局飞象进马破过河车边马",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64452/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b2e2",
            "comment": "炮八平五。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
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
            "ucci": "b0b6",
            "comment": "车八进六。"
          },
          {
            "ucci": "h9g7",
            "comment": "马8进7。"
          },
          {
            "ucci": "h0i2",
            "comment": "马二进一。"
          },
          {
            "ucci": "g9e7",
            "comment": "象7进5。"
          },
          {
            "ucci": "b6c6",
            "comment": "车八平七。"
          },
          {
            "ucci": "g7f5",
            "comment": "马7进6。"
          },
          {
            "ucci": "c3c4",
            "comment": "兵七进一。"
          },
          {
            "ucci": "b7b3",
            "comment": "炮2进4。"
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
            "ucci": "b3c3",
            "comment": "炮2平3。"
          },
          {
            "ucci": "c6f6",
            "comment": "车七平四。"
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
            "ucci": "f6f5",
            "comment": "车四退一。"
          },
          {
            "ucci": "h7h5",
            "comment": "炮8进2。"
          },
          {
            "ucci": "f5g5",
            "comment": "车四平三。"
          },
          {
            "ucci": "h5e5",
            "comment": "炮8平5。"
          },
          {
            "ucci": "g5g4",
            "comment": "车三退一。"
          },
          {
            "ucci": "b9b0",
            "comment": "车2进9。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-39",
    "kind": "opening",
    "title": "梅花谱 · 第1局攻直车过河捉马士角炮",
    "subtitle": "《梅花谱》第1局攻直车过河捉马士角炮",
    "level": 2,
    "order": 42,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第1局攻直车过河捉马士角炮",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64442/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "e8f7",
            "comment": "士5进6。"
          },
          {
            "ucci": "g6e6",
            "comment": "炮三平五。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-40",
    "kind": "opening",
    "title": "梅花谱 · 第1局巡河炮攻横车尾随捉马",
    "subtitle": "《梅花谱》第1局巡河炮攻横车尾随捉马",
    "level": 2,
    "order": 43,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第1局巡河炮攻横车尾随捉马",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64437/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "d2b2",
            "comment": "车4平2。"
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
            "ucci": "a4g4",
            "comment": "炮九平三。"
          },
          {
            "ucci": "b2b1",
            "comment": "车2进1。"
          },
          {
            "ucci": "a0a2",
            "comment": "车九进二。"
          },
          {
            "ucci": "a9a8",
            "comment": "车1进1。"
          },
          {
            "ucci": "g4g7",
            "comment": "炮三进三。"
          },
          {
            "ucci": "b7g7",
            "comment": "炮2平7。"
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
            "ucci": "a2d2",
            "comment": "车九平六。"
          },
          {
            "ucci": "g7f7",
            "comment": "炮7平6。"
          },
          {
            "ucci": "g6f6",
            "comment": "车三平四。"
          },
          {
            "ucci": "f7h7",
            "comment": "炮6平8。"
          },
          {
            "ucci": "f0e1",
            "comment": "仕四进五。"
          },
          {
            "ucci": "b1b0",
            "comment": "车2进1。"
          },
          {
            "ucci": "e0f0",
            "comment": "帅五平四。"
          },
          {
            "ucci": "h7h9",
            "comment": "炮8退2。"
          },
          {
            "ucci": "f6f5",
            "comment": "车四退一。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-41",
    "kind": "opening",
    "title": "梅花谱 · 第3局巡河炮攻横车退而复进",
    "subtitle": "《梅花谱》第3局巡河炮攻横车退而复进",
    "level": 2,
    "order": 44,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第3局巡河炮攻横车退而复进",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64435/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "d4d1",
            "comment": "车4进3。"
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
            "ucci": "c2d4",
            "comment": "马七进六。"
          },
          {
            "ucci": "c1c4",
            "comment": "车3退3。"
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
            "ucci": "d4f5",
            "comment": "马六进四。"
          },
          {
            "ucci": "c4f4",
            "comment": "车3平6。"
          },
          {
            "ucci": "f5g7",
            "comment": "马四进三。"
          },
          {
            "ucci": "b7g7",
            "comment": "炮2平7。"
          },
          {
            "ucci": "g6g7",
            "comment": "车三进一。"
          },
          {
            "ucci": "a6a5",
            "comment": "卒1进1。"
          },
          {
            "ucci": "a4a7",
            "comment": "炮九进三。"
          },
          {
            "ucci": "a9a7",
            "comment": "车1进2。"
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
            "ucci": "c0e2",
            "comment": "相七进五。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-42",
    "kind": "opening",
    "title": "梅花谱 · 第5局横车破过河车吃卒压马",
    "subtitle": "《梅花谱》第5局横车破过河车吃卒压马",
    "level": 2,
    "order": 45,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第5局横车破过河车吃卒压马",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64443/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "h2d2",
            "comment": "炮二平六。"
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
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "h6g6",
            "comment": "车二平三。"
          },
          {
            "ucci": "e6e5",
            "comment": "卒5进1。"
          },
          {
            "ucci": "g3g4",
            "comment": "兵三进一。"
          },
          {
            "ucci": "c7e6",
            "comment": "马3进5。"
          },
          {
            "ucci": "g2f4",
            "comment": "马三进四。"
          },
          {
            "ucci": "b7b6",
            "comment": "炮2进1。"
          },
          {
            "ucci": "f4e6",
            "comment": "马四进五。"
          },
          {
            "ucci": "g7e6",
            "comment": "马7进5。"
          },
          {
            "ucci": "d2h2",
            "comment": "炮六平二。"
          },
          {
            "ucci": "e5e4",
            "comment": "卒5进1。"
          },
          {
            "ucci": "e3e4",
            "comment": "兵五进一。"
          },
          {
            "ucci": "e6d4",
            "comment": "马5进4。"
          },
          {
            "ucci": "g6g9",
            "comment": "车三进三。"
          },
          {
            "ucci": "b6b0",
            "comment": "炮2进6。"
          },
          {
            "ucci": "c0e2",
            "comment": "相七进五。"
          },
          {
            "ucci": "e7e2",
            "comment": "炮5进5。"
          },
          {
            "ucci": "g0e2",
            "comment": "相三进五。"
          },
          {
            "ucci": "d4e2",
            "comment": "马4进5。"
          },
          {
            "ucci": "b2d2",
            "comment": "炮八平六。"
          },
          {
            "ucci": "e2g1",
            "comment": "马5进7。"
          },
          {
            "ucci": "e0d0",
            "comment": "帅五平六。"
          },
          {
            "ucci": "b0f0",
            "comment": "炮2平6。"
          },
          {
            "ucci": "a0a2",
            "comment": "车九进二。"
          },
          {
            "ucci": "a9b9",
            "comment": "车1平2。"
          },
          {
            "ucci": "a2b2",
            "comment": "车九平八。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-43",
    "kind": "opening",
    "title": "梅花谱 · 第3局攻右车守河口后平炮兑车",
    "subtitle": "《梅花谱》第3局攻右车守河口后平炮兑车",
    "level": 3,
    "order": 46,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第3局攻右车守河口后平炮兑车",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64461/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b0a2",
            "comment": "马八进九。"
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
            "ucci": "i9h9",
            "comment": "车9平8。"
          },
          {
            "ucci": "h0h4",
            "comment": "车二进四。"
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
            "ucci": "a3a4",
            "comment": "兵九进一。"
          },
          {
            "ucci": "h7g7",
            "comment": "炮8平7。"
          },
          {
            "ucci": "h4d4",
            "comment": "车二平六。"
          },
          {
            "ucci": "h9h1",
            "comment": "车8进8。"
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
            "ucci": "b4d5",
            "comment": "马八进六。"
          },
          {
            "ucci": "g7g3",
            "comment": "炮7进4。"
          },
          {
            "ucci": "d5c7",
            "comment": "马六进七。"
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
            "ucci": "b2f2",
            "comment": "炮八平四。"
          },
          {
            "ucci": "e7f7",
            "comment": "炮5平6。"
          },
          {
            "ucci": "g2h4",
            "comment": "马三进二。"
          },
          {
            "ucci": "f5f6",
            "comment": "车6退1。"
          },
          {
            "ucci": "e6a6",
            "comment": "炮五平九。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "b0b6",
            "comment": "车八进六。"
          },
          {
            "ucci": "g0i0",
            "comment": "炮7平9。"
          },
          {
            "ucci": "a6f6",
            "comment": "炮九平四。"
          },
          {
            "ucci": "f7f2",
            "comment": "炮6进5。"
          },
          {
            "ucci": "e1f2",
            "comment": "仕五进四。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-44",
    "kind": "opening",
    "title": "梅花谱 · 第4局挺边兵跃边马攻上左士",
    "subtitle": "《梅花谱》第4局挺边兵跃边马攻上左士",
    "level": 3,
    "order": 47,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第4局挺边兵跃边马攻上左士",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64439/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b7b5",
            "comment": "炮2进2。"
          },
          {
            "ucci": "a1f1",
            "comment": "车九平四。"
          },
          {
            "ucci": "b5g5",
            "comment": "炮2平7。"
          },
          {
            "ucci": "a2b4",
            "comment": "马九进八。"
          },
          {
            "ucci": "g5g2",
            "comment": "炮7进3。"
          },
          {
            "ucci": "b2g2",
            "comment": "炮八平三。"
          },
          {
            "ucci": "e7e3",
            "comment": "炮5进4。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "g3g2",
            "comment": "车7进1。"
          },
          {
            "ucci": "b4d5",
            "comment": "马八进六。"
          },
          {
            "ucci": "e3e5",
            "comment": "炮5退2。"
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
            "ucci": "d5e7",
            "comment": "马六进五。"
          },
          {
            "ucci": "g2e2",
            "comment": "车7平5。"
          },
          {
            "ucci": "e7g8",
            "comment": "马五进三。"
          },
          {
            "ucci": "e2h2",
            "comment": "车5平8。"
          },
          {
            "ucci": "e0d0",
            "comment": "帅五平六。"
          },
          {
            "ucci": "h2h8",
            "comment": "车8退6。"
          },
          {
            "ucci": "f8e8",
            "comment": "车四平五。"
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
    "id": "opening-classic-45",
    "kind": "opening",
    "title": "梅花谱 · 第5局攻未进右车先平炮兑车",
    "subtitle": "《梅花谱》第5局攻未进右车先平炮兑车",
    "level": 3,
    "order": 48,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第5局攻未进右车先平炮兑车",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64459/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b0a2",
            "comment": "马八进九。"
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
            "ucci": "i9h9",
            "comment": "车9平8。"
          },
          {
            "ucci": "h0h4",
            "comment": "车二进四。"
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
            "ucci": "h7g7",
            "comment": "炮8平7。"
          },
          {
            "ucci": "h4d4",
            "comment": "车二平六。"
          },
          {
            "ucci": "h9h1",
            "comment": "车8进8。"
          },
          {
            "ucci": "e2c2",
            "comment": "炮五平七。"
          },
          {
            "ucci": "b9b3",
            "comment": "车2进6。"
          },
          {
            "ucci": "c2c6",
            "comment": "炮七进四。"
          },
          {
            "ucci": "c9a7",
            "comment": "象3进1。"
          },
          {
            "ucci": "a3a4",
            "comment": "兵九进一。"
          },
          {
            "ucci": "g7g3",
            "comment": "炮7进4。"
          },
          {
            "ucci": "g0e2",
            "comment": "相三进五。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
          },
          {
            "ucci": "a2b4",
            "comment": "马九进八。"
          },
          {
            "ucci": "b3c3",
            "comment": "车2平3。"
          },
          {
            "ucci": "b4a6",
            "comment": "马八进九。"
          },
          {
            "ucci": "c3c6",
            "comment": "车3退3。"
          },
          {
            "ucci": "a6c7",
            "comment": "马九进七。"
          },
          {
            "ucci": "c6c7",
            "comment": "车3退1。"
          },
          {
            "ucci": "b2b9",
            "comment": "炮八进七。"
          },
          {
            "ucci": "e8d7",
            "comment": "士5进4。"
          },
          {
            "ucci": "b0b8",
            "comment": "车八进八。"
          },
          {
            "ucci": "h1c1",
            "comment": "车8平3。"
          },
          {
            "ucci": "b9a9",
            "comment": "炮八平九。"
          },
          {
            "ucci": "c7c8",
            "comment": "后车退1。"
          },
          {
            "ucci": "b8b9",
            "comment": "车八进一。"
          },
          {
            "ucci": "e9e8",
            "comment": "将5进1。"
          },
          {
            "ucci": "d4f4",
            "comment": "车六平四。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-46",
    "kind": "opening",
    "title": "梅花谱 · 第1局破巡河车吃卒用炮打象",
    "subtitle": "《梅花谱》第1局破巡河车吃卒用炮打象",
    "level": 3,
    "order": 49,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第1局破巡河车吃卒用炮打象",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64458/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b2e2",
            "comment": "炮八平五。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
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
            "ucci": "h9g7",
            "comment": "马8进7。"
          },
          {
            "ucci": "g3g4",
            "comment": "兵三进一。"
          },
          {
            "ucci": "g5g4",
            "comment": "卒7进1。"
          },
          {
            "ucci": "b4g4",
            "comment": "车八平三。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "h2g2",
            "comment": "炮二平三。"
          },
          {
            "ucci": "g7h5",
            "comment": "马7进8。"
          },
          {
            "ucci": "g4g5",
            "comment": "车三进一。"
          },
          {
            "ucci": "b7b5",
            "comment": "炮2进2。"
          },
          {
            "ucci": "g5c5",
            "comment": "车三平七。"
          },
          {
            "ucci": "h5f4",
            "comment": "马8进6。"
          },
          {
            "ucci": "c5c7",
            "comment": "车七进二。"
          },
          {
            "ucci": "g9e7",
            "comment": "象7进5。"
          },
          {
            "ucci": "c7c4",
            "comment": "车七退三。"
          },
          {
            "ucci": "f4h3",
            "comment": "马6进8。"
          },
          {
            "ucci": "h0i2",
            "comment": "马二进一。"
          },
          {
            "ucci": "h3f2",
            "comment": "马8进6。"
          },
          {
            "ucci": "e0e1",
            "comment": "帅五进一。"
          },
          {
            "ucci": "b5f5",
            "comment": "炮2平6。"
          },
          {
            "ucci": "e1d1",
            "comment": "帅五平六。"
          },
          {
            "ucci": "h7h1",
            "comment": "炮8进6。"
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
            "ucci": "c4d4",
            "comment": "车七平六。"
          },
          {
            "ucci": "b9b1",
            "comment": "车2进8。"
          },
          {
            "ucci": "d1d2",
            "comment": "帅六进一。"
          },
          {
            "ucci": "f2e0",
            "comment": "马6进5。"
          },
          {
            "ucci": "e2e1",
            "comment": "炮五退一。"
          },
          {
            "ucci": "b1d1",
            "comment": "车2平4。"
          },
          {
            "ucci": "d2e2",
            "comment": "帅六平五。"
          },
          {
            "ucci": "d1d4",
            "comment": "车4退3。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-47",
    "kind": "opening",
    "title": "梅花谱 · 第6局退右炮破过河车贪吃卒",
    "subtitle": "《梅花谱》第6局退右炮破过河车贪吃卒",
    "level": 3,
    "order": 50,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第6局退右炮破过河车贪吃卒",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64453/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b2e2",
            "comment": "炮八平五。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
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
            "ucci": "b0b6",
            "comment": "车八进六。"
          },
          {
            "ucci": "h9g7",
            "comment": "马8进7。"
          },
          {
            "ucci": "b6c6",
            "comment": "车八平七。"
          },
          {
            "ucci": "b7b8",
            "comment": "炮2退1。"
          },
          {
            "ucci": "c6b6",
            "comment": "车七平八。"
          },
          {
            "ucci": "g7f5",
            "comment": "马7进6。"
          },
          {
            "ucci": "c3c4",
            "comment": "兵七进一。"
          },
          {
            "ucci": "g5g4",
            "comment": "卒7进1。"
          },
          {
            "ucci": "h0i2",
            "comment": "马二进一。"
          },
          {
            "ucci": "g4g3",
            "comment": "卒7进1。"
          },
          {
            "ucci": "h2f2",
            "comment": "炮二平四。"
          },
          {
            "ucci": "g9e7",
            "comment": "象7进5。"
          },
          {
            "ucci": "i0h0",
            "comment": "车一平二。"
          },
          {
            "ucci": "h7h6",
            "comment": "炮8进1。"
          },
          {
            "ucci": "b6b7",
            "comment": "车八进一。"
          },
          {
            "ucci": "b8h8",
            "comment": "炮2平8。"
          },
          {
            "ucci": "b7b9",
            "comment": "车八进二。"
          },
          {
            "ucci": "h8h0",
            "comment": "后炮进8。"
          },
          {
            "ucci": "b9b7",
            "comment": "车八退二。"
          },
          {
            "ucci": "h0i0",
            "comment": "前炮平9。"
          },
          {
            "ucci": "b7c7",
            "comment": "车八平七。"
          },
          {
            "ucci": "g3g2",
            "comment": "卒7进1。"
          },
          {
            "ucci": "e2g2",
            "comment": "炮五平三。"
          },
          {
            "ucci": "i9g9",
            "comment": "车9平7。"
          },
          {
            "ucci": "g2g1",
            "comment": "炮三退一。"
          },
          {
            "ucci": "h6h2",
            "comment": "炮8进4。"
          },
          {
            "ucci": "c2b4",
            "comment": "马七进八。"
          },
          {
            "ucci": "g9g1",
            "comment": "车7进8。"
          },
          {
            "ucci": "c0e2",
            "comment": "相七进五。"
          },
          {
            "ucci": "g1f1",
            "comment": "车7平6。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "h2e2",
            "comment": "炮8平5。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-48",
    "kind": "opening",
    "title": "梅花谱 · 第1局巡河车攻车守河口兑兵",
    "subtitle": "《梅花谱》第1局巡河车攻车守河口兑兵",
    "level": 3,
    "order": 51,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第1局巡河车攻车守河口兑兵",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64463/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b0a2",
            "comment": "马八进九。"
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
            "ucci": "i9h9",
            "comment": "车9平8。"
          },
          {
            "ucci": "h0h4",
            "comment": "车二进四。"
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
            "ucci": "a3a4",
            "comment": "兵九进一。"
          },
          {
            "ucci": "b5f5",
            "comment": "车2平6。"
          },
          {
            "ucci": "a2b4",
            "comment": "马九进八。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "c3c4",
            "comment": "兵七进一。"
          },
          {
            "ucci": "h7g7",
            "comment": "炮8平7。"
          },
          {
            "ucci": "h4d4",
            "comment": "车二平六。"
          },
          {
            "ucci": "c5c4",
            "comment": "卒3进1。"
          },
          {
            "ucci": "d4c4",
            "comment": "车六平七。"
          },
          {
            "ucci": "c7d5",
            "comment": "马3进4。"
          },
          {
            "ucci": "c4c9",
            "comment": "车七进五。"
          },
          {
            "ucci": "d5f4",
            "comment": "马4进6。"
          },
          {
            "ucci": "b4d5",
            "comment": "马八进六。"
          },
          {
            "ucci": "f5d5",
            "comment": "车6平4。"
          },
          {
            "ucci": "b2b9",
            "comment": "炮八进七。"
          },
          {
            "ucci": "h9h5",
            "comment": "车8进4。"
          },
          {
            "ucci": "b0b8",
            "comment": "车八进八。"
          },
          {
            "ucci": "f4e2",
            "comment": "马6进5。"
          },
          {
            "ucci": "g0e2",
            "comment": "相三进五。"
          },
          {
            "ucci": "g7g3",
            "comment": "炮7进4。"
          },
          {
            "ucci": "b9a9",
            "comment": "炮八平九。"
          },
          {
            "ucci": "e7a7",
            "comment": "炮5平1。"
          },
          {
            "ucci": "c9c5",
            "comment": "车七退四。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
          },
          {
            "ucci": "b8b9",
            "comment": "车八进一。"
          },
          {
            "ucci": "e8d9",
            "comment": "士5退4。"
          },
          {
            "ucci": "b9b5",
            "comment": "车八退四。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-49",
    "kind": "opening",
    "title": "梅花谱 · 第2局破炮先去象后上三路马",
    "subtitle": "《梅花谱》第2局破炮先去象后上三路马",
    "level": 3,
    "order": 52,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第2局破炮先去象后上三路马",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64457/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b2e2",
            "comment": "炮八平五。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
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
            "ucci": "h9g7",
            "comment": "马8进7。"
          },
          {
            "ucci": "g3g4",
            "comment": "兵三进一。"
          },
          {
            "ucci": "g5g4",
            "comment": "卒7进1。"
          },
          {
            "ucci": "b4g4",
            "comment": "车八平三。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "h2g2",
            "comment": "炮二平三。"
          },
          {
            "ucci": "g7h5",
            "comment": "马7进8。"
          },
          {
            "ucci": "g2g9",
            "comment": "炮三进七。"
          },
          {
            "ucci": "f9e8",
            "comment": "士6进5。"
          },
          {
            "ucci": "h0g2",
            "comment": "马二进三。"
          },
          {
            "ucci": "c9e7",
            "comment": "象3进5。"
          },
          {
            "ucci": "g9g6",
            "comment": "炮三退三。"
          },
          {
            "ucci": "i9g9",
            "comment": "车9平7。"
          },
          {
            "ucci": "i0i1",
            "comment": "车一进一。"
          },
          {
            "ucci": "b7b4",
            "comment": "炮2进3。"
          },
          {
            "ucci": "i1b1",
            "comment": "车一平八。"
          },
          {
            "ucci": "c5c4",
            "comment": "卒3进1。"
          },
          {
            "ucci": "g4c4",
            "comment": "车三平七。"
          },
          {
            "ucci": "g9g6",
            "comment": "车7进3。"
          },
          {
            "ucci": "b1b4",
            "comment": "车八进三。"
          },
          {
            "ucci": "b9b4",
            "comment": "车2进5。"
          },
          {
            "ucci": "c4b4",
            "comment": "车七平八。"
          },
          {
            "ucci": "g6g2",
            "comment": "车7进4。"
          },
          {
            "ucci": "c2e1",
            "comment": "马七退五。"
          },
          {
            "ucci": "g2f2",
            "comment": "车7平6。"
          },
          {
            "ucci": "b4g4",
            "comment": "车八平三。"
          },
          {
            "ucci": "h5i3",
            "comment": "马8进9。"
          },
          {
            "ucci": "g4g3",
            "comment": "车三退一。"
          },
          {
            "ucci": "e9f9",
            "comment": "将5平6。"
          },
          {
            "ucci": "e1c2",
            "comment": "马五进七。"
          },
          {
            "ucci": "f2f0",
            "comment": "车6进2。"
          },
          {
            "ucci": "e0e1",
            "comment": "帅五进一。"
          },
          {
            "ucci": "i3h5",
            "comment": "马9退8。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-50",
    "kind": "opening",
    "title": "梅花谱 · 第3局破炮打象后换士上右马",
    "subtitle": "《梅花谱》第3局破炮打象后换士上右马",
    "level": 3,
    "order": 53,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第3局破炮打象后换士上右马",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64456/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b2e2",
            "comment": "炮八平五。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
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
            "ucci": "h9g7",
            "comment": "马8进7。"
          },
          {
            "ucci": "g3g4",
            "comment": "兵三进一。"
          },
          {
            "ucci": "g5g4",
            "comment": "卒7进1。"
          },
          {
            "ucci": "b4g4",
            "comment": "车八平三。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "h2g2",
            "comment": "炮二平三。"
          },
          {
            "ucci": "g7h5",
            "comment": "马7进8。"
          },
          {
            "ucci": "g2g9",
            "comment": "炮三进七。"
          },
          {
            "ucci": "f9e8",
            "comment": "士6进5。"
          },
          {
            "ucci": "g9d9",
            "comment": "炮三平六。"
          },
          {
            "ucci": "e9d9",
            "comment": "将5平4。"
          },
          {
            "ucci": "h0g2",
            "comment": "马二进三。"
          },
          {
            "ucci": "c9e7",
            "comment": "象3进5。"
          },
          {
            "ucci": "g2f4",
            "comment": "马三进四。"
          },
          {
            "ucci": "d9e9",
            "comment": "将4平5。"
          },
          {
            "ucci": "f4e6",
            "comment": "马四进五。"
          },
          {
            "ucci": "c7e6",
            "comment": "马3进5。"
          },
          {
            "ucci": "e2e6",
            "comment": "炮五进四。"
          },
          {
            "ucci": "b9d9",
            "comment": "车2平4。"
          },
          {
            "ucci": "g4g5",
            "comment": "车三进一。"
          },
          {
            "ucci": "b7b5",
            "comment": "炮2进2。"
          },
          {
            "ucci": "g5g8",
            "comment": "车三进三。"
          },
          {
            "ucci": "h5f6",
            "comment": "马8退6。"
          },
          {
            "ucci": "g8f8",
            "comment": "车三平四。"
          },
          {
            "ucci": "i9f9",
            "comment": "车9平6。"
          },
          {
            "ucci": "f8i8",
            "comment": "车四平一。"
          },
          {
            "ucci": "c5c4",
            "comment": "卒3进1。"
          },
          {
            "ucci": "i8i6",
            "comment": "前车退二。"
          },
          {
            "ucci": "c4c3",
            "comment": "卒3进1。"
          },
          {
            "ucci": "c2a1",
            "comment": "马七退九。"
          },
          {
            "ucci": "b5b0",
            "comment": "炮2进5。"
          },
          {
            "ucci": "f0e1",
            "comment": "仕四进五。"
          },
          {
            "ucci": "h7h1",
            "comment": "炮8进6。"
          },
          {
            "ucci": "g0e2",
            "comment": "相三进五。"
          },
          {
            "ucci": "d9d6",
            "comment": "车4进3。"
          },
          {
            "ucci": "e6e5",
            "comment": "炮五退一。"
          },
          {
            "ucci": "h1a1",
            "comment": "炮8平1。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-51",
    "kind": "opening",
    "title": "梅花谱 · 第2局攻直车守河口挺卒兑兵",
    "subtitle": "《梅花谱》第2局攻直车守河口挺卒兑兵",
    "level": 3,
    "order": 54,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第2局攻直车守河口挺卒兑兵",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64441/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "h9h5",
            "comment": "车8进4。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "c4c5",
            "comment": "兵七进一。"
          },
          {
            "ucci": "h5c5",
            "comment": "车8平3。"
          },
          {
            "ucci": "c2d4",
            "comment": "马七进六。"
          },
          {
            "ucci": "b7d7",
            "comment": "炮2平4。"
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
            "ucci": "c5c2",
            "comment": "车3进3。"
          },
          {
            "ucci": "a0a2",
            "comment": "车九进二。"
          },
          {
            "ucci": "a9b9",
            "comment": "车1平2。"
          },
          {
            "ucci": "b2b4",
            "comment": "炮八进二。"
          },
          {
            "ucci": "c2a2",
            "comment": "车3平1。"
          },
          {
            "ucci": "b4d4",
            "comment": "炮八平六。"
          },
          {
            "ucci": "d7b7",
            "comment": "炮4平2。"
          },
          {
            "ucci": "d4g4",
            "comment": "炮六平三。"
          },
          {
            "ucci": "g9i7",
            "comment": "象7进9。"
          },
          {
            "ucci": "c0a2",
            "comment": "相七进九。"
          },
          {
            "ucci": "b7b0",
            "comment": "炮2进7。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "b9b6",
            "comment": "车2进3。"
          },
          {
            "ucci": "e6e5",
            "comment": "炮五退一。"
          },
          {
            "ucci": "b6e6",
            "comment": "车2平5。"
          },
          {
            "ucci": "e5e7",
            "comment": "炮五进二。"
          },
          {
            "ucci": "e6e7",
            "comment": "车5退1。"
          },
          {
            "ucci": "g4e4",
            "comment": "炮三平五。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
          },
          {
            "ucci": "d8b8",
            "comment": "车六平八。"
          },
          {
            "ucci": "b0a0",
            "comment": "炮2平1。"
          },
          {
            "ucci": "e0d0",
            "comment": "帅五平六。"
          },
          {
            "ucci": "a7c6",
            "comment": "马1进3。"
          },
          {
            "ucci": "b8b9",
            "comment": "车八进一。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-52",
    "kind": "opening",
    "title": "梅花谱 · 第4局巡河炮攻横车拦河轧炮",
    "subtitle": "《梅花谱》第4局巡河炮攻横车拦河轧炮",
    "level": 3,
    "order": 55,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第4局巡河炮攻横车拦河轧炮",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64434/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "g6g9",
            "comment": "车三进三。"
          },
          {
            "ucci": "i8g9",
            "comment": "马9退7。"
          },
          {
            "ucci": "d5e7",
            "comment": "马六进五。"
          },
          {
            "ucci": "f2f7",
            "comment": "车6退5。"
          },
          {
            "ucci": "g4d4",
            "comment": "炮三平六。"
          },
          {
            "ucci": "d7d0",
            "comment": "炮4进7。"
          },
          {
            "ucci": "e7c8",
            "comment": "马五进七。"
          },
          {
            "ucci": "b7e7",
            "comment": "车2平5。"
          },
          {
            "ucci": "d8d9",
            "comment": "车六进一。"
          },
          {
            "ucci": "e9d9",
            "comment": "将5平4。"
          },
          {
            "ucci": "e6d6",
            "comment": "炮五平六。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-53",
    "kind": "opening",
    "title": "梅花谱 · 第5局攻巡河炮再挺边卒",
    "subtitle": "《梅花谱》第5局攻巡河炮再挺边卒",
    "level": 3,
    "order": 56,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第5局攻巡河炮再挺边卒",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64433/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "c4f4",
            "comment": "车3平6。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "a6a5",
            "comment": "卒1进1。"
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
            "ucci": "a5a4",
            "comment": "卒1进1。"
          },
          {
            "ucci": "b4d5",
            "comment": "马八进六。"
          },
          {
            "ucci": "f4f2",
            "comment": "车6进2。"
          },
          {
            "ucci": "d5c7",
            "comment": "马六进七。"
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
            "ucci": "f2g2",
            "comment": "车6平7。"
          },
          {
            "ucci": "e0f0",
            "comment": "帅五平四。"
          },
          {
            "ucci": "g2g0",
            "comment": "车7进2。"
          },
          {
            "ucci": "f0f1",
            "comment": "帅四进一。"
          },
          {
            "ucci": "g0g2",
            "comment": "车7退2。"
          },
          {
            "ucci": "g6g7",
            "comment": "车三进一。"
          },
          {
            "ucci": "g2e2",
            "comment": "车7平5。"
          },
          {
            "ucci": "b0b8",
            "comment": "车八进八。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
          },
          {
            "ucci": "b8e8",
            "comment": "车八平五。"
          },
          {
            "ucci": "e3e8",
            "comment": "炮5退5。"
          },
          {
            "ucci": "g7f7",
            "comment": "车三平四。"
          },
          {
            "ucci": "e8f8",
            "comment": "炮5平6。"
          },
          {
            "ucci": "f7f8",
            "comment": "车四进一。"
          },
          {
            "ucci": "f9e8",
            "comment": "士6进5。"
          },
          {
            "ucci": "f8e8",
            "comment": "车四平五。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-54",
    "kind": "opening",
    "title": "梅花谱 · 第1局取中兵压马破上右士",
    "subtitle": "《梅花谱》第1局取中兵压马破上右士",
    "level": 3,
    "order": 57,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第1局取中兵压马破上右士",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64450/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "f1d2",
            "comment": "马四进六。"
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
            "ucci": "b7b5",
            "comment": "炮2进2。"
          },
          {
            "ucci": "f0f3",
            "comment": "车四进三。"
          },
          {
            "ucci": "b5a5",
            "comment": "炮2平1。"
          },
          {
            "ucci": "b2a2",
            "comment": "炮八平九。"
          },
          {
            "ucci": "a5e5",
            "comment": "炮1平5。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "h9h0",
            "comment": "车8进9。"
          },
          {
            "ucci": "f3f0",
            "comment": "车四退三。"
          },
          {
            "ucci": "h0f0",
            "comment": "车8平6。"
          },
          {
            "ucci": "e0f0",
            "comment": "帅五平四。"
          },
          {
            "ucci": "a9a8",
            "comment": "车1进1。"
          },
          {
            "ucci": "a0b0",
            "comment": "车九平八。"
          },
          {
            "ucci": "a8f8",
            "comment": "车1平6。"
          },
          {
            "ucci": "g2f2",
            "comment": "炮三平四。"
          },
          {
            "ucci": "f8h8",
            "comment": "车6平8。"
          },
          {
            "ucci": "f0e0",
            "comment": "帅四平五。"
          },
          {
            "ucci": "h8h0",
            "comment": "车8进8。"
          },
          {
            "ucci": "f2f0",
            "comment": "炮四退二。"
          },
          {
            "ucci": "f9e8",
            "comment": "士6进5。"
          },
          {
            "ucci": "b0b4",
            "comment": "车八进四。"
          },
          {
            "ucci": "d3i3",
            "comment": "炮4平9。"
          },
          {
            "ucci": "d2c4",
            "comment": "马六进七。"
          },
          {
            "ucci": "h0h4",
            "comment": "车8退4。"
          },
          {
            "ucci": "c2e3",
            "comment": "后马进五。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "b4b9",
            "comment": "车八进五。"
          },
          {
            "ucci": "c5c4",
            "comment": "卒3进1。"
          },
          {
            "ucci": "e3c4",
            "comment": "马五进七。"
          },
          {
            "ucci": "i3i0",
            "comment": "炮9进3。"
          },
          {
            "ucci": "f0f2",
            "comment": "炮四进二。"
          },
          {
            "ucci": "h4h0",
            "comment": "车8进4。"
          },
          {
            "ucci": "f2f0",
            "comment": "炮四退二。"
          },
          {
            "ucci": "e9f9",
            "comment": "将5平6。"
          },
          {
            "ucci": "c4e5",
            "comment": "马七进五。"
          },
          {
            "ucci": "h0f0",
            "comment": "车8平6。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-55",
    "kind": "opening",
    "title": "梅花谱 · 第2局取中兵压马破左士兑炮",
    "subtitle": "《梅花谱》第2局取中兵压马破左士兑炮",
    "level": 3,
    "order": 58,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第2局取中兵压马破左士兑炮",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64449/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "f1d2",
            "comment": "马四进六。"
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
            "ucci": "e7e3",
            "comment": "炮5进4。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "e3d3",
            "comment": "炮5平4。"
          },
          {
            "ucci": "b2b3",
            "comment": "炮八进一。"
          },
          {
            "ucci": "d3b3",
            "comment": "炮4平2。"
          },
          {
            "ucci": "d2b3",
            "comment": "马六进八。"
          },
          {
            "ucci": "e6e5",
            "comment": "卒5进1。"
          },
          {
            "ucci": "c3c4",
            "comment": "兵七进一。"
          },
          {
            "ucci": "e5e4",
            "comment": "卒5进1。"
          },
          {
            "ucci": "c4c5",
            "comment": "兵七进一。"
          },
          {
            "ucci": "h9h5",
            "comment": "车8进4。"
          },
          {
            "ucci": "b3d2",
            "comment": "前马退六。"
          },
          {
            "ucci": "e4d4",
            "comment": "卒5平4。"
          },
          {
            "ucci": "c5c6",
            "comment": "兵七进一。"
          },
          {
            "ucci": "d4d3",
            "comment": "卒4进1。"
          },
          {
            "ucci": "d2b3",
            "comment": "马六进八。"
          },
          {
            "ucci": "h5b5",
            "comment": "车8平2。"
          },
          {
            "ucci": "b3d4",
            "comment": "前马进六。"
          },
          {
            "ucci": "b7b0",
            "comment": "炮2进7。"
          },
          {
            "ucci": "c0a2",
            "comment": "相七进九。"
          },
          {
            "ucci": "b5b1",
            "comment": "车2进4。"
          },
          {
            "ucci": "g2g1",
            "comment": "炮三退一。"
          },
          {
            "ucci": "b1e1",
            "comment": "车2平5。"
          },
          {
            "ucci": "f0e1",
            "comment": "仕四进五。"
          },
          {
            "ucci": "b0i0",
            "comment": "炮2平9。"
          },
          {
            "ucci": "a2c0",
            "comment": "相九退七。"
          },
          {
            "ucci": "a9a8",
            "comment": "车1进1。"
          },
          {
            "ucci": "a0b0",
            "comment": "车九平八。"
          },
          {
            "ucci": "a8h8",
            "comment": "车1平8。"
          },
          {
            "ucci": "b0b9",
            "comment": "车八进九。"
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
            "ucci": "h0h1",
            "comment": "车8退1。"
          },
          {
            "ucci": "g1g0",
            "comment": "炮三退一。"
          },
          {
            "ucci": "d3d2",
            "comment": "卒4进1。"
          },
          {
            "ucci": "d4f3",
            "comment": "马六退四。"
          },
          {
            "ucci": "d2d1",
            "comment": "卒4进1。"
          },
          {
            "ucci": "b9b3",
            "comment": "车八退六。"
          },
          {
            "ucci": "h1f1",
            "comment": "车8平6。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-56",
    "kind": "opening",
    "title": "梅花谱 · 第5局左炮过河攻上边马出车",
    "subtitle": "《梅花谱》第5局左炮过河攻上边马出车",
    "level": 3,
    "order": 59,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第5局左炮过河攻上边马出车",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64438/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "h9h3",
            "comment": "车8进6。"
          },
          {
            "ucci": "a3a4",
            "comment": "兵九进一。"
          },
          {
            "ucci": "b7c7",
            "comment": "炮2平3。"
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
            "ucci": "b2b8",
            "comment": "炮八进六。"
          },
          {
            "ucci": "c7c8",
            "comment": "炮3退1。"
          },
          {
            "ucci": "a0b0",
            "comment": "车九平八。"
          },
          {
            "ucci": "h3g3",
            "comment": "车8平7。"
          },
          {
            "ucci": "b0b7",
            "comment": "车八进七。"
          },
          {
            "ucci": "g3g2",
            "comment": "车7进1。"
          },
          {
            "ucci": "d8c8",
            "comment": "车六平七。"
          },
          {
            "ucci": "e7e3",
            "comment": "炮5进4。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "c9e7",
            "comment": "象3进5。"
          },
          {
            "ucci": "a2b4",
            "comment": "马九进八。"
          },
          {
            "ucci": "e3g3",
            "comment": "炮5平7。"
          },
          {
            "ucci": "e1f2",
            "comment": "仕五进四。"
          },
          {
            "ucci": "g3g0",
            "comment": "炮7进3。"
          },
          {
            "ucci": "f0e1",
            "comment": "后仕进五。"
          },
          {
            "ucci": "g2g5",
            "comment": "车7退3。"
          },
          {
            "ucci": "b4c6",
            "comment": "马八进七。"
          },
          {
            "ucci": "f9e8",
            "comment": "士6进5。"
          },
          {
            "ucci": "c6a7",
            "comment": "马七进九。"
          },
          {
            "ucci": "g0c0",
            "comment": "炮7平3。"
          },
          {
            "ucci": "c8d8",
            "comment": "车七平六。"
          },
          {
            "ucci": "b9c9",
            "comment": "车2平3。"
          },
          {
            "ucci": "e2c2",
            "comment": "炮五平七。"
          },
          {
            "ucci": "c9c3",
            "comment": "车3进6。"
          },
          {
            "ucci": "b7b3",
            "comment": "车八退四。"
          },
          {
            "ucci": "c3c2",
            "comment": "车3进1。"
          },
          {
            "ucci": "b8b9",
            "comment": "炮八进一。"
          },
          {
            "ucci": "c2c9",
            "comment": "车3退7。"
          },
          {
            "ucci": "d8d9",
            "comment": "车六进一。"
          },
          {
            "ucci": "e8d9",
            "comment": "士5退4。"
          },
          {
            "ucci": "a7c8",
            "comment": "马九进七。"
          },
          {
            "ucci": "e9f9",
            "comment": "将5平6。"
          },
          {
            "ucci": "b3f3",
            "comment": "车八平四。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-57",
    "kind": "opening",
    "title": "梅花谱 · 第4局横车退炮破八路炮过河",
    "subtitle": "《梅花谱》第4局横车退炮破八路炮过河",
    "level": 3,
    "order": 60,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第4局横车退炮破八路炮过河",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64444/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "h2d2",
            "comment": "炮二平六。"
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
            "ucci": "h0h4",
            "comment": "车二进四。"
          },
          {
            "ucci": "i8d8",
            "comment": "车9平4。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "h4c4",
            "comment": "车二平七。"
          },
          {
            "ucci": "e6e5",
            "comment": "卒5进1。"
          },
          {
            "ucci": "c4c6",
            "comment": "车七进二。"
          },
          {
            "ucci": "a9a7",
            "comment": "车1进2。"
          },
          {
            "ucci": "b2b6",
            "comment": "炮八进四。"
          },
          {
            "ucci": "b7b8",
            "comment": "炮2退1。"
          },
          {
            "ucci": "d2e2",
            "comment": "炮六平五。"
          },
          {
            "ucci": "b8c8",
            "comment": "炮2平3。"
          },
          {
            "ucci": "e2e5",
            "comment": "炮五进三。"
          },
          {
            "ucci": "g7e6",
            "comment": "马7进5。"
          },
          {
            "ucci": "e5e7",
            "comment": "炮五进二。"
          },
          {
            "ucci": "c8c6",
            "comment": "炮3进2。"
          },
          {
            "ucci": "e7a7",
            "comment": "炮五平九。"
          },
          {
            "ucci": "e6f4",
            "comment": "马5进6。"
          },
          {
            "ucci": "a0a2",
            "comment": "车九进二。"
          },
          {
            "ucci": "f4h3",
            "comment": "马6进8。"
          },
          {
            "ucci": "a2f2",
            "comment": "车九平四。"
          },
          {
            "ucci": "d8b8",
            "comment": "车4平2。"
          },
          {
            "ucci": "b6b2",
            "comment": "炮八退四。"
          },
          {
            "ucci": "h3g1",
            "comment": "马8进7。"
          },
          {
            "ucci": "e0d0",
            "comment": "帅五平六。"
          },
          {
            "ucci": "c6d6",
            "comment": "炮3平4。"
          },
          {
            "ucci": "b2e2",
            "comment": "炮八平五。"
          },
          {
            "ucci": "g9e7",
            "comment": "象7进5。"
          },
          {
            "ucci": "f2f1",
            "comment": "车四退一。"
          },
          {
            "ucci": "b8b0",
            "comment": "车2进8。"
          },
          {
            "ucci": "d0e0",
            "comment": "帅六平五。"
          },
          {
            "ucci": "b0c0",
            "comment": "车2平3。"
          },
          {
            "ucci": "e1d0",
            "comment": "仕五退六。"
          },
          {
            "ucci": "c0c1",
            "comment": "车3退1。"
          },
          {
            "ucci": "f0e1",
            "comment": "仕四进五。"
          },
          {
            "ucci": "d6b6",
            "comment": "炮4平2。"
          },
          {
            "ucci": "e2b2",
            "comment": "炮五平八。"
          },
          {
            "ucci": "c1c2",
            "comment": "车3退1。"
          },
          {
            "ucci": "f1g1",
            "comment": "车四平三。"
          },
          {
            "ucci": "c2b2",
            "comment": "车3平2。"
          },
          {
            "ucci": "a7a9",
            "comment": "炮九进二。"
          },
          {
            "ucci": "b2g2",
            "comment": "车2平7。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-58",
    "kind": "opening",
    "title": "梅花谱 · 第1局横车破巡河车平七吃卒",
    "subtitle": "《梅花谱》第1局横车破巡河车平七吃卒",
    "level": 3,
    "order": 61,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第1局横车破巡河车平七吃卒",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64447/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "h2d2",
            "comment": "炮二平六。"
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
            "ucci": "h0h4",
            "comment": "车二进四。"
          },
          {
            "ucci": "i8d8",
            "comment": "车9平4。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "h4c4",
            "comment": "车二平七。"
          },
          {
            "ucci": "e6e5",
            "comment": "卒5进1。"
          },
          {
            "ucci": "c4c6",
            "comment": "车七进二。"
          },
          {
            "ucci": "a9a7",
            "comment": "车1进2。"
          },
          {
            "ucci": "d2c2",
            "comment": "炮六平七。"
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
            "ucci": "b7b3",
            "comment": "炮2进4。"
          },
          {
            "ucci": "c6c7",
            "comment": "车七进一。"
          },
          {
            "ucci": "b3e3",
            "comment": "炮2平5。"
          },
          {
            "ucci": "g2e3",
            "comment": "马三进五。"
          },
          {
            "ucci": "e7e3",
            "comment": "炮5进4。"
          },
          {
            "ucci": "g0e2",
            "comment": "相三进五。"
          },
          {
            "ucci": "e5e4",
            "comment": "卒5进1。"
          },
          {
            "ucci": "c7a7",
            "comment": "车七平九。"
          },
          {
            "ucci": "c9a7",
            "comment": "象3进1。"
          },
          {
            "ucci": "a0b0",
            "comment": "车九平八。"
          },
          {
            "ucci": "e4f4",
            "comment": "卒5平6。"
          },
          {
            "ucci": "b2b3",
            "comment": "炮八进一。"
          },
          {
            "ucci": "e3e7",
            "comment": "炮5退4。"
          },
          {
            "ucci": "c3c4",
            "comment": "兵七进一。"
          },
          {
            "ucci": "g7e6",
            "comment": "马7进5。"
          },
          {
            "ucci": "a2c3",
            "comment": "马九进七。"
          },
          {
            "ucci": "e6d4",
            "comment": "马5进4。"
          },
          {
            "ucci": "b0b2",
            "comment": "车八进二。"
          },
          {
            "ucci": "e7b7",
            "comment": "炮5平2。"
          },
          {
            "ucci": "b2a2",
            "comment": "车八平九。"
          },
          {
            "ucci": "b7c7",
            "comment": "炮2平3。"
          },
          {
            "ucci": "b3b9",
            "comment": "炮八进六。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
          },
          {
            "ucci": "c3e4",
            "comment": "马七进五。"
          },
          {
            "ucci": "c7c2",
            "comment": "炮3进5。"
          },
          {
            "ucci": "e4f6",
            "comment": "马五进四。"
          },
          {
            "ucci": "d4f3",
            "comment": "马4进6。"
          },
          {
            "ucci": "e1f2",
            "comment": "仕五进四。"
          },
          {
            "ucci": "c2f2",
            "comment": "炮3平6。"
          },
          {
            "ucci": "e2g0",
            "comment": "相五退三。"
          },
          {
            "ucci": "f2b2",
            "comment": "炮6平2。"
          },
          {
            "ucci": "f0e1",
            "comment": "仕四进五。"
          },
          {
            "ucci": "b2b0",
            "comment": "炮2进2。"
          },
          {
            "ucci": "e1d0",
            "comment": "仕五退六。"
          },
          {
            "ucci": "d1d0",
            "comment": "车4进1。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-59",
    "kind": "opening",
    "title": "梅花谱 · 第3局取中兵压马破左士平炮",
    "subtitle": "《梅花谱》第3局取中兵压马破左士平炮",
    "level": 3,
    "order": 62,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第3局取中兵压马破左士平炮",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64448/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "f1d2",
            "comment": "马四进六。"
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
            "ucci": "e7e3",
            "comment": "炮5进4。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "e3d3",
            "comment": "炮5平4。"
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
            "ucci": "e6e5",
            "comment": "卒5进1。"
          },
          {
            "ucci": "b0b4",
            "comment": "车八进四。"
          },
          {
            "ucci": "h9h3",
            "comment": "车8进6。"
          },
          {
            "ucci": "i0g0",
            "comment": "车一平三。"
          },
          {
            "ucci": "g7e6",
            "comment": "马7进5。"
          },
          {
            "ucci": "b4d4",
            "comment": "车八平六。"
          },
          {
            "ucci": "h3g3",
            "comment": "车8平7。"
          },
          {
            "ucci": "g2g6",
            "comment": "炮三进四。"
          },
          {
            "ucci": "g3g0",
            "comment": "车7进3。"
          },
          {
            "ucci": "e2g0",
            "comment": "相五退三。"
          },
          {
            "ucci": "d3e3",
            "comment": "炮4平5。"
          },
          {
            "ucci": "g0e2",
            "comment": "相三进五。"
          },
          {
            "ucci": "e5e4",
            "comment": "卒5进1。"
          },
          {
            "ucci": "d4b4",
            "comment": "车六平八。"
          },
          {
            "ucci": "e4d4",
            "comment": "卒5平4。"
          },
          {
            "ucci": "g6c6",
            "comment": "炮三平七。"
          },
          {
            "ucci": "d4d3",
            "comment": "卒4进1。"
          },
          {
            "ucci": "c6d6",
            "comment": "前炮平六。"
          },
          {
            "ucci": "d3d2",
            "comment": "卒4进1。"
          },
          {
            "ucci": "c2c7",
            "comment": "炮七进五。"
          },
          {
            "ucci": "d2d1",
            "comment": "卒4进1。"
          },
          {
            "ucci": "c7d7",
            "comment": "炮七平六。"
          },
          {
            "ucci": "a9b9",
            "comment": "车1平2。"
          },
          {
            "ucci": "b4g4",
            "comment": "车八平三。"
          },
          {
            "ucci": "b9b1",
            "comment": "车2进8。"
          },
          {
            "ucci": "c3c4",
            "comment": "兵七进一。"
          },
          {
            "ucci": "e6f4",
            "comment": "马5进6。"
          },
          {
            "ucci": "a2c3",
            "comment": "马九进七。"
          },
          {
            "ucci": "e7e2",
            "comment": "后炮进5。"
          },
          {
            "ucci": "c3e2",
            "comment": "马七退五。"
          },
          {
            "ucci": "f4e2",
            "comment": "马6进5。"
          },
          {
            "ucci": "d7d1",
            "comment": "前炮退六。"
          },
          {
            "ucci": "b1d1",
            "comment": "车2平4。"
          },
          {
            "ucci": "g4e4",
            "comment": "车三平五。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
          },
          {
            "ucci": "e4e3",
            "comment": "车五退一。"
          },
          {
            "ucci": "e2g1",
            "comment": "马5进7。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-60",
    "kind": "opening",
    "title": "梅花谱 · 第3局横车夹马破过宫炮移中",
    "subtitle": "《梅花谱》第3局横车夹马破过宫炮移中",
    "level": 3,
    "order": 63,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第3局横车夹马破过宫炮移中",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64445/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "h2d2",
            "comment": "炮二平六。"
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
            "ucci": "h0h4",
            "comment": "车二进四。"
          },
          {
            "ucci": "i8d8",
            "comment": "车9平4。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "h4c4",
            "comment": "车二平七。"
          },
          {
            "ucci": "e6e5",
            "comment": "卒5进1。"
          },
          {
            "ucci": "c4c6",
            "comment": "车七进二。"
          },
          {
            "ucci": "a9a7",
            "comment": "车1进2。"
          },
          {
            "ucci": "b2c2",
            "comment": "炮八平七。"
          },
          {
            "ucci": "c7e6",
            "comment": "马3进5。"
          },
          {
            "ucci": "d2e2",
            "comment": "炮六平五。"
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
            "ucci": "e5e4",
            "comment": "卒5进1。"
          },
          {
            "ucci": "e2e4",
            "comment": "炮五进二。"
          },
          {
            "ucci": "b7b2",
            "comment": "炮2进5。"
          },
          {
            "ucci": "c6b6",
            "comment": "车七平八。"
          },
          {
            "ucci": "b2g2",
            "comment": "炮2平7。"
          },
          {
            "ucci": "c2c9",
            "comment": "炮七进七。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
          },
          {
            "ucci": "b6b9",
            "comment": "车八进三。"
          },
          {
            "ucci": "e7e4",
            "comment": "炮5进3。"
          },
          {
            "ucci": "e3e4",
            "comment": "兵五进一。"
          },
          {
            "ucci": "e6g5",
            "comment": "马5进7。"
          },
          {
            "ucci": "b9b2",
            "comment": "车八退七。"
          },
          {
            "ucci": "g5e4",
            "comment": "前马进5。"
          },
          {
            "ucci": "b2g2",
            "comment": "车八平三。"
          },
          {
            "ucci": "a7e7",
            "comment": "车1平5。"
          },
          {
            "ucci": "g2e2",
            "comment": "车三平五。"
          },
          {
            "ucci": "e9d9",
            "comment": "将5平4。"
          },
          {
            "ucci": "a0b0",
            "comment": "车九平八。"
          },
          {
            "ucci": "e4f2",
            "comment": "马5进6。"
          },
          {
            "ucci": "e1f2",
            "comment": "仕五进四。"
          },
          {
            "ucci": "d1d0",
            "comment": "车4进1。"
          },
          {
            "ucci": "e0e1",
            "comment": "帅五进一。"
          },
          {
            "ucci": "g7e6",
            "comment": "马7进5。"
          },
          {
            "ucci": "b0b2",
            "comment": "车八进二。"
          },
          {
            "ucci": "e7d7",
            "comment": "车5平4。"
          },
          {
            "ucci": "e1f1",
            "comment": "帅五平四。"
          },
          {
            "ucci": "e6f4",
            "comment": "马5进6。"
          },
          {
            "ucci": "e2e4",
            "comment": "车五进二。"
          },
          {
            "ucci": "d0d3",
            "comment": "前车退3。"
          },
          {
            "ucci": "f0e1",
            "comment": "后仕进五。"
          },
          {
            "ucci": "d7h7",
            "comment": "后车平8。"
          },
          {
            "ucci": "b2d2",
            "comment": "车八平六。"
          },
          {
            "ucci": "f4g2",
            "comment": "马6进7。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-61",
    "kind": "opening",
    "title": "梅花谱 · 第5局退炮横车破巡河车边马",
    "subtitle": "《梅花谱》第5局退炮横车破巡河车边马",
    "level": 3,
    "order": 64,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第5局退炮横车破巡河车边马",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64454/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b2e2",
            "comment": "炮八平五。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
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
            "ucci": "h9g7",
            "comment": "马8进7。"
          },
          {
            "ucci": "g3g4",
            "comment": "兵三进一。"
          },
          {
            "ucci": "g5g4",
            "comment": "卒7进1。"
          },
          {
            "ucci": "b4g4",
            "comment": "车八平三。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "h0i2",
            "comment": "马二进一。"
          },
          {
            "ucci": "h7h8",
            "comment": "炮8退1。"
          },
          {
            "ucci": "h2f2",
            "comment": "炮二平四。"
          },
          {
            "ucci": "h8c8",
            "comment": "炮8平3。"
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
            "ucci": "g4b4",
            "comment": "车三平八。"
          },
          {
            "ucci": "c7d5",
            "comment": "马3进4。"
          },
          {
            "ucci": "b4d4",
            "comment": "车八平六。"
          },
          {
            "ucci": "i8d8",
            "comment": "车9平4。"
          },
          {
            "ucci": "h0h6",
            "comment": "车二进六。"
          },
          {
            "ucci": "c8c6",
            "comment": "炮3进2。"
          },
          {
            "ucci": "h6h1",
            "comment": "车二退五。"
          },
          {
            "ucci": "c6c3",
            "comment": "炮3进3。"
          },
          {
            "ucci": "c0a2",
            "comment": "相七进九。"
          },
          {
            "ucci": "g7f5",
            "comment": "马7进6。"
          },
          {
            "ucci": "d4g4",
            "comment": "车六平三。"
          },
          {
            "ucci": "d5e3",
            "comment": "马4进5。"
          },
          {
            "ucci": "g4g9",
            "comment": "车三进五。"
          },
          {
            "ucci": "f5d4",
            "comment": "马6进4。"
          },
          {
            "ucci": "c2e3",
            "comment": "马七进五。"
          },
          {
            "ucci": "b7b0",
            "comment": "炮2进7。"
          },
          {
            "ucci": "a2c0",
            "comment": "相九退七。"
          },
          {
            "ucci": "d4e2",
            "comment": "马4进5。"
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
            "ucci": "h1h9",
            "comment": "车二进八。"
          },
          {
            "ucci": "f9f8",
            "comment": "将6进1。"
          },
          {
            "ucci": "h9h8",
            "comment": "车二退一。"
          },
          {
            "ucci": "f8f9",
            "comment": "将6退1。"
          },
          {
            "ucci": "h8d8",
            "comment": "车二平六。"
          },
          {
            "ucci": "e2c1",
            "comment": "马5进3。"
          },
          {
            "ucci": "e3d1",
            "comment": "马五退六。"
          },
          {
            "ucci": "c3c0",
            "comment": "炮3进3。"
          },
          {
            "ucci": "e0e1",
            "comment": "帅五进一。"
          },
          {
            "ucci": "b9b2",
            "comment": "车2进7。"
          },
          {
            "ucci": "g0e2",
            "comment": "相三进五。"
          },
          {
            "ucci": "b0b1",
            "comment": "炮2退1。"
          },
          {
            "ucci": "f2b2",
            "comment": "炮四平八。"
          },
          {
            "ucci": "c1d3",
            "comment": "马3退4。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-62",
    "kind": "opening",
    "title": "梅花谱 · 第8局挺马前卒破直横车边马",
    "subtitle": "《梅花谱》第8局挺马前卒破直横车边马",
    "level": 3,
    "order": 65,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第8局挺马前卒破直横车边马",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64451/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b2e2",
            "comment": "炮八平五。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
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
            "ucci": "b0b6",
            "comment": "车八进六。"
          },
          {
            "ucci": "h9g7",
            "comment": "马8进7。"
          },
          {
            "ucci": "h0i2",
            "comment": "马二进一。"
          },
          {
            "ucci": "g9e7",
            "comment": "象7进5。"
          },
          {
            "ucci": "i0i1",
            "comment": "车一进一。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "i1f1",
            "comment": "车一平四。"
          },
          {
            "ucci": "c7d5",
            "comment": "马3进4。"
          },
          {
            "ucci": "b6d6",
            "comment": "车八平六。"
          },
          {
            "ucci": "d5c3",
            "comment": "马4进3。"
          },
          {
            "ucci": "f1f6",
            "comment": "车四进五。"
          },
          {
            "ucci": "f9e8",
            "comment": "士6进5。"
          },
          {
            "ucci": "d6b6",
            "comment": "车六平八。"
          },
          {
            "ucci": "c3d5",
            "comment": "马3退4。"
          },
          {
            "ucci": "f6g6",
            "comment": "车四平三。"
          },
          {
            "ucci": "c5c4",
            "comment": "卒3进1。"
          },
          {
            "ucci": "b6b5",
            "comment": "车八退一。"
          },
          {
            "ucci": "d5f4",
            "comment": "马4进6。"
          },
          {
            "ucci": "g6g7",
            "comment": "车三进一。"
          },
          {
            "ucci": "b7g7",
            "comment": "炮2平7。"
          },
          {
            "ucci": "b5b9",
            "comment": "车八进四。"
          },
          {
            "ucci": "g5g4",
            "comment": "卒7进1。"
          },
          {
            "ucci": "g3g4",
            "comment": "兵三进一。"
          },
          {
            "ucci": "g7g0",
            "comment": "炮7进7。"
          },
          {
            "ucci": "f0e1",
            "comment": "仕四进五。"
          },
          {
            "ucci": "i9g9",
            "comment": "车9平7。"
          },
          {
            "ucci": "e2f2",
            "comment": "炮五平四。"
          },
          {
            "ucci": "g9g4",
            "comment": "车7进5。"
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
            "ucci": "h2e2",
            "comment": "炮二平五。"
          },
          {
            "ucci": "g0i0",
            "comment": "炮7平9。"
          },
          {
            "ucci": "f2h2",
            "comment": "炮四平二。"
          },
          {
            "ucci": "g4g0",
            "comment": "车7进4。"
          },
          {
            "ucci": "e1f0",
            "comment": "仕五退四。"
          },
          {
            "ucci": "g0g2",
            "comment": "车7退2。"
          },
          {
            "ucci": "h2h0",
            "comment": "炮二退二。"
          },
          {
            "ucci": "g2e2",
            "comment": "车7平5。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "e2i2",
            "comment": "车5平9。"
          },
          {
            "ucci": "c2b0",
            "comment": "马七退八。"
          },
          {
            "ucci": "h7g7",
            "comment": "炮8平7。"
          },
          {
            "ucci": "h0g0",
            "comment": "炮二平三。"
          },
          {
            "ucci": "i2g2",
            "comment": "车9平7。"
          },
          {
            "ucci": "g0h0",
            "comment": "炮三平二。"
          },
          {
            "ucci": "g2b2",
            "comment": "车7平2。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-63",
    "kind": "opening",
    "title": "梅花谱 · 第2局横车破左炮平七路取马",
    "subtitle": "《梅花谱》第2局横车破左炮平七路取马",
    "level": 3,
    "order": 66,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第2局横车破左炮平七路取马",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64446/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "h2d2",
            "comment": "炮二平六。"
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
            "ucci": "h0h4",
            "comment": "车二进四。"
          },
          {
            "ucci": "i8d8",
            "comment": "车9平4。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "h4c4",
            "comment": "车二平七。"
          },
          {
            "ucci": "e6e5",
            "comment": "卒5进1。"
          },
          {
            "ucci": "c4c6",
            "comment": "车七进二。"
          },
          {
            "ucci": "a9a7",
            "comment": "车1进2。"
          },
          {
            "ucci": "b2c2",
            "comment": "炮八平七。"
          },
          {
            "ucci": "c7e6",
            "comment": "马3进5。"
          },
          {
            "ucci": "c6b6",
            "comment": "车七平八。"
          },
          {
            "ucci": "e5e4",
            "comment": "卒5进1。"
          },
          {
            "ucci": "c2c9",
            "comment": "炮七进七。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
          },
          {
            "ucci": "e3e4",
            "comment": "兵五进一。"
          },
          {
            "ucci": "e7e4",
            "comment": "炮5进3。"
          },
          {
            "ucci": "d2e2",
            "comment": "炮六平五。"
          },
          {
            "ucci": "e6f4",
            "comment": "马5进6。"
          },
          {
            "ucci": "g2e3",
            "comment": "马三进五。"
          },
          {
            "ucci": "e4e2",
            "comment": "炮5进2。"
          },
          {
            "ucci": "c0e2",
            "comment": "相七进五。"
          },
          {
            "ucci": "f4h3",
            "comment": "马6进8。"
          },
          {
            "ucci": "e2c4",
            "comment": "相五进七。"
          },
          {
            "ucci": "d8d3",
            "comment": "车4进5。"
          },
          {
            "ucci": "b0d1",
            "comment": "马八进六。"
          },
          {
            "ucci": "b7e7",
            "comment": "炮2平5。"
          },
          {
            "ucci": "a0a1",
            "comment": "车九进一。"
          },
          {
            "ucci": "a7d7",
            "comment": "车1平4。"
          },
          {
            "ucci": "c9a9",
            "comment": "炮七平九。"
          },
          {
            "ucci": "d3e3",
            "comment": "前车平5。"
          },
          {
            "ucci": "b6b9",
            "comment": "车八进三。"
          },
          {
            "ucci": "d7d9",
            "comment": "车4退2。"
          },
          {
            "ucci": "a9d9",
            "comment": "炮九平六。"
          },
          {
            "ucci": "e3c3",
            "comment": "车5平3。"
          },
          {
            "ucci": "e1f2",
            "comment": "仕五进四。"
          },
          {
            "ucci": "g7e6",
            "comment": "马7进5。"
          },
          {
            "ucci": "c4e2",
            "comment": "相七退五。"
          },
          {
            "ucci": "e6d4",
            "comment": "马5进4。"
          },
          {
            "ucci": "e2c4",
            "comment": "相五进七。"
          },
          {
            "ucci": "h3g1",
            "comment": "马8进7。"
          },
          {
            "ucci": "e0e1",
            "comment": "帅五进一。"
          },
          {
            "ucci": "c3e3",
            "comment": "车3平5。"
          },
          {
            "ucci": "e1f1",
            "comment": "帅五平四。"
          },
          {
            "ucci": "e7f7",
            "comment": "炮5平6。"
          },
          {
            "ucci": "f2e1",
            "comment": "前仕退五。"
          },
          {
            "ucci": "d4f5",
            "comment": "马4退6。"
          },
          {
            "ucci": "e1f2",
            "comment": "仕五进四。"
          },
          {
            "ucci": "f5g3",
            "comment": "马6进7。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-64",
    "kind": "opening",
    "title": "梅花谱 · 第2局攻右车守河口后上马打车",
    "subtitle": "《梅花谱》第2局攻右车守河口后上马打车",
    "level": 3,
    "order": 67,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第2局攻右车守河口后上马打车",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64462/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b0a2",
            "comment": "马八进九。"
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
            "ucci": "i9h9",
            "comment": "车9平8。"
          },
          {
            "ucci": "h0h4",
            "comment": "车二进四。"
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
            "ucci": "a3a4",
            "comment": "兵九进一。"
          },
          {
            "ucci": "b5f5",
            "comment": "车2平6。"
          },
          {
            "ucci": "a2b4",
            "comment": "马九进八。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "c3c4",
            "comment": "兵七进一。"
          },
          {
            "ucci": "i6i5",
            "comment": "卒9进1。"
          },
          {
            "ucci": "c4c5",
            "comment": "兵七进一。"
          },
          {
            "ucci": "i7h5",
            "comment": "马9进8。"
          },
          {
            "ucci": "h4d4",
            "comment": "车二平六。"
          },
          {
            "ucci": "h5f4",
            "comment": "马8进6。"
          },
          {
            "ucci": "c5c6",
            "comment": "兵七进一。"
          },
          {
            "ucci": "f4g2",
            "comment": "马6进7。"
          },
          {
            "ucci": "b2g2",
            "comment": "炮八平三。"
          },
          {
            "ucci": "h7h0",
            "comment": "炮8进7。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "e7e3",
            "comment": "炮5进4。"
          },
          {
            "ucci": "e0d0",
            "comment": "帅五平六。"
          },
          {
            "ucci": "f9e8",
            "comment": "士6进5。"
          },
          {
            "ucci": "c6c7",
            "comment": "兵七进一。"
          },
          {
            "ucci": "g9e7",
            "comment": "象7进5。"
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
            "ucci": "g2f2",
            "comment": "炮三平四。"
          },
          {
            "ucci": "f5b5",
            "comment": "车6平2。"
          },
          {
            "ucci": "b4d5",
            "comment": "马八进六。"
          },
          {
            "ucci": "b5b0",
            "comment": "车2进5。"
          },
          {
            "ucci": "d5f4",
            "comment": "马六退四。"
          },
          {
            "ucci": "e3f3",
            "comment": "炮5平6。"
          },
          {
            "ucci": "d4d9",
            "comment": "车六进五。"
          },
          {
            "ucci": "e8d9",
            "comment": "士5退4。"
          },
          {
            "ucci": "f4g6",
            "comment": "马四进三。"
          },
          {
            "ucci": "f3e3",
            "comment": "炮6平5。"
          },
          {
            "ucci": "g6f4",
            "comment": "马三退四。"
          },
          {
            "ucci": "e3f3",
            "comment": "炮5平6。"
          },
          {
            "ucci": "f4h5",
            "comment": "马四进二。"
          },
          {
            "ucci": "f3e3",
            "comment": "炮6平5。"
          },
          {
            "ucci": "h5g7",
            "comment": "马二进三。"
          },
          {
            "ucci": "f9f8",
            "comment": "将6进1。"
          },
          {
            "ucci": "g7f5",
            "comment": "马三退四。"
          },
          {
            "ucci": "e3f3",
            "comment": "炮5平6。"
          },
          {
            "ucci": "f5e3",
            "comment": "马四退五。"
          },
          {
            "ucci": "f3i3",
            "comment": "炮6平9。"
          },
          {
            "ucci": "e3f5",
            "comment": "马五进四。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-65",
    "kind": "opening",
    "title": "梅花谱 · 第4局退炮破巡河车挺兵兑卒",
    "subtitle": "《梅花谱》第4局退炮破巡河车挺兵兑卒",
    "level": 3,
    "order": 68,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第4局退炮破巡河车挺兵兑卒",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64455/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b2e2",
            "comment": "炮八平五。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
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
            "ucci": "h9g7",
            "comment": "马8进7。"
          },
          {
            "ucci": "g3g4",
            "comment": "兵三进一。"
          },
          {
            "ucci": "g5g4",
            "comment": "卒7进1。"
          },
          {
            "ucci": "b4g4",
            "comment": "车八平三。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "c3c4",
            "comment": "兵七进一。"
          },
          {
            "ucci": "h7h8",
            "comment": "炮8退1。"
          },
          {
            "ucci": "h0i2",
            "comment": "马二进一。"
          },
          {
            "ucci": "h8g8",
            "comment": "炮8平7。"
          },
          {
            "ucci": "g4d4",
            "comment": "车三平六。"
          },
          {
            "ucci": "c5c4",
            "comment": "卒3进1。"
          },
          {
            "ucci": "d4c4",
            "comment": "车六平七。"
          },
          {
            "ucci": "c7d5",
            "comment": "马3进4。"
          },
          {
            "ucci": "c4d4",
            "comment": "车七平六。"
          },
          {
            "ucci": "b7c7",
            "comment": "炮2平3。"
          },
          {
            "ucci": "c0a2",
            "comment": "相七进九。"
          },
          {
            "ucci": "b9b5",
            "comment": "车2进4。"
          },
          {
            "ucci": "h2f2",
            "comment": "炮二平四。"
          },
          {
            "ucci": "c9e7",
            "comment": "象3进5。"
          },
          {
            "ucci": "i0h0",
            "comment": "车一平二。"
          },
          {
            "ucci": "g8d8",
            "comment": "炮7平4。"
          },
          {
            "ucci": "d4g4",
            "comment": "车六平三。"
          },
          {
            "ucci": "d8c8",
            "comment": "炮4平3。"
          },
          {
            "ucci": "c2d4",
            "comment": "马七进六。"
          },
          {
            "ucci": "b5b1",
            "comment": "车2进4。"
          },
          {
            "ucci": "e2c2",
            "comment": "炮五平七。"
          },
          {
            "ucci": "d5b4",
            "comment": "马4进2。"
          },
          {
            "ucci": "g0e2",
            "comment": "相三进五。"
          },
          {
            "ucci": "c8c2",
            "comment": "后炮进6。"
          },
          {
            "ucci": "f2c2",
            "comment": "炮四平七。"
          },
          {
            "ucci": "b4a2",
            "comment": "马2进1。"
          },
          {
            "ucci": "f0e1",
            "comment": "仕四进五。"
          },
          {
            "ucci": "i9i8",
            "comment": "车9进1。"
          },
          {
            "ucci": "g4f4",
            "comment": "车三平四。"
          },
          {
            "ucci": "a2c1",
            "comment": "马1进3。"
          },
          {
            "ucci": "e0f0",
            "comment": "帅五平四。"
          },
          {
            "ucci": "c7c8",
            "comment": "炮3退1。"
          },
          {
            "ucci": "h0h7",
            "comment": "车二进七。"
          },
          {
            "ucci": "c8f8",
            "comment": "炮3平6。"
          },
          {
            "ucci": "e1f2",
            "comment": "仕五进四。"
          },
          {
            "ucci": "b1b0",
            "comment": "车2进1。"
          },
          {
            "ucci": "e2c0",
            "comment": "相五退七。"
          },
          {
            "ucci": "b0b4",
            "comment": "车2退4。"
          },
          {
            "ucci": "h7g7",
            "comment": "车二平三。"
          },
          {
            "ucci": "b4d4",
            "comment": "车2平4。"
          },
          {
            "ucci": "g7e7",
            "comment": "车三平五。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
          },
          {
            "ucci": "f4f6",
            "comment": "车四进二。"
          },
          {
            "ucci": "d4d0",
            "comment": "车4进4。"
          },
          {
            "ucci": "f0f1",
            "comment": "帅四进一。"
          },
          {
            "ucci": "i8h8",
            "comment": "车9平8。"
          },
          {
            "ucci": "i2g3",
            "comment": "马一进三。"
          },
          {
            "ucci": "d0d1",
            "comment": "车4退1。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-66",
    "kind": "opening",
    "title": "梅花谱 · 第4局攻右车过河后平炮兑车",
    "subtitle": "《梅花谱》第4局攻右车过河后平炮兑车",
    "level": 3,
    "order": 69,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第4局攻右车过河后平炮兑车",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64460/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b0a2",
            "comment": "马八进九。"
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
            "ucci": "i9h9",
            "comment": "车9平8。"
          },
          {
            "ucci": "h0h4",
            "comment": "车二进四。"
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
            "ucci": "b9b3",
            "comment": "车2进6。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "h7g7",
            "comment": "炮8平7。"
          },
          {
            "ucci": "h4d4",
            "comment": "车二平六。"
          },
          {
            "ucci": "h9h1",
            "comment": "车8进8。"
          },
          {
            "ucci": "g3g4",
            "comment": "兵三进一。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
          },
          {
            "ucci": "e2d2",
            "comment": "炮五平六。"
          },
          {
            "ucci": "g5g4",
            "comment": "卒7进1。"
          },
          {
            "ucci": "d2d3",
            "comment": "炮六进一。"
          },
          {
            "ucci": "b3c3",
            "comment": "车2平3。"
          },
          {
            "ucci": "b2b1",
            "comment": "炮八退一。"
          },
          {
            "ucci": "c3d3",
            "comment": "车3平4。"
          },
          {
            "ucci": "d4d3",
            "comment": "车六退一。"
          },
          {
            "ucci": "h1h2",
            "comment": "车8退1。"
          },
          {
            "ucci": "c0e2",
            "comment": "相七进五。"
          },
          {
            "ucci": "h2g2",
            "comment": "车8平7。"
          },
          {
            "ucci": "a2c3",
            "comment": "马九进七。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "c3d5",
            "comment": "马七进六。"
          },
          {
            "ucci": "c7d5",
            "comment": "马3进4。"
          },
          {
            "ucci": "d3d5",
            "comment": "车六进二。"
          },
          {
            "ucci": "e7e3",
            "comment": "炮5进4。"
          },
          {
            "ucci": "b1c1",
            "comment": "炮八平七。"
          },
          {
            "ucci": "g9e7",
            "comment": "象7进5。"
          },
          {
            "ucci": "b0b6",
            "comment": "车八进六。"
          },
          {
            "ucci": "g4f4",
            "comment": "卒7平6。"
          },
          {
            "ucci": "e0d0",
            "comment": "帅五平六。"
          },
          {
            "ucci": "f9e8",
            "comment": "士6进5。"
          },
          {
            "ucci": "b6e6",
            "comment": "车八平五。"
          },
          {
            "ucci": "e3c3",
            "comment": "炮5平3。"
          },
          {
            "ucci": "e6e3",
            "comment": "车五退三。"
          },
          {
            "ucci": "c3c2",
            "comment": "炮3进1。"
          },
          {
            "ucci": "d5d2",
            "comment": "车六退三。"
          },
          {
            "ucci": "g7g6",
            "comment": "炮7进1。"
          },
          {
            "ucci": "c1d1",
            "comment": "炮七平六。"
          },
          {
            "ucci": "g6c6",
            "comment": "炮7平3。"
          },
          {
            "ucci": "d1d9",
            "comment": "炮六进八。"
          },
          {
            "ucci": "c6c7",
            "comment": "后炮退1。"
          },
          {
            "ucci": "d9d8",
            "comment": "炮六退一。"
          },
          {
            "ucci": "i7g6",
            "comment": "马9进7。"
          },
          {
            "ucci": "d8b8",
            "comment": "炮六平八。"
          },
          {
            "ucci": "e9f9",
            "comment": "将5平6。"
          },
          {
            "ucci": "b8b9",
            "comment": "炮八进一。"
          },
          {
            "ucci": "f9f8",
            "comment": "将6进1。"
          },
          {
            "ucci": "d2d6",
            "comment": "车六进四。"
          },
          {
            "ucci": "c7d7",
            "comment": "后炮平4。"
          },
          {
            "ucci": "d6f6",
            "comment": "车六平四。"
          },
          {
            "ucci": "e8f7",
            "comment": "士5进6。"
          },
          {
            "ucci": "e3e6",
            "comment": "车五进三。"
          },
          {
            "ucci": "g6h4",
            "comment": "马7进8。"
          },
          {
            "ucci": "f6h6",
            "comment": "车四平二。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-67",
    "kind": "opening",
    "title": "梅花谱 · 第3局攻直车守河再补士角炮",
    "subtitle": "《梅花谱》第3局攻直车守河再补士角炮",
    "level": 3,
    "order": 70,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《梅花谱》第3局攻直车守河再补士角炮",
      "author": "清·王再越",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/64440/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自清代《梅花谱》。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "h9h5",
            "comment": "车8进4。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "b7d7",
            "comment": "炮2平4。"
          },
          {
            "ucci": "c2b4",
            "comment": "马七进八。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "c4c5",
            "comment": "兵七进一。"
          },
          {
            "ucci": "h5c5",
            "comment": "车8平3。"
          },
          {
            "ucci": "c0a2",
            "comment": "相七进九。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "a6a5",
            "comment": "卒1进1。"
          },
          {
            "ucci": "a0c0",
            "comment": "车九平七。"
          },
          {
            "ucci": "c5c0",
            "comment": "车3进5。"
          },
          {
            "ucci": "a2c0",
            "comment": "相九退七。"
          },
          {
            "ucci": "i6i5",
            "comment": "卒9进1。"
          },
          {
            "ucci": "g0i2",
            "comment": "相三进一。"
          },
          {
            "ucci": "g9i7",
            "comment": "象7进9。"
          },
          {
            "ucci": "g3g4",
            "comment": "兵三进一。"
          },
          {
            "ucci": "g5g4",
            "comment": "卒7进1。"
          },
          {
            "ucci": "i2g4",
            "comment": "相一进三。"
          },
          {
            "ucci": "i7g9",
            "comment": "象9退7。"
          },
          {
            "ucci": "g4i2",
            "comment": "相三退一。"
          },
          {
            "ucci": "g9i7",
            "comment": "象7进9。"
          },
          {
            "ucci": "i2g0",
            "comment": "相一退三。"
          },
          {
            "ucci": "i7g9",
            "comment": "象9退7。"
          },
          {
            "ucci": "g2f4",
            "comment": "马三进四。"
          },
          {
            "ucci": "e7e3",
            "comment": "炮5进4。"
          },
          {
            "ucci": "e0d0",
            "comment": "帅五平六。"
          },
          {
            "ucci": "g9e7",
            "comment": "象7进5。"
          },
          {
            "ucci": "f4e6",
            "comment": "马四进五。"
          },
          {
            "ucci": "e3d3",
            "comment": "炮5平4。"
          },
          {
            "ucci": "b4d5",
            "comment": "马八进六。"
          },
          {
            "ucci": "g7e6",
            "comment": "马7进5。"
          },
          {
            "ucci": "e2e7",
            "comment": "炮五进五。"
          },
          {
            "ucci": "e8f7",
            "comment": "士5进6。"
          },
          {
            "ucci": "b2h2",
            "comment": "炮八平二。"
          },
          {
            "ucci": "d3h3",
            "comment": "前炮平8。"
          },
          {
            "ucci": "d5b6",
            "comment": "马六进八。"
          },
          {
            "ucci": "d7b7",
            "comment": "炮4平2。"
          },
          {
            "ucci": "h2e2",
            "comment": "炮二平五。"
          },
          {
            "ucci": "h3h6",
            "comment": "炮8退3。"
          },
          {
            "ucci": "e7e8",
            "comment": "前炮进一。"
          },
          {
            "ucci": "b7b9",
            "comment": "炮2退2。"
          },
          {
            "ucci": "d8c8",
            "comment": "车六平七。"
          },
          {
            "ucci": "b9b7",
            "comment": "炮2进2。"
          },
          {
            "ucci": "b6d7",
            "comment": "马八进六。"
          },
          {
            "ucci": "e9d9",
            "comment": "将5平4。"
          },
          {
            "ucci": "e2d2",
            "comment": "后炮平六。"
          },
          {
            "ucci": "e6d4",
            "comment": "马5进4。"
          },
          {
            "ucci": "e8e6",
            "comment": "炮五退二。"
          },
          {
            "ucci": "a7b5",
            "comment": "马1进2。"
          },
          {
            "ucci": "e6d6",
            "comment": "炮五平六。"
          },
          {
            "ucci": "b5d6",
            "comment": "马2退4。"
          },
          {
            "ucci": "d2d6",
            "comment": "炮六进四。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-68",
    "kind": "opening",
    "title": "崇本堂梅花谱 · 横车夹马炮破单提马",
    "subtitle": "《崇本堂梅花谱》横车夹马炮破单提马",
    "level": 2,
    "order": 71,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《崇本堂梅花谱》横车夹马炮破单提马",
      "author": "崇本堂梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/67994/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自崇本堂梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "i0i1",
            "comment": "车一进一。"
          },
          {
            "ucci": "b9a7",
            "comment": "马2进1。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "b7d7",
            "comment": "炮2平4。"
          },
          {
            "ucci": "b2b7",
            "comment": "炮八进五。"
          },
          {
            "ucci": "g9e7",
            "comment": "象7进5。"
          },
          {
            "ucci": "e3e4",
            "comment": "兵五进一。"
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
            "ucci": "f9e8",
            "comment": "士6进5。"
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
            "ucci": "g2e3",
            "comment": "马三进五。"
          },
          {
            "ucci": "h7h0",
            "comment": "炮8进7。"
          },
          {
            "ucci": "e3f5",
            "comment": "马五进四。"
          },
          {
            "ucci": "h9g9",
            "comment": "车8平7。"
          },
          {
            "ucci": "f5e7",
            "comment": "马四进五。"
          },
          {
            "ucci": "c9e7",
            "comment": "象3进5。"
          },
          {
            "ucci": "b7e7",
            "comment": "炮八平五。"
          },
          {
            "ucci": "e9f9",
            "comment": "将5平6。"
          },
          {
            "ucci": "i1f1",
            "comment": "车一平四。"
          },
          {
            "ucci": "e8f7",
            "comment": "士5进6。"
          },
          {
            "ucci": "e7a7",
            "comment": "前炮平九。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-69",
    "kind": "opening",
    "title": "崇本堂梅花谱 · 顺炮横车破士角炮",
    "subtitle": "《崇本堂梅花谱》顺炮横车破士角炮",
    "level": 2,
    "order": 72,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《崇本堂梅花谱》顺炮横车破士角炮",
      "author": "崇本堂梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/67988/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自崇本堂梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "h9h4",
            "comment": "车8进5。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "h4c4",
            "comment": "车8平3。"
          },
          {
            "ucci": "c2d4",
            "comment": "马七进六。"
          },
          {
            "ucci": "b7d7",
            "comment": "炮2平4。"
          },
          {
            "ucci": "d4f5",
            "comment": "马六进四。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
          },
          {
            "ucci": "f5e7",
            "comment": "马四进五。"
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
            "ucci": "c4d4",
            "comment": "车3平4。"
          },
          {
            "ucci": "a0a1",
            "comment": "车九进一。"
          },
          {
            "ucci": "a9b9",
            "comment": "车1平2。"
          },
          {
            "ucci": "a1h1",
            "comment": "车九平二。"
          },
          {
            "ucci": "b9b7",
            "comment": "车2进2。"
          },
          {
            "ucci": "d8e8",
            "comment": "车六平五。"
          },
          {
            "ucci": "e9d9",
            "comment": "将5平4。"
          },
          {
            "ucci": "e8e9",
            "comment": "车五进一。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-70",
    "kind": "opening",
    "title": "崇本堂梅花谱 · 屏风马破当头炮",
    "subtitle": "《崇本堂梅花谱》屏风马破当头炮",
    "level": 2,
    "order": 73,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《崇本堂梅花谱》屏风马破当头炮",
      "author": "崇本堂梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/67982/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自崇本堂梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "h0h6",
            "comment": "车二进六。"
          },
          {
            "ucci": "b7b6",
            "comment": "炮2进1。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "e3e4",
            "comment": "兵五进一。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
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
            "ucci": "h6g6",
            "comment": "车二平三。"
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
            "ucci": "h7e7",
            "comment": "炮8平5。"
          },
          {
            "ucci": "g6g4",
            "comment": "车三退二。"
          },
          {
            "ucci": "e5e4",
            "comment": "卒5进1。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "c7e6",
            "comment": "马3进5。"
          },
          {
            "ucci": "c0e2",
            "comment": "相七进五。"
          },
          {
            "ucci": "e4f4",
            "comment": "卒5平6。"
          },
          {
            "ucci": "g4g8",
            "comment": "车三进四。"
          },
          {
            "ucci": "e7g7",
            "comment": "炮5平7。"
          },
          {
            "ucci": "g8i8",
            "comment": "车三平一。"
          },
          {
            "ucci": "g7g2",
            "comment": "炮7进5。"
          },
          {
            "ucci": "a0d0",
            "comment": "车九平六。"
          },
          {
            "ucci": "g2c2",
            "comment": "炮7平3。"
          },
          {
            "ucci": "d0d6",
            "comment": "车六进六。"
          },
          {
            "ucci": "b6b8",
            "comment": "炮2退2。"
          },
          {
            "ucci": "i8i6",
            "comment": "车一退二。"
          },
          {
            "ucci": "e6g5",
            "comment": "马5进7。"
          },
          {
            "ucci": "i6g6",
            "comment": "车一平三。"
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
    "id": "opening-classic-71",
    "kind": "opening",
    "title": "崇本堂梅花谱 · 直车破单提马局",
    "subtitle": "《崇本堂梅花谱》直车破单提马局",
    "level": 3,
    "order": 74,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《崇本堂梅花谱》直车破单提马局",
      "author": "崇本堂梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/67990/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自崇本堂梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "g9e7",
            "comment": "象7进5。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
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
            "ucci": "f9e8",
            "comment": "士6进5。"
          },
          {
            "ucci": "e4e5",
            "comment": "兵五进一。"
          },
          {
            "ucci": "f5g3",
            "comment": "马6进7。"
          },
          {
            "ucci": "c0e2",
            "comment": "相七进五。"
          },
          {
            "ucci": "b7d7",
            "comment": "炮2平4。"
          },
          {
            "ucci": "b2b7",
            "comment": "炮八进五。"
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
            "ucci": "h9f9",
            "comment": "车8平6。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "f9f3",
            "comment": "车6进6。"
          },
          {
            "ucci": "g2e3",
            "comment": "马三进五。"
          },
          {
            "ucci": "g5g4",
            "comment": "卒7进1。"
          },
          {
            "ucci": "h6i6",
            "comment": "车二平一。"
          },
          {
            "ucci": "h7i7",
            "comment": "炮8平9。"
          },
          {
            "ucci": "i6g6",
            "comment": "车一平三。"
          },
          {
            "ucci": "g3f1",
            "comment": "马7进6。"
          },
          {
            "ucci": "e3f5",
            "comment": "马五进四。"
          },
          {
            "ucci": "e9f9",
            "comment": "将5平6。"
          },
          {
            "ucci": "b7b8",
            "comment": "炮八进一。"
          },
          {
            "ucci": "f3c3",
            "comment": "车6平3。"
          },
          {
            "ucci": "g6g9",
            "comment": "车三进三。"
          },
          {
            "ucci": "e7g9",
            "comment": "象5退7。"
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
    "id": "opening-classic-72",
    "kind": "opening",
    "title": "崇本堂梅花谱 · 屏风马局",
    "subtitle": "《崇本堂梅花谱》屏风马局",
    "level": 3,
    "order": 75,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《崇本堂梅花谱》屏风马局",
      "author": "崇本堂梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/67985/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自崇本堂梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "g6g5",
            "comment": "卒7进1。"
          },
          {
            "ucci": "c3c4",
            "comment": "兵七进一。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "c9e7",
            "comment": "象3进5。"
          },
          {
            "ucci": "h0h6",
            "comment": "车二进六。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
          },
          {
            "ucci": "h6g6",
            "comment": "车二平三。"
          },
          {
            "ucci": "h7h1",
            "comment": "炮8进6。"
          },
          {
            "ucci": "g6g7",
            "comment": "车三进一。"
          },
          {
            "ucci": "h1g1",
            "comment": "炮8平7。"
          },
          {
            "ucci": "g2e1",
            "comment": "马三退五。"
          },
          {
            "ucci": "b7b3",
            "comment": "炮2进4。"
          },
          {
            "ucci": "e3e4",
            "comment": "兵五进一。"
          },
          {
            "ucci": "a9d9",
            "comment": "车1平4。"
          },
          {
            "ucci": "g7g6",
            "comment": "车三退一。"
          },
          {
            "ucci": "d9d1",
            "comment": "车4进8。"
          },
          {
            "ucci": "e2e6",
            "comment": "炮五进四。"
          },
          {
            "ucci": "c7e6",
            "comment": "马3进5。"
          },
          {
            "ucci": "g6e6",
            "comment": "车三平五。"
          },
          {
            "ucci": "e9d9",
            "comment": "将5平4。"
          },
          {
            "ucci": "e1f3",
            "comment": "马五进四。"
          },
          {
            "ucci": "b3g3",
            "comment": "炮2平7。"
          },
          {
            "ucci": "f3g1",
            "comment": "马四退三。"
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
            "ucci": "g0d0",
            "comment": "炮7平4。"
          },
          {
            "ucci": "c0a2",
            "comment": "相七进九。"
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
            "ucci": "d0f0",
            "comment": "炮4平6。"
          },
          {
            "ucci": "g1i2",
            "comment": "马三进一。"
          },
          {
            "ucci": "d1i1",
            "comment": "车4平9。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-73",
    "kind": "opening",
    "title": "崇本堂梅花谱 · 直车马炮局",
    "subtitle": "《崇本堂梅花谱》直车马炮局",
    "level": 3,
    "order": 76,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《崇本堂梅花谱》直车马炮局",
      "author": "崇本堂梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/67989/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自崇本堂梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "g2e3",
            "comment": "马三进五。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
          },
          {
            "ucci": "e2e5",
            "comment": "炮五进三。"
          },
          {
            "ucci": "a9d9",
            "comment": "车1平4。"
          },
          {
            "ucci": "b2e2",
            "comment": "炮八平五。"
          },
          {
            "ucci": "b7b3",
            "comment": "炮2进4。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "a0b0",
            "comment": "车九平八。"
          },
          {
            "ucci": "b3e3",
            "comment": "炮2平5。"
          },
          {
            "ucci": "c2e3",
            "comment": "马七进五。"
          },
          {
            "ucci": "d9d3",
            "comment": "车4进6。"
          },
          {
            "ucci": "e3f5",
            "comment": "马五进四。"
          },
          {
            "ucci": "d3d5",
            "comment": "车4退2。"
          },
          {
            "ucci": "f5e3",
            "comment": "马四退五。"
          },
          {
            "ucci": "d5d4",
            "comment": "车4进1。"
          },
          {
            "ucci": "h0h7",
            "comment": "车二进七。"
          },
          {
            "ucci": "i9h9",
            "comment": "车9平8。"
          },
          {
            "ucci": "h7f7",
            "comment": "车二平四。"
          },
          {
            "ucci": "e9d9",
            "comment": "将5平4。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "e8f7",
            "comment": "士5进6。"
          },
          {
            "ucci": "e2d2",
            "comment": "后炮平六。"
          },
          {
            "ucci": "d4e4",
            "comment": "车4平5。"
          },
          {
            "ucci": "b0b4",
            "comment": "车八进四。"
          },
          {
            "ucci": "e4e5",
            "comment": "车5退1。"
          },
          {
            "ucci": "e3d5",
            "comment": "马五进六。"
          },
          {
            "ucci": "d9e9",
            "comment": "将4平5。"
          },
          {
            "ucci": "d5c7",
            "comment": "马六进七。"
          },
          {
            "ucci": "e7c9",
            "comment": "象5退3。"
          },
          {
            "ucci": "b4b9",
            "comment": "车八进五。"
          },
          {
            "ucci": "g9e7",
            "comment": "象7进5。"
          },
          {
            "ucci": "d2d8",
            "comment": "炮六进六。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-74",
    "kind": "opening",
    "title": "崇本堂梅花谱 · 顺炮横车变叠炮局",
    "subtitle": "《崇本堂梅花谱》顺炮横车变叠炮局",
    "level": 3,
    "order": 77,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《崇本堂梅花谱》顺炮横车变叠炮局",
      "author": "崇本堂梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/67976/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自崇本堂梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b2c2",
            "comment": "炮八平七。"
          },
          {
            "ucci": "a6a5",
            "comment": "卒1进1。"
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
            "ucci": "a0b0",
            "comment": "车九平八。"
          },
          {
            "ucci": "b7b5",
            "comment": "炮2进2。"
          },
          {
            "ucci": "b0b4",
            "comment": "车八进四。"
          },
          {
            "ucci": "i8d8",
            "comment": "车9平4。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "d8d5",
            "comment": "车4进3。"
          },
          {
            "ucci": "h0h6",
            "comment": "车二进六。"
          },
          {
            "ucci": "e7b7",
            "comment": "炮5平2。"
          },
          {
            "ucci": "b4f4",
            "comment": "车八平四。"
          },
          {
            "ucci": "b5b6",
            "comment": "前炮退1。"
          },
          {
            "ucci": "h6g6",
            "comment": "车二平三。"
          },
          {
            "ucci": "c9e7",
            "comment": "象3进5。"
          },
          {
            "ucci": "f4f8",
            "comment": "车四进四。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
          },
          {
            "ucci": "c2d2",
            "comment": "炮七平六。"
          },
          {
            "ucci": "a7b5",
            "comment": "马1进2。"
          },
          {
            "ucci": "d2d0",
            "comment": "炮六退二。"
          },
          {
            "ucci": "d5d1",
            "comment": "车4进4。"
          },
          {
            "ucci": "e3e4",
            "comment": "兵五进一。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "g6g4",
            "comment": "车三退二。"
          },
          {
            "ucci": "b7b8",
            "comment": "后炮退1。"
          },
          {
            "ucci": "f8f3",
            "comment": "车四退五。"
          },
          {
            "ucci": "b6b7",
            "comment": "前炮退1。"
          },
          {
            "ucci": "g4g6",
            "comment": "车三进二。"
          },
          {
            "ucci": "c5c4",
            "comment": "卒3进1。"
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
            "ucci": "c3c4",
            "comment": "兵七进一。"
          },
          {
            "ucci": "b8c8",
            "comment": "后炮平3。"
          },
          {
            "ucci": "g6c6",
            "comment": "车三平七。"
          },
          {
            "ucci": "b7c7",
            "comment": "炮2平3。"
          },
          {
            "ucci": "c6c7",
            "comment": "车七进一。"
          },
          {
            "ucci": "b5c7",
            "comment": "马2退3。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-75",
    "kind": "opening",
    "title": "崇本堂梅花谱 · 横车鸳鸯马破右单提马",
    "subtitle": "《崇本堂梅花谱》横车鸳鸯马破右单提马",
    "level": 3,
    "order": 78,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《崇本堂梅花谱》横车鸳鸯马破右单提马",
      "author": "崇本堂梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/67992/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自崇本堂梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "e3e4",
            "comment": "兵五进一。"
          },
          {
            "ucci": "h7f7",
            "comment": "炮8平6。"
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
            "ucci": "g2e3",
            "comment": "马三进五。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
          },
          {
            "ucci": "i1d1",
            "comment": "车一平六。"
          },
          {
            "ucci": "a9d9",
            "comment": "车1平4。"
          },
          {
            "ucci": "a0a1",
            "comment": "车九进一。"
          },
          {
            "ucci": "d9d1",
            "comment": "车4进8。"
          },
          {
            "ucci": "a1d1",
            "comment": "车九平六。"
          },
          {
            "ucci": "b7b0",
            "comment": "炮2进7。"
          },
          {
            "ucci": "e3c4",
            "comment": "马五进七。"
          },
          {
            "ucci": "e5e4",
            "comment": "卒5进1。"
          },
          {
            "ucci": "c4d6",
            "comment": "马七进六。"
          },
          {
            "ucci": "f7f8",
            "comment": "炮6退1。"
          },
          {
            "ucci": "e2e7",
            "comment": "炮五进五。"
          },
          {
            "ucci": "e8d7",
            "comment": "士5进4。"
          },
          {
            "ucci": "e7c7",
            "comment": "炮五平七。"
          },
          {
            "ucci": "i9h9",
            "comment": "车9平8。"
          },
          {
            "ucci": "b2e2",
            "comment": "炮八平五。"
          },
          {
            "ucci": "e4f4",
            "comment": "卒5平6。"
          },
          {
            "ucci": "d1b1",
            "comment": "车六平八。"
          },
          {
            "ucci": "b0a0",
            "comment": "炮2平1。"
          },
          {
            "ucci": "b1b9",
            "comment": "车八进八。"
          },
          {
            "ucci": "e9e8",
            "comment": "将5进1。"
          },
          {
            "ucci": "b9b5",
            "comment": "车八退四。"
          },
          {
            "ucci": "f8g8",
            "comment": "炮6平7。"
          },
          {
            "ucci": "b5e5",
            "comment": "车八平五。"
          },
          {
            "ucci": "e8d8",
            "comment": "将5平4。"
          },
          {
            "ucci": "d6f7",
            "comment": "马六进四。"
          },
          {
            "ucci": "g9e7",
            "comment": "象7进5。"
          },
          {
            "ucci": "e5e7",
            "comment": "车五进二。"
          },
          {
            "ucci": "g8e8",
            "comment": "炮7平5。"
          },
          {
            "ucci": "e2e8",
            "comment": "炮五进六。"
          },
          {
            "ucci": "d7e8",
            "comment": "士4退5。"
          },
          {
            "ucci": "e7e8",
            "comment": "车五进一。"
          },
          {
            "ucci": "d8d7",
            "comment": "将4进1。"
          },
          {
            "ucci": "e8d8",
            "comment": "车五平六。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-76",
    "kind": "opening",
    "title": "崇本堂梅花谱 · 顺炮直车破横车",
    "subtitle": "《崇本堂梅花谱》顺炮直车破横车",
    "level": 3,
    "order": 79,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《崇本堂梅花谱》顺炮直车破横车",
      "author": "崇本堂梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/67987/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自崇本堂梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "d1d2",
            "comment": "车4退1。"
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
            "ucci": "c9a7",
            "comment": "象3进1。"
          },
          {
            "ucci": "a0b0",
            "comment": "车九平八。"
          },
          {
            "ucci": "b9d8",
            "comment": "马2进4。"
          },
          {
            "ucci": "g6g4",
            "comment": "车三退二。"
          },
          {
            "ucci": "d4d1",
            "comment": "车4进3。"
          },
          {
            "ucci": "f0e1",
            "comment": "仕四进五。"
          },
          {
            "ucci": "b7c7",
            "comment": "炮2平3。"
          },
          {
            "ucci": "e2d2",
            "comment": "炮五平六。"
          },
          {
            "ucci": "d8f7",
            "comment": "马4进6。"
          },
          {
            "ucci": "g0e2",
            "comment": "相三进五。"
          },
          {
            "ucci": "a9a8",
            "comment": "车1进1。"
          },
          {
            "ucci": "g4g6",
            "comment": "车三进二。"
          },
          {
            "ucci": "f7e5",
            "comment": "马6进5。"
          },
          {
            "ucci": "g6f6",
            "comment": "车三平四。"
          },
          {
            "ucci": "g7h5",
            "comment": "马7进8。"
          },
          {
            "ucci": "f6f2",
            "comment": "车四退四。"
          },
          {
            "ucci": "h5g3",
            "comment": "马8进7。"
          },
          {
            "ucci": "a4d4",
            "comment": "炮九平六。"
          },
          {
            "ucci": "d1a1",
            "comment": "车4平1。"
          },
          {
            "ucci": "b0b9",
            "comment": "车八进九。"
          },
          {
            "ucci": "f9e8",
            "comment": "士6进5。"
          },
          {
            "ucci": "d2d9",
            "comment": "后炮进七。"
          },
          {
            "ucci": "e8d9",
            "comment": "士5退4。"
          },
          {
            "ucci": "e0f0",
            "comment": "帅五平四。"
          },
          {
            "ucci": "c7c8",
            "comment": "炮3退1。"
          },
          {
            "ucci": "f2f9",
            "comment": "车四进七。"
          },
          {
            "ucci": "e9e8",
            "comment": "将5进1。"
          },
          {
            "ucci": "b9d9",
            "comment": "车八平六。"
          },
          {
            "ucci": "a1d1",
            "comment": "前车平4。"
          },
          {
            "ucci": "d4d8",
            "comment": "炮六进四。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-77",
    "kind": "opening",
    "title": "吴氏梅花谱 · 让先屏风马破当头横车局 局2",
    "subtitle": "《吴氏梅花谱》让先屏风马破当头横车局 局2",
    "level": 3,
    "order": 80,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《吴氏梅花谱》让先屏风马破当头横车局 局2",
      "author": "吴氏梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/68380/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自吴氏梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "i0i1",
            "comment": "车一进一。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
          },
          {
            "ucci": "i1d1",
            "comment": "车一平六。"
          },
          {
            "ucci": "g7h5",
            "comment": "马7进8。"
          },
          {
            "ucci": "d1d8",
            "comment": "车六进七。"
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
            "ucci": "g9e7",
            "comment": "象7进5。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "h5g3",
            "comment": "马8进7。"
          },
          {
            "ucci": "c2d4",
            "comment": "马七进六。"
          },
          {
            "ucci": "g5g4",
            "comment": "卒7进1。"
          },
          {
            "ucci": "d4c6",
            "comment": "马六进七。"
          },
          {
            "ucci": "g3e2",
            "comment": "马7进5。"
          },
          {
            "ucci": "c0e2",
            "comment": "相七进五。"
          },
          {
            "ucci": "g4g3",
            "comment": "卒7进1。"
          },
          {
            "ucci": "g2h0",
            "comment": "马三退二。"
          },
          {
            "ucci": "h7h8",
            "comment": "炮8退1。"
          },
          {
            "ucci": "d8d4",
            "comment": "车六退四。"
          },
          {
            "ucci": "h8h3",
            "comment": "炮8进5。"
          },
          {
            "ucci": "e3e4",
            "comment": "兵五进一。"
          },
          {
            "ucci": "b7b3",
            "comment": "炮2进4。"
          },
          {
            "ucci": "h0i2",
            "comment": "马二进一。"
          },
          {
            "ucci": "b3e3",
            "comment": "炮2平5。"
          },
          {
            "ucci": "f0e1",
            "comment": "仕四进五。"
          },
          {
            "ucci": "a9b9",
            "comment": "车1平2。"
          },
          {
            "ucci": "b2c2",
            "comment": "炮八平七。"
          },
          {
            "ucci": "b9b2",
            "comment": "车2进7。"
          },
          {
            "ucci": "c6e7",
            "comment": "马七进五。"
          },
          {
            "ucci": "c9e7",
            "comment": "象3进5。"
          },
          {
            "ucci": "c2c7",
            "comment": "炮七进五。"
          },
          {
            "ucci": "g3g2",
            "comment": "卒7进1。"
          },
          {
            "ucci": "d4d8",
            "comment": "车六进四。"
          },
          {
            "ucci": "b2b9",
            "comment": "车2退7。"
          },
          {
            "ucci": "i2g3",
            "comment": "马一进三。"
          },
          {
            "ucci": "i9f9",
            "comment": "车9平6。"
          },
          {
            "ucci": "d8d5",
            "comment": "车六退三。"
          },
          {
            "ucci": "h3h0",
            "comment": "炮8进3。"
          },
          {
            "ucci": "g0i2",
            "comment": "相三进一。"
          },
          {
            "ucci": "g2g1",
            "comment": "卒7进1。"
          },
          {
            "ucci": "d5h5",
            "comment": "车六平二。"
          },
          {
            "ucci": "g1g0",
            "comment": "卒7进1。"
          },
          {
            "ucci": "h5h0",
            "comment": "车二退五。"
          },
          {
            "ucci": "f9f0",
            "comment": "车6进9。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-78",
    "kind": "opening",
    "title": "崇本堂梅花谱 · 屏风马直车局",
    "subtitle": "《崇本堂梅花谱》屏风马直车局",
    "level": 3,
    "order": 81,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《崇本堂梅花谱》屏风马直车局",
      "author": "崇本堂梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/67984/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自崇本堂梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "c6c5",
            "comment": "卒3进1。"
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
            "ucci": "g3g4",
            "comment": "兵三进一。"
          },
          {
            "ucci": "c7d5",
            "comment": "马3进4。"
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
            "ucci": "b0c2",
            "comment": "马八进七。"
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
            "ucci": "g2f0",
            "comment": "马三退四。"
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
            "ucci": "c5c4",
            "comment": "车七退一。"
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
            "ucci": "h0h2",
            "comment": "车8退2。"
          },
          {
            "ucci": "f0e2",
            "comment": "马四进五。"
          },
          {
            "ucci": "h2h0",
            "comment": "车8进2。"
          },
          {
            "ucci": "e1f0",
            "comment": "仕五退四。"
          },
          {
            "ucci": "b9b6",
            "comment": "车2进3。"
          },
          {
            "ucci": "c4f4",
            "comment": "车七平四。"
          },
          {
            "ucci": "b6d6",
            "comment": "车2平4。"
          },
          {
            "ucci": "b0b1",
            "comment": "车八进一。"
          },
          {
            "ucci": "h0h1",
            "comment": "车8退1。"
          },
          {
            "ucci": "f0e1",
            "comment": "仕四进五。"
          },
          {
            "ucci": "e5h5",
            "comment": "炮5平8。"
          },
          {
            "ucci": "f4f2",
            "comment": "车四退二。"
          },
          {
            "ucci": "h1f1",
            "comment": "车8平6。"
          },
          {
            "ucci": "f2h2",
            "comment": "车四平二。"
          },
          {
            "ucci": "d6f6",
            "comment": "车4平6。"
          },
          {
            "ucci": "e1f2",
            "comment": "仕五进四。"
          },
          {
            "ucci": "f1b1",
            "comment": "前车平2。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-79",
    "kind": "opening",
    "title": "崇本堂梅花谱 · 横车破右车单提马局",
    "subtitle": "《崇本堂梅花谱》横车破右车单提马局",
    "level": 3,
    "order": 82,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《崇本堂梅花谱》横车破右车单提马局",
      "author": "崇本堂梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/67993/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自崇本堂梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "h7f7",
            "comment": "炮8平6。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "i9h9",
            "comment": "车9平8。"
          },
          {
            "ucci": "e3e4",
            "comment": "兵五进一。"
          },
          {
            "ucci": "h9h5",
            "comment": "车8进4。"
          },
          {
            "ucci": "c2e3",
            "comment": "马七进五。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
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
            "ucci": "c3c4",
            "comment": "兵七进一。"
          },
          {
            "ucci": "a9d9",
            "comment": "车1平4。"
          },
          {
            "ucci": "a0a1",
            "comment": "车九进一。"
          },
          {
            "ucci": "e5e4",
            "comment": "卒5进1。"
          },
          {
            "ucci": "e2e4",
            "comment": "炮五进二。"
          },
          {
            "ucci": "h5d5",
            "comment": "车8平4。"
          },
          {
            "ucci": "d1d5",
            "comment": "车六进四。"
          },
          {
            "ucci": "d9d5",
            "comment": "车4进4。"
          },
          {
            "ucci": "a1c1",
            "comment": "车九平七。"
          },
          {
            "ucci": "c5c4",
            "comment": "卒3进1。"
          },
          {
            "ucci": "c1c4",
            "comment": "车七进三。"
          },
          {
            "ucci": "b7b9",
            "comment": "炮2退2。"
          },
          {
            "ucci": "e4g4",
            "comment": "炮五平三。"
          },
          {
            "ucci": "d5g5",
            "comment": "车4平7。"
          },
          {
            "ucci": "b2e2",
            "comment": "炮八平五。"
          },
          {
            "ucci": "b9b0",
            "comment": "炮2进9。"
          },
          {
            "ucci": "c0a2",
            "comment": "相七进九。"
          },
          {
            "ucci": "i6i5",
            "comment": "卒9进1。"
          },
          {
            "ucci": "e3d5",
            "comment": "马五进六。"
          },
          {
            "ucci": "c7e6",
            "comment": "马3进5。"
          },
          {
            "ucci": "d5b6",
            "comment": "马六进八。"
          },
          {
            "ucci": "f7f8",
            "comment": "炮6退1。"
          },
          {
            "ucci": "c4c6",
            "comment": "车七进二。"
          },
          {
            "ucci": "i7h5",
            "comment": "马9进8。"
          },
          {
            "ucci": "c6e6",
            "comment": "车七平五。"
          },
          {
            "ucci": "h5g3",
            "comment": "马8进7。"
          },
          {
            "ucci": "e2e5",
            "comment": "炮五进三。"
          },
          {
            "ucci": "g5g4",
            "comment": "车7进1。"
          },
          {
            "ucci": "e6d6",
            "comment": "车五平六。"
          },
          {
            "ucci": "g4e4",
            "comment": "车7平5。"
          },
          {
            "ucci": "b6d7",
            "comment": "马八进六。"
          },
          {
            "ucci": "e9d9",
            "comment": "将5平4。"
          },
          {
            "ucci": "d7b8",
            "comment": "马六进八。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-80",
    "kind": "opening",
    "title": "吴氏梅花谱 · 让先屏风马破士角炮夹马炮局 局3",
    "subtitle": "《吴氏梅花谱》让先屏风马破士角炮夹马炮局 局3",
    "level": 3,
    "order": 83,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《吴氏梅花谱》让先屏风马破士角炮夹马炮局 局3",
      "author": "吴氏梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/68382/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自吴氏梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "c6c5",
            "comment": "卒3进1。"
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
            "ucci": "b2d2",
            "comment": "炮八平六。"
          },
          {
            "ucci": "b7b2",
            "comment": "炮2进5。"
          },
          {
            "ucci": "g0e2",
            "comment": "相三进五。"
          },
          {
            "ucci": "c7d5",
            "comment": "马3进4。"
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
            "ucci": "d5c3",
            "comment": "马4进3。"
          },
          {
            "ucci": "i0f0",
            "comment": "车一平四。"
          },
          {
            "ucci": "c3d1",
            "comment": "马3进4。"
          },
          {
            "ucci": "b0a0",
            "comment": "车八平九。"
          },
          {
            "ucci": "h7c7",
            "comment": "炮8平3。"
          },
          {
            "ucci": "f0f6",
            "comment": "车四进六。"
          },
          {
            "ucci": "h9g7",
            "comment": "马8进7。"
          },
          {
            "ucci": "f6g6",
            "comment": "车四平三。"
          },
          {
            "ucci": "i9h9",
            "comment": "车9平8。"
          },
          {
            "ucci": "h2i2",
            "comment": "炮二平一。"
          },
          {
            "ucci": "h9h2",
            "comment": "车8进7。"
          },
          {
            "ucci": "g2f0",
            "comment": "马三退四。"
          },
          {
            "ucci": "h2h0",
            "comment": "车8进2。"
          },
          {
            "ucci": "e2g0",
            "comment": "相五退三。"
          },
          {
            "ucci": "h0g0",
            "comment": "车8平7。"
          },
          {
            "ucci": "i2i1",
            "comment": "炮一退一。"
          },
          {
            "ucci": "g0g1",
            "comment": "车7退1。"
          },
          {
            "ucci": "i1i0",
            "comment": "炮一退一。"
          },
          {
            "ucci": "b2b6",
            "comment": "炮2退4。"
          },
          {
            "ucci": "g6g7",
            "comment": "车三进一。"
          },
          {
            "ucci": "c9e7",
            "comment": "象3进5。"
          },
          {
            "ucci": "g7g8",
            "comment": "车三进一。"
          },
          {
            "ucci": "d1b2",
            "comment": "马4退2。"
          },
          {
            "ucci": "d2c2",
            "comment": "炮六平七。"
          },
          {
            "ucci": "c7c2",
            "comment": "炮3进5。"
          },
          {
            "ucci": "a0a1",
            "comment": "车九进一。"
          },
          {
            "ucci": "b2c0",
            "comment": "马2进3。"
          },
          {
            "ucci": "a1c1",
            "comment": "车九平七。"
          },
          {
            "ucci": "c0a1",
            "comment": "马3退1。"
          },
          {
            "ucci": "e1f2",
            "comment": "仕五进四。"
          },
          {
            "ucci": "b6b0",
            "comment": "炮2进6。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "b0a0",
            "comment": "炮2平1。"
          },
          {
            "ucci": "e0d0",
            "comment": "帅五平六。"
          },
          {
            "ucci": "a0f0",
            "comment": "炮1平6。"
          },
          {
            "ucci": "c1a1",
            "comment": "车七平九。"
          },
          {
            "ucci": "b9b0",
            "comment": "车2进9。"
          },
          {
            "ucci": "d0d1",
            "comment": "帅六进一。"
          },
          {
            "ucci": "f0f1",
            "comment": "炮6退1。"
          },
          {
            "ucci": "e1f0",
            "comment": "仕五退四。"
          },
          {
            "ucci": "f1a1",
            "comment": "炮6平1。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-81",
    "kind": "opening",
    "title": "吴氏梅花谱 · 让先屏风马破当头直车局　局1",
    "subtitle": "《吴氏梅花谱》让先屏风马破当头直车局　局1",
    "level": 3,
    "order": 84,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《吴氏梅花谱》让先屏风马破当头直车局　局1",
      "author": "吴氏梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/68378/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自吴氏梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b9c7",
            "comment": "马2进3。"
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
            "ucci": "h6g6",
            "comment": "车二平三。"
          },
          {
            "ucci": "h7h8",
            "comment": "炮8退1。"
          },
          {
            "ucci": "g6g5",
            "comment": "车三退一。"
          },
          {
            "ucci": "h8g8",
            "comment": "炮8平7。"
          },
          {
            "ucci": "g5d5",
            "comment": "车三平六。"
          },
          {
            "ucci": "c9e7",
            "comment": "象3进5。"
          },
          {
            "ucci": "d5d6",
            "comment": "车六进一。"
          },
          {
            "ucci": "g7f5",
            "comment": "马7进6。"
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
            "ucci": "f5d4",
            "comment": "马6进4。"
          },
          {
            "ucci": "c6c7",
            "comment": "车七进一。"
          },
          {
            "ucci": "c9c7",
            "comment": "车3进2。"
          },
          {
            "ucci": "c2c7",
            "comment": "炮七进五。"
          },
          {
            "ucci": "g8g2",
            "comment": "炮7进6。"
          },
          {
            "ucci": "b0a2",
            "comment": "马八进九。"
          },
          {
            "ucci": "b7b3",
            "comment": "炮2进4。"
          },
          {
            "ucci": "c3c4",
            "comment": "兵七进一。"
          },
          {
            "ucci": "b3g3",
            "comment": "炮2平7。"
          },
          {
            "ucci": "g0i2",
            "comment": "相三进一。"
          },
          {
            "ucci": "h9h1",
            "comment": "车8进8。"
          },
          {
            "ucci": "f0e1",
            "comment": "仕四进五。"
          },
          {
            "ucci": "g2g0",
            "comment": "前炮进2。"
          },
          {
            "ucci": "e2g2",
            "comment": "炮五平三。"
          },
          {
            "ucci": "g0i0",
            "comment": "前炮平9。"
          },
          {
            "ucci": "e1f2",
            "comment": "仕五进四。"
          },
          {
            "ucci": "h1h2",
            "comment": "车8退1。"
          },
          {
            "ucci": "g2g1",
            "comment": "炮三退一。"
          },
          {
            "ucci": "h2h0",
            "comment": "车8进2。"
          },
          {
            "ucci": "e0e1",
            "comment": "帅五进一。"
          },
          {
            "ucci": "h0h1",
            "comment": "车8退1。"
          },
          {
            "ucci": "g1f1",
            "comment": "炮三平四。"
          },
          {
            "ucci": "g3f3",
            "comment": "炮7平6。"
          },
          {
            "ucci": "e1d1",
            "comment": "帅五平六。"
          },
          {
            "ucci": "f3f1",
            "comment": "炮6进2。"
          },
          {
            "ucci": "a0b0",
            "comment": "车九平八。"
          },
          {
            "ucci": "h1h2",
            "comment": "车8退1。"
          },
          {
            "ucci": "i2g4",
            "comment": "相一进三。"
          },
          {
            "ucci": "h2f2",
            "comment": "车8平6。"
          },
          {
            "ucci": "d1e1",
            "comment": "帅六平五。"
          },
          {
            "ucci": "f1g1",
            "comment": "炮6平7。"
          },
          {
            "ucci": "b0b5",
            "comment": "车八进五。"
          },
          {
            "ucci": "f2h2",
            "comment": "车6平8。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-82",
    "kind": "opening",
    "title": "崇本堂梅花谱 · 屏风马变边马局",
    "subtitle": "《崇本堂梅花谱》屏风马变边马局",
    "level": 3,
    "order": 85,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《崇本堂梅花谱》屏风马变边马局",
      "author": "崇本堂梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/67986/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自崇本堂梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "c6c5",
            "comment": "卒3进1。"
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
            "ucci": "h6g6",
            "comment": "车二平三。"
          },
          {
            "ucci": "h7h8",
            "comment": "炮8退1。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
          },
          {
            "ucci": "h8g8",
            "comment": "炮8平7。"
          },
          {
            "ucci": "g6f6",
            "comment": "车三平四。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
          },
          {
            "ucci": "e3e4",
            "comment": "兵五进一。"
          },
          {
            "ucci": "g7h5",
            "comment": "马7进8。"
          },
          {
            "ucci": "f6g6",
            "comment": "车四平三。"
          },
          {
            "ucci": "h5i7",
            "comment": "马8退9。"
          },
          {
            "ucci": "g6g4",
            "comment": "车三退二。"
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
            "ucci": "c2e3",
            "comment": "马七进五。"
          },
          {
            "ucci": "h9h6",
            "comment": "车8进3。"
          },
          {
            "ucci": "e2e5",
            "comment": "炮五进三。"
          },
          {
            "ucci": "i7g6",
            "comment": "马9进7。"
          },
          {
            "ucci": "g4e4",
            "comment": "车三平五。"
          },
          {
            "ucci": "g6e5",
            "comment": "马7进5。"
          },
          {
            "ucci": "e4e5",
            "comment": "车五进一。"
          },
          {
            "ucci": "a9d9",
            "comment": "车1平4。"
          },
          {
            "ucci": "b2e2",
            "comment": "炮八平五。"
          },
          {
            "ucci": "b7b2",
            "comment": "炮2进5。"
          },
          {
            "ucci": "e3f5",
            "comment": "马五进四。"
          },
          {
            "ucci": "h6f6",
            "comment": "车8平6。"
          },
          {
            "ucci": "g2e3",
            "comment": "马三进五。"
          },
          {
            "ucci": "b2b5",
            "comment": "炮2退3。"
          },
          {
            "ucci": "e5e4",
            "comment": "车五退一。"
          },
          {
            "ucci": "g8g0",
            "comment": "炮7进8。"
          },
          {
            "ucci": "f0e1",
            "comment": "仕四进五。"
          },
          {
            "ucci": "b5f5",
            "comment": "炮2平6。"
          },
          {
            "ucci": "e4f4",
            "comment": "车五平四。"
          },
          {
            "ucci": "f5h5",
            "comment": "炮6平8。"
          },
          {
            "ucci": "f4h4",
            "comment": "车四平二。"
          },
          {
            "ucci": "f6f3",
            "comment": "车6进3。"
          },
          {
            "ucci": "e3c2",
            "comment": "马五退七。"
          },
          {
            "ucci": "h5e5",
            "comment": "炮8平5。"
          },
          {
            "ucci": "h4h0",
            "comment": "车二退四。"
          },
          {
            "ucci": "g0d0",
            "comment": "炮7平4。"
          },
          {
            "ucci": "c2d0",
            "comment": "马七退六。"
          },
          {
            "ucci": "d9d1",
            "comment": "车4进8。"
          },
          {
            "ucci": "h0h1",
            "comment": "车二进一。"
          },
          {
            "ucci": "f3g3",
            "comment": "车6平7。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-83",
    "kind": "opening",
    "title": "崇本堂梅花谱 · 屏风马直车破直车",
    "subtitle": "《崇本堂梅花谱》屏风马直车破直车",
    "level": 3,
    "order": 86,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《崇本堂梅花谱》屏风马直车破直车",
      "author": "崇本堂梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/67983/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自崇本堂梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "c6c5",
            "comment": "卒3进1。"
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
            "ucci": "h0h4",
            "comment": "车二进四。"
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
            "ucci": "c5c4",
            "comment": "卒3进1。"
          },
          {
            "ucci": "h4c4",
            "comment": "车二平七。"
          },
          {
            "ucci": "b7b8",
            "comment": "炮2退1。"
          },
          {
            "ucci": "b2c2",
            "comment": "炮八平七。"
          },
          {
            "ucci": "b8c8",
            "comment": "炮2平3。"
          },
          {
            "ucci": "c4g4",
            "comment": "车七平三。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
          },
          {
            "ucci": "g4g5",
            "comment": "车三进一。"
          },
          {
            "ucci": "c9e7",
            "comment": "象3进5。"
          },
          {
            "ucci": "g5g7",
            "comment": "车三进二。"
          },
          {
            "ucci": "c7e8",
            "comment": "马3退5。"
          },
          {
            "ucci": "e2e6",
            "comment": "炮五进四。"
          },
          {
            "ucci": "c8c0",
            "comment": "炮3进8。"
          },
          {
            "ucci": "e0e1",
            "comment": "帅五进一。"
          },
          {
            "ucci": "c0a0",
            "comment": "炮3平1。"
          },
          {
            "ucci": "g7f7",
            "comment": "车三平四。"
          },
          {
            "ucci": "h7i7",
            "comment": "炮8平9。"
          },
          {
            "ucci": "e1f1",
            "comment": "帅五平四。"
          },
          {
            "ucci": "h9h1",
            "comment": "车8进8。"
          },
          {
            "ucci": "f1f2",
            "comment": "帅四进一。"
          },
          {
            "ucci": "i7i9",
            "comment": "炮9退2。"
          },
          {
            "ucci": "g3g4",
            "comment": "兵三进一。"
          },
          {
            "ucci": "a9c9",
            "comment": "车1平3。"
          },
          {
            "ucci": "g2f4",
            "comment": "马三进四。"
          },
          {
            "ucci": "a0a2",
            "comment": "炮1退2。"
          },
          {
            "ucci": "b0a2",
            "comment": "马八进九。"
          },
          {
            "ucci": "c9c2",
            "comment": "车3进7。"
          },
          {
            "ucci": "g0e2",
            "comment": "相三进五。"
          },
          {
            "ucci": "h1h6",
            "comment": "车8退5。"
          },
          {
            "ucci": "g4g5",
            "comment": "兵三进一。"
          },
          {
            "ucci": "h6e6",
            "comment": "车8平5。"
          },
          {
            "ucci": "f4e6",
            "comment": "马四进五。"
          },
          {
            "ucci": "c2a2",
            "comment": "车3平1。"
          },
          {
            "ucci": "g5g6",
            "comment": "兵三进一。"
          },
          {
            "ucci": "a2a3",
            "comment": "车1退1。"
          },
          {
            "ucci": "g6g7",
            "comment": "兵三进一。"
          },
          {
            "ucci": "a3e3",
            "comment": "车1平5。"
          },
          {
            "ucci": "e6d4",
            "comment": "马五退六。"
          },
          {
            "ucci": "e3e4",
            "comment": "车5退1。"
          },
          {
            "ucci": "d4b5",
            "comment": "马六进八。"
          },
          {
            "ucci": "e8g7",
            "comment": "马5进7。"
          },
          {
            "ucci": "b5d6",
            "comment": "马八进六。"
          },
          {
            "ucci": "e4d4",
            "comment": "车5平4。"
          },
          {
            "ucci": "d6c8",
            "comment": "马六进七。"
          },
          {
            "ucci": "d4d8",
            "comment": "车4退4。"
          },
          {
            "ucci": "f7g7",
            "comment": "车四平三。"
          },
          {
            "ucci": "d8c8",
            "comment": "车4平3。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-84",
    "kind": "opening",
    "title": "崇本堂梅花谱 · 列手炮局",
    "subtitle": "《崇本堂梅花谱》列手炮局",
    "level": 3,
    "order": 87,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《崇本堂梅花谱》列手炮局",
      "author": "崇本堂梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/67995/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自崇本堂梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "e2e6",
            "comment": "炮五进四。"
          },
          {
            "ucci": "f9e8",
            "comment": "士6进5。"
          },
          {
            "ucci": "b2e2",
            "comment": "炮八平五。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "e6e5",
            "comment": "前炮退一。"
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
            "ucci": "h7h5",
            "comment": "炮8进2。"
          },
          {
            "ucci": "g3g4",
            "comment": "兵三进一。"
          },
          {
            "ucci": "i6i5",
            "comment": "卒9进1。"
          },
          {
            "ucci": "e3e4",
            "comment": "兵五进一。"
          },
          {
            "ucci": "b9b3",
            "comment": "车2进6。"
          },
          {
            "ucci": "c2e3",
            "comment": "马七进五。"
          },
          {
            "ucci": "b3c3",
            "comment": "车2平3。"
          },
          {
            "ucci": "e2e1",
            "comment": "后炮退一。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
          },
          {
            "ucci": "c0e2",
            "comment": "相七进五。"
          },
          {
            "ucci": "h5e5",
            "comment": "炮8平5。"
          },
          {
            "ucci": "h0h9",
            "comment": "车二进九。"
          },
          {
            "ucci": "i7h9",
            "comment": "马9退8。"
          },
          {
            "ucci": "e4e5",
            "comment": "兵五进一。"
          },
          {
            "ucci": "g5g4",
            "comment": "卒7进1。"
          },
          {
            "ucci": "e3g4",
            "comment": "马五进三。"
          },
          {
            "ucci": "c3g3",
            "comment": "车3平7。"
          },
          {
            "ucci": "g2e3",
            "comment": "后马进五。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "a0c0",
            "comment": "车九平七。"
          },
          {
            "ucci": "c9a7",
            "comment": "象3进1。"
          },
          {
            "ucci": "c0b0",
            "comment": "车七平八。"
          },
          {
            "ucci": "h9g7",
            "comment": "马8进7。"
          },
          {
            "ucci": "b0b6",
            "comment": "车八进六。"
          },
          {
            "ucci": "g7h5",
            "comment": "马7进8。"
          },
          {
            "ucci": "b6c6",
            "comment": "车八平七。"
          },
          {
            "ucci": "c7a8",
            "comment": "马3退1。"
          },
          {
            "ucci": "e3f5",
            "comment": "马五进四。"
          },
          {
            "ucci": "h5f4",
            "comment": "马8进6。"
          },
          {
            "ucci": "c6g6",
            "comment": "车七平三。"
          },
          {
            "ucci": "g9i7",
            "comment": "象7进9。"
          },
          {
            "ucci": "g6h6",
            "comment": "车三平二。"
          },
          {
            "ucci": "e7b7",
            "comment": "炮5平2。"
          },
          {
            "ucci": "e5d5",
            "comment": "兵五平六。"
          },
          {
            "ucci": "b7b0",
            "comment": "炮2进7。"
          },
          {
            "ucci": "e2c0",
            "comment": "相五退七。"
          },
          {
            "ucci": "e9f9",
            "comment": "将5平6。"
          },
          {
            "ucci": "h6f6",
            "comment": "车二平四。"
          },
          {
            "ucci": "e8f7",
            "comment": "士5进6。"
          },
          {
            "ucci": "f6f7",
            "comment": "车四进一。"
          },
          {
            "ucci": "f9e9",
            "comment": "将6平5。"
          },
          {
            "ucci": "f7f8",
            "comment": "车四进一。"
          },
          {
            "ucci": "g3d3",
            "comment": "车7平4。"
          },
          {
            "ucci": "f5e7",
            "comment": "马四进五。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
          },
          {
            "ucci": "f8e8",
            "comment": "车四平五。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-85",
    "kind": "opening",
    "title": "崇本堂梅花谱 · 直车对直车局",
    "subtitle": "《崇本堂梅花谱》直车对直车局",
    "level": 3,
    "order": 88,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《崇本堂梅花谱》直车对直车局",
      "author": "崇本堂梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/67991/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自崇本堂梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "c3c4",
            "comment": "兵七进一。"
          },
          {
            "ucci": "h9g7",
            "comment": "马8进7。"
          },
          {
            "ucci": "b0c2",
            "comment": "马八进七。"
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
            "ucci": "b2b3",
            "comment": "炮八进一。"
          },
          {
            "ucci": "b9c7",
            "comment": "马2进3。"
          },
          {
            "ucci": "b3c3",
            "comment": "炮八平七。"
          },
          {
            "ucci": "e6e5",
            "comment": "卒5进1。"
          },
          {
            "ucci": "d0e1",
            "comment": "仕六进五。"
          },
          {
            "ucci": "c7e6",
            "comment": "马3进5。"
          },
          {
            "ucci": "g3g4",
            "comment": "兵三进一。"
          },
          {
            "ucci": "h3h5",
            "comment": "车8退2。"
          },
          {
            "ucci": "a0b0",
            "comment": "车九平八。"
          },
          {
            "ucci": "b7d7",
            "comment": "炮2平4。"
          },
          {
            "ucci": "c3c6",
            "comment": "炮七进三。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
          },
          {
            "ucci": "c0e2",
            "comment": "相七进五。"
          },
          {
            "ucci": "g5g4",
            "comment": "卒7进1。"
          },
          {
            "ucci": "e2g4",
            "comment": "相五进三。"
          },
          {
            "ucci": "e5e4",
            "comment": "卒5进1。"
          },
          {
            "ucci": "g4e2",
            "comment": "前相退五。"
          },
          {
            "ucci": "e4e3",
            "comment": "卒5进1。"
          },
          {
            "ucci": "g2e3",
            "comment": "马三进五。"
          },
          {
            "ucci": "e7e3",
            "comment": "炮5进4。"
          },
          {
            "ucci": "c2e3",
            "comment": "马七进五。"
          },
          {
            "ucci": "d7e7",
            "comment": "炮4平5。"
          },
          {
            "ucci": "e3g4",
            "comment": "马五进三。"
          },
          {
            "ucci": "e6g5",
            "comment": "马5进7。"
          },
          {
            "ucci": "c6c5",
            "comment": "炮七退一。"
          },
          {
            "ucci": "g5e4",
            "comment": "前马进5。"
          },
          {
            "ucci": "c5e5",
            "comment": "炮七平五。"
          },
          {
            "ucci": "f9e8",
            "comment": "士6进5。"
          },
          {
            "ucci": "b0b6",
            "comment": "车八进六。"
          },
          {
            "ucci": "h5f5",
            "comment": "车8平6。"
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
            "ucci": "e9f9",
            "comment": "将5平6。"
          },
          {
            "ucci": "h9g9",
            "comment": "车二平三。"
          },
          {
            "ucci": "f9f8",
            "comment": "将6进1。"
          },
          {
            "ucci": "b6i6",
            "comment": "车八平一。"
          },
          {
            "ucci": "f5g5",
            "comment": "车6平7。"
          },
          {
            "ucci": "i6i8",
            "comment": "车一进二。"
          },
          {
            "ucci": "f8f7",
            "comment": "将6进1。"
          },
          {
            "ucci": "g9g5",
            "comment": "车三退四。"
          },
          {
            "ucci": "e4g5",
            "comment": "马5退7。"
          },
          {
            "ucci": "g4i5",
            "comment": "马三进一。"
          },
          {
            "ucci": "e7d7",
            "comment": "炮5平4。"
          },
          {
            "ucci": "i5g6",
            "comment": "马一进三。"
          },
          {
            "ucci": "g5e6",
            "comment": "马7退5。"
          },
          {
            "ucci": "e5e3",
            "comment": "炮五退二。"
          },
          {
            "ucci": "a9b9",
            "comment": "车1平2。"
          },
          {
            "ucci": "i8f8",
            "comment": "车一平四。"
          },
          {
            "ucci": "e6f8",
            "comment": "马5退6。"
          },
          {
            "ucci": "g6e5",
            "comment": "马三退五。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  },
  {
    "id": "opening-classic-86",
    "kind": "opening",
    "title": "吴氏梅花谱 · 让先屏风马破当头炮夹马局　局4",
    "subtitle": "《吴氏梅花谱》让先屏风马破当头炮夹马局　局4",
    "level": 3,
    "order": 89,
    "tags": [
      "古谱",
      "梅花谱",
      "开局"
    ],
    "source": {
      "name": "《吴氏梅花谱》让先屏风马破当头炮夹马局　局4",
      "author": "吴氏梅花谱原编",
      "license": "公有领域（古谱原文）",
      "url": "https://www.xqdao.com/qipu/show/68379/"
    },
    "reviewedAt": "2026-10-20",
    "reviewedBy": "原谱着法 · 规则核自动校验 + 人工复核",
    "fen": "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1",
    "userColor": "r",
    "objective": "demonstration",
    "intro": "本局录自吴氏梅花谱。原谱着法已逐着通过规则核校验；讲解为本项目整理。",
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
            "ucci": "b9c7",
            "comment": "马2进3。"
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
            "ucci": "e3e4",
            "comment": "兵五进一。"
          },
          {
            "ucci": "d9e8",
            "comment": "士4进5。"
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
            "ucci": "e5e4",
            "comment": "卒5进1。"
          },
          {
            "ucci": "h5h4",
            "comment": "车二退一。"
          },
          {
            "ucci": "c9e7",
            "comment": "象3进5。"
          },
          {
            "ucci": "h4e4",
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
            "ucci": "h7i7",
            "comment": "炮8平9。"
          },
          {
            "ucci": "b2a2",
            "comment": "炮八平九。"
          },
          {
            "ucci": "h9h5",
            "comment": "车8进4。"
          },
          {
            "ucci": "a0b0",
            "comment": "车九平八。"
          },
          {
            "ucci": "b7b5",
            "comment": "炮2进2。"
          },
          {
            "ucci": "c2e3",
            "comment": "马七进五。"
          },
          {
            "ucci": "d9d3",
            "comment": "车4进6。"
          },
          {
            "ucci": "e3g4",
            "comment": "马五进三。"
          },
          {
            "ucci": "h5d5",
            "comment": "车8平4。"
          },
          {
            "ucci": "f0e1",
            "comment": "仕四进五。"
          },
          {
            "ucci": "g6g5",
            "comment": "卒7进1。"
          },
          {
            "ucci": "g4e3",
            "comment": "前马退五。"
          },
          {
            "ucci": "c6c5",
            "comment": "卒3进1。"
          },
          {
            "ucci": "c3c4",
            "comment": "兵七进一。"
          },
          {
            "ucci": "b5b3",
            "comment": "炮2进2。"
          },
          {
            "ucci": "g3g4",
            "comment": "兵三进一。"
          },
          {
            "ucci": "g7f5",
            "comment": "马7进6。"
          },
          {
            "ucci": "a2d2",
            "comment": "炮九平六。"
          },
          {
            "ucci": "d3c3",
            "comment": "前车平3。"
          },
          {
            "ucci": "c4c5",
            "comment": "兵七进一。"
          },
          {
            "ucci": "d5c5",
            "comment": "车4平3。"
          },
          {
            "ucci": "e3c4",
            "comment": "马五进七。"
          },
          {
            "ucci": "f5d6",
            "comment": "马6退4。"
          },
          {
            "ucci": "e2e7",
            "comment": "炮五进五。"
          },
          {
            "ucci": "g9e7",
            "comment": "象7进5。"
          },
          {
            "ucci": "e4e7",
            "comment": "车五进三。"
          },
          {
            "ucci": "d6c4",
            "comment": "马4进3。"
          },
          {
            "ucci": "d2e2",
            "comment": "炮六平五。"
          },
          {
            "ucci": "e9d9",
            "comment": "将5平4。"
          },
          {
            "ucci": "e7i7",
            "comment": "车五平一。"
          },
          {
            "ucci": "c3g3",
            "comment": "前车平7。"
          },
          {
            "ucci": "g2i1",
            "comment": "马三退一。"
          },
          {
            "ucci": "b3e3",
            "comment": "炮2平5。"
          },
          {
            "ucci": "b0b1",
            "comment": "车八进一。"
          },
          {
            "ucci": "c5d5",
            "comment": "车3平4。"
          },
          {
            "ucci": "e0f0",
            "comment": "帅五平四。"
          },
          {
            "ucci": "g3f3",
            "comment": "车7平6。"
          },
          {
            "ucci": "e2f2",
            "comment": "炮五平四。"
          },
          {
            "ucci": "f3f2",
            "comment": "车6进1。"
          },
          {
            "ucci": "e1f2",
            "comment": "仕五进四。"
          },
          {
            "ucci": "d5d0",
            "comment": "车4进5。"
          },
          {
            "ucci": "f0f1",
            "comment": "帅四进一。"
          },
          {
            "ucci": "c4d2",
            "comment": "前马进4。"
          },
          {
            "ucci": "c0e2",
            "comment": "相七进五。"
          },
          {
            "ucci": "d2b1",
            "comment": "马4进2。"
          },
          {
            "ucci": "i7c7",
            "comment": "车一平七。"
          },
          {
            "ucci": "d0d1",
            "comment": "车4退1。"
          },
          {
            "ucci": "f1f0",
            "comment": "帅四退一。"
          },
          {
            "ucci": "b1d0",
            "comment": "马2进4。"
          },
          {
            "ucci": "e2c4",
            "comment": "相五进七。"
          },
          {
            "ucci": "d1f1",
            "comment": "车4平6。"
          },
          {
            "ucci": "f0e0",
            "comment": "帅四平五。"
          },
          {
            "ucci": "d0e2",
            "comment": "马4退5。"
          },
          {
            "ucci": "f2e1",
            "comment": "仕四退五。"
          },
          {
            "ucci": "f1e1",
            "comment": "车6平5。"
          },
          {
            "ucci": "e0f0",
            "comment": "帅五平四。"
          },
          {
            "ucci": "e1e0",
            "comment": "车5进1。"
          },
          {
            "ucci": "f0f1",
            "comment": "帅四进一。"
          },
          {
            "ucci": "e0f0",
            "comment": "车5平6。"
          }
        ]
      }
    ],
    "completionText": "古谱主线完成。请结合要点理解双方的出动顺序。"
  }
];
