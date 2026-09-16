"use client";

import { useTransition } from "react";
import { toggleReviewApproval, deleteReview } from "@/app/admin/reviews/actions";

export default function ReviewApprovalToggle({ id, isApproved }: { id: string; isApproved: boolean }) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex items-center gap-3">
      <button
        disabled={isPending}
        onClick={() => startTransition(() => toggleReviewApproval(id, !isApproved))}
        className={`text-xs font-semibold rounded-full px-3 py-1.5 ${
          isApproved ? "bg-forest/20 text-forest" : "bg-mustard/30 text-brown"
        }`}
      >
        {isApproved ? "Approved" : "Hidden"}
      </button>
      <button
        disabled={isPending}
        onClick={() => startTransition(() => deleteReview(id))}
        className="text-xs text-rust font-semibold underline"
      >
        Delete
      </button>
    </div>
  );
}
