import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import GalleryImageToggle from "@/components/admin/GalleryImageToggle";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { displayOrder: "asc" } });
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-forest tracking-wide">GALLERY</h1>
        <Link href="/admin/gallery/new" className="rounded-vintage bg-rust text-cream text-sm font-semibold px-5 py-2.5">
          + Add Image
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {images.map((img) => (
          <div key={img.id} className="bg-white border-2 border-brown/20 rounded-vintage overflow-hidden p-3">
            <ImagePlaceholder src={img.imageUrl} alt={img.caption || "Gallery image"} className="h-32 w-full rounded-md" />
            <p className="text-xs text-charcoal/70 mt-2 truncate">{img.caption || "No caption"}</p>
            <GalleryImageToggle id={img.id} isPublished={img.isPublished} />
          </div>
        ))}
        {images.length === 0 && <p className="text-charcoal/60">No gallery images yet.</p>}
      </div>
    </div>
  );
}
