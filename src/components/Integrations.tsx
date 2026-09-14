"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { ArrowRightIcon } from "@/components/icons";

/** House ease — the same curve the rest of the page uses. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40";

const platforms = [
  { name: "Shopify", logo: "/logos/hero-shopify.svg" },
  { name: "WooCommerce", logo: "/logos/hero-woo.svg" },
  { name: "Bol.com", logo: "/logos/hero-bol.svg" },
  { name: "Amazon", logo: "/logos/hero-amazon.svg" },
  { name: "PostNL", logo: "/logos/hero-postnl.svg" },
  { name: "DHL", logo: "/logos/hero-dhl.svg" },
  { name: "DPD", logo: "/logos/hero-dpd.svg" },
  { name: "UPS", logo: "/logos/hero-ups.svg" },
  { name: "FedEx", logo: "/logos/hero-fedex.svg" },
  { name: "GLS", logo: "/logos/hero-gls.svg" },
  { name: "Magento", logo: "/logos/hero-magento.svg" },
  { name: "Correos", logo: "/logos/hero-correos.svg" },
  { name: "Bpost", logo: "/logos/hero-bpost.svg" },
  { name: "Temu", logo: "/logos/hero-temu.svg" },
  { name: "DB Schenker", logo: "/logos/db-schenker-logo.svg" },
  { name: "CCV Shop", logo: "/logos/ccv-shop-logo.svg" },
  { name: "SnelStart", logo: "/logos/snelstart-logo.svg" },
  { name: "Exact", logo: "/logos/exact-logo.svg" },
] as const;

/**
 * Integrations — "100+ integrations" over a ruled wall of platforms. Each
 * cell shows the name at rest; on hover the name lifts out and the real
 * brand logo settles in. The swap is pure CSS transition, so entering and
 * leaving animate symmetrically — and instant under reduced motion.
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
              key={platform.name}
              className="group relative flex h-[104px] items-center justify-center overflow-hidden bg-background px-4"
            >
              <span className="text-center text-[15px] font-semibold text-muted-foreground transition-all duration-300 motion-safe:group-hover:-translate-y-2 motion-safe:group-hover:opacity-0">
                {platform.name}
              </span>
              <span className="absolute inset-0 flex items-center justify-center px-6 opacity-0 transition-all duration-300 motion-safe:translate-y-2 motion-safe:scale-95 motion-safe:group-hover:translate-y-0 motion-safe:group-hover:scale-100 motion-safe:group-hover:opacity-100">
                <span className="relative block h-10 w-full">
                  <Image
                    src={platform.logo}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 40vw, (max-width: 1180px) 22vw, 15vw"
                    loading="lazy"
                    className="object-contain"
                  />
                </span>
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
