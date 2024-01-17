import { E2eDriver } from '../support/e2e-driver';

describe('Popup', () => {
  context('Given I am on the Popup showcase', () => {
    let when: typeof E2eDriver.prototype.when, get: typeof E2eDriver.prototype.get, then: typeof E2eDriver.prototype.then;
    const { beforeAndAfter } = new E2eDriver();

    beforeAndAfter();

    beforeEach(() => {
      ({ when, get, then } = new E2eDriver());
      when.visitMapPage('/demo/popup');
      when.waitForMapToIdle();
    });

    context('When the map loads', () => {
      it('Then I should see a popup dialog containing "Hello World !"', () => {
        then(get.mglPopup()).shouldExist();
        then(get.mapLibrePopUpContent()).shouldHaveText('Hello world !');
      });
    });

    context("When I click the popup's close button", () => {
      beforeEach(() => {
        when.clickPopupCloseButton();
      });

      it('Then I should not see a popup dialog containing "Hello World !"', () => {
        then(get.mglPopup()).shouldNotExist();
      });
    });
  });
});
