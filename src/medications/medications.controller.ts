import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { MedicationsService } from "./medications.service";
import { CreateMedicationDto } from "./dtos/CreateMedication.dto";
import { UpdateMedicationDto } from "./dtos/UpdateMedication.dto";

@Controller()
export class MedicationsController {
    constructor(private medicationsService: MedicationsService){}

    @Get('pets/:petId/medications')
    getMedicationsByPetId(@Param('petId', ParseUUIDPipe) petId: string) {
        return this.medicationsService.getMedicationsByPetId(petId);
    }

    @Post('pets/:petId/medications')
    createMedication(
        @Param('petId', ParseUUIDPipe) petId: string,
        @Body() createMedicationDto: CreateMedicationDto
    ) {
        return this.medicationsService.createMedication(petId, createMedicationDto);
    }

    @Get('medications/:id')
    getMedicationById(@Param('id', ParseUUIDPipe) id: string) {
        return this.medicationsService.getMedicationById(id);
    }

    @Patch('medications/:id')
    updateMedicationById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateMedicationDto: UpdateMedicationDto
    ) {
        return this.medicationsService.updateMedicationById(id, updateMedicationDto);
    }

    @Delete('medications/:id')
    deleteMedicationById(@Param('id', ParseUUIDPipe) id: string) {
        return this.medicationsService.deleteMedicationById(id);
    }
}
