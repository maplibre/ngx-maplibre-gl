import { expect } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { Assertable, type Query } from './playwright-helper';

/** A readback of the map canvas, ready to be diffed against another one. */
export type MapSnapshot = {
  width: number;
  height: number;
  data: Buffer;
};

/** A snapshot that is re-read from the canvas every time it is asserted on. */
export type MapSnapshotQuery = Query<MapSnapshot>;

/** Number of pixels that differ between two snapshots of the same size. */
function diffPixels(a: MapSnapshot, b: MapSnapshot): number {
  if (a.width !== b.width || a.height !== b.height) {
    throw new Error(
      `snapshots must have the same dimensions to be comparable, got ` +
        `${a.width}x${a.height} and ${b.width}x${b.height}`
    );
  }
  return pixelmatch(a.data, b.data, undefined, a.width, a.height);
}

/**
 * A style change can pull new glyphs and tiles over the network before the map
 * settles, which on a loaded CI machine takes well past the default assertion
 * timeout. These comparisons get their own, longer budget.
 */
const SNAPSHOT_TIMEOUT_MS = 60_000;

/**
 * Adds map-image assertions on top of the generic {@link Assertable}.
 *
 * The snapshot assertions poll: MapLibre can report `idle` before an interaction
 * has actually queued its re-render, so a single readback right after an
 * interaction may still show the previous frame.
 */
export class MapLibreAssertable<T> extends Assertable<T> {
  private compareTo = (
    expected: MapSnapshot,
    assertion: (difference: number) => void
  ) =>
    this.pollValue(
      (actual: MapSnapshot) => assertion(diffPixels(expected, actual)),
      SNAPSHOT_TIMEOUT_MS
    );

  public shouldEqualSnapshot = (snapshot: MapSnapshot) =>
    this.compareTo(snapshot, (difference) => expect(difference).toBe(0));

  public shouldNotEqualSnapshot = (snapshot: MapSnapshot) =>
    this.compareTo(snapshot, (difference) =>
      expect(difference).toBeGreaterThan(0)
    );
}
