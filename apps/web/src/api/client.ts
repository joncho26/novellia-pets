import type {
  CreateDiagnosticRequest,
  CreateImmunizationRequest,
  CreateMedicalRecordRequest,
  CreateMedicationRequest,
  CreatePetRequest,
  CreateTreatmentRequest,
  DashboardResponse,
  MedicalRecordDetailResponse,
  MedicalRecordSummaryResponse,
  PetDetailResponse,
  UpdateMedicalRecordRequest,
  UpdateDiagnosticRequest,
  UpdateImmunizationRequest,
  UpdateMedicationRequest,
  UpdatePetRequest,
  UpdateTreatmentRequest,
  VaccineResponse,
  VetContactResponse,
} from './types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

// Nest's ValidationPipe reports field errors in the body, so a bare status line
// would throw away the only part of a 400 worth showing the user.
async function readErrorMessage(response: Response): Promise<string> {
  try {
    const body: unknown = await response.json()
    const message = (body as { message?: unknown })?.message

    if (Array.isArray(message)) return message.join(', ')
    if (typeof message === 'string') return message
  } catch {
    // Body was empty or not JSON; fall through to the status line.
  }

  return `${response.status} ${response.statusText}`
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init)

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return response.json() as Promise<T>
}

export function getDashboard() {
  return request<DashboardResponse>('/dashboard')
}

export function getPet(petId: string) {
  return request<PetDetailResponse>(`/pets/${petId}`)
}

export function getMedicalRecord(medicalRecordId: string) {
  return request<MedicalRecordDetailResponse>(`/medical-records/${medicalRecordId}`)
}

export function getVetContacts(petId: string) {
  return request<VetContactResponse[]>(`/pets/${petId}/vet-contacts`)
}

// Already filtered to the pet's species by the API — a cat's vaccines never
// appear for a dog.
export function getVaccinesForPet(petId: string) {
  return request<VaccineResponse[]>(`/pets/${petId}/vaccines`)
}

function post<T>(path: string, body: unknown) {
  return request<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function patch<T>(path: string, body: unknown) {
  return request<T>(path, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export function createPet(pet: CreatePetRequest) {
  return post<{ id: string }>('/pets', pet)
}

export function updatePet(petId: string, changes: UpdatePetRequest) {
  return patch<{ id: string }>(`/pets/${petId}`, changes)
}

// Deleting a pet deletes its whole medical history with it, in one
// transaction on the API side. Emergency contacts survive, unlinked.
export function deletePet(petId: string) {
  return request<{ id: string }>(`/pets/${petId}`, { method: 'DELETE' })
}

export function createMedicalRecord(petId: string, record: CreateMedicalRecordRequest) {
  return post<{ id: string }>(`/pets/${petId}/medical-records`, record)
}

export function getMedicalRecordsForPet(petId: string) {
  return request<MedicalRecordSummaryResponse[]>(`/pets/${petId}/medical-records`)
}

export function updateMedicalRecord(
  medicalRecordId: string,
  changes: UpdateMedicalRecordRequest,
) {
  return patch<{ id: string }>(`/medical-records/${medicalRecordId}`, changes)
}

// Deleting a record unlinks its medications, treatments, diagnostics and
// immunizations rather than deleting them: their medicalRecordId is nullable,
// so they survive on the pet as free-standing entries.
export function deleteMedicalRecord(medicalRecordId: string) {
  return request<{ id: string }>(`/medical-records/${medicalRecordId}`, { method: 'DELETE' })
}

// The four attachments, each created under its pet. Passing medicalRecordId
// files it under a visit; leaving it out makes it a free-standing entry.
export function createMedication(petId: string, medication: CreateMedicationRequest) {
  return post<{ id: string }>(`/pets/${petId}/medications`, medication)
}

export function updateMedication(medicationId: string, changes: UpdateMedicationRequest) {
  return patch<{ id: string }>(`/medications/${medicationId}`, changes)
}

export function updateTreatment(id: string, changes: UpdateTreatmentRequest) {
  return patch<{ id: string }>(`/treatments/${id}`, changes)
}

export function updateDiagnostic(id: string, changes: UpdateDiagnosticRequest) {
  return patch<{ id: string }>(`/diagnostics/${id}`, changes)
}

export function updateImmunization(id: string, changes: UpdateImmunizationRequest) {
  return patch<{ id: string }>(`/immunizations/${id}`, changes)
}

// Each attachment deletes on its own, by its own id — the visit it belongs to
// is not part of the address.
export function deleteMedication(id: string) {
  return request<{ id: string }>(`/medications/${id}`, { method: 'DELETE' })
}

export function deleteTreatment(id: string) {
  return request<{ id: string }>(`/treatments/${id}`, { method: 'DELETE' })
}

export function deleteDiagnostic(id: string) {
  return request<{ id: string }>(`/diagnostics/${id}`, { method: 'DELETE' })
}

export function deleteImmunization(id: string) {
  return request<{ id: string }>(`/immunizations/${id}`, { method: 'DELETE' })
}

export function createTreatment(petId: string, treatment: CreateTreatmentRequest) {
  return post<{ id: string }>(`/pets/${petId}/treatments`, treatment)
}

export function createDiagnostic(petId: string, diagnostic: CreateDiagnosticRequest) {
  return post<{ id: string }>(`/pets/${petId}/diagnostics`, diagnostic)
}

export function createImmunization(petId: string, immunization: CreateImmunizationRequest) {
  return post<{ id: string }>(`/pets/${petId}/immunizations`, immunization)
}
