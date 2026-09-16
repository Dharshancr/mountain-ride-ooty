"use server";

import { prisma } from "@/lib/prisma";
import { bookingSchema, generateBookingReference } from "@/lib/validation";
import { ServiceType } from "@prisma/client";

export type BookingActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  referenceId?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitBooking(
  _prevState: BookingActionState,
  formData: FormData
): Promise<BookingActionState> {
  const raw = {
    fullName: formData.get("fullName")?.toString() ?? "",
    mobileNumber: formData.get("mobileNumber")?.toString() ?? "",
    whatsappNumber: formData.get("whatsappNumber")?.toString() ?? "",
    travelDate: formData.get("travelDate")?.toString() ?? "",
    pickupLocation: formData.get("pickupLocation")?.toString() ?? "",
    dropLocation: formData.get("dropLocation")?.toString() ?? "",
    passengers: formData.get("passengers")?.toString() ?? "",
    vehicleRequired: formData.get("vehicleRequired")?.toString() ?? "",
    serviceRequired: formData.get("serviceRequired")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
  };

  const parsed = bookingSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please check the fields below and try again.",
      fieldErrors,
    };
  }

  const referenceId = generateBookingReference();

  try {
    await prisma.booking.create({
      data: {
        referenceId,
        fullName: parsed.data.fullName,
        mobileNumber: parsed.data.mobileNumber,
        whatsappNumber: parsed.data.whatsappNumber || null,
        travelDate: new Date(parsed.data.travelDate),
        pickupLocation: parsed.data.pickupLocation,
        dropLocation: parsed.data.dropLocation || null,
        passengers: parsed.data.passengers,
        vehicleRequired: parsed.data.vehicleRequired,
        serviceRequired: parsed.data.serviceRequired as ServiceType,
        message: parsed.data.message || null,
        source: "website",
      },
    });

    // Notification hook: send email/SMS here using env-configured credentials.
    // See src/lib/notifications.ts for the extension point.

    return {
      status: "success",
      message: "Your mountain ride request has been received.",
      referenceId,
    };
  } catch (error) {
    console.error("Booking submission failed:", error);
    return {
      status: "error",
      message: "Something went wrong while saving your booking. Please call or WhatsApp us directly.",
    };
  }
}
