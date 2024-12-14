/*
  Warnings:

  - You are about to drop the `_ClubToEvent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clubId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ClubToEvent" DROP CONSTRAINT "_ClubToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClubToEvent" DROP CONSTRAINT "_ClubToEvent_B_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "clubId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ClubToEvent";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
