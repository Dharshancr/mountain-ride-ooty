import Link from "next/link";

const icons: Record<string, JSX.Element> = {
  car: (
    <path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm14 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3 17V11l2-5h14l2 5v6" />
  ),
  compass: <circle cx="12" cy="12" r="9" />,
  plane: <path d="M2 16l20-8-8 20-3-8-9-4z" />,
  train: <rect x="5" y="4" width="14" height="14" rx="2" />,
  users: <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M11 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />,
  map: <path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z" />,
  hotel: <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />,
};

export type ServiceCardData = {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
  ctaLabel: string;
  ctaHref: string;
};

export default function ServiceCard({ service }: { service: ServiceCardData }) {
  return (
    <div className="bg-cream border-2 border-brown/30 rounded-vintage p-6 shadow-vintage flex flex-col items-start hover:-translate-y-1 transition-transform">
      <div className="h-12 w-12 rounded-full bg-forest text-mustard flex items-center justify-center mb-4">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icons[service.icon || "car"] || icons.car}
        </svg>
      </div>
      <h3 className="font-display text-lg text-forest tracking-wide">{service.title}</h3>
      <p className="text-sm text-charcoal/80 mt-2 flex-1">{service.description}</p>
      <Link
        href={service.ctaHref}
        className="mt-4 text-rust font-sans font-semibold text-sm underline underline-offset-4 hover:text-rust-light"
      >
        {service.ctaLabel} →
      </Link>
    </div>
  );
}
