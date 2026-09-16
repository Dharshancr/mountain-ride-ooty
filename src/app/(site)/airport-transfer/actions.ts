"use server";

import { prisma } from "@/lib/prisma";
import { airportTransferSchema } from "@/lib/validation";
import { generateBookingReference } from "@/lib/validation";

export type AirportTransferState = {
  status: "idle" | "success" | "error";
  message?: string;
  referenceId?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitAirportTransfer(
  _prevState: AirportTransferState,
  formData: FormData
): Promise<AirportTransferState> {
  const raw = {
    fullName: formData.get("fullName")?.toString() ?? "",
    mobileNumber: formData.get("mobileNumber")?.toString() ?? "",
    pickupDate: formData.get("pickupDate")?.toString() ?? "",
    flightArrivalTime: formData.get("flightArrivalTime")?.toString() ?? "",
    passengers: formData.get("passengers")?.toString() ?? "",
    luggage: formData.get("luggage")?.toString() ?? "",
    vehicleRequired: formData.get("vehicleRequired")?.toString() ?? "",
  };

  const parsed = airportTransferSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the fields below.", fieldErrors };
  }

  const referenceId = generateBookingReference();

  try {
    await prisma.booking.create({
      data: {
        referenceId,
        fullName: parsed.data.fullName,
        mobileNumber: parsed.data.mobileNumber,
        travelDate: new Date(parsed.data.pickupDate),
        pickupLocation: "Coimbatore Airport",
        dropLocation: "Ooty",
        passengers: parsed.data.passengers,
        vehicleRequired: parsed.data.vehicleRequired,
        serviceRequired: "AIRPORT_TRANSFER",
        message: `Flight arrival time: ${parsed.data.flightArrivalTime}${
          parsed.data.luggage ? ` | Luggage: ${parsed.data.luggage}` : ""
        }`,
        source: "airport-transfer-form",
      },
    });
    return { status: "success", message: "Airport transfer request received.", referenceId };
  } catch (error) {
    console.error("Airport transfer submission failed:", error);
    return {
      status: "error",
      message: "Something went wrong. Please call or WhatsApp us directly.",
    };
  }
}
