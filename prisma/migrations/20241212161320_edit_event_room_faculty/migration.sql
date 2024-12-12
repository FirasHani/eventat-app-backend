-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "event_date" TIMESTAMP(3),
ADD COLUMN     "faculty" TEXT,
ADD COLUMN     "floor" TEXT,
ADD COLUMN     "room" TEXT;
