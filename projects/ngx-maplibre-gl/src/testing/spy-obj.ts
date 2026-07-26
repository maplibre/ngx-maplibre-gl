import { vi, type Mock } from 'vitest';

/**
 * Every method of `T` replaced by a Vitest mock, so tests can both stub return
 * values and assert on calls.
 */
export type SpyObj<T> = T & {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? Mock<(...args: A) => R>
    : T[K];
};

/**
 * Vitest equivalent of `jasmine.createSpyObj`: builds an object whose listed
 * methods are mocks, plus any extra plain properties.
 */
export function createSpyObj<T>(
  methodNames: readonly string[],
  properties: Record<string, unknown> = {}
): SpyObj<T> {
  const obj = {} as Record<string, unknown>;
  for (const name of methodNames) {
    obj[name as string] = vi.fn();
  }
  for (const [name, value] of Object.entries(properties)) {
    obj[name] = value;
  }
  return obj as SpyObj<T>;
}
