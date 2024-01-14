import { E2eDriver } from '../support/e2e-driver';

describe('Popup', () => {
  context('Given I am on the Popup showcase', () => {
    let { beforeAndAfter, given, when, get, then } = new E2eDriver();

    beforeAndAfter();

    beforeEach(() => {
      ({ given, when, get, then } = new E2eDriver());
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
