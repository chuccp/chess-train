import { useEffect } from 'react';
import {
  contentStats,
  lessonById,
  tacticById,
  trainingKindLabels,
} from '@qilian/content';

const SITE_NAME = '棋练';
const SITE_ALTERNATE_NAME = '棋练中国象棋';
const DEFAULT_DESCRIPTION =
  '棋练是免费的中国象棋在线练习场：支持 AI 人机对弈与双人同屏，提供一步杀法、残棋定式和开局训练。';
const INDEXABLE = 'index,follow,max-image-preview:large';
const PRIVATE = 'noindex,follow';

export type Breadcrumb = {
  name: string;
  path: string;
};

export type PageSeo = {
  title: string;
  description: string;
  robots: typeof INDEXABLE | typeof PRIVATE;
  schemaType: 'WebPage' | 'CollectionPage' | 'LearningResource' | 'AboutPage';
  breadcrumbs?: Breadcrumb[];
  keywords?: string[];
  educationalLevel?: string;
  learningResourceType?: string;
};

const staticPages: Record<string, PageSeo> = {
  '/': {
    title: '棋练 · 中国象棋在线对弈与 AI 训练',
    description:
      `棋练提供免费的中国象棋在线对弈：可选 AI 人机或双人同屏，练习 ${contentStats.tactics} 道一步杀法、` +
      `${contentStats.endgame} 节残棋定式和 ${contentStats.opening} 套开局。无需注册，训练内容支持离线使用。`,
    robots: INDEXABLE,
    schemaType: 'WebPage',
    keywords: ['中国象棋', '在线象棋', '象棋AI', '象棋残局', '象棋开局', '象棋杀法'],
  },
  '/play': {
    title: '中国象棋人机对弈 · 在线 AI 与双人同屏 | 棋练',
    description:
      '免费在线下中国象棋，可选入门、进阶、挑战三档 AI，也能在同一台设备双人轮流走子。无需注册，棋谱保存在本机。',
    robots: INDEXABLE,
    schemaType: 'WebPage',
    breadcrumbs: [{ name: '棋练', path: '/' }],
    keywords: ['中国象棋在线下棋', '象棋人机对战', '象棋双人同屏', 'AI 象棋'],
  },
  '/endgames': {
    title: '自定义残局 · 自己摆局与 FEN 分享 | 棋练',
    description:
      '自己摆放中国象棋残局并保存在本机，可继续人机对弈或双人同屏；复制 FEN 就能把同一局面分享给朋友。',
    robots: INDEXABLE,
    schemaType: 'CollectionPage',
    breadcrumbs: [{ name: '棋练', path: '/' }],
    keywords: ['自定义残局', '象棋摆局', '象棋残局', 'FEN 分享'],
  },
  '/endgames/edit': {
    title: '编辑自定义残局 | 棋练',
    description: '摆放棋子、导入或复制 FEN，保存到本机后即可人机或双人继续对弈。',
    robots: PRIVATE,
    schemaType: 'WebPage',
  },
  '/local': {
    title: '在线棋类游戏 · 五子棋、斗兽棋、跳棋、四子棋 | 棋练',
    description:
      '免费在线玩五子棋、斗兽棋、中国跳棋和四子棋，每一种都支持 AI 人机对战或双人同屏，无需下载和注册。',
    robots: INDEXABLE,
    schemaType: 'CollectionPage',
    breadcrumbs: [{ name: '棋练', path: '/' }],
    keywords: ['在线棋类游戏', '五子棋', '斗兽棋', '跳棋', '四子棋'],
  },
  '/local/gomoku': {
    title: '五子棋在线对战 · AI 人机与双人同屏 | 棋练',
    description:
      '免费在线玩 15×15 五子棋，横、竖、斜先连成五子获胜。支持 AI 人机对战和同屏双人，棋局只保存在本机。',
    robots: INDEXABLE,
    schemaType: 'WebPage',
    breadcrumbs: [
      { name: '棋练', path: '/' },
      { name: '其它棋类', path: '/local' },
    ],
    keywords: ['五子棋在线', '五子棋AI', '双人五子棋', '免费五子棋'],
  },
  '/local/jungle': {
    title: '斗兽棋在线对战 · AI 人机与双人同屏 | 棋练',
    description:
      '免费在线玩斗兽棋，体验象狮虎豹相克、鼠吃象、狮虎跳河、陷阱和兽穴规则。支持 AI 人机与同屏双人。',
    robots: INDEXABLE,
    schemaType: 'WebPage',
    breadcrumbs: [
      { name: '棋练', path: '/' },
      { name: '其它棋类', path: '/local' },
    ],
    keywords: ['斗兽棋在线', '斗兽棋AI', '双人斗兽棋', '免费斗兽棋'],
  },
  '/local/checkers': {
    title: '中国跳棋在线对战 · 十子归营与连跳 | 棋练',
    description:
      '免费在线玩 121 孔中国跳棋，支持连续跳跃、借桥移动和十子归营。可选 AI 人机或双人同屏。',
    robots: INDEXABLE,
    schemaType: 'WebPage',
    breadcrumbs: [
      { name: '棋练', path: '/' },
      { name: '其它棋类', path: '/local' },
    ],
    keywords: ['中国跳棋在线', '跳棋AI', '双人跳棋', '免费跳棋游戏'],
  },
  '/local/connect4': {
    title: '四子棋在线对战 · 7×6 重力落子 | 棋练',
    description:
      '免费在线玩四子棋，在 7×6 棋盘选列落子，横、竖、斜先连四子获胜。支持 AI 人机与双人同屏。',
    robots: INDEXABLE,
    schemaType: 'WebPage',
    breadcrumbs: [
      { name: '棋练', path: '/' },
      { name: '其它棋类', path: '/local' },
    ],
    keywords: ['四子棋在线', '四子棋AI', '双人四子棋', 'Connect Four'],
  },
  '/train': {
    title: '中国象棋训练 · 一步杀、残局定式与开局 | 棋练',
    description:
      `免费的中国象棋训练场：${contentStats.tactics} 道一步杀法、${contentStats.endgame} 节残棋定式、` +
      `${contentStats.opening} 套开局主线，按入门、进阶、挑战分级，可在浏览器中随时练习。`,
    robots: INDEXABLE,
    schemaType: 'CollectionPage',
    breadcrumbs: [{ name: '棋练', path: '/' }],
    keywords: ['中国象棋训练', '象棋杀法', '象棋残局', '象棋开局', '象棋题库'],
  },
  '/train/tactics': {
    title: `一步杀法题库 · ${contentStats.tactics} 道中国象棋杀法 | 棋练`,
    description:
      `练习 ${contentStats.tactics} 道中国象棋一步杀法，按入门、进阶、挑战排序。在线作答并即时校验将死与困毙，可搜索标签和古谱来源。`,
    robots: INDEXABLE,
    schemaType: 'CollectionPage',
    breadcrumbs: [
      { name: '棋练', path: '/' },
      { name: '象棋训练', path: '/train' },
    ],
    keywords: ['一步杀法', '中国象棋杀法', '象棋杀法题库', '将死练习', '困毙'],
  },
  '/train/endgame': {
    title: `中国象棋残局定式 · ${contentStats.endgame} 节多步训练 | 棋练`,
    description:
      `按难度练习 ${contentStats.endgame} 节中国象棋残棋定式，从短杀到多步追杀，包含《适情雅趣》《橘中秘》等古谱来源。`,
    robots: INDEXABLE,
    schemaType: 'CollectionPage',
    breadcrumbs: [
      { name: '棋练', path: '/' },
      { name: '象棋训练', path: '/train' },
    ],
    keywords: ['中国象棋残局', '残棋定式', '象棋古谱', '象棋残局练习'],
  },
  '/train/opening': {
    title: `中国象棋开局训练 · ${contentStats.opening} 套经典主线 | 棋练`,
    description:
      `学习 ${contentStats.opening} 套中国象棋开局主线，理解中炮、屏风马等布局的出子顺序、护中和占位，按难度逐步练习。`,
    robots: INDEXABLE,
    schemaType: 'CollectionPage',
    breadcrumbs: [
      { name: '棋练', path: '/' },
      { name: '象棋训练', path: '/train' },
    ],
    keywords: ['中国象棋开局', '象棋布局', '中炮', '屏风马', '象棋开局教学'],
  },
  '/history': {
    title: '本机棋谱 | 棋练',
    description: '查看和回放保存在本机的中国象棋棋谱。棋谱不会上传到服务器。',
    robots: PRIVATE,
    schemaType: 'WebPage',
  },
  '/settings': {
    title: '对弈与训练设置 | 棋练',
    description: '调整中国象棋难度、执子、悔棋、提示、音效和本地数据设置。',
    robots: PRIVATE,
    schemaType: 'WebPage',
  },
  '/about': {
    title: '关于棋练 · 中国象棋练习场',
    description:
      '了解棋练的功能、在线与本地 AI、离线训练、隐私和开源许可。棋练无需账号，棋谱与训练进度只保存在当前设备。',
    robots: INDEXABLE,
    schemaType: 'AboutPage',
    breadcrumbs: [{ name: '棋练', path: '/' }],
    keywords: ['棋练', '中国象棋练习场', '开源中国象棋', '离线象棋'],
  },
};

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  return `/${pathname.replace(/^\/+|\/+$/g, '')}`;
}

function levelName(level: number): string {
  if (level === 1) return '入门';
  if (level === 2) return '进阶';
  return '挑战';
}

function tacticSeo(id: string): PageSeo | null {
  const exercise = tacticById(id);
  if (!exercise) return null;
  return {
    title: `${exercise.title} · 中国象棋一步杀 | 棋练`,
    description:
      `${exercise.subtitle}。${exercise.tags.join('、')}，${levelName(exercise.level)}难度。` +
      '在棋盘上作答并即时验证将死或困毙，附提示与规则校验。',
    robots: INDEXABLE,
    schemaType: 'LearningResource',
    breadcrumbs: [
      { name: '棋练', path: '/' },
      { name: '象棋训练', path: '/train' },
      { name: '一步杀法', path: '/train/tactics' },
      { name: exercise.title, path: `/train/tactics/${exercise.id}` },
    ],
    keywords: exercise.tags,
    educationalLevel: levelName(exercise.level),
    learningResourceType: '象棋杀法练习',
  };
}

function lessonSeo(kind: 'endgame' | 'opening', id: string): PageSeo | null {
  const lesson = lessonById(kind, id);
  if (!lesson) return null;
  const label = trainingKindLabels[kind];
  return {
    title: `${lesson.title} · 中国象棋${label} | 棋练`,
    description:
      `${lesson.subtitle}。${lesson.intro.slice(0, 105)}${lesson.intro.length > 105 ? '…' : ''}`,
    robots: INDEXABLE,
    schemaType: 'LearningResource',
    breadcrumbs: [
      { name: '棋练', path: '/' },
      { name: '象棋训练', path: '/train' },
      { name: label, path: `/train/${kind}` },
      { name: lesson.title, path: `/train/${kind}/${lesson.id}` },
    ],
    keywords: [label, ...lesson.tags],
    educationalLevel: levelName(lesson.level),
    learningResourceType: `${label}教程`,
  };
}

export function seoForPath(pathname: string): PageSeo {
  const path = normalizePath(pathname);
  const staticPage = staticPages[path];
  if (staticPage) return staticPage;

  const tacticMatch = /^\/train\/tactics\/([^/]+)$/.exec(path);
  if (tacticMatch?.[1]) {
    const seo = tacticSeo(decodeURIComponent(tacticMatch[1]));
    if (seo) return seo;
  }

  const lessonMatch = /^\/train\/(endgame|opening)\/([^/]+)$/.exec(path);
  if (lessonMatch?.[1] && lessonMatch[2]) {
    const seo = lessonSeo(
      lessonMatch[1] as 'endgame' | 'opening',
      decodeURIComponent(lessonMatch[2]),
    );
    if (seo) return seo;
  }

  if (path.startsWith('/review/')) {
    return {
      title: '棋局回放 | 棋练',
      description: '回放保存在本机的中国象棋棋局。',
      robots: PRIVATE,
      schemaType: 'WebPage',
    };
  }

  return {
    title: '页面不存在 | 棋练',
    description: DEFAULT_DESCRIPTION,
    robots: PRIVATE,
    schemaType: 'WebPage',
  };
}

function siteRoot(origin: string): URL {
  const configured = import.meta.env.VITE_SITE_URL?.trim();
  const root = configured || new URL(import.meta.env.BASE_URL, origin).toString();
  return new URL(root.endsWith('/') ? root : `${root}/`, origin);
}

function absoluteUrl(path: string, origin: string): string {
  const relative = normalizePath(path).replace(/^\/+/, '');
  return new URL(relative, siteRoot(origin)).toString();
}

function setMeta(attribute: 'name' | 'property', key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonical(href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

function structuredData(seo: PageSeo, canonicalUrl: string, imageUrl: string) {
  const root = siteRoot(window.location.origin).toString();
  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'WebSite',
      '@id': `${root}#website`,
      url: root,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAME,
      description: DEFAULT_DESCRIPTION,
      inLanguage: 'zh-CN',
    },
    {
      '@type': seo.schemaType,
      '@id': `${canonicalUrl}#${seo.schemaType === 'LearningResource' ? 'learning-resource' : 'webpage'}`,
      url: canonicalUrl,
      name: seo.title,
      description: seo.description,
      inLanguage: 'zh-CN',
      isAccessibleForFree: true,
      isPartOf: { '@id': `${root}#website` },
      ...(seo.keywords ? { keywords: seo.keywords.join(', ') } : {}),
      ...(seo.educationalLevel ? { educationalLevel: seo.educationalLevel } : {}),
      ...(seo.learningResourceType
        ? { learningResourceType: seo.learningResourceType }
        : {}),
      ...(seo.schemaType === 'LearningResource'
        ? {
            provider: {
              '@type': 'Organization',
              name: SITE_NAME,
              url: root,
            },
          }
        : {}),
      image: imageUrl,
    },
  ];

  if (canonicalUrl === root) {
    graph.push({
      '@type': 'WebApplication',
      '@id': `${root}#application`,
      name: SITE_NAME,
      url: root,
      applicationCategory: 'GameApplication',
      applicationSubCategory: '中国象棋训练',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      inLanguage: 'zh-CN',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY',
      },
    });
  }

  if (seo.breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: seo.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path, window.location.origin),
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function usePageSeo(pathname: string): void {
  useEffect(() => {
    const seo = seoForPath(pathname);
    const canonicalUrl = absoluteUrl(pathname, window.location.origin);
    const imageUrl = new URL(
      `${import.meta.env.BASE_URL}social-preview.jpg`,
      window.location.origin,
    ).toString();

    document.title = seo.title;
    setMeta('name', 'description', seo.description);
    setMeta('name', 'robots', seo.robots);
    setMeta('name', 'googlebot', seo.robots);
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', imageUrl);
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:image', imageUrl);
    setCanonical(canonicalUrl);

    let script = document.getElementById('qilian-structured-data');
    if (!script) {
      script = document.createElement('script');
      script.id = 'qilian-structured-data';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData(seo, canonicalUrl, imageUrl));
  }, [pathname]);
}
