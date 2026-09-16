import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminVehiclesPage() {
  const vehicles = await prisma.vehicle.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-forest tracking-wide">VEHICLES</h1>
        <Link href="/admin/vehicles/new" className="rounded-vintage bg-rust text-cream text-sm font-semibold px-5 py-2.5">
          + Add Vehicle
        </Link>
      </div>

      <div className="bg-white border-2 border-brown/20 rounded-vintage overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-forest text-cream text-left">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Capacity</th>
              <th className="px-4 py-3">Available</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-t border-brown/10">
                <td className="px-4 py-3 font-semibold">{v.name}</td>
                <td className="px-4 py-3">{v.capacityLabel}</td>
                <td className="px-4 py-3">{v.isAvailable ? "Yes" : "No"}</td>
                <td className="px-4 py-3">{v.isPublished ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/vehicles/${v.id}`} className="text-forest font-semibold underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {vehicles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-charcoal/60">
                  No vehicles yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
