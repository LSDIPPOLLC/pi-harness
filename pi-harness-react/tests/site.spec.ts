import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5175';

test.describe('Pi Harness React App', () => {
  test('Home page loads without errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Check title
    await expect(page).toHaveTitle(/Pi Harness/);

    // Check hero content - h1 should be visible
    await expect(page.locator('h1').first()).toBeVisible();

    // Check navigation exists
    await expect(page.locator('nav')).toBeVisible();

    // Check 7 pillars section exists (look for the grid container)
    await expect(page.locator('section').filter({ hasText: /Skill Composition/ }).first()).toBeVisible();

    // No console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('Navigation works across all pages', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    // Home
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1').first()).toBeVisible();

    // Pillars
    await page.click('text=Pillars');
    await page.waitForURL('**/pillars');
    await expect(page).toHaveTitle(/Pi Harness/);

    // Skills
    await page.click('text=Skills');
    await page.waitForURL('**/skills');
    await expect(page).toHaveTitle(/Pi Harness/);

    // API
    await page.click('text=API');
    await page.waitForURL('**/api');
    await expect(page).toHaveTitle(/Pi Harness/);

    // No console errors
    expect(consoleErrors).toHaveLength(0);
  });

  test('Pillars page displays content', async ({ page }) => {
    await page.goto(`${BASE_URL}/pillars`);
    await page.waitForLoadState('networkidle');

    // Check for pillar headings using role
    await expect(page.getByRole('heading', { name: /Skill Composition/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Context Engineering/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Orchestration/i })).toBeVisible();
  });

  test('Skills page shows content', async ({ page }) => {
    await page.goto(`${BASE_URL}/skills`);
    await page.waitForLoadState('networkidle');

    // Check for main skill headings
    await expect(page.getByRole('heading', { name: /pi-scaffold/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /pi-init/i }).first()).toBeVisible();
  });

  test('API page has content', async ({ page }) => {
    await page.goto(`${BASE_URL}/api`);
    await page.waitForLoadState('networkidle');

    // Check for API section
    await expect(page.getByRole('heading', { name: /API Reference/i }).or(page.getByRole('heading', { name: /Settings/i }))).toBeVisible();
  });

  test('Quick start section is present on home', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Check for quickstart section by heading
    await expect(page.getByRole('heading', { name: /Quick Start/i })).toBeVisible();
  });

  test('Footer links exist', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('footer')).toBeVisible();
    // Check GitHub link exists in footer
    await expect(page.locator('footer a').filter({ hasText: /GitHub/i }).first()).toBeVisible();
  });

  test('All pages have consistent nav', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check logo is visible
    await expect(page.locator('nav').getByText('Harness')).toBeVisible();

    // Navigate to each page and check logo persists
    for (const route of ['/pillars', '/skills', '/api']) {
      await page.goto(`${BASE_URL}${route}`);
      await expect(page.locator('nav').getByText('Harness')).toBeVisible();
    }
  });
});
