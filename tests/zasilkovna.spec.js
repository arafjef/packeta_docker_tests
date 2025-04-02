import { test, expect } from '@playwright/test';


test.use({ viewport: { width: 1920, height: 1080 } });


// Samotný TEST 

test('Go and find Test Automation Engineer', async ({ page }) => {
  await page.goto('https://www.zasilkovna.cz/');
  await page.getByRole('button', { name: 'Přijmout všechny cookies' }).click();

  const zasSection = page.locator('a.custom-nav-link:has(span:has-text("O Zásilkovně"))');
  await expect(zasSection).toBeVisible();
  await zasSection.hover();

  await page.getByRole('link', { name: 'Kariéra' }).click();
  await page.getByRole('link', { name: 'Všechny pracovní nabídky' }).click();

  const jobBlock = page.locator('div.p-md-16:has(h4.job-title:has-text("Test Automation Engineer"))');

  // můžeme si být jistí, že je to jen jeden
  await expect(jobBlock).toHaveCount(1); 

  // Hledáme opět v blocku jobBlock text Zobrazit pozici
  const showBtn = jobBlock.locator('a:has-text("Zobrazit pozici")');
  await expect(showBtn).toBeVisible();
  await showBtn.click();

  await page.waitForTimeout(1000);

  await expect(page.getByRole('heading', { name: 'Test Automation Engineer' })).toBeVisible();
  await page.waitForTimeout(3000);


});
