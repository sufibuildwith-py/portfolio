
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "./providers";
import { PortfolioHeader } from "./_components/header/PortfolioHeader";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  fallback: [
    "Inter",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    "sans-serif",
  ],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  fallback: ["monaco", "monospace"],
});

export const metadata: Metadata = {
  title: {
    default: "Sufi.builds",
    template: "%s | Sufi.builds",
  },

  applicationName: "Sufi.builds",

  description: "Ideas into intelligent systems",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    type: "website",
    siteName: "Sufi.builds",
    title: "Sufi.builds",
    description: "Ideas into intelligent systems",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sufi.builds",
    description: "Ideas into intelligent systems",
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`min-h-svh max-w-[100vw] bg-surface-primary text-text-primary dark:bg-dark-surface-primary dark:text-dark-text-primary ${geistMono.variable} ${geist.variable} font-sans`}
      >
        <Providers>
          <PortfolioHeader />

          <main className="min-h-[calc(100svh-var(--header-height))]">
            {children}
          </main>

          <Analytics />
        </Providers>
      </body>
    </html>
  );
}