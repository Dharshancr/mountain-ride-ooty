"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function toggleEnquiryHandled(id: string, handled: boolean) {
  await prisma.contactEnquiry.update({ where: { id }, data: { isHandled: handled } });
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}
