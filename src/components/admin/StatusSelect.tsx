"use client";

import { useTransition } from "react";
import { updateBookingStatus } from "@/app/admin/bookings/actions";

const statuses = ["NEW", "CONTACTED", "CONFIRMED", "COMPLETED", "CANCELLED"];

const statusColors: Record<string, string> = {
  NEW: "bg-mustard/30 text-brown",
  CONTACTED: "bg-blue-100 text-blue-800",
  CONFIRMED: "bg-forest/20 text-forest",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-rust/20 text-rust",
};

export default function StatusSelect({ bookingId, status }: { bookingId: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      className={`text-xs font-semibold rounded-full px-2.5 py-1.5 border-0 ${statusColors[status] || ""}`}
      onChange={(e) => {
        const newStatus = e.target.value;
        startTransition(async () => {
          await updateBookingStatus(bookingId, newStatus);
        });
      }}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
