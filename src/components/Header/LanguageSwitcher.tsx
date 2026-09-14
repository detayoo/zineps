"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ChevronDownIcon } from "@/components/icons";
import { defaultLanguage, languages } from "@/lib/nav";

import { dropdownMotion, dropdownTransition } from "./motion";

/** Language picker — sits in the header's right cluster. */
export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(defaultLanguage);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

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
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Choose language"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1.5 rounded-pill border border-border px-3 py-1.5 text-[13px] font-medium text-foreground/80 transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40"
      >
        <span aria-hidden="true">{current.flag}</span>
        <span>{current.code}</span>
        <ChevronDownIcon
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
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
            className="absolute right-0 top-full z-50 w-52 pt-3"
          >
            <ul className="overflow-hidden rounded-2xl border border-border bg-background/95 p-1.5 backdrop-blur-xl">
              {languages.map((language) => {
                const active = language.code === current.code;
                return (
                  <li key={language.code}>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrent(language);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[13.5px] transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40 ${
                        active
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span aria-hidden="true">{language.flag}</span>
                      <span className="flex-1">{language.label}</span>
                      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        {language.code}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
