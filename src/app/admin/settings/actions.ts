"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function readSettings(formData: FormData) {
  return {
    businessName: formData.get("businessName")?.toString() ?? "Mountain Ride Ooty",
    tagline: formData.get("tagline")?.toString() ?? "",
    phonePrimary: formData.get("phonePrimary")?.toString() ?? "",
    phoneSecondary: formData.get("phoneSecondary")?.toString() ?? "",
    whatsappPrimary: formData.get("whatsappPrimary")?.toString() ?? "",
    email: formData.get("email")?.toString() || null,
    location: formData.get("location")?.toString() ?? "",
    businessHours: formData.get("businessHours")?.toString() ?? "",
    facebookUrl: formData.get("facebookUrl")?.toString() || null,
    instagramUrl: formData.get("instagramUrl")?.toString() || null,
    logoUrl: formData.get("logoUrl")?.toString() || null,
    heroImageUrl: formData.get("heroImageUrl")?.toString() || null,
    primaryCtaText: formData.get("primaryCtaText")?.toString() ?? "Book Your Ride",
  };
}

export async function updateSiteSettings(formData: FormData) {
  const data = readSettings(formData);
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
}
