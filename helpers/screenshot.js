import fs from 'fs';
import path from 'path';

export async function saveScreenshot(page, testInfo) {
  const now = new Date();
  const timestamp = now.toLocaleString('sv-SE', {
    timeZone: 'Europe/Prague',
    hour12: false
  }).replace(/[: ]/g, '-').replace(',', '');

  const testName = testInfo.title.replace(/\s+/g, '-');
  const screenshotsDir = 'screenshots';

  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const screenshotPath = path.join(screenshotsDir, `${timestamp}-Packeta_${testName}.png`);
  console.log(`Screenshot uložen na: ${screenshotPath}`);

  await page.screenshot({ path: screenshotPath, fullPage: true });
}
