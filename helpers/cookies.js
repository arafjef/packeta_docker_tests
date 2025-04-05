// helpers.js
export async function acceptCookies(page) {
    await page.goto('https://www.zasilkovna.cz/');
    await page.getByRole('button', { name: 'Přijmout všechny cookies' }).click();
  }
  