/*
  Warnings:

  - Added the required column `desc` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "posters" TEXT[];
