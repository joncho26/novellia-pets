import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { TreatmentsService } from "./treatments.service";
import { CreateTreatmentDto } from "./dtos/CreateTreatment.dto";
import { UpdateTreatmentDto } from "./dtos/UpdateTreatment.dto";

@Controller()
export class TreatmentsController {
    constructor(private treatmentsService: TreatmentsService){}

    @Get('pets/:petId/treatments')
    getTreatmentsByPetId(@Param('petId', ParseUUIDPipe) petId: string) {
        return this.treatmentsService.getTreatmentsByPetId(petId);
    }

    @Post('pets/:petId/treatments')
    createTreatment(
        @Param('petId', ParseUUIDPipe) petId: string,
        @Body() createTreatmentDto: CreateTreatmentDto
    ) {
        return this.treatmentsService.createTreatment(petId, createTreatmentDto);
    }

    @Get('treatments/:id')
    getTreatmentById(@Param('id', ParseUUIDPipe) id: string) {
        return this.treatmentsService.getTreatmentById(id);
    }

    @Patch('treatments/:id')
    updateTreatmentById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateTreatmentDto: UpdateTreatmentDto
    ) {
        return this.treatmentsService.updateTreatmentById(id, updateTreatmentDto);
    }

    @Delete('treatments/:id')
    deleteTreatmentById(@Param('id', ParseUUIDPipe) id: string) {
        return this.treatmentsService.deleteTreatmentById(id);
    }
}
