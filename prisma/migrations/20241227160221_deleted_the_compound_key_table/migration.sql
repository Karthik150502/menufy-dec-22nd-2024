/*
  Warnings:

  - You are about to drop the `TestingM` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestingM" DROP CONSTRAINT "TestingM_userId_fkey";

-- DropTable
DROP TABLE "TestingM";
