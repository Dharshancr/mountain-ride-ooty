"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function readCommon(formData: FormData) {
  const priceRaw = formData.get("startingPrice")?.toString() ?? "";
  return {
    title: formData.get("title")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    attractions: formData.get("attractions")?.toString() ?? "",
    durationLabel: formData.get("durationLabel")?.toString() || null,
    startingPrice: priceRaw ? Number(priceRaw) : null,
    imageUrl: formData.get("imageUrl")?.toString() || null,
    isPublished: formData.get("isPublished") === "on",
    displayOrder: Number(formData.get("displayOrder") || 0),
  };
}

export async function createPackage(formData: FormData) {
  const data = readCommon(formData);
  await prisma.tourPackage.create({
    data: { ...data, slug: `${slugify(data.title)}-${Date.now().toString(36)}` },
  });
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  redirect("/admin/packages");
}

export async function updatePackage(id: string, formData: FormData) {
  await prisma.tourPackage.update({ where: { id }, data: readCommon(formData) });
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  redirect("/admin/packages");
}

export async function deletePackage(id: string) {
  await prisma.tourPackage.delete({ where: { id } });
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
}
