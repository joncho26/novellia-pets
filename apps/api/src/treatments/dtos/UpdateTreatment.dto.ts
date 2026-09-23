import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator';

// A PATCH body: an absent field leaves the stored value alone. @IsOptional()
// marks the nullable columns, where null is how a value gets cleared;
// @ValidateIf guards the NOT NULL ones, so an explicit null is a 400 naming
// the field rather than a 500 from the database. See UpdatePetDto.
export class UpdateTreatmentDto {
    @ValidateIf((dto) => dto.name !== undefined)
    @IsString()
    @IsNotEmpty()
    name?: string

    @ValidateIf((dto) => dto.date !== undefined)
    @IsDate()
    @Type(() => Date)
    date?: Date

    @IsString()
    @IsOptional()
    notes?: string | null

    // Nullable: clearing it detaches the entry from its visit.
    @IsUUID()
    @IsOptional()
    medicalRecordId?: string | null
}
