import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { ImmunizationsService } from "./immunizations.service";
import { CreateImmunizationDto } from "./dtos/CreateImmunization.dto";
import { UpdateImmunizationDto } from "./dtos/UpdateImmunization.dto";

@Controller()
export class ImmunizationsController {
    constructor(private immunizationsService: ImmunizationsService){}

    @Get('pets/:petId/immunizations')
    getImmunizationsByPetId(@Param('petId', ParseUUIDPipe) petId: string) {
        return this.immunizationsService.getImmunizationsByPetId(petId);
    }

    @Post('pets/:petId/immunizations')
    createImmunization(
        @Param('petId', ParseUUIDPipe) petId: string,
        @Body() createImmunizationDto: CreateImmunizationDto
    ) {
        return this.immunizationsService.createImmunization(petId, createImmunizationDto);
    }

    @Get('immunizations/:id')
    getImmunizationById(@Param('id', ParseUUIDPipe) id: string) {
        return this.immunizationsService.getImmunizationById(id);
    }

    @Patch('immunizations/:id')
    updateImmunizationById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateImmunizationDto: UpdateImmunizationDto
    ) {
        return this.immunizationsService.updateImmunizationById(id, updateImmunizationDto);
    }

    @Delete('immunizations/:id')
    deleteImmunizationById(@Param('id', ParseUUIDPipe) id: string) {
        return this.immunizationsService.deleteImmunizationById(id);
    }
}
