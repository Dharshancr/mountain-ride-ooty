import { getSiteSettings } from "@/lib/settings";
import { updateSiteSettings } from "@/app/admin/settings/actions";

export const dynamic = "force-dynamic";

const inputClass = "w-full rounded-md border-2 border-brown/20 px-3 py-2 text-sm";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl text-forest tracking-wide mb-6">SITE SETTINGS</h1>
      <form action={updateSiteSettings} className="bg-white border-2 border-brown/20 rounded-vintage p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <label className="block">
            <span className="block text-xs font-semibold text-charcoal/70 mb-1">Business Name</span>
            <input name="businessName" defaultValue={settings.businessName} className={inputClass} required />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-charcoal/70 mb-1">Tagline</span>
            <input name="tagline" defaultValue={settings.tagline} className={inputClass} required />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-charcoal/70 mb-1">Primary Phone</span>
            <input name="phonePrimary" defaultValue={settings.phonePrimary} className={inputClass} required />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-charcoal/70 mb-1">Secondary Phone</span>
            <input name="phoneSecondary" defaultValue={settings.phoneSecondary} className={inputClass} required />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-charcoal/70 mb-1">Primary WhatsApp Number</span>
            <input name="whatsappPrimary" defaultValue={settings.whatsappPrimary} className={inputClass} required />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-charcoal/70 mb-1">Email (optional)</span>
            <input type="email" name="email" defaultValue={settings.email ?? ""} className={inputClass} />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-charcoal/70 mb-1">Location</span>
            <input name="location" defaultValue={settings.location} className={inputClass} required />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-charcoal/70 mb-1">Business Hours</span>
            <input name="businessHours" defaultValue={settings.businessHours} className={inputClass} required />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-charcoal/70 mb-1">Facebook URL (optional)</span>
            <input name="facebookUrl" defaultValue={settings.facebookUrl ?? ""} className={inputClass} />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-charcoal/70 mb-1">Instagram URL (optional)</span>
            <input name="instagramUrl" defaultValue={settings.instagramUrl ?? ""} className={inputClass} />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-charcoal/70 mb-1">Logo URL (optional)</span>
            <input name="logoUrl" defaultValue={settings.logoUrl ?? ""} className={inputClass} />
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-charcoal/70 mb-1">Hero Image URL (optional)</span>
            <input name="heroImageUrl" defaultValue={settings.heroImageUrl ?? ""} className={inputClass} />
          </label>
          <label className="block md:col-span-2">
            <span className="block text-xs font-semibold text-charcoal/70 mb-1">Primary CTA Text</span>
            <input name="primaryCtaText" defaultValue={settings.primaryCtaText} className={inputClass} required />
          </label>
        </div>
        <button className="rounded-vintage bg-rust text-cream text-sm font-semibold px-6 py-2.5">Save Settings</button>
      </form>
    </div>
  );
}
