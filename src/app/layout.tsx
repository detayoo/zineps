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
  title: "Zineps — The intelligent layer for logistics",
  description:
    "AI shipping software for e-commerce and logistics. One infrastructure with a dashboard and an API, using partner shipping rates or your own contracts.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
