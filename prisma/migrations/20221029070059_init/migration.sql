/*
  Warnings:

  - Made the column `description` on table `todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `todo` MODIFY `description` VARCHAR(191) NOT NULL;
