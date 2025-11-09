/*
  Warnings:

  - You are about to drop the column `changedAt` on the `AttendanceAudit` table. All the data in the column will be lost.
  - You are about to drop the column `newStatus` on the `AttendanceAudit` table. All the data in the column will be lost.
  - You are about to drop the column `oldStatus` on the `AttendanceAudit` table. All the data in the column will be lost.
  - You are about to drop the column `recordId` on the `AttendanceAudit` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `AttendanceRecord` table. All the data in the column will be lost.
  - The `status` column on the `AttendanceRecord` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `name` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `marks` on the `ExtraMark` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `ExtraMark` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `marksDeducted` on the `Penalty` table. All the data in the column will be lost.
  - You are about to drop the column `batchId` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `batchId` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Teacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attendanceId` to the `AttendanceAudit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `changeType` to the `AttendanceAudit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `present` to the `AttendanceRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `AttendanceRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupName` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shift` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `givenById` to the `ExtraMark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `ExtraMark` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body` to the `Notice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `givenById` to the `Penalty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `Penalty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Made the column `departmentId` on table `Teacher` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Shift" AS ENUM ('MORNING', 'DAY');

-- CreateEnum
CREATE TYPE "GroupName" AS ENUM ('A', 'B');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'CORRECTED');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('SCHEDULED', 'CANCELLED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "public"."AttendanceAudit" DROP CONSTRAINT "AttendanceAudit_recordId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ExtraMark" DROP CONSTRAINT "ExtraMark_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Subject" DROP CONSTRAINT "Subject_batchId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Subject" DROP CONSTRAINT "Subject_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Teacher" DROP CONSTRAINT "Teacher_batchId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Teacher" DROP CONSTRAINT "Teacher_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Teacher" DROP CONSTRAINT "Teacher_subjectId_fkey";

-- DropIndex
DROP INDEX "public"."Subject_code_key";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "designation" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "profileUrl" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "AttendanceAudit" DROP COLUMN "changedAt",
DROP COLUMN "newStatus",
DROP COLUMN "oldStatus",
DROP COLUMN "recordId",
ADD COLUMN     "attendanceId" TEXT NOT NULL,
ADD COLUMN     "changeType" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "newValue" TEXT,
ADD COLUMN     "previousValue" TEXT,
ADD COLUMN     "reason" TEXT;

-- AlterTable
ALTER TABLE "AttendanceRecord" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "present" BOOLEAN NOT NULL,
ADD COLUMN     "reason" TEXT,
ADD COLUMN     "sessionId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "status",
ADD COLUMN     "status" "AttendanceStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "Batch" DROP COLUMN "name",
ADD COLUMN     "groupName" "GroupName" NOT NULL,
ADD COLUMN     "shift" "Shift" NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ExtraMark" DROP COLUMN "marks",
DROP COLUMN "subjectId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "givenById" TEXT NOT NULL,
ADD COLUMN     "points" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "reason" TEXT;

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "content",
ADD COLUMN     "batchId" TEXT,
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "departmentId" TEXT,
ADD COLUMN     "groupName" "GroupName",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shift" "Shift",
ADD COLUMN     "targetRole" "Role",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Penalty" DROP COLUMN "marksDeducted",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "givenById" TEXT NOT NULL,
ADD COLUMN     "points" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "reason" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "batchId",
DROP COLUMN "departmentId",
DROP COLUMN "name",
ADD COLUMN     "semester" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "batchId",
DROP COLUMN "name",
DROP COLUMN "subject",
DROP COLUMN "subjectId",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "maxLoad" INTEGER NOT NULL DEFAULT 20,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "profileUrl" TEXT,
ALTER COLUMN "departmentId" SET NOT NULL;

-- CreateTable
CREATE TABLE "TeacherAvailability" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "slotIndex" INTEGER NOT NULL,

    CONSTRAINT "TeacherAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherLeave" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,

    CONSTRAINT "TeacherLeave_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "departmentId" TEXT,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleEntry" (
    "id" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "teacherId" TEXT,
    "dayOfWeek" INTEGER NOT NULL,
    "slotIndex" INTEGER NOT NULL,
    "shift" "Shift" NOT NULL,
    "groupName" "GroupName" NOT NULL,
    "classroomId" TEXT,
    "isPractical" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ScheduleEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchOnScheduleEntry" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "scheduleEntryId" TEXT NOT NULL,

    CONSTRAINT "BatchOnScheduleEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassSession" (
    "id" TEXT NOT NULL,
    "scheduleEntryId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'SCHEDULED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DepartmentSubjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DepartmentSubjects_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_TeacherSubjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TeacherSubjects_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_name_key" ON "Classroom"("name");

-- CreateIndex
CREATE INDEX "_DepartmentSubjects_B_index" ON "_DepartmentSubjects"("B");

-- CreateIndex
CREATE INDEX "_TeacherSubjects_B_index" ON "_TeacherSubjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherAvailability" ADD CONSTRAINT "TeacherAvailability_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherLeave" ADD CONSTRAINT "TeacherLeave_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntry" ADD CONSTRAINT "ScheduleEntry_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntry" ADD CONSTRAINT "ScheduleEntry_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntry" ADD CONSTRAINT "ScheduleEntry_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntry" ADD CONSTRAINT "ScheduleEntry_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchOnScheduleEntry" ADD CONSTRAINT "BatchOnScheduleEntry_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchOnScheduleEntry" ADD CONSTRAINT "BatchOnScheduleEntry_scheduleEntryId_fkey" FOREIGN KEY ("scheduleEntryId") REFERENCES "ScheduleEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSession" ADD CONSTRAINT "ClassSession_scheduleEntryId_fkey" FOREIGN KEY ("scheduleEntryId") REFERENCES "ScheduleEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceRecord" ADD CONSTRAINT "AttendanceRecord_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ClassSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceAudit" ADD CONSTRAINT "AttendanceAudit_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES "AttendanceRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraMark" ADD CONSTRAINT "ExtraMark_givenById_fkey" FOREIGN KEY ("givenById") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penalty" ADD CONSTRAINT "Penalty_givenById_fkey" FOREIGN KEY ("givenById") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notice" ADD CONSTRAINT "Notice_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentSubjects" ADD CONSTRAINT "_DepartmentSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartmentSubjects" ADD CONSTRAINT "_DepartmentSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherSubjects" ADD CONSTRAINT "_TeacherSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherSubjects" ADD CONSTRAINT "_TeacherSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
