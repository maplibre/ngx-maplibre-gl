import { beforeEach, describe, test } from './support/fixtures';
import { E2eDriver } from './support/e2e-driver';
import type { MapSnapshot } from './support/maplibre-assertable';

describe('Language switch', () => {
  const { when, get, then, beforeAndAfter } = new E2eDriver();
  let initialImageSnapshot: MapSnapshot;

  beforeAndAfter();

  beforeEach(async () => {
    await when.visitMapPage('/demo/language-switch');
    await when.waitForMapToIdle();

    // French is the baseline every case compares against.
    await when.clickLanguageButton('fr');
    await when.waitForMapToIdle();
    initialImageSnapshot = await get.imageSnapshot().get();
  });

  test('changes the map when switching to Russian', async () => {
    await when.clickLanguageButton('ru');
    await when.waitForMapToIdle();

    await then(get.imageSnapshot()).shouldNotEqualSnapshot(initialImageSnapshot);
  });

  test('restores the map when switching to Russian and back to French', async () => {
    await when.clickLanguageButton('ru');
    await when.waitForMapToIdle();
    await when.clickLanguageButton('fr');
    await when.waitForMapToIdle();

    await then(get.imageSnapshot()).shouldEqualSnapshot(initialImageSnapshot);
  });
});
