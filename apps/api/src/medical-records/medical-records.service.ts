import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "../generated/prisma/client";
import { MedicalRecordDetail } from "./types/MedicalRecordDetail";

@Injectable()
export class MedicalRecordsService {
    constructor(private prisma: PrismaService) {}

    async createMedicalRecord(
        petId: string,
        data: Prisma.MedicalRecordUncheckedCreateWithoutPetInput,
    ) {
        await this.assertPetExists(petId);

        return this.prisma.medicalRecord.create({
            data: { ...data, petId },
            include: {
                treatments: true,
                immunizations: true,
                diagnostics: true,
                medications: true,
            },
        })
    }

    // The visits themselves, without their contents: this is the list a pet's
    // page pages through, and pulling every child of every visit is what the
    // per-record read is for.
    async getMedicalRecordsByPetId(petId: string) {
        await this.assertPetExists(petId);

        return this.prisma.medicalRecord.findMany({
            where: { petId },
            orderBy: { recordDate: 'desc' },
        });
    }

    private async assertPetExists(petId: string) {
        const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
        if (!pet) throw new NotFoundException('Pet not found');
    }

    getMedicalRecords() {
        return this.prisma.medicalRecord.findMany({
            include: {
                medications: true,
                immunizations: true,
                diagnostics: true,
                treatments: true
            }
        });
    }

    getMedicalRecordById(id: string): Promise<MedicalRecordDetail | null> {
        return this.prisma.medicalRecord.findUnique({
            where: { id },
            include: {
                pet: { select: { id: true, name: true, type: true } },
                vet: { select: { id: true, firstName: true, lastName: true } },
                // Newest first, matching how a pet's own record reads.
                treatments: { orderBy: { date: 'desc' } },
                diagnostics: { orderBy: { date: 'desc' } },
                medications: { orderBy: { startDate: 'desc' } },
                immunizations: {
                    orderBy: { dateAdministered: 'desc' },
                    include: { vaccine: true },
                },
            },
        })
    }

    // Update and delete only need to know the row is there, and which pet it
    // belongs to. Reusing the read above would fetch the whole visit to throw
    // all but two fields away.
    getMedicalRecordRefById(id: string) {
        return this.prisma.medicalRecord.findUnique({
            where: { id },
            select: { id: true, petId: true },
        })
    }

    async deleteMedicalRecordById(id: string) {
        const medicalRecord = await this.getMedicalRecordRefById(id);
        if(!medicalRecord) throw new HttpException('Medical record not Found', 404);

        return this.prisma.medicalRecord.delete({ where: { id } });
    }

    async updateMedicalRecordById(id: string, data: Prisma.MedicalRecordUncheckedUpdateInput) {
        const medicalRecord = await this.getMedicalRecordRefById(id);

        if (!medicalRecord) throw new HttpException('Medical record not Found', 404);

        return this.prisma.medicalRecord.update({
            where: { id },
            data,
            include: {
                treatments: true,
                immunizations: true,
                diagnostics: true,
                medications: true,
            },
        })
    }
}