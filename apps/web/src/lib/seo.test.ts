import { describe, expect, it } from 'vitest';
import {
  endgameLessons,
  openingLessons,
  tacticExercises,
} from '@qilian/content';
import { seoForPath } from './seo';

describe('page SEO metadata', () => {
  it('uses distinct, searchable titles for public sections', () => {
    const paths = [
      '/',
      '/play',
      '/endgames',
      '/local',
      '/local/gomoku',
      '/local/jungle',
      '/local/checkers',
      '/local/connect4',
      '/train',
      '/train/tactics',
      '/train/endgame',
      '/train/opening',
      '/about',
    ];
    const titles = paths.map((path) => seoForPath(path).title);

    expect(new Set(titles).size).toBe(paths.length);
    for (const path of paths) {
      expect(seoForPath(path).robots).toContain('index');
      expect(seoForPath(path).description.length).toBeGreaterThan(30);
    }
  });

  it('provides unique metadata for every training item', () => {
    const routes = [
      ...tacticExercises.map((item) => ({
        path: `/train/tactics/${item.id}`,
        title: item.title,
      })),
      ...endgameLessons.map((item) => ({
        path: `/train/endgame/${item.id}`,
        title: item.title,
      })),
      ...openingLessons.map((item) => ({
        path: `/train/opening/${item.id}`,
        title: item.title,
      })),
    ];

    for (const route of routes) {
      const seo = seoForPath(route.path);
      expect(seo.title).toContain(route.title);
      expect(seo.schemaType).toBe('LearningResource');
      expect(seo.robots).toContain('index');
    }
  });

  it('keeps private and unknown pages out of search indexes', () => {
    for (const path of [
      '/settings',
      '/history',
      '/review/private-game',
      '/endgames/edit',
      '/unknown',
    ]) {
      expect(seoForPath(path).robots).toContain('noindex');
    }
  });
});
