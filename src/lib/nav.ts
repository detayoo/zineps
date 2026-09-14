export interface NavChild {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

/**
 * Primary navigation — mirrors the live zineps.com header structure.
 * UI copy is English-first for now; source content in docs/zineps-content.md.
 */
export const primaryNav: NavItem[] = [
  {
    label: "Products",
    href: "/shipping",
    children: [
      {
        label: "Shipping for e-commerce and SMBs",
        href: "/shipping",
        description: "Labels, returns and dynamic checkout in one flow.",
      },
      {
        label: "Logistics service provider platform",
        href: "/logistics-operating-system",
        description: "Rates, contracts and margins in one place.",
      },
      {
        label: "Shipping AI",
        href: "/ai-shipping-intelligence",
        description: "Predict delays, pick better routes, pay less.",
        badge: "Beta",
      },
    ],
  },
  { label: "Integrations", href: "/integrations" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog?lang=en" },
  {
    label: "Knowledge Base",
    href: "/knowledge-base",
    children: [
      { label: "Overview", href: "/knowledge-base" },
      { label: "Help Center", href: "/knowledge-base/helpcenter" },
      { label: "Use Cases", href: "#", badge: "Coming soon" },
      { label: "API Documentation", href: "/knowledge-base/api-docs" },
    ],
  },
];

export interface Language {
  code: string;
  label: string;
  flag: string;
  href: string;
}

export const languages: Language[] = [
  { code: "EN", label: "English", flag: "🇬🇧", href: "/?lang=en" },
  { code: "NL", label: "Nederlands", flag: "🇳🇱", href: "/?lang=nl" },
  { code: "DE", label: "Deutsch", flag: "🇩🇪", href: "/?lang=de" },
  { code: "ES", label: "Español", flag: "🇪🇸", href: "/?lang=es" },
];

export const defaultLanguage = languages[0];

export const authLinks = {
  signIn: "https://app.zineps.com/Account/Register",
  partner: "/logistics-operating-system",
};
