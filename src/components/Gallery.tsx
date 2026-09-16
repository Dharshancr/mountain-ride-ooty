"use client";

import { useState } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

export type GalleryImageData = {
  id: string;
  imageUrl: string;
  caption?: string | null;
};

export default function Gallery({ images }: { images: GalleryImageData[] }) {
  const [active, setActive] = useState<GalleryImageData | null>(null);

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setActive(img)}
            className="mb-4 block w-full break-inside-avoid rounded-vintage overflow-hidden border-2 border-brown/30 shadow-vintage"
          >
            <ImagePlaceholder
              src={img.imageUrl}
              alt={img.caption || "Nilgiris gallery photo"}
              className={i % 3 === 0 ? "h-64 w-full" : "h-44 w-full"}
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] bg-charcoal/90 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div className="max-w-3xl w-full">
            <ImagePlaceholder src={active.imageUrl} alt={active.caption || "Gallery photo"} className="h-[60vh] w-full rounded-vintage" />
            {active.caption && <p className="text-cream text-center mt-3">{active.caption}</p>}
          </div>
        </div>
      )}
    </>
  );
}
