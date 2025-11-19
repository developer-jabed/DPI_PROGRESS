import bcrypt from "bcrypt";
import { prisma } from "../shared/prisma";
import config from "../../config";
import { UserRole } from "@prisma/client";

export const seedAdmin = async () => {
  try {
    // ✅ Validate ENV variables first
    if (!config.ADMIN_EMAIL || !config.ADMIN_PASSWORD) {
      throw new Error("❌ Missing ADMIN_EMAIL or ADMIN_PASSWORD in config.");
    }

    // ✅ Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: config.ADMIN_EMAIL },
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists!");
      console.log("admin:", existingAdmin)
      return;
    }

    console.log("🛠️ Creating Admin...");

    // ✅ Hash password securely
    const saltRounds = Number(config.salt_round) || 10;
    const hashedPassword = await bcrypt.hash(config.ADMIN_PASSWORD, saltRounds);

    // ✅ Create User (Admin)
    const user = await prisma.user.create({
      data: {
        displayName: "Admin",
        email: config.ADMIN_EMAIL,
        password: hashedPassword,
        role: UserRole.ADMIN,
        profileUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      },
    });

    // ✅ Optionally, also create entry in `Admin` table
    await prisma.admin.create({
      data: {
        userId: user.id,
        phoneNumber: "01700000000",
        designation: "System Administrator",
        profileUrl: user.profileUrl,
      },
    });

    console.log("🎉 Admin created successfully!");
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};
