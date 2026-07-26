import { beforeEach, describe, test } from './support/fixtures';
import { E2eDriver } from './support/e2e-driver';
import type { MapSnapshot } from './support/maplibre-assertable';

describe('Terrain control', () => {
  const { when, get, then, beforeAndAfter } = new E2eDriver();
  let initialImageSnapshot: MapSnapshot;

  beforeAndAfter();

  beforeEach(async () => {
    await when.visitMapPage('/demo/terrain-control');
    await when.waitForMapToIdle();
    await when.waitForDisabledTerrainButton();
    initialImageSnapshot = await get.imageSnapshot().get();
  });

  test('enables terrain on the first click', async () => {
    await when.clickEnableTerrainControlButton();
    await when.waitForMapToIdle();
    await when.waitForEnabledTerrainButton();

    await then(get.imageSnapshot()).shouldNotEqualSnapshot(initialImageSnapshot);
  });

  test('disables terrain again on the second click', async () => {
    await when.clickEnableTerrainControlButton();
    await when.waitForMapToIdle();
    await when.clickDisableTerrainControlButton();
    await when.waitForMapToIdle();
    await when.waitForDisabledTerrainButton();

    await then(get.imageSnapshot()).shouldEqualSnapshot(initialImageSnapshot);
  });
});
