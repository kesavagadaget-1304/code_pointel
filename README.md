# Test Run Guide

## Purpose
This document describes prerequisites, installation steps, and commands to run the test suite for this repository.

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn
- Playwright (installed via npm below)
- Git (optional)
- Windows-specific: PowerShell or Windows Terminal

## Installation
1. Clone the repo:

Clone the repo using GitHub desktop

2. Install dependencies:

```bash
npm install
npm update
```

3. Install Playwright browsers (if not part of CI image):

```bash
npx playwright install
```

4. (Optional) Build or prepare any local fixtures/configs as required by your environment.

## Environment variables
- Create a `.env` or set env vars used by tests (e.g., base URLs, credentials). Example:

```powershell
$env:BASE_URL = "https://sit.example.com"
$env:USERNAME = "user"
$env:PASSWORD = "pass"
```

## Run commands
Run entire test suite (all tests):

```bash
npm run test:ui
or
npx playwright test
```

Run a specific spec file:

```bash
npx playwright test tests/ui/MirrorAgent.spec.ts
```

Run tests with a tag/grep (example uses tag `@DCCM_SIT_TC_106`):

```bash
npx playwright test tests/ui/MirrorAgent.spec.ts --grep "@DCCM_SIT_TC_106"
```

Run tests in a folder (a logical "suite"):

```bash
npx playwright test tests/ui
```

Run tests in headed (browser visible) mode:

```bash
npx playwright test --headed
```

Run tests with a specific project from `playwright.config.ts`:

```bash
npx playwright test --project=chromium
```

Parallelism control (workers):

```bash
npx playwright test --workers=1
```

Generate HTML report after tests:

```bash
npx playwright show-report
# or open the report folder: playwright-report
```

Run a single test by title:

```bash
npx playwright test -g "should do something"
```

Debug a failing test (re-run with `--debug` or `PWDEBUG=1`):

```bash
PWDEBUG=1 npx playwright test tests/ui/MirrorAgent.spec.ts
# On Windows PowerShell:
$env:PWDEBUG=1; npx playwright test tests/ui/MirrorAgent.spec.ts
```

## CI tips
- Install dependencies and Playwright browsers as part of CI pipeline.
- Cache `node_modules` between runs.
- Run `npx playwright show-report` as a post-step to archive HTML reports.

## Example sequences
Full local run (fresh clone):

```bash
git clone <repo-url> .
cd Outrider-Task
npm install
npx playwright install --with-deps
npx playwright test
```

Run a suite by tag (quick verification):

```bash
npx playwright test --grep "@smoke"
```

Run only UI tests folder and save report:

```bash
npx playwright test tests/ui --reporter=html
npx playwright show-report
```

## Troubleshooting
- If tests fail due to missing browsers: run `npx playwright install`.
- If timeouts occur, increase `timeout` in `playwright.config.ts` or per-test.
- For flaky tests: run with `--retries=2` to verify consistency.
- Use `--workers=1` to rule out concurrency issues.

## Where to find results
- Playwright report folder: `playwright-report` in repo root.
- Test artifacts and traces may be under `test-results` or `playwright-reports`.

## Next steps
- Add project-specific environment variable examples.
- Add common failure modes and resolutions.
- Link to `playwright.config.ts` for timeouts and reporters.

