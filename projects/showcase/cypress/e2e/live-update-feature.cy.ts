import { E2eDriver } from '../support/e2e-driver';

describe('Live Update', () => {
  context('Given I am on the Live Update Feature showcase', () => {
    let driver = new E2eDriver();

    beforeEach(() => {
      driver
        .visitMapPage('/demo/live-update-feature')

        // Note: do not wait for map to idle because this demo is constantly panning

        .takeImageSnapshot();
    });

    context('When I wait two seconds', () => {
      beforeEach(() => {
        driver.when.wait(2000);
      });

      it('Then I should see the map image change and the map center coordinates are different', () => {
        driver.assert.isNotSameAsSnapshot().assert.mapHasPanned();
      });
    });
  });
});
