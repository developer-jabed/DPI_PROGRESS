import { PrismaClient, Shift } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const semesters = [
    { name: "1st Semester Morning", shift: Shift.MORNING },
    { name: "2nd Semester Morning", shift: Shift.MORNING },
    { name: "3rd Semester Morning", shift: Shift.MORNING },
    { name: "4th Semester Morning", shift: Shift.MORNING },
    { name: "5th Semester Morning", shift: Shift.MORNING },
    { name: "6th Semester Morning", shift: Shift.MORNING },
    { name: "7th Semester Morning", shift: Shift.MORNING },
    { name: "8th Semester Morning", shift: Shift.MORNING },
    { name: "1st Semester Day", shift: Shift.DAY },
    { name: "2nd Semester Day", shift: Shift.DAY },
    { name: "3rd Semester Day", shift: Shift.DAY },
    { name: "4th Semester Day", shift: Shift.DAY },
    { name: "5th Semester Day", shift: Shift.DAY },
    { name: "6th Semester Day", shift: Shift.DAY },
    { name: "7th Semester Day", shift: Shift.DAY },
    { name: "8th Semester Day", shift: Shift.DAY },
  ];

  for (const sem of semesters) {
    await prisma.semester.upsert({
      where: { name: sem.name },
      update: {},
      create: sem,
    });
  }

  console.log("✅ Semesters seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
