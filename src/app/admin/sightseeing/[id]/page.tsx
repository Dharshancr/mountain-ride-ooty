import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  updateSightseeing,
  deleteSightseeing,
} from "@/app/admin/sightseeing/actions";
import SightseeingFormFields from "@/components/admin/SightseeingFormFields";

export const dynamic = "force-dynamic";

export default async function EditSightseeingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const place = await prisma.sightseeingPlace.findUnique({
    where: { id },
  });
  if (!place) notFound();
  const save = updateSightseeing.bind(null, place.id);
  const remove = deleteSightseeing.bind(null, place.id);
  return (
    <div className="max-w-2xl">
      <Link
        href="/admin/sightseeing"
        className="text-sm text-forest font-semibold underline"
      >
        ← Back to Sightseeing
      </Link>
      <h1 className="font-display text-2xl text-forest tracking-wide mt-4 mb-6">
        EDIT DESTINATION
      </h1>
      <form
        action={save}
        className="bg-white border-2 border-brown/20 rounded-vintage p-6 space-y-5"
      >
        <SightseeingFormFields place={place} />
        <button className="rounded-vintage bg-rust text-cream text-sm font-semibold px-6 py-2.5">
          Save Changes
        </button>
      </form>
      <form action={remove} className="mt-4">
        <button className="text-sm text-rust font-semibold underline">
          Delete Destination
        </button>
      </form>
    </div>
  );
}
