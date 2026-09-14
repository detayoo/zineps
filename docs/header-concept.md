# Header Concept — "The Capsule"

Variant one of the zineps header. A revamp that borrows the *feel* of the
Makesales `HeaderVariantOne` (x-itaja) — a floating, centered bar that hovers
over the page — and adapts it to zineps' content weight (5 nav items, 2
dropdowns, a language switcher and an auth CTA).

> **Language:** the UI is English-first for now. The live site is Dutch-first
> with an EN / DE / ES switcher; the switcher is in place, only the default copy
> has changed.

> **Radius:** 4px for everything. The Tailwind `borderRadius` scale is overridden
> so every `rounded-*` utility resolves to 4px. No pills.

---

## Why this concept

The Makesales bar is compact: logo · search · a few icons. Zineps' nav is much
heavier, so a literal copy would either overflow or force everything into a
hamburger — losing the "sleek floating bar" benefit. The Capsule keeps the
signature of the reference (centered, floating, hairline border, soft entrance)
but widens the container to `max-w-[1200px]` so the full nav can live inline on
desktop.

The result: still unmistakably a floating bar, but one that fits a B2B SaaS site
rather than a storefront.

---

## Anatomy

```
┌──────────────────────────────────────────────────────────────────────┐
│  zineps      Products ▾  Integrations  Pricing  Blog  KB ▾   🇬🇧 EN  Sign up │
└──────────────────────────────────────────────────────────────────────┘
     logo            primary nav (center)                     utilities + CTA
```

- **Bar** — fixed, centered, `h-14`, 4px radius, hairline border that fades in on
  scroll.
- **Logo** — zineps wordmark + mint orbit mark. Wordmark inherits `currentColor`
  so it flips with the theme; the mark stays mint.
- **Primary nav** — text links and two disclosure dropdowns. Each row is
  `h-full`, so the hover fill runs edge to edge (top and bottom) of the bar.
- **Utilities** — language switcher (flag + code, right-aligned panel).
- **CTA** — `Sign up`, the brand mint fill. The one saturated element in the bar.
- **Mobile** — below `lg`, nav + utilities collapse into a hamburger that opens a
  full-screen overlay.

### Flush surfaces

Dropdown panels carry **no padding and no border**. Rows fill the panel edge to
edge, so a hovered row touches the panel walls. Definition comes from the solid
background plus a soft shadow — a borderless floating menu needs *some*
separation from a white page. This is the one deliberate shadow in the app; see
`AGENTS.md`.

---

## States

| State | Trigger | Change |
|-------|---------|--------|
| **Resting** | top of page | transparent border, `bg-background/60` + `backdrop-blur-md` |
| **Scrolled** | `scrollY > 12` | hairline `border-border` fades in, `bg-background/85` + `backdrop-blur-xl` |
| **Nav hover** | pointer over a nav row | row fills the full bar height, `bg-muted` |
| **Dropdown open** | hover / click / focus | panel fades + rises 6px + scales `0.98 → 1`; rows flush |
| **Mobile open** | hamburger | full-screen overlay, items stagger in |

---

## Motion

- **Entrance:** `y: -24 → 0`, `opacity: 0 → 1`, `700ms`, house ease.
- **Dropdown:** `180ms`, `opacity / y:6 / scale:0.98`, house ease.
- **Accordion (mobile):** height auto, `280ms`.
- **Overlay:** `y: -12 → 0`, `opacity`, `280ms`.
- **Mobile list:** `45ms` stagger, `400ms` per item.
- **House ease:** `cubic-bezier(0.16, 1, 0.3, 1)` — exported as `EASE` and
  exposed to Tailwind as `ease-zineps`.

All durations stay under 300ms except the entrance, so interactions feel
immediate.

---

## Responsive (desktop-first)

Breakpoints are **max-width** (see `tailwind.config.ts`), so base styles target
desktop and override downward.

| Width | Layout |
|-------|--------|
| `> 1180px` | full bar: logo · nav · language · CTA |
| `≤ 1180px` (`lg`) | logo · hamburger → full-screen overlay |
| `≤ 640px` (`sm`) | bar padding tightens |

---

## Accessibility

- Nav is a `<nav aria-label="Main navigation">`; dropdown triggers are `<button>`
  with `aria-expanded` + `aria-controls` (disclosure pattern, not `role="menu"`).
- Dropdowns open on hover, click and keyboard; close on `Escape`, blur-out and
  outside click.
- Mobile overlay is `role="dialog" aria-modal="true"`, focuses the close button
  on open, traps `Tab`, restores scroll on close, and closes on `Escape`.
- Every interactive element has a `focus-visible` ring, inset so it sits inside
  flush surfaces.
- Body scroll locks while the overlay is open.
- Mint CTA uses `accent-ink` (`#123A34`) on mint (`#70CAB9`) ≈ 5.2:1 — passes
  WCAG AA for body text.

---

## Tokens used

Defined in `src/app/globals.css`, mapped in `tailwind.config.ts` as RGB channels
so opacity modifiers work.

| Token | Value | Role |
|-------|-------|------|
| `--background` | `#FFFFFF` | bar + panel surface |
| `--foreground` | `#0B1210` | text, logo |
| `--muted` | `#F3F7F6` | hover fills |
| `--muted-foreground` | `#5A6B66` | secondary text |
| `--border` | `#E2EBE8` | hairlines |
| `--accent` | `#70CAB9` | CTA, logo mark |
| `--accent-strong` | `#0F7F75` | badges, focus ring |
| `--accent-soft` | `#E6FAF5` | badge surfaces |
| `--accent-ink` | `#123A34` | text on mint |

Dark-mode values live in `.dark`; components never branch on `dark:` — the
tokens flip.

---

## File map

```
src/components/Header/
├── index.tsx                      resolver — variant "one" (fallback-safe)
├── useHeader.ts                   scroll state + mobile open + scroll lock
├── motion.ts                      house ease + shared dropdown motion
├── HeaderDropdown.tsx             nav group disclosure
├── LanguageSwitcher.tsx           language picker
├── MobileMenu.tsx                 full-screen overlay
└── variants/
    └── HeaderVariantOne.tsx       "The Capsule"
```

---

## Deliberate deviations from the x-itaja pattern

1. **Wider bar.** `max-w-2xl` → `max-w-[1200px]` to fit the full nav inline.
2. **4px radius everywhere.** Pills and large radii are gone; the scale is
   overridden in `tailwind.config.ts`.
3. **Flush dropdown rows.** No panel padding, no panel border — rows touch the
   walls; a soft shadow gives the borderless panel definition.
4. **Interactive primitives are their own components.** `HeaderDropdown`,
   `LanguageSwitcher` and `MobileMenu` own their open/close state instead of
   routing it through `useHeader`.
5. **RGB-channel tokens.** So `bg-background/85` and friends work.

---

## Next

- Additional variants (`two`, `three`) can be added under `variants/`; the
  resolver already falls back to `one`.
- Hero, logo marquee and the announcement bar are the natural next sections.
