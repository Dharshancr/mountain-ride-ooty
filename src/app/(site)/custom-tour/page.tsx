import type { Metadata } from "next";
import { Suspense } from "react";
import Section, { SectionHeading } from "@/components/Section";
import CustomTourForm from "@/components/CustomTourForm";

export const metadata: Metadata = {
  title: "Custom Ooty Tour | Build Your Own Trip",
  description: "Plan a custom Nilgiris itinerary — choose your destinations, dates, group size and preferred vehicle.",
};

export default function CustomTourPage() {
  return (
    <Section className="bg-paper">
      <SectionHeading eyebrow="Custom Tour" title="BUILD YOUR OWN MOUNTAIN TRIP" />
      <p className="text-center text-charcoal/75 max-w-xl mx-auto -mt-4 mb-10">
        No need to pick a fixed package — tell us where you want to go and we&apos;ll help plan the rest.
      </p>
      <div className="max-w-2xl mx-auto">
        <Suspense>
          <CustomTourForm />
        </Suspense>
      </div>
    </Section>
  );
}
