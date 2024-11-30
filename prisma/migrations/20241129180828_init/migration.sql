-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DOCTOR', 'NURSE', 'ADMIN', 'RECEPTIONIST');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'DOCTOR';
