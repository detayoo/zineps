"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { PlusIcon } from "@/components/icons";

/** House ease — the same curve the rest of the page uses. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40";

const capabilities = [
  {
    title: "Publish rates and terms",
    body: "Put your full rate card and conditions online once — merchants always see current pricing, and you never resend a spreadsheet.",
  },
  {
    title: "Manage contracts, customer groups, and margins",
    body: "Group customers, set margins per lane, and keep every contract versioned in one place instead of across inboxes.",
  },
  {
    title: "Invoice automatically per customer or shipment",
    body: "Invoices generate themselves per customer or per shipment — no manual billing runs at month end.",
  },
  {
    title: "Onboard your existing merchants onto Zineps",
    body: "Invite the merchants you already serve. They ship inside Zineps while they stay your customers.",
  },
  {
    title: "Keep the commercial relationship",
    body: "You stay the face to your customer — Zineps stays the infrastructure underneath.",
  },
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const panelId = useId();

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
            {capabilities.map((capability, index) => {
              const expanded = openIndex === index || hoverIndex === index;
              return (
                <li
                  key={capability.title}
                  className="border-b border-border"
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`${panelId}-${index}`}
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className={`flex w-full items-center gap-4 py-4 text-left ${focusRing} rounded`}
                  >
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-sm bg-foreground"
                    />
                    <span className="flex-1 text-[15.5px] font-medium text-foreground">
                      {capability.title}
                    </span>
                    <PlusIcon
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                        expanded ? "rotate-45 text-accent-strong" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        id={`${panelId}-${index}`}
                        initial={{ height: reduce ? "auto" : 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[58ch] pb-5 pl-6 pr-4 text-[14.5px] leading-relaxed text-muted-foreground">
                          {capability.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
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
