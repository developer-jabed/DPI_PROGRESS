import bcrypt from "bcrypt";
import { prisma } from "../shared/prisma";
import config from "../../config";
import { UserRole } from "@prisma/client";

export const seedAdmin = async () => {
  try {
    // ✅ Validate ENV variables
    if (!config.ADMIN_EMAIL || !config.ADMIN_PASSWORD) {
      throw new Error("❌ Missing ADMIN_EMAIL or ADMIN_PASSWORD in config.");
    }

    // ✅ Check if admin user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: config.ADMIN_EMAIL },
    });

    if (existingUser) {
      console.log("✅ Admin user already exists!");
      return;
    }

    console.log("🛠️ Creating Admin user...");

    // ✅ Hash password
    const saltRounds = Number(config.salt_round) || 10;
    const hashedPassword = await bcrypt.hash(config.ADMIN_PASSWORD, saltRounds);

    // ✅ Create User (Admin)
    const user = await prisma.user.create({
      data: {
        email: config.ADMIN_EMAIL,
        password: hashedPassword,
        role: UserRole.ADMIN,
        needPasswordChange: false,
        status: "ACTIVE",
      },
    });

    console.log("🛠️ Creating Admin profile...");

    // ✅ Create Admin profile referencing userId
    await prisma.admin.create({
      data: {
        name: "System Admin",
        contactNumber: "01700000000",
        profilePhoto: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        userId: user.id, // ✅ reference userId instead of email
      },
    });

    console.log("🎉 Admin user and profile created successfully!");
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};
