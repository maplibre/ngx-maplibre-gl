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
 * Fraction of the canvas that may differ and still count as "the same picture".
 *
 * WebGL output is not bit-identical across runs - notably under the software
 * renderer CI uses - so a round trip that restores the map can still leave a few
 * hundred pixels changed. Measured on this suite:
 *
 * - noise, a terrain enable/disable round trip on CI:  491 px
 * - smallest real change, switching label language:  18,897 px
 * - largest real change, swapping the whole style:  199,329 px
 *
 * At 0.25% of a 1280x720 canvas the budget is ~2,300 px: several times the
 * observed noise, and an order of magnitude below the smallest change we assert
 * on, so a genuine regression still fails.
 */
const TOLERATED_DIFFERENCE_RATIO = 0.0025;

/** Pixel budget for a snapshot of this size. */
function toleratedDifference(snapshot: MapSnapshot): number {
  return Math.round(
    snapshot.width * snapshot.height * TOLERATED_DIFFERENCE_RATIO
  );
}

/** Whether two snapshots show the same picture, allowing for rendering noise. */
export function looksUnchanged(a: MapSnapshot, b: MapSnapshot): boolean {
  return diffPixels(a, b) <= toleratedDifference(a);
}

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
    assertion: (difference: number, tolerated: number) => void
  ) =>
    this.pollValue((actual: MapSnapshot) =>
      assertion(diffPixels(expected, actual), toleratedDifference(expected))
    );

  public shouldEqualSnapshot = (snapshot: MapSnapshot) =>
    this.compareTo(snapshot, (difference, tolerated) =>
      expect(difference).toBeLessThanOrEqual(tolerated)
    );

  /** Complementary to {@link shouldEqualSnapshot}: rendering noise is not a change. */
  public shouldNotEqualSnapshot = (snapshot: MapSnapshot) =>
    this.compareTo(snapshot, (difference, tolerated) =>
      expect(difference).toBeGreaterThan(tolerated)
    );
}
