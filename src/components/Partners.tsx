"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/** House ease — the same curve the rest of the page uses. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40";

const capabilities = [
  "Publish rates and terms",
  "Manage contracts, customer groups, and margins",
  "Invoice automatically per customer or shipment",
  "Onboard your existing merchants onto Zineps",
  "Keep the commercial relationship",
] as const;

const builtFor = [
  "Logistics service providers",
  "Freight forwarders",
  "3PLs",
] as const;

/**
 * For logistics partners — the operating-system pitch, from the reference's
 * partner section. Heading and CTA on the left, capability checklist and
 * built-for chips on the right.
 */
export function Partners() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 24 };

  return (
    <section
      aria-labelledby="partners-heading"
      className="border-t border-border bg-background"
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-12 gap-10 px-6 py-24 md:py-20">
        <motion.div
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="col-span-5 lg:col-span-full"
        >
          <p className="inline-flex items-center gap-2 rounded border border-border bg-accent-soft px-3 py-1.5 text-[13px] font-semibold text-accent-strong">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-sm bg-accent-strong"
            />
            For logistics partners
          </p>
          <h2
            id="partners-heading"
            className="mt-6 text-balance text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[28px]"
          >
            The operating system for logistics service providers
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
            Publish rates, manage contracts and margins, invoice, handle
            support, and onboard the merchants you already serve. They ship in
            Zineps. You keep the commercial relationship.
          </p>
          <Link
            href="/logistics-operating-system"
            className={`mt-8 inline-flex min-h-[44px] items-center rounded bg-accent px-6 text-[15px] font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-strong hover:text-background active:scale-[0.98] ${focusRing}`}
          >
            Become a partner
          </Link>
        </motion.div>

        <motion.div
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="col-span-7 lg:col-span-full"
        >
          <ul className="border-t border-border">
            {capabilities.map((capability) => (
              <li
                key={capability}
                className="flex items-center gap-4 border-b border-border py-4"
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-sm bg-accent-strong"
                />
                <p className="text-[15.5px] text-foreground">{capability}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <p className="mr-1 text-[13px] font-semibold text-muted-foreground">
              Built for:
            </p>
            {builtFor.map((audience) => (
              <span
                key={audience}
                className="rounded border border-border px-3 py-1.5 text-[13px] font-medium text-foreground/80"
              >
                {audience}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
