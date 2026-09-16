"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function isValidImageUrl(url: string) {
  try {
    const parsed = new URL(url);

    // Only allow HTTP/HTTPS URLs
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return false;
    }

    // Reject known sharing/redirect URLs
    const blockedHosts = [
      "share.google",
      "photos.google.com",
      "drive.google.com",
    ];

    if (blockedHosts.some((host) => parsed.hostname.includes(host))) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function createGalleryImage(formData: FormData) {
  const imageUrl = formData.get("imageUrl")?.toString().trim() ?? "";

  if (!imageUrl) {
    throw new Error("Image URL is required.");
  }

  if (!isValidImageUrl(imageUrl)) {
    throw new Error(
      "Please enter a direct image URL. Google sharing links are not supported."
    );
  }

  await prisma.galleryImage.create({
    data: {
      imageUrl,

      caption:
        formData.get("caption")?.toString().trim() || null,

      category:
        formData.get("category")?.toString().trim() || null,

      isPublished:
        formData.get("isPublished") === "on",

      displayOrder:
        Number(formData.get("displayOrder") || 0),
    },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");

  redirect("/admin/gallery");
}

export async function toggleGalleryPublished(
  id: string,
  published: boolean
) {
  await prisma.galleryImage.update({
    where: { id },
    data: {
      isPublished: published,
    },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteGalleryImage(id: string) {
  await prisma.galleryImage.delete({
    where: { id },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}