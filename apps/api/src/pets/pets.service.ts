import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "../generated/prisma/client";

@Injectable()
export class PetsService {
    constructor(private prisma: PrismaService) {}

    createPet(data: Prisma.PetUncheckedCreateInput) {
        return this.prisma.pet.create({ data })
    }

    getPets() {
        return this.prisma.pet.findMany();
    }

    getPetById(id: string){
        return this.prisma.pet.findUnique({ where: { id } })
    }

    async deletePetById(id: string) {
        const pet = await this.getPetById(id);
        if(!pet) throw new HttpException('Pet Not Found', 404);

        return this.prisma.pet.delete({ where: { id } });
    }

    async updatePetById(id: string, data: Prisma.PetUncheckedUpdateInput) {
        const pet = await this.getPetById(id);

        if (!pet) throw new HttpException('Pet Not Found', 404);

        return this.prisma.pet.update({ where: { id }, data})
    }
}