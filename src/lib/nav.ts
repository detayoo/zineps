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
 * Content sourced in docs/zineps-content.md.
 */
export const primaryNav: NavItem[] = [
  {
    label: "Producten",
    href: "/shipping",
    children: [
      {
        label: "Verzending voor e-commerce en mkb",
        href: "/shipping",
        description: "Labels, retouren en dynamische checkout in één flow.",
      },
      {
        label: "Platform voor logistieke dienstverleners",
        href: "/logistics-operating-system",
        description: "Tarieven, contracten en marges centraal beheren.",
      },
      {
        label: "Shipping AI",
        href: "/ai-shipping-intelligence",
        description: "Voorspel vertragingen, kies betere routes, betaal minder.",
        badge: "Beta",
      },
    ],
  },
  { label: "Integraties", href: "/integrations" },
  { label: "Prijzen", href: "/pricing" },
  { label: "Blog", href: "/blog?lang=nl" },
  {
    label: "Knowledge Base",
    href: "/knowledge-base",
    children: [
      { label: "Overzicht", href: "/knowledge-base" },
      { label: "Helpcenter", href: "/knowledge-base/helpcenter" },
      { label: "Use Cases", href: "#", badge: "Coming soon" },
      { label: "API Documentatie", href: "/knowledge-base/api-docs" },
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

export const defaultLanguage = languages[1];

export const authLinks = {
  signIn: "https://app.zineps.com/Account/Register",
  partner: "/logistics-operating-system",
};
