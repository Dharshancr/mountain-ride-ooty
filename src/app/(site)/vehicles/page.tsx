import type { Metadata } from "next";
import Section, { SectionHeading } from "@/components/Section";
import VehicleCard from "@/components/VehicleCard";
import { prisma } from "@/lib/prisma";
import { fallbackVehicles } from "@/lib/fallback-content";

export const metadata: Metadata = {
  title: "Vehicles | Sedan, Innova, Tempo Traveller & More",
  description:
    "Choose from Sedan, Kia Carens, Toyota Innova, Innova Crysta, Tempo Traveller and Force Urbania for your Ooty trip.",
};

export const dynamic = "force-dynamic";

async function getVehicles() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: "asc" },
    });
    if (vehicles.length) return vehicles;
    return fallbackVehicles.map((v, i) => ({ id: `fallback-${i}`, ...v, isAvailable: true }));
  } catch {
    return fallbackVehicles.map((v, i) => ({ id: `fallback-${i}`, ...v, isAvailable: true }));
  }
}

export default async function VehiclesPage() {
  const vehicles = await getVehicles();
  return (
    <Section className="bg-paper">
      <SectionHeading eyebrow="Our Vehicles" title="CHOOSE YOUR PERFECT RIDE" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
      <p className="text-center text-xs text-charcoal/60 mt-8 max-w-xl mx-auto">
        Vehicle availability and exact seating configuration may vary and will be confirmed during booking.
      </p>
    </Section>
  );
}
