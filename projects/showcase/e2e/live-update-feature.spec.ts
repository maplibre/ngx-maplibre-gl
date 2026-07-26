import { describe, test } from './support/fixtures';
import { E2eDriver } from './support/e2e-driver';

describe('Live update feature', () => {
  const { when, get, then, beforeAndAfter } = new E2eDriver();

  beforeAndAfter();

  test('keeps redrawing the map as the feature grows', async () => {
    await when.visitMapPage('/demo/live-update-feature');
    // This demo pans continuously, so it never goes idle and never settles -
    // wait for load and take the frame as-is. That the map keeps changing is
    // exactly what this spec asserts.
    await when.waitForMapLoaded();
    const initialImageSnapshot = await get.imageSnapshot().get();

    await then(get.imageSnapshot()).shouldNotEqualSnapshot(initialImageSnapshot);
  });
});
