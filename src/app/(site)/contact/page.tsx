import type { Metadata } from "next";
import { Suspense } from "react";
import Section, { SectionHeading } from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import { getSiteSettings } from "@/lib/settings";
import { buildWhatsAppLink, buildTelHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Mountain Ride Ooty by phone, WhatsApp or the contact form.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <Section className="bg-paper">
      <SectionHeading eyebrow="Get In Touch" title="LET'S PLAN YOUR MOUNTAIN RIDE" />
      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <div className="space-y-4">
          <div className="bg-cream border-2 border-brown/30 rounded-vintage p-6 shadow-vintage">
            <h3 className="font-display text-forest tracking-wide text-sm uppercase mb-3">Location</h3>
            <p className="text-charcoal/80 text-sm">{settings.location}</p>
          </div>
          <div className="bg-cream border-2 border-brown/30 rounded-vintage p-6 shadow-vintage">
            <h3 className="font-display text-forest tracking-wide text-sm uppercase mb-3">Phone</h3>
            <p className="text-charcoal/80 text-sm">{settings.phonePrimary}</p>
            <p className="text-charcoal/80 text-sm">{settings.phoneSecondary}</p>
          </div>
          <div className="bg-cream border-2 border-brown/30 rounded-vintage p-6 shadow-vintage">
            <h3 className="font-display text-forest tracking-wide text-sm uppercase mb-3">Business Hours</h3>
            <p className="text-charcoal/80 text-sm">{settings.businessHours}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={buildTelHref(settings.phonePrimary)} className="flex-1 text-center rounded-vintage bg-forest text-cream font-semibold px-5 py-3">
              Call Now
            </a>
            <a
              href={buildWhatsAppLink(settings.whatsappPrimary, "Hi Mountain Ride Ooty, I have a question.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center rounded-vintage bg-mustard text-forest-dark font-semibold px-5 py-3"
            >
              WhatsApp Now
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center rounded-vintage border-2 border-forest text-forest font-semibold px-5 py-3"
            >
              Get Directions
            </a>
          </div>
        </div>
        <Suspense>
          <ContactForm />
        </Suspense>
      </div>
    </Section>
  );
}
