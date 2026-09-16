import type { Metadata } from "next";
import Section, { SectionHeading } from "@/components/Section";
import Gallery from "@/components/Gallery";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Gallery | Experience the Nilgiris",
  description: "Photos of Ooty mountains, Ooty Lake, Doddabetta, Pykara, Coonoor, tea estates and our vehicles.",
};

export const dynamic = "force-dynamic";

async function getGalleryImages() {
  try {
    return await prisma.galleryImage.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <Section className="bg-paper">
      <SectionHeading eyebrow="Gallery" title="EXPERIENCE THE NILGIRIS" />
      {images.length > 0 ? (
        <Gallery images={images} />
      ) : (
        <p className="text-center text-charcoal/60">
          Gallery photos will appear here once added from the admin dashboard.
        </p>
      )}
    </Section>
  );
}
