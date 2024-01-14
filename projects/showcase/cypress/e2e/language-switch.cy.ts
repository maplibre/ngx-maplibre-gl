import { E2eDriver } from '../support/e2e-driver';

describe('Language switch', () => {
  context(
    'Given I am on the Language Switch showcase and French is selected',
    () => {
      const { beforeAndAfter, when, get, then } = new E2eDriver();
      let initialImageSnapshot: any;

      beforeAndAfter();

      beforeEach(() => {
        when.visitMapPage('/demo/language-switch');
        when.waitForMapToIdle();

        // Start in French for the baseline
        when.clickLanguageButton('fr');
        when.waitForMapToIdle();
        initialImageSnapshot = get.imageSnapshot();
      });

      context('When I click on the Russian button', () => {
        beforeEach(() => {
          // Switch to Russian
          when.clickLanguageButton('ru');
          when.waitForMapToIdle();
        });

        it('Then I should see the map image change', () => {
          then(get.imageSnapshot()).shouldNotEqualSnapshot(
            initialImageSnapshot,
          );
        });
      });

      context(
        'When I click the Russian button and then click the French button',
        () => {
          beforeEach(() => {
            // Switch to Russian
            when.clickLanguageButton('ru');
            when.waitForMapToIdle();

            // Switch back to French
            when.clickLanguageButton('fr');
            when.waitForMapToIdle();
          });

          it('Then I should see the original image', () => {
            then(get.imageSnapshot()).shouldEqualSnapshot(initialImageSnapshot);
          });
        },
      );
    },
  );
});
