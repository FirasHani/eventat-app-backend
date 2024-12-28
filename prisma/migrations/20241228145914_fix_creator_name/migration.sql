/*
  Warnings:

  - You are about to drop the column `createrName` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "createrName",
ADD COLUMN     "creatorName" TEXT;
