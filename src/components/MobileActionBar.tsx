import { buildTelHref, buildWhatsAppLink } from "@/lib/whatsapp";

export default function MobileActionBar({
  phone,
  whatsapp,
}: {
  phone: string;
  whatsapp: string;
}) {
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-forest border-t-2 border-mustard/40 grid grid-cols-3 shadow-[0_-4px_12px_rgba(0,0,0,0.2)]">
      <a
        href={buildTelHref(phone)}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-cream text-xs font-sans font-medium active:bg-forest-light"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Call
      </a>
      <a
        href={buildWhatsAppLink(whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-cream text-xs font-sans font-medium bg-forest-light active:bg-forest-dark"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.14c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11a16.5 16.5 0 0 1-1.63-.6c-2.87-1.24-4.74-4.13-4.89-4.32-.14-.19-1.17-1.55-1.17-2.96s.73-2.1 1-2.39c.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.24.58.82 2 .89 2.14.07.15.11.32.02.51-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.29.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.25 1.38.29.14.46.12.63-.07.17-.19.72-.83.91-1.12.19-.29.38-.24.63-.14.26.09 1.65.78 1.93.92.29.14.48.21.55.33.07.12.07.68-.17 1.36z" />
        </svg>
        WhatsApp
      </a>
      <a
        href="/booking"
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-charcoal text-xs font-sans font-bold bg-mustard active:bg-mustard-light"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        </svg>
        Book Now
      </a>
    </div>
  );
}
