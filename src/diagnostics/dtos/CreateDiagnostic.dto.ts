import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { DiagnosticType } from "../../generated/prisma/enums";

export class DiagnosticDetailsDto {
    @IsEnum(DiagnosticType)
    type: DiagnosticType

    @IsDate()
    @Type(() => Date)
    date: Date

    @IsString()
    @IsOptional()
    result?: string | null

    @IsString()
    @IsOptional()
    notes?: string | null
}

export class CreateDiagnosticDto extends DiagnosticDetailsDto {
    @IsUUID()
    @IsOptional()
    medicalRecordId?: string | null
}
