-- AlterTable
ALTER TABLE "PrismaPoolDynamicData" ADD COLUMN     "yieldCapture24h" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "yieldCapture48h" DOUBLE PRECISION NOT NULL DEFAULT 0;
