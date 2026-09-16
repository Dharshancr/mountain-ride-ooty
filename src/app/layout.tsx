import type { Metadata } from "next";
import { Anton, Playfair_Display, Work_Sans } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-worksans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mountainrideooty.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mountain Ride Ooty | Ooty Taxi, Sightseeing & Airport Transfers",
    template: "%s | Mountain Ride Ooty",
  },
  description:
    "Mountain Ride Ooty offers Ooty taxi service, sightseeing tours, Coimbatore Airport transfers, outstation trips and group travel across the Nilgiris. Ride the Hills. Discover the Beauty.",
  openGraph: {
    title: "Mountain Ride Ooty",
    description:
      "Ride the Hills. Discover the Beauty. Ooty taxi, sightseeing, airport transfers & outstation travel.",
    url: siteUrl,
    siteName: "Mountain Ride Ooty",
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${playfair.variable} ${workSans.variable}`}>
      <body className="font-sans bg-cream text-charcoal antialiased">{children}</body>
    </html>
  );
}
