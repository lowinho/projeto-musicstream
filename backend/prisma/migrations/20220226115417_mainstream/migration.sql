-- CreateTable
CREATE TABLE "Cover" (
    "id" SERIAL NOT NULL,
    "musicId" INTEGER NOT NULL,
    "originalName" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cover_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cover" ADD CONSTRAINT "Cover_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
