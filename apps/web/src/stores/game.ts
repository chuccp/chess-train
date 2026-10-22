import { create } from 'zustand';
import {
  START_FEN,
  applyMove,
  evaluateBoard,
  generateLegalMoves,
  hashPosition,
  isInCheck,
  moveToUcci,
  parseFen,
  parseUcci,
  parseUcciMove,
  pieceAt,
  opposite,
  toFen,
  type BoardEnd,
  type Color,
  type Position,
} from '@qilian/xiangqi';
import { engineApi, type ApiForbiddenMove, type EngineMoveProgress } from '../engine/api';
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
  GameMode,
  GameResult,
  GameSnapshot,
  Level,
  MoveRecord,
} from '../types';

// 思考不设小预算：走 SSE 流式接口，引擎跑到 10 秒上限为止（接口内部默认值）。

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
    mode: game.mode,
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

function matchesBan(ucci: string, ban: ApiForbiddenMove): boolean {
  if (ban.uci !== undefined) return ban.uci === ucci;
  const parsed = parseUcci(ucci);
  if (!parsed) return false;
  if (ban.from !== undefined && ban.from !== parsed.from) return false;
  if (ban.to !== undefined && ban.to !== parsed.to) return false;
  return ban.from !== undefined || ban.to !== undefined;
}

/** 丢掉无效禁着；覆盖全部合法着法时整体放弃（接口会 400）。 */
function pruneBans(legalUccis: string[], bans: ApiForbiddenMove[]): ApiForbiddenMove[] {
  if (bans.length === 0 || legalUccis.length === 0) return [];
  const blocked = new Set<string>();
  for (const ban of bans) {
    for (const ucci of legalUccis) {
      if (matchesBan(ucci, ban)) blocked.add(ucci);
    }
  }
  if (blocked.size === 0 || blocked.size >= legalUccis.length) return [];
  return bans;
}

/** 长将禁着：走这步继续将军且局面已出现过两次以上 → 该由长将方变着。 */
function isPerpetualCheckMove(position: Position, hashes: string[], ucci: string): boolean {
  const move = parseUcciMove(position, ucci);
  if (!move) return false;
  const result = applyMove(position, move.from, move.to);
  if (!result.ok || !result.givesCheck) return false;
  const hash = hashPosition(result.position);
  return hashes.filter((item) => item === hash).length >= 2;
}

/**
 * 带禁着的引擎搜索：
 * - baseBans（手动禁点 / 历史应手 / 已给提示）直接传给接口；
 * - 命中长将禁着时把该着法追加进禁着重新请求，最多三次。
 */
async function searchWithBans(
  position: Position,
  hashes: string[],
  baseBans: ApiForbiddenMove[],
  level: Level,
  onProgress?: (progress: EngineMoveProgress) => void,
): Promise<string> {
  const legalUccis = generateLegalMoves(position).map((move) => moveToUcci(move.from, move.to));
  const extra: ApiForbiddenMove[] = [];
  let ucci = '';
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const result = await engineApi.search({
      game: 'xiangqi',
      fen: toFen(position),
      level,
      onProgress,
      forbiddenMoves: pruneBans(legalUccis, [...baseBans, ...extra]),
    });
    ucci = result.move.uci ?? '';
    if (!ucci) throw new Error('AI 未返回着法');
    if (!isPerpetualCheckMove(position, hashes, ucci)) return ucci;
    extra.push({ uci: ucci });
  }
  return ucci;
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
  /** AI 开始思考的时间戳（毫秒），用于界面上的思考计时 */
  aiThinkingSince: number | null;
  /** SSE 最近一层搜索进度 */
  aiProgress: EngineMoveProgress | null;
  hydrate: () => Promise<void>;
  startNewGame: (playerColor: Color, level: Level, opponent?: GameMode) => Promise<boolean>;
  /** 人机对局中改执另一方，当前局面与棋谱原样保留；返回新的执子方，未换边时返回 null。 */
  switchSides: () => Color | null;
  resumeFinishedGame: (record: FinishedGame, keepMoves: number) => boolean;
  playSquare: (square: number) => void;
  toggleManualBan: (square: number) => void;
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
  aiThinkingSince: null,
  aiProgress: null,

  async hydrate() {
    if (get().hydrated) return;
    const current = await loadCurrentGame();
    set({ current, hydrated: true });
    if (current?.phase === 'finished' && current.moves.length > 0) {
      void enqueueFinished(current);
    }
  },

  async startNewGame(playerColor, level, opponent = 'ai') {
    if (opponent === 'ai' && !useEngineStore.getState().engineReady) {
      set({ error: '在线 AI 尚未就绪，暂时不能开始与 AI 的对局' });
      return false;
    }
    useSettingsStore.getState().setPreferredColor(playerColor);
    useSettingsStore.getState().setPreferredLevel(level);
    const existing = get().current;
    if (get().aiInFlight || existing?.phase === 'ai_thinking') engineApi.stop();
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
      mode: opponent,
      playerColor,
      level,
      position: initial,
      positionHashes: hashes,
      moves: [],
      phase: opponent === 'ai' && playerColor !== 'r' ? 'ai_thinking' : 'playing',
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
      aiThinkingSince: null,
      aiProgress: null,
      aiToken: get().aiToken + 1,
      hintToken: get().hintToken + 1,
    });
    persist(game);
    return true;
  },

  switchSides() {
    const state = get();
    const game = state.current;
    // 只有进行中的人机对局才能换边；换边 = 改执另一方，棋盘、棋谱、用时都保留
    if (!game || game.mode !== 'ai' || game.phase === 'finished') return null;
    if (state.aiInFlight || state.hintLoading || game.phase === 'ai_thinking') engineApi.stop();
    const playerColor = opposite(game.playerColor);
    const next = snapshotWithGame(game, {
      playerColor,
      // 换边后轮到谁，就让谁走：轮到 AI 就重新进入思考，轮到玩家就交还操作
      phase: game.position.turn === playerColor ? 'playing' : 'ai_thinking',
      hintBans: [],
    });
    useSettingsStore.getState().setPreferredColor(playerColor);
    set({
      current: next,
      selected: null,
      legalTargets: [],
      error: null,
      hint: null,
      hintLoading: false,
      // 作废在途的 AI 请求，让 App 的触发器按新的执子方重新请求
      aiInFlight: false,
      aiError: null,
      aiThinkingSince: null,
      aiProgress: null,
      aiToken: get().aiToken + 1,
      hintToken: get().hintToken + 1,
    });
    persist(next);
    return playerColor;
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
    const isFinal = limit >= record.moves.length;
    const now = new Date().toISOString();
    const game: GameSnapshot = {
      id: uuid(),
      mode: record.mode ?? 'ai',
      playerColor: record.playerColor,
      level: record.level,
      position,
      positionHashes: hashes,
      moves,
      phase: isFinal ? 'finished' : 'playing',
      result: isFinal ? record.result : { status: 'playing' },
      startedAt: now,
      updatedAt: now,
      elapsedMs: isFinal ? record.elapsedMs : 0,
      historyResume: true,
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
      aiThinkingSince: null,
      aiProgress: null,
      aiToken: get().aiToken + 1,
      hintToken: get().hintToken + 1,
    });
    persist(game);
    return true;
  },

  playSquare(square) {
    const state = get();
    const game = state.current;
    if (!game || game.phase !== 'playing') return;
    // 人机模式只能动自己一方；人人模式轮到哪方哪方走。
    const actor: Color = game.mode === 'human' ? game.position.turn : game.playerColor;
    if (game.position.turn !== actor) return;

    const piece = pieceAt(game.position, square);
    if (state.selected === null) {
      if (!piece || piece.color !== actor) {
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

    if (piece?.color === actor) {
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
      phase: finished ? 'finished' : game.mode === 'human' ? 'playing' : 'ai_thinking',
      result: end,
      hintBans: [],
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

  toggleManualBan(square) {
    const state = get();
    const game = state.current;
    if (!game || game.phase === 'finished') return;
    const current = game.manualBans ?? [];
    const manualBans = current.includes(square)
      ? current.filter((item) => item !== square)
      : [...current, square];
    const wasThinking = game.phase === 'ai_thinking';
    if (wasThinking || state.aiInFlight) engineApi.stop();
    const next = snapshotWithGame(game, { manualBans, hintBans: [] });
    set({
      current: next,
      hint: null,
      hintToken: get().hintToken + 1,
      // 取消在途搜索并让 App 的触发器带新禁着重新请求
      ...(wasThinking ? { aiInFlight: false, aiToken: get().aiToken + 1 } : {}),
    });
    persist(next);
  },

  async requestAi() {
    const state = get();
    const game = state.current;
    if (!game || game.phase !== 'ai_thinking' || state.aiInFlight) return;
    if (!useEngineStore.getState().engineReady) {
      set({ aiError: '在线 AI 尚未就绪' });
      return;
    }

    const token = ++aiTokenSeq;
    set({ aiInFlight: true, aiError: null, aiToken: token, aiThinkingSince: Date.now(), aiProgress: null });

    try {
      const positionKey = hashPosition(game.position);
      const baseBans: ApiForbiddenMove[] = [
        ...(game.manualBans ?? []).map((to) => ({ to })),
        ...(game.aiReplies?.[positionKey] ?? []).map((uci) => ({ uci })),
      ];
      const ucci = await searchWithBans(
        game.position,
        game.positionHashes,
        baseBans,
        // 难度实时读设置：改设置立即对当前对局生效，不用开新局
        useSettingsStore.getState().preferredLevel,
        (progress) => {
          if (get().aiToken === token) set({ aiProgress: progress });
        },
      );
      const latest = get();
      if (!latest.current || latest.current.id !== game.id || latest.aiToken !== token) return;
      if (latest.current.phase !== 'ai_thinking') return;

      const legalMove = parseUcciMove(latest.current.position, ucci);
      if (!legalMove) throw new Error('AI 返回了不合法的着法');
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
        hintBans: [],
        aiReplies: {
          ...(latest.current.aiReplies ?? {}),
          [positionKey]: [...(latest.current.aiReplies?.[positionKey] ?? []), ucci],
        },
      });

      set({
        current: next,
        aiInFlight: false,
        aiError: null,
        aiToken: get().aiToken + 1,
        hint: null,
        aiThinkingSince: null,
        aiProgress: null,
      });
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
        aiThinkingSince: null,
        aiProgress: null,
      });
    }
  },

  async requestHint() {
    const state = get();
    const game = state.current;
    if (!game || game.phase !== 'playing') {
      set({ notice: '现在还不能请求提示' });
      return;
    }
    const isPlayersTurn = game.mode === 'human' || game.position.turn === game.playerColor;
    if (!isPlayersTurn) {
      set({ notice: '现在还不能请求提示' });
      return;
    }
    if (!useEngineStore.getState().engineReady) {
      set({ notice: '在线 AI 尚未就绪' });
      return;
    }
    const token = ++hintTokenSeq;
    set({ hintLoading: true, hint: null, hintToken: token });
    try {
      const shown = game.hintBans ?? [];
      const baseBans: ApiForbiddenMove[] = [
        ...(game.manualBans ?? []).map((to) => ({ to })),
        ...shown.map((uci) => ({ uci })),
      ];
      const ucci = await searchWithBans(
        game.position,
        game.positionHashes,
        baseBans,
        useSettingsStore.getState().preferredLevel,
      );
      const latest = get();
      if (!latest.current || latest.current.id !== game.id || latest.hintToken !== token) return;
      if (latest.current.moves.length !== game.moves.length) return;
      const legal = parseUcciMove(latest.current.position, ucci);
      if (!legal) throw new Error('提示着法不合法');
      set({
        current: snapshotWithGame(latest.current, { hintBans: [...shown, ucci] }),
        hint: { from: legal.from, to: legal.to },
        hintLoading: false,
      });
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
    if (game.phase === 'ai_thinking') engineApi.stop();
    // 终局（绝杀/认输/和棋）也允许悔棋；被将军锁悔棋仅作用于对局进行中
    if (!settings.allowUndoWhenChecked && game.phase !== 'finished' && isInCheck(game.position, game.position.turn)) {
      set({ notice: '当前被将军，设置要求先应将' });
      return;
    }
    const last = game.moves[game.moves.length - 1];
    if (!last) {
      set({ notice: '还没有可悔的棋' });
      return;
    }
    // 人人模式固定退一手；人机模式：机器刚走过连退两手，自己刚走过退一手。
    const lastIsPlayer = last.color === game.playerColor;
    const removeCount =
      game.mode === 'human'
        ? 1
        : lastIsPlayer
          ? 1
          : game.moves.length >= 2 && game.moves[game.moves.length - 2]?.color === game.playerColor
            ? 2
            : 1;

    const keep = game.moves.length - removeCount;
    const { position, hashes } = replayTo(game.moves, keep);
    const end = resultOf(position, hashes);
    // 换边后可能出现“退完轮到 AI”的情况，按实际轮次决定是继续等玩家还是让 AI 走
    const aiTurn = game.mode === 'ai' && position.turn !== game.playerColor;
    const next = snapshotWithGame(game, {
      position,
      positionHashes: hashes,
      moves: game.moves.slice(0, keep),
      phase: aiTurn ? 'ai_thinking' : 'playing',
      result: end,
      hintBans: [],
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
      aiThinkingSince: null,
      aiProgress: null,
      aiToken: get().aiToken + 1,
      hintToken: get().hintToken + 1,
    });
    persist(next);
    if (aiTurn) void get().requestAi();
  },

  async resign() {
    const game = get().current;
    if (!game || (game.phase !== 'playing' && game.phase !== 'ai_thinking')) return;
    if (game.phase === 'ai_thinking') engineApi.stop();
    // 人机模式由玩家认输；人人模式由轮到走棋的一方认输。
    const resigner: Color = game.mode === 'human' ? game.position.turn : game.playerColor;
    const next = snapshotWithGame(game, {
      phase: 'finished',
      result: { status: 'win', winner: opposite(resigner), reason: 'resign' },
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

export function resultLabel(result: GameResult, playerColor?: Color, mode: GameMode = 'ai'): string {
  if (result.status === 'playing') return '进行中';
  if (result.status === 'aborted') return '未完成';
  if (result.status === 'draw') {
    if (result.reason === 'repetition') return '三次重复，和棋';
    if (result.reason === 'no-capture') return '自然限着，和棋';
    return '双方均无进攻子力，和棋';
  }
  const winnerName = result.winner === 'r' ? '红方' : '黑方';
  if (result.reason === 'resign') {
    if (mode === 'human') return `${winnerName}胜 · 对方认输`;
    return result.winner === playerColor ? '对方认输，你赢了' : '你已认输';
  }
  if (result.reason === 'stalemate') return `困毙，${winnerName}胜`;
  return `${winnerName}将死对手`;
}
