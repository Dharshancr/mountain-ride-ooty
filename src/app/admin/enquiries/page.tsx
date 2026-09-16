import { prisma } from "@/lib/prisma";
import EnquiryHandledToggle from "@/components/admin/EnquiryHandledToggle";
import { buildTelHref, buildWhatsAppLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.contactEnquiry.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="font-display text-2xl text-forest tracking-wide mb-6">CONTACT ENQUIRIES</h1>
      <div className="grid gap-4">
        {enquiries.map((e) => (
          <div key={e.id} className="bg-white border-2 border-brown/20 rounded-vintage p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="font-semibold">{e.name} — {e.mobile}</p>
                {e.email && <p className="text-xs text-charcoal/60">{e.email}</p>}
              </div>
              <EnquiryHandledToggle id={e.id} isHandled={e.isHandled} />
            </div>
            <p className="text-sm text-charcoal/80 mt-3">{e.message}</p>
            <div className="flex gap-4 mt-3 text-sm">
              <a href={buildTelHref(e.mobile)} className="text-forest font-semibold underline">Call</a>
              <a href={buildWhatsAppLink(e.mobile, `Hi ${e.name}, following up on your enquiry with Mountain Ride Ooty.`)} target="_blank" rel="noopener noreferrer" className="text-forest font-semibold underline">
                WhatsApp
              </a>
            </div>
          </div>
        ))}
        {enquiries.length === 0 && <p className="text-charcoal/60">No enquiries yet.</p>}
      </div>
    </div>
  );
}
