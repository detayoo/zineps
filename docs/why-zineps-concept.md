# Why Zineps Concept

"Everything you need for successful shipments", from the reference's "Waarom
Zineps" — English-first. Heading, ruled stats strip, five feature cells, and
a sixth mint cell closing to signup.

## Copy (reference, English-first)

Heading verbatim in spirit + a one-line sub. Stats from the source: 50+
logistics partners · 1,000+ shipping methods · 200+ countries · 99.9% uptime.
Five features compressed: one platform · fast integrations · analytics ·
global coverage · scalability & uptime. Sixth cell: "See it in your workflow /
Start shipping" → app register.

## Design

- Stats strip reuses the hairline-divided `dl` pattern (value first visually,
  valid `dt`-before-`dd` order via flex).
- 3-col feature grid (2 below `lg`, 1 below `sm`); the mint sixth cell fills
  the grid and inverts on hover.

## Motion

Scroll reveals only: `opacity 0 → 1`, `y 24 → 0`, `600ms`, house ease,
staggered `50ms`/`100ms` down the blocks. Reduced motion renders static.

## Accessibility

- `section[aria-labelledby]` → one `h2`; features are a real list with `h3`s.
- Mint cell text flips to `background` on the deep-teal hover — both states
  pass AA.

## Tokens used

Surfaces `background`, hairlines `border`, fills `accent` / `accent-strong`,
text `foreground` / `muted-foreground` / `accent-ink` / `background`.
Radius `rounded` (4px). No shadows.
