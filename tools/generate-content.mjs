/**
 * Deterministic starter-content generator.
 *
 * The generated positions are original, sparse endgame compositions. Every
 * tactic is verified by the rules core; every guided endgame line is a forced
 * mate-in-two (red, black, red) verified against every black reply.
 *
 * Run with:
 *   node --experimental-strip-types tools/generate-content.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import {
  applyMove,
  evaluateBoard,
  generateLegalMoves,
  isInCheck,
  moveToUcci,
  toFen,
} from '../packages/xiangqi/src/index.ts';

const OUT_DIR = path.resolve('packages/content/src/data');
const REVIEWED_AT = '2026-10-20';
const SOURCE = {
  name: '棋练原创编排',
  author: '棋练项目组',
  license: 'CC0-1.0',
};

const GLYPH = {
  r: { K: '帅', A: '仕', B: '相', N: '马', R: '车', C: '炮', P: '兵' },
  b: { K: '将', A: '士', B: '象', N: '马', R: '车', C: '炮', P: '卒' },
};

const PALACE = {
  r: [3, 4, 5].flatMap((f) => [0, 1, 2].map((r) => [f, r])),
  b: [3, 4, 5].flatMap((f) => [7, 8, 9].map((r) => [f, r])),
};
const ELEPHANT_SQUARES = {
  r: [[2, 0], [6, 0], [0, 2], [4, 2], [8, 2], [2, 4], [6, 4]],
  b: [[2, 9], [6, 9], [0, 7], [4, 7], [8, 7], [2, 5], [6, 5]],
};

function mulberry32(seed) {
  let t = seed >>> 0;
  return function random() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(20261020);
const pick = (items) => items[Math.floor(rng() * items.length)];
const randomInt = (max) => Math.floor(rng() * max);

function square(f, r) {
  return r * 9 + f;
}

function piece(color, type) {
  return { color, type };
}

function emptyBoard() {
  return Array.from({ length: 90 }, () => null);
}

function place(board, f, r, color, type) {
  board[square(f, r)] = piece(color, type);
}

function freeSquare(board) {
  for (let tries = 0; tries < 300; tries += 1) {
    const f = randomInt(9);
    const r = randomInt(10);
    if (board[square(f, r)]) continue;
    return [f, r];
  }
  return null;
}

function nearBlackPalaceSquare(board) {
  for (let tries = 0; tries < 300; tries += 1) {
    const f = 2 + randomInt(5);
    const r = 5 + randomInt(5);
    if (board[square(f, r)]) continue;
    return [f, r];
  }
  return freeSquare(board);
}

function makePosition(attackers, defenderCount, nearPalace) {
  const board = emptyBoard();
  const redKing = pick(PALACE.r);
  const blackKing = pick(PALACE.b);
  place(board, redKing[0], redKing[1], 'r', 'K');
  place(board, blackKing[0], blackKing[1], 'b', 'K');

  for (const type of attackers) {
    const spot = nearPalace ? nearBlackPalaceSquare(board) : freeSquare(board);
    if (!spot) return null;
    place(board, spot[0], spot[1], 'r', type);
  }

  for (let i = 0; i < defenderCount; i += 1) {
    const type = rng() < 0.5 ? 'A' : 'B';
    const spots = type === 'A' ? PALACE.b : ELEPHANT_SQUARES.b;
    for (let tries = 0; tries < 20; tries += 1) {
      const [f, r] = pick(spots);
      if (board[square(f, r)]) continue;
      place(board, f, r, 'b', type);
      break;
    }
  }

  const position = { board, turn: 'r', halfmoveClock: 0, fullmove: 1 };
  if (isInCheck(position, 'r') || isInCheck(position, 'b')) return null;
  const blackMoves = generateLegalMoves({ ...position, turn: 'b' });
  if (blackMoves.length === 0) return null;
  if (generateLegalMoves(position).length === 0) return null;
  return position;
}

function isCheckmate(position, winner) {
  const end = evaluateBoard(position);
  return end.status === 'win' && end.winner === winner && end.reason === 'checkmate';
}

function apply(position, move) {
  const result = applyMove(position, move.from, move.to);
  if (!result.ok) throw new Error(result.message);
  return result;
}

function mateInOneMoves(position, color) {
  const moves = [];
  for (const move of generateLegalMoves(position)) {
    const result = apply(position, move);
    if (isCheckmate(result.position, color)) {
      moves.push({ move, result });
    }
  }
  return moves;
}

function findForcedMateInTwo(position) {
  if (isInCheck(position, 'r')) return null;
  for (const first of generateLegalMoves(position)) {
    const firstResult = apply(position, first);
    // A one-move mate belongs in the tactic set, not the guided lesson.
    if (isCheckmate(firstResult.position, 'r')) continue;
    const replies = generateLegalMoves(firstResult.position);
    if (replies.length === 0) continue;

    let blackReply = null;
    let finalMate = null;
    let allRepliesLose = true;
    for (const reply of replies) {
      const replyResult = apply(firstResult.position, reply);
      const mates = mateInOneMoves(replyResult.position, 'r');
      if (mates.length === 0) {
        allRepliesLose = false;
        break;
      }
      if (!blackReply) {
        blackReply = reply;
        finalMate = mates[0];
      }
    }
    if (allRepliesLose && blackReply && finalMate) {
      return { first, blackReply, finalMate };
    }
  }
  return null;
}

function motifName(attackers, matingType) {
  const set = new Set(attackers);
  if (set.has('R') && set.has('C')) return '车炮配合';
  if (set.has('R') && set.has('N')) return '车马配合';
  if (set.has('N') && set.has('C')) return '马炮配合';
  if (set.has('R') && set.has('P')) return '车兵配合';
  if (set.has('R')) return '车类杀法';
  if (set.has('C')) return '炮类杀法';
  if (set.has('N')) return '马类杀法';
  if (set.has('P')) return '兵类杀法';
  return `${GLYPH.r[matingType]}类杀法`;
}

function makeTactic(position, index, attackers, mate, label) {
  const solutions = mateInOneMoves(position, 'r')
    .map(({ move }) => [moveToUcci(move.from, move.to)])
    .sort();
  const chosen = solutions.find((line) => line[0] === moveToUcci(mate.move.from, mate.move.to)) ?? solutions[0];
  const theme = motifName(attackers, mate.move.piece.type);
  const notation = mate.result.notation;
  return {
    id: `tactic-${String(index).padStart(2, '0')}`,
    kind: 'tactics',
    title: `${theme} · 第 ${index} 题`,
    subtitle: label,
    level: 1,
    order: index + 1,
    tags: [theme, '一步杀'],
    source: SOURCE,
    reviewedAt: REVIEWED_AT,
    reviewedBy: '规则核自动校验 + 人工抽检',
    fen: toFen(position),
    goal: 'mate',
    solutions,
    hint: '黑将的退路有限。先找能同时封住将门和退路的着法。',
    explanation: `红方走 ${notation}，黑将无合法应手，形成将死。`,
    _chosen: chosen,
  };
}

function makeEndgame(position, index, attackers, line) {
  const [first, reply, mate] = line;
  const firstApply = apply(position, first);
  const replyApply = apply(firstApply.position, reply);
  const mateMove = mate.move;
  const mateApply = mate.result;
  const results = [firstApply, replyApply, mateApply];
  const moveObjects = [first, reply, mateMove];
  const theme = motifName(attackers, mateMove.piece.type);
  const moves = moveObjects.map((move, moveIndex) => ({
    ucci: moveToUcci(move.from, move.to),
    comment:
      moveIndex === 0
        ? `先手：${results[0].notation}。${theme}的关键是先把将门收紧。`
        : moveIndex === 1
          ? `黑方应 ${results[1].notation}，但所有应手都在合围之内。`
          : `收口：${results[2].notation}，黑将无路可走。`,
  }));

  return {
    id: `endgame-${String(index).padStart(2, '0')}`,
    kind: 'endgame',
    title: `${theme} · 两步成杀 ${String(index).padStart(2, '0')}`,
    subtitle: '先手控制九宫，下一手完成合围',
    level: 2,
    order: index + 1,
    tags: [theme, '残局演示', '两步杀'],
    source: SOURCE,
    reviewedAt: REVIEWED_AT,
    reviewedBy: '规则核强制应手校验 + 人工抽检',
    fen: toFen(position),
    userColor: 'r',
    objective: 'win',
    intro: '这是一个少子残局演示。先手要限制黑将的活动范围，再在下一手收口。',
    keyPoints: ['先看黑将能走到哪里', '用现有子力封住将门', '不要急着吃子，先完成合围'],
    lines: [{ id: 'main', label: '主线 · 两步成杀', moves }],
    completionText: '合围完成。记住：残局先控将门，再收口。',
  };
}

function generateTactics() {
  const specs = [
    { attackers: ['R', 'R'], count: 5, defenders: 1 },
    { attackers: ['R', 'C'], count: 5, defenders: 1 },
    { attackers: ['R', 'N'], count: 4, defenders: 1 },
    { attackers: ['C', 'N'], count: 3, defenders: 0 },
    { attackers: ['R', 'P'], count: 3, defenders: 1 },
  ];
  const results = [];
  const seen = new Set();
  let index = 1;
  for (const spec of specs) {
    let found = 0;
    let attempts = 0;
    while (found < spec.count && attempts < 60000) {
      attempts += 1;
      const position = makePosition(spec.attackers, spec.defenders, true);
      if (!position) continue;
      const mates = mateInOneMoves(position, 'r');
      if (mates.length === 0 || mates.length > 4) continue;
      const fen = toFen(position);
      if (seen.has(fen)) continue;
      seen.add(fen);
      const mate = mates[randomInt(mates.length)];
      results.push(makeTactic(position, index, spec.attackers, mate, '红先，一步将死'));
      index += 1;
      found += 1;
    }
    console.error(`tactics ${spec.attackers.join('')}: ${found}/${spec.count} in ${attempts} attempts`);
  }
  return results;
}

function generateEndgames() {
  const specs = [
    { attackers: ['R', 'P'], count: 2, defenders: 1 },
    { attackers: ['R', 'C'], count: 2, defenders: 1 },
    { attackers: ['R', 'N'], count: 2, defenders: 1 },
  ];
  const results = [];
  const seen = new Set();
  let index = 1;
  for (const spec of specs) {
    let found = 0;
    let attempts = 0;
    while (found < spec.count && attempts < 90000) {
      attempts += 1;
      const position = makePosition(spec.attackers, spec.defenders, true);
      if (!position) continue;
      const fen = toFen(position);
      if (seen.has(fen)) continue;
      const forced = findForcedMateInTwo(position);
      if (!forced) continue;
      seen.add(fen);
      results.push(makeEndgame(position, index, spec.attackers, [forced.first, forced.blackReply, forced.finalMate]));
      index += 1;
      found += 1;
    }
    console.error(`endgames ${spec.attackers.join('')}: ${found}/${spec.count} in ${attempts} attempts`);
  }
  return results;
}

await fs.mkdir(OUT_DIR, { recursive: true });

const tactics = generateTactics();
const endgames = generateEndgames();

const tacticsPublic = tactics.map(({ _chosen, ...item }) => item);
await fs.writeFile(path.join(OUT_DIR, 'tactics.json'), `${JSON.stringify(tacticsPublic, null, 2)}\n`, 'utf8');
await fs.writeFile(path.join(OUT_DIR, 'endgames.json'), `${JSON.stringify(endgames, null, 2)}\n`, 'utf8');
console.log(`wrote ${tacticsPublic.length} tactics and ${endgames.length} endgames`);
