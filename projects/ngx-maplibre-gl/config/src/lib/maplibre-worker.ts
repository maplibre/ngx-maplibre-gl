import { InjectionToken, type Provider } from '@angular/core';

/**
 * Injection token for the MapLibre GL JS worker URL, applied via `setWorkerUrl()`
 * before a map is created. Prefer {@link provideMaplibreWorker} over using this
 * token directly.
 *
 * @category Map Component
 */
export const MAPLIBRE_WORKER_URL = new InjectionToken<string>(
  'ngx-maplibre-gl worker URL',
);

/**
 * Provides the URL of the MapLibre GL JS web worker script
 * (`maplibre-gl-worker.mjs`). This defers the `setWorkerUrl()` call until the
 * first `mgl-map` is set up, keeping `maplibre-gl` out of the initial bundle.
 *
 * Relative URLs are resolved against `document.baseURI` so sub-path deployments
 * (`--base-href`) work. The worker file and `maplibre-gl-shared.mjs` must be
 * served at that location (typically via `angular.json` `assets`).
 *
 * @example
 * ```typescript
 * // app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideMaplibreWorker('maplibre-gl-worker.mjs')],
 * };
 * ```
 *
 * @see [setWorkerUrl is bundler-only](https://maplibre.org/maplibre-gl-js/docs/guides/v5-to-v6-migration-guide/#setworkerurl-is-bundler-only)
 *
 * @category Map Component
 */
export function provideMaplibreWorker(workerUrl: string): Provider {
  return { provide: MAPLIBRE_WORKER_URL, useValue: workerUrl };
}
