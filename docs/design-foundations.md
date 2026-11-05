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

## Next implementation step

Current `main` centralizes theme calculation in `src/studio-theme.ts`. The
colour migration will adapt that module to emit these semantic roles, preserve
the current custom-theme behavior, then replace legacy token references in
small verified batches.
