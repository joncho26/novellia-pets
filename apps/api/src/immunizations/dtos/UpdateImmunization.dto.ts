import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsUUID, ValidateIf } from 'class-validator';

// A PATCH body: an absent field leaves the stored value alone. @IsOptional()
// marks the nullable columns, where null is how a value gets cleared;
// @ValidateIf guards the NOT NULL ones, so an explicit null is a 400 naming
// the field rather than a 500 from the database. See UpdatePetDto.
export class UpdateImmunizationDto {
    // Required foreign key: an immunization without a vaccine is meaningless,
    // so null here is a client error rather than a way to detach it.
    @ValidateIf((dto) => dto.vaccineId !== undefined)
    @IsUUID()
    vaccineId?: string

    @ValidateIf((dto) => dto.dateAdministered !== undefined)
    @IsDate()
    @Type(() => Date)
    dateAdministered?: Date

    // Nullable: clearing it is how a one-off dose stops being a booster.
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    nextDueDate?: Date | null
}
