import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsUUID } from 'class-validator';

// What the immunization endpoints return: the whole row, including the petId
// it hangs off and its timestamps. A bare immunization is two dates and a
// foreign key, so the copy nested inside a pet's detail joins the vaccine —
// see PetDetailImmunization, which is defined in terms of this.
//
// The decorators document the shape rather than enforce it: ValidationPipe
// runs on inbound bodies only, so nothing executes them on the way out.
export class ImmunizationDto {
    @IsUUID()
    id: string

    @IsUUID()
    petId: string

    @IsUUID()
    @IsOptional()
    medicalRecordId: string | null

    @IsUUID()
    vaccineId: string

    @IsDate()
    @Type(() => Date)
    dateAdministered: Date

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    nextDueDate: Date | null

    @IsDate()
    @Type(() => Date)
    createdAt: Date

    @IsDate()
    @Type(() => Date)
    updatedAt: Date
}
