import { prisma } from "@/lib/prisma";
import type { SiteSettings } from "@prisma/client";

const DEFAULT_SETTINGS: Omit<SiteSettings, "id" | "updatedAt"> = {
  businessName: "Mountain Ride Ooty",
  tagline: "Ride the Hills. Discover the Beauty.",
  phonePrimary: "9585943681",
  phoneSecondary: "8667803054",
  whatsappPrimary: "9585943681",
  email: null,
  location: "Ooty, Tamil Nadu",
  businessHours: "Available for bookings every day.",
  facebookUrl: null,
  instagramUrl: null,
  logoUrl: null,
  heroImageUrl: null,
  primaryCtaText: "Book Your Ride",
};

/**
 * Fetches the single SiteSettings row, creating it with sensible defaults
 * if it does not exist yet. Cached per-request by Next.js fetch dedupe is
 * not applicable to Prisma, so this is called once per request tree via
 * React's cache() where used in server components.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const existing = await prisma.siteSettings.findUnique({
      where: { id: "singleton" },
    });
    if (existing) return existing;

    return await prisma.siteSettings.create({
      data: { id: "singleton", ...DEFAULT_SETTINGS },
    });
  } catch (error) {
    // If the database is not reachable (e.g. during build without DATABASE_URL),
    // fall back to defaults so pages can still render.
    console.error("Failed to load site settings, using defaults:", error);
    return { id: "singleton", updatedAt: new Date(), ...DEFAULT_SETTINGS };
  }
}
