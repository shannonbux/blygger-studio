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
| SP-006 | Mobile navigation reservation | 104px | **Accepted exception** | Structural space for the fixed bottom navigation; not general component spacing. |
| SP-007 | Safe-area insets | `env(safe-area-inset-*)` | **Accepted exception** | Device-provided layout safety values, not a Blyg spacing choice. |

## Review protocol

1. Add or update a row before changing an off-scale value.
2. Capture the relevant surface before and after at desktop and phone widths;
   include light and dark modes whenever the component uses themed surfaces.
3. Record the target token before changing a row to **Normalize**.
4. Mark it **Migrated** only when product review accepts the visual result.
5. Never add a global spacing token for one historic literal. If the same
   value recurs across unrelated components, use the registry evidence to
   reconsider the scale itself.
