-- CreateTable
CREATE TABLE "Club_Owners" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "clubId" INTEGER NOT NULL,

    CONSTRAINT "Club_Owners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Club_Owners_userId_clubId_key" ON "Club_Owners"("userId", "clubId");

-- AddForeignKey
ALTER TABLE "Club_Owners" ADD CONSTRAINT "Club_Owners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Club_Owners" ADD CONSTRAINT "Club_Owners_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
