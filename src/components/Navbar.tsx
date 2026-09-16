"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/sightseeing", label: "Sightseeing" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/packages", label: "Packages" },
  { href: "/airport-transfer", label: "Airport Transfer" },
  { href: "/outstation", label: "Outstation" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow ${
        scrolled ? "shadow-vintage" : ""
      }`}
    >
      <div className="bg-cream/95 backdrop-blur border-b-2 border-brown/30">
        <nav className="mx-auto max-w-7xl px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Logo />

          <div className="hidden lg:flex items-center gap-6 font-sans text-sm font-medium text-charcoal">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-rust ${
                  pathname === link.href ? "text-rust" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/booking"
              className="hidden sm:inline-flex items-center rounded-vintage bg-rust text-cream font-sans font-semibold text-sm px-5 py-2.5 shadow-vintage hover:bg-rust-light transition-colors"
            >
              Book Now
            </Link>
            <button
              aria-label="Toggle menu"
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setOpen((v) => !v)}
            >
              <span className={`block h-0.5 w-6 bg-forest transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-forest transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-forest transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden bg-cream border-b-2 border-brown/30 transition-[max-height] duration-300 ${
          open ? "max-h-[28rem]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-4 py-3 gap-1 font-sans">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-2.5 border-b border-brown/10 text-charcoal ${
                pathname === link.href ? "text-rust font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="mt-3 mb-2 text-center rounded-vintage bg-rust text-cream font-semibold px-5 py-3"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
