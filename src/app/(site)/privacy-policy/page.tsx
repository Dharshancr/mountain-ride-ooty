import type { Metadata } from "next";
import Section, { SectionHeading } from "@/components/Section";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <Section className="bg-paper">
      <SectionHeading eyebrow="Legal" title="PRIVACY POLICY" center={false} />
      <div className="prose max-w-none text-charcoal/80 text-sm space-y-4">
        <p>
          Mountain Ride Ooty collects the information you submit through our booking forms — such as your name,
          mobile number, travel dates and pickup/drop locations — solely to process your booking and communicate
          with you about your trip.
        </p>
        <p>
          We do not sell your personal information to third parties. Information may be shared with our drivers
          and operations team only as needed to fulfil your booking.
        </p>
        <p>
          You may contact us at any time to ask what information we hold about you or to request that it be
          deleted, subject to any records we are required to keep for business or legal purposes.
        </p>
        <p>This policy may be updated from time to time. Please check back periodically for changes.</p>
      </div>
    </Section>
  );
}
