import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePackage, deletePackage } from "@/app/admin/packages/actions";
import PackageFormFields from "@/components/admin/PackageFormFields";

export const dynamic = "force-dynamic";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const pkg = await prisma.tourPackage.findUnique({
    where: { id },
  });
  if (!pkg) notFound();
  const save = updatePackage.bind(null, pkg.id);
  const remove = deletePackage.bind(null, pkg.id);
  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/packages"
        className="text-sm text-forest font-semibold underline"
      >
        ← Back to Packages
      </Link>
      <h1 className="font-display text-2xl text-forest tracking-wide mt-4 mb-6">
        EDIT PACKAGE
      </h1>
      <form
        action={save}
        className="bg-white border-2 border-brown/20 rounded-vintage p-6 space-y-5"
      >
        <PackageFormFields pkg={pkg} />
        <button className="rounded-vintage bg-rust text-cream text-sm font-semibold px-6 py-2.5">
          Save Changes
        </button>
      </form>
      <form action={remove} className="mt-4">
        <button className="text-sm text-rust font-semibold underline">
          Delete Package
        </button>
      </form>
    </div>
  );
}
