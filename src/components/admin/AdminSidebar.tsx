"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/app/admin/actions";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/vehicles", label: "Vehicles" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/sightseeing", label: "Sightseeing" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 shrink-0 bg-forest-dark text-cream md:min-h-screen">
      <div className="p-5 border-b border-cream/10">
        <p className="font-display text-mustard tracking-wide text-sm">MOUNTAIN RIDE OOTY</p>
        <p className="text-xs text-cream/60 mt-1">Admin Dashboard</p>
      </div>
      <nav className="p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2.5 rounded-md text-sm font-sans whitespace-nowrap ${
                active ? "bg-mustard text-forest-dark font-semibold" : "text-cream/80 hover:bg-cream/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-5 border-t border-cream/10 mt-auto hidden md:block">
        <p className="text-xs text-cream/60 mb-3">Signed in as {adminName}</p>
        <form action={logoutAdmin}>
          <button className="text-sm text-rust-light hover:text-rust font-semibold">Log out</button>
        </form>
      </div>
    </aside>
  );
}
