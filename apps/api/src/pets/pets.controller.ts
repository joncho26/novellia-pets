import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, Put } from "@nestjs/common";
import { PetsService } from "./pets.service";
import { CreatePetDto } from "./dtos/CreatePet.dto";
import { UpdatePetDto } from "./dtos/UpdatePet.dto";

@Controller('pets')
export class PetsController {
    constructor(private petsService: PetsService){}

    @Post()
    createPet(@Body() createPetDto: CreatePetDto) {
        return this.petsService.createPet(createPetDto);
    }

    @Get()
    async getPets() {
        return this.petsService.getPets()
    }

    @Get(':id')
    async getPetById(@Param('id', ParseUUIDPipe) id: string) {
        const pet = await this.petsService.getPetById(id);
        if (!pet) throw new NotFoundException("Pet not found");

        return pet;
    }

    @Patch(':id')
    updatePetById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updatePetDto: UpdatePetDto
    ) {
        return this.petsService.updatePetById(id, updatePetDto)
    }

    @Delete(':id')
    deletePetById(
        @Param('id', ParseUUIDPipe) id: string) {
            return this.petsService.deletePetById(id)
        }
}