import type { PetDetailResponse } from '../../api/types'
import { parseDateOnly } from '../../dates'

type Treatment = PetDetailResponse['treatments'][number]

// Notes are deliberately not filterable here.
export type TreatmentFilter = {
  name: string
  from: Date | undefined
  to: Date | undefined
}

export function emptyTreatmentFilter(): TreatmentFilter {
  return { name: '', from: undefined, to: undefined }
}

export function countTreatmentFilters(filter: TreatmentFilter) {
  return [filter.name.trim(), filter.from, filter.to].filter(Boolean).length
}

export function applyTreatmentFilter(items: Treatment[], filter: TreatmentFilter) {
  const name = filter.name.trim().toLowerCase()

  return items.filter((treatment) => {
    if (name && !treatment.name.toLowerCase().includes(name)) return false

    const date = parseDateOnly(treatment.date)
    if (filter.from && date < filter.from) return false
    if (filter.to && date > filter.to) return false

    return true
  })
}
