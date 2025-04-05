import fs from 'fs';
import path from 'path';

export async function saveScreenshot(page, testInfo) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const testName = testInfo.title.replace(/\s+/g, '-');

  // Absolutní cesta – úprava přesně pro tvůj počítač
  const screenshotsDir = 'screenshots';

  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const screenshotPath = path.join(screenshotsDir, `${timestamp}-Packeta_${testName}.png`);
  console.log(`Screenshot uložen na: ${screenshotPath}`);

  await page.screenshot({ path: screenshotPath, fullPage: true });
}