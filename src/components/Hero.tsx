"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

import { ArrowRightIcon } from "@/components/icons";
import { authLinks } from "@/lib/nav";

/** House ease — the same curve the header uses, so both move as one. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40";

const phases = ["Labels", "Tracking", "Returns", "Analytics"] as const;

/**
 * Immersive scroll hero: a pinned full-viewport logistics landscape.
 * Scrolling parallaxes three brand layers, draws the shipment route, and
 * carries the headline away while the phase legend resolves at the bottom.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [phase, setPhase] = useState(0);
  const activePhase = reduce ? -1 : phase;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduce) return;
    const next = value < 0.25 ? 0 : value < 0.5 ? 1 : value < 0.75 ? 2 : 3;
    setPhase((previous) => (previous === next ? previous : next));
  });

  const skyDrift = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const farHills = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const midHills = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const nearGround = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const copyRise = useTransform(scrollYProgress, [0, 0.5], ["0%", "-28%"]);
  const copyFade = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const routeDraw = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.06,
        delayChildren: 0.05,
      },
    },
  };
  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative h-[220svh] bg-background"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden bg-gradient-to-b from-accent-soft/90 via-background to-background">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <motion.div
            style={reduce ? undefined : { y: skyDrift }}
            className="absolute inset-x-0 top-0 h-[46svh] bg-gradient-to-b from-accent-soft to-transparent"
          />
          <motion.svg
            style={reduce ? undefined : { y: farHills }}
            viewBox="0 0 1440 300"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-[16svh] h-[34svh] w-full"
          >
            <path
              d="M-40 240 L180 120 L340 200 L560 90 L780 210 L1020 110 L1240 210 L1480 130 L1480 300 L-40 300 Z"
              fill="rgb(var(--accent))"
              fillOpacity={0.22}
            />
          </motion.svg>
          <motion.svg
            style={reduce ? undefined : { y: midHills }}
            viewBox="0 0 1440 300"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-[7svh] h-[30svh] w-full"
          >
            <path
              d="M-40 220 C200 170 320 250 540 190 C760 130 900 240 1120 190 C1280 155 1380 205 1480 180 L1480 300 L-40 300 Z"
              fill="rgb(var(--accent-strong))"
              fillOpacity={0.3}
            />
          </motion.svg>
          <motion.svg
            viewBox="0 0 1440 420"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-x-0 top-[30svh] h-[34svh] w-full"
          >
            <motion.path
              d="M-20 340 C 280 260, 520 370, 760 270 C 1000 170, 1220 250, 1460 190"
              fill="none"
              stroke="rgb(var(--accent-strong))"
              strokeWidth={3}
              strokeLinecap="round"
              style={{ pathLength: reduce ? 1 : routeDraw }}
            />
            <circle cx="18" cy="332" r="7" fill="rgb(var(--accent-strong))" />
            <circle
              cx="1422"
              cy="198"
              r="7"
              fill="rgb(var(--background))"
              stroke="rgb(var(--accent-strong))"
              strokeWidth={3}
            />
          </motion.svg>
          <motion.svg
            style={reduce ? undefined : { y: nearGround }}
            viewBox="0 0 1440 240"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-[16svh] w-full"
          >
            <path
              d="M-40 170 C220 120 360 190 580 155 C800 120 940 190 1160 155 C1300 135 1400 160 1480 150 L1480 240 L-40 240 Z"
              fill="rgb(var(--foreground))"
            />
          </motion.svg>
        </div>

        <motion.div
          style={reduce ? undefined : { y: copyRise, opacity: copyFade }}
          className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center justify-center px-6 pt-24 text-center"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.p
              variants={rise}
              className="inline-flex items-center gap-2 rounded border border-border bg-background px-3 py-1.5 text-[13px] font-semibold text-accent-strong"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-sm bg-accent-strong"
              />
              The intelligent layer for logistics
            </motion.p>

            <motion.h1
              variants={rise}
              id="hero-heading"
              className="mt-6 text-balance text-[56px] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground lg:text-[44px] md:text-[36px] sm:text-[32px]"
            >
              For companies that ship, and the{" "}
              <span className="text-accent-strong">
                partners that move their goods
              </span>
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-muted-foreground"
            >
              One dashboard and API for labels, returns, and tracking. Use
              sharp partner rates from DHL, PostNL, DPD, and more — or bring
              your own contracts.
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-9 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                href={authLinks.signIn}
                className={`group inline-flex min-h-[44px] items-center gap-2 rounded bg-accent px-6 text-[15px] font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-strong hover:text-background active:scale-[0.98] ${focusRing}`}
              >
                Start shipping
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={authLinks.partner}
                className={`group inline-flex min-h-[44px] items-center gap-2 rounded border border-border bg-background px-6 text-[15px] font-medium text-foreground transition-colors duration-200 hover:border-accent-strong hover:text-accent-strong ${focusRing}`}
              >
                Explore the partner platform
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            <motion.p
              variants={rise}
              className="mt-4 text-[13.5px] text-muted-foreground"
            >
              No shipping contract needed — start with partner rates.
            </motion.p>
          </motion.div>
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pb-10">
          <ul
            aria-hidden="true"
            className="grid grid-cols-4 gap-2 md:grid-cols-2"
          >
            {phases.map((label, index) => (
              <li
                key={label}
                className={`rounded border px-3 py-2 text-center text-[13px] font-semibold transition-colors duration-200 ${
                  index === activePhase
                    ? "border-accent bg-background text-foreground"
                    : "border-transparent text-background/65"
                }`}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
