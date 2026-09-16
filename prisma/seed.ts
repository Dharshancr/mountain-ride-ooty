import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  fallbackVehicles,
  fallbackServices,
  fallbackSightseeing,
  fallbackPackages,
  fallbackFaqs,
} from "../src/lib/fallback-content";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Mountain Ride Ooty database...");

  // --- Site Settings (singleton) ---
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      businessName: "Mountain Ride Ooty",
      tagline: "Ride the Hills. Discover the Beauty.",
      phonePrimary: "9585943681",
      phoneSecondary: "8667803054",
      whatsappPrimary: "9585943681",
      location: "Ooty, Tamil Nadu",
      businessHours: "Available for bookings every day.",
      primaryCtaText: "Book Your Ride",
    },
  });

  // --- Admin user ---
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@mountainrideooty.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Mountain Ride Ooty Admin",
      email: adminEmail,
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });
  console.log(`Admin ready -> email: ${adminEmail}  password: ${adminPassword}`);
  console.log("IMPORTANT: change this password after first login.");

  // --- Vehicles ---
  for (const v of fallbackVehicles) {
    await prisma.vehicle.upsert({
      where: { slug: v.slug },
      update: {},
      create: v,
    });
  }

  // --- Services ---
  for (const s of fallbackServices) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }

  // --- Sightseeing ---
  for (const p of fallbackSightseeing) {
    await prisma.sightseeingPlace.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  // --- Packages ---
  for (const pkg of fallbackPackages) {
    await prisma.tourPackage.upsert({
      where: { slug: pkg.slug },
      update: {},
      create: pkg,
    });
  }

  // --- FAQs ---
  const existingFaqCount = await prisma.faqItem.count();
  if (existingFaqCount === 0) {
    await prisma.faqItem.createMany({
      data: fallbackFaqs,
    });
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
