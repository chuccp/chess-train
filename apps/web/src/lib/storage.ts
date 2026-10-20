import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { FinishedGame, GameSnapshot, TrainingProgress } from '../types';

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
}

let dbPromise: Promise<IDBPDatabase<QilianDB>> | null = null;

function db(): Promise<IDBPDatabase<QilianDB>> {
  if (!dbPromise) {
    dbPromise = openDB<QilianDB>('qilian', 1, {
      upgrade(database) {
        database.createObjectStore('currentGame', { keyPath: 'key' });
        const games = database.createObjectStore('games', { keyPath: 'id' });
        games.createIndex('by-ended-at', 'endedAt');
        const training = database.createObjectStore('training', { keyPath: 'key' });
        training.createIndex('by-kind', 'kind');
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

export async function clearAllLocalData(): Promise<void> {
  try {
    const database = await db();
    await database.clear('currentGame');
    await database.clear('games');
    await database.clear('training');
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
