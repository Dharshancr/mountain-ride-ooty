import type { Metadata } from "next";
import Section, { SectionHeading } from "@/components/Section";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <Section className="bg-paper">
      <SectionHeading eyebrow="Legal" title="TERMS & CONDITIONS" center={false} />
      <div className="prose max-w-none text-charcoal/80 text-sm space-y-4">
        <p>
          By booking with Mountain Ride Ooty, you agree that vehicle type, exact seating configuration and pricing
          are confirmed at the time of booking and may vary based on availability.
        </p>
        <p>
          Travel dates, pickup and drop locations should be provided accurately. Delays caused by weather, road
          conditions or circumstances outside our control may affect scheduled timing.
        </p>
        <p>
          Any additional stops, waiting time or route changes beyond what was agreed at booking may affect the
          final trip terms, which will be communicated by our team.
        </p>
        <p>These terms may be updated from time to time.</p>
      </div>
    </Section>
  );
}
