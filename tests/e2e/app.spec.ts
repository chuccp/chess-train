import { test, expect } from '@playwright/test';

async function waitForOfflineReady(page: import('@playwright/test').Page) {
  await page.goto('/');
  await expect(page.locator('.engine-badge')).toContainText('离线就绪', { timeout: 60_000 });
}

test('home loads with the offline engine ready', async ({ page }) => {
  await waitForOfflineReady(page);
  await expect(page.locator('.home-hero h1')).toContainText('静下来');
  await expect(page.getByRole('button', { name: /和 AI 下一盘/ })).toBeEnabled();
  await expect(page.locator('.desktop-nav')).toBeVisible();
});

test('home surfaces the offline two-player entry', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.home-local-banner')).toBeVisible();
  await expect(page.locator('.home-local-banner')).toContainText('两个人，一台设备');
  await page.locator('.home-local-banner').click();
  await expect(page).toHaveURL(/\/local$/);
  await expect(page.locator('.local-game-card')).toHaveCount(5);
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

test('switching sides starts a new game with the AI moving first', async ({ page }) => {
  await waitForOfflineReady(page);
  await page.getByRole('button', { name: /和 AI 下一盘/ }).click();
  await page.waitForSelector('.board-hit');
  await page.getByRole('button', { name: '换边并开始新局' }).click();
  await expect(page.getByRole('dialog')).toContainText('换边重开');
  await page.getByRole('button', { name: '换边开局' }).click();
  await expect(page.locator('.play-meta').first()).toContainText('你执黑');
  await expect(page.locator('.move-item')).toHaveCount(1, { timeout: 15_000 });
  await expect(page.locator('.turn-chip')).toContainText('轮到你走');
});

test('stays usable after going offline', async ({ page, context }) => {
  await waitForOfflineReady(page);
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator('.engine-badge')).toContainText('离线就绪');
  await expect(page.locator('.home-hero h1')).toContainText('静下来');
  await page.goto('/train');
  await expect(page.locator('h1')).toContainText('把棋感练出来');
});

test('tactic answer marks the exercise completed', async ({ page }) => {
  await waitForOfflineReady(page);
  await page.goto('/train/tactics/tactic-01');
  await page.getByRole('button', { name: '看答案' }).click();
  await expect(page.locator('.tactic-result')).toContainText('参考答案');
  await expect(page.locator('.tactic-result')).toContainText('看答案也算完成');
});

test('training board and controls fit a 1080p browser viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 950 });
  await page.goto('/train/endgame/endgame-01');
  const board = await page.locator('.board-shell').boundingBox();
  const controls = await page.locator('.board-controls').boundingBox();
  expect((board?.y ?? 0) + (board?.height ?? 0)).toBeLessThanOrEqual(950);
  expect((controls?.y ?? 0) + (controls?.height ?? 0)).toBeLessThanOrEqual(950);
  expect(controls?.x ?? 0).toBeGreaterThan((board?.x ?? 0) + (board?.width ?? 0));
});

test('lesson deviation waits for the move budget before failing', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 950 });
  await page.goto('/train/endgame/endgame-01');
  await page.waitForTimeout(400);
  const boardBefore = await page.locator('.board-shell').boundingBox();
  const statusBefore = await page.locator('.lesson-status').boundingBox();
  const scrollBefore = await page.evaluate(() => document.documentElement.scrollHeight);
  const scrollYBefore = await page.evaluate(() => window.scrollY);

  // Deviate on the first move: free play starts, but failure is not declared yet.
  await page.locator('[data-square="58"]').click();
  await page.locator('[data-square="67"]').click();
  await expect(page.locator('.lesson-status')).toContainText('限定步数内将死');
  await expect(page.locator('.lesson-status')).not.toContainText('偏离');
  await expect(page.locator('.lesson-status')).not.toContainText('挑战失败');
  await expect(page.getByRole('button', { name: '提示' })).toBeDisabled();
  await expect(page.locator('.turn-chip')).toContainText('自由走子');

  const boardAfter = await page.locator('.board-shell').boundingBox();
  const statusAfter = await page.locator('.lesson-status').boundingBox();
  const scrollAfter = await page.evaluate(() => document.documentElement.scrollHeight);
  const scrollYAfter = await page.evaluate(() => window.scrollY);
  expect((boardAfter?.y ?? 0) + scrollYAfter).toBeCloseTo((boardBefore?.y ?? 0) + scrollYBefore, 0);
  expect((statusAfter?.y ?? 0) + scrollYAfter).toBeCloseTo((statusBefore?.y ?? 0) + scrollYBefore, 0);
  expect(statusAfter?.height).toBe(statusBefore?.height);
  expect(scrollAfter).toBe(scrollBefore);

  // Use the remaining two plies freely; failure appears only when the budget is exhausted.
  await page.locator('[data-square="66"]').click();
  await page.locator('[data-square="75"]').click();
  await expect(page.locator('.line-progress-label')).toContainText('2 / 3 步');
  await expect(page.locator('.lesson-status')).not.toContainText('偏离');
  await expect(page.locator('.lesson-status')).not.toContainText('挑战失败');

  await page.locator('[data-square="67"]').click();
  await page.locator('[data-square="76"]').click();
  await expect(page.locator('.lesson-status')).toContainText('步数已用完');
  await expect(page.locator('.lesson-status')).toContainText('未能在限定步数内将死');
  await expect(page.locator('.lesson-status')).toContainText('挑战失败');
  await expect(page.locator('.line-progress-label')).toContainText('3 / 3 步');
  await expect(page.locator('.lesson-status')).toHaveJSProperty('offsetHeight', statusBefore?.height ?? 0);
});

test('a faster mate completes the endgame lesson', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 950 });
  await page.goto('/train/endgame/endgame-02');
  await page.waitForTimeout(300);
  await page.locator('[data-square="49"]').click();
  await page.locator('[data-square="48"]').click();
  await expect(page.locator('.lesson-status')).toContainText('将死成功');
  await expect(page.locator('.board-shell')).toHaveClass(/board-checkmate/);
  await expect(page.locator('.checkmate-stamp')).toBeVisible();
  await expect(page.locator('.tactic-result')).toContainText('找到将死，完成');
  await expect(page.locator('.tactic-result')).toContainText('错试 0 次');
  await expect(page.locator('.line-progress-label')).toContainText('已完成');
  await expect(page.getByRole('button', { name: '提示' })).toBeDisabled();
});

test('local two-player game alternates turns and undoes a move', async ({ page }) => {
  await page.goto('/local/chess');
  await expect(page.locator('.turn-chip')).toContainText('红方行棋');
  await page.locator('[data-square="25"]').click();
  await page.locator('[data-square="22"]').click();
  await expect(page.locator('.turn-chip')).toContainText('黑方行棋');
  await expect(page.locator('.move-item')).toHaveCount(1);
  await page.locator('.side-controls .control-button').first().click();
  await expect(page.locator('.turn-chip')).toContainText('红方行棋');
  await expect(page.locator('.move-item')).toHaveCount(0);
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
});
test('local game hub lists all offline games', async ({ page }) => {
  await page.goto('/local');
  await expect(page.locator('.local-game-card')).toHaveCount(5);
  await expect(page.locator('.local-game-card')).toContainText(['中国象棋', '五子棋', '斗兽棋', '跳棋', '四子棋']);
});

test('local gomoku places black and white stones', async ({ page }) => {
  await page.goto('/local/gomoku');
  await expect(page.locator('.turn-chip')).toContainText('黑方行棋');
  await page.locator('[data-gomoku-square="112"]').click();
  await expect(page.locator('.turn-chip')).toContainText('白方行棋');
  await page.locator('[data-gomoku-square="113"]').click();
  await expect(page.locator('.turn-chip')).toContainText('黑方行棋');
  await expect(page.locator('.gomoku-stone')).toHaveCount(2);
});

test('local connect four drops into a column', async ({ page }) => {
  await page.goto('/local/connect4');
  await expect(page.locator('.turn-chip')).toContainText('红方行棋');
  await page.locator('[data-connect4-column="3"]').first().click();
  await expect(page.locator('.turn-chip')).toContainText('黄方行棋');
  await page.locator('[data-connect4-column="3"]').first().click();
  await expect(page.locator('.turn-chip')).toContainText('红方行棋');
  await expect(page.locator('.connect4-disc')).toHaveCount(2);
});
test('local jungle game alternates turns', async ({ page }) => {
  await page.goto('/local/jungle');
  await expect(page.locator('.turn-chip')).toContainText('红方行棋');
  await page.locator('[data-jungle-square="50"]').click();
  await page.locator('[data-jungle-square="43"]').click();
  await expect(page.locator('.turn-chip')).toContainText('黑方行棋');
  await expect(page.locator('.local-move-row')).toHaveCount(1);
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
test('opening training follows the line with one automatic side', async ({ page }) => {
  await page.goto('/train/opening/opening-classic-01');
  await expect(page.locator('.turn-chip')).toContainText('请你走这一步');
  await expect(page.locator('.lesson-flow-note')).toContainText('黑方自动应手');

  // A legal but non-line move should not advance the lesson.
  await page.locator('[data-square="29"]').click();
  await page.locator('[data-square="38"]').click();
  await expect(page.locator('.line-progress-label')).toContainText('0 / 20 步');
  await expect(page.locator('.inline-alert')).toContainText('按主线逐步走');

  // The scripted red move advances by one red + one automatic black reply.
  await page.locator('[data-square="25"]').click();
  await page.locator('[data-square="22"]').click();
  await expect(page.locator('.line-progress-label')).toContainText('2 / 20 步');
  await expect(page.locator('.turn-chip')).toContainText('请你走这一步');
});
test('large training library paginates and searches', async ({ page }) => {
  await page.goto('/train/endgame');
  await expect(page.locator('.lesson-meta-strip')).toContainText('703 节');
  await expect(page.locator('.lesson-row')).toHaveCount(30);
  await page.locator('.list-more').click();
  await expect(page.locator('.lesson-row')).toHaveCount(60);
  await page.locator('.list-search').fill('气吞关右');
  await expect(page.locator('.lesson-row')).toHaveCount(1);

  await page.goto('/train/tactics');
  await expect(page.locator('.list-progress-badge')).toContainText('801');
  await expect(page.locator('.tactic-card')).toHaveCount(30);
  await page.locator('.list-more').click();
  await expect(page.locator('.tactic-card')).toHaveCount(60);
});
test('mobile tactics success keeps the next action in view', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/train/tactics/tactic-01');
  await page.getByRole('button', { name: '看答案' }).click();
  const bar = page.locator('.mobile-success-bar');
  await page.waitForTimeout(450);
  await expect(bar).toBeVisible();
  await expect(bar.getByRole('button', { name: /下一题/ })).toBeInViewport();
  const box = await bar.boundingBox();
  expect(box?.y).toBeGreaterThanOrEqual(0);
  expect((box?.y ?? 0) + (box?.height ?? 0)).toBeLessThanOrEqual(844);
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
