import type { Metadata } from "next";
import Link from "next/link";
import Section, { SectionHeading } from "@/components/Section";
import { outstationRoutes } from "@/lib/fallback-content";

export const metadata: Metadata = {
  title: "Ooty Outstation Taxi | Ooty to Anywhere",
  description:
    "One-way and round-trip outstation taxi service from Ooty to Coimbatore, Mysore, Bangalore, Chennai, Wayanad, Kozhikode and Kochi.",
};

export default function OutstationPage() {
  return (
    <Section className="bg-paper">
      <SectionHeading eyebrow="Outstation Travel" title="OOTY TO ANYWHERE" />
      <p className="text-center text-charcoal/75 max-w-xl mx-auto -mt-4 mb-10">
        Both one-way and round-trip options are available on our outstation routes.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {outstationRoutes.map((route) => (
          <div
            key={route}
            className="bg-cream border-2 border-brown/30 rounded-vintage p-5 flex items-center justify-between shadow-vintage"
          >
            <span className="font-display text-forest tracking-wide text-sm md:text-base">{route}</span>
            <span className="text-mustard text-xl">→</span>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link
          href="/booking?service=OUTSTATION"
          className="inline-flex items-center rounded-vintage bg-rust text-cream font-semibold px-6 py-3 hover:bg-rust-light transition-colors"
        >
          Get Outstation Quote
        </Link>
      </div>
    </Section>
  );
}
