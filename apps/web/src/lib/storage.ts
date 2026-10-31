import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { CustomEndgame, FinishedGame, GameSnapshot, TrainingProgress } from '../types';

interface QilianDB extends DBSchema {
  currentGame: {
    key: string;
    value: { key: string; game: GameSnapshot };
  };
  games: {
    key: string;
    value: FinishedGame;
    indexes: { 'by-ended-at': string };
  };
  training: {
    key: string;
    value: TrainingProgress;
    indexes: { 'by-kind': string };
  };
  customEndgames: {
    key: string;
    value: CustomEndgame;
    indexes: { 'by-updated-at': string };
  };
}

let dbPromise: Promise<IDBPDatabase<QilianDB>> | null = null;

function db(): Promise<IDBPDatabase<QilianDB>> {
  if (!dbPromise) {
    dbPromise = openDB<QilianDB>('qilian', 2, {
      upgrade(database, oldVersion) {
        if (oldVersion < 1) {
          database.createObjectStore('currentGame', { keyPath: 'key' });
          const games = database.createObjectStore('games', { keyPath: 'id' });
          games.createIndex('by-ended-at', 'endedAt');
          const training = database.createObjectStore('training', { keyPath: 'key' });
          training.createIndex('by-kind', 'kind');
        }
        if (oldVersion < 2) {
          const customEndgames = database.createObjectStore('customEndgames', { keyPath: 'id' });
          customEndgames.createIndex('by-updated-at', 'updatedAt');
        }
      },
    });
  }
  return dbPromise;
}

export async function saveCurrentGame(game: GameSnapshot): Promise<void> {
  try {
    const database = await db();
    await database.put('currentGame', { key: 'current', game });
  } catch {
    // IndexedDB can be unavailable in private or constrained browsers.
  }
}

export async function loadCurrentGame(): Promise<GameSnapshot | null> {
  try {
    const database = await db();
    return (await database.get('currentGame', 'current'))?.game ?? null;
  } catch {
    return null;
  }
}

export async function clearCurrentGame(): Promise<void> {
  try {
    const database = await db();
    await database.delete('currentGame', 'current');
  } catch {
    // ignore
  }
}

export async function saveFinishedGame(game: FinishedGame): Promise<void> {
  try {
    const database = await db();
    await database.put('games', game);
  } catch {
    // ignore
  }
}

export async function listFinishedGames(): Promise<FinishedGame[]> {
  try {
    const database = await db();
    const games = await database.getAll('games');
    return games.sort((a, b) => b.endedAt.localeCompare(a.endedAt));
  } catch {
    return [];
  }
}

export async function getFinishedGame(id: string): Promise<FinishedGame | null> {
  try {
    const database = await db();
    return (await database.get('games', id)) ?? null;
  } catch {
    return null;
  }
}

export async function deleteFinishedGame(id: string): Promise<void> {
  try {
    const database = await db();
    await database.delete('games', id);
  } catch {
    // ignore
  }
}

export async function saveTrainingProgress(progress: TrainingProgress): Promise<void> {
  try {
    const database = await db();
    await database.put('training', progress);
  } catch {
    // ignore
  }
}

export async function getTrainingProgress(key: string): Promise<TrainingProgress | null> {
  try {
    const database = await db();
    return (await database.get('training', key)) ?? null;
  } catch {
    return null;
  }
}

export async function listTrainingProgress(kind?: TrainingProgress['kind']): Promise<TrainingProgress[]> {
  try {
    const database = await db();
    if (!kind) return database.getAll('training');
    return database.getAllFromIndex('training', 'by-kind', kind);
  } catch {
    return [];
  }
}

export async function saveCustomEndgame(endgame: CustomEndgame): Promise<void> {
  try {
    const database = await db();
    await database.put('customEndgames', endgame);
  } catch {
    // ignore
  }
}

export async function listCustomEndgames(): Promise<CustomEndgame[]> {
  try {
    const database = await db();
    const items = await database.getAll('customEndgames');
    return items.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } catch {
    return [];
  }
}

export async function getCustomEndgame(id: string): Promise<CustomEndgame | null> {
  try {
    const database = await db();
    return (await database.get('customEndgames', id)) ?? null;
  } catch {
    return null;
  }
}

export async function deleteCustomEndgame(id: string): Promise<void> {
  try {
    const database = await db();
    await database.delete('customEndgames', id);
  } catch {
    // ignore
  }
}

export async function clearAllLocalData(): Promise<void> {
  try {
    const database = await db();
    await database.clear('currentGame');
    await database.clear('games');
    await database.clear('training');
    await database.clear('customEndgames');
  } catch {
    // ignore
  }
  localStorage.removeItem('qilian.settings.v1');
}

export async function deleteDatabase(): Promise<void> {
  try {
    const database = await db();
    database.close();
    dbPromise = null;
    await indexedDB.deleteDatabase('qilian');
  } catch {
    // ignore
  }
}
