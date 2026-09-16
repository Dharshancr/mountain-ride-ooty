import Link from "next/link";
import Image from "next/image";

const badges = ["Ooty Sightseeing", "Airport Transfers", "Group Travel", "Outstation Trips"];

export default function Hero({
  whatsappHref,
  heroImageUrl,
}: {
  whatsappHref: string;
  heroImageUrl?: string | null;
}) {
  return (
    <section className="relative overflow-hidden bg-forest-dark min-h-[88vh] flex items-center">
      {heroImageUrl ? (
        <Image
          src={heroImageUrl}
          alt="Misty Nilgiri mountains and tea plantations"
          fill
          priority
          className="object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-b from-forest via-forest-dark to-charcoal"
          aria-hidden="true"
        />
      )}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(211,160,44,0.18), transparent 45%), radial-gradient(circle at 80% 70%, rgba(178,74,43,0.15), transparent 40%)",
        }}
        aria-hidden="true"
      />
      {heroImageUrl && <div className="absolute inset-0 bg-charcoal/50" aria-hidden="true" />}
      {/* Mountain silhouette illustration */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-80"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path fill="#122A20" d="M0 224 L120 140 L240 200 L360 100 L480 190 L600 90 L720 180 L840 120 L960 210 L1080 130 L1200 200 L1320 150 L1440 220 L1440 320 L0 320 Z" />
      </svg>
      <div className="absolute inset-0 bg-charcoal/20" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-4 md:px-6 py-24 text-center">
        <span className="inline-block stamp bg-cream/10 text-mustard text-xs tracking-[0.2em] uppercase px-3 py-1 mb-6 rotate-[-2deg]">
          EST. OOTY • NILGIRIS
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-cream tracking-wide text-shadow-vintage leading-[1.05]">
          EXPLORE OOTY.
          <br />
          RIDE THE MOUNTAINS.
        </h1>
        <p className="font-serifTravel italic text-mustard text-lg md:text-2xl mt-6">
          Discover the beauty of the Nilgiris with Mountain Ride Ooty.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {badges.map((b) => (
            <span
              key={b}
              className="text-[11px] md:text-xs uppercase tracking-wide bg-cream/10 border border-mustard/40 text-cream px-3 py-1.5 rounded-full"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            href="/booking"
            className="w-full sm:w-auto inline-flex justify-center items-center rounded-vintage bg-rust text-cream font-sans font-bold text-base px-8 py-4 shadow-vintage hover:bg-rust-light transition-colors"
          >
            Book Your Ride
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex justify-center items-center rounded-vintage bg-mustard text-forest-dark font-sans font-bold text-base px-8 py-4 shadow-vintage hover:bg-mustard-light transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
