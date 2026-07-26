import { beforeEach, describe, test } from './support/fixtures';
import { E2eDriver } from './support/e2e-driver';
import type { MapSnapshot } from './support/maplibre-assertable';

describe('Zoom to linestring', () => {
  const { when, get, then, beforeAndAfter } = new E2eDriver();
  let initialImageSnapshot: MapSnapshot;

  beforeAndAfter();

  beforeEach(async () => {
    await when.visitMapPage('/demo/zoomto-linestring');
    await when.waitForMapToIdle();
    initialImageSnapshot = await when.captureStableSnapshot();
  });

  test('zooms in when the "zoom to bounds" button is clicked', async () => {
    await when.clickZoomToBoundsButton();
    await when.waitForMapToIdle();

    await then(get.imageSnapshot()).shouldNotEqualSnapshot(initialImageSnapshot);
  });
});
