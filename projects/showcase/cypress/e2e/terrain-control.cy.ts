import { E2eDriver } from '../support/e2e-driver';

describe('Terrain Control', () => {
  context(
    'Given I am on the Terrain Control showcase and Terrain is disabled',
    () => {
      let when: typeof E2eDriver.prototype.when, get: typeof E2eDriver.prototype.get, then: typeof E2eDriver.prototype.then;
      const { beforeAndAfter } = new E2eDriver();
      let initialImageSnapshot: any;

      beforeAndAfter();

      beforeEach(() => {
        ({ when, get, then } = new E2eDriver());
        when.visitMapPage('/demo/terrain-control');
        when.waitForMapToIdle();
        when.waitForDisabledTerrainButton();
        initialImageSnapshot = get.imageSnapshot();
      });

      context('When I click on the Terrain Control button once', () => {
        beforeEach(() => {
          when.clickEnableTerrainControlButton();
        });

        it('Then I should see the map image change and Terrain is enabled', () => {
          when.waitForMapToIdle();

          when.WaitForEnabledTerrainButton();
          then(get.imageSnapshot()).shouldNotEqualSnapshot(
            initialImageSnapshot,
          );
        });
      });

      context('When I click on the Terrain Control button twice', () => {
        beforeEach(() => {
          when.clickEnableTerrainControlButton();
          when.waitForMapToIdle();

          when.clickDisableTerrainControlButton();
        });

        it('Then I should see the original map image and Terrain is disabled', () => {
          when.waitForMapToIdle();
          when.waitForDisabledTerrainButton();
          then(get.imageSnapshot()).shouldEqualSnapshot(initialImageSnapshot);
        });
      });
    },
  );
});
