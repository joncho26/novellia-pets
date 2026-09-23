import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EmergencyContact, Prisma } from "../generated/prisma/client";
import { PetDetailsDto, PetDto } from "./dtos/Pet.dto";
import { ContactRelation } from "../generated/prisma/enums";

@Injectable()
export class PetsService {
    constructor(private prisma: PrismaService) {}

    // Update and delete only need to know whether the row is there. Reusing
    // getPetById would drag the pet's whole medical history along for a check
    // that throws away everything but the null test.
    private petExists(id: string) {
        return this.prisma.pet.findUnique({ where: { id }, select: { id: true } })
    }

    createPet(data: Prisma.PetUncheckedCreateInput): Promise<PetDto> {
        return this.prisma.pet.create({ data })
    }

    getPets(): Promise<PetDto[]> {
        return this.prisma.pet.findMany();
    }

    getPetById(id: string): Promise<PetDetailsDto | null> {
        return this.prisma.pet.findUnique({
            where: { id },
            include: {
                // Newest first: a pet's history is read from the present
                // backwards, and the caller should not have to sort it.
                medicalRecords: { orderBy: { recordDate: 'desc' } },
                treatments: { orderBy: { date: 'desc' } },
                diagnostics: { orderBy: { date: 'desc' } },
                medications: { orderBy: { startDate: 'desc' } },
                // A bare immunization is just two dates and a foreign key, so
                // the vaccine it refers to comes along with it.
                immunizations: {
                    orderBy: { dateAdministered: 'desc' },
                    include: { vaccine: true },
                },
            },
        })
    }

    // The vets on the owner's contact list, whether or not they are tied to
    // this particular pet. Returns null when the pet does not exist, so the
    // controller can tell "no such pet" from "no vets on file".
    async getVetContactsByPetId(id: string): Promise<EmergencyContact[] | null> {
        const pet = await this.prisma.pet.findUnique({
            where: { id },
            select: { ownerId: true },
        });
        if (!pet) return null;

        return this.prisma.emergencyContact.findMany({
            where: { petOwnerId: pet.ownerId, relationship: ContactRelation.VET },
            orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }]
        });
    }


    // Every attachment's petId is required, so the database refuses to delete a
    // pet that still has any — deleting the pet has to mean deleting its whole
    // history. One transaction, so a pet is never left half-erased.
    //
    // Emergency contacts are not in here on purpose: their petId is nullable
    // and they belong to the owner as well, so they are unlinked rather than
    // destroyed along with the pet.
    async deletePetById(id: string): Promise<PetDto> {
        const pet = await this.petExists(id);
        if(!pet) throw new HttpException('Pet Not Found', 404);

        return this.prisma.$transaction(async (tx) => {
            // need to delete all records associated to pet 
            // (medications, treatments, diagnostics, immunizations, emergency contacts)
            await tx.medication.deleteMany({ where: { petId: id } });
            await tx.treatment.deleteMany({ where: { petId: id } });
            await tx.diagnostic.deleteMany({ where: { petId: id } });
            await tx.immunization.deleteMany({ where: { petId: id } });
            await tx.emergencyContact.updateMany({
                where: { petId: id },
                data: { petId: null },
            });
            // delete medical records last since the associations above
            // reference it
            await tx.medicalRecord.deleteMany({ where: { petId: id } });

            return tx.pet.delete({ where: { id } });
        });
    }

    async updatePetById(id: string, data: Prisma.PetUncheckedUpdateInput): Promise<PetDto> {
        const pet = await this.petExists(id);

        if (!pet) throw new HttpException('Pet Not Found', 404);

        return this.prisma.pet.update({ where: { id }, data})
    }
}