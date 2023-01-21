import { E2eDriver } from '../support/e2e-driver';

describe('Set style', () => {
  context('Given I am on the Set Style showcase', () => {
    let driver = new E2eDriver();

    beforeEach(() => {
      driver
        .visitMapPage('/demo/set-style')
        .waitForMapToIdle(10000)
        .takeImageSnapshot();
    });

    context('When I click on the "from code" radio button', () => {
      beforeEach(() => {
        driver.when.clickFromCodeRadioButton();
      });

      it('Then I should see the map image change', () => {
        driver.waitForMapToIdle().assert.isNotSameAsSnapshot();
      });
    });

    context(
      'When I click the "from code" radio button and then click the "streets" radio button',
      () => {
        beforeEach(() => {
          driver.when
            .clickFromCodeRadioButton()
            .waitForMapToIdle()
            .when.clickStreetsRadioButton();
        });

        it('Then I should see the original map image', () => {
          // .waitForMapToIdle(timeoutMs) was not working consistently here, maybe due to
          // maptiler requests timing out. Reverting back to .wait(ms) while I look into it.
          driver.when.wait(5000).assert.isSameAsSnapshot();
        });
      }
    );
  });
});
