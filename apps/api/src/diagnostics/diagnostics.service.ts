import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "../generated/prisma/client";

@Injectable()
export class DiagnosticsService {
    constructor(private prisma: PrismaService) {}

    async getDiagnosticsByPetId(petId: string) {
        await this.assertPetExists(petId);

        return this.prisma.diagnostic.findMany({ where: { petId } });
    }

    async createDiagnostic(petId: string, data: Prisma.DiagnosticUncheckedCreateWithoutPetInput) {
        await this.assertPetExists(petId);

        return this.prisma.diagnostic.create({ data: { ...data, petId } });
    }

    async getDiagnosticById(id: string) {
        const diagnostic = await this.prisma.diagnostic.findUnique({ where: { id } });
        if (!diagnostic) throw new NotFoundException('Diagnostic not found');

        return diagnostic;
    }

    async updateDiagnosticById(id: string, data: Prisma.DiagnosticUncheckedUpdateInput) {
        await this.getDiagnosticById(id);

        return this.prisma.diagnostic.update({ where: { id }, data });
    }

    async deleteDiagnosticById(id: string) {
        await this.getDiagnosticById(id);

        return this.prisma.diagnostic.delete({ where: { id } });
    }

    private async assertPetExists(petId: string) {
        const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
        if (!pet) throw new NotFoundException('Pet not found');
    }
}
