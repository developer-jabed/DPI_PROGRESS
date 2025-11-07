/*
  Warnings:

  - You are about to drop the column `batchId` on the `ScheduleEntry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ScheduleEntry" DROP CONSTRAINT "ScheduleEntry_batchId_fkey";

-- AlterTable
ALTER TABLE "ScheduleEntry" DROP COLUMN "batchId";

-- CreateTable
CREATE TABLE "BatchOnScheduleEntry" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "scheduleEntryId" TEXT NOT NULL,

    CONSTRAINT "BatchOnScheduleEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BatchOnScheduleEntry" ADD CONSTRAINT "BatchOnScheduleEntry_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchOnScheduleEntry" ADD CONSTRAINT "BatchOnScheduleEntry_scheduleEntryId_fkey" FOREIGN KEY ("scheduleEntryId") REFERENCES "ScheduleEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
