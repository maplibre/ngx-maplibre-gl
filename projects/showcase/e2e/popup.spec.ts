import { beforeEach, describe, test } from './support/fixtures';
import { E2eDriver } from './support/e2e-driver';

describe('Popup', () => {
  const { when, get, then, beforeAndAfter } = new E2eDriver();

  beforeAndAfter();

  beforeEach(async () => {
    await when.visitMapPage('/demo/popup');
    await when.waitForMapToIdle();
  });

  test('shows a popup containing "Hello world !" when the map loads', async () => {
    await then(get.mglPopup()).shouldExist();
    await then(get.mapLibrePopUpContent()).shouldHaveText('Hello world !');
  });

  test('hides the popup when its close button is clicked', async () => {
    await when.clickPopupCloseButton();
    await then(get.mglPopup()).shouldNotExist();
  });
});
