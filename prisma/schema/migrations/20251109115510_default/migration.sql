/*
  Warnings:

  - You are about to drop the column `givenById` on the `ExtraMark` table. All the data in the column will be lost.
  - You are about to drop the column `givenById` on the `Penalty` table. All the data in the column will be lost.
  - Added the required column `teacherId` to the `ExtraMark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Penalty` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ExtraMark" DROP CONSTRAINT "ExtraMark_givenById_fkey";

-- DropForeignKey
ALTER TABLE "public"."Penalty" DROP CONSTRAINT "Penalty_givenById_fkey";

-- AlterTable
ALTER TABLE "AttendanceRecord" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ExtraMark" DROP COLUMN "givenById",
ADD COLUMN     "teacherId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Notice" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Penalty" DROP COLUMN "givenById",
ADD COLUMN     "teacherId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ExtraMark" ADD CONSTRAINT "ExtraMark_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penalty" ADD CONSTRAINT "Penalty_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
