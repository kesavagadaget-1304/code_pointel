import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
const now = new Date();
const pad = (n: number) => n.toString().padStart(2, '0');
const timestamp = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
// Professional timestamp for report file names
//const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
export default defineConfig({
  timeout: 1000 * 60 * 3, // 3 minutes
  testDir: 'tests',
  // :performing_arts: PROFESSIONAL HTML REPORTER WITH TIMESTAMPED FILE NAMES
  reporter: [
    ['html', {
      open: 'never',                                           // Professional: don't auto-open
      outputFolder: `playwright-reports/report-${timestamp}`,  // Timestamped directory
    }]
  ],
  use: {
    baseURL: process.env.BASE_URL_PRERPOD,
    screenshot: 'only-on-failure',      // Screenshots on failure
    trace: 'on-first-retry',            // Traces for debugging
    headless: false,                    // Visible during development
    video: 'retain-on-failure',         // Videos on failure
    viewport: null,                     // let window size drive viewport
    launchOptions: { args: ['--start-fullscreen'] } // works on macOS
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'API',
      testMatch: /.*\.api\.spec\.ts/
    }
  ],
  // Professional configuration
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  maxFailures: process.env.CI ? 2 : undefined,
});
/*
:dart: PROFESSIONAL TIMESTAMPED HTML REPORTS:
:file_folder: playwright-reports/
├── report-2025-01-27T10-30-45-123Z/     # :white_check_mark: Timestamped HTML report
│   ├── index.html                        # Beautiful HTML report
│   ├── data/                            # Test data and attachments
│   └── assets/                          # CSS, JS, fonts
├── report-2025-01-27T11-15-22-456Z/     # Next test run (never overwritten)
├── report-2025-01-27T12-30-15-789Z/     # And so on...
└── ...
:rocket: FEATURES:
:white_check_mark: Professional timestamped HTML reports
:white_check_mark: Never overwritten (unique timestamp per run)
:white_check_mark: Beautiful, responsive UI
:white_check_mark: Screenshots, videos, and traces included
:white_check_mark: Clean console output during tests
:white_check_mark: CI/CD ready configuration
:dart: ACCESS YOUR REPORTS:
npm run report                            # Opens latest report
open playwright-reports/report-[timestamp]/index.html
*/