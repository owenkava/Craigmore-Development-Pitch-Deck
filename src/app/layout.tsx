import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#023E40",
};

export const metadata: Metadata = {
  title: "Craigmore Drive — Investor Deck | Citra Capital",
  description:
    "Investment opportunity in Halifax, Nova Scotia. An upzoned residential development site entitled for 38 units as-of-right with three development scenarios.",
  keywords: [
    "real estate investment",
    "Halifax",
    "Nova Scotia",
    "residential development",
    "investor deck",
    "Citra Capital",
    "Craigmore Drive",
  ],
  authors: [{ name: "Citra Capital" }],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Craigmore Drive — Investor Deck",
    description:
      "Upzoned residential development investment in Halifax, Nova Scotia.",
    type: "website",
    siteName: "Craigmore Drive Investor Deck",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Craigmore Drive — Investor Deck",
    description:
      "Upzoned residential development investment in Halifax, Nova Scotia.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/Inter-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Inter-SemiBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
