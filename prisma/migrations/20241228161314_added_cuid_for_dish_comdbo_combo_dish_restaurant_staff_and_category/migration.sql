/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Combo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ComboOnDish` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Dish` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RestaurantStaff` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ComboOnDish" DROP CONSTRAINT "ComboOnDish_comboId_fkey";

-- DropForeignKey
ALTER TABLE "ComboOnDish" DROP CONSTRAINT "ComboOnDish_dishId_fkey";

-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Category_id_seq";

-- AlterTable
ALTER TABLE "Combo" DROP CONSTRAINT "Combo_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Combo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Combo_id_seq";

-- AlterTable
ALTER TABLE "ComboOnDish" DROP CONSTRAINT "ComboOnDish_pkey",
ALTER COLUMN "dishId" SET DATA TYPE TEXT,
ALTER COLUMN "comboId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ComboOnDish_pkey" PRIMARY KEY ("dishId", "comboId");

-- AlterTable
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Dish_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Dish_id_seq";

-- AlterTable
ALTER TABLE "RestaurantStaff" DROP CONSTRAINT "RestaurantStaff_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RestaurantStaff_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RestaurantStaff_id_seq";

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComboOnDish" ADD CONSTRAINT "ComboOnDish_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComboOnDish" ADD CONSTRAINT "ComboOnDish_comboId_fkey" FOREIGN KEY ("comboId") REFERENCES "Combo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
