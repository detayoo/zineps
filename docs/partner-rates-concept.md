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

- 12-col split (7/5, stacking below `lg`); stat rows divide by hairlines with
  the value left and the label right, valid `dt`-before-`dd` order kept via
  flex ordering.

## Motion

Scroll reveals only: `opacity 0 → 1`, `y 24 → 0`, `600ms`, house ease, stats
trailing by `100ms`. Reduced motion renders static.

## Accessibility

- `section[aria-labelledby]` → one `h2`; stats are a real definition list.
- CTAs meet the 44px target with `focus-visible` rings.

## Tokens used

Surfaces `background`, hairlines `border`, fills `accent` / `accent-soft`,
text `foreground` / `muted-foreground` / `accent-strong` / `accent-ink`.
Radius `rounded` (4px). No shadows.
