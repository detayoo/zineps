"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { ChevronDownIcon } from "@/components/icons";
import type { NavItem } from "@/lib/nav";

import {
  dropdownMotion,
  dropdownTransition,
  reducedDropdownMotion,
} from "./motion";

const triggerClass =
  "flex h-full items-center gap-1.5 rounded px-3.5 text-[15px] text-foreground/80 transition-colors duration-200 hover:bg-accent-soft hover:text-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-strong/40";

/**
 * A single nav group ("Products", "Knowledge Base").
 *
 * Chowdeck-style: the panel unrolls from the top edge (`origin-top`, `scaleY`
 * 0 → 1) and each item is its own bordered pill that swaps border + text to the
 * brand accent on hover. No shadows — the pill border carries the separation.
 *
 * Unlike Chowdeck this is a real disclosure: it opens on hover *and* click/
 * keyboard, closes on Escape, blur-out and outside click, and respects
 * `prefers-reduced-motion`.
 */
export function HeaderDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const reduceMotion = useReducedMotion();

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const openNow = () => {
    cancelClose();
    setOpen(true);
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => cancelClose(), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative h-full"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={triggerClass}
      >
        {item.label}
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            {...(reduceMotion ? reducedDropdownMotion : dropdownMotion)}
            transition={dropdownTransition}
            className="absolute left-0 top-full z-50 w-max min-w-[15rem] max-w-[22rem] origin-top pt-2"
          >
            <ul className="flex flex-col gap-2">
              {item.children?.map((child) => (
                <li key={child.label}>
                  <Link
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="group/item block w-full rounded border border-foreground/15 bg-background px-4 py-2.5 transition-all duration-200 hover:scale-[1.02] hover:border-accent-strong hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-strong/40"
                  >
                    <span className="flex items-center gap-2 text-[14px] font-medium text-foreground transition-colors duration-200 group-hover/item:text-background">
                      {child.label}
                      {child.badge && (
                        <span className="rounded bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-strong transition-colors duration-200 group-hover/item:bg-background/20 group-hover/item:text-background">
                          {child.badge}
                        </span>
                      )}
                    </span>
                    {child.description && (
                      <span className="mt-0.5 block text-[12.5px] leading-snug text-muted-foreground transition-colors duration-200 group-hover/item:text-background/75">
                        {child.description}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
