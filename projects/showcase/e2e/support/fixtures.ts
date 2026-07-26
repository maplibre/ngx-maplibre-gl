import { test, expect, type Page } from '@playwright/test';

declare global {
  // Declaration merging onto `Window` requires an interface.
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    __consoleMessages: string[];
  }
}

let activePage: Page | undefined;
let uncaughtErrors: string[] = [];

/** The page for the currently running test. Throws if used outside a test. */
export function currentPage(): Page {
  if (!activePage) {
    throw new Error(
      'No active page: a driver method was called outside of a running test.'
    );
  }
  return activePage;
}

/** Errors thrown on the page and never caught, collected since navigation. */
export function currentUncaughtErrors(): string[] {
  return uncaughtErrors;
}

/**
 * Records everything the app logs through `console.error` / `console.warn`.
 *
 * Deliberately a `window.console` spy rather than Playwright's `page.on('console')`:
 * the latter also surfaces browser-internal chatter the app has no control over
 * (GPU driver performance warnings, failed third-party resource loads), which would
 * fail these specs for reasons unrelated to the library.
 */
function spyOnConsole(page: Page) {
  return page.addInitScript(() => {
    window.__consoleMessages = [];
    for (const level of ['error', 'warn'] as const) {
      const original = console[level].bind(console);
      console[level] = (...args: unknown[]) => {
        window.__consoleMessages.push(`[${level}] ${args.join(' ')}`);
        original(...args);
      };
    }
  });
}

/**
 * Auto fixture that binds the current test's page for the (page-lazy) driver and
 * installs the console/uncaught-error spies the driver reads back.
 */
const extendedTest = test.extend<{ showcasePage: void }>({
  showcasePage: [
    async ({ page }, use) => {
      activePage = page;
      uncaughtErrors = [];
      page.on('pageerror', (error) => uncaughtErrors.push(error.message));
      await spyOnConsole(page);

      await use();

      activePage = undefined;
    },
    { auto: true },
  ],
});

const describe = extendedTest.describe;
const beforeEach = extendedTest.beforeEach;
const afterEach = extendedTest.afterEach;

export { expect, describe, extendedTest as test, beforeEach, afterEach };
