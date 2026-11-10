# Foundation migration registry

This registry tracks values that predate a foundation scale and cannot yet be
mapped to an approved token without an intentional visual change. It prevents
legacy values from becoming invisible technical debt.

## Statuses

| Status | Meaning | Next action |
| --- | --- | --- |
| **Migrated** | Uses an approved foundation token. | None. |
| **Preserved** | Retains its current value under a meaningful component token or registry entry. | Revisit during that component's visual cleanup. |
| **Normalize** | A reviewed decision specifies the foundation token that should replace the existing value. | Make the visual change, capture before/after evidence, then mark Migrated. |
| **Accepted exception** | Intentionally outside a foundation scale because it is structural or optically necessary. | Keep the reason recorded; reconsider only when its layout is redesigned. |

The normal lifecycle is **Preserved → Normalize → Migrated**. A preserved
value may instead become an **Accepted exception** when visual evidence shows
it should remain.

## Spacing registry

The current audit begins with shared layout and controls. Feature-specific
entries are added when that component is migrated; this avoids creating
unreviewed tokens for every historic CSS literal.

| ID | Scope | Current value | Status | Candidate resolution |
| --- | --- | ---: | --- | --- |
| SP-001 | Shared card, field, list, and banner vertical stacks | 14px | **Preserved** | Compare `--space-3` (12px) and `--space-4` (16px) when Card and Field receive their dedicated cleanup. |
| SP-002 | Compact control gaps and insets across Studio | 6px | **Preserved** | Review with Button, IconButton, ToggleGroup, and compact-action migration; do not round globally. |
| SP-003 | Standard control gaps and insets across Studio | 10px | **Preserved** | Review by component family; determine whether 8px or 12px is visually correct in each context. |
| SP-004 | Text-field inset | 9px × 11px | **Preserved** | Review as part of Field/Input migration, including focus-ring and touch-target checks. |
| SP-005 | Standard Button inset | 10px × 15px | **Preserved** | Review as part of Button migration; preserve the control's current height until its variants are reviewed together. |
| SP-006 | Mobile navigation reservation | 104px | **Migrated** | `--layout-mobile-nav-reserve`; structural layout role, not general component spacing. |
| SP-007 | Safe-area insets | `env(safe-area-inset-*)` | **Accepted exception** | Device-provided layout safety values, not a Blyg spacing choice. |

## Shape and elevation registry

| ID | Scope | Current value | Status | Candidate resolution |
| --- | --- | ---: | --- | --- |
| SH-001 | Shared card radius | 14px | **Migrated** | `--radius-surface`; preserve until Card visual cleanup. |
| SH-002 | Shared control radius | 8px / 10px | **Migrated** | `--radius-compact` and `--radius-control`; component rules prescribe which applies. |
| SH-003 | Sheet/dialog radius | 18px | **Migrated** | `--radius-overlay`; preserve until Dialog visual cleanup. |
| EL-001 | Shared card elevation | theme-aware existing shadow | **Migrated** | `--shadow-surface`. |
| EL-002 | Sheet elevation | existing upward overlay shadow | **Migrated** | `--shadow-overlay`. |
| SH-004 | Feature-specific 3px, 4px, 6px, 12px, and 16px corners | varies | **Preserved** | Review within the owning component; do not flatten all corners globally. |
| EL-003 | Picker, toast, and coach shadows | varies by placement | **Preserved** | Review within Picker, Toast, and floating-feedback component work. |

## Motion registry

| ID | Scope | Current value | Status | Candidate resolution |
| --- | --- | ---: | --- | --- |
| MO-001 | Picker entrance | 160ms | **Preserved** | Keep as scoped `--picker-enter-duration`; compare against the 150ms fast role during Picker visual cleanup. |

## Layout registry

| ID | Scope | Current value | Status | Candidate resolution |
| --- | --- | ---: | --- | --- |
| LY-001 | Shared Studio content widths | 760px / 1240px | **Migrated** | `--layout-page-max` and `--layout-page-max-wide`. |
| LY-002 | Desktop navigation rail | 92px | **Migrated** | `--layout-rail-width`. |
| LY-003 | Desktop sheet/dialog width and inset | 520px / 16px | **Migrated** | `--layout-overlay-width` and `--layout-overlay-gutter`. |
| LY-004 | Picker and reading-trail widths | 400px / 380px | **Preserved** | Review within Picker and reading-trail component work; do not create global layout tokens for component-specific widths. |
| LY-005 | Responsive boundaries | 440px / 640px / 900px | **Accepted exception** | Documented structural media-query conventions; CSS custom properties cannot drive media queries. |

## Review protocol

1. Add or update a row before changing an off-scale value.
2. Capture the relevant surface before and after at desktop and phone widths;
   include light and dark modes whenever the component uses themed surfaces.
3. Record the target token before changing a row to **Normalize**.
4. Mark it **Migrated** only when product review accepts the visual result.
5. Never add a global spacing token for one historic literal. If the same
   value recurs across unrelated components, use the registry evidence to
   reconsider the scale itself.
