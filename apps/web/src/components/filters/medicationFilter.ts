import type { MedicationStatus } from '@api/generated/prisma/enums'
import type { PetDetailResponse } from '../../api/types'
import { parseDateOnly } from '../../dates'

type Medication = PetDetailResponse['medications'][number]

// The criteria this section offers, drawn from its own columns: status, name,
// and the window its course started in.
export type MedicationFilter = {
  status: MedicationStatus | ''
  name: string
  startedFrom: Date | undefined
  startedTo: Date | undefined
}

export function emptyMedicationFilter(): MedicationFilter {
  return { status: '', name: '', startedFrom: undefined, startedTo: undefined }
}

// Drives the count on the button, so a collapsed panel still says how many
// criteria are narrowing the table.
export function countMedicationFilters(filter: MedicationFilter) {
  return [filter.status, filter.name.trim(), filter.startedFrom, filter.startedTo].filter(Boolean)
    .length
}

export function applyMedicationFilter(items: Medication[], filter: MedicationFilter) {
  const name = filter.name.trim().toLowerCase()

  return items.filter((medication) => {
    if (filter.status && medication.status !== filter.status) return false
    if (name && !medication.name.toLowerCase().includes(name)) return false

    // Compared as calendar dates, not instants: a dose started on the 1st
    // should match a range beginning on the 1st, whatever the timezone.
    const started = parseDateOnly(medication.startDate)
    if (filter.startedFrom && started < filter.startedFrom) return false
    if (filter.startedTo && started > filter.startedTo) return false

    return true
  })
}
