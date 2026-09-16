import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ReviewApprovalToggle from "@/components/admin/ReviewApprovalToggle";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-forest tracking-wide">REVIEWS</h1>
        <Link href="/admin/reviews/new" className="rounded-vintage bg-rust text-cream text-sm font-semibold px-5 py-2.5">
          + Add Review
        </Link>
      </div>
      <div className="grid gap-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white border-2 border-brown/20 rounded-vintage p-5 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">{r.customerName} — {r.rating}/5</p>
              <p className="text-sm text-charcoal/70 mt-1">{r.reviewText}</p>
            </div>
            <ReviewApprovalToggle id={r.id} isApproved={r.isApproved} />
          </div>
        ))}
        {reviews.length === 0 && <p className="text-charcoal/60">No reviews yet.</p>}
      </div>
      <p className="text-xs text-charcoal/50 mt-6">
        Only add reviews genuinely submitted by customers. Reviews are hidden from the public site until approved.
      </p>
    </div>
  );
}
