import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsUUID } from 'class-validator';

export class UpdateImmunizationDto {
    @IsUUID()
    @IsOptional()
    vaccineId?: string

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    dateAdministered?: Date

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    nextDueDate?: Date | null
}
