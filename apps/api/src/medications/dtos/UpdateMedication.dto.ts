import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { DosageUnit, MedicationStatus } from "../../generated/prisma/enums";

export class UpdateMedicationDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string

    @IsNumber()
    @IsPositive()
    @IsOptional()
    dosageAmount?: number

    @IsEnum(DosageUnit)
    @IsOptional()
    dosageUnit?: DosageUnit

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    frequency?: string

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    startDate?: Date

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    endDate?: Date | null

    @IsEnum(MedicationStatus)
    @IsOptional()
    status?: MedicationStatus

    @IsUUID()
    @IsOptional()
    medicalRecordId?: string | null
}
