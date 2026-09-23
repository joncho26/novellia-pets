import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { DosageUnit, MedicationStatus } from "../../generated/prisma/enums";

// What the medication endpoints return: the whole row, including the petId it
// hangs off and its timestamps. The copy nested inside a pet's detail drops
// those — see PetDetailMedication, which is defined in terms of this.
//
// The decorators document the shape rather than enforce it: ValidationPipe
// runs on inbound bodies only, so nothing executes them on the way out. They
// are here to match the request DTOs beside them, and to be ready for a
// schema generator that reads them.
export class MedicationDto {
    @IsUUID()
    id: string

    @IsUUID()
    petId: string

    @IsUUID()
    @IsOptional()
    medicalRecordId: string | null

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
    endDate: Date | null

    @IsEnum(MedicationStatus)
    status: MedicationStatus

    @IsDate()
    @Type(() => Date)
    createdAt: Date

    @IsDate()
    @Type(() => Date)
    updatedAt: Date
}
