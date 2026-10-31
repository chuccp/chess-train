import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = process.env.VITE_OUT_DIR || 'dist';
const dir = path.join(ROOT, 'apps/web', outDir);
const configuredBasePath = process.env.VITE_BASE_PATH || '/';
const basePath = normalizeBasePath(configuredBasePath);
const configuredSiteUrl =
  process.env.VITE_SITE_URL?.trim() || (await readSiteConfigUrl());
const fallbackOrigin =
  basePath === '/'
    ? 'http://127.0.0.1:4173/'
    : 'https://chuccp.github.io/';
const siteUrl = normalizeSiteUrl(
  configuredSiteUrl || new URL(basePath, fallbackOrigin).href,
);

const coreRoutes = [
  {
    path: '',
    title: '棋练 · 中国象棋在线对弈与 AI 训练',
    description:
      '棋练是免费的中国象棋在线练习场：支持 AI 人机对弈与双人同屏，提供一步杀法、残棋定式和开局训练。',
    robots: 'index,follow,max-image-preview:large',
  },
  {
    path: 'play',
    title: '中国象棋人机对弈 · 在线 AI 与双人同屏 | 棋练',
    description:
      '免费在线下中国象棋，可选入门、进阶、挑战三档 AI，也能在同一台设备双人轮流走子。无需注册，棋谱保存在本机。',
    robots: 'index,follow,max-image-preview:large',
  },
  {
    path: 'endgames',
    title: '自定义残局 · 自己摆局与 FEN 分享 | 棋练',
    description:
      '自己摆放中国象棋残局并保存在本机，可继续人机对弈或双人同屏；复制 FEN 就能把同一局面分享给朋友。',
    robots: 'index,follow,max-image-preview:large',
  },
  {
    path: 'endgames/edit',
    title: '编辑自定义残局 | 棋练',
    description: '摆放棋子、导入或复制 FEN，保存到本机后即可人机或双人继续对弈。',
    robots: 'noindex,follow',
  },
  {
    path: 'local',
    title: '在线棋类游戏 · 五子棋、斗兽棋、跳棋、四子棋 | 棋练',
    description:
      '免费在线玩五子棋、斗兽棋、中国跳棋和四子棋，每一种都支持 AI 人机对战或双人同屏。',
    robots: 'index,follow,max-image-preview:large',
  },
  {
    path: 'local/gomoku',
    title: '五子棋在线对战 · AI 人机与双人同屏 | 棋练',
    description: '免费在线玩 15×15 五子棋，支持 AI 人机对战和同屏双人。',
    robots: 'index,follow,max-image-preview:large',
  },
  {
    path: 'local/jungle',
    title: '斗兽棋在线对战 · AI 人机与双人同屏 | 棋练',
    description: '免费在线玩斗兽棋，支持 AI 人机与同屏双人。',
    robots: 'index,follow,max-image-preview:large',
  },
  {
    path: 'local/checkers',
    title: '中国跳棋在线对战 · 十子归营与连跳 | 棋练',
    description: '免费在线玩 121 孔中国跳棋，支持连续跳跃、借桥移动和十子归营。',
    robots: 'index,follow,max-image-preview:large',
  },
  {
    path: 'local/connect4',
    title: '四子棋在线对战 · 7×6 重力落子 | 棋练',
    description: '免费在线玩四子棋，横、竖、斜先连四子获胜，支持 AI 与双人同屏。',
    robots: 'index,follow,max-image-preview:large',
  },
  {
    path: 'train',
    title: '中国象棋训练 · 一步杀、残局定式与开局 | 棋练',
    description:
      '免费的中国象棋训练场：一步杀法、残棋定式和开局主线按入门、进阶、挑战分级。',
    robots: 'index,follow,max-image-preview:large',
  },
  {
    path: 'train/tactics',
    title: '一步杀法题库 · 中国象棋杀法 | 棋练',
    description: '练习中国象棋一步杀法，在线作答并即时校验将死与困毙。',
    robots: 'index,follow,max-image-preview:large',
  },
  {
    path: 'train/endgame',
    title: '中国象棋残局定式 · 多步训练 | 棋练',
    description: '按难度练习中国象棋残棋定式，从短杀到多步追杀。',
    robots: 'index,follow,max-image-preview:large',
  },
  {
    path: 'train/opening',
    title: '中国象棋开局训练 · 经典主线 | 棋练',
    description: '学习中国象棋开局主线，理解出子顺序、护中和占位。',
    robots: 'index,follow,max-image-preview:large',
  },
  {
    path: 'history',
    title: '本机棋谱 | 棋练',
    description: '查看和回放保存在本机的中国象棋棋谱。棋谱不会上传到服务器。',
    robots: 'noindex,follow',
  },
  {
    path: 'settings',
    title: '对弈与训练设置 | 棋练',
    description: '调整中国象棋难度、执子、悔棋、提示、音效和本地数据设置。',
    robots: 'noindex,follow',
  },
  {
    path: 'about',
    title: '关于棋练 · 中国象棋练习场',
    description:
      '了解棋练的在线与本地 AI、离线训练、隐私和开源许可。棋谱只保存在当前设备。',
    robots: 'index,follow,max-image-preview:large',
  },
];

function normalizeBasePath(value) {
  return `/${value.replace(/^\/+|\/+$/g, '')}/`.replace(/^\/\/$/, '/');
}

function normalizeSiteUrl(value) {
  const url = new URL(value);
  url.hash = '';
  url.search = '';
  url.pathname = normalizeBasePath(url.pathname);
  return url.href;
}

function absoluteRouteUrl(routePath) {
  return new URL(routePath, siteUrl).href;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function replaceMeta(html, attribute, key, content) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}="${escapedKey}"[^>]*>`, 'i');
  if (!pattern.test(html)) {
    return html.replace(
      '</head>',
      `    <meta ${attribute}="${key}" content="${escapeHtml(content)}" />\n  </head>`,
    );
  }
  return html.replace(
    pattern,
    `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`,
  );
}

function replaceCanonical(html, href) {
  return html.replace(
    /<link\s+[^>]*rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${escapeHtml(href)}" />`,
  );
}

function withMetadata(template, metadata) {
  const canonicalUrl = absoluteRouteUrl(metadata.path);
  const socialImageUrl = absoluteRouteUrl('social-preview.jpg');
  const descriptionTag = `<meta name="description" content="${escapeHtml(metadata.description)}" />`;
  let html = template.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(metadata.title)}</title>`,
  );
  if (/<meta\s+name="description"[^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name="description"[^>]*>/i, descriptionTag);
  } else {
    html = html.replace('</head>', `    ${descriptionTag}\n  </head>`);
  }
  html = replaceMeta(html, 'name', 'robots', metadata.robots);
  html = replaceMeta(html, 'name', 'googlebot', metadata.robots);
  html = replaceMeta(html, 'property', 'og:title', metadata.title);
  html = replaceMeta(html, 'property', 'og:description', metadata.description);
  html = replaceMeta(html, 'property', 'og:url', canonicalUrl);
  html = replaceMeta(html, 'property', 'og:image', socialImageUrl);
  html = replaceMeta(html, 'name', 'twitter:title', metadata.title);
  html = replaceMeta(html, 'name', 'twitter:description', metadata.description);
  html = replaceMeta(html, 'name', 'twitter:image', socialImageUrl);
  return replaceCanonical(html, canonicalUrl);
}

async function readSiteConfigUrl() {
  try {
    const config = await readJson('site.config.json');
    return typeof config?.siteUrl === 'string' ? config.siteUrl.trim() : '';
  } catch {
    return '';
  }
}
async function readJson(relativePath) {
  const source = await fs.readFile(path.join(ROOT, relativePath), 'utf8');
  return JSON.parse(source);
}

function trimDescription(value, fallback) {
  const text = String(value || fallback).replace(/\s+/g, ' ').trim();
  return text.length > 155 ? `${text.slice(0, 154)}…` : text;
}

function levelName(level) {
  return level === 1 ? '入门' : level === 2 ? '进阶' : '挑战';
}

function openingMetadataFromTypeScript(source) {
  const records = [];
  const pattern =
    /"id":\s*"(opening-[^"]+)"[\s\S]*?"title":\s*"([^"]+)"[\s\S]*?"subtitle":\s*"([^"]+)"[\s\S]*?"level":\s*([123])/g;
  for (const match of source.matchAll(pattern)) {
    records.push({
      id: match[1],
      title: match[2],
      subtitle: match[3],
      level: Number(match[4]),
    });
  }
  return records;
}

async function publicContentRoutes() {
  const [tactics, tacticsExtra, endgames, endgamesExtra, openingSource, openingsExtra] =
    await Promise.all([
      readJson('packages/content/src/data/tactics.json'),
      readJson('packages/content/src/data/tactics-extra.json'),
      readJson('packages/content/src/data/endgames.json'),
      readJson('packages/content/src/data/endgame-extra.json'),
      fs.readFile(path.join(ROOT, 'packages/content/src/data/openings.ts'), 'utf8'),
      readJson('packages/content/src/data/openings-extra.json'),
    ]);

  const routes = [];
  const seenTactics = new Set();
  for (const exercise of [...tactics, ...tacticsExtra]) {
    if (!exercise?.id || seenTactics.has(exercise.id)) continue;
    seenTactics.add(exercise.id);
    routes.push({
      path: `train/tactics/${exercise.id}`,
      title: `${exercise.title} · 中国象棋一步杀 | 棋练`,
      description: trimDescription(
        `${exercise.subtitle}。${(exercise.tags || []).join('、')}，${levelName(exercise.level)}难度。在棋盘上作答并即时验证将死或困毙。`,
        '中国象棋一步杀法在线练习。',
      ),
      robots: 'index,follow,max-image-preview:large',
    });
  }

  const reachableEndgames = [];
  const seenEndgameIds = new Set(['endgame-01', 'endgame-02']);
  const seenLines = new Set();
  for (const lesson of [...endgames, ...endgamesExtra]) {
    if (!lesson?.id || seenEndgameIds.has(lesson.id)) continue;
    const signature = (lesson.lines?.[0]?.moves || []).map((move) => move.ucci).join(' ');
    if (!signature || seenLines.has(signature)) continue;
    seenEndgameIds.add(lesson.id);
    seenLines.add(signature);
    reachableEndgames.push(lesson);
  }
  reachableEndgames.push({
    id: 'endgame-stalemate-01',
    title: '原创困毙 · 帅控将门',
    subtitle: '红先，两步困毙黑方',
    level: 1,
    intro: '困毙也是中国象棋的胜法。黑方没有被将军，但没有任何合法着法，同样判红方获胜。',
  });
  for (const lesson of reachableEndgames) {
    routes.push({
      path: `train/endgame/${lesson.id}`,
      title: `${lesson.title} · 中国象棋残局定式 | 棋练`,
      description: trimDescription(lesson.intro, `${lesson.subtitle}。中国象棋残局定式训练。`),
      robots: 'index,follow,max-image-preview:large',
    });
  }

  const seenOpenings = new Set();
  for (const lesson of [
    ...openingMetadataFromTypeScript(openingSource),
    ...openingsExtra,
  ]) {
    if (!lesson?.id || seenOpenings.has(lesson.id)) continue;
    seenOpenings.add(lesson.id);
    routes.push({
      path: `train/opening/${lesson.id}`,
      title: `${lesson.title} · 中国象棋开局训练 | 棋练`,
      description: trimDescription(
        `${lesson.subtitle}。跟随主线练习中国象棋开局出子顺序与阵形。`,
        '中国象棋开局主线训练。',
      ),
      robots: 'index,follow,max-image-preview:large',
    });
  }

  return routes;
}

async function writeRoute(html, routePath) {
  if (!routePath) {
    await fs.writeFile(path.join(dir, 'index.html'), html);
    return;
  }
  const routeDir = path.join(dir, routePath);
  const resolved = path.resolve(routeDir);
  if (!resolved.startsWith(`${path.resolve(dir)}${path.sep}`)) {
    throw new Error(`Refusing to write route outside output directory: ${routePath}`);
  }
  await fs.mkdir(routeDir, { recursive: true });
  await fs.writeFile(path.join(routeDir, 'index.html'), html);
}

function sitemapXml(routes) {
  const urls = routes
    .filter((route) => route.robots.startsWith('index'))
    .map((route) => `  <url><loc>${escapeHtml(absoluteRouteUrl(route.path))}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

await fs.access(path.join(dir, 'index.html'));
const template = await fs.readFile(path.join(dir, 'index.html'), 'utf8');
const contentRoutes = await publicContentRoutes();
const allRoutes = [...coreRoutes, ...contentRoutes];

for (const route of allRoutes) {
  await writeRoute(withMetadata(template, route), route.path);
}

const notFound = withMetadata(template, {
  path: '404',
  title: '页面不存在 | 棋练',
  description: '这个地址没有对应的棋局或页面。回到棋练继续下棋或训练。',
  robots: 'noindex,follow',
}).replace(/<link\s+[^>]*rel="canonical"[^>]*>/i, '');

await fs.writeFile(path.join(dir, '404.html'), notFound);
await fs.writeFile(path.join(dir, '.nojekyll'), '');
await fs.writeFile(
  path.join(dir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${absoluteRouteUrl('sitemap.xml')}\n`,
);
await fs.writeFile(path.join(dir, 'sitemap.xml'), sitemapXml(allRoutes));

console.log(
  `postbuild: wrote ${allRoutes.length} route shells, sitemap.xml, robots.txt and 404.html for ${siteUrl}`,
);
