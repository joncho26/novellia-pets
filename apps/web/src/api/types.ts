import type { DashboardView, PetDashboard } from '@api/dashboard/types/PetDashboard'
import type { PetDetail, PetDetailMedicalRecord, VetContact } from '@api/pets/types/PetDetail'
import type { MedicalRecordDetail } from '@api/medical-records/types/MedicalRecordDetail'
import type {
  DiagnosticType,
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
export type MedicalRecordDetailResponse = Serialized<MedicalRecordDetail>

// GET /pets/:petId/medical-records returns the visits without their contents.
// The row also carries petId and timestamps, which nothing here reads.
export type MedicalRecordSummaryResponse = Serialized<PetDetailMedicalRecord>
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

// Mirrors UpdateMedicationDto. Every field optional — an omitted key leaves the
// stored value alone. medicalRecordId is left out here: which visit an entry
// belongs to is not something the edit form changes.
export type UpdateMedicationRequest = Partial<MedicationDetailsRequest>

// Mirrors TreatmentDetailsDto.
export interface TreatmentDetailsRequest {
  name: string
  date: string
  notes?: string | null
}

// The standalone create forms of the four attachments. Each may name a record
// to belong to, or leave it out to stand alone on the pet.
export interface CreateTreatmentRequest extends TreatmentDetailsRequest {
  medicalRecordId?: string | null
}

// The update forms of the four attachments. Every field optional, and none of
// them carries medicalRecordId: which visit an entry belongs to is not
// something an edit form changes.
export type UpdateTreatmentRequest = Partial<TreatmentDetailsRequest>

// The fields this app reads from a Vaccine. The endpoint also returns
// timestamps, which nothing here uses.
export interface VaccineResponse {
  id: string
  name: string
  species: PetType
  defaultIntervalMonths: number | null
}

// Mirrors ImmunizationDetailsDto.
export interface ImmunizationDetailsRequest {
  vaccineId: string
  dateAdministered: string
  nextDueDate?: string | null
}

export interface CreateImmunizationRequest extends ImmunizationDetailsRequest {
  medicalRecordId?: string | null
}

export type UpdateImmunizationRequest = Partial<ImmunizationDetailsRequest>

// Mirrors the scalar half of UpdateMedicalRecordDto. Its child arrays are left
// out on purpose: PATCH *creates* nested children rather than replacing them,
// so resubmitting a record's existing attachments would duplicate them.
// Every field is nullable — null is how a value gets cleared, where omitting
// the key means "leave it alone".
export interface UpdateMedicalRecordRequest {
  recordDate?: string
  vetContactId?: string | null
  vetName?: string | null
  notes?: string | null
}

// Mirrors DiagnosticDetailsDto.
export interface DiagnosticDetailsRequest {
  type: DiagnosticType
  date: string
  result?: string | null
  notes?: string | null
}

export interface CreateDiagnosticRequest extends DiagnosticDetailsRequest {
  medicalRecordId?: string | null
}

export type UpdateDiagnosticRequest = Partial<DiagnosticDetailsRequest>

// Mirrors UpdatePetDto. Every field optional, though the API currently
// requires `type` on a PATCH — see the note in EditPetModal.
export type UpdatePetRequest = Partial<Omit<CreatePetRequest, 'ownerId'>>

// Mirrors CreateMedicalRecordDto. petId travels in the URL, not the body, and
// the children are written in the same transaction as the record.
export interface CreateMedicalRecordRequest {
  recordDate: string
  vetContactId?: string
  vetName?: string
  notes?: string
  medications?: MedicationDetailsRequest[]
  treatments?: TreatmentDetailsRequest[]
  diagnostics?: DiagnosticDetailsRequest[]
  immunizations?: ImmunizationDetailsRequest[]
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
