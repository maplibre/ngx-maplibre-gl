import { E2eDriver } from '../support/e2e-driver';

describe('Set style', () => {
  context('Given I am on the Set Style showcase', () => {
    let { beforeAndAfter, given, when, get, then } = new E2eDriver();
    let initialImageSnapshot: any;

    beforeAndAfter();

    beforeEach(() => {
      ({ given, when, get, then } = new E2eDriver());

      when.visitMapPage('/demo/set-style');
      when.waitForMapToIdle();
      initialImageSnapshot = get.imageSnapshot();
    });

    context('When I click on the "from code" radio button', () => {
      beforeEach(() => {
        when.clickFromCodeRadioButton();
      });

      it('Then I should see the map image change', () => {
        when.waitForMapToIdle();
        then(get.imageSnapshot()).shouldNotEqualSnapshot(initialImageSnapshot);
        when.resetConsoleWarnings();
      });
    });

    context(
      'When I click the "from code" radio button and then click the "streets" radio button',
      () => {
        beforeEach(() => {
          given.interceptStreetsSprite();
          when.wait(1000);
          when.clickFromCodeRadioButton();
          when.waitForMapToIdle();
          when.clickStreetsRadioButton();

          // The switch back to the streets style fetches a sprite sheet - we can use this
          // as a reliable await target just before the map is fully rendered and idle (and
          // only then should we compare to the snapshot)
          when.waitForStreetsSpriteResponse('**/streets/sprite.png');
          when.wait(3000);
        });

        it('Then I should see the original map image', () => {
          when.waitForMapToIdle();
          then(get.imageSnapshot()).shouldEqualSnapshot(initialImageSnapshot);
          when.resetConsoleWarnings();
        });
      },
    );
  });
});
