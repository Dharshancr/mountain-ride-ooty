/**
 * Builds a WhatsApp deep link (works on both desktop and mobile via wa.me)
 * with an optional pre-filled message. The phone number should be passed
 * without symbols; we strip non-digits and prefix with the India country
 * code (91) if it looks like a 10-digit local number.
 */
export function buildWhatsAppLink(phone: string, message?: string): string {
  const digits = phone.replace(/\D/g, "");
  const withCountryCode = digits.length === 10 ? `91${digits}` : digits;
  const base = `https://wa.me/${withCountryCode}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export type BookingWhatsAppDetails = {
  fullName: string;
  travelDate: string;
  pickupLocation: string;
  dropLocation?: string | null;
  passengers: number | string;
  vehicleRequired: string;
  serviceRequired: string;
};

export function buildBookingWhatsAppMessage(details: BookingWhatsAppDetails): string {
  const lines = [
    "Hi Mountain Ride Ooty, I'd like to make a booking:",
    `Name: ${details.fullName}`,
    `Travel Date: ${details.travelDate}`,
    `Pickup: ${details.pickupLocation}`,
    details.dropLocation ? `Drop: ${details.dropLocation}` : null,
    `Passengers: ${details.passengers}`,
    `Vehicle: ${details.vehicleRequired}`,
    `Service: ${details.serviceRequired}`,
  ].filter(Boolean);
  return lines.join("\n");
}

export function buildTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+91${digits.length === 10 ? digits : digits.slice(-10)}`;
}
