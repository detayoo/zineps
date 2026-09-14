"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { ArrowRightIcon } from "@/components/icons";

/** House ease — the same curve the rest of the page uses. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40";

const panels = [
  {
    tag: "E-commerce",
    title: "Smart shipping, from label to return",
    body: "Less manual work, lower shipping costs, faster fulfilment, faster return handling — and happier customers.",
    points: [
      "Automatic carrier selection by price and speed",
      "Label generation",
      "Pickup & returns management",
      "Dynamic checkout integrations",
      "Your own contracts or the partner network",
      "Branded tracking, packing slips, and returns portal",
    ],
    idealFor: ["E-commerce retailers", "Online stores", "Dropshipping"],
    action: "Learn more",
    href: "/shipping",
  },
  {
    tag: "B2B shipping",
    title: "Ship your business consignments",
    body: "More revenue per vehicle, less planning and admin. New customers, a better-used transport network, and less support overhead.",
    points: [
      "Offer business shipping via Zineps",
      "Manage loading orders, shipments, and pickups",
      "Connect your ERP systems or use our APIs",
      "Address validation engine",
      "Tracking & trace and performance dashboards",
    ],
    idealFor: ["Wholesale distributors", "Factories", "B2B suppliers"],
    action: "Learn more",
    href: "/logistics-operating-system",
  },
] as const;

/**
 * Automate shipping & B2B transport — the reference's twin panels for
 * e-commerce fulfilment and business consignments, English-first.
 */
export function Automate() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 24 };

  return (
    <section
      aria-labelledby="automate-heading"
      className="border-t border-border bg-background"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 py-24 md:py-20">
        <motion.div
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[640px]"
        >
          <h2
            id="automate-heading"
            className="text-balance text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[28px]"
          >
            Automate shipping and B2B transport
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
            One flow for parcels and pallets — built for the way each side of
            your business actually ships.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-1">
          {panels.map((panel, index) => (
            <motion.article
              key={panel.tag}
              aria-labelledby={`automate-${index}`}
              initial={initial}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.1 }}
              className="flex flex-col rounded border border-border bg-background p-8"
            >
              <p className="inline-flex w-fit items-center gap-2 rounded border border-border bg-accent-soft px-3 py-1.5 text-[13px] font-semibold text-accent-strong">
                {panel.tag}
              </p>
              <h3
                id={`automate-${index}`}
                className="mt-5 text-[22px] font-semibold leading-snug text-foreground"
              >
                {panel.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                {panel.body}
              </p>
              <ul className="mt-6 flex flex-col gap-2.5 border-t border-border pt-6">
                {panel.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-sm bg-foreground"
                    />
                    <p className="text-[14.5px] leading-relaxed text-foreground/90">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <p className="mr-1 text-[13px] font-semibold text-muted-foreground">
                  Ideal for:
                </p>
                {panel.idealFor.map((audience) => (
                  <span
                    key={audience}
                    className="rounded border border-border px-3 py-1.5 text-[13px] font-medium text-foreground/80"
                  >
                    {audience}
                  </span>
                ))}
              </div>
              <Link
                href={panel.href}
                className={`group mt-7 inline-flex w-fit items-center gap-1.5 text-[14.5px] font-medium text-accent-strong ${focusRing} rounded`}
              >
                {panel.action}
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
