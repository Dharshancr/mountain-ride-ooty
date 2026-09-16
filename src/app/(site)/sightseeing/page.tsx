import type { Metadata } from "next";
import Section, { SectionHeading } from "@/components/Section";
import DestinationCard from "@/components/DestinationCard";
import { prisma } from "@/lib/prisma";
import { fallbackSightseeing } from "@/lib/fallback-content";

export const metadata: Metadata = {
  title: "Ooty Sightseeing Taxi & Tours",
  description:
    "Explore Ooty's best sightseeing spots — Botanical Garden, Ooty Lake, Doddabetta Peak, Pykara, Avalanche and Coonoor — with Mountain Ride Ooty.",
};

export const dynamic = "force-dynamic";

async function getPlaces() {
  try {
    const places = await prisma.sightseeingPlace.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: "asc" },
    });
    if (places.length) return places;
    return fallbackSightseeing.map((p, i) => ({ id: `fallback-${i}`, ...p }));
  } catch {
    return fallbackSightseeing.map((p, i) => ({ id: `fallback-${i}`, ...p }));
  }
}

export default async function SightseeingPage() {
  const places = await getPlaces();
  return (
    <Section className="bg-paper">
      <SectionHeading eyebrow="Popular Ooty Sightseeing" title="DISCOVER THE BEST OF OOTY" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place, i) => (
          <DestinationCard key={place.id} place={place} index={i} />
        ))}
      </div>
    </Section>
  );
}
