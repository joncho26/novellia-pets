import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { MedicalRecordsService } from "./medical-records.service";
import { CreateMedicalRecordDto } from "./dtos/CreateMedicalRecord.dto";
import { UpdateMedicalRecordDto } from "./dtos/UpdateMedicalRecord.dto";

@Controller('medical-records')
export class MedicalRecordsController {
    constructor(private medicalRecordsService: MedicalRecordsService){}

    @Post()
    createMedicalRecord(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
        return this.medicalRecordsService.createMedicalRecord(createMedicalRecordDto);
    }

    @Get()
    async getMedicalRecords() {
        return this.medicalRecordsService.getMedicalRecords()
    }

    @Get(':id')
    async getMedicalRecordById(@Param('id', ParseUUIDPipe) id: string) {
        const medicalRecord = await this.medicalRecordsService.getMedicalRecordById(id);
        if (!medicalRecord) throw new NotFoundException("Medical record not found");

        return medicalRecord;
    }

    @Patch(':id')
    async updateMedicalRecordById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
    ) {
        const medicalRecord = await this.medicalRecordsService.getMedicalRecordById(id);
        if (!medicalRecord) throw new NotFoundException("Medical record not found");

        const { treatments, immunizations, diagnostics, medications, ...details } = updateMedicalRecordDto;
        const { petId } = medicalRecord;

        return this.medicalRecordsService.updateMedicalRecordById(id, {
            ...details,
            treatments: treatments && { create: treatments.map((t) => ({ ...t, petId })) },
            immunizations: immunizations && { create: immunizations.map((i) => ({ ...i, petId })) },
            diagnostics: diagnostics && { create: diagnostics.map((d) => ({ ...d, petId })) },
            medications: medications && { create: medications.map((m) => ({ ...m, petId })) },
        })
    }

    @Delete(':id')
    deleteMedicalRecordById(
        @Param('id', ParseUUIDPipe) id: string) {
            return this.medicalRecordsService.deleteMedicalRecordById(id)
        }
}