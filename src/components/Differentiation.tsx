"use client";

import { motion, useReducedMotion } from "framer-motion";

/** House ease — the same curve the rest of the page uses. */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const items = [
  {
    title: "Building together",
    body: "We build alongside our customers and keep improving on their feedback.",
  },
  {
    title: "Personal contact",
    body: "At Zineps we stay close to our customers. We listen, think along, and support you personally — so nobody stands alone.",
  },
  {
    title: "Strong partnerships",
    body: "Together with our partners we offer sharp rates, smart workflows, and valuable advice — for webshops and logistics parties alike.",
  },
  {
    title: "Focus on technology",
    body: "We build tools that make e-commerce and logistics faster and simpler.",
  },
] as const;

/**
 * What sets Zineps apart — centered heading over a ruled 2×2 grid,
 * from the reference's "Dit maakt ons anders".
 */
export function Differentiation() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 24 };

  return (
    <section
      aria-labelledby="differentiation-heading"
      className="border-t border-border bg-background"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 py-24 md:py-20">
        <motion.div
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto flex max-w-[680px] flex-col items-center text-center"
        >
          <h2
            id="differentiation-heading"
            className="text-balance text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[28px]"
          >
            An approach that goes beyond the standard
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">
            We set a new standard in shipping technology — with a focus on
            innovation, collaboration, and customer focus, for smarter,
            future-proof e-commerce and logistics.
          </p>
        </motion.div>

        <motion.ul
          initial={initial}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-12 grid grid-cols-12 gap-3"
        >
          {items.map((item, index) => (
            <li
              key={item.title}
              className={`${["col-span-7", "col-span-5", "col-span-5", "col-span-7"][index] ?? "col-span-6"} group relative overflow-hidden rounded border border-border bg-background p-8 transition-colors duration-200 hover:bg-accent-soft/50 md:col-span-full`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-7 -right-3 origin-bottom-right select-none text-[10rem] font-extrabold leading-none tracking-[-0.04em] text-foreground/[0.07] transition-all duration-300 group-hover:text-foreground/[0.12] motion-safe:group-hover:-rotate-6"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <h3 className="text-[19px] font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
