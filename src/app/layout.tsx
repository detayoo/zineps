import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { Header } from "@/components/Header";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
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
    <html lang="nl" className={poppins.variable}>
      <body className="font-sans antialiased">
        <Header variant="one" />
        {children}
      </body>
    </html>
  );
}
