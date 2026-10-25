/**
 * Build a verified opening pack from public-domain DhtmlXQ records.
 *
 * Only standard-start, legal main lines that do not duplicate the existing
 * opening library are included.
 *
 * Run with:
 *   node --experimental-strip-types tools/generate-opening-pack.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import {
  START_FEN,
  applyMove,
  moveToUcci,
  parseFen,
  squareAt,
} from '../packages/xiangqi/src/index.ts';
import { openingLessons } from '../packages/content/src/data/openings.ts';

const OUT_PATH = path.resolve('packages/content/src/data/openings-extra.json');
const REVIEWED_AT = '2026-10-25';
const STANDARD_BINIT =
  '8979695949392919097717866646260600102030405060708012720323436383';
const SOURCE_IDS = [
  64694, 64695, 64697, 64698, 64699, 64700, 64701, 64702, 64703, 64704,
  64705, 64706, 64707, 64708, 64709, 64710, 64711, 64712, 64713,
  69069, 69090,
  68389, 68390, 68391, 68392, 68393, 68394, 68395, 68396,
  68242, 68243, 68244, 68245, 68246, 68247, 68248, 68249, 68250,
  68251, 68252, 68253, 68254, 68255, 68256, 68257, 68258,
  59050, 65748, 65749, 65750, 65751, 65752, 65753, 65754, 65755,
  65756, 65757, 65758, 65759, 65760, 65761, 65762, 65763, 65764,
  65765, 65766, 65767, 65768, 65769, 65770, 65771, 65772, 65773,
  65774, 65775, 65776, 65777, 65780, 65782,
  68104, 68105, 68106, 68121, 68126, 68128, 68141, 68148, 68150,
  68151, 68152, 68159, 68161, 68163, 68167, 68168, 68169, 68172,
  68173, 68174, 68175, 68176, 68186, 68194, 68196, 68208, 68211,
  68215, 68216, 68218, 68233, 68239, 68241,
  64467, 64468, 64469, 64470, 64471, 64472, 64473, 64474, 64475,
  64476, 64477, 64488, 64489, 64490, 64491, 64492, 64493, 64494,
  64495, 64496, 64497, 64498, 64503, 64504, 64505, 64506, 64507,
  64508, 64509, 64510, 64511, 64512, 64513,
  64514, 64515, 64516, 64517, 64518, 64519, 64520, 64521, 64522,
  64523, 64524, 64525, 64714, 64715, 64716, 64717,
];

function pickField(html, name) {
  return html.match(new RegExp(`\\[DhtmlXQ_${name}\\]([^\\[]*)`))?.[1]?.trim() ?? '';
}

function decodeMove(code) {
  if (!/^\d{4}$/.test(code)) return null;
  const fromFile = Number(code[0]);
  const toFile = Number(code[2]);
  const fromRank = 9 - Number(code[1]);
  const toRank = 9 - Number(code[3]);
  if (
    fromFile < 0 || fromFile > 8 || toFile < 0 || toFile > 8 ||
    fromRank < 0 || fromRank > 9 || toRank < 0 || toRank > 9
  ) {
    return null;
  }
  return {
    from: squareAt(fromFile, fromRank),
    to: squareAt(toFile, toRank),
  };
}

const existingSequences = new Set(
  openingLessons.map((lesson) => lesson.lines[0]?.moves.map((move) => move.ucci).join(' ') ?? ''),
);
const packSequences = new Set();
const lessons = [];

for (const sourceId of SOURCE_IDS) {
  const response = await fetch(`https://www.xqdao.com/qipu/show/${sourceId}/`);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${sourceId}`);
  const html = await response.text();
  const binit = pickField(html, 'binit');
  const moveCode = pickField(html, 'movelist');
  const titleHtml = html.match(/<h1>([^<]+)<\/h1>/)?.[1]?.trim() ?? '';
  const event = pickField(html, 'event').replaceAll('桔中秘', '橘中秘');
  const round = pickField(html, 'round');
  if (binit !== STANDARD_BINIT || !moveCode || moveCode.length % 4 !== 0) continue;

  let position = parseFen(START_FEN);
  const moves = [];
  let valid = true;
  for (let index = 0; index < moveCode.length; index += 4) {
    const decoded = decodeMove(moveCode.slice(index, index + 4));
    if (!decoded) {
      valid = false;
      break;
    }
    const result = applyMove(position, decoded.from, decoded.to);
    if (!result.ok) {
      valid = false;
      break;
    }
    moves.push({
      ucci: moveToUcci(decoded.from, decoded.to),
      comment: `${result.notation}。`,
    });
    position = result.position;
  }
  if (!valid || moves.length < 2) continue;

  const signature = moves.map((move) => move.ucci).join(' ');
  if (existingSequences.has(signature) || packSequences.has(signature)) continue;
  packSequences.add(signature);

  const escapedEvent = event.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const cleanedTitle = titleHtml
    .replace(/\s*[（(](?:桔|橘)中秘[）)]\s*$/, '')
    .replace(new RegExp(`\\s*[（(]${escapedEvent}[）)]\\s*$`), '')
    .trim();
  const level = moves.length <= 12 ? 1 : moves.length <= 36 ? 2 : 3;
  const index = lessons.length;
  lessons.push({
    id: `opening-extra-${String(index + 1).padStart(2, '0')}`,
    kind: 'opening',
    title: `${event} · ${cleanedTitle}`,
    subtitle: `${round || '得先'} · ${moves.length} 步古谱主线`,
    level,
    order: 1000 + index,
    tags: ['古谱', event, '开局'],
    source: {
      name: `《${event}》${cleanedTitle}`,
      author: '古谱原编',
      license: '公有领域（古谱原文）',
      url: `https://www.xqdao.com/qipu/show/${sourceId}/`,
    },
    reviewedAt: REVIEWED_AT,
    reviewedBy: '规则核逐着校验',
    fen: START_FEN,
    userColor: 'r',
    objective: 'demonstration',
    intro: `本局录自《${event}》${cleanedTitle}。原谱主线已逐着通过规则核校验，讲解以行棋记谱为主。`,
    keyPoints: ['先看双方出动大子的顺序', '留意车马炮之间的配合', '跟完主线后再尝试自由变着'],
    lines: [{ id: 'main', label: '原谱主线', moves }],
    completionText: `《${event}》主线完成。先掌握出动次序，再理解每一步的布局目的。`,
  });
}

await fs.writeFile(OUT_PATH, `${JSON.stringify(lessons, null, 2)}\n`, 'utf8');
console.log(`wrote ${lessons.length} extra openings`);
