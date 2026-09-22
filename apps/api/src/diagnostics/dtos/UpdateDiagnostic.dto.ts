import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { DiagnosticType } from "../../generated/prisma/enums";

export class UpdateDiagnosticDto {
    @IsEnum(DiagnosticType)
    @IsOptional()
    type?: DiagnosticType

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    date?: Date

    @IsString()
    @IsOptional()
    result?: string | null

    @IsString()
    @IsOptional()
    notes?: string | null

    @IsUUID()
    @IsOptional()
    medicalRecordId?: string | null
}
