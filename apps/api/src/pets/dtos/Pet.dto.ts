import { DiagnosticType, PetSex, PetType, WeightUnit } from "../../generated/prisma/enums";
// Type-only: the web app compiles this file under verbatimModuleSyntax.
import type { ImmunizationDto } from "../../immunizations/dtos/Immunization.dto";
import type { MedicalRecordDto } from "../../medical-records/dtos/MedicalRecord.dto";
import type { MedicationDto } from "../../medications/dtos/Medication.dto";
import type { TreatmentDto } from "../../treatments/dtos/Treatment.dto";
import type { VaccineDto } from "../../vaccines/dtos/Vaccine.dto";

// Nested inside a pet or a visit, these three fields are noise: petId is the
// pet you already asked for, and the timestamps are bookkeeping no view reads.
export type Nested<T> = Omit<T, 'petId' | 'createdAt' | 'updatedAt'>

// The shapes the pet endpoints return. Declared by hand rather than inferred
// from Prisma so the response stays a deliberate contract: a column added to
// the schema joins the API only when someone adds it here too.
//
// These carry no class-validator decorators, unlike the DTOs beside them.
// Nothing validates a response — it is what Prisma just produced — so the
// decorators would be inert, and an interface keeps the web app's import of
// this file free of NestJS compiler settings.

export type PetDetailMedicalRecord = Nested<MedicalRecordDto>

export type PetDetailTreatment = Nested<TreatmentDto>

export interface PetDetailDiagnostic {
    id: string
    medicalRecordId: string | null
    type: DiagnosticType
    date: Date
    result: string | null
    notes: string | null
}

export type PetDetailMedication = Nested<MedicationDto>

// The query joins the whole vaccine row; this narrows it to the three fields a
// view actually shows, so the catalog's timestamps stay out of the contract.
export interface PetDetailImmunization extends Nested<ImmunizationDto> {
    vaccine: Pick<VaccineDto, 'id' | 'name' | 'species'>
}

// The owner's vets, for attributing a medical record to one of them.
export interface VetContactDto {
    id: string
    firstName: string
    lastName: string
}

// The pet's own columns, and nothing else: what create, update, delete and the
// list endpoint return. Prisma hands back exactly this from a bare query, so
// annotating those methods with PetDetailsDto would claim relations they never
// load.
export interface PetDto {
    id: string
    microchipId: string | null
    microchipRegistry: string | null
    microchipDate: Date | null
    name: string
    type: PetType
    breed: string | null
    dateOfBirth: Date
    weight: number
    weightUnit: WeightUnit
    sex: PetSex
    neutered: boolean | null
    ownerId: string
    createdAt: Date
    updatedAt: Date
}

// What GET /pets/:id returns: the pet plus its whole medical history. The
// relations are required rather than optional — that endpoint always loads
// them, and making them optional would charge every reader a null check for a
// guarantee the API actually keeps.
export interface PetDetailsDto extends PetDto {
    medicalRecords: PetDetailMedicalRecord[]
    treatments: PetDetailTreatment[]
    diagnostics: PetDetailDiagnostic[]
    medications: PetDetailMedication[]
    immunizations: PetDetailImmunization[]
}
