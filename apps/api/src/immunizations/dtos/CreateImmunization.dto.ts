import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsUUID } from 'class-validator';

export class ImmunizationDetailsDto {
    @IsUUID()
    vaccineId: string

    @IsDate()
    @Type(() => Date)
    dateAdministered: Date

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    nextDueDate?: Date | null
}

export class CreateImmunizationDto extends ImmunizationDetailsDto {
    @IsUUID()
    @IsOptional()
    medicalRecordId?: string | null
}
