import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PetSex, PetType, WeightUnit } from "../../generated/prisma/enums"

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

    @IsOptional()
    @IsNotEmpty()
    name?: string

    @IsEnum(PetType)
    @IsNotEmpty()
    type?: PetType

    @IsString()
    @IsOptional()
    breed?: string | null

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    dateOfBirth?: Date

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    weight?: number

    @IsEnum(WeightUnit)
    @IsNotEmpty()
    @IsOptional()
    weightUnit?: WeightUnit

    @IsEnum(PetSex)
    @IsNotEmpty()
    @IsOptional()
    sex?: PetSex

    @IsOptional()
    @IsBoolean()
    neutered?: boolean | null
}
