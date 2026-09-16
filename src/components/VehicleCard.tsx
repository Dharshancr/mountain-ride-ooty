import Link from "next/link";
import ImagePlaceholder from "./ImagePlaceholder";

export type VehicleCardData = {
  id: string;
  name: string;
  capacityLabel: string;
  idealUsage: string;
  description: string;
  imageUrl?: string | null;
  isAvailable: boolean;
};

export default function VehicleCard({ vehicle }: { vehicle: VehicleCardData }) {
  return (
    <div className="bg-cream border-2 border-brown/30 rounded-vintage overflow-hidden shadow-vintage flex flex-col">
      <ImagePlaceholder src={vehicle.imageUrl} alt={vehicle.name} className="h-48 w-full" />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl text-forest tracking-wide">{vehicle.name}</h3>
          {!vehicle.isAvailable && (
            <span className="text-[10px] uppercase tracking-wide bg-brown/20 text-brown px-2 py-1 rounded-full whitespace-nowrap">
              Check Availability
            </span>
          )}
        </div>
        <p className="text-sm text-rust font-semibold mt-1">{vehicle.capacityLabel}</p>
        <p className="text-xs text-charcoal/60 mt-1 italic">{vehicle.idealUsage}</p>
        <p className="text-sm text-charcoal/80 mt-3 flex-1">{vehicle.description}</p>
        <Link
          href={`/booking?vehicle=${encodeURIComponent(vehicle.name)}`}
          className="mt-4 inline-flex justify-center items-center rounded-vintage bg-forest text-cream font-sans font-semibold text-sm px-4 py-2.5 hover:bg-forest-light transition-colors"
        >
          Book This Vehicle
        </Link>
      </div>
    </div>
  );
}
