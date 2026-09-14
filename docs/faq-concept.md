# FAQ Concept

Frequently asked questions, from the reference's "Veelgestelde vragen" — six
Q&As, English-first. Sticky heading column on the left, numbered accordion on
the right.

## Copy (reference, English-first)

1. What exactly is Zineps? / 2. Who is Zineps for? / 3. Do I need a shipping
   contract already? / 4. Which systems does Zineps integrate with? / 5. What
   does using Zineps cost? / 6. How fast can I start? — answers compressed from
   the source. Side link answers the open end: "Still curious? Contact us."

## Design

- 12-col grid: heading spans 4 (sticky below the masthead), accordion spans 8;
  single column below `lg`.
- Rows are hairline-divided with tabular `01–06` numerals; the plus rotates
  `45°` into a close mark and picks up the accent when open.
- First item open by default so the section never reads empty.

## Motion

Accordion height auto, `280ms`, house ease (same pattern as the mobile menu).
Reduced motion opens instantly.

## Accessibility

- Real `button`s with `aria-expanded` + `aria-controls`; one open at a time.
- `focus-visible` rings; row hover tints mint so keyboard and pointer users get
  the same signal.

## Tokens used

Surfaces `background`, hairlines `border`, hover `accent-soft/60`, text
`foreground` / `muted-foreground` / `accent-strong`. Radius `rounded` (4px).
No shadows.
