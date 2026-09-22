import type {
  CreateMedicalRecordRequest,
  CreatePetRequest,
  DashboardResponse,
  PetDetailResponse,
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

export function getVetContacts(petId: string) {
  return request<VetContactResponse[]>(`/pets/${petId}/vet-contacts`)
}

function post<T>(path: string, body: unknown) {
  return request<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

export function createPet(pet: CreatePetRequest) {
  return post<{ id: string }>('/pets', pet)
}

export function createMedicalRecord(record: CreateMedicalRecordRequest) {
  return post<{ id: string }>('/medical-records', record)
}
