import ImagePlaceholder from "./ImagePlaceholder";

export type DestinationCardData = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  stampLabel?: string | null;
};

export default function DestinationCard({
  place,
  index,
}: {
  place: DestinationCardData;
  index: number;
}) {
  return (
    <div className="bg-cream border-2 border-brown/30 rounded-vintage overflow-hidden shadow-vintage group">
      <div className="relative">
        <ImagePlaceholder src={place.imageUrl} alt={place.name} className="h-52 w-full" />
        <span className="absolute top-3 left-3 stamp bg-cream/90 text-brown text-xs font-sans font-bold px-2 py-1 rotate-[-4deg]">
          {place.stampLabel || "NILGIRIS"}
        </span>
        <span className="absolute top-3 right-3 h-9 w-9 rounded-full bg-mustard text-forest font-display flex items-center justify-center text-sm shadow-stamp">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg text-forest tracking-wide">{place.name}</h3>
        <p className="text-sm text-charcoal/80 mt-2">{place.description}</p>
        <button className="mt-4 text-rust font-sans font-semibold text-sm underline underline-offset-4 hover:text-rust-light">
          Explore →
        </button>
      </div>
    </div>
  );
}
