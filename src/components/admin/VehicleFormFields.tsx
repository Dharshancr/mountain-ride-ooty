import type { Vehicle } from "@prisma/client";

const inputClass = "w-full rounded-md border-2 border-brown/20 px-3 py-2 text-sm";

export default function VehicleFormFields({ vehicle }: { vehicle?: Vehicle }) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <label className="block">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Name</span>
        <input name="name" defaultValue={vehicle?.name} className={inputClass} required />
      </label>
      <label className="block">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Capacity Label</span>
        <input name="capacityLabel" defaultValue={vehicle?.capacityLabel} className={inputClass} required placeholder="e.g. Up to 7 passengers + driver" />
      </label>
      <label className="block">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Ideal Usage</span>
        <input name="idealUsage" defaultValue={vehicle?.idealUsage} className={inputClass} required />
      </label>
      <label className="block">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Image URL</span>
        <input name="imageUrl" defaultValue={vehicle?.imageUrl ?? ""} className={inputClass} placeholder="https://..." />
      </label>
      <label className="block md:col-span-2">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Description</span>
        <textarea name="description" defaultValue={vehicle?.description} rows={3} className={inputClass} required />
      </label>
      <label className="block">
        <span className="block text-xs font-semibold text-charcoal/70 mb-1">Display Order</span>
        <input type="number" name="displayOrder" defaultValue={vehicle?.displayOrder ?? 0} className={inputClass} />
      </label>
      <div className="flex items-center gap-6 pt-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isAvailable" defaultChecked={vehicle?.isAvailable ?? true} />
          Available
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isPublished" defaultChecked={vehicle?.isPublished ?? true} />
          Published
        </label>
      </div>
    </div>
  );
}
