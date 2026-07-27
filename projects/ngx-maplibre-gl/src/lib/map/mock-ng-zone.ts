import { EventEmitter, Injectable, NgZone } from '@angular/core';

/**
 * Mock synchronous NgZone implementation that can be used
 * to flush out `onStable` subscriptions in tests.
 *
 * Deliberately does not extend `NgZone`: constructing a real one requires Zone.js,
 * which this library does not depend on. It implements only the surface `MapService`
 * uses, and is registered for the `NgZone` token in tests.
 *
 * via: https://github.com/angular/angular/blob/master/packages/core/testing/src/ng_zone_mock.ts
 */
@Injectable()
export class MockNgZone implements Pick<NgZone, 'run' | 'runOutsideAngular'> {
  readonly onStable = new EventEmitter<null>(false);

  run<T>(fn: () => T): T {
    return fn();
  }

  runOutsideAngular<T>(fn: () => T): T {
    return fn();
  }

  simulateZoneExit(): void {
    this.onStable.emit(null);
  }
}
