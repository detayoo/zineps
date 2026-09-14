"use client";

import { useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { ZinepsLogo } from "@/components/ZinepsLogo";
import { MenuIcon } from "@/components/icons";
import { authLinks, primaryNav } from "@/lib/nav";

import { HeaderDropdown } from "./HeaderDropdown";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { EASE } from "./motion";
import { useHeader } from "./useHeader";

const navLinkClass =
  "flex h-full items-center px-3.5 text-[15px] text-foreground/80 transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-strong/40";

const iconButtonClass =
  "flex h-full items-center px-6 text-foreground transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-strong/40";

/**
 * The zineps header — "The Masthead".
 *
 * A full-bleed, ruled bar (not a floating pill): logo · nav · language · CTA,
 * divided by vertical hairlines, with the CTA as a full-height accent block.
 * The bottom hairline is always on; on scroll the bar firms up.
 * See docs/header-concept.md for the full concept.
 */
export function Header() {
  const { scrolled, mobileOpen, setMobileOpen } = useHeader();
  const closeMobile = useCallback(() => setMobileOpen(false), [setMobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[100] border-b border-border transition-colors duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl"
            : "bg-background/50 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Zineps home"
            className="flex h-full shrink-0 items-center px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-strong/40"
          >
            <ZinepsLogo className="h-[22px] w-auto text-foreground" />
          </Link>

          {/* Nav — left aligned, ruled off from the logo */}
          <nav
            aria-label="Main navigation"
            className="flex h-full items-center gap-1 border-l border-border pl-4 pr-4 lg:hidden"
          >
            {primaryNav.map((item) =>
              item.children ? (
                <HeaderDropdown key={item.label} item={item} />
              ) : (
                <Link key={item.label} href={item.href} className={navLinkClass}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex-1" />

          {/* Language */}
          <div className="flex h-full items-center border-l border-border px-3 lg:hidden">
            <LanguageSwitcher />
          </div>

          {/* CTA — a full-height accent block */}
          <Link
            href={authLinks.signIn}
            className="flex h-full items-center bg-accent px-7 text-[14px] font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-strong/40 lg:hidden"
          >
            Sign up
          </Link>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={`hidden lg:flex ${iconButtonClass}`}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={closeMobile} />
    </>
  );
}
