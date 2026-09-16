import type { Metadata } from "next";
import Section from "@/components/Section";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export const metadata: Metadata = {
  title: "About Mountain Ride Ooty",
  description: "Mountain Ride Ooty is a travel partner for exploring the Nilgiris, focused on comfortable and dependable transportation.",
};

export default function AboutPage() {
  return (
    <Section className="bg-paper">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="text-rust font-sans font-semibold text-xs tracking-[0.2em] uppercase">About Us</span>
          <h1 className="font-display text-3xl md:text-4xl text-forest tracking-wide mt-2">ABOUT MOUNTAIN RIDE OOTY</h1>
          <p className="text-charcoal/80 mt-5">
            Mountain Ride Ooty is a travel partner for exploring the Nilgiris. We aim to make travel around Ooty
            comfortable, convenient and memorable — whether you&apos;re here for a day of sightseeing, an airport
            transfer, or a longer outstation journey.
          </p>
          <div className="mt-6 bg-cream border-2 border-brown/30 rounded-vintage p-5">
            <h3 className="font-display text-forest tracking-wide text-sm uppercase">Our Mission</h3>
            <p className="text-charcoal/80 text-sm mt-2 italic">
              &ldquo;To provide dependable transportation and memorable travel experiences for every guest visiting Ooty.&rdquo;
            </p>
          </div>
          <div className="mt-4 bg-cream border-2 border-brown/30 rounded-vintage p-5">
            <h3 className="font-display text-forest tracking-wide text-sm uppercase">Our Vision</h3>
            <p className="text-charcoal/80 text-sm mt-2 italic">
              &ldquo;To become a trusted travel brand for Ooty and Nilgiri tourism.&rdquo;
            </p>
          </div>
        </div>
        <ImagePlaceholder alt="Mountain Ride Ooty vehicle on a Nilgiri mountain road" className="h-80 md:h-full rounded-vintage border-2 border-brown/30 shadow-vintage" />
      </div>
    </Section>
  );
}
