import { Module } from "@nestjs/common";
import { DiagnosticsController } from "./diagnostics.controller";
import { DiagnosticsService } from "./diagnostics.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [DiagnosticsController],
    providers: [DiagnosticsService],
})
export class DiagnosticsModule {}
