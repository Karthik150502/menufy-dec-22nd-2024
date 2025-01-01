/*
  Warnings:

  - A unique constraint covering the columns `[restaurantId,itemNo]` on the table `Dish` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itemNo` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "itemNo" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "lastDishNo" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Dish_restaurantId_itemNo_key" ON "Dish"("restaurantId", "itemNo");
