import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { Header } from "@/components/Header";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zineps — De intelligente laag voor de logistiek",
  description:
    "AI Shipping Software voor e-commerce & logistiek. Eén infrastructuur met een dashboard en API, met partner-verzendtarieven of je eigen contracten.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={manrope.variable}>
      <body className="font-sans antialiased">
        <Header variant="one" />
        {children}
      </body>
    </html>
  );
}
