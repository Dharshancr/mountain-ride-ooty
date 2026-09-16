import Link from "next/link";
import { createSightseeing } from "@/app/admin/sightseeing/actions";
import SightseeingFormFields from "@/components/admin/SightseeingFormFields";

export default function NewSightseeingPage() {
  return (
    <div className="max-w-2xl">
      <Link href="/admin/sightseeing" className="text-sm text-forest font-semibold underline">← Back to Sightseeing</Link>
      <h1 className="font-display text-2xl text-forest tracking-wide mt-4 mb-6">ADD DESTINATION</h1>
      <form action={createSightseeing} className="bg-white border-2 border-brown/20 rounded-vintage p-6 space-y-5">
        <SightseeingFormFields />
        <button className="rounded-vintage bg-rust text-cream text-sm font-semibold px-6 py-2.5">Save Destination</button>
      </form>
    </div>
  );
}
