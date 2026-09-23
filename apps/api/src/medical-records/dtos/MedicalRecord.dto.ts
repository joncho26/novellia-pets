import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { PetType } from "../../generated/prisma/enums";
// Type-only: the web app compiles this file under verbatimModuleSyntax.
import type { ImmunizationDto } from "../../immunizations/dtos/Immunization.dto";
import type {
    Nested,
    PetDetailDiagnostic,
    PetDetailImmunization,
    PetDetailMedication,
    PetDetailTreatment,
} from "../../pets/dtos/Pet.dto";

// What the medical record endpoints return: the visit's own columns, without
// anything recorded during it. The copy nested inside a pet's detail drops the
// petId and timestamps — see PetDetailMedicalRecord, which is defined in terms
// of this, and MedicalRecordDetailsDto below extends it with the visit's
// contents and the pet it belongs to.
//
// The decorators document the shape rather than enforce it: ValidationPipe
// runs on inbound bodies only, so nothing executes them on the way out.
export class MedicalRecordDto {
    @IsUUID()
    id: string

    @IsUUID()
    petId: string

    @IsDate()
    @Type(() => Date)
    recordDate: Date

    // Either the visit points at a vet on the owner's contact list, or it just
    // carries a name typed into the form. Both are nullable, and a record may
    // legitimately have neither.
    @IsUUID()
    @IsOptional()
    vetContactId: string | null

    @IsString()
    @IsOptional()
    vetName: string | null

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

// A visit and everything recorded during it. What create, update and the
// list-everything read return — none of them joins the pet.
export interface MedicalRecordWithEntriesDto extends MedicalRecordDto {
    treatments: PetDetailTreatment[]
    diagnostics: PetDetailDiagnostic[]
    medications: PetDetailMedication[]
    // No vaccine: unlike the per-record read below, these three queries ask for
    // `immunizations: true`, so an entry carries a vaccineId and no name.
    immunizations: Nested<ImmunizationDto>[]
}

// The shape GET /medical-records/:id returns: the above, plus enough of the
// pet to say whose visit it was and of the vet to attribute it.
export interface MedicalRecordDetailsDto extends MedicalRecordWithEntriesDto {
    // This read does join the vaccine, so it narrows what it inherits.
    immunizations: PetDetailImmunization[]

    pet: { id: string; name: string; type: PetType }
    vet: { id: string; firstName: string; lastName: string } | null
}
