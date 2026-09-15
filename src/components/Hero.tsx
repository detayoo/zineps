"use client";

import { useCallback, useEffect, useRef } from "react";
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
  [34, 96],
  [106, 96],
];
const WHEEL_RADIUS = 14;

/** Single source for the shipment route — road, dashes, reveal mask and van.
 *  Both ends sit inside the frame (clear of the viewport edges) so the parked
 *  van is never half-clipped. */
const ROUTE_D =
  "M70 336 C 280 262, 520 370, 760 270 C 1000 170, 1200 250, 1370 192";

/**
 * Drive the van along the route path, in screen pixels. The route SVG
 * stretches non-uniformly to fill its band, so positioning inside it would
 * squash the van — instead the path point is mapped to pixels and applied
 * to an overlay whose own aspect never distorts. Position from
 * `getPointAtLength`, heading corrected for the non-uniform scale, wheel
 * spin from travelled distance. Transform-only, written straight to the
 * DOM — no re-renders per scroll frame.
 */
function updateVan(
  path: SVGPathElement | null,
  band: HTMLDivElement | null,
  stage: HTMLDivElement | null,
  van: HTMLDivElement | null,
  wheels: Array<SVGGElement | null>,
  progress: number,
) {
  if (!path || !band || !stage || !van) return;
  const bandRect = band.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();
  if (!bandRect.width || !bandRect.height) return;
  const scaleX = bandRect.width / 1440;
  const scaleY = bandRect.height / 420;
  const length = path.getTotalLength();
  if (!length) return;
  const clamped = Math.min(Math.max(progress, 0), 1);
  const distance = clamped * length;
  const point = path.getPointAtLength(distance);
  const ahead = path.getPointAtLength(Math.min(distance + 1, length));
  const x = bandRect.left - stageRect.left + point.x * scaleX;
  const y = bandRect.top - stageRect.top + point.y * scaleY;
  const angle =
    (Math.atan2(
      (ahead.y - point.y) * scaleY,
      (ahead.x - point.x) * scaleX,
    ) *
      180) /
    Math.PI;
  van.style.visibility = clamped > 0.01 ? "visible" : "hidden";
  van.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
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
 * pitched to the road. A storefront marks the merchant origin, a warehouse
 * the partner destination; parcels and a cloud drift overhead. The headline
 * stays put; nothing fades on scroll.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const vanRef = useRef<HTMLDivElement>(null);
  const wheelRefs = useRef<Array<SVGGElement | null>>([]);
  const progressRef = useRef(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const skyDrift = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const farHills = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const midHills = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const nearGround = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const routeDraw = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const cloudDrift = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);

  // Stable placement helper for the mount/resize effect below.
  const placeVan = useCallback((progress: number) => {
    progressRef.current = progress;
    updateVan(
      pathRef.current,
      bandRef.current,
      stageRef.current,
      vanRef.current,
      wheelRefs.current,
      progress,
    );
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    placeVan(reduce ? 1 : value);
  });

  useEffect(() => {
    placeVan(reduce ? 1 : scrollYProgress.get());
    const onResize = () => placeVan(progressRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [placeVan, reduce, scrollYProgress]);

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
      <div
        ref={stageRef}
        className="sticky top-0 flex h-svh flex-col overflow-hidden bg-gradient-to-b from-accent-soft/90 via-background to-background"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <motion.div
            style={reduce ? undefined : { y: skyDrift }}
            className="absolute inset-x-0 top-0 h-[46svh] bg-gradient-to-b from-accent-soft to-transparent"
          />
          <div aria-hidden="true" className="absolute inset-x-6 top-0 bottom-0 mx-auto max-w-[1100px] md:hidden">
            <motion.div
              style={reduce ? undefined : { y: cloudDrift }}
              className="absolute right-[6%] top-[9%]"
            >
              <svg viewBox="0 0 140 64" className="block w-36">
                <g fill="rgb(var(--background))" opacity={0.9}>
                  <ellipse cx={36} cy={40} rx={28} ry={16} />
                  <ellipse cx={66} cy={30} rx={26} ry={19} />
                  <ellipse cx={94} cy={40} rx={24} ry={14} />
                </g>
              </svg>
            </motion.div>
          </div>
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
          <div
            ref={bandRef}
            className="absolute inset-x-6 top-[34svh] mx-auto h-[34svh] max-w-[1100px]"
          >
          <motion.svg
            viewBox="0 0 1440 420"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <mask
                id="zineps-route-reveal"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1440"
                height="420"
              >
                <rect x="0" y="0" width="1440" height="420" fill="black" />
                <motion.path
                  d={ROUTE_D}
                  fill="none"
                  stroke="white"
                  strokeWidth={48}
                  strokeLinecap="butt"
                  style={{ pathLength: reduce ? 1 : routeDraw }}
                />
              </mask>
            </defs>
            <g mask="url(#zineps-route-reveal)">
<path
              d={ROUTE_D}
              fill="none"
              stroke="rgb(var(--accent))"
              strokeOpacity={0.3}
              strokeWidth={38}
              strokeLinecap="round"
              className="sm:hidden"
            />
            <path
              ref={pathRef}
              d={ROUTE_D}
              fill="none"
              stroke="rgb(var(--foreground))"
              strokeWidth={24}
              strokeLinecap="round"
              className="sm:hidden"
            />
            <path
              d={ROUTE_D}
              fill="none"
              stroke="rgb(var(--background))"
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="16 14"
              className="sm:hidden"
            />
            </g>
            <text
              x={112}
              y={330}
              fontSize={22}
              fill="rgb(var(--muted-foreground))"
              className="sm:hidden"
            >
              Amsterdam
            </text>
            {/*
              Preserved desktop storefront icon — hidden because it collided
              with the CTA row after the pill gained mt-[50px]. Restore by
              deleting these comment markers (keep the sm:hidden off it).
            <g
              aria-hidden="true"
              transform="translate(54 288)"
              className="sm:hidden"
            >
              <path
                d="M-28 -18 L28 -18 L22 -32 L-22 -32 Z"
                fill="rgb(var(--accent-strong))"
              />
              <rect
                x="-24"
                y="-18"
                width="48"
                height="32"
                fill="rgb(var(--accent-soft))"
                stroke="rgb(var(--foreground))"
                strokeWidth={3}
              />
              <rect
                x="8"
                y="-12"
                width="10"
                height="10"
                fill="rgb(var(--accent))"
                fillOpacity={0.55}
              />
              <rect
                x="-6"
                y="-4"
                width="12"
                height="18"
                fill="rgb(var(--foreground))"
              />
            </g>
            */}
            <text
              x={1280}
              y={168}
              fontSize={22}
              fill="rgb(var(--muted-foreground))"
              className="sm:hidden"
            >
              Berlin
            </text>
            <g
              aria-hidden="true"
              transform="translate(1408 156)"
              className="sm:hidden"
            >
              <rect
                x="-30"
                y="-28"
                width="60"
                height="8"
                fill="rgb(var(--foreground))"
              />
              <rect
                x="-26"
                y="-20"
                width="52"
                height="36"
                fill="rgb(var(--accent-soft))"
                stroke="rgb(var(--foreground))"
                strokeWidth={3}
              />
              <rect
                x="-11"
                y="-4"
                width="22"
                height="20"
                fill="rgb(var(--background))"
                stroke="rgb(var(--foreground))"
                strokeWidth={2}
              />
              <line
                x1={-11}
                y1={3}
                x2={11}
                y2={3}
                stroke="rgb(var(--foreground))"
                strokeWidth={1.5}
                opacity={0.6}
              />
              <line
                x1={-11}
                y1={9}
                x2={11}
                y2={9}
                stroke="rgb(var(--foreground))"
                strokeWidth={1.5}
                opacity={0.6}
              />
            </g>
            <circle
              cx={70}
              cy={336}
              r={7}
              fill="rgb(var(--accent-strong))"
              className="sm:hidden"
            />
            <circle
              cx={1370}
              cy={192}
              r={7}
              fill="rgb(var(--background))"
              stroke="rgb(var(--accent-strong))"
              strokeWidth={3}
              className="sm:hidden"
            />
          </motion.svg>
          {/*
            Preserved band-anchored Berlin marker (mobile) — kept in case we
            revert the in-flow origin/destination strip below.
          <div className="absolute left-[95.1%] top-[45.7%] hidden sm:block">
            <div className="flex -translate-x-[85%] -translate-y-1/2 items-center gap-1.5">
              <span className="whitespace-nowrap text-[11px] font-medium text-muted-foreground">
                Berlin
              </span>
              <svg viewBox="0 0 64 48" className="block w-10 shrink-0">
                <rect
                  x="2"
                  y="4"
                  width="60"
                  height="7"
                  fill="rgb(var(--foreground))"
                />
                <rect
                  x="5"
                  y="11"
                  width="54"
                  height="33"
                  fill="rgb(var(--background))"
                  stroke="rgb(var(--foreground))"
                  strokeWidth={3}
                />
                <rect
                  x="21"
                  y="26"
                  width="22"
                  height="18"
                  fill="rgb(var(--background))"
                  stroke="rgb(var(--foreground))"
                  strokeWidth={2}
                />
                <line
                  x1={23}
                  y1={32}
                  x2={41}
                  y2={32}
                  stroke="rgb(var(--foreground))"
                  strokeWidth={1.5}
                  opacity={0.6}
                />
                <line
                  x1={23}
                  y1={38}
                  x2={41}
                  y2={38}
                  stroke="rgb(var(--foreground))"
                  strokeWidth={1.5}
                  opacity={0.6}
                />
              </svg>
            </div>
          </div>
          */}
          </div>
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

        <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-start justify-start px-6 pt-24 text-left">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex w-full max-w-[660px] flex-col items-start"
          >
            <motion.p
              variants={rise}
              className="mt-[50px] inline-flex items-center gap-2 rounded border border-border bg-background px-3 py-1.5 text-[13px] font-semibold text-accent-strong sm:mt-[30px]"
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
              className="mt-9 flex flex-wrap items-center justify-start gap-3"
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
            <div aria-hidden="true" className="mt-4 hidden w-full items-center gap-2">
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 56 48" className="block w-9 shrink-0">
                  <path
                    d="M4 16 L52 16 L46 30 L10 30 Z"
                    fill="rgb(var(--accent-strong))"
                  />
                  <rect
                    x="8"
                    y="16"
                    width="40"
                    height="28"
                    fill="rgb(var(--background))"
                    stroke="rgb(var(--foreground))"
                    strokeWidth={3}
                  />
                  <rect
                    x="34"
                    y="24"
                    width="10"
                    height="8"
                    fill="rgb(var(--accent))"
                    fillOpacity={0.55}
                  />
                  <rect
                    x="14"
                    y="30"
                    width="10"
                    height="14"
                    fill="rgb(var(--foreground))"
                  />
                </svg>
                <span className="whitespace-nowrap text-[11px] font-medium text-muted-foreground">
                  Amsterdam
                </span>
              </div>
              <span className="h-0 flex-1 border-t-2 border-dashed border-border" />
              <div className="flex items-center gap-1.5">
                <span className="whitespace-nowrap text-[11px] font-medium text-muted-foreground">
                  Berlin
                </span>
                <svg viewBox="0 0 64 48" className="block w-10 shrink-0">
                  <rect
                    x="2"
                    y="4"
                    width="60"
                    height="7"
                    fill="rgb(var(--foreground))"
                  />
                  <rect
                    x="5"
                    y="11"
                    width="54"
                    height="33"
                    fill="rgb(var(--background))"
                    stroke="rgb(var(--foreground))"
                    strokeWidth={3}
                  />
                  <rect
                    x="21"
                    y="26"
                    width="22"
                    height="18"
                    fill="rgb(var(--background))"
                    stroke="rgb(var(--foreground))"
                    strokeWidth={2}
                  />
                  <line
                    x1={23}
                    y1={32}
                    x2={41}
                    y2={32}
                    stroke="rgb(var(--foreground))"
                    strokeWidth={1.5}
                    opacity={0.6}
                  />
                  <line
                    x1={23}
                    y1={38}
                    x2={41}
                    y2={38}
                    stroke="rgb(var(--foreground))"
                    strokeWidth={1.5}
                    opacity={0.6}
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 sm:hidden"
        >
          <div ref={vanRef} className="invisible absolute left-0 top-0">
            <svg
              viewBox="0 0 140 110"
              aria-hidden="true"
              className="block w-[clamp(72px,9vw,116px)] -translate-x-1/2 -translate-y-full"
            >
              <rect
                x={6}
                y={40}
                width={64}
                height={46}
                rx={6}
                fill="rgb(var(--background))"
                stroke="rgb(var(--foreground))"
                strokeWidth={3}
              />
              <text
                x={13}
                y={70}
                fontSize={12.5}
                fontWeight={800}
                letterSpacing={1.5}
                fill="rgb(var(--foreground))"
              >
                zineps
              </text>
              <rect
                x={12}
                y={77}
                width={52}
                height={8}
                rx={2}
                fill="rgb(var(--accent))"
              />
              <path
                d="M70 44 L98 44 L120 80 L127 80 L127 88 L70 88 Z"
                fill="rgb(var(--background))"
                stroke="rgb(var(--foreground))"
                strokeWidth={3}
                strokeLinejoin="round"
              />
              <path
                d="M79 51 L95 51 L109 77 L79 77 Z"
                fill="rgb(var(--accent-strong))"
              />
              <line
                x1={110}
                y1={56}
                x2={116}
                y2={60}
                stroke="rgb(var(--foreground))"
                strokeWidth={2}
              />
              <circle
                cx={117.5}
                cy={61}
                r={2.5}
                fill="rgb(var(--foreground))"
              />
              <rect
                x={121}
                y={79}
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
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
