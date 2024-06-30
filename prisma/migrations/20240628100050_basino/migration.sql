/*
  Warnings:

  - Added the required column `bomb` to the `MineGame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MineGame" ADD COLUMN     "bomb" INTEGER NOT NULL;
