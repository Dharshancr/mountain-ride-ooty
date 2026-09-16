import Link from "next/link";
import { createVehicle } from "@/app/admin/vehicles/actions";
import VehicleFormFields from "@/components/admin/VehicleFormFields";

export default function NewVehiclePage() {
  return (
    <div className="max-w-2xl">
      <Link href="/admin/vehicles" className="text-sm text-forest font-semibold underline">← Back to Vehicles</Link>
      <h1 className="font-display text-2xl text-forest tracking-wide mt-4 mb-6">ADD VEHICLE</h1>
      <form action={createVehicle} className="bg-white border-2 border-brown/20 rounded-vintage p-6 space-y-5">
        <VehicleFormFields />
        <button className="rounded-vintage bg-rust text-cream text-sm font-semibold px-6 py-2.5">Save Vehicle</button>
      </form>
    </div>
  );
}
