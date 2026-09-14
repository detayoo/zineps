# Partner Rates Concept

"Their buying power becomes yours", from the reference's partner-rates block
— English-first. Pitch and dual CTAs on the left, the three stats ruled on
the right.

## Copy (reference, English-first)

Eyebrow: "Partner shipping rates". Heading verbatim in spirit. Sub: partners'
high-volume deals, lane matching, partner rates / own contracts / both from
one dashboard. CTAs: "Start free" → the source's shipping signup URL ·
"How partner rates work" → `/pricing#partner-rates`. Stats: +20 partners ·
+200 countries · +1,000 methods.

## Design

- Pitch block up top (eyebrow, heading, sub, dual CTAs), then the three stats
  side by side in a hairline grid (stacked below `lg`): numbers at
  `clamp(2.75rem, 6vw, 5rem)` with tight tracking and `tabular-nums` (no
  jitter while counting), labels underneath.

## Motion

Scroll reveals only: `opacity 0 → 1`, `y 32 → 0`, `600ms`, house ease.
Numbers render at final value — no count-up. Hovering a stat spins each
digit through exactly one odometer revolution (`0 → 10` over `700ms` on the
house ease) and lands home; leaving mid-spin snaps back. Reduced motion
renders final values statically with no roll.

## Accessibility

- `section[aria-labelledby]` → one `h2`; stats are a real definition list.
- CTAs meet the 44px target with `focus-visible` rings.

## Tokens used

Surfaces `background`, hairlines `border`, fills `accent` / `accent-soft`,
text `foreground` / `muted-foreground` / `accent-strong` / `accent-ink`.
Radius `rounded` (4px). No shadows.
