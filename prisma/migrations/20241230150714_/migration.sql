/*
  Warnings:

  - You are about to drop the column `itemNo` on the `Combo` table. All the data in the column will be lost.
  - You are about to drop the column `itemNo` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `lastDishNo` on the `Restaurant` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Combo_restaurantId_itemNo_key";

-- DropIndex
DROP INDEX "Dish_restaurantId_itemNo_key";

-- AlterTable
ALTER TABLE "Combo" DROP COLUMN "itemNo";

-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "itemNo";

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "lastDishNo";
