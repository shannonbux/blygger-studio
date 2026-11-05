/*
 * The studio's colour tokens for a theme: pure functions of the theme setting,
 * shared by the SPA (src/ui/theme.ts paints them onto <html>) and the server
 * (the login page, painted before there is a session).
 */
import {
  resolveTheme,
  luminance,
  type CustomTheme,
} from './themes.ts';
export { luminance };

export const THEME_VARS = [
  'color-background',
  'color-layer',
  'color-field',
  'color-text-primary',
  'color-text-secondary',
  'color-text-primary-on-background',
  'color-text-secondary-on-background',
  'color-background-inverse',
  'color-text-inverse',
  'color-border-subtle',
  'color-border-strong',
  'color-accent',
  'color-accent-subtle',
  'color-text-on-accent',
  'color-support-error',
  'color-support-error-subtle',
  'color-support-success',
  'color-support-success-subtle',
  'color-support-warning',
  'color-support-warning-subtle',
  'color-highlight-generated',
  'color-focus',
  'shadow',
] as const;
export type ThemeVars = Record<(typeof THEME_VARS)[number], string>;

/** Transitional aliases for screen CSS that has not migrated to semantic roles yet. */
export const LEGACY_THEME_VARS = [
  'page', 'card', 'sunk', 'ink', 'ink-soft', 'page-ink', 'page-ink-soft',
  'rule', 'rule-strong', 'pencil', 'on-pencil', 'alert', 'ok', 'warn',
] as const;

const STATE_LIGHT = {
  'color-support-error': '#b3261e',
  'color-support-success': '#1c7a52',
  'color-support-warning': '#a35a00',
};
const STATE_DARK = {
  'color-support-error': '#f0a19a',
  'color-support-success': '#74c79c',
  'color-support-warning': '#e0a75c',
};
const SHADOW_LIGHT =
  '0 1px 2px rgba(20,30,35,.06), 0 6px 20px rgba(20,30,35,.06)';
const SHADOW_DARK = '0 1px 2px rgba(0,0,0,.3), 0 6px 20px rgba(0,0,0,.25)';
/** studio.css's own pair — what `auto` resolves to. */
export const AUTO_LIGHT_PENCIL = '#23608c';
export const AUTO_DARK_PENCIL = '#8cc0e4';

/**
 * The studio tokens for a named theme, or null for `auto` (and anything
 * unknown), which leaves studio.css's light/dark defaults in charge.
 */
export function themeVars(
  name: string | undefined,
  custom?: CustomTheme | null,
  customDark?: CustomTheme | null,
  dark = false,
): ThemeVars | null {
  const t = resolveTheme(name, custom, customDark, dark);
  if (!t) return null;
  // Slate is a light sheet on a dark page: text set directly on the page
  // (headings, hints) must read against the page, not the sheet.
  const pageDark = luminance(t.page) < 0.2;
  return {
    'color-background': t.page,
    'color-layer': t.paper,
    'color-text-primary': t.ink,
    'color-text-secondary': t.inkSoft,
    'color-border-subtle': t.rule,
    'color-accent': t.pencil,
    'color-field': `color-mix(in srgb, ${t.ink} 6%, ${t.paper})`,
    'color-border-strong': `color-mix(in srgb, ${t.ink} 24%, ${t.paper})`,
    'color-text-on-accent': t.dark ? t.page : t.paper,
    'color-text-primary-on-background': pageDark && !t.dark ? t.paper : t.ink,
    'color-text-secondary-on-background':
      pageDark && !t.dark
        ? `color-mix(in srgb, ${t.paper} 70%, ${t.page})`
        : t.inkSoft,
    'color-background-inverse': t.ink,
    'color-text-inverse': t.paper,
    ...(t.dark ? STATE_DARK : STATE_LIGHT),
    'color-accent-subtle': 'color-mix(in srgb, var(--color-accent) 12%, var(--color-layer))',
    'color-support-error-subtle': 'color-mix(in srgb, var(--color-support-error) 10%, var(--color-layer))',
    'color-support-success-subtle': 'color-mix(in srgb, var(--color-support-success) 13%, var(--color-layer))',
    'color-support-warning-subtle': 'color-mix(in srgb, var(--color-support-warning) 13%, var(--color-layer))',
    'color-highlight-generated': 'color-mix(in srgb, var(--color-support-warning) 16%, transparent)',
    'color-focus': 'var(--color-accent)',
    shadow: t.dark ? SHADOW_DARK : SHADOW_LIGHT,
  };
}

/** True when the theme paints dark (auto follows the device). */
export function themeIsDark(
  name: string | undefined,
  prefersDark: boolean,
  custom?: CustomTheme | null,
  customDark?: CustomTheme | null,
) {
  const t = resolveTheme(name, custom, customDark, prefersDark);
  return t ? t.dark : prefersDark;
}

/** The accent the top bar wears — also the browser's theme-color. */
export function themeAccent(
  name: string | undefined,
  prefersDark: boolean,
  custom?: CustomTheme | null,
  customDark?: CustomTheme | null,
) {
  const t = resolveTheme(name, custom, customDark, prefersDark);
  if (t) return t.pencil;
  return prefersDark ? AUTO_DARK_PENCIL : AUTO_LIGHT_PENCIL;
}
