import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 50000,
  use: {
    browserName: "chromium",
    headless: false,
    launchOptions: {
      slowMo: 2000
    }
  }
});
