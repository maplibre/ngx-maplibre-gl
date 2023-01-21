import { E2eDriver } from '../support/e2e-driver';

describe('Toggle layers', () => {
  context('Given I am on the Toggle Layers showcase', () => {
    let driver = new E2eDriver();

    beforeEach(() => {
      driver
        .visitMapPage('/demo/toggle-layers')
        .waitForMapToIdle()
        .takeImageSnapshot();
    });

    context('When I click on the "countries names" button', () => {
      beforeEach(() => {
        driver.when.clickCountryNamesButton();
      });

      it('Then I should see the map image change', () => {
        driver.waitForMapToIdle().assert.isNotSameAsSnapshot();
      });
    });

    context('When I click on the "countries names" button twice', () => {
      beforeEach(() => {
        driver.when
          .clickCountryNamesButton()
          .waitForMapToIdle()
          .when.clickCountryNamesButton();
      });

      it('Then I should see the original map image', () => {
        driver.waitForMapToIdle().assert.isSameAsSnapshot();
      });
    });
  });
});
