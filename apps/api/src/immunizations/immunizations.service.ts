import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "../generated/prisma/client";

@Injectable()
export class ImmunizationsService {
    constructor(private prisma: PrismaService) {}

    async getImmunizationsByPetId(petId: string) {
        await this.assertPetExists(petId);

        return this.prisma.immunization.findMany({ where: { petId } });
    }

    async createImmunization(petId: string, data: Prisma.ImmunizationUncheckedCreateWithoutPetInput) {
        await this.assertPetExists(petId);

        return this.prisma.immunization.create({ data: { ...data, petId } });
    }

    async getImmunizationById(id: string) {
        const immunization = await this.prisma.immunization.findUnique({ where: { id } });
        if (!immunization) throw new NotFoundException('Immunization not found');

        return immunization;
    }

    async updateImmunizationById(id: string, data: Prisma.ImmunizationUncheckedUpdateInput) {
        await this.getImmunizationById(id);

        return this.prisma.immunization.update({ where: { id }, data });
    }

    async deleteImmunizationById(id: string) {
        await this.getImmunizationById(id);

        return this.prisma.immunization.delete({ where: { id } });
    }

    private async assertPetExists(petId: string) {
        const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
        if (!pet) throw new NotFoundException('Pet not found');
    }
}
