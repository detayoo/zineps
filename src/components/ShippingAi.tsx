"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { ArrowRightIcon } from "@/components/icons";

/** House ease — the same curve the rest of the page uses. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40";

const promises = [
  "Predict delays",
  "Choose better routes",
  "Pay less",
] as const;

/**
 * Shipping AI — the intelligence pitch on a mint-tinted band, from the
 * reference's "Voorspel vertragingen…". The tint marks it as a product
 * moment between the white sections.
 */
export function ShippingAi() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 24 };

  return (
    <section
      aria-labelledby="shipping-ai-heading"
      className="border-t border-border bg-accent-soft/50"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 py-24 md:py-20">
        <motion.div
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto flex max-w-[680px] flex-col items-center text-center"
        >
          <p className="inline-flex items-center gap-2 rounded border border-border bg-background px-3 py-1.5 text-[13px] font-semibold text-accent-strong">
            Shipping AI
            <span className="rounded bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-strong">
              Beta
            </span>
          </p>
          <h2
            id="shipping-ai-heading"
            className="mt-6 text-balance text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[28px]"
          >
            Predict delays. Choose better routes. Pay less.
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
            Shipping AI is the intelligence in the layer. It recommends the
            better carrier, route, and rate for every shipment.
          </p>
          <Link
            href="/ai-shipping-intelligence"
            className={`group mt-8 inline-flex min-h-[44px] items-center gap-2 rounded bg-accent-strong px-6 text-[15px] font-semibold text-background transition-colors duration-200 hover:bg-accent-ink active:scale-[0.98] ${focusRing}`}
          >
            Discover Shipping AI
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.ul
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mx-auto mt-12 grid max-w-[880px] grid-cols-3 gap-px overflow-hidden rounded border border-border bg-border sm:grid-cols-1"
        >
          {promises.map((promise) => (
            <li
              key={promise}
              className="flex items-center justify-center bg-background px-4 py-5 text-center text-[15px] font-semibold text-foreground"
            >
              {promise}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
