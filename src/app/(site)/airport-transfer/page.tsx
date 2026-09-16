import type { Metadata } from "next";
import { Suspense } from "react";
import Section, { SectionHeading } from "@/components/Section";
import AirportTransferForm from "@/components/AirportTransferForm";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Coimbatore Airport to Ooty Taxi Transfer",
  description:
    "Pre-booked Coimbatore Airport to Ooty taxi transfers. Family and premium vehicles, group transportation and reliable pickup.",
};

export const dynamic = "force-dynamic";

const features = [
  "Airport Pickup",
  "Ooty Drop",
  "Ooty → Coimbatore Airport",
  "Family Vehicles",
  "Premium Vehicles",
  "Group Transportation",
  "Pre-booked Pickup",
];

export default async function AirportTransferPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <Section className="bg-forest">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-mustard font-sans font-semibold text-xs tracking-[0.2em] uppercase">Coimbatore Airport → Ooty</span>
          <h1 className="font-display text-3xl md:text-5xl text-cream tracking-wide mt-3">LANDING AT COIMBATORE AIRPORT?</h1>
          <p className="text-cream/75 mt-4">
            Mountain Ride Ooty can handle the journey to the hills — pre-booked, on time, and ready for your arrival.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {features.map((f) => (
              <span key={f} className="text-xs uppercase tracking-wide bg-cream/10 border border-mustard/40 text-cream px-3 py-1.5 rounded-full">
                {f}
              </span>
            ))}
          </div>
        </div>
      </Section>
      <Section className="bg-paper">
        <SectionHeading eyebrow="Book Your Transfer" title="AIRPORT TRANSFER BOOKING" />
        <div className="max-w-2xl mx-auto">
          <Suspense>
            <AirportTransferForm whatsappNumber={settings.whatsappPrimary} />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
