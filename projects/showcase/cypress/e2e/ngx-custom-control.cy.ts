import { E2eDriver } from '../support/e2e-driver';

describe('Custom control', () => {
  context('Given I am on the Custom Control showcase', () => {
    let driver = new E2eDriver();

    beforeEach(() => {
      driver.visitMapPage('/demo/ngx-custom-control').waitForMapToIdle();
    });

    context('When I click on the "Hello" button', () => {
      beforeEach(() => {
        driver.assert.customHelloButtonExists().when.clickHelloCustomButton();
      });

      it('Then I should see an alert', () => {
        driver.assert.customPopupContainsHello();
      });
    });

    context('When I click on the "Hide Controls" button', () => {
      beforeEach(() => {
        driver.assert.fullscreenControlExists().assert.customHelloButtonExists().when.clickHideControlsButton();
      });

      it('Then I should not see any controls anymore', () => {
        driver.assert.fullscreenControlDoesNotExist().assert.customHelloButtonDoesNotExist()
      });
    });
  });
});
