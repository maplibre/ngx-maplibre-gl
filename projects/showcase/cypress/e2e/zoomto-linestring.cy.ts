import { E2eDriver } from '../support/e2e-driver';

describe('Zoomto Linestring', () => {
  context('Given I am on the Zoomto Linestring showcase', () => {
    let { beforeAndAfter, given, when, get, then } = new E2eDriver();
    let initialImageSnapshot: any;

    beforeAndAfter();

    beforeEach(() => {
      ({ given, when, get, then } = new E2eDriver());
      when.visitMapPage('/demo/zoomto-linestring');
      when.waitForMapToIdle();
      initialImageSnapshot = get.imageSnapshot();
    });

    context('When I click the "Zoom to bounds" button', () => {
      beforeEach(() => {
        when.clickZoomToBoundsButton();
      });

      it('Then I should see the map zoom in', () => {
        when.waitForMapToIdle();
        then(get.imageSnapshot()).shouldNotEqualSnapshot(initialImageSnapshot);
      });
    });
  });
});
