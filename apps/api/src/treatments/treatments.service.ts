import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "../generated/prisma/client";

@Injectable()
export class TreatmentsService {
    constructor(private prisma: PrismaService) {}

    async getTreatmentsByPetId(petId: string) {
        await this.assertPetExists(petId);

        return this.prisma.treatment.findMany({ where: { petId } });
    }

    async createTreatment(petId: string, data: Prisma.TreatmentUncheckedCreateWithoutPetInput) {
        await this.assertPetExists(petId);

        return this.prisma.treatment.create({ data: { ...data, petId } });
    }

    async getTreatmentById(id: string) {
        const treatment = await this.prisma.treatment.findUnique({ where: { id } });
        if (!treatment) throw new NotFoundException('Treatment not found');

        return treatment;
    }

    async updateTreatmentById(id: string, data: Prisma.TreatmentUncheckedUpdateInput) {
        await this.getTreatmentById(id);

        return this.prisma.treatment.update({ where: { id }, data });
    }

    async deleteTreatmentById(id: string) {
        await this.getTreatmentById(id);

        return this.prisma.treatment.delete({ where: { id } });
    }

    private async assertPetExists(petId: string) {
        const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
        if (!pet) throw new NotFoundException('Pet not found');
    }
}
