/*
  Warnings:

  - You are about to drop the column `yandex_token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_user_id_fkey";

-- DropIndex
DROP INDEX "User_yandex_token_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "yandex_token";

-- DropTable
DROP TABLE "Report";
