import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { MedicalRecordsService } from "./medical-records.service";
import { CreateMedicalRecordDto } from "./dtos/CreateMedicalRecord.dto";
import { UpdateMedicalRecordDto } from "./dtos/UpdateMedicalRecord.dto";

// No controller-level prefix, matching the other child resources: a record is
// created under its pet but read and edited by its own id.
@Controller()
export class MedicalRecordsController {
    constructor(private medicalRecordsService: MedicalRecordsService){}

    @Post('pets/:petId/medical-records')
    createMedicalRecord(
        @Param('petId', ParseUUIDPipe) petId: string,
        @Body() createMedicalRecordDto: CreateMedicalRecordDto
    ) {
        const { treatments, immunizations, diagnostics, medications, ...details } = createMedicalRecordDto;

        // Nested creates run in one transaction, so a visit and everything
        // recorded during it either all land or none of them do.
        return this.medicalRecordsService.createMedicalRecord(petId, {
            ...details,
            treatments: treatments && { create: treatments.map((t) => ({ ...t, petId })) },
            immunizations: immunizations && { create: immunizations.map((i) => ({ ...i, petId })) },
            diagnostics: diagnostics && { create: diagnostics.map((d) => ({ ...d, petId })) },
            medications: medications && { create: medications.map((m) => ({ ...m, petId })) },
        });
    }

    @Get('pets/:petId/medical-records')
    getMedicalRecordsByPetId(@Param('petId', ParseUUIDPipe) petId: string) {
        return this.medicalRecordsService.getMedicalRecordsByPetId(petId);
    }

    @Get('medical-records/:id')
    async getMedicalRecordById(@Param('id', ParseUUIDPipe) id: string) {
        const medicalRecord = await this.medicalRecordsService.getMedicalRecordById(id);
        if (!medicalRecord) throw new NotFoundException("Medical record not found");

        return medicalRecord;
    }

    @Patch('medical-records/:id')
    async updateMedicalRecordById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
    ) {
        const medicalRecord = await this.medicalRecordsService.getMedicalRecordRefById(id);
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

    @Delete('medical-records/:id')
    deleteMedicalRecordById(
        @Param('id', ParseUUIDPipe) id: string) {
            return this.medicalRecordsService.deleteMedicalRecordById(id)
        }
}