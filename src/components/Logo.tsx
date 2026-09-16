import Link from "next/link";

export default function Logo({ dark = false }: { dark?: boolean }) {
  const textColor = dark ? "text-cream" : "text-forest";
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0 group">
      <svg
        width="44"
        height="44"
        viewBox="0 0 100 100"
        className="shrink-0"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="2.5" className={textColor} />
        <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" className={textColor} />
        {/* mountains */}
        <path d="M15 62 L35 34 L47 50 L58 30 L85 62 Z" fill="currentColor" className="text-mustard" />
        <path d="M15 62 L35 34 L47 50 L40 62 Z" fill="currentColor" className={textColor} opacity="0.85" />
        {/* road */}
        <path d="M40 62 Q50 72 60 62" fill="none" stroke="currentColor" strokeWidth="3" className={textColor} />
        {/* vehicle silhouette */}
        <rect x="44" y="66" width="12" height="5" rx="1.5" fill="currentColor" className="text-rust" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display tracking-wide text-lg md:text-xl ${textColor}`}>
          MOUNTAIN RIDE
        </span>
        <span className="font-serifTravel italic text-xs md:text-sm text-mustard -mt-0.5">
          O O T Y
        </span>
      </span>
    </Link>
  );
}
