import { InjectionToken, inject, type ValueProvider } from '@angular/core';
import type { PopupOptions } from 'maplibre-gl';
import type { ContentStyle } from '../shared/utils/types';

/**
 * Default options applied to every `mgl-popup` in the injector scope.
 *
 * All MapLibre popup options plus the ngx-only `contentStyle` are supported. A
 * popup can still override any of them through its inputs.
 *
 * @category Components
 */
export type MglPopupConfig = PopupOptions & {
  contentStyle?: ContentStyle;
};

const defaultConfig: MglPopupConfig = {};

/**
 * Injection token holding the {@link MglPopupConfig}. Prefer
 * {@link provideMglPopupConfig} over using this token directly.
 *
 * @category Components
 */
export const MGL_POPUP_CONFIG = new InjectionToken<MglPopupConfig>(
  'MglPopupConfig',
);

/**
 * Provides default options for every `mgl-popup` within the injector scope.
 * Explicit inputs on an individual `mgl-popup` take precedence.
 *
 * @example
 * ```typescript
 * // app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideMglPopupConfig({ closeButton: false, maxWidth: '320px' })],
 * };
 * ```
 *
 * @category Components
 */
export function provideMglPopupConfig(
  config: Partial<MglPopupConfig>,
): ValueProvider {
  return {
    provide: MGL_POPUP_CONFIG,
    useValue: { ...defaultConfig, ...config },
  };
}

/**
 * Reads the current {@link MglPopupConfig}, falling back to an empty config
 * when none was provided.
 *
 * @category Components
 */
export function injectMglPopupConfig(): MglPopupConfig {
  return inject(MGL_POPUP_CONFIG, { optional: true }) ?? defaultConfig;
}
