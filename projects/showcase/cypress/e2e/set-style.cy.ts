import { E2eDriver } from '../support/e2e-driver';

describe('Set style', () => {
  context('Given I am on the Set Style showcase', () => {
    let driver = new E2eDriver();

    beforeEach(() => {
      driver
        .visitMapPage('/demo/set-style')
        .waitForMapToIdle()
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
            .when.clickStreetsRadioButton()

            // The switch back to the streets style fetches a sprite sheet - we can use this
            // as a reliable await target just before the map is fully rendered and idle (and
            // only then should we compare to the snapshot)
            .when.waitForFetch('**/streets/sprite.png');
        });

        it('Then I should see the original map image', () => {
          driver.when.waitForMapToIdle().assert.isSameAsSnapshot();
        });
      }
    );
  });
});
