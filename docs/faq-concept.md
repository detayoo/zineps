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
- Each item is one sharp callout holding both its question and its answer,
  in the x-ta `Callout` manner: a `2px` accent edge, a faint mint fill, zero
  radius (`rounded-none` — the one place sharp is the point). Question row on
  top with tabular numerals and a plus that rotates `45°` open; answer
  unfolding inside the same box. Closed items are plain page background with
  a transparent edge; opening one brings in both the accent edge and the mint
  fill.
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
