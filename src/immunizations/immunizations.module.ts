import { Module } from "@nestjs/common";
import { ImmunizationsController } from "./immunizations.controller";
import { ImmunizationsService } from "./immunizations.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [ImmunizationsController],
    providers: [ImmunizationsService],
})
export class ImmunizationsModule {}
