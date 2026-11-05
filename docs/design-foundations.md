# Studio design foundations

This branch defines the shared visual vocabulary that components consume. It
begins with colour because colour roles are already repeated across the Studio
and must work in both light and dark themes.

## Colour naming decision

Studio uses **semantic, Carbon-style role names** rather than numbered colour
scales. A component asks for the role it needs; a theme supplies the actual
colour. This keeps an interaction's intent legible and lets themes change
without editing every component.

Numbered primitive ramps may be added later for illustration or advanced theme
authoring. They are not the public API for ordinary interface components.

## V1 semantic roles

| Role | Used for |
| --- | --- |
| `--color-background` | page canvas |
| `--color-layer` | cards, sheets, popovers, and elevated surfaces |
| `--color-field` | recessed inputs and control groups |
| `--color-text-primary` | standard text on a layer |
| `--color-text-secondary` | supporting text on a layer |
| `--color-text-primary-on-background` | headings and high-emphasis text directly on the page canvas |
| `--color-text-secondary-on-background` | supporting text directly on the page canvas |
| `--color-background-inverse` | inverse surfaces such as neutral toasts |
| `--color-text-inverse` | text on an inverse surface |
| `--color-border-subtle` | ordinary divisions and resting control borders |
| `--color-border-strong` | emphasized borders and hover treatment |
| `--color-accent` | links, selected controls, and primary actions |
| `--color-accent-subtle` | selected-control background |
| `--color-text-on-accent` | text and icons on the accent |
| `--color-support-success` / `-subtle` | successful completion feedback |
| `--color-support-warning` / `-subtle` | warning feedback |
| `--color-support-error` / `-subtle` | error and destructive feedback |
| `--color-highlight-generated` | generated-text highlight |
| `--color-focus` | keyboard-focus ring; initially the accent |

`*-on-background` exists because a theme may use a page canvas whose contrast
relationship differs from a card or sheet. Components on a layer use the
ordinary text roles; page chrome uses the explicit background roles.

## Implementation rules

- Theme data maps to primitive values internally, then exposes the semantic
  roles above as CSS custom properties.
- Product CSS and components use only semantic roles. They do not use a
  theme's raw page, ink, paper, or pencil values directly.
- Light, dark, and custom themes must provide every semantic role.
- Existing colours migrate without intended visual redesign. A role's value may
  change only as a separately reviewed visual decision.
- New tokens require a documented use case; near-duplicate role names are not
  added just to match a one-off component.

## Typography naming decision

Studio has two interface font-family roles. They use local system-font stacks,
so no font is downloaded and the interface remains native to each platform.

| Role | Token | Used for |
| --- | --- | --- |
| Interface | `--font-family-sans` | Studio UI, controls, headings, and prose |
| Code | `--font-family-mono` | Markdown, code, IDs, and technical snippets |

The existing `--sans` and `--mono` names remain aliases during migration.
They are not the design-system API for new UI.

### Numeric scale

Typography primitives grow from smallest to largest; these numbers describe
physical scale, not heading importance. `rem` keeps every value relative to a
reader's browser root size (normally 16px).

| Token | Default equivalent |
| --- | --- |
| `--font-size-100` | 12px / `0.75rem` |
| `--font-size-200` | 14px / `0.875rem` |
| `--font-size-300` | 16px / `1rem` |
| `--font-size-400` | 18px / `1.125rem` |
| `--font-size-500` | 20px / `1.25rem` |
| `--font-size-600` | 24px / `1.5rem` |
| `--font-size-700` | 32px / `2rem` |

If a future Studio typeface has an unusually small or large x-height, tune its
numeric tokens in one central place. The named roles below then adapt together.

### Heading roles

Heading names use document hierarchy, where heading 1 is the most prominent.
The 32px primitive is reserved until an actual Studio screen needs a display
style.

| Role | Token | Current use |
| --- | --- | --- |
| Heading 1 | `--type-heading-1` | page titles |
| Heading 2 | `--type-heading-2` | section titles |
| Heading 3 | `--type-heading-3` | card and subsection titles |
