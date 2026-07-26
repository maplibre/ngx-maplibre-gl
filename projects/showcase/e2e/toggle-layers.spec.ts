import { beforeEach, describe, test } from './support/fixtures';
import { E2eDriver } from './support/e2e-driver';
import type { MapSnapshot } from './support/maplibre-assertable';

describe('Toggle layers', () => {
  const { when, get, then, beforeAndAfter } = new E2eDriver();
  let initialImageSnapshot: MapSnapshot;

  beforeAndAfter();

  beforeEach(async () => {
    await when.visitMapPage('/demo/toggle-layers');
    await when.waitForMapToIdle();
    initialImageSnapshot = await get.imageSnapshot().get();
  });

  test('changes the map when the "countries names" button is clicked', async () => {
    await when.clickCountryNamesButton();
    await when.waitForMapToIdle();

    await then(get.imageSnapshot()).shouldNotEqualSnapshot(initialImageSnapshot);
  });

  test('restores the map when the "countries names" button is clicked twice', async () => {
    await when.clickCountryNamesButton();
    await when.waitForMapToIdle();
    await when.clickCountryNamesButton();
    await when.waitForMapToIdle();

    await then(get.imageSnapshot()).shouldEqualSnapshot(initialImageSnapshot);
  });
});
