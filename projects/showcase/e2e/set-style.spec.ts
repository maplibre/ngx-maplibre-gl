import { beforeEach, describe, test } from './support/fixtures';
import { E2eDriver } from './support/e2e-driver';
import type { MapSnapshot } from './support/maplibre-assertable';

describe('Set style', () => {
  const { given, when, get, then, beforeAndAfter } = new E2eDriver();
  let initialImageSnapshot: MapSnapshot;

  beforeAndAfter();

  beforeEach(async () => {
    await when.visitMapPage('/demo/set-style');
    await when.waitForMapToIdle();
    initialImageSnapshot = await get.imageSnapshot().get();
  });

  test('changes the map when the "from code" style is selected', async () => {
    await when.clickFromCodeRadioButton();
    await when.waitForMapToIdle();

    await then(get.imageSnapshot()).shouldNotEqualSnapshot(initialImageSnapshot);
  });

  test('restores the map when switching back to the "streets" style', async () => {
    await given.interceptStreetsSprite();
    await when.clickFromCodeRadioButton();
    await when.waitForMapToIdle();
    await when.clickStreetsRadioButton();

    // Switching back to the streets style refetches its sprite sheet; that response
    // is a reliable marker that the style is in place before we compare snapshots.
    await when.waitForStreetsSpriteResponse();
    await when.waitForMapToIdle();

    await then(get.imageSnapshot()).shouldEqualSnapshot(initialImageSnapshot);
  });
});
