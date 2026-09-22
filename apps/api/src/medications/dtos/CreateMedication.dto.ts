import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { DosageUnit, MedicationStatus } from "../../generated/prisma/enums";

export class MedicationDetailsDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsPositive()
    dosageAmount: number

    @IsEnum(DosageUnit)
    dosageUnit: DosageUnit

    @IsString()
    @IsNotEmpty()
    frequency: string

    @IsDate()
    @Type(() => Date)
    startDate: Date

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    endDate?: Date | null

    @IsEnum(MedicationStatus)
    status: MedicationStatus
}

export class CreateMedicationDto extends MedicationDetailsDto {
    @IsUUID()
    @IsOptional()
    medicalRecordId?: string | null
}
