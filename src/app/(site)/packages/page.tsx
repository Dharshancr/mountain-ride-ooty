import type { Metadata } from "next";
import Section, { SectionHeading } from "@/components/Section";
import PackageCard from "@/components/PackageCard";
import { prisma } from "@/lib/prisma";
import { fallbackPackages } from "@/lib/fallback-content";

export const metadata: Metadata = {
  title: "Ooty Tour Packages",
  description:
    "Popular Ooty tour packages including Ooty 1-Day Sightseeing, Ooty + Coonoor, Ooty + Pykara and Avalanche Tour.",
};

export const dynamic = "force-dynamic";

async function getPackages() {
  try {
    const packages = await prisma.tourPackage.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: "asc" },
    });
    if (packages.length) return packages;
    return fallbackPackages.map((p, i) => ({ id: `fallback-${i}`, ...p }));
  } catch {
    return fallbackPackages.map((p, i) => ({ id: `fallback-${i}`, ...p }));
  }
}

export default async function PackagesPage() {
  const packages = await getPackages();
  return (
    <Section className="bg-paper">
      <SectionHeading eyebrow="Ooty Tour Packages" title="POPULAR MOUNTAIN EXPERIENCES" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
      <p className="text-center text-xs text-charcoal/60 mt-8">
        Prices shown are starting prices where confirmed by our team. Packages marked &quot;Contact for Price&quot; will be quoted directly.
      </p>
    </Section>
  );
}
