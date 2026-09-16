import Link from "next/link";
import ImagePlaceholder from "./ImagePlaceholder";

export type PackageCardData = {
  id: string;
  title: string;
  description: string;
  attractions: string;
  durationLabel?: string | null;
  startingPrice?: number | null;
  imageUrl?: string | null;
};

export default function PackageCard({ pkg }: { pkg: PackageCardData }) {
  return (
    <div className="bg-cream border-2 border-brown/30 rounded-vintage overflow-hidden shadow-vintage flex flex-col">
      <ImagePlaceholder src={pkg.imageUrl} alt={pkg.title} className="h-44 w-full" />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-lg text-forest tracking-wide">{pkg.title}</h3>
          {pkg.durationLabel && (
            <span className="text-[11px] uppercase bg-forest/10 text-forest px-2 py-1 rounded-full whitespace-nowrap">
              {pkg.durationLabel}
            </span>
          )}
        </div>
        <p className="text-sm text-charcoal/80 mt-2">{pkg.description}</p>
        <p className="text-xs text-brown mt-3">
          <span className="font-semibold">Includes:</span> {pkg.attractions}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-display text-rust text-lg">
            {pkg.startingPrice ? `From ₹${pkg.startingPrice.toLocaleString("en-IN")}` : "Contact for Price"}
          </span>
        </div>
        <Link
          href={`/booking?package=${encodeURIComponent(pkg.title)}`}
          className="mt-3 inline-flex justify-center items-center rounded-vintage bg-rust text-cream font-sans font-semibold text-sm px-4 py-2.5 hover:bg-rust-light transition-colors"
        >
          Book This Package
        </Link>
      </div>
    </div>
  );
}
