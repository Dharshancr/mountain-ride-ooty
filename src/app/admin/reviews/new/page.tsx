import Link from "next/link";
import { createReview } from "@/app/admin/reviews/actions";

const inputClass = "w-full rounded-md border-2 border-brown/20 px-3 py-2 text-sm";

export default function NewReviewPage() {
  return (
    <div className="max-w-xl">
      <Link href="/admin/reviews" className="text-sm text-forest font-semibold underline">← Back to Reviews</Link>
      <h1 className="font-display text-2xl text-forest tracking-wide mt-4 mb-6">ADD REVIEW</h1>
      <form action={createReview} className="bg-white border-2 border-brown/20 rounded-vintage p-6 space-y-5">
        <label className="block">
          <span className="block text-xs font-semibold text-charcoal/70 mb-1">Customer Name</span>
          <input name="customerName" className={inputClass} required />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-charcoal/70 mb-1">Rating (1-5)</span>
          <input type="number" name="rating" min={1} max={5} defaultValue={5} className={inputClass} required />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-charcoal/70 mb-1">Review Text</span>
          <textarea name="reviewText" rows={4} className={inputClass} required />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isApproved" />
          Publish immediately (approved)
        </label>
        <button className="rounded-vintage bg-rust text-cream text-sm font-semibold px-6 py-2.5">Save Review</button>
      </form>
    </div>
  );
}
