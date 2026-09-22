import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "../generated/prisma/client";

@Injectable()
export class PetsService {
    constructor(private prisma: PrismaService) {}

    createPet(data: Prisma.PetUncheckedCreateInput) {
        return this.prisma.pet.create({ data })
    }

    getPets() {
        return this.prisma.pet.findMany();
    }

    getPetById(id: string){
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

    // Update and delete only need to know whether the row is there. Reusing
    // getPetById would drag the pet's whole medical history along for a check
    // that throws away everything but the null test.
    private petExists(id: string) {
        return this.prisma.pet.findUnique({ where: { id }, select: { id: true } })
    }

    async deletePetById(id: string) {
        const pet = await this.petExists(id);
        if(!pet) throw new HttpException('Pet Not Found', 404);

        return this.prisma.pet.delete({ where: { id } });
    }

    async updatePetById(id: string, data: Prisma.PetUncheckedUpdateInput) {
        const pet = await this.petExists(id);

        if (!pet) throw new HttpException('Pet Not Found', 404);

        return this.prisma.pet.update({ where: { id }, data})
    }
}