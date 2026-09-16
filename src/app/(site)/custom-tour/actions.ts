"use server";

import { prisma } from "@/lib/prisma";
import { customTourSchema, generateBookingReference } from "@/lib/validation";

export type CustomTourState = {
  status: "idle" | "success" | "error";
  message?: string;
  referenceId?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitCustomTour(
  _prevState: CustomTourState,
  formData: FormData
): Promise<CustomTourState> {
  const raw = {
    fullName: formData.get("fullName")?.toString() ?? "",
    mobileNumber: formData.get("mobileNumber")?.toString() ?? "",
    destinations: formData.get("destinations")?.toString() ?? "",
    numberOfPeople: formData.get("numberOfPeople")?.toString() ?? "",
    travelDates: formData.get("travelDates")?.toString() ?? "",
    pickupLocation: formData.get("pickupLocation")?.toString() ?? "",
    preferredVehicle: formData.get("preferredVehicle")?.toString() ?? "",
    numberOfDays: formData.get("numberOfDays")?.toString() ?? "",
  };

  const parsed = customTourSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the fields below.", fieldErrors };
  }

  const referenceId = generateBookingReference();
  const firstDateGuess = new Date();

  try {
    await prisma.booking.create({
      data: {
        referenceId,
        fullName: parsed.data.fullName,
        mobileNumber: parsed.data.mobileNumber,
        travelDate: firstDateGuess,
        pickupLocation: parsed.data.pickupLocation,
        dropLocation: parsed.data.destinations,
        passengers: parsed.data.numberOfPeople,
        vehicleRequired: parsed.data.preferredVehicle,
        serviceRequired: "CUSTOM_PACKAGE",
        message: `Destinations: ${parsed.data.destinations} | Travel dates: ${parsed.data.travelDates} | Days: ${parsed.data.numberOfDays}`,
        source: "custom-tour-form",
      },
    });
    return { status: "success", message: "Custom trip request received.", referenceId };
  } catch (error) {
    console.error("Custom tour submission failed:", error);
    return { status: "error", message: "Something went wrong. Please call or WhatsApp us directly." };
  }
}
