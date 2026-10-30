import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";

const chrome =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4174",
    viewport: { width: 1440, height: 1000 },
    launchOptions: {
      ...(existsSync(chrome) ? { executablePath: chrome } : {}),
      args: [
        "--enable-webgl",
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
      ],
    },
  },
  webServer: {
    command: "npm run preview -- --port 4174 --strictPort",
    url: "http://127.0.0.1:4174",
    reuseExistingServer: false,
  },
});
