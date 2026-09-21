import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PetSex, PetType, WeightUnit } from "../../generated/prisma/enums"

export class CreatePetDto {
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

    @IsString()
    @IsNotEmpty()
    name: string

    @IsEnum(PetType)
    type: PetType

    @IsString()
    @IsOptional()
    breed?: string | null

    @IsDate()
    @Type(() => Date)
    dateOfBirth: Date

    @IsNumber()
    weight: number

    @IsEnum(WeightUnit)
    weightUnit: WeightUnit

    @IsEnum(PetSex)
    sex: PetSex

    @IsOptional()
    @IsBoolean()
    neutered?: boolean | null

    @IsNotEmpty()
    @IsString()
    ownerId: string
}
