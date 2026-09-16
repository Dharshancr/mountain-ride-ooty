"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createVehicle(formData: FormData) {
  const name = formData.get("name")?.toString() ?? "";
  await prisma.vehicle.create({
    data: {
      name,
      slug: `${slugify(name)}-${Date.now().toString(36)}`,
      capacityLabel: formData.get("capacityLabel")?.toString() ?? "",
      idealUsage: formData.get("idealUsage")?.toString() ?? "",
      description: formData.get("description")?.toString() ?? "",
      imageUrl: formData.get("imageUrl")?.toString() || null,
      isAvailable: formData.get("isAvailable") === "on",
      isPublished: formData.get("isPublished") === "on",
      displayOrder: Number(formData.get("displayOrder") || 0),
    },
  });
  revalidatePath("/admin/vehicles");
  revalidatePath("/vehicles");
  redirect("/admin/vehicles");
}

export async function updateVehicle(id: string, formData: FormData) {
  await prisma.vehicle.update({
    where: { id },
    data: {
      name: formData.get("name")?.toString() ?? "",
      capacityLabel: formData.get("capacityLabel")?.toString() ?? "",
      idealUsage: formData.get("idealUsage")?.toString() ?? "",
      description: formData.get("description")?.toString() ?? "",
      imageUrl: formData.get("imageUrl")?.toString() || null,
      isAvailable: formData.get("isAvailable") === "on",
      isPublished: formData.get("isPublished") === "on",
      displayOrder: Number(formData.get("displayOrder") || 0),
    },
  });
  revalidatePath("/admin/vehicles");
  revalidatePath("/vehicles");
  redirect("/admin/vehicles");
}

export async function deleteVehicle(id: string) {
  await prisma.vehicle.delete({ where: { id } });
  revalidatePath("/admin/vehicles");
  revalidatePath("/vehicles");
}
