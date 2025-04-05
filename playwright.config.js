// playwright.config.js

import { cpus } from "os";
import { config } from "process";
//import { devices } from "@playwright/test";

module.exports = {
    timeout: 30000,
    retries: 0,
    use: {
      headless: false,
      viewport: { width: 1920, height: 1080},
      // screenshot: 'only-on-failure',
      // video: 'retain-on-failure',
      trace: 'on'
    },
    testDir: 'tests', 
    workers: cpus().length / 2,
/*
    projects: [
      {
        name: "Chromium Desktop",
        user: {
          browserName: "chromium",
        }
      },
      {
        name: "Firefox Desktop 800x600",
        use: {
          browserName: "firefox",
          viewport: {width: 800, height: 600},
        }
      },
      {
        name: "Webkit iPhone 12",
        use: {
          browserName: "webkit",
          ...devices["iPhone 12"],
        }
      }
    ]*/
   
  };
  
  export default config;