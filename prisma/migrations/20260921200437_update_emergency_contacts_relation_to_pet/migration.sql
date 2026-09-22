-- CreateIndex
CREATE INDEX "emergency_contacts_petOwnerId_idx" ON "emergency_contacts"("petOwnerId");

-- CreateIndex
CREATE INDEX "emergency_contacts_petId_idx" ON "emergency_contacts"("petId");

-- AddForeignKey
ALTER TABLE "emergency_contacts" ADD CONSTRAINT "emergency_contacts_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
