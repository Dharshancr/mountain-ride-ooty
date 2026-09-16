import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getStats() {
  const [total, newCount, confirmed, completed, enquiries, upcoming] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "NEW" } }),
    prisma.booking.count({ where: { status: "CONFIRMED" } }),
    prisma.booking.count({ where: { status: "COMPLETED" } }),
    prisma.contactEnquiry.count({ where: { isHandled: false } }),
    prisma.booking.findMany({
      where: { travelDate: { gte: new Date() }, status: { in: ["NEW", "CONTACTED", "CONFIRMED"] } },
      orderBy: { travelDate: "asc" },
      take: 5,
    }),
  ]);
  return { total, newCount, confirmed, completed, enquiries, upcoming };
}

const statCards = (stats: Awaited<ReturnType<typeof getStats>>) => [
  { label: "Total Bookings", value: stats.total, href: "/admin/bookings" },
  { label: "New Bookings", value: stats.newCount, href: "/admin/bookings?status=NEW" },
  { label: "Confirmed", value: stats.confirmed, href: "/admin/bookings?status=CONFIRMED" },
  { label: "Completed", value: stats.completed, href: "/admin/bookings?status=COMPLETED" },
  { label: "Open Enquiries", value: stats.enquiries, href: "/admin/enquiries" },
];

export default async function AdminOverviewPage() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="font-display text-2xl text-forest tracking-wide mb-6">DASHBOARD OVERVIEW</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {statCards(stats).map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white border-2 border-brown/20 rounded-vintage p-5 hover:border-mustard transition-colors"
          >
            <p className="text-3xl font-display text-forest">{card.value}</p>
            <p className="text-xs text-charcoal/60 mt-1 uppercase tracking-wide">{card.label}</p>
          </Link>
        ))}
      </div>

      <h2 className="font-display text-lg text-forest tracking-wide mb-3">Upcoming Trips</h2>
      <div className="bg-white border-2 border-brown/20 rounded-vintage overflow-hidden">
        {stats.upcoming.length === 0 ? (
          <p className="p-6 text-sm text-charcoal/60">No upcoming trips scheduled.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-forest text-cream text-left">
              <tr>
                <th className="px-4 py-3">Reference</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Travel Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.upcoming.map((b) => (
                <tr key={b.id} className="border-t border-brown/10">
                  <td className="px-4 py-3">
                    <Link href={`/admin/bookings/${b.id}`} className="text-rust font-semibold">
                      {b.referenceId}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{b.fullName}</td>
                  <td className="px-4 py-3">{b.travelDate.toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
