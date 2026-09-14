import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const SITE_URL = "https://www.zineps.com";
const SITE_NAME = "Zineps";
const SITE_TITLE = "Zineps — The intelligent layer for logistics";
const SITE_DESCRIPTION =
  "AI shipping software for e-commerce and logistics. One infrastructure with a dashboard and an API, using partner shipping rates or your own contracts.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Zineps",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "shipping software",
    "e-commerce shipping",
    "logistics platform",
    "shipping API",
    "partner shipping rates",
    "DHL",
    "PostNL",
    "DPD",
    "shipping AI",
    "logistics service providers",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1210",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: SITE_DESCRIPTION,
  email: "info@zineps.com",
  telephone: "+31 20 261 4474",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Herikerbergweg 288",
    postalCode: "1101CT",
    addressLocality: "Amsterdam",
    addressCountry: "NL",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What exactly is Zineps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zineps is an AI-driven platform that connects e-commerce with logistics partners. Webshops automate their shipping process, and carriers manage their customers through the Partner Panel — all inside one platform.",
      },
    },
    {
      "@type": "Question",
      name: "Who is Zineps for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both e-commerce businesses and logistics partners. Webshops cut shipping costs and automate their processes; carriers and brokers offer their services through the platform and manage everything centrally.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a shipping contract already?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You can connect your own contracts, or take advantage of competitive rates from connected partners.",
      },
    },
    {
      "@type": "Question",
      name: "Which systems does Zineps integrate with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zineps integrates seamlessly with Shopify, WooCommerce, Bol.com, Amazon, Exact, Lightspeed and many more — plus APIs for custom integrations.",
      },
    },
    {
      "@type": "Question",
      name: "What does using Zineps cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zineps uses a transparent SaaS model with optional per-shipment costs, and flexible plans tailored to your user type.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can I start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Within minutes. Connect your shop or register as a partner, and start shipping — or offering your logistics services — right away.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              websiteSchema,
              faqSchema,
            ]),
          }}
        />
      </body>
    </html>
  );
}
