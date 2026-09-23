import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, ValidateIf } from 'class-validator';
import { DosageUnit, MedicationStatus } from "../../generated/prisma/enums";

// A PATCH body: an absent field leaves the stored value alone. @IsOptional()
// marks the nullable columns, where null is how a value gets cleared;
// @ValidateIf guards the NOT NULL ones, so an explicit null is a 400 naming
// the field rather than a 500 from the database. See UpdatePetDto.
export class UpdateMedicationDto {
    @ValidateIf((dto) => dto.name !== undefined)
    @IsString()
    @IsNotEmpty()
    name?: string

    @ValidateIf((dto) => dto.dosageAmount !== undefined)
    @IsNumber()
    @IsPositive()
    dosageAmount?: number

    @ValidateIf((dto) => dto.dosageUnit !== undefined)
    @IsEnum(DosageUnit)
    dosageUnit?: DosageUnit

    @ValidateIf((dto) => dto.frequency !== undefined)
    @IsString()
    @IsNotEmpty()
    frequency?: string

    @ValidateIf((dto) => dto.startDate !== undefined)
    @IsDate()
    @Type(() => Date)
    startDate?: Date

    // Nullable: clearing it is how a course becomes open-ended.
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    endDate?: Date | null

    @ValidateIf((dto) => dto.status !== undefined)
    @IsEnum(MedicationStatus)
    status?: MedicationStatus

    // Nullable: clearing it detaches the entry from its visit.
    @IsUUID()
    @IsOptional()
    medicalRecordId?: string | null
}
