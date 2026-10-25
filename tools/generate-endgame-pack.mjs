/**
 * Generate an additional deterministic pack of original two-step endgames.
 *
 * Each selected position:
 * - has no legal mate in one;
 * - has a checkmating follow-up for every legal Black reply;
 * - is unique by FEN and by its recorded main line.
 *
 * Run with:
 *   node --experimental-strip-types tools/generate-endgame-pack.mjs
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

const OUT_PATH = path.resolve('packages/content/src/data/endgame-extra.json');
const EXISTING_PATH = path.resolve('packages/content/src/data/endgames.json');
const TACTICS_PATH = path.resolve('packages/content/src/data/tactics.json');
const TACTICS_EXTRA_PATH = path.resolve('packages/content/src/data/tactics-extra.json');
const REVIEWED_AT = '2026-10-25';
const SOURCE = {
  name: '棋练原创编排',
  author: '棋练项目组',
  license: 'CC0-1.0',
};
const GLYPH = {
  R: '车',
  C: '炮',
  N: '马',
  P: '兵',
};
const PALACE = {
  r: [3, 4, 5].flatMap((file) => [0, 1, 2].map((rank) => [file, rank])),
  b: [3, 4, 5].flatMap((file) => [7, 8, 9].map((rank) => [file, rank])),
};
const ADVISOR = [[3, 9], [5, 9], [4, 8], [3, 7], [5, 7]];
const ELEPHANT = [[2, 9], [6, 9], [0, 7], [4, 7], [8, 7], [2, 5], [6, 5]];

function mulberry32(seed) {
  let value = seed >>> 0;
  return function random() {
    value += 0x6d2b79f5;
    let result = Math.imul(value ^ (value >>> 15), 1 | value);
    result ^= result + Math.imul(result ^ (result >>> 7), 61 | result);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(20261025);
const randomInt = (max) => Math.floor(random() * max);
const pick = (items) => items[randomInt(items.length)];
const square = (file, rank) => rank * 9 + file;
const apply = (position, move) => applyMove(position, move.from, move.to);
const isMate = (position, color) => {
  const end = evaluateBoard(position);
  return end.status === 'win' && end.winner === color && end.reason === 'checkmate';
};

function emptyBoard() {
  return Array.from({ length: 90 }, () => null);
}

function place(board, file, rank, color, type) {
  board[square(file, rank)] = { color, type };
}

function freeSpot(board, minFile = 0, maxFile = 8, minRank = 0, maxRank = 9) {
  for (let attempt = 0; attempt < 300; attempt += 1) {
    const file = minFile + randomInt(maxFile - minFile + 1);
    const rank = minRank + randomInt(maxRank - minRank + 1);
    if (!board[square(file, rank)]) return [file, rank];
  }
  return null;
}

function makePosition(attackers, defenderCount) {
  const board = emptyBoard();
  const redKing = pick(PALACE.r);
  const blackKing = pick(PALACE.b);
  place(board, ...redKing, 'r', 'K');
  place(board, ...blackKing, 'b', 'K');

  for (const type of attackers) {
    const spot = freeSpot(board, 1, 7, 5, 9);
    if (!spot) return null;
    place(board, ...spot, 'r', type);
  }

  for (let index = 0; index < defenderCount; index += 1) {
    const type = random() < 0.5 ? 'A' : 'B';
    const spots = type === 'A' ? ADVISOR : ELEPHANT;
    for (let attempt = 0; attempt < 30; attempt += 1) {
      const spot = pick(spots);
      if (board[square(...spot)]) continue;
      place(board, ...spot, 'b', type);
      break;
    }
  }

  const position = { board, turn: 'r', halfmoveClock: 0, fullmove: 1 };
  if (isInCheck(position, 'r') || isInCheck(position, 'b')) return null;
  if (generateLegalMoves(position).length === 0) return null;
  if (generateLegalMoves({ ...position, turn: 'b' }).length === 0) return null;
  return position;
}

function mateInOneMoves(position) {
  return generateLegalMoves(position).flatMap((move) => {
    const result = apply(position, move);
    return result.ok && isMate(result.position, 'r') ? [{ move, result }] : [];
  });
}

function hasImmediateWin(position) {
  return generateLegalMoves(position).some((move) => {
    const result = apply(position, move);
    if (!result.ok) return false;
    const end = evaluateBoard(result.position);
    return end.status === 'win' && end.winner === 'r';
  });
}

function findForcedMateInTwo(position) {
  if (hasImmediateWin(position)) return null;
  for (const first of generateLegalMoves(position)) {
    const firstResult = apply(position, first);
    if (!firstResult.ok || isMate(firstResult.position, 'r')) continue;
    const replies = generateLegalMoves(firstResult.position);
    if (replies.length === 0) continue;

    let canonicalReply = null;
    let canonicalFinal = null;
    let allRepliesLose = true;
    for (const reply of replies) {
      const replyResult = apply(firstResult.position, reply);
      if (!replyResult.ok) {
        allRepliesLose = false;
        break;
      }
      const finalMoves = mateInOneMoves(replyResult.position);
      if (finalMoves.length === 0) {
        allRepliesLose = false;
        break;
      }
      if (!canonicalReply) {
        canonicalReply = replyResult;
        canonicalFinal = finalMoves[0];
      }
    }
    if (allRepliesLose && canonicalReply && canonicalFinal) {
      return { first: firstResult, reply: canonicalReply, final: canonicalFinal };
    }
  }
  return null;
}

function themeFor(attackers) {
  const types = new Set(attackers);
  if (types.has('R') && types.has('C')) return '车炮配合';
  if (types.has('R') && types.has('N')) return '车马配合';
  if (types.has('N') && types.has('C')) return '马炮配合';
  if (types.has('R') && types.has('P')) return '车兵配合';
  return '双车配合';
}

function makeLesson(position, line, index, attackers) {
  const theme = themeFor(attackers);
  return {
    id: `endgame-extra-${String(index + 1).padStart(2, '0')}`,
    kind: 'endgame',
    title: `${theme} · 多步杀练习 ${String(index + 1).padStart(2, '0')}`,
    subtitle: '先控将门，再完成合围',
    level: 1,
    order: 2000 + index,
    tags: [theme, '原创', '多步杀'],
    source: SOURCE,
    reviewedAt: REVIEWED_AT,
    reviewedBy: '规则核强制应手校验',
    fen: toFen(position),
    userColor: 'r',
    objective: 'win',
    intro: '从短杀开始，先收紧黑将的活动空间，再完成最后合围。',
    keyPoints: ['先找能将军的着法', '观察黑方全部合法应手', '最后封住九宫退路'],
    lines: [{
      id: 'main',
      label: '主线 · 两步成杀',
      moves: [
        { ucci: moveToUcci(line.first.move.from, line.first.move.to), comment: `先手：${line.first.notation}。${theme}的关键是收紧将门。` },
        { ucci: moveToUcci(line.reply.move.from, line.reply.move.to), comment: `黑方应 ${line.reply.notation}，仍在红方合围之内。` },
        { ucci: moveToUcci(line.final.move.from, line.final.move.to), comment: `收口：${line.final.result.notation}，形成将死。` },
      ],
    }],
    completionText: '合围完成。记住先压缩空间，再完成最后绝杀。',
  };
}

const existing = JSON.parse(await fs.readFile(EXISTING_PATH, 'utf8'));
const existingTactics = JSON.parse(await fs.readFile(TACTICS_PATH, 'utf8'));
const existingTacticsExtra = JSON.parse(await fs.readFile(TACTICS_EXTRA_PATH, 'utf8'));
const seenPositions = new Set([
  ...existing.map((lesson) => lesson.fen),
  ...existingTactics.map((tactic) => tactic.fen),
  ...existingTacticsExtra.map((tactic) => tactic.fen),
]);
const seenLines = new Set(existing.map((lesson) =>
  lesson.lines?.[0]?.moves?.map((move) => move.ucci).join(' ') ?? ''));
const specs = [
  { attackers: ['R', 'R'], count: 12, defenders: 1 },
  { attackers: ['R', 'C'], count: 12, defenders: 1 },
  { attackers: ['R', 'N'], count: 12, defenders: 1 },
  { attackers: ['C', 'N'], count: 12, defenders: 0 },
  { attackers: ['R', 'P'], count: 12, defenders: 1 },
];
const results = [];

for (const spec of specs) {
  let found = 0;
  let attempts = 0;
  while (found < spec.count && attempts < 250_000) {
    attempts += 1;
    const position = makePosition(spec.attackers, spec.defenders);
    if (!position) continue;
    const fen = toFen(position);
    if (seenPositions.has(fen)) continue;
    const line = findForcedMateInTwo(position);
    if (!line) continue;
    const signature = [line.first, line.reply, line.final]
      .map((result) => moveToUcci(result.move.from, result.move.to))
      .join(' ');
    if (seenLines.has(signature)) continue;
    seenPositions.add(fen);
    seenLines.add(signature);
    results.push(makeLesson(position, line, results.length, spec.attackers));
    found += 1;
  }
  console.error(`${spec.attackers.join('')}: ${found}/${spec.count} in ${attempts} attempts`);
}

await fs.writeFile(OUT_PATH, `${JSON.stringify(results, null, 2)}\n`, 'utf8');
console.log(`wrote ${results.length} extra endgames`);
