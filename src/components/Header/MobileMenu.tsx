"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { ZinepsLogo } from "@/components/ZinepsLogo";
import { ChevronDownIcon, CloseIcon } from "@/components/icons";
import { authLinks, languages, primaryNav } from "@/lib/nav";

import { EASE } from "./motion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const listMotion = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.06 } },
};

const itemMotion = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

/** Full-screen navigation overlay for viewports below `lg`. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-0 z-[200] hidden flex-col bg-background lg:flex"
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <Link href="/" onClick={onClose} aria-label="Zineps home">
              <ZinepsLogo className="h-[22px] w-auto" />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded p-2 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>

          <motion.nav
            variants={listMotion}
            initial="hidden"
            animate="visible"
            className="flex-1 overflow-y-auto px-5 pb-8 pt-4"
          >
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <motion.li key={item.label} variants={itemMotion}>
                  {item.children ? (
                    <div>
                      <button
                        type="button"
                        aria-expanded={expanded === item.label}
                        onClick={() =>
                          setExpanded((value) =>
                            value === item.label ? null : item.label,
                          )
                        }
                        className="flex w-full items-center justify-between rounded px-3 py-3.5 text-left text-[22px] font-medium text-foreground transition-colors hover:bg-accent-soft hover:text-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40"
                      >
                        {item.label}
                        <ChevronDownIcon
                          className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                            expanded === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === item.label && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: EASE }}
                            className="overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className="flex items-center gap-2 rounded px-4 py-2.5 text-[15px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                >
                                  {child.label}
                                  {child.badge && (
                                    <span className="rounded bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-strong">
                                      {child.badge}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block rounded px-3 py-3.5 text-[22px] font-medium text-foreground transition-colors hover:bg-accent-soft hover:text-accent-ink"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>

            <motion.div
              variants={itemMotion}
              className="mt-8 flex flex-wrap gap-2"
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  className="flex items-center gap-2 rounded border border-border px-3.5 py-2 text-[13px] font-medium text-foreground/80 transition-colors hover:bg-muted"
                >
                  <span aria-hidden="true">{language.flag}</span>
                  {language.label}
                </button>
              ))}
            </motion.div>

            <motion.div variants={itemMotion} className="mt-6">
              <Link
                href={authLinks.signIn}
                onClick={onClose}
                className="flex w-full items-center justify-center rounded bg-accent px-6 py-3.5 text-[15px] font-semibold text-accent-ink transition-colors hover:bg-accent/90"
              >
                Sign up
              </Link>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
