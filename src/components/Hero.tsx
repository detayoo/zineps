"use client";

import { useEffect, useRef } from "react";
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

const WHEEL_BASE: Array<[number, number]> = [
  [-36, -14],
  [36, -14],
];
const WHEEL_RADIUS = 14;

/**
 * Drive the van along the route path. Reads the path geometry directly, so the
 * marker can never detach from the line: position from `getPointAtLength`,
 * heading from the tangent, wheel spin from travelled distance. Transform-only,
 * written straight to the DOM — no re-renders per scroll frame.
 */
function updateVan(
  path: SVGPathElement | null,
  van: SVGGElement | null,
  wheels: Array<SVGGElement | null>,
  progress: number,
) {
  if (!path || !van) return;
  const length = path.getTotalLength();
  if (!length) return;
  const clamped = Math.min(Math.max(progress, 0), 1);
  const distance = clamped * length;
  const point = path.getPointAtLength(distance);
  const ahead = path.getPointAtLength(Math.min(distance + 1, length));
  const angle =
    (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI;
  van.setAttribute(
    "transform",
    `translate(${point.x} ${point.y}) rotate(${angle})`,
  );
  const spin = (distance / WHEEL_RADIUS) * (180 / Math.PI);
  wheels.forEach((wheel, index) => {
    const [cx, cy] = WHEEL_BASE[index] ?? [0, 0];
    wheel?.setAttribute(
      "transform",
      `translate(${cx} ${cy}) rotate(${spin})`,
    );
  });
}

/**
 * Immersive scroll hero: a pinned full-viewport logistics landscape.
 * Scrolling parallaxes the brand layers, draws the shipment route, and drives
 * a delivery van along it — origin to destination, wheels spinning, body
 * pitched to the road. The headline stays put; nothing fades on scroll.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const vanRef = useRef<SVGGElement>(null);
  const wheelRefs = useRef<Array<SVGGElement | null>>([]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const skyDrift = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const farHills = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const midHills = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const nearGround = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const routeDraw = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    updateVan(
      pathRef.current,
      vanRef.current,
      wheelRefs.current,
      reduce ? 1 : value,
    );
  });

  useEffect(() => {
    updateVan(
      pathRef.current,
      vanRef.current,
      wheelRefs.current,
      reduce ? 1 : scrollYProgress.get(),
    );
  }, [reduce, scrollYProgress]);

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
            className="absolute inset-x-0 top-[56svh] h-[26svh] w-full"
          >
            <motion.path
              ref={pathRef}
              d="M-20 300 C 280 240, 520 330, 760 270 C 1000 210, 1220 280, 1460 230"
              fill="none"
              stroke="rgb(var(--accent-strong))"
              strokeWidth={3}
              strokeLinecap="round"
              style={{ pathLength: reduce ? 1 : routeDraw }}
            />
            <text
              x={48}
              y={272}
              fontSize={22}
              fill="rgb(var(--muted-foreground))"
            >
              Amsterdam
            </text>
            <text
              x={1345}
              y={210}
              fontSize={22}
              fill="rgb(var(--muted-foreground))"
            >
              Berlin
            </text>
            <circle cx={18} cy={294} r={7} fill="rgb(var(--accent-strong))" />
            <circle
              cx={1422}
              cy={232}
              r={7}
              fill="rgb(var(--background))"
              stroke="rgb(var(--accent-strong))"
              strokeWidth={3}
            />
          </motion.svg>
          <motion.svg
            viewBox="0 0 1440 420"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[56svh] z-20 h-[26svh] w-full"
          >
            <g ref={vanRef} transform="translate(18 294)">
              <rect
                x={-64}
                y={-70}
                width={64}
                height={46}
                rx={6}
                fill="rgb(var(--background))"
                stroke="rgb(var(--foreground))"
                strokeWidth={3}
              />
              <text
                x={-57}
                y={-40}
                fontSize={12.5}
                fontWeight={800}
                letterSpacing={1.5}
                fill="rgb(var(--foreground))"
              >
                zineps
              </text>
              <rect
                x={-58}
                y={-33}
                width={52}
                height={8}
                rx={2}
                fill="rgb(var(--accent))"
              />
              <path
                d="M0 -66 L28 -66 L50 -30 L57 -30 L57 -22 L0 -22 Z"
                fill="rgb(var(--background))"
                stroke="rgb(var(--foreground))"
                strokeWidth={3}
                strokeLinejoin="round"
              />
              <path
                d="M9 -59 L25 -59 L39 -33 L9 -33 Z"
                fill="rgb(var(--accent-strong))"
              />
              <line
                x1={40}
                y1={-54}
                x2={46}
                y2={-50}
                stroke="rgb(var(--foreground))"
                strokeWidth={2}
              />
              <circle
                cx={47.5}
                cy={-49}
                r={2.5}
                fill="rgb(var(--foreground))"
              />
              <rect
                x={51}
                y={-31}
                width={6}
                height={6}
                rx={2}
                fill="rgb(var(--accent))"
                stroke="rgb(var(--foreground))"
                strokeWidth={1.5}
              />
              {WHEEL_BASE.map(([cx, cy], index) => (
                <g
                  key={`${cx}-${cy}`}
                  ref={(element) => {
                    wheelRefs.current[index] = element;
                  }}
                  transform={`translate(${cx} ${cy})`}
                >
                  <circle r={14} fill="rgb(var(--foreground))" />
                  <line
                    x1={-8}
                    y1={0}
                    x2={8}
                    y2={0}
                    stroke="rgb(var(--background))"
                    strokeWidth={2.4}
                  />
                  <line
                    x1={0}
                    y1={-8}
                    x2={0}
                    y2={8}
                    stroke="rgb(var(--background))"
                    strokeWidth={2.4}
                  />
                  <circle r={3} fill="rgb(var(--background))" />
                </g>
              ))}
            </g>
          </motion.svg>
          <motion.svg
            style={reduce ? undefined : { y: nearGround }}
            viewBox="0 0 1440 240"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-[12svh] w-full"
          >
            <path
              d="M-40 195 C220 155 360 200 580 175 C800 150 940 200 1160 175 C1300 160 1400 180 1480 172 L1480 240 L-40 240 Z"
              fill="rgb(var(--foreground))"
            />
          </motion.svg>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center justify-start px-6 pt-[12svh] text-center">
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
              Scroll to follow the route — no contract needed to start.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
