"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/** House ease — the same curve the rest of the page uses. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40";

const stats = [
  {
    target: 20,
    format: (value: number) => `+${value}`,
    label: "shipping partners",
  },
  {
    target: 200,
    format: (value: number) => `+${value}`,
    label: "destination countries",
  },
  {
    target: 1000,
    format: (value: number) => `+${value.toLocaleString("en-US")}`,
    label: "shipping methods",
  },
] as const;

function StatRow({
  target,
  format,
  label,
}: {
  target: number;
  format: (value: number) => string;
  label: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      viewport={{ once: true, margin: "-80px" }}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="group flex flex-col gap-2 bg-background p-8"
    >
      <dt className="order-3 text-[15px] text-muted-foreground">{label}</dt>
      <dd className="order-1 origin-bottom-left text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums text-foreground transition-transform duration-300 motion-safe:group-hover:-rotate-2">
        {format(target)}
      </dd>
    </motion.div>
  );
}

/**
 * Partner shipping rates — "their buying power becomes yours". Pitch and
 * CTAs up top, then three huge count-up stats ruled across the full width.
 */
export function PartnerRates() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 24 };

  return (
    <section
      aria-labelledby="partner-rates-heading"
      className="border-t border-border bg-background"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 py-24 md:py-20">
        <motion.div
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[680px]"
        >
          <p className="inline-flex items-center gap-2 rounded border border-border bg-accent-soft px-3 py-1.5 text-[13px] font-semibold text-accent-strong">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-sm bg-accent-strong"
            />
            Partner shipping rates
          </p>
          <h2
            id="partner-rates-heading"
            className="mt-6 text-balance text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[28px]"
          >
            Their buying power becomes yours
          </h2>
          <p className="mt-4 max-w-[56ch] text-[15.5px] leading-relaxed text-muted-foreground">
            Logistics partners on Zineps already hold high-volume deals with
            DHL, PostNL, DPD, and dozens more. We match you with the partner
            whose lanes fit your shop. Use partner rates, your own contracts,
            or both — from one dashboard.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="https://app.zineps.com/Account/Register/new/7/SD"
              className={`inline-flex min-h-[44px] items-center rounded bg-accent px-6 text-[15px] font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-strong hover:text-background active:scale-[0.98] ${focusRing}`}
            >
              Start free
            </Link>
            <Link
              href="/pricing#partner-rates"
              className={`inline-flex min-h-[44px] items-center rounded border border-border bg-background px-6 text-[15px] font-medium text-foreground transition-colors duration-200 hover:border-accent-strong hover:text-accent-strong ${focusRing}`}
            >
              How partner rates work
            </Link>
          </div>
        </motion.div>

        <dl className="mt-16 grid grid-cols-3 gap-px overflow-hidden rounded border border-border bg-border lg:grid-cols-1">
          {stats.map((stat) => (
            <StatRow
              key={stat.label}
              target={stat.target}
              format={stat.format}
              label={stat.label}
            />
          ))}
        </dl>
      </div>
    </section>
  );
}
