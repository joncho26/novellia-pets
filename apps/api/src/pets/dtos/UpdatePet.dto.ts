import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidateIf } from 'class-validator';
import { PetSex, PetType, WeightUnit } from "../../generated/prisma/enums"

// A PATCH body: every field may be absent, and an absent field leaves the
// stored value alone.
//
// Which decorator marks that depends on whether the column is nullable.
// @IsOptional() skips validation for null as well as undefined, so it is right
// for the columns where null is meaningful — it is how a user clears a breed
// or un-answers the neutered question. On a NOT NULL column it is too loose:
// an explicit null would pass validation, reach Prisma and come back as a bare
// 500. Those fields use @ValidateIf instead, which validates whenever the key
// is present, so null fails the rule below it and returns a 400 naming it.
export class UpdatePetDto {
    @IsString()
    @IsOptional()
    microchipId?: string | null

    @IsString()
    @IsOptional()
    microchipRegistry?: string | null

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    microchipDate?: Date | null

    @ValidateIf((dto) => dto.name !== undefined)
    @IsString()
    @IsNotEmpty()
    name?: string

    @ValidateIf((dto) => dto.type !== undefined)
    @IsEnum(PetType)
    type?: PetType

    @IsString()
    @IsOptional()
    breed?: string | null

    @ValidateIf((dto) => dto.dateOfBirth !== undefined)
    @IsDate()
    @Type(() => Date)
    dateOfBirth?: Date

    @ValidateIf((dto) => dto.weight !== undefined)
    @IsNumber()
    @IsPositive()
    weight?: number

    @ValidateIf((dto) => dto.weightUnit !== undefined)
    @IsEnum(WeightUnit)
    weightUnit?: WeightUnit

    @ValidateIf((dto) => dto.sex !== undefined)
    @IsEnum(PetSex)
    sex?: PetSex

    @IsOptional()
    @IsBoolean()
    neutered?: boolean | null
}
