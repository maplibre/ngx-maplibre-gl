import { Assertable, then } from '@shellygo/cypress-test-utils/assertable';
import pixelmatch from 'pixelmatch';

export class MapLibreAssertable<T> extends Assertable<T> {
  private comparePixels = (
    buffer1: Buffer,
    buffer2: Buffer,
    width: number,
    height: number
  ) => pixelmatch(buffer1, buffer2, null, width, height);

  private compareSnapshots = (
    snapshot: Cypress.Chainable<{
      buffer: Buffer;
      height: number;
      width: number;
    }>
  ) => {
    const snapshotChainable = this.chainable as unknown as Cypress.Chainable<{
      buffer: Buffer;
      height: number;
      width: number;
    }>;
    return then(
      snapshotChainable.then(
        (subject: { buffer: Buffer; height: number; width: number }) =>
          snapshot.then(({ buffer, width, height }) =>
            cy.wrap(this.comparePixels(buffer, subject.buffer, width, height))
          )
      )
    );
  };

  public shouldEqualSnapshot = (
    snapshot: Cypress.Chainable<{
      buffer: Buffer;
      height: number;
      width: number;
    }>
  ) => this.compareSnapshots(snapshot).shouldEqual(0);

  public shouldNotEqualSnapshot = (
    snapshot: Cypress.Chainable<{
      buffer: Buffer;
      height: number;
      width: number;
    }>
  ) => this.compareSnapshots(snapshot).shouldBeGreaterThan(0);
}
