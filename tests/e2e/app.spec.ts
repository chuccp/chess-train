import { test, expect } from '@playwright/test';

async function waitForOfflineReady(page: import('@playwright/test').Page) {
  await page.goto('/');
  await expect(page.locator('.engine-badge:visible')).toContainText(/(?:在线|本地) AI/, { timeout: 60_000 });
}

test('home loads with the offline engine ready', async ({ page }) => {
  await waitForOfflineReady(page);
  await expect(page.locator('.home-hero h1')).toContainText('静下来');
  await expect(page.getByRole('button', { name: /和 AI 下一盘/ })).toBeEnabled();
  await expect(page.locator('.desktop-nav')).toBeVisible();
});

test('home preloads the local fallback engine in the background', async ({ page }) => {
  await page.goto('/');
  await expect.poll(
    () => page.workers().some((worker) => worker.url().includes('/engines/eleeye/worker.js')),
    { timeout: 15_000 },
  ).toBe(true);
});

test('home has one offline two-player entry', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.home-local-banner')).toHaveCount(0);
  await expect(page.locator('.mobile-lobby-local')).toHaveCount(0);
  const localEntry = page.locator('.desktop-nav a[href="/local"]');
  await expect(localEntry).toHaveCount(1);
  await expect(localEntry).toHaveText('其它棋');
  await expect(page.locator('.nav-local-badge')).toHaveCount(0);
  await expect(localEntry).toBeVisible();
  await localEntry.click();
  await expect(page).toHaveURL(/\/local$/);
  await expect(page.locator('.local-game-card')).toHaveCount(4);
});
test('other games sits between history and settings in both navigations', async ({ page }) => {
  await page.goto('/train');
  await expect(page.locator('.desktop-nav .nav-link')).toHaveText([
    '练习',
    '象棋',
    '训练',
    '棋谱',
    '其它棋',
    '设置',
  ]);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.bottom-nav .bottom-link')).toHaveText([
    '首页',
    '象棋',
    '训练',
    '棋谱',
    '其它棋',
    '设置',
  ]);
});
test('settings can disable undo for chess', async ({ page }) => {
  await page.goto('/settings');
  const undoSetting = page.getByRole('button', { name: '悔棋 开', exact: true });
  await expect(undoSetting).toBeVisible();
  await undoSetting.click();
  await expect(page.getByRole('button', { name: '悔棋 关', exact: true })).toBeVisible();

  await page.goto('/local/chess');
  await page.locator('[data-square="25"]').click();
  await page.locator('[data-square="22"]').click();
  await page.locator('[data-square="70"]').click();
  await page.locator('[data-square="67"]').click();
  await expect(page.locator('.side-controls .control-button').first()).toBeDisabled();
});
test('settings can require a response to check', async ({ page }) => {
  await page.goto('/settings');
  await page.getByRole('button', { name: '将军悔棋 开', exact: true }).click();
  await expect(page.getByRole('button', { name: '将军悔棋 关', exact: true })).toBeVisible();

  const now = new Date().toISOString();
  await page.addInitScript((startedAt) => {
    const move = {
      ply: 1,
      from: 25,
      to: 22,
      ucci: 'h2e2',
      notation: '炮二平五',
      color: 'r',
      pieceType: 'C',
      capturedType: null,
      givesCheck: false,
      playedAt: startedAt,
    };
    localStorage.setItem('qilian.local-game.v1', JSON.stringify({
      fen: '4k4/9/9/9/9/9/9/9/4r4/4K4 w - - 0 1',
      moves: [move, { ...move, ply: 2, color: 'b' }],
      positionHashes: [],
      result: { status: 'playing' },
      startedAt,
      orientation: 'r',
    }));
  }, now);
  await page.goto('/local/chess');
  await expect(page.locator('.check-banner')).toContainText('红方被将军');
  await expect(page.locator('.side-controls .control-button').first()).toBeDisabled();
});

test('settings can change the undo distance', async ({ page }) => {
  await page.goto('/settings');
  const slider = page.getByRole('slider', { name: '悔棋步数' });
  await slider.focus();
  await slider.press('Home');
  await slider.press('ArrowRight');
  await slider.press('ArrowRight');
  await slider.press('ArrowRight');
  await expect(slider).toHaveValue('4');

  await page.goto('/local/chess');
  await page.locator('[data-square="25"]').click();
  await page.locator('[data-square="22"]').click();
  await page.locator('[data-square="70"]').click();
  await page.locator('[data-square="67"]').click();
  await expect(page.locator('.side-controls .control-button').first()).toBeDisabled();
  await page.locator('[data-square="0"]').click();
  await page.locator('[data-square="9"]').click();
  await page.locator('[data-square="81"]').click();
  await page.locator('[data-square="72"]').click();
  await expect(page.locator('.side-controls .control-button').first()).toBeEnabled();
});

test('undo distance 10 means unlimited', async ({ page }) => {
  await page.goto('/settings');
  const slider = page.getByRole('slider', { name: '悔棋步数' });
  await slider.focus();
  await slider.press('End');
  await expect(slider).toHaveValue('10');

  await page.goto('/local/chess');
  await page.locator('[data-square="25"]').click();
  await page.locator('[data-square="22"]').click();
  await page.locator('[data-square="70"]').click();
  await page.locator('[data-square="67"]').click();
  await page.locator('.side-controls .control-button').first().click();
  await expect(page.locator('.move-item')).toHaveCount(0);
  await expect(page.locator('.turn-chip')).toContainText('轮到红方');
});
test('history review can undo and resume', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(400);
  await page.evaluate(async () => {
    const request = indexedDB.open('qilian', 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains('currentGame')) {
        database.createObjectStore('currentGame', { keyPath: 'key' });
      }
      if (!database.objectStoreNames.contains('games')) {
        const games = database.createObjectStore('games', { keyPath: 'id' });
        games.createIndex('by-ended-at', 'endedAt');
      }
      if (!database.objectStoreNames.contains('training')) {
        const training = database.createObjectStore('training', { keyPath: 'key' });
        training.createIndex('by-kind', 'kind');
      }
    };
    const database = await new Promise<IDBDatabase>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    const now = new Date().toISOString();
    const move = (ply: number, color: 'r' | 'b', from: number, to: number, notation: string) => ({
      ply,
      from,
      to,
      ucci: `${String.fromCharCode(97 + (from % 9))}${Math.floor(from / 9)}${String.fromCharCode(97 + (to % 9))}${Math.floor(to / 9)}`,
      notation,
      color,
      pieceType: 'C',
      capturedType: null,
      givesCheck: false,
      playedAt: now,
    });
    const record = {
      id: 'history-undo-test',
      mode: 'ai',
      playerColor: 'r',
      level: 1,
      initialFen: 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1',
      moves: [
        move(1, 'r', 25, 22, '炮二平五'),
        move(2, 'b', 70, 67, '炮8平5'),
      ],
      result: { status: 'win', winner: 'r', reason: 'resign' },
      startedAt: now,
      endedAt: now,
      elapsedMs: 1200,
    };
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction('games', 'readwrite');
      transaction.objectStore('games').put(record);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
    database.close();
  });

  await page.goto('/review/history-undo-test');
  await page.getByRole('link', { name: '回到对弈' }).click();
  await expect(page).toHaveURL(/\/play$/);
  await expect(page.locator('.board-hit')).toHaveCount(90);
  await expect(page.locator('.move-item')).toHaveCount(2);
  await expect(page.locator('.board-result')).toBeVisible();
  const undo = page.locator('.side-controls .control-button').first();
  await expect(undo).toBeEnabled();
  await undo.click();
  await expect(page.locator('.move-item')).toHaveCount(0);
  await expect(page.locator('.board-result')).toHaveCount(0);
});
test('starts a game, gets an AI reply, and restores the game', async ({ page }) => {
  await waitForOfflineReady(page);
  await page.getByRole('button', { name: /和 AI 下一盘/ }).click();
  await expect(page).toHaveURL(/\/play$/);
  await expect(page.locator('.board-hit')).toHaveCount(90);
  const desktopBoard = await page.locator('.board-shell').boundingBox();
  expect((desktopBoard?.y ?? 0) + (desktopBoard?.height ?? 0)).toBeLessThanOrEqual(720);

  await page.locator('[data-square="25"]').click();
  await page.locator('[data-square="22"]').click();
  await expect(page.locator('.move-item')).toHaveCount(2, { timeout: 15_000 });
  await expect(page.locator('.turn-chip')).toContainText('轮到你走');

  await page.reload();
  await expect(page.locator('.move-item')).toHaveCount(2, { timeout: 20_000 });
});

test('AI undo takes back the player and machine moves together', async ({ page }) => {
  await waitForOfflineReady(page);
  await page.getByRole('button', { name: /和 AI 下一盘/ }).click();
  await expect(page.locator('.board-hit')).toHaveCount(90);
  await page.locator('[data-square="25"]').click();
  await page.locator('[data-square="22"]').click();
  await expect(page.locator('.move-item')).toHaveCount(2, { timeout: 15_000 });
  await expect(page.locator('.turn-chip')).toContainText('轮到你走');

  const undo = page.locator('.side-controls .control-button').first();
  await expect(undo).toHaveAttribute('title', '退两步（含机器应手）');
  await undo.click();
  await expect(page.locator('.move-item')).toHaveCount(0);
  await expect(page.locator('.turn-chip')).toContainText('轮到你走');
});
test('switching sides keeps the current game and swaps colours', async ({ page }) => {
  await waitForOfflineReady(page);
  await page.getByRole('button', { name: /和 AI 下一盘/ }).click();
  await page.waitForSelector('.board-hit');
  await page.getByRole('button', { name: '换边，换成另一方继续当前棋局' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('.play-meta').first()).toContainText('你执黑');
  // 只弹一条会自动消失的 toast，不占正文位置
  await expect(page.locator('.board-toast')).toContainText('已换成执黑，当前棋局继续');
  await expect(page.locator('.inline-alert')).toHaveCount(0);
  // 同一盘棋继续：AI 改执红先走，走完仍轮到执黑的玩家
  await expect(page.locator('.turn-chip')).toContainText('轮到你走', { timeout: 30_000 });
  await expect(page.locator('.board-hit')).toHaveCount(90);
});

test('stays usable after going offline', async ({ page, context }) => {
  await waitForOfflineReady(page);
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator('.engine-badge')).toContainText(/(?:在线|本地) AI/);
  await expect(page.locator('.home-hero h1')).toContainText('静下来');
  await page.goto('/train');
  await expect(page.locator('h1')).toContainText('把棋感练出来');
});

test('tactic hint guides the move without a duplicate answer button', async ({ page }) => {
  await page.goto('/train/tactics/tactic-01');
  await expect(page.getByRole('button', { name: '看答案' })).toHaveCount(0);
  await page.getByRole('button', { name: '提示' }).click();
  await expect(page.locator('.board-toast')).toContainText('金色箭头');
  await page.locator('[data-square="49"]').click();
  await page.locator('[data-square="48"]').click();
  await expect(page.locator('.tactic-result')).toContainText('杀法成立');
  await expect(page.locator('.tactic-result')).toContainText('借助提示找到杀着');
  await expect(page.locator('.board-shell')).toHaveClass(/board-checkmate/);
  await expect(page.locator('.checkmate-stamp')).toContainText('绝杀');
  await expect(page.locator('.checkmate-burst')).toHaveCount(1);
  await expect(page.locator('.stalemate-burst')).toHaveCount(0);
});

test('training board and controls fit a 1080p browser viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 950 });
  await page.goto('/train/endgame/endgame-03');
  const board = await page.locator('.board-shell').boundingBox();
  const side = await page.locator('.play-side').boundingBox();
  const controls = await page.locator('.board-controls').boundingBox();
  expect((board?.y ?? 0) + (board?.height ?? 0)).toBeLessThanOrEqual(950);
  expect((controls?.y ?? 0) + (controls?.height ?? 0)).toBeLessThanOrEqual(950);
  expect(controls?.x ?? 0).toBeGreaterThan((board?.x ?? 0) + (board?.width ?? 0));
  expect(Math.abs((side?.y ?? 0) - (board?.y ?? 0))).toBeLessThan(1);
  expect(
    Math.abs(
      ((side?.y ?? 0) + (side?.height ?? 0)) -
        ((board?.y ?? 0) + (board?.height ?? 0)),
    ),
  ).toBeLessThan(1);
});

test('endgame lessons are sorted by difficulty and can be filtered', async ({ page }) => {
  await page.goto('/train/endgame');
  await expect(page.locator('.lesson-toolbar-primary')).toContainText('由易到难排序');
  const levels = await page.locator('.lesson-level').allTextContents();
  const ranks = levels.map((label) => (label === '入门' ? 1 : label === '进阶' ? 2 : 3));
  expect(ranks).toEqual([...ranks].sort((left, right) => left - right));

  await page.getByRole('button', { name: '挑战', exact: true }).click();
  const filteredLevels = await page.locator('.lesson-level').allTextContents();
  expect(filteredLevels.length).toBeGreaterThan(0);
  expect(new Set(filteredLevels)).toEqual(new Set(['挑战']));

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.lesson-level-filter')).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    ),
  ).toBe(false);
});

test('opening lessons are sorted by difficulty and can be filtered', async ({ page }) => {
  await page.goto('/train/opening');
  await expect(page.locator('.list-progress-badge')).toContainText('209');
  await expect(page.locator('.lesson-toolbar-primary')).toContainText('由易到难排序');
  const levels = await page.locator('.lesson-level').allTextContents();
  const ranks = levels.map((label) => (label === '入门' ? 1 : label === '进阶' ? 2 : 3));
  expect(ranks).toEqual([...ranks].sort((left, right) => left - right));

  await page.getByRole('button', { name: '挑战', exact: true }).click();
  const filteredLevels = await page.locator('.lesson-level').allTextContents();
  expect(filteredLevels.length).toBeGreaterThan(0);
  expect(new Set(filteredLevels)).toEqual(new Set(['挑战']));
});

test('endgame deviation gets a rules-validated reply without a line warning and can be undone', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 950 });
  await page.goto('/train/endgame/endgame-03');
  await page.waitForTimeout(400);
  const boardBefore = await page.locator('.board-shell').boundingBox();
  const statusBefore = await page.locator('.lesson-status').boundingBox();
  const scrollBefore = await page.evaluate(() => document.documentElement.scrollHeight);
  const scrollYBefore = await page.evaluate(() => window.scrollY);
  const undo = page.getByRole('button', { name: '悔棋' });
  await expect(undo).toBeDisabled();
  await expect(page.locator('.line-progress')).toHaveCount(0);

  // Deviate on the first move: no line warning is shown, but the reply stays legal.
  await page.locator('[data-square="68"]').click();
  await page.locator('[data-square="70"]').click();
  await expect(page.locator('.lesson-status')).not.toContainText('挑战失败');
  await expect(page.getByRole('button', { name: '提示' })).toBeDisabled();
  await expect(page.locator('.turn-chip')).toContainText('请你走这一步');
  await expect(page.locator('.turn-chip')).not.toContainText('偏离主线');
  await expect(page.locator('.lesson-status')).not.toContainText('偏离主线');
  await expect(page.locator('.board-toast')).toHaveCount(0);
  await expect.poll(
    () => page.workers().some((worker) => worker.url().includes('/engines/eleeye/worker.js')),
  ).toBe(true);

  const boardAfter = await page.locator('.board-shell').boundingBox();
  const statusAfter = await page.locator('.lesson-status').boundingBox();
  const scrollAfter = await page.evaluate(() => document.documentElement.scrollHeight);
  const scrollYAfter = await page.evaluate(() => window.scrollY);
  expect((boardAfter?.y ?? 0) + scrollYAfter).toBeCloseTo((boardBefore?.y ?? 0) + scrollYBefore, 0);
  expect((statusAfter?.y ?? 0) + scrollYAfter).toBeCloseTo((statusBefore?.y ?? 0) + scrollYBefore, 0);
  expect(statusAfter?.height).toBe(statusBefore?.height);
  expect(scrollAfter).toBe(scrollBefore);

  await expect(page.locator('.lesson-status')).not.toContainText('挑战失败');
  await expect(page.locator('.lesson-status')).toHaveJSProperty('offsetHeight', statusBefore?.height ?? 0);

  await expect(undo).toBeEnabled();
  await undo.click();
  await expect(page.locator('.board-toast')).toContainText('已悔棋');
  await expect(page.locator('[data-square="68"]')).toHaveAttribute('aria-label', /红方车/);
  await expect(page.locator('[data-square="70"]')).toHaveAttribute('aria-label', /空位/);
  await expect(undo).toBeDisabled();
});

test('one-move endgames are available in tactic training', async ({ page }) => {
  await page.goto('/train/tactics/tactic-classic-146');
  await page.locator('[data-square="47"]').click();
  await page.locator('[data-square="48"]').click();
  await expect(page.locator('.tactic-result')).toContainText('杀法成立', { timeout: 4_000 });
  await expect(page.locator('.board-shell')).toHaveClass(/board-checkmate/);
});

test('a stalemate counts as a one-move tactic win', async ({ page }) => {
  await page.goto('/train/tactics/tactic-03');
  await page.locator('[data-square="50"]').click();
  await page.locator('[data-square="51"]').click();
  await expect(page.locator('.turn-chip')).toContainText('困毙成立');
  await expect(page.locator('.tactic-result')).toContainText('独立找到杀着', { timeout: 4_000 });
  await expect(page.locator('.checkmate-stamp')).toContainText('困毙');
  await expect(page.locator('.board-shell')).toHaveClass(/board-stalemate/);
  await expect(page.locator('.stalemate-burst')).toHaveCount(1);
  await expect(page.locator('.checkmate-burst')).toHaveCount(0);
});

test('an endgame lesson completes when the user creates a stalemate', async ({ page }) => {
  await page.goto('/train/endgame/endgame-stalemate-01');
  await page.locator('[data-square="85"]').click();
  await page.locator('[data-square="83"]').click();
  await expect(page.locator('[data-square="84"]')).toHaveAttribute('aria-label', /黑方士/);
  await page.locator('[data-square="83"]').click();
  await page.locator('[data-square="84"]').click();
  await expect(page.locator('.tactic-result')).toContainText('困毙成功');
  await expect(page.locator('.tactic-result')).toContainText('找到困毙，完成');
  await expect(page.locator('.checkmate-stamp')).toContainText('困毙');
  await expect(page.locator('.stalemate-burst')).toHaveCount(1);
  await expect(page.locator('.checkmate-burst')).toHaveCount(0);
});

test('local two-player game alternates turns and undoes a round', async ({ page }) => {
  await page.goto('/local/chess');
  await expect(page.locator('.turn-chip')).toContainText('红方行棋');
  await page.locator('[data-square="25"]').click();
  await page.locator('[data-square="22"]').click();
  await expect(page.locator('.turn-chip')).toContainText('黑方行棋');
  await expect(page.locator('.move-item')).toHaveCount(1);
  await page.locator('[data-square="70"]').click();
  await page.locator('[data-square="67"]').click();
  await expect(page.locator('.move-item')).toHaveCount(2);
  await page.locator('.side-controls .control-button').first().click();
  await expect(page.locator('.turn-chip')).toContainText('红方行棋');
  await expect(page.locator('.move-item')).toHaveCount(0);
});

test('invalid moves show a board toast instead of a notice below the board', async ({ page }) => {
  await page.goto('/play?setup=1');
  await page.getByRole('button', { name: '双人对战' }).click();
  await page.getByRole('button', { name: '开始双人对局' }).click();
  await expect(page.locator('.turn-chip')).toContainText('轮到红方');
  await page.locator('[data-square="25"]').click();
  await page.locator('[data-square="40"]').click();

  const toast = page.locator('.board-toast');
  await expect(toast).toContainText('这步棋不能走');
  await expect(page.locator('.board-under .inline-alert')).toHaveCount(0);

  const board = await page.locator('.board-shell').boundingBox();
  const toastBox = await toast.locator('.board-toast-pill').boundingBox();
  expect((toastBox?.y ?? Infinity)).toBeGreaterThan(board?.y ?? 0);
  expect((toastBox?.y ?? Infinity) + (toastBox?.height ?? 0)).toBeLessThan(
    (board?.y ?? 0) + (board?.height ?? 0) / 2,
  );
});

test('local chess allows undo while in check', async ({ page }) => {
  const now = new Date().toISOString();
  await page.addInitScript((startedAt) => {
    localStorage.setItem('qilian.local-game.v1', JSON.stringify({
      fen: '4k4/9/9/9/9/9/9/9/4r4/4K4 w - - 0 1',
      moves: [{
        ply: 1,
        from: 25,
        to: 22,
        ucci: 'h2e2',
        notation: '炮二平五',
        color: 'r',
        pieceType: 'C',
        capturedType: null,
        givesCheck: false,
        playedAt: startedAt,
      }, {
        ply: 2,
        from: 25,
        to: 22,
        ucci: 'h2e2',
        notation: '炮二平五',
        color: 'b',
        pieceType: 'C',
        capturedType: null,
        givesCheck: false,
        playedAt: startedAt,
      }],
      positionHashes: [],
      result: { status: 'playing' },
      startedAt,
      orientation: 'r',
    }));
  }, now);
  await page.goto('/local/chess');
  await expect(page.locator('.check-banner')).toContainText('红方被将军');
  await expect(page.locator('.side-controls .control-button').first()).toBeEnabled();
});

test('local chess shows a capture notice', async ({ page }) => {
  const now = new Date().toISOString();
  await page.addInitScript((startedAt) => {
    localStorage.setItem('qilian.local-game.v1', JSON.stringify({
      fen: '3k5/9/9/9/9/9/9/9/n8/R3K4 w - - 0 1',
      moves: [],
      positionHashes: [],
      result: { status: 'playing' },
      startedAt,
      orientation: 'r',
    }));
  }, now);
  await page.goto('/local/chess');
  await page.locator('[data-square="0"]').click();
  await expect(page.locator('.legal-capture-mark')).toHaveCount(1);
  await expect(page.locator('.legal-capture-mark')).toHaveCSS('stroke', 'rgb(47, 122, 83)');
  await page.locator('[data-square="9"]').click();
  await expect(page.locator('.capture-banner')).toContainText('红车');
  await expect(page.locator('.capture-banner')).toContainText(/黑[马馬]/);
});
test('local chess shows the checkmate animation', async ({ page }) => {
  const now = new Date().toISOString();
  await page.addInitScript((startedAt) => {
    localStorage.setItem('qilian.local-game.v1', JSON.stringify({
      fen: '4k4/9/9/9/9/9/9/9/4r4/4K4 w - - 0 1',
      moves: [{
        ply: 1,
        from: 25,
        to: 22,
        ucci: 'h2e2',
        notation: '炮二平五',
        color: 'r',
        pieceType: 'C',
        capturedType: null,
        givesCheck: false,
        playedAt: startedAt,
      }],
      positionHashes: [],
      result: { status: 'win', winner: 'r', reason: 'checkmate' },
      startedAt,
      endedAt: startedAt,
      orientation: 'r',
    }));
  }, now);
  await page.goto('/local/chess');
  await expect(page.locator('.checkmate-stamp')).toBeVisible();
  await expect(page.locator('.board-checkmate')).toHaveCount(1);

  const undo = page.locator('.side-controls .control-button').first();
  await expect(undo).toBeEnabled();
  await undo.click();
  await expect(page.locator('.checkmate-stamp')).toBeHidden();
  await expect(page.locator('.move-item')).toHaveCount(0);
});
test('local game hub lists all offline games', async ({ page }) => {
  await page.goto('/local');
  await expect(page.locator('.local-game-card')).toHaveCount(4);
  await expect(page.locator('.local-game-card')).toContainText(['五子棋', '斗兽棋', '跳棋', '四子棋']);
});

test('local game cards open AI or local two-player mode directly', async ({ page }) => {
  await page.goto('/local');
  const gomokuCard = page.locator('.local-game-card').filter({ hasText: '五子棋' });
  await expect(gomokuCard.getByRole('link', { name: '人机' })).toHaveAttribute(
    'href',
    '/local/gomoku?mode=ai',
  );
  await expect(gomokuCard.getByRole('link', { name: '人人' })).toHaveAttribute(
    'href',
    '/local/gomoku?mode=local',
  );

  await gomokuCard.getByRole('link', { name: '人人' }).click();
  await expect(page).toHaveURL(/\/local\/gomoku\?mode=local$/);
  await expect(
    page.locator('.opponent-picker .segmented').first().getByRole('button', { name: '双人' }),
  ).toHaveClass(/is-selected/);
  await expect(page.locator('.engine-badge')).toHaveCount(0);
  await expect(page.locator('.mobile-engine-status')).toHaveCount(0);

  await page.goto('/local/gomoku?mode=ai');
  await expect(page.locator('.game-engine-status .mobile-engine-status:visible')).toBeVisible();
  await expect(page.locator('.game-engine-status .mobile-engine-status:visible')).toContainText('本地 AI · 已就绪');
});

test('game pages use one AI status and game-meta format', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of [
    '/local/gomoku?mode=ai',
    '/local/jungle?mode=ai',
    '/local/checkers?mode=ai',
    '/local/connect4?mode=ai',
  ]) {
    await page.goto(path);
    const topline = page.locator('.play-topline-right');
    await expect(topline).toHaveCount(1);
    await expect(topline.locator('.mobile-engine-status')).toHaveText('本地 AI · 已就绪');
    await expect(page.locator('.play-topline-meta')).toHaveCount(0);
    const elapsed = page.locator('.board-toolbar .board-time');
    await expect(elapsed).toHaveText(/^(\d+ 秒|\d+ 分(?: \d+ 秒)?|\d+ 小时 \d+ 分)$/);
    await expect(elapsed).not.toContainText('你执');
    const chips = await page.locator('.mobile-engine-status:visible, .board-time').evaluateAll(
      (elements) => elements.map((element) => {
        const style = getComputedStyle(element);
        return {
          height: style.height,
          fontSize: style.fontSize,
          padding: style.padding,
          borderRadius: style.borderRadius,
        };
      }),
    );
    expect(chips).toHaveLength(2);
    expect(chips[0]).toEqual(chips[1]);
  }
});

test('xiangqi and other game pages share the same AI status style', async ({ page }) => {
  await waitForOfflineReady(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: /和 AI 下一盘/ }).click();
  await expect(page).toHaveURL(/\/play$/);
  await expect(page.locator('.board-hit')).toHaveCount(90);

  const readStatusStyle = () => page.locator('.mobile-engine-status:visible').evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      height: style.height,
      fontSize: style.fontSize,
      padding: style.padding,
      borderRadius: style.borderRadius,
      borderColor: style.borderColor,
      backgroundColor: style.backgroundColor,
    };
  });
  await page.waitForTimeout(200);
  const xiangqiStyle = await readStatusStyle();
  const xiangqiToolbarHeight = (await page.locator('.game-board-toolbar').boundingBox())?.height;

  await page.goto('/local/gomoku?mode=ai');
  await expect(page.locator('.mobile-engine-status:visible')).toHaveText('本地 AI · 已就绪');
  await page.waitForTimeout(200);
  const localGameStyle = await readStatusStyle();
  expect(xiangqiStyle).toEqual(localGameStyle);
  expect((await page.locator('.game-board-toolbar').boundingBox())?.height).toBe(xiangqiToolbarHeight);
});

test('global and game AI status use identical typography and capsule size', async ({ page }) => {
  await waitForOfflineReady(page);
  const readPill = (locator: import('@playwright/test').Locator) => locator.evaluate((element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return {
      height: style.height,
      width: rect.width,
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      lineHeight: style.lineHeight,
      padding: style.padding,
      borderRadius: style.borderRadius,
      color: style.color,
      borderColor: style.borderColor,
      backgroundColor: style.backgroundColor,
    };
  });

  await page.goto('/train');
  const regular = page.locator('.engine-badge.tone-ready:visible');
  await expect(regular).toBeVisible();
  await expect(regular).toContainText('在线 AI · 已就绪');
  await page.waitForTimeout(200);
  const regularStyle = await readPill(regular);
  const navBottom = (await page.locator('.site-header').boundingBox())?.height ?? 0;
  const regularPillTop = (await regular.boundingBox())?.y ?? 0;

  await page.goto('/');
  await page.getByRole('button', { name: /和 AI 下一盘/ }).click();
  const gamePill = page.locator('.game-engine-status .mobile-engine-status:visible');
  await expect(gamePill).toBeVisible();
  await page.waitForTimeout(200);
  const gameStyle = await readPill(gamePill);
  expect(gameStyle).toEqual(regularStyle);
  expect((await gamePill.boundingBox())?.y ?? 0).toBeCloseTo(regularPillTop, 0);
  expect(regularPillTop - navBottom).toBeCloseTo(12, 0);
  expect(((await gamePill.boundingBox())?.y ?? 0) - navBottom).toBeCloseTo(12, 0);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/train');
  const mobileRegular = page.locator('.engine-badge.tone-ready:visible');
  await expect(mobileRegular).toContainText('在线 AI · 已就绪');
  await page.waitForTimeout(200);
  const mobileRegularStyle = await readPill(mobileRegular);
  await page.goto('/play');
  await expect(page.locator('.mobile-engine-status:visible')).toBeVisible();
  await page.waitForTimeout(200);
  const mobileGameStyle = await readPill(page.locator('.mobile-engine-status:visible'));
  expect(mobileGameStyle).toEqual(mobileRegularStyle);
});

test('game time stays beside the board switch control on desktop and mobile', async ({ page }) => {
  await page.goto('/play?setup=1');
  await page.getByRole('button', { name: '双人对战' }).click();
  await page.getByRole('button', { name: '开始双人对局' }).click();

  async function expectTimeBesideSwitch() {
    const time = page.locator('.board-time');
    const switchButton = page.locator('.board-toolbar-actions .btn');
    await expect(time).toBeVisible();
    await expect(switchButton).toBeVisible();
    const timeBox = await time.boundingBox();
    const switchBox = await switchButton.boundingBox();
    const toolbarBox = await page.locator('.board-toolbar').boundingBox();
    expect(Math.abs((timeBox?.y ?? 0) - (switchBox?.y ?? 0))).toBeLessThan(4);
    expect((timeBox?.x ?? 0) + (timeBox?.width ?? 0) / 2).toBeCloseTo(
      (toolbarBox?.x ?? 0) + (toolbarBox?.width ?? 0) / 2,
      0,
    );
    expect((switchBox?.x ?? 0) + (switchBox?.width ?? 0)).toBeCloseTo(
      (toolbarBox?.x ?? 0) + (toolbarBox?.width ?? 0),
      0,
    );
    const boardBox = await page.locator('.board-shell').boundingBox();
    expect((timeBox?.y ?? 0) + (timeBox?.height ?? 0)).toBeLessThan(boardBox?.y ?? 0);
  }

  await expectTimeBesideSwitch();
  await page.setViewportSize({ width: 390, height: 844 });
  await expectTimeBesideSwitch();
});

test('game pages start at the same distance from the top tabs as other game pages', async ({ page }) => {
  await page.goto('/play?setup=1');
  await page.getByRole('button', { name: '双人对战' }).click();
  await page.getByRole('button', { name: '开始双人对局' }).click();
  await page.waitForTimeout(250);
  const xiangqiTopline = await page.locator('.play-topline').boundingBox();

  await page.goto('/local/gomoku?mode=ai');
  await page.waitForTimeout(250);
  const gomokuTopline = await page.locator('.play-topline').boundingBox();

  expect(gomokuTopline?.y).toBeCloseTo(xiangqiTopline?.y ?? 0, 0);
});

test('local gomoku places black and white stones', async ({ page }) => {
  await page.goto('/local/gomoku?mode=local');
  await expect(page.locator('.turn-chip')).toContainText('黑方行棋');
  await page.locator('[data-gomoku-square="112"]').click();
  await expect(page.locator('.turn-chip')).toContainText('白方行棋');
  await page.locator('[data-gomoku-square="113"]').click();
  await expect(page.locator('.turn-chip')).toContainText('黑方行棋');
  await expect(page.locator('.gomoku-stone')).toHaveCount(2);
});

test('mobile gomoku result is centered on the board without scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    const board = Array(15 * 15).fill(null);
    for (const index of [112, 113, 114, 115, 116]) board[index] = 'w';
    const now = new Date().toISOString();
    localStorage.setItem('qilian.local-gomoku.v1', JSON.stringify({
      state: {
        board,
        turn: 'b',
        status: { status: 'win', winner: 'w', line: [112, 113, 114, 115, 116], reason: 'five' },
        lastMove: 116,
      },
      moves: [{ index: 112, color: 'w', ply: 1 }],
      startedAt: now,
      endedAt: now,
      mode: 'local',
      level: 2,
    }));
  });
  await page.goto('/local/gomoku');

  const result = page.locator('.result-card');
  await expect(result).toBeVisible();
  await page.waitForTimeout(300);
  const resultBox = await result.boundingBox();
  const board = await page.locator('.gomoku-board').boundingBox();
  expect((resultBox?.y ?? 0) + (resultBox?.height ?? 0) / 2).toBeCloseTo(
    (board?.y ?? 0) + (board?.height ?? 0) / 2,
    0,
  );
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await expect(result.getByRole('button', { name: '再来一局' })).toBeInViewport();

  const undo = page.locator('.side-controls .control-button').first();
  await expect(undo).toBeEnabled();
  await undo.click();
  await expect(result).toHaveCount(0);
  await expect(page.locator('.gomoku-stone')).toHaveCount(0);
});

test('local connect four drops into a column', async ({ page }) => {
  await page.goto('/local/connect4?mode=local');
  await expect(page.locator('.turn-chip')).toContainText('红方行棋');
  await page.locator('.connect4-column-target[data-connect4-column="3"]').click();
  await expect(page.locator('.turn-chip')).toContainText('黄方行棋');
  await page.locator('.connect4-column-target[data-connect4-column="3"]').click();
  await expect(page.locator('.turn-chip')).toContainText('红方行棋');
  await expect(page.locator('.connect4-disc')).toHaveCount(2);
  await expect(page.locator('.connect4-cell.is-last')).toHaveAttribute('data-connect4-column', '3');
});
test('local connect four keeps every clicked column aligned', async ({ page }) => {
  await page.goto('/local/connect4?mode=local');
  for (let column = 0; column < 7; column += 1) {
    await page.locator(`.connect4-column-target[data-connect4-column="${column}"]`).click();
    await expect(page.locator('.connect4-cell.is-last')).toHaveAttribute(
      'data-connect4-column',
      String(column),
    );
  }
  await expect(page.locator('.connect4-disc')).toHaveCount(7);
});
test('local jungle game alternates turns', async ({ page }) => {
  await page.goto('/local/jungle?mode=local');
  await expect(page.locator('.turn-chip')).toContainText('红方行棋');
  await page.locator('[data-jungle-square="50"]').click();
  await page.locator('[data-jungle-square="43"]').click();
  await expect(page.locator('.turn-chip')).toContainText('黑方行棋');
  await expect(page.locator('.side-meta')).toContainText('已走 1 手');
});

test('local Chinese checkers alternates turns', async ({ page }) => {
  await page.goto('/local/checkers');
  await expect(page.locator('.turn-chip')).toContainText('红方行棋');
  await page.locator('[data-checkers-hole="111"]').click();
  await page.locator('[data-checkers-hole="102"]').click();
  await expect(page.locator('.turn-chip')).toContainText('黑方行棋');
  await expect(page.locator('.local-move-row')).toHaveCount(1);
});
test('classic endgame shows its original source', async ({ page }) => {
  await page.goto('/train/endgame/endgame-classic-01');
  await expect(page.locator('.exercise-title')).toContainText('气吞关右');
  await expect(page.locator('.source-card')).toContainText('适情雅趣');
  await expect(page.locator('.source-card a[href*="xqdao.com"]')).toBeVisible();
  await expect(page.locator('.board-hit')).toHaveCount(90);
});
test('opening training previews the line and requires correct red and black rounds', async ({ page }) => {
  await page.goto('/train/opening/opening-central-cannon-screen-horses');

  const watch = page.getByRole('button', { name: '观看', exact: true });
  const skip = page.getByRole('button', { name: '跳过观看' });
  await expect(watch).toBeVisible();
  await expect(skip).toBeVisible();
  await expect(page.locator('.opening-float-caption')).toContainText('先观看讲解');
  await expect(page.locator('.turn-chip')).toBeHidden();
  await expect(page.locator('.lesson-status')).toHaveCount(0);
  await page.waitForTimeout(250);
  const boardDocumentTopBeforeWatch = await page.locator('.board-shell').evaluate(
    (element) => element.getBoundingClientRect().top + window.scrollY,
  );

  const actions = await page.locator('.opening-review-actions').boundingBox();
  const board = await page.locator('.board-shell').boundingBox();
  expect(actions?.x ?? 0).toBeGreaterThanOrEqual(board?.x ?? 0);
  expect(actions?.y ?? 0).toBeGreaterThanOrEqual(board?.y ?? 0);
  expect((actions?.x ?? 0) + (actions?.width ?? 0)).toBeLessThanOrEqual(
    (board?.x ?? 0) + (board?.width ?? 0),
  );
  expect((actions?.y ?? 0) + (actions?.height ?? 0)).toBeLessThanOrEqual(
    (board?.y ?? 0) + (board?.height ?? 0),
  );

  // Watching starts the scripted demonstration and can be skipped immediately.
  await watch.click();
  await expect(page.locator('.turn-chip')).toContainText('观看演示');
  expect(
    await page.locator('.board-shell').evaluate(
      (element) => element.getBoundingClientRect().top + window.scrollY,
    ),
  ).toBe(boardDocumentTopBeforeWatch);
  await expect(page.locator('.line-progress-label')).toContainText(/[1-5] \/ 6 步/);
  const pause = page.getByRole('button', { name: '暂停观看' });
  await expect(pause).toBeVisible();
  await expect(skip).toHaveCount(0);
  await pause.click();
  const resume = page.getByRole('button', { name: '继续观看' });
  const pausedSkip = page.getByRole('button', { name: '跳过观看' });
  await expect(resume).toBeVisible();
  await expect(pausedSkip).toBeVisible();
  await expect(resume).toHaveText('');
  await expect(pausedSkip).toHaveText('');
  const pausedProgress = await page.locator('.line-progress-label').textContent();
  await page.waitForTimeout(900);
  await expect(page.locator('.line-progress-label')).toHaveText(pausedProgress);
  await resume.click();
  await expect(page.getByRole('button', { name: '暂停观看' })).toBeVisible();
  await page.getByRole('button', { name: '暂停观看' }).click();
  await pausedSkip.click();
  await expect(page.locator('.turn-chip')).toContainText('红方第一轮 · 请你走这一步');
  await expect(page.locator('.board-toast')).toContainText('已跳过观看');
  await page.getByRole('button', { name: '教程' }).click();
  await expect(page.locator('.turn-chip')).toContainText('观看演示');
  await expect(page.getByRole('button', { name: '暂停观看' })).toBeVisible();
  await page.getByRole('button', { name: '暂停观看' }).click();
  await page.getByRole('button', { name: '跳过观看' }).click();
  await expect(page.locator('.turn-chip')).toContainText('红方第一轮 · 请你走这一步');

  // A legal but incorrect move leaves the position and round progress unchanged.
  await page.locator('[data-square="29"]').click();
  await page.locator('[data-square="38"]').click();
  await expect(page.locator('.board-toast')).toContainText('不符合红方第一轮的主线');
  await expect(page.locator('.line-progress-label')).toContainText('0 / 6 步');

  // Red round: the user makes red's three moves while black follows the script.
  await page.locator('[data-square="25"]').click();
  await page.locator('[data-square="22"]').click();
  await expect(page.locator('.line-progress-label')).toContainText('2 / 6 步');
  await page.getByRole('button', { name: '重来' }).click();
  await expect(page.locator('.board-toast')).toContainText('已重新开始');
  await expect(page.locator('.line-progress-label')).toContainText('0 / 6 步');
  await expect(page.locator('.opening-review-actions')).toHaveCount(0);
  await page.locator('[data-square="25"]').click();
  await page.locator('[data-square="22"]').click();
  await expect(page.locator('.line-progress-label')).toContainText('2 / 6 步');
  await page.locator('[data-square="7"]').click();
  await page.locator('[data-square="24"]').click();
  await expect(page.locator('.line-progress-label')).toContainText('4 / 6 步');
  await page.locator('[data-square="8"]').click();
  await page.locator('[data-square="7"]').click();
  await expect(page.locator('.turn-chip')).toContainText('黑方第二轮');
  await expect(page.locator('.tactic-result')).toHaveCount(0);

  // Black round: red is now demonstrated, and only the user's black moves count.
  await expect(page.locator('.turn-chip')).toContainText('黑方第二轮 · 请你走这一步');
  await page.locator('[data-square="88"]').click();
  await page.locator('[data-square="69"]').click();
  await expect(page.locator('.line-progress-label')).toContainText('3 / 6 步');
  await page.locator('[data-square="82"]').click();
  await page.locator('[data-square="65"]').click();
  await expect(page.locator('.line-progress-label')).toContainText('5 / 6 步');
  await page.locator('[data-square="89"]').click();
  await page.locator('[data-square="88"]').click();

  // Passing is recorded only after both rounds.
  await expect(page.locator('.tactic-result')).toContainText('两轮训练通过');
  await expect(page.locator('.tactic-result')).toContainText('红方、黑方两轮都走对了');
  await expect(page.locator('.line-progress-label')).toContainText('红黑两轮通过');
  await page.getByRole('button', { name: '教程' }).click();
  await expect(page.locator('.tactic-result')).toHaveCount(0);
  await expect(page.locator('.turn-chip')).toContainText('观看演示');
  await expect(page.getByRole('button', { name: '暂停观看' })).toBeVisible();
});
test('opening preview automatically starts the red round after the full line', async ({ page }) => {
  await page.goto('/train/opening/opening-central-cannon-screen-horses');
  await page.getByRole('button', { name: '观看', exact: true }).click();
  await expect(page.locator('.line-progress-label')).toContainText(/[1-5] \/ 6 步/);
  await expect(page.locator('.turn-chip')).toContainText('红方第一轮 · 请你走这一步');
  await expect(page.locator('.opening-review-actions')).toHaveCount(0);
});
test('large training library paginates and searches', async ({ page }) => {
  await page.goto('/train/endgame');
  await expect(page.locator('.lesson-meta-strip')).toContainText('737 节');
  await expect(page.locator('.page-heading h1')).toHaveCount(0);
  await expect(page.locator('.page-heading p')).toHaveCount(0);
  await expect(page.locator('.lesson-row')).toHaveCount(30);
  await page.locator('.list-more').click();
  await expect(page.locator('.lesson-row')).toHaveCount(60);
  await page.locator('.list-search').fill('气吞关右');
  await expect(page.locator('.lesson-row')).toHaveCount(1);

  await page.goto('/train/tactics');
  await expect(page.locator('.list-progress-badge')).toContainText('861');
  await expect(page.locator('.page-heading h1')).toHaveCount(0);
  await expect(page.locator('.page-heading p')).toHaveCount(0);
  await expect(page.locator('.tactic-card')).toHaveCount(30);
  await expect(page.locator('.sort-note')).toContainText('由易到难排序');
  const tacticLevels = await page.locator('.tactic-meta span:first-child').allTextContents();
  const tacticRanks = tacticLevels.map((label) => (label === '入门' ? 1 : label === '进阶' ? 2 : 3));
  expect(tacticRanks).toEqual([...tacticRanks].sort((left, right) => left - right));
  await page.locator('.list-more').click();
  await expect(page.locator('.tactic-card')).toHaveCount(60);

  await page.goto('/train/opening');
  await expect(page.locator('.page-heading h1')).toHaveCount(0);
  await expect(page.locator('.page-heading p')).toHaveCount(0);
});
test('mobile tactic success uses one centered result card', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/train/tactics/tactic-01');
  const scrollBefore = await page.evaluate(() => window.scrollY);
  await page.locator('[data-square="49"]').click();
  await page.locator('[data-square="48"]').click();
  const result = page.locator('.tactic-result');
  await expect(result).toHaveCount(0);
  await expect(result).toBeVisible({ timeout: 4_000 });
  await expect(result).toHaveCount(1);
  await expect(result.getByRole('button', { name: /下一题/ })).toBeInViewport();
  await expect(page.locator('.side-controls .control-button.primary')).toHaveCount(0);
  const box = await result.boundingBox();
  expect(box?.y).toBeGreaterThanOrEqual(0);
  expect((box?.y ?? 0) + (box?.height ?? 0)).toBeLessThanOrEqual(844);
  const board = await page.locator('.board-shell').boundingBox();
  expect((box?.y ?? 0) + (box?.height ?? 0) / 2).toBeCloseTo(
    (board?.y ?? 0) + (board?.height ?? 0) / 2,
    0,
  );
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore);
});

test('tactics mistakes use a board toast instead of an inline alert', async ({ page }) => {
  await page.goto('/train/tactics/tactic-01');
  await page.locator('[data-square="49"]').click();
  await page.locator('[data-square="40"]').click();

  await expect(page.locator('.board-toast')).toContainText('这步没有形成将死');
  await expect(page.locator('.inline-alert')).toHaveCount(0);
});

test('mobile back link has a comfortable tap target', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto('/local');
  const box = await page.locator('.back-link').boundingBox();
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  expect(box?.width ?? 0).toBeGreaterThanOrEqual(100);
  await page.locator('.back-link').click();
  await expect(page).toHaveURL(/\/$/);
  await context.close();
});
test('mobile layout has no horizontal overflow and an immersive game', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await waitForOfflineReady(page);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    ),
  ).toBe(false);
  await expect(page.locator('.site-header')).toBeHidden();
  await expect(page.locator('.mobile-game-lobby h1')).toContainText('下一盘好棋');
  await page.getByRole('button', { name: /和 AI 下一盘/ }).click();
  await expect(page).toHaveURL(/\/play$/);
  await expect(page.locator('.bottom-nav')).toBeHidden();
  await expect(page.locator('.board-hit')).toHaveCount(90);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    ),
  ).toBe(false);
  await context.close();
});

test('mobile home exposes working share and shortcut actions', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: async (data: ShareData) => {
        (window as Window & { sharedData?: ShareData }).sharedData = data;
      },
    });
  });
  await page.goto('/');

  const actions = page.locator('.mobile-lobby-app-actions');
  await expect(page.locator('#mobile-lobby-title')).toHaveClass(/sr-only/);
  await expect(actions.getByRole('button', { name: '分享' })).toBeVisible();
  await expect(actions.getByRole('button', { name: '创建快捷方式' })).toBeVisible();
  await expect(actions.getByRole('button', { name: '创建快捷方式' })).toHaveText('创建快捷方式');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /^http.*\/icons\/icon-512\.png$/,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', /^http.*\/$/);
  await expect(page.locator('meta[name="apple-mobile-web-app-title"]')).toHaveAttribute('content', '棋练');
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
    'href',
    /\/icons\/apple-touch-icon\.png$/,
  );
  const actionBox = await actions.boundingBox();
  const primaryBox = await page.getByRole('button', { name: /和 AI 下一盘/ }).boundingBox();
  expect((primaryBox?.y ?? 0) - ((actionBox?.y ?? 0) + (actionBox?.height ?? 0))).toBeGreaterThanOrEqual(8);

  await actions.getByRole('button', { name: '分享' }).click();
  await expect.poll(() =>
    page.evaluate(() => (window as Window & { sharedData?: ShareData }).sharedData?.title),
  ).toBe('棋练 · 中国象棋');

  await actions.getByRole('button', { name: '创建快捷方式' }).click();
  const dialog = page.getByRole('dialog', { name: '创建快捷方式' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('选择“安装棋练”');
  await dialog.getByRole('button', { name: '知道了' }).click();
  await expect(dialog).toBeHidden();
  await context.close();
});

test('iOS shortcut action shows add-to-home-screen guidance', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  });
  const page = await context.newPage();
  await page.goto('/');
  await page.getByRole('button', { name: '创建快捷方式' }).click();

  const dialog = page.getByRole('dialog', { name: '添加到主屏幕' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('iPhone 和 iPad 需要从 Safari 的分享菜单手动添加');
  await expect(dialog).toContainText('选择“添加到主屏幕”');
  await context.close();
});

test('short phones keep the app actions above the fold', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 320, height: 568 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto('/');

  await expect(page.getByRole('button', { name: '分享' })).toBeInViewport();
  await expect(page.getByRole('button', { name: '创建快捷方式' })).toBeInViewport();
  await expect(page.getByRole('button', { name: '分享' }).locator('svg')).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    ),
  ).toBe(false);
  await context.close();
});

test('installed mobile app hides the shortcut action', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  });
  const page = await context.newPage();
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'standalone', { configurable: true, value: true });
  });
  await page.goto('/');

  await expect(page.getByRole('button', { name: '分享' })).toBeVisible();
  await expect(page.getByRole('button', { name: '创建快捷方式' })).toHaveCount(0);
  await context.close();
});

test('built mobile board preview keeps its backdrop blur', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto('/');

  const backdropFilter = await page.locator('.board-preview').evaluate((element) => {
    return getComputedStyle(element, '::after').backdropFilter;
  });
  expect(backdropFilter).not.toBe('none');
  expect(backdropFilter).toContain('blur');
  await context.close();
});

test('ElephantEye assets are available from the offline cache', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto('/');

  const assets = ['/engines/eleeye/worker.js', '/engines/eleeye/eleeye.js', '/engines/eleeye/eleeye.wasm'];
  await expect.poll(
    () =>
      page.evaluate(async (paths) => {
        await navigator.serviceWorker.ready;
        return Promise.all(
          paths.map(async (path) => {
            return Boolean(
              await caches.match(new URL(path, location.origin).href, { ignoreSearch: true }),
            );
          }),
        );
      }, assets),
    { timeout: 15_000 },
  ).toEqual([true, true, true]);
  await context.close();
});

test('xiangqi falls back to ElephantEye when the Pikafish API is unavailable', async ({ page }) => {
  await page.route('**/auto-chess/api/v1/**', (route) => route.abort());
  await page.goto('/');

  await expect(page.locator('.engine-badge')).toContainText('本地 AI', { timeout: 20_000 });
  const start = page.getByRole('button', { name: /和 AI 下一盘/ });
  await expect(start).toBeEnabled();
  await start.click();
  await expect(page).toHaveURL(/\/play$/);

  await page.locator('[data-square="25"]').click();
  await page.locator('[data-square="22"]').click();
  await expect(page.locator('.play-side').getByText(/已走 2 手/)).toBeVisible({ timeout: 15_000 });
});

test('active mobile game hides the continue heading in the title row', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 320, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto('/');
  await page.evaluate(async () => {
    const fenRows = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR'.split('/');
    const board: Array<{ color: 'r' | 'b'; type: string } | null> = Array(90).fill(null);
    fenRows.forEach((row, rowIndex) => {
      let file = 0;
      const rank = 9 - rowIndex;
      for (const token of row) {
        if (/\d/.test(token)) {
          file += Number(token);
        } else {
          board[rank * 9 + file] = {
            color: token === token.toUpperCase() ? 'r' : 'b',
            type: token.toUpperCase(),
          };
          file += 1;
        }
      }
    });
    const now = new Date().toISOString();
    const game = {
      id: 'mobile-active-game',
      mode: 'ai',
      playerColor: 'r',
      level: 2,
      position: { board, turn: 'r', halfmoveClock: 0, fullmove: 1 },
      positionHashes: ['seed'],
      moves: [],
      phase: 'playing',
      result: { status: 'playing' },
      startedAt: now,
      updatedAt: now,
      elapsedMs: 0,
    };

    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.open('qilian', 1);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains('currentGame')) {
          database.createObjectStore('currentGame', { keyPath: 'key' });
        }
        if (!database.objectStoreNames.contains('games')) {
          database.createObjectStore('games', { keyPath: 'id' });
        }
        if (!database.objectStoreNames.contains('training')) {
          database.createObjectStore('training', { keyPath: 'key' });
        }
      };
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const database = request.result;
        const transaction = database.transaction('currentGame', 'readwrite');
        transaction.objectStore('currentGame').put({ key: 'current', game });
        transaction.oncomplete = () => {
          database.close();
          resolve();
        };
        transaction.onerror = () => reject(transaction.error);
      };
    });
  });
  await page.reload();

  await expect(page.locator('#mobile-lobby-title')).toHaveClass(/sr-only/);
  await expect(page.getByRole('button', { name: '继续对局' })).toBeVisible();
  await expect(page.getByRole('button', { name: '创建快捷方式' })).toBeVisible();
  const actionBox = await page.locator('.mobile-lobby-float-stack .mobile-lobby-app-actions').boundingBox();
  const primaryBox = await page.locator('.mobile-lobby-float-cta-row').boundingBox();
  const boardBox = await page.locator('.mobile-board-stage').boundingBox();
  expect((primaryBox?.y ?? 0) - ((actionBox?.y ?? 0) + (actionBox?.height ?? 0))).toBeGreaterThanOrEqual(8);
  expect(actionBox?.y ?? 0).toBeGreaterThan(boardBox?.y ?? 0);
  await context.close();
});
