import type { Metadata } from "next";
import Section, { SectionHeading } from "@/components/Section";
import ReviewCard from "@/components/ReviewCard";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Customer Reviews | Mountain Ride Ooty",
  description: "Read what guests say about travelling with Mountain Ride Ooty.",
};

export const dynamic = "force-dynamic";

async function getReviews() {
  try {
    return await prisma.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function ReviewsPage() {
  const reviews = await getReviews();
  return (
    <Section className="bg-paper">
      <SectionHeading eyebrow="Customer Reviews" title="WHAT OUR GUESTS SAY" />
      {reviews.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-center text-charcoal/60">
          Guest reviews will appear here as they are approved by our team.
        </p>
      )}
    </Section>
  );
}
