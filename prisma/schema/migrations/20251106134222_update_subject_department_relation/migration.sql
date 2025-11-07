/*
  Warnings:

  - You are about to drop the column `departmentId` on the `Subject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Subject" DROP CONSTRAINT "Subject_departmentId_fkey";

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "departmentId";

-- CreateTable
CREATE TABLE "_DepartmentSubjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DepartmentSubjects_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DepartmentSubjects_B_index" ON "_DepartmentSubjects"("B");

-- AddForeignKey
ALTER TABLE "_DepartmentSubjects" ADD CONSTRAINT "_DepartmentSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentSubjects" ADD CONSTRAINT "_DepartmentSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
