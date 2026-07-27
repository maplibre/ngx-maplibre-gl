import { beforeEach, describe, expect, test } from './support/fixtures';
import { E2eDriver } from './support/e2e-driver';

describe('Custom control', () => {
  const { given, when, get, then, beforeAndAfter } = new E2eDriver();

  beforeAndAfter();

  beforeEach(async () => {
    await when.visitMapPage('/demo/ngx-custom-control');
    await when.waitForMapToIdle();
  });

  test('alerts "Hello" when the custom button is clicked', async () => {
    const alert = given.alertStub();

    await when.clickHelloCustomButton();

    expect(await alert).toBe('Hello');
  });

  test('removes every control when "hide controls" is clicked', async () => {
    await when.waitForFullScreenControls();
    await when.waitForCustomButton();

    await when.clickToggleShowControlsButton();

    await then(get.fullscreenControl()).shouldNotExist();
    await then(get.customControlButton()).shouldNotExist();
  });
});
