/*
  Warnings:

  - You are about to drop the column `Image` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `Image` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "Image",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "imageKey" TEXT;

-- AlterTable
ALTER TABLE "Combo" ADD COLUMN     "imageKey" TEXT;

-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "imageKey" TEXT;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "Image",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "imageKey" TEXT;
