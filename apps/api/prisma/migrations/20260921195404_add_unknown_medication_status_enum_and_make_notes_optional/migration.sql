-- AlterEnum
ALTER TYPE "MedicationStatus" ADD VALUE 'UNKNOWN';

-- AlterTable
ALTER TABLE "medical_records" ALTER COLUMN "notes" DROP NOT NULL;
