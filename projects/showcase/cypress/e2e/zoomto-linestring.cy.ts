import { E2eDriver } from '../support/e2e-driver';

describe('Zoomto Linestring', () => {
  context('Given I am on the Zoomto Linestring showcase', () => {
    let driver = new E2eDriver();

    beforeEach(() => {
      driver
        .visitMapPage('/demo/zoomto-linestring')
        .waitForMapToIdle()
        .takeImageSnapshot();
    });

    context('When I click the "Zoom to bounds" button', () => {
      beforeEach(() => {
        driver.when.clickZoomToBoundsButton();
      });

      it('Then I should see the map zoom in', () => {
        driver
          .waitForMapToIdle()
          .assert.isNotSameAsSnapshot();
      });
    });
  });
});
