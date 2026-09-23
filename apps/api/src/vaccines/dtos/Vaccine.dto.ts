import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { PetType } from "../../generated/prisma/enums";

// What the vaccine endpoints return: a row from the catalog.
//
// The decorators document the shape rather than enforce it: ValidationPipe
// runs on inbound bodies only, so nothing executes them on the way out.
export class VaccineDto {
    @IsUUID()
    id: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsEnum(PetType)
    species: PetType

    // Null where a vaccine is a one-off rather than a recurring booster.
    @IsInt()
    @IsOptional()
    defaultIntervalMonths: number | null

    @IsDate()
    @Type(() => Date)
    createdAt: Date

    @IsDate()
    @Type(() => Date)
    updatedAt: Date
}
