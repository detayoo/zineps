import type { Transition } from "framer-motion";

/** The house ease — fast start, soft settle. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Shared transition for every dropdown panel. */
export const dropdownTransition: Transition = {
  duration: 0.18,
  ease: EASE,
};

export const dropdownMotion = {
  initial: { opacity: 0, y: 6, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 4, scale: 0.98 },
} as const;
