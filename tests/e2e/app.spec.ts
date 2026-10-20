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
