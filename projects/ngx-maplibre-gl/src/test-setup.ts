import { setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';

// MapLibre GL JS v6 loads its worker from a separate file. Vite serves the file
// (and the `maplibre-gl-shared.mjs` sibling it imports) from node_modules, so the
// `?url` import resolves to something the browser can actually fetch.
setWorkerUrl(new URL(workerUrl, document.baseURI).href);
