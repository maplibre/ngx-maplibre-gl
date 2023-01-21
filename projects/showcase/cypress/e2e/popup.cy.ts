import { E2eDriver } from '../support/e2e-driver';

describe('Popup', () => {
  context('Given I am on the Popup showcase', () => {
    let driver = new E2eDriver();

    beforeEach(() => {
      driver.visitMapPage('/demo/popup').waitForMapToIdle();
    });

    context('When the map loads', () => {
      it('Then I should see a popup dialog containing "Hello World !"', () => {
        driver.assert.helloWorldPopupExists();
      });
    });

    context("When I click the popup's close button", () => {
      beforeEach(() => {
        driver.when.clickPopupCloseButton();
      });

      it('Then I should not see a popup dialog containing "Hello World !"', () => {
        driver.assert.helloWorldPopupDoesNotExist();
      });
    });
  });
});
