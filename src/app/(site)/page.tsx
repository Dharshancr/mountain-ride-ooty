import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import Section, { SectionHeading } from "@/components/Section";
import RevealOnScroll from "@/components/RevealOnScroll";
import ServiceCard from "@/components/ServiceCard";
import VehicleCard from "@/components/VehicleCard";
import DestinationCard from "@/components/DestinationCard";
import PackageCard from "@/components/PackageCard";
import ReviewCard from "@/components/ReviewCard";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/settings";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import {
  fallbackServices,
  fallbackVehicles,
  fallbackSightseeing,
  fallbackPackages,
} from "@/lib/fallback-content";

export const metadata: Metadata = {
  title: "Mountain Ride Ooty | Ooty Taxi, Sightseeing & Airport Transfers",
  description:
    "Ooty taxi, sightseeing tours, Coimbatore Airport transfers, outstation trips and group travel across the Nilgiris. Ride the Hills. Discover the Beauty.",
};

export const dynamic = "force-dynamic";

const whyChooseUs = [
  {
    title: "Local Ooty Knowledge",
    description: "Drivers who know the hills, the shortcuts and the best viewpoints.",
  },
  {
    title: "Comfortable Vehicles",
    description: "A range of well-maintained vehicles suited to families and groups.",
  },
  {
    title: "Transparent Pricing",
    description: "Clear pricing discussed upfront before your trip is confirmed.",
  },
  {
    title: "On-Time Pickup",
    description: "Reliable pickup and drop timing for sightseeing, transfers and outstation trips.",
  },
  {
    title: "Flexible Travel",
    description: "Sightseeing, transfers, one-way, round-trip or fully custom itineraries.",
  },
  {
    title: "Family & Group Friendly",
    description: "Vehicles and planning suited to both small families and larger groups.",
  },
];

async function getHomeData() {
  try {
    const [vehicles, services, places, packages, reviews] = await Promise.all([
      prisma.vehicle.findMany({ where: { isPublished: true }, orderBy: { displayOrder: "asc" }, take: 6 }),
      prisma.service.findMany({ where: { isPublished: true }, orderBy: { displayOrder: "asc" } }),
      prisma.sightseeingPlace.findMany({ where: { isPublished: true }, orderBy: { displayOrder: "asc" }, take: 4 }),
      prisma.tourPackage.findMany({ where: { isPublished: true }, orderBy: { displayOrder: "asc" }, take: 3 }),
      prisma.review.findMany({ where: { isApproved: true }, orderBy: { createdAt: "desc" }, take: 3 }),
    ]);
    return { vehicles, services, places, packages, reviews };
  } catch (error) {
    console.error("Falling back to static content on home page:", error);
    return {
      vehicles: fallbackVehicles.slice(0, 6).map((v, i) => ({ id: `fallback-${i}`, ...v, isAvailable: true })),
      services: fallbackServices.map((s, i) => ({ id: `fallback-${i}`, ...s })),
      places: fallbackSightseeing.slice(0, 4).map((p, i) => ({ id: `fallback-${i}`, ...p })),
      packages: fallbackPackages.slice(0, 3).map((p, i) => ({ id: `fallback-${i}`, ...p })),
      reviews: [] as { id: string; customerName: string; rating: number; reviewText: string }[],
    };
  }
}

export default async function HomePage() {
  const settings = await getSiteSettings();
  const { vehicles, services, places, packages, reviews } = await getHomeData();
  const whatsappHref = buildWhatsAppLink(
    settings.whatsappPrimary,
    "Hi Mountain Ride Ooty, I'd like to know more about your services."
  );

  return (
    <>
      <Hero whatsappHref={whatsappHref} heroImageUrl={settings.heroImageUrl} />

      {/* WHY CHOOSE US */}
      <Section className="bg-paper">
        <RevealOnScroll>
          <SectionHeading eyebrow="Trust & Comfort" title="YOUR JOURNEY. OUR RESPONSIBILITY." />
        </RevealOnScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item, i) => (
            <RevealOnScroll key={item.title}>
              <div className="bg-cream border-2 border-brown/30 rounded-vintage p-6 shadow-vintage h-full">
                <span className="font-display text-mustard text-3xl">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-lg text-forest tracking-wide mt-2">{item.title}</h3>
                <p className="text-sm text-charcoal/80 mt-2">{item.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      {/* SIGHTSEEING */}
      <Section className="bg-forest">
        <RevealOnScroll>
          <SectionHeading eyebrow="Popular Ooty Sightseeing" title="DISCOVER THE BEST OF OOTY" />
        </RevealOnScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {places.map((place, i) => (
            <RevealOnScroll key={place.id}>
              <DestinationCard place={place} index={i} />
            </RevealOnScroll>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/sightseeing" className="inline-flex items-center rounded-vintage bg-mustard text-forest-dark font-semibold px-6 py-3 hover:bg-mustard-light transition-colors">
            View All Sightseeing
          </Link>
        </div>
      </Section>

      {/* SERVICES */}
      <Section className="bg-paper">
        <RevealOnScroll>
          <SectionHeading eyebrow="Our Services" title="TRAVEL MADE EASY" />
        </RevealOnScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <RevealOnScroll key={service.id}>
              <ServiceCard service={service} />
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      {/* VEHICLES */}
      <Section className="bg-cream">
        <RevealOnScroll>
          <SectionHeading eyebrow="Our Vehicles" title="CHOOSE YOUR PERFECT RIDE" />
        </RevealOnScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <RevealOnScroll key={vehicle.id}>
              <VehicleCard vehicle={vehicle} />
            </RevealOnScroll>
          ))}
        </div>
        <p className="text-center text-xs text-charcoal/60 mt-8 max-w-xl mx-auto">
          Vehicle availability and exact seating configuration may vary and will be confirmed during booking.
        </p>
        <div className="text-center mt-6">
          <Link href="/vehicles" className="inline-flex items-center rounded-vintage border-2 border-forest text-forest font-semibold px-6 py-3 hover:bg-forest hover:text-cream transition-colors">
            View All Vehicles
          </Link>
        </div>
      </Section>

      {/* PACKAGES */}
      <Section className="bg-paper">
        <RevealOnScroll>
          <SectionHeading eyebrow="Ooty Tour Packages" title="POPULAR MOUNTAIN EXPERIENCES" />
        </RevealOnScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <RevealOnScroll key={pkg.id}>
              <PackageCard pkg={pkg} />
            </RevealOnScroll>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/packages" className="inline-flex items-center rounded-vintage bg-rust text-cream font-semibold px-6 py-3 hover:bg-rust-light transition-colors">
            View All Packages
          </Link>
        </div>
      </Section>

      {/* CUSTOM TOUR CTA STRIP */}
      <Section className="bg-forest">
        <RevealOnScroll>
          <div className="rounded-vintage border-2 border-mustard/40 bg-forest-dark p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl md:text-3xl text-cream tracking-wide">BUILD YOUR OWN MOUNTAIN TRIP</h2>
            <p className="text-cream/70 mt-3 max-w-xl mx-auto">
              Not looking for a fixed package? Tell us your destinations, dates and group size, and we&apos;ll help plan it.
            </p>
            <Link href="/custom-tour" className="inline-flex items-center rounded-vintage bg-mustard text-forest-dark font-bold px-6 py-3 mt-6 hover:bg-mustard-light transition-colors">
              Plan My Trip
            </Link>
          </div>
        </RevealOnScroll>
      </Section>

      {/* REVIEWS */}
      {reviews.length > 0 && (
        <Section className="bg-paper">
          <RevealOnScroll>
            <SectionHeading eyebrow="Customer Reviews" title="WHAT OUR GUESTS SAY" />
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <RevealOnScroll key={review.id}>
                <ReviewCard review={review} />
              </RevealOnScroll>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
