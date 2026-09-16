import Link from "next/link";
import { createPackage } from "@/app/admin/packages/actions";
import PackageFormFields from "@/components/admin/PackageFormFields";

export default function NewPackagePage() {
  return (
    <div className="max-w-2xl">
      <Link href="/admin/packages" className="text-sm text-forest font-semibold underline">← Back to Packages</Link>
      <h1 className="font-display text-2xl text-forest tracking-wide mt-4 mb-6">ADD PACKAGE</h1>
      <form action={createPackage} className="bg-white border-2 border-brown/20 rounded-vintage p-6 space-y-5">
        <PackageFormFields />
        <button className="rounded-vintage bg-rust text-cream text-sm font-semibold px-6 py-2.5">Save Package</button>
      </form>
    </div>
  );
}
