/*
  Warnings:

  - You are about to drop the column `authorName` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `genreName` on the `Music` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Music" DROP COLUMN "authorName",
DROP COLUMN "genreName";
