import type { DashboardView, PetDashboard } from '@api/dashboard/types/PetDashboard'
import type { PetDetail, VetContact } from '@api/pets/types/PetDetail'
import type { PetSex, PetType, WeightUnit } from '@api/generated/prisma/enums'

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

// Mirrors CreateMedicalRecordDto. petId comes from the page, not the form.
export interface CreateMedicalRecordRequest {
  petId: string
  recordDate: string
  vetContactId?: string
  vetName?: string
  notes?: string
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
