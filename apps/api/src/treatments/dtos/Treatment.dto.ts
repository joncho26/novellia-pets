import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

// What the treatment endpoints return: the whole row, including the petId it
// hangs off and its timestamps. The copy nested inside a pet's detail drops
// those — see PetDetailTreatment, which is defined in terms of this.
//
// The decorators document the shape rather than enforce it: ValidationPipe
// runs on inbound bodies only, so nothing executes them on the way out.
export class TreatmentDto {
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

    @IsDate()
    @Type(() => Date)
    date: Date

    @IsString()
    @IsOptional()
    notes: string | null

    @IsDate()
    @Type(() => Date)
    createdAt: Date

    @IsDate()
    @Type(() => Date)
    updatedAt: Date
}
