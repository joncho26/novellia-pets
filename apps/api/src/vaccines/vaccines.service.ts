import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { VaccineDto } from "./dtos/Vaccine.dto";
import { PetType } from "../generated/prisma/enums";

@Injectable()
export class VaccinesService {
    constructor(private prisma: PrismaService) {}

    getVaccines(species?: PetType): Promise<VaccineDto[]> {
        return this.prisma.vaccine.findMany({
            where: species ? { species } : undefined,
            orderBy: [{ species: 'asc' }, { name: 'asc' }],
        });
    }

    async getVaccinesForPet(petId: string): Promise<VaccineDto[]> {
        const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
        if (!pet) throw new NotFoundException('Pet not found');

        return this.prisma.vaccine.findMany({
            where: { species: pet.type },
            orderBy: { name: 'asc' },
        });
    }
}
