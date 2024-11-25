-- CreateTable
CREATE TABLE "Club" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Member" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "clubId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClubToEvent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Member_userId_clubId_key" ON "User_Member"("userId", "clubId");

-- CreateIndex
CREATE UNIQUE INDEX "_ClubToEvent_AB_unique" ON "_ClubToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubToEvent_B_index" ON "_ClubToEvent"("B");

-- AddForeignKey
ALTER TABLE "User_Member" ADD CONSTRAINT "User_Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Member" ADD CONSTRAINT "User_Member_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToEvent" ADD CONSTRAINT "_ClubToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubToEvent" ADD CONSTRAINT "_ClubToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
