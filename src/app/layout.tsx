import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://meridian-briefs.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Meridian — Automated brand briefs",
    template: "%s · Meridian",
  },
  description:
    "Customers pay once. Meridian delivers positioning, voice, colors, and launch copy automatically. You only handle design taste and rare questions.",
  applicationName: "Meridian",
  keywords: ["brand brief", "automated branding", "positioning", "startup branding", "AI brand kit"],
  openGraph: {
    type: "website",
    title: "Meridian — Automated brand briefs",
    description: "Pay once. Get a complete brand kit in minutes. Fully automated delivery.",
    siteName: "Meridian",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meridian — Automated brand briefs",
    description: "Pay once. Get a complete brand kit in minutes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1c19",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
