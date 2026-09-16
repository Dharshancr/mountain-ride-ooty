import Link from "next/link";
import { prisma } from "@/lib/prisma";
import StatusSelect from "@/components/admin/StatusSelect";
import type { Prisma, BookingStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const statuses = ["NEW", "CONTACTED", "CONFIRMED", "COMPLETED", "CANCELLED"];

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: string;
    sort?: string;
    from?: string;
    to?: string;
  }>;
}) {
  const { q, status, sort, from, to } = await searchParams;

  const where: Prisma.BookingWhereInput = {};
  if (status && statuses.includes(status)) {
    where.status = status as BookingStatus;
  }
  if (q) {
    where.OR = [
      { fullName: { contains: q, mode: "insensitive" } },
      { mobileNumber: { contains: q } },
      { referenceId: { contains: q, mode: "insensitive" } },
      { pickupLocation: { contains: q, mode: "insensitive" } },
    ];
  }
  if (from || to) {
    where.travelDate = {
      ...(from ? { gte: new Date(from) } : {}),
      ...(to ? { lte: new Date(to) } : {}),
    };
  }

  const orderBy: Prisma.BookingOrderByWithRelationInput =
    sort === "oldest" ? { createdAt: "asc" } : { createdAt: "desc" };

  const bookings = await prisma.booking.findMany({ where, orderBy, take: 100 });

  return (
    <div>
      <h1 className="font-display text-2xl text-forest tracking-wide mb-6">
        BOOKINGS
      </h1>

      <form className="bg-white border-2 border-brown/20 rounded-vintage p-4 mb-6 grid md:grid-cols-5 gap-3 items-end">
        <label className="block md:col-span-2">
          <span className="block text-xs font-semibold text-charcoal/70 mb-1">
            Search
          </span>
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Name, mobile, reference..."
            className="w-full rounded-md border-2 border-brown/20 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-charcoal/70 mb-1">
            Status
          </span>
          <select
            name="status"
            defaultValue={status || ""}
            className="w-full rounded-md border-2 border-brown/20 px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-charcoal/70 mb-1">
            From
          </span>
          <input
            type="date"
            name="from"
            defaultValue={from}
            className="w-full rounded-md border-2 border-brown/20 px-3 py-2 text-sm"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-charcoal/70 mb-1">
            To
          </span>
          <input
            type="date"
            name="to"
            defaultValue={to}
            className="w-full rounded-md border-2 border-brown/20 px-3 py-2 text-sm"
          />
        </label>
        <div className="md:col-span-5 flex gap-3">
          <button className="rounded-vintage bg-forest text-cream text-sm font-semibold px-5 py-2.5">
            Filter
          </button>
          <Link
            href="/admin/bookings"
            className="rounded-vintage border-2 border-brown/20 text-sm font-semibold px-5 py-2.5"
          >
            Reset
          </Link>
        </div>
      </form>

      <div className="bg-white border-2 border-brown/20 rounded-vintage overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead className="bg-forest text-cream text-left">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Travel Date</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Vehicle</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t border-brown/10">
                <td className="px-4 py-3 font-semibold text-rust">
                  {b.referenceId}
                </td>
                <td className="px-4 py-3">{b.fullName}</td>
                <td className="px-4 py-3">{b.mobileNumber}</td>
                <td className="px-4 py-3">
                  {b.travelDate.toLocaleDateString("en-IN")}
                </td>
                <td className="px-4 py-3">
                  {b.serviceRequired.replaceAll("_", " ")}
                </td>
                <td className="px-4 py-3">{b.vehicleRequired}</td>
                <td className="px-4 py-3">
                  <StatusSelect bookingId={b.id} status={b.status} />
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/bookings/${b.id}`}
                    className="text-forest font-semibold underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-charcoal/60"
                >
                  No bookings match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
