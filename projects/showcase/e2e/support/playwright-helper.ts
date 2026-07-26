import { expect, type Locator, type Page, type Request } from '@playwright/test';
import { currentPage, currentUncaughtErrors } from './fixtures';

const DATA_ATTRIBUTE = 'data-cy';

/**
 * A lazily-evaluated value (e.g. a canvas snapshot). Assertions on a Query
 * re-read the value until they pass, which is what makes them robust against
 * the map still rendering.
 */
export class Query<T> {
  readonly __query = true as const;

  constructor(private readonly getter: () => Promise<T>) {}

  get(): Promise<T> {
    return this.getter();
  }
}

function isQuery(target: unknown): target is Query<unknown> {
  return (
    typeof target === 'object' &&
    target !== null &&
    (target as Query<unknown>).__query === true
  );
}

function isLocator(target: unknown): target is Locator {
  return (
    typeof target === 'object' &&
    target !== null &&
    typeof (target as Locator).count === 'function' &&
    typeof (target as Locator).boundingBox === 'function'
  );
}

/**
 * Fluent, auto-retrying assertions over a Playwright Locator or a lazily
 * evaluated Query. This is the generic base that map-specific assertables extend.
 */
export class Assertable<T> {
  shouldExist = () => expect(this.asLocator().first()).toBeAttached();
  shouldNotExist = () => expect(this.asLocator()).toHaveCount(0);
  shouldBeVisible = () => expect(this.asLocator().first()).toBeVisible();
  shouldHaveText = (text: string) =>
    expect(this.asLocator().first()).toHaveText(text);
  shouldBeEmpty = () => this.pollValue((actual) => expect(actual).toEqual([]));

  constructor(protected readonly target: T) {}

  protected asLocator(): Locator {
    if (!isLocator(this.target)) {
      throw new Error('Expected a Locator target for this assertion');
    }
    return this.target;
  }

  /** Re-reads a Query until `assertion` passes; asserts once for plain values. */
  protected pollValue(assertion: (value: any) => void): Promise<void> {
    const target = this.target;
    if (!isQuery(target)) {
      return Promise.resolve(assertion(target));
    }
    let lastError: unknown;
    return expect
      .poll(async () => {
        try {
          assertion(await target.get());
          return true;
        } catch (error) {
          lastError = error;
          return false;
        }
      }, { message: () => String(lastError) })
      .toBe(true);
  }
}

/**
 * This is where all Playwright-specific test helpers live.
 * It is used by the E2eDriver to implement the showcase-specific test helpers.
 */
export class PlaywrightHelper {
  private readonly recordedRequests = new Map<string, Request[]>();

  public given = {
    /** Answers the next native dialog and resolves with its message. */
    onDialog: (accept = false): Promise<string> =>
      new Promise<string>((resolve) =>
        this.page.once('dialog', async (dialog) => {
          const message = dialog.message();
          await (accept ? dialog.accept() : dialog.dismiss());
          resolve(message);
        })
      ),

    intercept: (pattern: RegExp, alias: string) => {
      this.recordedRequests.set(alias, []);
      return this.page.route(pattern, (route) => {
        this.recordedRequests.get(alias)!.push(route.request());
        return route.continue();
      });
    },
  };

  public when = {
    visit: (url: string) => this.page.goto(url),

    click: (testId: string) => this.testId(testId).click(),

    clickBySelector: (selector: string) =>
      this.page.locator(selector).first().click(),

    waitForResponse: (alias: string) =>
      expect
        .poll(() => this.recordedRequests.get(alias)?.length ?? 0)
        .toBeGreaterThan(0),
  };

  public get = {
    element: (selector: string) => this.page.locator(selector),

    elementByTestId: (testId: string) => this.testId(testId),

    elementByAttribute: (attribute: string, value: string) =>
      this.page.locator(`[${attribute}="${value}"]`),

    /** Everything the app logged via `console.error` / `console.warn`. */
    consoleMessages: () =>
      new Query<string[]>(() =>
        this.page.evaluate(() => window.__consoleMessages ?? [])
      ),

    /** Errors thrown on the page and never caught. */
    uncaughtErrors: () =>
      new Query<string[]>(async () => currentUncaughtErrors()),
  };

  private get page(): Page {
    return currentPage();
  }

  /** Wraps a lazily-evaluated value so assertions on it auto-retry. */
  public query<T>(getter: () => Promise<T>): Query<T> {
    return new Query<T>(getter);
  }

  private testId(testId: string): Locator {
    return this.page.locator(`[${DATA_ATTRIBUTE}="${testId}"]`);
  }

  /** Entry point for fluent assertions over a Locator or a Query. */
  public then = <T>(target: T): Assertable<T> => new Assertable(target);
}
