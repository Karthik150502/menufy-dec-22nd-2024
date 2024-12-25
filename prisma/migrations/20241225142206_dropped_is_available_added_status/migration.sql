/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `Combo` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `Dish` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DishStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'INPREPARATION');

-- AlterTable
ALTER TABLE "Combo" DROP COLUMN "isAvailable",
ADD COLUMN     "status" "DishStatus" NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "isAvailable",
ADD COLUMN     "status" "DishStatus" NOT NULL DEFAULT 'AVAILABLE';
