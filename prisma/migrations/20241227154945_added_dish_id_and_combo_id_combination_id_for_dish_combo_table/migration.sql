/*
  Warnings:

  - The primary key for the `ComboOnDish` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ComboOnDish` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ComboOnDish" DROP CONSTRAINT "ComboOnDish_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ComboOnDish_pkey" PRIMARY KEY ("dishId", "comboId");
