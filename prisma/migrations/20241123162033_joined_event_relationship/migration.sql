-- CreateTable
CREATE TABLE "Joined_Event" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Joined_Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Joined_Event_eventId_userId_key" ON "Joined_Event"("eventId", "userId");

-- AddForeignKey
ALTER TABLE "Joined_Event" ADD CONSTRAINT "Joined_Event_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Joined_Event" ADD CONSTRAINT "Joined_Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
