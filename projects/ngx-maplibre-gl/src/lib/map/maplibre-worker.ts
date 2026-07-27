import { InjectionToken, type Provider } from '@angular/core';

/**
 * Injection token holding the URL of the MapLibre GL JS web worker script
 * (`maplibre-gl-worker.mjs`). It is applied with `setWorkerUrl()` right before
 * a map is created.
 *
 * Prefer {@link provideMaplibreWorker} over providing this token directly.
 *
 * @category Map Component
 */
export const MAPLIBRE_WORKER_URL = new InjectionToken<string>(
  'ngx-maplibre-gl worker URL',
);

/**
 * Provides the URL of the MapLibre GL JS web worker script.
 *
 * MapLibre GL JS v6 loads its worker from a separate file at runtime and
 * bundlers cannot rewrite that URL, so it must be set with `setWorkerUrl()`
 * before the first map is created — see
 * [`setWorkerUrl()` is bundler-only](https://maplibre.org/maplibre-gl-js/docs/guides/v5-to-v6-migration-guide/#setworkerurl-is-bundler-only).
 * Calling `setWorkerUrl()` in `main.ts` statically imports `maplibre-gl` into
 * the initial bundle; using this provider instead defers the call to the moment
 * the first `mgl-map` is set up, keeping `maplibre-gl` out of the initial
 * bundle.
 *
 * The worker file (and the `maplibre-gl-shared.mjs` sibling it imports) must be
 * served at the provided location, e.g. via `assets` in `angular.json`.
 * Relative URLs are resolved against `document.baseURI`, so deployments under a
 * sub-path (`--base-href`) keep working.
 *
 * Can be used in the application config or in a component's `providers`:
 *
 * @example
 * ```typescript
 * // app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideMaplibreWorker('maplibre-gl-worker.mjs')],
 * };
 * ```
 *
 * @category Map Component
 */
export function provideMaplibreWorker(workerUrl: string): Provider {
  return { provide: MAPLIBRE_WORKER_URL, useValue: workerUrl };
}
