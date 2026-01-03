import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should display the landing page', async ({ page }) => {
    await page.goto('/');

    // Verify page loaded - check for Vite + React default content
    await expect(page.locator('h1')).toContainText('Vite + React');

    // Verify React app mounted
    await expect(page.locator('#root')).toBeVisible();
  });
});
