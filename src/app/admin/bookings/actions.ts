"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";

const VALID_STATUSES: BookingStatus[] = ["NEW", "CONTACTED", "CONFIRMED", "COMPLETED", "CANCELLED"];

export async function updateBookingStatus(bookingId: string, status: string) {
  if (!VALID_STATUSES.includes(status as BookingStatus)) {
    throw new Error("Invalid status");
  }
  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: status as BookingStatus },
  });
  revalidatePath("/admin/bookings");
  revalidatePath(`/admin/bookings/${bookingId}`);
  revalidatePath("/admin");
}

export async function updateBookingNotes(bookingId: string, formData: FormData) {
  const notes = formData.get("internalNotes")?.toString() ?? "";
  await prisma.booking.update({
    where: { id: bookingId },
    data: { internalNotes: notes },
  });
  revalidatePath(`/admin/bookings/${bookingId}`);
}
