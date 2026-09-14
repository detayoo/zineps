# AGENTS.md — zineps

Read this before changing anything. It governs the repo.

## What this is

A revamp of zineps.com. Content lives in `docs/zineps-content.md`; read it before
writing copy. The design language is defined by the tokens in
`src/app/globals.css` and the Tailwind config.

## Stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind v3.4 — tokens are CSS custom properties consumed via
  `tailwind.config.ts`
- Framer Motion for all motion

## Non-negotiables

1. **No hardcoded colors.** Use the tokens (`bg-background`, `text-muted-foreground`,
   `bg-accent`, `border-border`, ...). Raw brand values live only in
   `globals.css`. Never `#fff`, `white`, `black`, or arbitrary hex in components.
2. **Radius is 4px.** The Tailwind `borderRadius` scale is overridden in
   `tailwind.config.ts`, so every `rounded-*` utility resolves to 4px. Do not
   reintroduce pills or large radii.
3. **Flush hover surfaces.** Dropdown panels have no padding and no border — rows
   run edge to edge. Borderless floating panels may use a soft shadow for
   separation; this is the *only* sanctioned shadow.
4. **Desktop-first breakpoints.** Every breakpoint except `2xl` is a max-width
   override. Write base (desktop) styles first, then override downward.
5. **Variant architecture for sections.** Anything that differs structurally per
   theme gets `ComponentName/index.tsx` + `variants/ComponentNameVariantN.tsx`.
   Ternaries are for small style/visibility tweaks only. The `variant` union is
   always `"one" | "two" | "three" | "four"`; the resolver falls back to `one`.
6. **Interactive primitives own their own state.** Dropdowns, the language
   picker and the mobile overlay are self-contained components. `useHeader` holds
   only page-level state (scroll, overlay visibility, scroll lock).
7. **Accessibility.** Disclosure pattern (`aria-expanded` + `aria-controls`) for
   dropdowns, `role="dialog" aria-modal="true"` + focus trap for the overlay,
   `focus-visible` rings on everything interactive, `Escape` closes.

## House motion

- House ease: `cubic-bezier(0.16, 1, 0.3, 1)` — exported as `EASE` from
  `src/components/Header/motion.ts` and as `ease-zineps` in Tailwind.
- Keep interaction durations ≤ 300ms. Entrance animations may be longer.
- Animate `transform` / `opacity` only.

## Definition of done

- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] keyboard navigation + focus-visible verified
- [ ] tokens only — no raw hex, no shadows
- [ ] docs updated if content or concept changes

## Git

Do not commit, push or open PRs unless explicitly asked.
