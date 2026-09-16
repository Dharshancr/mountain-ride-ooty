import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import Section, { SectionHeading } from "@/components/Section";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Book Your Mountain Ride | Mountain Ride Ooty",
  description:
    "Book your Ooty taxi, sightseeing trip, airport transfer or outstation ride with Mountain Ride Ooty. Fast confirmation by phone or WhatsApp.",
};

export const dynamic = "force-dynamic";

export default async function BookingPage() {
  const settings = await getSiteSettings();

  return (
    <Section className="bg-paper min-h-[70vh]">
      <SectionHeading eyebrow="Reserve Your Trip" title="BOOK YOUR MOUNTAIN RIDE" />
      <div className="max-w-2xl mx-auto">
        <Suspense fallback={<div className="text-center text-charcoal/60">Loading booking form...</div>}>
          <BookingForm whatsappNumber={settings.whatsappPrimary} />
        </Suspense>
      </div>
    </Section>
  );
}
