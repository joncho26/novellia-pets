import type { PetDetailResponse } from './api/types'
import { parseDateOnly } from './dates'

type MedicalRecord = PetDetailResponse['medicalRecords'][number]

// Notes are deliberately not filterable here.
export type MedicalRecordFilter = {
  vet: string
  from: Date | undefined
  to: Date | undefined
}

export function emptyMedicalRecordFilter(): MedicalRecordFilter {
  return { vet: '', from: undefined, to: undefined }
}

export function countMedicalRecordFilters(filter: MedicalRecordFilter) {
  return [filter.vet.trim(), filter.from, filter.to].filter(Boolean).length
}

export function applyMedicalRecordFilter(items: MedicalRecord[], filter: MedicalRecordFilter) {
  const vet = filter.vet.trim().toLowerCase()

  return items.filter((record) => {
    // Matches the typed vetName only. A record that names its vet by linking a
    // contact carries no name on this payload, so it cannot match here.
    if (vet && !record.vetName?.toLowerCase().includes(vet)) return false

    const date = parseDateOnly(record.recordDate)
    if (filter.from && date < filter.from) return false
    if (filter.to && date > filter.to) return false

    return true
  })
}
