import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { MedicationDto } from "./dtos/Medication.dto";
import { Prisma } from "../generated/prisma/client";

@Injectable()
export class MedicationsService {
    constructor(private prisma: PrismaService) {}

    async getMedicationsByPetId(petId: string): Promise<MedicationDto[]> {
        await this.assertPetExists(petId);

        return this.prisma.medication.findMany({ where: { petId } });
    }

    async createMedication(petId: string, data: Prisma.MedicationUncheckedCreateWithoutPetInput): Promise<MedicationDto> {
        await this.assertPetExists(petId);

        return this.prisma.medication.create({ data: { ...data, petId } });
    }

    async getMedicationById(id: string): Promise<MedicationDto> {
        const medication = await this.prisma.medication.findUnique({ where: { id } });
        if (!medication) throw new NotFoundException('Medication not found');

        return medication;
    }

    async updateMedicationById(id: string, data: Prisma.MedicationUncheckedUpdateInput): Promise<MedicationDto> {
        await this.getMedicationById(id);

        return this.prisma.medication.update({ where: { id }, data });
    }

    async deleteMedicationById(id: string): Promise<MedicationDto> {
        await this.getMedicationById(id);

        return this.prisma.medication.delete({ where: { id } });
    }

    private async assertPetExists(petId: string) {
        const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
        if (!pet) throw new NotFoundException('Pet not found');
    }
}
