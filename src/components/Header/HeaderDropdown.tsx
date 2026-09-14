"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { ChevronDownIcon } from "@/components/icons";
import type { NavItem } from "@/lib/nav";

import { dropdownMotion, dropdownTransition } from "./motion";

const triggerClass =
  "flex items-center gap-1.5 rounded-pill px-3.5 py-2 text-[15px] text-foreground/80 transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40";

/**
 * A single nav group ("Producten", "Knowledge Base").
 * Opens on hover and on click/keyboard, closes on Escape, blur-out or outside click.
 */
export function HeaderDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

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
      className="relative"
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
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            {...dropdownMotion}
            transition={dropdownTransition}
            className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3"
          >
            <ul className="overflow-hidden rounded-2xl border border-border bg-background/95 p-1.5 backdrop-blur-xl">
              {item.children?.map((child) => (
                <li key={child.label}>
                  <Link
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="group/item block rounded-xl px-3.5 py-2.5 transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40"
                  >
                    <span className="flex items-center gap-2 text-[14px] font-medium text-foreground">
                      {child.label}
                      {child.badge && (
                        <span className="rounded-pill bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-strong">
                          {child.badge}
                        </span>
                      )}
                    </span>
                    {child.description && (
                      <span className="mt-0.5 block text-[12.5px] leading-snug text-muted-foreground">
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
