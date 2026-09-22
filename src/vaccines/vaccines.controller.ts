import { Controller, Get, Param, ParseEnumPipe, ParseUUIDPipe, Query } from "@nestjs/common";
import { VaccinesService } from "./vaccines.service";
import { PetType } from "../generated/prisma/enums";

@Controller()
export class VaccinesController {
    constructor(private vaccinesService: VaccinesService){}

    @Get('vaccines')
    getVaccines(
        @Query('species', new ParseEnumPipe(PetType, { optional: true })) species?: PetType
    ) {
        return this.vaccinesService.getVaccines(species);
    }

    @Get('pets/:petId/vaccines')
    getVaccinesForPet(@Param('petId', ParseUUIDPipe) petId: string) {
        return this.vaccinesService.getVaccinesForPet(petId);
    }
}
