/*
  Warnings:

  - You are about to drop the column `event_hour` on the `Event` table. All the data in the column will be lost.
  - The `event_date` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "event_hour",
DROP COLUMN "event_date",
ADD COLUMN     "event_date" TIMESTAMP(3);
