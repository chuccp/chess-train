import { create } from 'zustand';
import {
  START_FEN,
  applyMove,
  evaluateBoard,
  generateLegalMoves,
  hashPosition,
  isInCheck,
  parseFen,
  parseUcciMove,
  pieceAt,
  opposite,
  type BoardEnd,
  type Color,
  type Position,
} from '@qilian/xiangqi';
import { pikafish } from '../engine/client';
import { useEngineStore } from './engine';
import { useSettingsStore } from './settings';
import {
  loadCurrentGame,
  saveCurrentGame,
  saveFinishedGame,
} from '../lib/storage';
import { playCue, vibrate } from '../lib/feedback';
import type {
  FinishedGame,
  GameResult,
  GameSnapshot,
  Level,
  MoveRecord,
} from '../types';

const AI_TIME_MS: Record<Level, number> = { 1: 300, 2: 700, 3: 1200 };

let aiTokenSeq = 0;
let hintTokenSeq = 0;

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `game-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
}

function resultOf(position: Position, hashes: string[]): BoardEnd {
  return evaluateBoard(position, { positionHashes: hashes });
}

function enqueueFinished(game: GameSnapshot): Promise<void> {
  const record: FinishedGame = {
    id: game.id,
    mode: 'ai',
    playerColor: game.playerColor,
    level: game.level,
    initialFen: START_FEN,
    moves: game.moves,
    result: game.result,
    startedAt: game.startedAt,
    endedAt: new Date().toISOString(),
    elapsedMs: game.elapsedMs,
  };
  return saveFinishedGame(record);
}

function moveRecord(
  position: Position,
  move: { from: number; to: number; piece: { color: Color; type: string }; captured: { type: string } | null },
  notation: string,
  givesCheck: boolean,
  ply: number,
): MoveRecord {
  return {
    ply,
    from: move.from,
    to: move.to,
    ucci: `${'abcdefghi'[move.from % 9]}${Math.floor(move.from / 9)}${'abcdefghi'[move.to % 9]}${Math.floor(move.to / 9)}`,
    notation,
    color: move.piece.color,
    pieceType: move.piece.type,
    capturedType: move.captured?.type ?? null,
    givesCheck,
    playedAt: new Date().toISOString(),
  };
}

function replayTo(moves: MoveRecord[], count: number): { position: Position; hashes: string[] } {
  let position = parseFen(START_FEN);
  const hashes = [hashPosition(position)];
  for (let index = 0; index < count; index += 1) {
    const record = moves[index];
    if (!record) break;
    const result = applyMove(position, record.from, record.to);
    if (!result.ok) break;
    position = result.position;
    hashes.push(hashPosition(position));
  }
  return { position, hashes };
}

function snapshotWithGame(game: GameSnapshot, patch: Partial<GameSnapshot>): GameSnapshot {
  return {
    ...game,
    ...patch,
    updatedAt: new Date().toISOString(),
    elapsedMs: Math.max(0, Date.now() - new Date(game.startedAt).getTime()),
  };
}

function persist(game: GameSnapshot): void {
  void saveCurrentGame(game);
}

function feedback(kind: 'move' | 'capture' | 'check' | 'win' | 'error'): void {
  const settings = useSettingsStore.getState();
  if (settings.sound) playCue(kind);
  if (settings.haptics) vibrate(kind === 'error' ? [20, 30, 20] : 10);
}

interface GameState {
  current: GameSnapshot | null;
  hydrated: boolean;
  selected: number | null;
  legalTargets: number[];
  notice: string | null;
  error: string | null;
  hint: { from: number; to: number } | null;
  hintLoading: boolean;
  aiInFlight: boolean;
  aiError: string | null;
  aiToken: number;
  hintToken: number;
  hydrate: () => Promise<void>;
  startNewGame: (playerColor: Color, level: Level) => Promise<boolean>;
  resumeFinishedGame: (record: FinishedGame, keepMoves: number) => boolean;
  playSquare: (square: number) => void;
  requestAi: () => Promise<void>;
  requestHint: () => Promise<void>;
  clearHint: () => void;
  undo: () => void;
  resign: () => Promise<void>;
  dismissNotice: () => void;
  retryAi: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  current: null,
  hydrated: false,
  selected: null,
  legalTargets: [],
  notice: null,
  error: null,
  hint: null,
  hintLoading: false,
  aiInFlight: false,
  aiError: null,
  aiToken: 0,
  hintToken: 0,

  async hydrate() {
    if (get().hydrated) return;
    const current = await loadCurrentGame();
    set({ current, hydrated: true });
    if (current?.phase === 'finished' && current.moves.length > 0) {
      void enqueueFinished(current);
    }
  },

  async startNewGame(playerColor, level) {
    if (!useEngineStore.getState().engineReady) {
      set({ error: '离线棋力尚未就绪，暂时不能开始与 AI 的对局' });
      return false;
    }
    useSettingsStore.getState().setPreferredColor(playerColor);
    useSettingsStore.getState().setPreferredLevel(level);
    const existing = get().current;
    if (get().aiInFlight || existing?.phase === 'ai_thinking') pikafish.stop();
    if (existing && existing.phase !== 'finished' && existing.moves.length > 0) {
      const aborted = snapshotWithGame(existing, {
        phase: 'finished',
        result: { status: 'aborted' },
      });
      void enqueueFinished(aborted);
    }

    const initial = parseFen(START_FEN);
    const hashes = [hashPosition(initial)];
    const now = new Date().toISOString();
    const result = resultOf(initial, hashes);
    const game: GameSnapshot = {
      id: uuid(),
      mode: 'ai',
      playerColor,
      level,
      position: initial,
      positionHashes: hashes,
      moves: [],
      phase: playerColor === 'r' ? 'playing' : 'ai_thinking',
      result,
      startedAt: now,
      updatedAt: now,
      elapsedMs: 0,
    };

    set({
      current: game,
      selected: null,
      legalTargets: [],
      notice: null,
      error: null,
      hint: null,
      hintLoading: false,
      aiInFlight: false,
      aiError: null,
      aiToken: get().aiToken + 1,
      hintToken: get().hintToken + 1,
    });
    persist(game);
    return true;
  },

  resumeFinishedGame(record, keepMoves) {
    let position: Position;
    try {
      position = parseFen(record.initialFen);
    } catch {
      position = parseFen(START_FEN);
    }
    const hashes = [hashPosition(position)];
    const limit = Math.max(0, Math.min(keepMoves, record.moves.length));
    const moves: MoveRecord[] = [];
    for (const move of record.moves.slice(0, limit)) {
      const result = applyMove(position, move.from, move.to);
      if (!result.ok) break;
      position = result.position;
      hashes.push(hashPosition(position));
      moves.push(move);
    }
    const end = resultOf(position, hashes);
    const now = new Date().toISOString();
    const game: GameSnapshot = {
      id: uuid(),
      mode: 'ai',
      playerColor: record.playerColor,
      level: record.level,
      position,
      positionHashes: hashes,
      moves,
      phase: end.status === 'playing' ? 'playing' : 'finished',
      result: end,
      startedAt: now,
      updatedAt: now,
      elapsedMs: 0,
    };
    set({
      current: game,
      selected: null,
      legalTargets: [],
      notice: null,
      error: null,
      hint: null,
      hintLoading: false,
      aiInFlight: false,
      aiError: null,
      aiToken: get().aiToken + 1,
      hintToken: get().hintToken + 1,
    });
    persist(game);
    if (game.phase === 'finished') void enqueueFinished(game);
    else if (position.turn !== record.playerColor) void get().requestAi();
    return true;
  },

  playSquare(square) {
    const state = get();
    const game = state.current;
    if (!game || game.phase !== 'playing') return;
    if (game.position.turn !== game.playerColor) return;

    const piece = pieceAt(game.position, square);
    if (state.selected === null) {
      if (!piece || piece.color !== game.playerColor) {
        set({ notice: '请选择自己的棋子' });
        return;
      }
      const targets = generateLegalMoves(game.position)
        .filter((move) => move.from === square)
        .map((move) => move.to);
      set({ selected: square, legalTargets: targets, notice: targets.length === 0 ? '这枚棋子暂时不能走' : null });
      return;
    }

    if (state.selected === square) {
      set({ selected: null, legalTargets: [], notice: null });
      return;
    }

    if (piece?.color === game.playerColor) {
      const targets = generateLegalMoves(game.position)
        .filter((move) => move.from === square)
        .map((move) => move.to);
      set({ selected: square, legalTargets: targets, notice: targets.length === 0 ? '这枚棋子暂时不能走' : null });
      return;
    }

    if (!state.legalTargets.includes(square)) {
      set({ selected: null, legalTargets: [], notice: '这步棋不能走' });
      return;
    }

    const result = applyMove(game.position, state.selected, square);
    if (!result.ok) {
      set({ selected: null, legalTargets: [], notice: result.message });
      return;
    }

    const hashes = [...game.positionHashes, hashPosition(result.position)];
    const end = resultOf(result.position, hashes);
    const record = moveRecord(game.position, result.move, result.notation, result.givesCheck, game.moves.length + 1);
    const finished = end.status !== 'playing';
    const next = snapshotWithGame(game, {
      position: result.position,
      positionHashes: hashes,
      moves: [...game.moves, record],
      phase: finished ? 'finished' : 'ai_thinking',
      result: end,
    });

    set({
      current: next,
      selected: null,
      legalTargets: [],
      notice: null,
      hint: null,
      hintLoading: false,
      aiError: null,
      aiToken: get().aiToken + 1,
      hintToken: get().hintToken + 1,
    });
    persist(next);
    if (result.givesCheck) feedback('check');
    else if (record.capturedType) feedback('capture');
    else feedback('move');
    if (finished) {
      void enqueueFinished(next);
      feedback(end.status === 'win' && end.winner === game.playerColor ? 'win' : 'move');
    }
  },

  async requestAi() {
    const state = get();
    const game = state.current;
    if (!game || game.phase !== 'ai_thinking' || state.aiInFlight) return;
    if (!useEngineStore.getState().engineReady) {
      set({ aiError: '引擎尚未就绪' });
      return;
    }

    const token = ++aiTokenSeq;
    set({ aiInFlight: true, aiError: null, aiToken: token });

    try {
      const search = await pikafish.search({
        initialFen: START_FEN,
        movesUcci: game.moves.map((move) => move.ucci),
        level: game.level,
        timeLimitMs: AI_TIME_MS[game.level],
      });
      const latest = get();
      if (!latest.current || latest.current.id !== game.id || latest.aiToken !== token) return;
      if (latest.current.phase !== 'ai_thinking') return;

      const legalMove = parseUcciMove(latest.current.position, search.ucci);
      if (!legalMove) throw new Error('引擎返回了不合法的着法');
      const result = applyMove(latest.current.position, legalMove.from, legalMove.to);
      if (!result.ok) throw new Error(result.message);

      const hashes = [...latest.current.positionHashes, hashPosition(result.position)];
      const end = resultOf(result.position, hashes);
      const record = moveRecord(
        latest.current.position,
        result.move,
        result.notation,
        result.givesCheck,
        latest.current.moves.length + 1,
      );
      const finished = end.status !== 'playing';
      const next = snapshotWithGame(latest.current, {
        position: result.position,
        positionHashes: hashes,
        moves: [...latest.current.moves, record],
        phase: finished ? 'finished' : 'playing',
        result: end,
      });

      set({ current: next, aiInFlight: false, aiError: null, aiToken: get().aiToken + 1, hint: null });
      persist(next);
      if (result.givesCheck) feedback('check');
      else if (record.capturedType) feedback('capture');
      else feedback('move');
      if (finished) {
        void enqueueFinished(next);
        if (end.status === 'win' && end.winner === game.playerColor) feedback('win');
      }
    } catch (error) {
      const latest = get();
      if (latest.current?.id !== game.id || latest.aiToken !== token) return;
      set({
        aiInFlight: false,
        aiError: error instanceof Error ? error.message : String(error),
      });
    }
  },

  async requestHint() {
    const state = get();
    const game = state.current;
    if (!game || game.phase !== 'playing' || game.position.turn !== game.playerColor) {
      set({ notice: '现在还不能请求提示' });
      return;
    }
    if (!useEngineStore.getState().engineReady) {
      set({ notice: '引擎尚未就绪' });
      return;
    }
    const token = ++hintTokenSeq;
    set({ hintLoading: true, hint: null, hintToken: token });
    try {
      const result = await pikafish.search({
        initialFen: START_FEN,
        movesUcci: game.moves.map((move) => move.ucci),
        level: 3,
        timeLimitMs: 900,
      });
      const latest = get();
      if (!latest.current || latest.current.id !== game.id || latest.hintToken !== token) return;
      if (latest.current.moves.length !== game.moves.length) return;
      const legal = parseUcciMove(latest.current.position, result.ucci);
      if (!legal) throw new Error('提示着法不合法');
      set({ hint: { from: legal.from, to: legal.to }, hintLoading: false });
    } catch (error) {
      const latest = get();
      if (latest.hintToken !== token) return;
      set({ hintLoading: false, notice: error instanceof Error ? error.message : String(error) });
    }
  },

  clearHint() {
    set({ hint: null, hintLoading: false, hintToken: get().hintToken + 1 });
  },

  undo() {
    const state = get();
    const game = state.current;
    if (!game) return;
    const settings = useSettingsStore.getState();
    if (!settings.allowUndo) {
      set({ notice: '当前设置不允许悔棋' });
      return;
    }
    if (game.phase !== 'playing') {
      set({ notice: 'AI 思考中或棋局已结束，暂时不能悔棋' });
      return;
    }
    if (!settings.allowUndoWhenChecked && isInCheck(game.position, game.position.turn)) {
      set({ notice: '当前被将军，设置要求先应将' });
      return;
    }
    const removeCount = settings.undoSteps === 10 ? game.moves.length : Math.min(settings.undoSteps, game.moves.length);
    if (removeCount < 1) {
      set({ notice: '还没有可悔的棋' });
      return;
    }
    const last = game.moves[game.moves.length - 1];
    const beforeLast = game.moves[game.moves.length - 2];
    if (!last || !beforeLast || last.color === game.playerColor || beforeLast.color !== game.playerColor) {
      set({ notice: '当前没有可悔的回合' });
      return;
    }

    const keep = game.moves.length - removeCount;
    const { position, hashes } = replayTo(game.moves, keep);
    const end = resultOf(position, hashes);
    const next = snapshotWithGame(game, {
      position,
      positionHashes: hashes,
      moves: game.moves.slice(0, keep),
      phase: 'playing',
      result: end,
    });
    set({
      current: next,
      selected: null,
      legalTargets: [],
      notice: null,
      hint: null,
      hintLoading: false,
      aiInFlight: false,
      aiError: null,
      aiToken: get().aiToken + 1,
      hintToken: get().hintToken + 1,
    });
    persist(next);
    if (next.position.turn !== next.playerColor) void get().requestAi();
  },

  async resign() {
    const game = get().current;
    if (!game || (game.phase !== 'playing' && game.phase !== 'ai_thinking')) return;
    if (game.phase === 'ai_thinking') pikafish.stop();
    const next = snapshotWithGame(game, {
      phase: 'finished',
      result: { status: 'win', winner: opposite(game.playerColor), reason: 'resign' },
    });
    set({ current: next, selected: null, legalTargets: [], hint: null, aiInFlight: false });
    persist(next);
    await enqueueFinished(next);
  },

  dismissNotice() {
    set({ notice: null, error: null });
  },

  retryAi() {
    set({ aiError: null, aiInFlight: false, aiToken: get().aiToken + 1 });
    void get().requestAi();
  },
}));

export function levelLabel(level: Level): string {
  return level === 1 ? '入门' : level === 2 ? '进阶' : '挑战';
}

export function resultLabel(result: GameResult, playerColor?: Color): string {
  if (result.status === 'playing') return '进行中';
  if (result.status === 'aborted') return '未完成';
  if (result.status === 'draw') {
    if (result.reason === 'repetition') return '三次重复，和棋';
    if (result.reason === 'no-capture') return '自然限着，和棋';
    return '双方均无进攻子力，和棋';
  }
  if (result.reason === 'resign') return result.winner === playerColor ? '对方认输，你赢了' : '你已认输';
  if (result.reason === 'stalemate') return `困毙，${result.winner === 'r' ? '红方' : '黑方'}胜`;
  return `${result.winner === 'r' ? '红方' : '黑方'}将死对手`;
}
