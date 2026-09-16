import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import StatusSelect from "@/components/admin/StatusSelect";
import { updateBookingNotes } from "@/app/admin/bookings/actions";
import { buildTelHref, buildWhatsAppLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function AdminBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
  });
  if (!booking) notFound();

  const saveNotes = updateBookingNotes.bind(null, booking.id);

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/bookings"
        className="text-sm text-forest font-semibold underline"
      >
        ← Back to Bookings
      </Link>

      <div className="flex items-center justify-between mt-4 mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl text-forest tracking-wide">
          {booking.referenceId}
        </h1>
        <StatusSelect bookingId={booking.id} status={booking.status} />
      </div>

      <div className="bg-white border-2 border-brown/20 rounded-vintage p-6 grid sm:grid-cols-2 gap-5 mb-6">
        <div>
          <p className="text-xs uppercase text-charcoal/50 font-semibold">
            Customer Name
          </p>
          <p className="text-charcoal mt-1">{booking.fullName}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-charcoal/50 font-semibold">
            Mobile Number
          </p>
          <p className="text-charcoal mt-1">{booking.mobileNumber}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-charcoal/50 font-semibold">
            WhatsApp Number
          </p>
          <p className="text-charcoal mt-1">
            {booking.whatsappNumber || booking.mobileNumber}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase text-charcoal/50 font-semibold">
            Travel Date
          </p>
          <p className="text-charcoal mt-1">
            {booking.travelDate.toLocaleDateString("en-IN")}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase text-charcoal/50 font-semibold">
            Pickup Location
          </p>
          <p className="text-charcoal mt-1">{booking.pickupLocation}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-charcoal/50 font-semibold">
            Drop Location
          </p>
          <p className="text-charcoal mt-1">{booking.dropLocation || "—"}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-charcoal/50 font-semibold">
            Passengers
          </p>
          <p className="text-charcoal mt-1">{booking.passengers}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-charcoal/50 font-semibold">
            Vehicle Required
          </p>
          <p className="text-charcoal mt-1">{booking.vehicleRequired}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-charcoal/50 font-semibold">
            Service Required
          </p>
          <p className="text-charcoal mt-1">
            {booking.serviceRequired.replaceAll("_", " ")}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase text-charcoal/50 font-semibold">
            Source
          </p>
          <p className="text-charcoal mt-1">{booking.source}</p>
        </div>
        {booking.message && (
          <div className="sm:col-span-2">
            <p className="text-xs uppercase text-charcoal/50 font-semibold">
              Message / Special Requirements
            </p>
            <p className="text-charcoal mt-1 whitespace-pre-line">
              {booking.message}
            </p>
          </div>
        )}
        <div>
          <p className="text-xs uppercase text-charcoal/50 font-semibold">
            Submitted
          </p>
          <p className="text-charcoal mt-1">
            {booking.createdAt.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <a
          href={buildTelHref(booking.mobileNumber)}
          className="flex-1 text-center rounded-vintage bg-forest text-cream font-semibold px-5 py-3"
        >
          Call Customer
        </a>
        <a
          href={buildWhatsAppLink(
            booking.whatsappNumber || booking.mobileNumber,
            `Hi ${booking.fullName}, this is Mountain Ride Ooty regarding your booking ${booking.referenceId}.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center rounded-vintage bg-mustard text-forest-dark font-semibold px-5 py-3"
        >
          Message on WhatsApp
        </a>
      </div>

      <div className="bg-white border-2 border-brown/20 rounded-vintage p-6">
        <h2 className="font-display text-forest tracking-wide text-sm uppercase mb-3">
          Internal Notes
        </h2>
        <form action={saveNotes} className="space-y-3">
          <textarea
            name="internalNotes"
            defaultValue={booking.internalNotes || ""}
            rows={4}
            className="w-full rounded-md border-2 border-brown/20 px-3 py-2 text-sm"
            placeholder="Notes visible only to the admin team..."
          />
          <button className="rounded-vintage bg-forest text-cream text-sm font-semibold px-5 py-2.5">
            Save Notes
          </button>
        </form>
      </div>
    </div>
  );
}
