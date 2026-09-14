"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { ArrowRightIcon } from "@/components/icons";
import { authLinks } from "@/lib/nav";

/** House ease — the same curve the rest of the page uses. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40";

const stats = [
  { value: "50+", label: "logistics partners" },
  { value: "1,000+", label: "shipping methods" },
  { value: "200+", label: "countries served" },
  { value: "99.9%", label: "uptime guarantee" },
] as const;

const features = [
  {
    title: "One platform for everything",
    body: "Manage all your shipments, returns, and logistics from one central hub — no juggling multiple systems.",
  },
  {
    title: "Fast integrations",
    body: "Connect your webshop, WMS, or other systems within minutes, via the dashboard or our extensive API.",
  },
  {
    title: "Analytics",
    body: "Track shipping performance in real time and get the insights to optimize logistics and cut costs.",
  },
  {
    title: "Global coverage",
    body: "Ship to 200+ countries with access to all major carriers and local transporters worldwide.",
  },
  {
    title: "Scalability & uptime",
    body: "Enterprise-grade reliability with a 99.9% uptime guarantee — the platform scales with your growth, at any volume.",
  },
] as const;

/**
 * Why Zineps — "everything you need for successful shipments": heading,
 * ruled stats strip, five feature cells, and a mint cell closing to signup.
 */
export function WhyZineps() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 24 };

  return (
    <section
      aria-labelledby="why-zineps-heading"
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
            id="why-zineps-heading"
            className="text-balance text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[28px]"
          >
            Everything you need for successful shipments
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
            One platform for everything that makes shipping work — from label
            to return, from insight to scale.
          </p>
        </motion.div>

        <motion.dl
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
          className="mt-12 grid grid-cols-4 divide-x divide-border rounded border border-border lg:grid-cols-2 lg:divide-x-0 sm:grid-cols-1"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col px-6 py-6">
              <dt className="order-2 mt-1 text-[13.5px] text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="order-1 text-[30px] font-semibold tracking-[-0.01em] text-foreground">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.ul
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-3 grid grid-cols-3 gap-3 lg:grid-cols-2 sm:grid-cols-1"
        >
          {features.map((feature) => (
            <li
              key={feature.title}
              className="rounded border border-border bg-background p-7"
            >
              <h3 className="text-[17px] font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                {feature.body}
              </p>
            </li>
          ))}
          <li className="rounded bg-accent p-7 transition-colors duration-200 hover:bg-accent-strong">
            <Link
              href={authLinks.signIn}
              className={`group flex h-full flex-col justify-between gap-6 ${focusRing} rounded`}
            >
              <span className="text-[17px] font-semibold text-accent-ink transition-colors duration-200 group-hover:text-background">
                See it in your workflow
              </span>
              <span className="inline-flex items-center gap-1.5 text-[14.5px] font-medium text-accent-ink transition-colors duration-200 group-hover:text-background">
                Start shipping
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        </motion.ul>
      </div>
    </section>
  );
}
