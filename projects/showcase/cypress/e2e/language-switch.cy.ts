import { E2eDriver } from '../support/e2e-driver';

describe('Language switch', () => {
  context(
    'Given I am on the Language Switch showcase and French is selected',
    () => {
      let driver = new E2eDriver();

      beforeEach(() => {
        driver
          .visitMapPage('/demo/language-switch')
          .waitForMapToIdle()

          // Start in French for the baseline
          .when.clickLanguageButton('French')
          .waitForMapToIdle()
          .takeImageSnapshot();
      });

      context('When I click on the Russian button', () => {
        beforeEach(() => {
          // Switch to Russian
          driver.when.clickLanguageButton('Russian').waitForMapToIdle();
        });

        it('Then I should see the map image change', () => {
          driver.assert.isNotSameAsSnapshot();
        });
      });

      context(
        'When I click the Russian button and then click the French button',
        () => {
          beforeEach(() => {
            // Switch to Russian
            driver.when
              .clickLanguageButton('Russian')
              .waitForMapToIdle()

              // Switch back to French
              .when.clickLanguageButton('French')
              .waitForMapToIdle();
          });

          it('Then I should see the original image', () => {
            driver.assert.isSameAsSnapshot();
          });
        }
      );
    }
  );
});
