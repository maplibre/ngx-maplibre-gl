import { E2eDriver } from '../support/e2e-driver';

describe('Live Update', () => {
  context('Given I am on the Live Update Feature showcase', () => {
    let { beforeAndAfter, when, get, then } = new E2eDriver();
    let initialImageSnapshot: any;

    beforeAndAfter();

    beforeEach(() => {
      ({ when, get, then } = new E2eDriver());
      when.visitMapPage('/demo/live-update-feature');
      when.waitForMapLoaded();
      // Note: do not wait for map to idle because this demo is constantly panning
      initialImageSnapshot = get.imageSnapshot();
    });

    context('When I wait three seconds', () => {
      beforeEach(() => {
        when.wait(3000);
      });

      it('Then I should see the map image change and the map center coordinates are different', () => {
        then(get.imageSnapshot()).shouldNotEqualSnapshot(initialImageSnapshot);
      });
    });
  });
});
