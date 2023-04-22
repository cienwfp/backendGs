/*
  Warnings:

  - Added the required column `created_by` to the `Orgao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `Orgao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `Viatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `Viatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orgao" ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Viatura" ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "updated_by" TEXT NOT NULL;
