"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { ArrowRightIcon } from "@/components/icons";
import { authLinks } from "@/lib/nav";

/** House ease — the same curve the header, hero, and footer use. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70";

const cards = [
  {
    title: "Know exactly what you pay",
    body: "Transparent rates with no hidden costs.",
    action: "Pricing",
    href: "/pricing",
  },
  {
    title: "Start integrating now",
    body: "Up and running with Zineps in 10 minutes.",
    action: "Integrations",
    href: "/integrations",
  },
] as const;

/**
 * The closing call to action — a dark ink panel in the Linear manner:
 * centered promise, dual CTAs, and the pricing/integrations cards as
 * minimal bordered rows under a faint mint glow.
 */
export function FinalCta() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 24 };
  const reveal = { opacity: 1, y: 0 };

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-foreground text-background"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_0%,rgb(var(--accent)/0.16),transparent)]"
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-6 py-24 text-center md:py-20">
        <motion.div
          initial={initial}
          whileInView={reveal}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col items-center"
        >
          <h2
            id="final-cta-heading"
            className="max-w-[640px] text-balance text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[32px] sm:text-[28px]"
          >
            Ready to get started?
          </h2>
          <p className="mt-5 max-w-[560px] text-[15.5px] leading-relaxed text-background/70">
            Create an account to get going right away, or talk to us about a
            tailored solution for your business.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={authLinks.signIn}
              className={`inline-flex min-h-[44px] items-center rounded bg-accent px-6 text-[15px] font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent/90 active:scale-[0.98] ${focusRing}`}
            >
              Start your trial
            </Link>
            <Link
              href="/contact"
              className={`inline-flex min-h-[44px] items-center rounded border border-background/25 px-6 text-[15px] font-medium transition-colors duration-200 hover:border-accent hover:text-accent ${focusRing}`}
            >
              Contact us
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={initial}
          whileInView={reveal}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mx-auto mt-14 grid max-w-[880px] grid-cols-2 gap-3 text-left sm:grid-cols-1"
        >
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`group flex items-center justify-between gap-6 rounded border border-background/15 bg-background/[0.03] p-6 transition-colors duration-200 hover:border-accent/60 ${focusRing}`}
            >
              <span>
                <span className="block text-[16px] font-semibold">
                  {card.title}
                </span>
                <span className="mt-1.5 block text-[14px] leading-relaxed text-background/60">
                  {card.body}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
                  {card.action}
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
