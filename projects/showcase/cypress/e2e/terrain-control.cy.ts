import { E2eDriver } from '../support/e2e-driver';

describe('Terrain Control', () => {
  context(
    'Given I am on the Terrain Control showcase and Terrain is disabled',
    () => {
      let driver = new E2eDriver();

      beforeEach(() => {
        driver
          .visitMapPage('/demo/terrain-control')
          .waitForMapToIdle()
          .assert.mapTerrainPropertyDoesNotExists()
          .takeImageSnapshot();
      });

      context('When I click on the Terrain Control button once', () => {
        beforeEach(() => {
          // Enable Terrain
          driver.when.clickEnableTerrainControlButton();
        });

        it('Then I should see the map image change and Terrain is enabled', () => {
          driver
            .waitForMapToIdle()
            .assert.mapTerrainPropertyExists()
            .assert.isNotSameAsSnapshot();
        });
      });

      context('When I click on the Terrain Control button twice', () => {
        beforeEach(() => {
          // Enable Terrain
          driver.when
            .clickEnableTerrainControlButton()
            .waitForMapToIdle()

            // Disable Terrain
            .when.clickDisableTerrainControlButton();
        });

        it('Then I should see the original map image and Terrain is disabled', () => {
          driver
            .waitForMapToIdle()
            .assert.mapTerrainPropertyDoesNotExists()
            .assert.isSameAsSnapshot();
        });
      });
    }
  );
});
