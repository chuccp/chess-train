/**
 * Generate an additional deterministic pack of original one-move tactics.
 *
 * A selected position has no immediate check and at least one legal move that
 * wins by either checkmate or stalemate. Every winning move is recorded.
 *
 * Run with:
 *   node --experimental-strip-types tools/generate-tactics-pack.mjs
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

const OUT_PATH = path.resolve('packages/content/src/data/tactics-extra.json');
const EXISTING_PATH = path.resolve('packages/content/src/data/tactics.json');
const EXISTING_ENDGAMES_PATH = path.resolve('packages/content/src/data/endgames.json');
const REVIEWED_AT = '2026-10-25';
const SOURCE = {
  name: '棋练原创编排',
  author: '棋练项目组',
  license: 'CC0-1.0',
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

const random = mulberry32(20261026);
const randomInt = (max) => Math.floor(random() * max);
const pick = (items) => items[randomInt(items.length)];
const square = (file, rank) => rank * 9 + file;
const apply = (position, move) => applyMove(position, move.from, move.to);

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

function winningMoves(position) {
  return generateLegalMoves(position).flatMap((move) => {
    const result = apply(position, move);
    if (!result.ok) return [];
    const end = evaluateBoard(result.position, { positionHashes: [] });
    return end.status === 'win' && end.winner === 'r'
      ? [{ move, result, reason: end.reason }]
      : [];
  });
}

function themeFor(attackers) {
  const types = new Set(attackers);
  if (types.has('R') && types.has('C')) return '车炮配合';
  if (types.has('R') && types.has('N')) return '车马配合';
  if (types.has('N') && types.has('C')) return '马炮配合';
  if (types.has('R') && types.has('P')) return '车兵配合';
  return '双车配合';
}

function makeTactic(position, wins, index, attackers) {
  const branch = generateLegalMoves(position).length;
  const score = branch - 3 * wins.length;
  const level = score <= 20 ? 1 : score <= 34 ? 2 : 3;
  const hasStalemate = wins.some((win) => win.reason === 'stalemate');
  return {
    id: `tactic-extra-${String(index + 1).padStart(2, '0')}`,
    kind: 'tactics',
    title: `${themeFor(attackers)} · 一步杀 ${String(index + 1).padStart(2, '0')}`,
    subtitle: '红先，一步将死或困毙',
    level,
    order: 3000 + index,
    tags: [themeFor(attackers), '一步杀', hasStalemate ? '含困毙' : '将死'],
    source: SOURCE,
    reviewedAt: REVIEWED_AT,
    reviewedBy: '规则核全量校验',
    fen: toFen(position),
    goal: 'mate',
    solutions: wins.map((win) => [moveToUcci(win.move.from, win.move.to)]),
    hint: '先找能直接封死九宫退路的着法。',
    explanation: '所有合法的一步胜利着法均已记录，将死与困毙都计入答案。',
  };
}

const existing = JSON.parse(await fs.readFile(EXISTING_PATH, 'utf8'));
const existingEndgames = JSON.parse(await fs.readFile(EXISTING_ENDGAMES_PATH, 'utf8'));
const seenPositions = new Set([
  ...existing.map((tactic) => tactic.fen),
  ...existingEndgames.map((lesson) => lesson.fen),
]);
const specs = [
  { attackers: ['R', 'R'], count: 6, defenders: 1 },
  { attackers: ['R', 'C'], count: 6, defenders: 1 },
  { attackers: ['R', 'N'], count: 6, defenders: 1 },
  { attackers: ['C', 'N'], count: 6, defenders: 0 },
  { attackers: ['R', 'P'], count: 6, defenders: 1 },
];
const results = [];

for (const spec of specs) {
  let found = 0;
  let attempts = 0;
  while (found < spec.count && attempts < 180_000) {
    attempts += 1;
    const position = makePosition(spec.attackers, spec.defenders);
    if (!position) continue;
    const fen = toFen(position);
    if (seenPositions.has(fen)) continue;
    const wins = winningMoves(position);
    if (wins.length === 0 || wins.length > 4) continue;
    seenPositions.add(fen);
    results.push(makeTactic(position, wins, results.length, spec.attackers));
    found += 1;
  }
  console.error(`${spec.attackers.join('')}: ${found}/${spec.count} in ${attempts} attempts`);
}

await fs.writeFile(OUT_PATH, `${JSON.stringify(results, null, 2)}\n`, 'utf8');
console.log(`wrote ${results.length} extra tactics`);
