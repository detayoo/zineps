"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { ZinepsLogo } from "@/components/ZinepsLogo";
import { authLinks } from "@/lib/nav";

/** House ease — the same curve the header and hero use. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40";

const columns = [
  {
    heading: "Products",
    links: [
      { label: "Shipping for e-commerce and SMBs", href: "/shipping" },
      {
        label: "Logistics service provider platform",
        href: "/logistics-operating-system",
      },
      { label: "Shipping AI", href: "/ai-shipping-intelligence" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "info@zineps.com", href: "mailto:info@zineps.com" },
      { label: "020 261 4474", href: "tel:0202614474" },
      {
        label: "Herikerbergweg 288, 1101CT Amsterdam",
        href: "https://maps.google.com/?q=Herikerbergweg+288+Amsterdam",
      },
    ],
  },
] as const;

/**
 * The zineps footer — refurbished from the ramblings `SiteFooter` type:
 * a centered closing CTA, a ruled link-columns block, a compact legal row,
 * and a giant ghost wordmark to close the page.
 */
export function Footer() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 24 };
  const reveal = { opacity: 1, y: 0 };

  const sentence = "start where you are.";
  const letterContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.055, delayChildren: 0.8 } },
  };
  const letter: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.01 } },
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-6">
        <motion.div
          initial={initial}
          whileInView={reveal}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative flex flex-col items-center overflow-hidden py-20 text-center md:py-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--border))_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_65%_70%_at_50%_40%,black,transparent)]"
          />
          <div className="relative flex flex-col items-center">
          <p className="inline-flex items-center gap-2 rounded border border-border bg-accent-soft px-3 py-1.5 text-[13px] font-semibold text-accent-strong">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-sm bg-accent-strong"
            />
            Start where you are
          </p>

          <svg aria-hidden="true" className="absolute h-0 w-0">
            <defs>
              <filter id="zineps-marker-rough">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.015 0.1"
                  numOctaves={2}
                  seed={8}
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale={6}
                />
              </filter>
            </defs>
          </svg>

          <h2 className="mt-6 max-w-[720px] text-balance text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground md:text-[32px] sm:text-[28px]">
            Software, network and intelligence,{" "}
            <span className="relative inline-block -rotate-1">
              <motion.span
                aria-hidden="true"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
                className="absolute bottom-0 left-1.5 right-0 top-1.5 origin-left bg-accent-strong [filter:url(#zineps-marker-rough)]"
              />
              <motion.span
                aria-hidden="true"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
                className="absolute inset-0 origin-left bg-accent [filter:url(#zineps-marker-rough)]"
              />
              <motion.span
                variants={letterContainer}
                initial={reduce ? false : "hidden"}
                whileInView="show"
                viewport={{ once: true }}
                className="relative inline-block px-2 text-accent-ink"
              >
                  {sentence.split("").map((char, index) => (
                    <motion.span
                      key={`${char}-${index}`}
                      variants={letter}
                      className="inline-block"
                    >
                      {char === " " ? " " : char}
                    </motion.span>
                  ))}
                </motion.span>
            </span>
          </h2>

          <p className="mt-5 max-w-[560px] text-[15.5px] leading-relaxed text-muted-foreground">
            Merchants start shipping in minutes, partner rates included.
            Logistics partners digitize their offering and bring their
            merchants along.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={authLinks.signIn}
              className={`inline-flex min-h-[44px] items-center rounded bg-accent px-6 text-[15px] font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-strong hover:text-background active:scale-[0.98] ${focusRing}`}
            >
              Start your trial
            </Link>
            <Link
              href="/contact"
              className={`inline-flex min-h-[44px] items-center rounded border border-border bg-background px-6 text-[15px] font-medium text-foreground transition-colors duration-200 hover:border-accent-strong hover:text-accent-strong ${focusRing}`}
            >
              Talk to sales
            </Link>
          </div>
          </div>
        </motion.div>

        <motion.nav
          aria-label="Footer"
          initial={initial}
          whileInView={reveal}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grid grid-cols-3 gap-10 border-t border-border py-14 sm:grid-cols-1 sm:gap-8 sm:py-10"
        >
          {columns.map((column) => (
            <div key={column.heading}>
              <p className="text-[13px] font-semibold text-muted-foreground">
                {column.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`text-[14.5px] text-foreground/80 transition-colors duration-200 hover:text-accent-strong ${focusRing} rounded`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.nav>

        <div className="flex items-center justify-between gap-4 border-t border-border py-6 sm:flex-col sm:items-start">
          <p className="flex items-center gap-3 text-[13.5px] text-muted-foreground">
            <ZinepsLogo className="h-[18px] w-auto text-foreground" />
            © {new Date().getFullYear()} Zineps.
          </p>
          <p className="flex items-center gap-5 text-[13.5px]">
            <Link
              href="/privacy-policy"
              className={`text-muted-foreground transition-colors duration-200 hover:text-accent-strong ${focusRing} rounded`}
            >
              Privacy policy
            </Link>
            <Link
              href="/terms"
              className={`text-muted-foreground transition-colors duration-200 hover:text-accent-strong ${focusRing} rounded`}
            >
              Terms
            </Link>
          </p>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="overflow-hidden select-none"
      >
        <p className="-mb-[0.12em] text-center text-[clamp(4rem,18vw,17rem)] font-extrabold lowercase leading-[0.85] tracking-[-0.03em] text-foreground/10">
          zineps
        </p>
      </motion.div>
    </footer>
  );
}
