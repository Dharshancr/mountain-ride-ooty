import type { TourPackage } from "@prisma/client";

const inputClass = "w-full rounded-md border-2 border-brown/20 px-3 py-2 text-sm";

export default function PackageFormFields({ pkg }: { pkg?: TourPackage }) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <label className="block md:col-span-2">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Title</span>
        <input name="title" defaultValue={pkg?.title} className={inputClass} required />
      </label>
      <label className="block md:col-span-2">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Description</span>
        <textarea name="description" defaultValue={pkg?.description} rows={3} className={inputClass} required />
      </label>
      <label className="block md:col-span-2">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Attractions (comma-separated)</span>
        <input name="attractions" defaultValue={pkg?.attractions} className={inputClass} required />
      </label>
      <label className="block">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Duration Label</span>
        <input name="durationLabel" defaultValue={pkg?.durationLabel ?? ""} className={inputClass} placeholder="e.g. 1 Day" />
      </label>
      <label className="block">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">
          Starting Price (₹, leave blank for &quot;Contact for Price&quot;)
        </span>
        <input type="number" name="startingPrice" defaultValue={pkg?.startingPrice ?? ""} className={inputClass} />
      </label>
      <label className="block">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Image URL</span>
        <input name="imageUrl" defaultValue={pkg?.imageUrl ?? ""} className={inputClass} />
      </label>
      <label className="block">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Display Order</span>
        <input type="number" name="displayOrder" defaultValue={pkg?.displayOrder ?? 0} className={inputClass} />
      </label>
      <div className="flex items-center pt-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isPublished" defaultChecked={pkg?.isPublished ?? true} />
          Published
        </label>
      </div>
    </div>
  );
}
