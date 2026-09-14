# Hero Concept

Immersive scroll hero: a pinned full-viewport brand landscape. Scrolling
parallaxes the brand layers, draws the shipment route, and drives a delivery
van along it — Amsterdam to Berlin, wheels spinning, body pitched to the road.
The headline stays put; nothing fades on scroll. Built to sit under “The
Masthead” on the same wide rail.

> **Language:** English-first, translated from the captured Dutch source in
> `docs/zineps-content.md`.

---

## Anatomy

- **Pinned stage** — the section is `220svh`; the inner stage sticks at `top-0`
  with `h-svh`, so one screen of scroll drives the scene.
- **Layers** — mint wash, soft far hills, teal mid hills, slim ink foreground.
  All fills use existing tokens (`background`, `accent`, `accent-strong`,
  `foreground`); no new colors, no shadows.
- **Route** — one accent stroke draws from `pathLength 0 → 1` across scroll
  progress `0.2 → 0.8`, with origin/destination nodes and city labels.
- **The van** — a flat token-built box van: white cargo box with the wordmark
  and a mint stripe, glazed cab with mirror and headlight, big spoked wheels.
  It rides the route with position from the path geometry itself
  (`getPointAtLength`), heading from the tangent, wheel spin from travelled
  distance — so it can never detach from the line. Updates write straight to
  the DOM transform, no re-renders per scroll frame.
- **Promise block** — eyebrow tag, H1 kept close to the source, compressed
  subcopy, verb-first CTAs (`Start shipping`, `Explore the partner platform`),
  and a microcopy line that doubles as the scroll cue.

## Motion (scroll-driven, then still)

Gate result: continuous scroll-linked scene, purpose is spatial consistency and
explanation — appropriate for a first-view marketing hero.

- **Parallax:** far `-6%`, mid `-14%`, near `-12%`, sky `+10%`; transform-only.
- **Route:** draws across the middle band of progress.
- **Van:** follows the path 1:1 with scroll; no entrance, no fade, no loop.
- **Mount:** copy staggers once (`60ms`, `550ms`, house ease).
- **Reduced motion:** no parallax, route rendered complete, van parked at the
  destination.

Ingredients: framer-motion `useScroll` + `useTransform` (already in the app),
transform/opacity and `pathLength` only, house ease `[0.16, 1, 0.3, 1]`.

---

## Responsive (desktop-first)

| Width | Behavior |
|-------|----------|
| base | pinned `h-svh` stage, centered copy; H1 56px |
| `≤ 1180px` (`lg`) | same scene, H1 44px |
| `≤ 900px` (`md`) | H1 36px |
| `≤ 640px` (`sm`) | tighter top padding; H1 32px |

## Accessibility

- `section[aria-labelledby]` → one `h1`; landscape, route, van, and city labels
  are `aria-hidden` sample/status decor. All essential facts stay in text.
- CTAs are links with visible text, `min-h-[44px]` targets, `focus-visible` ring.
- Accent-strong on white/mint passes AA at these sizes; solid mint CTA uses
  `accent-ink`.
- Reduced motion removes scroll transforms and parks the van at the end.

## Tokens used

Gradient `accent-soft/90 → background`; fills `accent/22%`, `accent-strong/30%`,
`foreground`; route and van accents from `accent` / `accent-strong`; text
`foreground` / `muted-foreground` / `accent-strong` / `accent-ink` on `accent`.
Radius `rounded` (4px). No shadows.
