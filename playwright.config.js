// playwright.config.js
module.exports = {
    timeout: 30000,
    retries: 0,
    use: {
      headless: true,
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
      trace: 'off'
    },
    testDir: 'tests'
  };
  