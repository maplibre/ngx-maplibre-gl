export type BooleanInput = string | boolean | null | undefined;

/**
 * Inline styles accepted by a component's wrapper element. Either a CSS
 * declaration string (`'z-index: 8'`) or a map of properties, where keys may be
 * camelCase (`zIndex`), kebab-case (`z-index`) or custom properties
 * (`--marker-level`). `null` and `undefined` values remove the declaration.
 *
 * @category Components
 */
export type ContentStyle =
  | string
  | Record<string, string | number | null | undefined>;
