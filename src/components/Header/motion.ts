import type { Transition } from "framer-motion";

/** The house ease — fast start, soft settle. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Shared transition for every dropdown panel. */
export const dropdownTransition: Transition = {
  duration: 0.2,
  ease: EASE,
};

/**
 * Origin-top unroll — the panel unfolds out of the trigger.
 * Pair with `origin-top` on the animated element.
 */
export const dropdownMotion = {
  initial: { opacity: 0, scaleY: 0 },
  animate: { opacity: 1, scaleY: 1 },
  exit: { opacity: 0, scaleY: 0 },
} as const;

/** Reduced-motion fallback: fade only, no unroll. */
export const reducedDropdownMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;
