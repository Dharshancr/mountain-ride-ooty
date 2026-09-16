"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { adminLoginSchema } from "@/lib/validation";
import { verifyPassword, createAdminSession } from "@/lib/auth";

export type LoginState = {
  status: "idle" | "error";
  message?: string;
};

export async function loginAdmin(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const raw = {
    email: formData.get("email")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
  };

  const parsed = adminLoginSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", message: "Please enter a valid email and password." };
  }

  const admin = await prisma.admin.findUnique({ where: { email: parsed.data.email } });
  if (!admin) {
    return { status: "error", message: "Invalid email or password." };
  }

  const valid = await verifyPassword(parsed.data.password, admin.passwordHash);
  if (!valid) {
    return { status: "error", message: "Invalid email or password." };
  }

  await createAdminSession({
    adminId: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  redirect("/admin");
}
