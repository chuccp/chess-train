import { useSyncExternalStore } from 'react';
import type { TrainingKind } from '@qilian/content';

const STORAGE_KEY = 'qilian.favorites.v1';
const listeners = new Set<() => void>();
let cache: readonly string[] | null = null;

/** 题目在收藏表里的稳定键，和 TrainingProgress.key 使用同一格式。 */
export function favoriteKey(kind: TrainingKind, id: string): string {
  return `${kind}:${id}`;
}

export function parseFavoriteKeys(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    const keys: string[] = [];
    for (const value of parsed) {
      if (typeof value !== 'string' || !value.includes(':') || seen.has(value)) continue;
      seen.add(value);
      keys.push(value);
    }
    return keys;
  } catch {
    return [];
  }
}

function readFromStorage(): readonly string[] {
  if (typeof window === 'undefined') return [];
  try {
    return parseFavoriteKeys(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

export function getFavoriteKeys(): readonly string[] {
  if (cache === null) cache = readFromStorage();
  return cache;
}

export function isFavoriteKey(kind: TrainingKind, id: string): boolean {
  return getFavoriteKeys().includes(favoriteKey(kind, id));
}

/** 切换收藏状态，返回切换后是否已收藏。 */
export function toggleFavorite(kind: TrainingKind, id: string): boolean {
  const key = favoriteKey(kind, id);
  const current = getFavoriteKeys();
  const exists = current.includes(key);
  const next = exists ? current.filter((item) => item !== key) : [key, ...current];
  cache = next;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // localStorage can be unavailable in private or constrained browsers.
    }
  }
  for (const listener of listeners) listener();
  return !exists;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function clearFavorites(): void {
  cache = [];
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  for (const listener of listeners) listener();
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY) return;
    cache = readFromStorage();
    for (const listener of listeners) listener();
  });
}

/** 订阅收藏变化；返回值是最近收藏在前的 `kind:id` 列表。 */
export function useFavorites(): readonly string[] {
  return useSyncExternalStore(subscribe, getFavoriteKeys, getFavoriteKeys);
}
