/*
  Warnings:

  - A unique constraint covering the columns `[owmId]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lat` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lon` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owmId` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastWeather" JSONB,
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lon" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "owmId" INTEGER NOT NULL,
ADD COLUMN     "timezone" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "City_owmId_key" ON "City"("owmId");
