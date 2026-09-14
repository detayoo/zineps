"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { ZinepsLogo } from "@/components/ZinepsLogo";
import { MenuIcon } from "@/components/icons";
import { authLinks, primaryNav } from "@/lib/nav";

import { HeaderDropdown } from "../HeaderDropdown";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { MobileMenu } from "../MobileMenu";
import { EASE } from "../motion";
import { useHeader } from "../useHeader";

const navLinkClass =
  "rounded-pill px-3.5 py-2 text-[15px] text-foreground/80 transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40";

const ctaClass =
  "rounded-pill bg-accent px-5 py-2.5 text-[14px] font-semibold text-accent-ink transition-all duration-200 hover:bg-accent/90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40";

/**
 * Variant one — "The Capsule".
 * A floating, centered pill: logo left, primary nav center, language + CTA right.
 * See docs/header-concept.md for the full concept.
 */
export function HeaderVariantOne() {
  const { scrolled, mobileOpen, setMobileOpen } = useHeader();

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-3 z-[100] flex justify-center px-4 sm:px-3"
      >
        <div
          className={`flex w-full max-w-[1200px] items-center justify-between gap-6 rounded-pill border py-2 pl-5 pr-2 transition-[background-color,border-color] duration-300 ${
            scrolled
              ? "border-border bg-background/85 backdrop-blur-xl"
              : "border-transparent bg-background/60 backdrop-blur-md"
          }`}
        >
          <Link
            href="/"
            aria-label="Zineps home"
            className="shrink-0 rounded-pill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40"
          >
            <ZinepsLogo className="h-[22px] w-auto text-foreground" />
          </Link>

          <nav
            aria-label="Main navigation"
            className="flex items-center gap-1 lg:hidden"
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

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSwitcher />
              <Link href={authLinks.signIn} className={ctaClass}>
                Sign up
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="hidden rounded-full p-2 text-foreground transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong/40 lg:inline-flex"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
