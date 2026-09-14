# Header Concept — "The Capsule"

Variant one of the zineps header. A revamp that borrows the *feel* of the
Makesales `HeaderVariantOne` (x-itaja) — a floating, centered pill that hovers
over the page — and adapts it to zineps' content weight (5 nav items, 2
dropdowns, a language switcher and an auth CTA).

Reference: `x-itaja/src/components/Header/variants/HeaderVariantOne.tsx`.

---

## Why this concept

The Makesales pill is compact: logo · search · a few icons. Zineps' nav is much
heavier, so a literal copy would either overflow or force everything into a
hamburger — losing the "sleek floating bar" benefit. The Capsule keeps the
signature of the reference (centered, rounded-full, floating, hairline border,
soft entrance) but widens the container to `max-w-[1200px]` so the full nav can
live inline on desktop.

The result: still unmistakably a floating pill, but one that fits a B2B SaaS
site rather than a storefront.

---

## Anatomy

```
┌──────────────────────────────────────────────────────────────────────┐
│  zineps      Producten ▾  Integraties  Prijzen  Blog  KB ▾   🇳🇱 NL  Aanmelden │
└──────────────────────────────────────────────────────────────────────┘
     logo            primary nav (center)                     utilities + CTA
```

- **Logo** — zineps wordmark + mint orbit mark. Wordmark inherits `currentColor`
  so it flips with the theme; the mark stays mint.
- **Primary nav** — text links and two disclosure dropdowns. Hover/focus opens a
  panel; no page navigation on the trigger.
- **Utilities** — language switcher (flag + code, right-aligned panel).
- **CTA** — `Aanmelden`, the brand mint pill. The one saturated element in the
  bar, so the eye lands there.
- **Mobile** — below `lg`, nav + utilities collapse into a hamburger that opens a
  full-screen overlay.

---

## States

| State | Trigger | Change |
|-------|---------|--------|
| **Resting** | top of page | transparent border, `bg-background/60` + `backdrop-blur-md` |
| **Scrolled** | `scrollY > 12` | hairline `border-border` fades in, `bg-background/85` + `backdrop-blur-xl` |
| **Dropdown open** | hover / click / focus | panel fades + rises 6px + scales `0.98 → 1` |
| **Mobile open** | hamburger | full-screen overlay, items stagger in |

The resting→scrolled transition is deliberately the only chrome change: the bar
stays a pill, it just gains definition once content scrolls under it.

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
| `> 1180px` | full capsule: logo · nav · language · CTA |
| `≤ 1180px` (`lg`) | logo · hamburger → full-screen overlay |
| `≤ 640px` (`sm`) | capsule padding tightens |

---

## Accessibility

- Nav is a `<nav aria-label="Hoofdnavigatie">`; dropdown triggers are `<button>`
  with `aria-expanded` + `aria-controls` (disclosure pattern, not `role="menu"`).
- Dropdowns open on hover, click and keyboard; close on `Escape`, blur-out and
  outside click.
- Mobile overlay is `role="dialog" aria-modal="true"`, focuses the close button
  on open, traps `Tab`, restores scroll on close, and closes on `Escape`.
- Every interactive element has a `focus-visible` ring.
- Body scroll locks while the overlay is open.
- Mint CTA uses `accent-ink` (`#123A34`) on mint (`#70CAB9`) ≈ 5.2:1 — passes
  WCAG AA for body text.

---

## Tokens used

Defined in `src/app/globals.css`, mapped in `tailwind.config.ts` as RGB channels
so opacity modifiers work.

| Token | Value | Role |
|-------|-------|------|
| `--background` | `#FFFFFF` | bar surface |
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

1. **Wider pill.** `max-w-2xl` → `max-w-[1200px]` to fit the full nav inline.
2. **Interactive primitives are their own components.** `HeaderDropdown`,
   `LanguageSwitcher` and `MobileMenu` own their open/close state instead of
   routing it through `useHeader`. Keeps `useHeader` to page-level concerns
   (scroll, overlay) and avoids threading four dropdown states through props.
3. **No shadows.** Elevation is the hairline border + backdrop blur, per the
   design-system rule.
4. **RGB-channel tokens.** So `bg-background/85` and friends work.

---

## Next

- Additional variants (`two`, `three`) can be added under `variants/`; the
  resolver already falls back to `one`.
- Hero, logo marquee and the announcement bar are the natural next sections.
