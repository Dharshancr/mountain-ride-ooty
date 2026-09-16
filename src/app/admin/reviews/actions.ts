"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createReview(formData: FormData) {
  await prisma.review.create({
    data: {
      customerName: formData.get("customerName")?.toString() ?? "",
      rating: Number(formData.get("rating") || 5),
      reviewText: formData.get("reviewText")?.toString() ?? "",
      isApproved: formData.get("isApproved") === "on",
    },
  });
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
  redirect("/admin/reviews");
}

export async function toggleReviewApproval(id: string, approved: boolean) {
  await prisma.review.update({ where: { id }, data: { isApproved: approved } });
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
}

export async function deleteReview(id: string) {
  await prisma.review.delete({ where: { id } });
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
}
