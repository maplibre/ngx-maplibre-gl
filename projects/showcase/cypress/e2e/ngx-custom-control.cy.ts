import { E2eDriver } from '../support/e2e-driver';

describe('Custom control', () => {
  context('Given I am on the Custom Control showcase', () => {
    let given: typeof E2eDriver.prototype.given;
    let when: typeof E2eDriver.prototype.when;
    let get: typeof E2eDriver.prototype.get; 
    let then: typeof E2eDriver.prototype.then;
    const { beforeAndAfter } = new E2eDriver();

    beforeAndAfter();

    beforeEach(() => {
      ({ given, when, get, then } = new E2eDriver());
      when.visitMapPage('/demo/ngx-custom-control');
      when.waitForMapToIdle();
    });

    context('When I click on the "Hello" button', () => {
      beforeEach(() => {
        given.alertStub();
        when.clickHelloCustomButton();
      });

      it('Then I should see an alert', () => {
        then(get.alertStub()).shouldHaveBeenCalledWith('Hello');
      });
    });

    context('When I click on the "Hide Controls" button', () => {
      beforeEach(() => {
        when.waitForFullScreenControls();
        when.waitForCustomButton();
        when.clickToggleShowControlsButton();
      });

      it('Then I should not see any controls anymore', () => {
        then(get.fullscreenControl()).shouldNotExist();
        then(get.customControlButton()).shouldNotExist();
      });
    });
  });
});
