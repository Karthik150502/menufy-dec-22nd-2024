/*
  Warnings:

  - A unique constraint covering the columns `[restaurantId,itemNo]` on the table `Combo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `restaurantId` to the `Combo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Combo" ADD COLUMN     "itemNo" INTEGER,
ADD COLUMN     "restaurantId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Dish" ALTER COLUMN "itemNo" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Combo_restaurantId_itemNo_key" ON "Combo"("restaurantId", "itemNo");

-- AddForeignKey
ALTER TABLE "Combo" ADD CONSTRAINT "Combo_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
