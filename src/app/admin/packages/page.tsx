import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  const packages = await prisma.tourPackage.findMany({ orderBy: { displayOrder: "asc" } });
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-forest tracking-wide">PACKAGES</h1>
        <Link href="/admin/packages/new" className="rounded-vintage bg-rust text-cream text-sm font-semibold px-5 py-2.5">
          + Add Package
        </Link>
      </div>
      <div className="bg-white border-2 border-brown/20 rounded-vintage overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-forest text-cream text-left">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => (
              <tr key={p.id} className="border-t border-brown/10">
                <td className="px-4 py-3 font-semibold">{p.title}</td>
                <td className="px-4 py-3">{p.durationLabel || "—"}</td>
                <td className="px-4 py-3">{p.startingPrice ? `₹${p.startingPrice.toLocaleString("en-IN")}` : "Contact for Price"}</td>
                <td className="px-4 py-3">{p.isPublished ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/packages/${p.id}`} className="text-forest font-semibold underline">Edit</Link>
                </td>
              </tr>
            ))}
            {packages.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-charcoal/60">No packages yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
