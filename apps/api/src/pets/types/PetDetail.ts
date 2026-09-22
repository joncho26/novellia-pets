import { DiagnosticType, DosageUnit, MedicationStatus, PetSex, PetType, WeightUnit } from "../../generated/prisma/enums";

// The shape GET /pets/:id returns: the pet plus its whole medical history.
// Declared by hand rather than inferred from Prisma so the client can import
// it without pulling the ORM's types into the browser build.

export interface PetDetailMedicalRecord {
    id: string
    recordDate: Date
    vetContactId: string | null
    vetName: string | null
    notes: string | null
}

export interface PetDetailTreatment {
    id: string
    medicalRecordId: string | null
    name: string
    date: Date
    notes: string | null
}

export interface PetDetailDiagnostic {
    id: string
    medicalRecordId: string | null
    type: DiagnosticType
    date: Date
    result: string | null
    notes: string | null
}

export interface PetDetailMedication {
    id: string
    medicalRecordId: string | null
    name: string
    dosageAmount: number
    dosageUnit: DosageUnit
    frequency: string
    startDate: Date
    endDate: Date | null
    status: MedicationStatus
}

export interface PetDetailImmunization {
    id: string
    medicalRecordId: string | null
    vaccineId: string
    dateAdministered: Date
    nextDueDate: Date | null
    vaccine: { id: string; name: string; species: PetType }
}

// The owner's vets, for attributing a medical record to one of them.
export interface VetContact {
    id: string
    firstName: string
    lastName: string
}

export interface PetDetail {
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

    medicalRecords: PetDetailMedicalRecord[]
    treatments: PetDetailTreatment[]
    diagnostics: PetDetailDiagnostic[]
    medications: PetDetailMedication[]
    immunizations: PetDetailImmunization[]
}
