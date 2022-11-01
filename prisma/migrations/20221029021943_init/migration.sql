-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `Todo_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
