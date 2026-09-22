import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { DiagnosticsService } from "./diagnostics.service";
import { CreateDiagnosticDto } from "./dtos/CreateDiagnostic.dto";
import { UpdateDiagnosticDto } from "./dtos/UpdateDiagnostic.dto";

@Controller()
export class DiagnosticsController {
    constructor(private diagnosticsService: DiagnosticsService){}

    @Get('pets/:petId/diagnostics')
    getDiagnosticsByPetId(@Param('petId', ParseUUIDPipe) petId: string) {
        return this.diagnosticsService.getDiagnosticsByPetId(petId);
    }

    @Post('pets/:petId/diagnostics')
    createDiagnostic(
        @Param('petId', ParseUUIDPipe) petId: string,
        @Body() createDiagnosticDto: CreateDiagnosticDto
    ) {
        return this.diagnosticsService.createDiagnostic(petId, createDiagnosticDto);
    }

    @Get('diagnostics/:id')
    getDiagnosticById(@Param('id', ParseUUIDPipe) id: string) {
        return this.diagnosticsService.getDiagnosticById(id);
    }

    @Patch('diagnostics/:id')
    updateDiagnosticById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateDiagnosticDto: UpdateDiagnosticDto
    ) {
        return this.diagnosticsService.updateDiagnosticById(id, updateDiagnosticDto);
    }

    @Delete('diagnostics/:id')
    deleteDiagnosticById(@Param('id', ParseUUIDPipe) id: string) {
        return this.diagnosticsService.deleteDiagnosticById(id);
    }
}
