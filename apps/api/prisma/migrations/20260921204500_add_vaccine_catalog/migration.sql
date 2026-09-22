-- CreateTable
CREATE TABLE "vaccines" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" "PetType" NOT NULL,
    "defaultIntervalMonths" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vaccines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vaccines_species_idx" ON "vaccines"("species");

-- CreateIndex
CREATE UNIQUE INDEX "vaccines_name_species_key" ON "vaccines"("name", "species");

-- Baseline catalog. Every species gets an "Other" row so that existing
-- free-text immunizations always have somewhere to land.
INSERT INTO "vaccines" ("id", "name", "species", "defaultIntervalMonths", "createdAt", "updatedAt")
VALUES
    (gen_random_uuid(), 'Rabies', 'DOG', 36, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Distemper', 'DOG', 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Bordetella', 'DOG', 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Leptospirosis', 'DOG', 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Other', 'DOG', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Rabies', 'CAT', 36, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'FVRCP', 'CAT', 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Feline Leukemia', 'CAT', 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Other', 'CAT', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Polyomavirus', 'BIRD', 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Pacheco''s Disease', 'BIRD', 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Other', 'BIRD', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- AlterTable: add nullable first so existing rows can be back-filled
ALTER TABLE "immunizations" ADD COLUMN "vaccineId" TEXT;

-- Back-fill: match existing free text to a catalog entry for the pet's species
UPDATE "immunizations" i
SET "vaccineId" = v."id"
FROM "vaccines" v, "pets" p
WHERE p."id" = i."petId"
  AND v."species" = p."type"
  AND lower(btrim(i."name")) = lower(v."name");

-- Anything that did not match falls back to that species' "Other" entry
UPDATE "immunizations" i
SET "vaccineId" = v."id"
FROM "vaccines" v, "pets" p
WHERE i."vaccineId" IS NULL
  AND p."id" = i."petId"
  AND v."species" = p."type"
  AND v."name" = 'Other';

-- Now that every row has a value, enforce the constraint
ALTER TABLE "immunizations" ALTER COLUMN "vaccineId" SET NOT NULL;

-- AlterTable
ALTER TABLE "immunizations" DROP COLUMN "name";

-- CreateIndex
CREATE INDEX "immunizations_vaccineId_idx" ON "immunizations"("vaccineId");

-- AddForeignKey
ALTER TABLE "immunizations" ADD CONSTRAINT "immunizations_vaccineId_fkey" FOREIGN KEY ("vaccineId") REFERENCES "vaccines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
