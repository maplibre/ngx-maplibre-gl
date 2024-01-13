import { CypressHelper } from "@shellygo/cypress-test-utils";

export class MaplibreCypressHelper {
  private helper = new CypressHelper();
  beforeAndAfter = () => {
    this.helper.beforeAndAfter();
  };

  public given = { ...this.helper.given };
  public when = {
    ...this.helper.when,
    resetConsoleWarnings: () => {
      cy.get("@consoleWarnSpy").then((spy: any) => {
        if (spy.callCount > 0) {
          cy.log(`Clearing ${spy.callCount} console warning(s)...`);
          spy.resetHistory();
        }
      });
    },
  };
  public get = { ...this.helper.get };
}
