import { test, expect } from '@playwright/test';
import { acceptCookies } from '../helpers/cookies.js';
import { saveScreenshot } from '../helpers/screenshot.js';

// nastavení velikosti okna prohlížeče

test.use({ viewport: { width: 1920, height: 1080 } });


// TESTY 

test('Go and find Test Automation Engineer', async ({ page }, testInfo) => {
  
  await acceptCookies(page);
  await expect(page).toHaveURL('https://www.zasilkovna.cz/');

  const zasSection = page.locator('a.custom-nav-link:has(span:has-text("O Zásilkovně"))');
  await expect(zasSection).toBeVisible();
  await zasSection.hover();

  await page.getByRole('link', { name: 'Kariéra' }).click();
  await expect(page).toHaveURL('https://www.zasilkovna.cz/kariera');

  await page.getByRole('link', { name: 'Všechny pracovní nabídky' }).click();

  const jobBlock = page.locator('div.p-md-16:has(h4.job-title:has-text("Test Automation Engineer"))');
  await expect(jobBlock).toHaveCount(1); 

  const showBtn = jobBlock.locator('a:has-text("Zobrazit pozici")');
  await expect(showBtn).toBeVisible();
  await showBtn.click();

  // timeout jen pro účely testu ..
  await page.waitForTimeout(1000);

  await expect(page.getByRole('heading', { name: 'Test Automation Engineer' })).toBeVisible();

    // timeout jen pro účely testu ..
  await page.waitForTimeout(3000);

  await saveScreenshot(page, testInfo);


});



test('Apple app link click check', async ({ page }, testInfo) => {
  await acceptCookies(page);
  await expect(page).toHaveURL('https://www.zasilkovna.cz/');

  // zachycení nově otevřeného tabu (popup)
  const newTabPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'app-store-badge_cs' }).click();
  const newTab = await newTabPromise;

  // čekám až se nová stránka načte
  await newTab.waitForLoadState();

  // asserce, že na stránce vidím Zásilkovna a URL
  await expect(newTab.getByRole('heading', { name: 'Zásilkovna 4+' })).toBeVisible();
  await expect(newTab).toHaveURL('https://apps.apple.com/cz/app/z%C3%A1silkovna/id1439905771?l=cs');

  // screenshot z nového tabu
  await saveScreenshot(newTab, testInfo);
});



test('Android app link click check', async ({ page }, testInfo) => {
  await acceptCookies(page);
  await expect(page).toHaveURL('https://www.zasilkovna.cz/');

  // zachycení nově otevřeného tabu (popup)
  const newTabPromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'google-play-badge_cs' }).click();
  const newTab = await newTabPromise;

  // čekám až se nová stránka načte
  await newTab.waitForLoadState();

  // asserce, že na stránce vidím Packeta a URL
  await expect(newTab.getByRole('heading', { name: 'Packeta' })).toBeVisible();
  await expect(newTab).toHaveURL('https://play.google.com/store/apps/details?id=cz.zasilkovna.app&hl=cz');

  // screenshot z nového tabu
  await saveScreenshot(newTab, testInfo);
});