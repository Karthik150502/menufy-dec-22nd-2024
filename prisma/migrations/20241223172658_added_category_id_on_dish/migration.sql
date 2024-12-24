/*
  Warnings:

  - Added the required column `categoryId` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Made the column `restaurantId` on table `Dish` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ALTER COLUMN "restaurantId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
