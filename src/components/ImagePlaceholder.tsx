import Image from "next/image";

/**
 * Renders a real image if imageUrl is provided (and not a local /images/... path
 * that hasn't been uploaded yet), otherwise falls back to a tasteful vintage-style
 * placeholder panel so the layout never looks broken before an admin uploads photos.
 */
export default function ImagePlaceholder({
  src,
  alt,
  label,
  className = "",
}: {
  src?: string | null;
  alt: string;
  label?: string;
  className?: string;
}) {
  const isLocalUnseeded = !src || src.startsWith("/images/");

  if (!isLocalUnseeded) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src as string} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-forest via-forest-light to-brown flex items-center justify-center ${className}`}
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(244,236,221,0.25),transparent_45%)]" />
      <svg width="64" height="64" viewBox="0 0 100 100" className="opacity-60">
        <path d="M10 70 L35 35 L50 55 L65 30 L90 70 Z" fill="#F4ECDD" />
        <circle cx="75" cy="24" r="7" fill="#D3A02C" />
      </svg>
      <span className="absolute bottom-3 left-3 right-3 text-cream/80 text-xs font-sans tracking-wide uppercase">
        {label || alt}
      </span>
    </div>
  );
}
