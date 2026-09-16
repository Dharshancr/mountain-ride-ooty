"use client";

import { useTransition } from "react";
import { toggleEnquiryHandled } from "@/app/admin/enquiries/actions";

export default function EnquiryHandledToggle({ id, isHandled }: { id: string; isHandled: boolean }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => toggleEnquiryHandled(id, !isHandled))}
      className={`text-xs font-semibold rounded-full px-3 py-1.5 ${
        isHandled ? "bg-forest/20 text-forest" : "bg-mustard/30 text-brown"
      }`}
    >
      {isHandled ? "Handled" : "Open"}
    </button>
  );
}
