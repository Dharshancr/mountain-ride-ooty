import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: settings.businessName,
    description: settings.tagline,
    telephone: settings.phonePrimary,
    areaServed: "Ooty, Nilgiris, Tamil Nadu",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ooty",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    ...(settings.email ? { email: settings.email } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main>{children}</main>
      <Footer
        phonePrimary={settings.phonePrimary}
        phoneSecondary={settings.phoneSecondary}
        location={settings.location}
        tagline={settings.tagline}
        facebookUrl={settings.facebookUrl}
        instagramUrl={settings.instagramUrl}
      />
      <MobileActionBar phone={settings.phonePrimary} whatsapp={settings.whatsappPrimary} />
    </>
  );
}
