import type { Metadata } from "next";
import Section, { SectionHeading } from "@/components/Section";

export const metadata: Metadata = { title: "Cancellation Policy" };

export default function CancellationPolicyPage() {
  return (
    <Section className="bg-paper">
      <SectionHeading eyebrow="Legal" title="CANCELLATION POLICY" center={false} />
      <div className="prose max-w-none text-charcoal/80 text-sm space-y-4">
        <p>
          If you need to cancel or reschedule a booking, please contact us as early as possible by phone or
          WhatsApp so we can update your driver and vehicle assignment.
        </p>
        <p>
          Cancellations made with reasonable notice are generally accommodated without issue. Late cancellations,
          especially for outstation or group vehicles that have already been arranged, may not always be possible
          to fully reverse — our team will explain your specific situation when you reach out.
        </p>
        <p>For any cancellation request, please call or WhatsApp our team directly rather than replying to the booking form.</p>
      </div>
    </Section>
  );
}
