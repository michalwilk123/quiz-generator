import { expect, test } from '@playwright/test';

test('prepared exam starts immediately, stays compact on mobile, and restores answers', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Choose your exam' })).toBeVisible();
  await page.getByRole('link', { name: 'Start ISP', exact: true }).click();
  await expect(page.locator('textarea')).toHaveCount(2);
  await page.locator('textarea').first().fill('My answer survives a refresh.');
  await page.reload();
  await expect(page.locator('textarea').first()).toHaveValue('My answer survives a refresh.');
  await expect(page.getByText(/\d{2}:\d{2}/)).toHaveCount(0);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const header = await page.locator('header').boundingBox();
  expect(header).not.toBeNull();
  expect(header!.y).toBe(0);
  expect(header!.height).toBeLessThan(120);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('configuration exports a single encoded link and keeps the existing quizzes available', async ({ page }) => {
  await page.goto('./#/configure');
  await expect(page.getByLabel('Sieci telekomunikacyjne', { exact: true })).toBeVisible();
  await page.getByLabel('Number of questions', { exact: true }).fill('3');
  await page.getByRole('button', { name: 'Copy exam link' }).click();
  const link = await page.locator('input[readonly]').inputValue();
  expect(link).toContain('#/exam?config=');
  expect(link).not.toContain('&');
  await page.goto(link);
  await expect(page.locator('textarea')).toHaveCount(2);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('expiry locks choices without revealing results, including after refresh', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.clock.install();
  await page.goto('./#/configure');
  await page.getByLabel('Interaktywne Systemy Programowalne', { exact: true }).uncheck();
  await page.getByLabel('Sieci telekomunikacyjne', { exact: true }).check();
  await page.getByLabel('Number of questions', { exact: true }).fill('4');
  await page.getByLabel('Time limit', { exact: true }).check();
  await page.getByLabel('Minutes (maximum 30)', { exact: true }).fill('1');
  await page.getByText('More options', { exact: true }).click();
  await page.getByLabel('Questions per page', { exact: true }).selectOption('all');
  await page.getByRole('button', { name: 'Start exam', exact: true }).click();
  await expect(page.getByRole('timer')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('input[type=radio]').first().check();
  const selected = page.locator('input[type=radio]:checked');
  await expect(selected).toHaveCount(1);
  await expect(page.locator('.feedback')).toHaveCount(0);
  await page.clock.fastForward(61_000);
  await expect(page.getByRole('timer')).toHaveText('0:00');
  await expect(page.locator('textarea')).toBeDisabled();
  await expect(page.locator('input[type=radio]').first()).toBeDisabled();
  await expect(page.locator('.feedback')).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('button', { name: 'View results', exact: true }).first()).toBeVisible();
  await expect(page.locator('input[type=radio]:checked')).toHaveCount(1);
  await expect(page.locator('.feedback')).toHaveCount(0);
  await page.getByRole('button', { name: 'View results', exact: true }).first().click();
  await expect(page.getByRole('region', { name: 'Exam results' })).toBeVisible();
  await expect(page.locator('.feedback')).toHaveCount(4);
});

test('self-assessment works after answers freeze and retry creates a blank attempt', async ({ page }) => {
  await page.goto('./#/configure');
  await page.getByLabel('Number of questions', { exact: true }).fill('2');
  await page.getByText('More options', { exact: true }).click();
  await page.getByLabel('Written-answer grading', { exact: true }).selectOption('manual');
  await page.getByRole('button', { name: 'Start exam', exact: true }).click();
  await page.locator('textarea').first().fill('My answer');
  await page.getByRole('button', { name: 'Finish exam', exact: true }).first().click();
  await expect(page.locator('textarea').first()).toBeDisabled();
  const grades = page.getByLabel('Assess your answer', { exact: true });
  await expect(grades).toHaveCount(2);
  await grades.nth(0).selectOption('1');
  await grades.nth(1).selectOption('1');
  await expect(page.getByRole('region', { name: 'Exam results' })).toContainText('100%');
  await expect(page.locator('.confetti')).toBeVisible();
  await page.reload();
  await expect(page.getByRole('region', { name: 'Exam results' })).toContainText('100%');
  await page.getByRole('button', { name: 'Try again', exact: true }).click();
  await expect(page.locator('textarea').first()).toBeEnabled();
  await expect(page.locator('textarea').first()).toHaveValue('');
  await expect(page.getByRole('region', { name: 'Exam results' })).toHaveCount(0);
});
