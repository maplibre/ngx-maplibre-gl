import { CypressHelper } from '@shellygo/cypress-test-utils';

export class MaplibreCypressHelper {
  private helper = new CypressHelper();

  public given = {
    ...this.helper.given,
    onAlert: (
      fn:
        | Cypress.SinonSpyAgent<sinon.SinonSpy<any[], any>>
        | Cypress.SinonSpyAgent<sinon.SinonStub<any[], any>>
        | ((text: string) => void)
    ) => cy.on('window:alert', fn),
    spyOnWindowConsoleError: () =>
      Cypress.on('window:before:load', (win) =>
        this.helper.given.spyOnObject(win.console, 'error')
      ),
    spyOnWindowConsoleWarning: () =>
      Cypress.on('window:before:load', (win) =>
        this.helper.given.spyOnObject(win.console, 'warn')
      ),
  };
  public when = {
    ...this.helper.when,
    resetConsoleWarnings: () => {
      this.get.windowConsoleWarningSpy().then((spy: any) => {
        spy.resetHistory();
        if (spy.callCount > 0) {
          cy.log(`Clearing ${spy.callCount} console warning(s)...`);
        }
      });
    },
  };
  public get = {
    ...this.helper.get,
    windowConsoleWarningSpy: () => this.helper.get.spy('warn'),
    windowConsoleErrorSpy: () => this.helper.get.spy('error'),
  };

  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
  };
}
