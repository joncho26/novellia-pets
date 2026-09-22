import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "../generated/prisma/client";

@Injectable()
export class MedicalRecordsService {
    constructor(private prisma: PrismaService) {}

    createMedicalRecord(data: Prisma.MedicalRecordUncheckedCreateInput) {
        return this.prisma.medicalRecord.create({ data })
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

    getMedicalRecordById(id: string){
        return this.prisma.medicalRecord.findUnique({ where: { id } })
    }

    async deleteMedicalRecordById(id: string) {
        const medicalRecord = await this.getMedicalRecordById(id);
        if(!medicalRecord) throw new HttpException('Medical record not Found', 404);

        return this.prisma.medicalRecord.delete({ where: { id } });
    }

    async updateMedicalRecordById(id: string, data: Prisma.MedicalRecordUncheckedUpdateInput) {
        const medicalRecord = await this.getMedicalRecordById(id);

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