"use server";

import { prisma } from "@/lib/prisma";
import { contactEnquirySchema } from "@/lib/validation";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContactEnquiry(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    mobile: formData.get("mobile")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
  };

  const parsed = contactEnquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the fields below.", fieldErrors };
  }

  try {
    await prisma.contactEnquiry.create({
      data: {
        name: parsed.data.name,
        mobile: parsed.data.mobile,
        email: parsed.data.email || null,
        message: parsed.data.message,
      },
    });
    return { status: "success", message: "Thanks — we've received your message and will get back to you soon." };
  } catch (error) {
    console.error("Contact enquiry submission failed:", error);
    return { status: "error", message: "Something went wrong. Please call or WhatsApp us directly." };
  }
}
