import { E2eDriver } from '../support/e2e-driver';

describe('Toggle layers', () => {
  context('Given I am on the Toggle Layers showcase', () => {
    let when: typeof E2eDriver.prototype.when, get: typeof E2eDriver.prototype.get, then: typeof E2eDriver.prototype.then;
    const { beforeAndAfter } = new E2eDriver();
    let initialImageSnapshot: any;

    beforeAndAfter();

    beforeEach(() => {
      ({ when, get, then } = new E2eDriver());

      when.visitMapPage('/demo/toggle-layers');
      when.waitForMapToIdle();
      initialImageSnapshot = get.imageSnapshot();
    });

    context('When I click on the "countries names" button', () => {
      beforeEach(() => {
        when.clickCountryNamesButton();
      });

      it('Then I should see the map image change', () => {
        when.waitForMapToIdle();
        then(get.imageSnapshot()).shouldNotEqualSnapshot(initialImageSnapshot);
      });
    });

    context('When I click on the "countries names" button twice', () => {
      beforeEach(() => {
        when.clickCountryNamesButton();
        when.waitForMapToIdle();
        when.clickCountryNamesButton();
      });

      it('Then I should see the original map image', () => {
        when.waitForMapToIdle();
        then(get.imageSnapshot()).shouldEqualSnapshot(initialImageSnapshot);
      });
    });
  });
});
