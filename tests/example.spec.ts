import { test, expect } from '@playwright/test';

test.describe('Form Validation', () => {
  test('shows validation errors when submitting empty form', async ({ page }) => {
    await page.goto('/vanilla-js-web-app-example/');
    
    await page.getByRole('button', { name: 'Submit Form' }).click();
    
    await expect(page.getByText('Please type a title for the image.')).toBeVisible();
    await expect(page.getByText('Please type a valid URL')).toBeVisible();
  });

  test('shows validation error when URL is missing', async ({ page }) => {
    await page.goto('/vanilla-js-web-app-example/');
    
    await page.getByRole('textbox', { name: 'Image Title' }).fill('Valid Title');
    await page.getByRole('button', { name: 'Submit Form' }).click();
    
    await expect(page.getByText('Please type a valid URL')).toBeVisible();
  });

  test('shows validation error for invalid URL format', async ({ page }) => {
    await page.goto('/vanilla-js-web-app-example/');
    
    await page.getByRole('textbox', { name: 'Image Title' }).fill('Valid Title');
    await page.getByRole('textbox', { name: 'Image URL' }).fill('not-a-valid-url');
    await page.getByRole('button', { name: 'Submit Form' }).click();
    
    await expect(page.getByText('Please type a valid URL')).toBeVisible();
  });
});

test.describe('Form Submission', () => {
  test('adds new image card to the list after valid submission', async ({ page }) => {
    await page.goto('/vanilla-js-web-app-example/');
    
    const initialCount = await page.locator('article').count();
    
    await page.getByRole('textbox', { name: 'Image Title' }).fill('Test Image');
    await page.getByRole('textbox', { name: 'Image URL' }).fill('https://example.com/test.png');
    await page.getByRole('button', { name: 'Submit Form' }).click();
    
    await expect(page.getByRole('heading', { name: 'Test Image', level: 4 })).toBeVisible();
    await expect(page.locator('article')).toHaveCount(initialCount + 1);
  });

  test('clears form after successful submission', async ({ page }) => {
    await page.goto('/vanilla-js-web-app-example/');
    
    await page.getByRole('textbox', { name: 'Image Title' }).fill('Test Image');
    await page.getByRole('textbox', { name: 'Image URL' }).fill('https://example.com/test.png');
    await page.getByRole('button', { name: 'Submit Form' }).click();
    
    await expect(page.getByRole('textbox', { name: 'Image Title' })).toBeEmpty();
    await expect(page.getByRole('textbox', { name: 'Image URL' })).toBeEmpty();
  });
});
