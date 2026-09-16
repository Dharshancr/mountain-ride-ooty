import type { SightseeingPlace } from "@prisma/client";

const inputClass = "w-full rounded-md border-2 border-brown/20 px-3 py-2 text-sm";

export default function SightseeingFormFields({ place }: { place?: SightseeingPlace }) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <label className="block">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Name</span>
        <input name="name" defaultValue={place?.name} className={inputClass} required />
      </label>
      <label className="block">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Stamp Label</span>
        <input name="stampLabel" defaultValue={place?.stampLabel ?? ""} className={inputClass} placeholder="e.g. NILGIRIS" />
      </label>
      <label className="block md:col-span-2">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Description</span>
        <textarea name="description" defaultValue={place?.description} rows={3} className={inputClass} required />
      </label>
      <label className="block">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Image URL</span>
        <input name="imageUrl" defaultValue={place?.imageUrl ?? ""} className={inputClass} />
      </label>
      <label className="block">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Display Order</span>
        <input type="number" name="displayOrder" defaultValue={place?.displayOrder ?? 0} className={inputClass} />
      </label>
      <div className="flex items-center pt-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isPublished" defaultChecked={place?.isPublished ?? true} />
          Published
        </label>
      </div>
    </div>
  );
}
