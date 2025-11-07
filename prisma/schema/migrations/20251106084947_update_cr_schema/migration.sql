/*
  Warnings:

  - You are about to drop the column `crId` on the `Batch` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[batchId]` on the table `Cr` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `batchId` to the `Cr` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Batch" DROP CONSTRAINT "Batch_crId_fkey";

-- DropIndex
DROP INDEX "public"."Batch_crId_key";

-- AlterTable
ALTER TABLE "Batch" DROP COLUMN "crId";

-- AlterTable
ALTER TABLE "Cr" ADD COLUMN     "batchId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cr_batchId_key" ON "Cr"("batchId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Cr" ADD CONSTRAINT "Cr_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
