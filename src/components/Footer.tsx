import Link from "next/link";
import Logo from "./Logo";

export default function Footer({
  phonePrimary,
  phoneSecondary,
  location,
  tagline,
  facebookUrl,
  instagramUrl,
}: {
  phonePrimary: string;
  phoneSecondary: string;
  location: string;
  tagline: string;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
}) {
  return (
    <footer className="bg-forest-dark text-cream pb-20 sm:pb-0">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <Logo dark />
          <p className="font-serifTravel italic text-mustard mt-4 text-sm">{tagline}</p>
          <p className="text-cream/70 text-sm mt-3">{location}</p>
          <div className="flex gap-3 mt-4">
            {facebookUrl && (
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-mustard">
                Facebook
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-mustard">
                Instagram
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-display tracking-wide text-mustard mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/vehicles">Vehicles</Link></li>
            <li><Link href="/packages">Packages</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display tracking-wide text-mustard mb-3">Services</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link href="/sightseeing">Ooty Sightseeing</Link></li>
            <li><Link href="/airport-transfer">Airport Transfer</Link></li>
            <li><Link href="/outstation">Outstation Taxi</Link></li>
            <li><Link href="/custom-tour">Custom Tour</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display tracking-wide text-mustard mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>{phonePrimary}</li>
            <li>{phoneSecondary}</li>
            <li className="pt-2">
              <Link href="/privacy-policy" className="underline">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="underline">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link href="/cancellation-policy" className="underline">Cancellation Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} Mountain Ride Ooty. All Rights Reserved.
      </div>
    </footer>
  );
}
