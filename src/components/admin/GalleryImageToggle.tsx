"use client";

import { useTransition } from "react";
import { toggleGalleryPublished, deleteGalleryImage } from "@/app/admin/gallery/actions";

export default function GalleryImageToggle({ id, isPublished }: { id: string; isPublished: boolean }) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex items-center gap-3 mt-2">
      <button
        disabled={isPending}
        onClick={() => startTransition(() => toggleGalleryPublished(id, !isPublished))}
        className={`text-xs font-semibold rounded-full px-3 py-1.5 ${
          isPublished ? "bg-forest/20 text-forest" : "bg-mustard/30 text-brown"
        }`}
      >
        {isPublished ? "Visible" : "Hidden"}
      </button>
      <button
        disabled={isPending}
        onClick={() => startTransition(() => deleteGalleryImage(id))}
        className="text-xs text-rust font-semibold underline"
      >
        Delete
      </button>
    </div>
  );
}
