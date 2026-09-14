# Hero Concept

Immersive scroll hero: a pinned full-viewport brand landscape. Scrolling
parallaxes three token-colored layers, draws the shipment route, carries the
headline away, and resolves the Labels / Tracking / Returns / Analytics legend
at the bottom. Built to sit under “The Masthead” on the same wide rail.

> **Language:** English-first, translated from the captured Dutch source in
> `docs/zineps-content.md`.

---

## Anatomy

- **Pinned stage** — the section is `220svh`; the inner stage sticks at `top-0`
  with `h-svh`, so one screen of scroll drives the scene.
- **Layers** — mint wash, soft far hills, teal mid hills, ink foreground. All
  fills use existing tokens (`background`, `accent`, `accent-strong`,
  `foreground`); no new colors, no shadows.
- **Route** — one accent stroke draws from `pathLength 0 → 1` across scroll
  progress `0.2 → 0.8`, with origin/destination nodes.
- **Promise block** — eyebrow tag, H1 kept close to the source, compressed
  subcopy, verb-first CTAs (`Start shipping`, `Explore the partner platform`),
  and the no-contract microcopy answering the top FAQ.
- **Legend** — four non-interactive phase labels that highlight with scroll
  progress. Decorative status, not controls.

## Motion (scroll-driven, then still)

Gate result: continuous scroll-linked scene, purpose is spatial consistency and
explanation — appropriate for a first-view marketing hero.

- **Parallax:** far `-6%`, mid `-14%`, near `-24%`, sky `+10%`; transform-only.
- **Headline:** rises `-28%` and fades out across the first half of progress.
- **Route:** draws across the middle band of progress.
- **Mount:** copy staggers once (`60ms`, `550ms`, house ease); fills are gone in
  favor of the route draw.
- **Reduced motion:** no parallax, no rise/fade, route rendered complete, legend
  stays neutral.

Ingredients: framer-motion `useScroll` + `useTransform` (already in the app),
transform/opacity and `pathLength` only, house ease `[0.16, 1, 0.3, 1]`.

---

## Responsive (desktop-first)

| Width | Behavior |
|-------|----------|
| base | pinned `h-svh` stage, centered copy, 4-up legend; H1 56px |
| `≤ 1180px` (`lg`) | same scene, H1 44px |
| `≤ 900px` (`md`) | legend becomes 2-up; H1 36px |
| `≤ 640px` (`sm`) | tighter top padding; H1 32px |

## Accessibility

- `section[aria-labelledby]` → one `h1`; landscape, route, and legend are
  `aria-hidden` sample/status decor. All essential facts stay in text.
- CTAs are links with visible text, `min-h-[44px]` targets, `focus-visible` ring.
- Accent-strong on white/mint passes AA at these sizes; solid mint CTA uses
  `accent-ink`.
- Reduced motion removes scroll transforms and renders the route complete.

## Tokens used

Gradient `accent-soft/90 → background`; fills `accent/22%`, `accent-strong/30%`,
`foreground`; route `accent-strong`; text `foreground` / `muted-foreground` /
`accent-strong` / `accent-ink` on `accent`. Radius `rounded` (4px). No shadows.
