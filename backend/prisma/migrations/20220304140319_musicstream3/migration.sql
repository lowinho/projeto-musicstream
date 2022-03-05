/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Avatar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[musicId]` on the table `Cover` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId]` on the table `Music` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[genreId]` on the table `Music` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `MyListUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[musicId]` on the table `MyListUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Avatar_userId_key" ON "Avatar"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cover_musicId_key" ON "Cover"("musicId");

-- CreateIndex
CREATE UNIQUE INDEX "Music_authorId_key" ON "Music"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Music_genreId_key" ON "Music"("genreId");

-- CreateIndex
CREATE UNIQUE INDEX "MyListUser_userId_key" ON "MyListUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MyListUser_musicId_key" ON "MyListUser"("musicId");
