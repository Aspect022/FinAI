import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { TranslationProvider } from "@/components/i18n/translation-provider";
import NavbarWrapper from "@/components/nav/navbar-wrapper";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _devanagari = Noto_Sans_Devanagari({ subsets: ["latin", "devanagari"] });

export const metadata: Metadata = {
  title: "MoneyFyi - Personal Finance Management",
  description: "AI-powered personal finance management application",
  generator: "Next.js",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${_geist.className} ${_devanagari.className} font-sans antialiased`}
      >
        <TranslationProvider>
          <NavbarWrapper />
          {children}
        </TranslationProvider>
        <Analytics />
      </body>
    </html>
  );
}
