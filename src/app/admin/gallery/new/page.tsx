import Link from "next/link";
import { createGalleryImage } from "@/app/admin/gallery/actions";

const inputClass = "w-full rounded-md border-2 border-brown/20 px-3 py-2 text-sm";

export default function NewGalleryImagePage() {
  return (
    <div className="max-w-xl">
      <Link href="/admin/gallery" className="text-sm text-forest font-semibold underline">← Back to Gallery</Link>
      <h1 className="font-display text-2xl text-forest tracking-wide mt-4 mb-6">ADD GALLERY IMAGE</h1>
      <form action={createGalleryImage} className="bg-white border-2 border-brown/20 rounded-vintage p-6 space-y-5">
        <label className="block">
          <span className="block text-xs font-semibold text-charcoal/70 mb-1">Image URL</span>
          <input name="imageUrl" className={inputClass} placeholder="https://..." required />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-charcoal/70 mb-1">Caption (optional)</span>
          <input name="caption" className={inputClass} />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-charcoal/70 mb-1">Category (optional)</span>
          <input name="category" className={inputClass} placeholder="e.g. mountains, vehicles, drivers" />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-charcoal/70 mb-1">Display Order</span>
          <input type="number" name="displayOrder" defaultValue={0} className={inputClass} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isPublished" defaultChecked />
          Published
        </label>
        <button className="rounded-vintage bg-rust text-cream text-sm font-semibold px-6 py-2.5">Save Image</button>
      </form>
      <p className="text-xs text-charcoal/50 mt-4">
        Note: this project stores an image URL rather than a file upload. Host your photos (e.g. via Cloudinary, S3
        or any image CDN) and paste the resulting URL here.
      </p>
    </div>
  );
}
