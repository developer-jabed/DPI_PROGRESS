-- DropForeignKey
ALTER TABLE "public"."ClassSession" DROP CONSTRAINT "ClassSession_scheduleEntryId_fkey";

-- AlterTable
ALTER TABLE "ClassSession" ALTER COLUMN "scheduleEntryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ClassSession" ADD CONSTRAINT "ClassSession_scheduleEntryId_fkey" FOREIGN KEY ("scheduleEntryId") REFERENCES "ScheduleEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
