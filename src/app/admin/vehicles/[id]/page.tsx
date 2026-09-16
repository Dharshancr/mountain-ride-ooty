import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateVehicle, deleteVehicle } from "@/app/admin/vehicles/actions";
import VehicleFormFields from "@/components/admin/VehicleFormFields";

export const dynamic = "force-dynamic";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
  });
  if (!vehicle) notFound();

  const save = updateVehicle.bind(null, vehicle.id);
  const remove = deleteVehicle.bind(null, vehicle.id);

  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/vehicles"
        className="text-sm text-forest font-semibold underline"
      >
        ← Back to Vehicles
      </Link>
      <h1 className="font-display text-2xl text-forest tracking-wide mt-4 mb-6">
        EDIT VEHICLE
      </h1>
      <form
        action={save}
        className="bg-white border-2 border-brown/20 rounded-vintage p-6 space-y-5"
      >
        <VehicleFormFields vehicle={vehicle} />
        <button className="rounded-vintage bg-rust text-cream text-sm font-semibold px-6 py-2.5">
          Save Changes
        </button>
      </form>
      <form action={remove} className="mt-4">
        <button className="text-sm text-rust font-semibold underline">
          Delete Vehicle
        </button>
      </form>
    </div>
  );
}
