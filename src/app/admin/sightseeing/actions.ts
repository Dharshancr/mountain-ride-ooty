"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function readCommon(formData: FormData) {
  return {
    name: formData.get("name")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    imageUrl: formData.get("imageUrl")?.toString() || null,
    stampLabel: formData.get("stampLabel")?.toString() || null,
    isPublished: formData.get("isPublished") === "on",
    displayOrder: Number(formData.get("displayOrder") || 0),
  };
}

export async function createSightseeing(formData: FormData) {
  const data = readCommon(formData);
  await prisma.sightseeingPlace.create({
    data: { ...data, slug: `${slugify(data.name)}-${Date.now().toString(36)}` },
  });
  revalidatePath("/admin/sightseeing");
  revalidatePath("/sightseeing");
  redirect("/admin/sightseeing");
}

export async function updateSightseeing(id: string, formData: FormData) {
  await prisma.sightseeingPlace.update({ where: { id }, data: readCommon(formData) });
  revalidatePath("/admin/sightseeing");
  revalidatePath("/sightseeing");
  redirect("/admin/sightseeing");
}

export async function deleteSightseeing(id: string) {
  await prisma.sightseeingPlace.delete({ where: { id } });
  revalidatePath("/admin/sightseeing");
  revalidatePath("/sightseeing");
}
