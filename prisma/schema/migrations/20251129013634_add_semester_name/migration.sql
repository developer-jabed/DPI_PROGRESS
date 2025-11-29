/*
  Warnings:

  - The values [SEM1,SEM2,SEM3,SEM4,SEM5,SEM6,SEM7,SEM8] on the enum `SemesterName` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SemesterName_new" AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'EIGHTH');
ALTER TABLE "semesters" ALTER COLUMN "name" TYPE "SemesterName_new" USING ("name"::text::"SemesterName_new");
ALTER TYPE "SemesterName" RENAME TO "SemesterName_old";
ALTER TYPE "SemesterName_new" RENAME TO "SemesterName";
DROP TYPE "public"."SemesterName_old";
COMMIT;
