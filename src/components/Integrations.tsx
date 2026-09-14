"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { ArrowRightIcon } from "@/components/icons";

/** House ease — the same curve the rest of the page uses. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40";

const platforms = [
  "Shopify",
  "WooCommerce",
  "Bol.com",
  "Amazon",
  "PostNL",
  "DHL",
  "DPD",
  "UPS",
  "FedEx",
  "GLS",
  "Magento",
  "Correos",
  "Bpost",
  "Temu",
  "DB Schenker",
  "CCV Shop",
  "SnelStart",
  "Exact",
] as const;

/**
 * Integrations — "100+ integrations" with a ruled wall of platform names,
 * from the reference's integration marquee. Text set in place of logo assets.
 */
export function Integrations() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 24 };

  return (
    <section
      aria-labelledby="integrations-heading"
      className="border-t border-border bg-background"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 py-24 md:py-20">
        <motion.div
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-[620px]">
            <h2
              id="integrations-heading"
              className="text-balance text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[28px]"
            >
              100+ integrations
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
              Connect Zineps effortlessly with popular marketplaces,
              e-commerce platforms, and logistics partners. Streamline your
              workflow, cut shipping costs, and give your customers a seamless
              shipping experience.
            </p>
          </div>
          <Link
            href="/integrations"
            className={`group inline-flex items-center gap-1.5 text-[14.5px] font-medium text-accent-strong ${focusRing} rounded`}
          >
            View integrations
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.ul
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-12 grid grid-cols-6 gap-px overflow-hidden rounded border border-border bg-border lg:grid-cols-4 sm:grid-cols-2"
        >
          {platforms.map((platform) => (
            <li
              key={platform}
              className="flex h-[72px] items-center justify-center bg-background px-4 text-center text-[15px] font-semibold text-muted-foreground transition-colors duration-200 hover:bg-accent-soft hover:text-accent-ink"
            >
              {platform}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
