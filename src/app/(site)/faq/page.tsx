import type { Metadata } from "next";
import Section, { SectionHeading } from "@/components/Section";
import FAQAccordion from "@/components/FAQAccordion";
import { prisma } from "@/lib/prisma";
import { fallbackFaqs } from "@/lib/fallback-content";

export const metadata: Metadata = {
  title: "FAQ | Mountain Ride Ooty",
  description: "Frequently asked questions about booking, vehicles, airport pickup and outstation trips with Mountain Ride Ooty.",
};

export const dynamic = "force-dynamic";

async function getFaqs() {
  try {
    const faqs = await prisma.faqItem.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: "asc" },
    });
    if (faqs.length) return faqs;
    return fallbackFaqs.map((f, i) => ({ id: `fallback-${i}`, ...f }));
  } catch {
    return fallbackFaqs.map((f, i) => ({ id: `fallback-${i}`, ...f }));
  }
}

export default async function FaqPage() {
  const faqs = await getFaqs();
  return (
    <Section className="bg-paper">
      <SectionHeading eyebrow="Have Questions?" title="FREQUENTLY ASKED QUESTIONS" />
      <div className="max-w-2xl mx-auto">
        <FAQAccordion items={faqs} />
      </div>
    </Section>
  );
}
