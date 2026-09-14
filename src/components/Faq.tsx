"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { ArrowRightIcon, PlusIcon } from "@/components/icons";

/** House ease — the same curve the rest of the page uses. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40";

const faqs = [
  {
    question: "What exactly is Zineps?",
    answer:
      "Zineps is an AI-driven platform that connects e-commerce with logistics partners. Webshops automate their shipping process, and carriers manage their customers through the Partner Panel — all inside one platform.",
  },
  {
    question: "Who is Zineps for?",
    answer:
      "Both e-commerce businesses and logistics partners. Webshops cut shipping costs and automate their processes; carriers and brokers offer their services through our platform and manage everything centrally.",
  },
  {
    question: "Do I need a shipping contract already?",
    answer:
      "No. You can connect your own contracts, or take advantage of competitive rates from our connected partners.",
  },
  {
    question: "Which systems does Zineps integrate with?",
    answer:
      "Zineps integrates seamlessly with Shopify, WooCommerce, Bol.com, Amazon, Exact, Lightspeed and many more — plus APIs for custom integrations.",
  },
  {
    question: "What does using Zineps cost?",
    answer:
      "Zineps uses a transparent SaaS model with optional per-shipment costs, and flexible plans tailored to your user type.",
  },
  {
    question: "How fast can I start?",
    answer:
      "Within minutes. Connect your shop or register as a partner, and start shipping — or offering your logistics services — right away.",
  },
] as const;

/**
 * Frequently asked questions — sticky heading on the left, numbered
 * accordion on the right. First item open by default.
 */
export function Faq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);
  const panelId = useId();

  return (
    <section
      aria-labelledby="faq-heading"
      className="border-t border-border bg-background"
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-12 gap-10 px-6 py-24 md:py-20">
        <div className="col-span-4 lg:col-span-full">
          <div className="lg:sticky lg:top-24">
            <h2
              id="faq-heading"
              className="text-balance text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[28px]"
            >
              Frequently asked questions
            </h2>
            <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-muted-foreground">
              The essentials on Zineps and our platform.
            </p>
            <Link
              href="/contact"
              className={`group mt-6 inline-flex items-center gap-1.5 text-[14.5px] font-medium text-accent-strong ${focusRing} rounded`}
            >
              Still curious? Contact us
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="col-span-8 lg:col-span-full">
          <ul className="border-t border-border">
            {faqs.map((faq, index) => {
              const isOpen = open === index;
              return (
                <li key={faq.question} className="border-b border-border">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${panelId}-${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className={`flex w-full items-center gap-5 py-5 text-left transition-colors duration-200 hover:bg-accent-soft/60 ${focusRing} rounded`}
                  >
                    <span className="w-8 shrink-0 text-[13px] font-semibold tabular-nums text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[16.5px] font-medium text-foreground">
                      {faq.question}
                    </span>
                    <PlusIcon
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-accent-strong" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${panelId}-${index}`}
                        initial={{ height: reduce ? "auto" : 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[62ch] pb-6 pl-[52px] pr-4 text-[15px] leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
