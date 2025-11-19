/*
  Warnings:

  - Added the required column `semesterId` to the `AttendanceAudit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `AttendanceRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `CR` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `ExamResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `ExamSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `StudentPointRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AttendanceAudit" ADD COLUMN     "semesterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AttendanceRecord" ADD COLUMN     "semesterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Batch" ADD COLUMN     "semesterId" TEXT;

-- AlterTable
ALTER TABLE "CR" ADD COLUMN     "semesterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExamResult" ADD COLUMN     "semesterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExamSchedule" ADD COLUMN     "semesterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "semesterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentPointRecord" ADD COLUMN     "semesterId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Semester" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shift" "Shift" NOT NULL,
    "group" "Group" NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Semester_name_key" ON "Semester"("name");

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CR" ADD CONSTRAINT "CR_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceAudit" ADD CONSTRAINT "AttendanceAudit_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPointRecord" ADD CONSTRAINT "StudentPointRecord_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSchedule" ADD CONSTRAINT "ExamSchedule_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamResult" ADD CONSTRAINT "ExamResult_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
