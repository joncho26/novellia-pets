import type { DashboardView, PetDashboard } from '@api/dashboard/types/PetDashboard'
import type { PetDetail, VetContact } from '@api/pets/types/PetDetail'
import type {
  DosageUnit,
  MedicationStatus,
  PetSex,
  PetType,
  WeightUnit,
} from '@api/generated/prisma/enums'

// JSON has no Date, so every Date the API declares arrives over the wire as
// an ISO string. This keeps the shared types honest on the client.
export type Serialized<T> = T extends Date
  ? string
  : T extends (infer U)[]
    ? Serialized<U>[]
    : T extends object
      ? { [K in keyof T]: Serialized<T[K]> }
      : T

export type PetDashboardResponse = Serialized<PetDashboard>
export type DashboardResponse = Serialized<DashboardView>
export type PetDetailResponse = Serialized<PetDetail>
export type VetContactResponse = Serialized<VetContact>

// Mirrors MedicationDetailsDto: a medication's own fields, with no link to a
// pet or a record. Both the standalone and the nested forms build on it.
export interface MedicationDetailsRequest {
  name: string
  dosageAmount: number
  dosageUnit: DosageUnit
  frequency: string
  startDate: string
  endDate?: string | null
  status: MedicationStatus
}

// Mirrors CreateMedicationDto. petId travels in the URL, not the body.
export interface CreateMedicationRequest extends MedicationDetailsRequest {
  medicalRecordId?: string | null
}

// Mirrors TreatmentDetailsDto.
export interface TreatmentDetailsRequest {
  name: string
  date: string
  notes?: string | null
}

// Mirrors CreateMedicalRecordDto. petId comes from the page, not the form, and
// the children are written in the same transaction as the record.
export interface CreateMedicalRecordRequest {
  petId: string
  recordDate: string
  vetContactId?: string
  vetName?: string
  notes?: string
  medications?: MedicationDetailsRequest[]
  treatments?: TreatmentDetailsRequest[]
}

// Mirrors CreatePetDto. The DTO itself is a decorated class, so importing it
// here would drag NestJS-only syntax into the browser type graph.
export interface CreatePetRequest {
  name: string
  type: PetType
  breed?: string | null
  dateOfBirth: string
  weight: number
  weightUnit: WeightUnit
  sex: PetSex
  neutered?: boolean | null
  ownerId: string
}
