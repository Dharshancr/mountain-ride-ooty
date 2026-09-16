import { z } from "zod";

const mobileRegex = /^[6-9]\d{9}$/; // Indian mobile numbers

export const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  mobileNumber: z
    .string()
    .trim()
    .regex(mobileRegex, "Enter a valid 10-digit mobile number"),
  whatsappNumber: z
    .string()
    .trim()
    .regex(mobileRegex, "Enter a valid 10-digit WhatsApp number")
    .optional()
    .or(z.literal("")),
  travelDate: z.string().min(1, "Please select a travel date"),
  pickupLocation: z.string().trim().min(2, "Please enter a pickup location").max(200),
  dropLocation: z.string().trim().max(200).optional().or(z.literal("")),
  passengers: z.coerce.number().int().min(1, "At least 1 passenger required").max(50),
  vehicleRequired: z.string().min(1, "Please select a vehicle"),
  serviceRequired: z.enum([
    "OOTY_SIGHTSEEING",
    "AIRPORT_TRANSFER",
    "ONE_WAY",
    "ROUND_TRIP",
    "OUTSTATION",
    "CUSTOM_PACKAGE",
  ]),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const airportTransferSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  mobileNumber: z.string().trim().regex(mobileRegex, "Enter a valid 10-digit mobile number"),
  pickupDate: z.string().min(1),
  flightArrivalTime: z.string().min(1),
  passengers: z.coerce.number().int().min(1).max(50),
  luggage: z.string().trim().max(200).optional().or(z.literal("")),
  vehicleRequired: z.string().min(1),
});

export const customTourSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  mobileNumber: z.string().trim().regex(mobileRegex, "Enter a valid 10-digit mobile number"),
  destinations: z.string().trim().min(2).max(500),
  numberOfPeople: z.coerce.number().int().min(1).max(100),
  travelDates: z.string().trim().min(1).max(200),
  pickupLocation: z.string().trim().min(2).max(200),
  preferredVehicle: z.string().trim().min(1),
  numberOfDays: z.coerce.number().int().min(1).max(60),
});

export const contactEnquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  mobile: z.string().trim().regex(mobileRegex, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email().optional().or(z.literal("")),
  message: z.string().trim().min(5).max(1000),
});

export const adminLoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
});

/** Generates a human-friendly, roughly-sequential booking reference like MRO-2026-8F3K2. */
export function generateBookingReference(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `MRO-${year}-${random}`;
}
