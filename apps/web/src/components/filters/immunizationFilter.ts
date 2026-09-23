import type { PetDetailResponse } from '../../api/types'
import { parseDateOnly } from '../../dates'

type Immunization = PetDetailResponse['immunizations'][number]

export type ImmunizationFilter = {
  vaccineId: string
  administeredFrom: Date | undefined
  administeredTo: Date | undefined
  dueFrom: Date | undefined
  dueTo: Date | undefined
}

export function emptyImmunizationFilter(): ImmunizationFilter {
  return {
    vaccineId: '',
    administeredFrom: undefined,
    administeredTo: undefined,
    dueFrom: undefined,
    dueTo: undefined,
  }
}

export function countImmunizationFilters(filter: ImmunizationFilter) {
  return [
    filter.vaccineId,
    filter.administeredFrom,
    filter.administeredTo,
    filter.dueFrom,
    filter.dueTo,
  ].filter(Boolean).length
}

// The dropdown offers only vaccines this pet actually has, taken from the rows
// themselves — no catalog request, and no options that match nothing.
export function vaccineOptionsFrom(items: Immunization[]) {
  const byId = new Map<string, string>()
  for (const immunization of items) byId.set(immunization.vaccineId, immunization.vaccine.name)

  return [...byId].map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name))
}

export function applyImmunizationFilter(items: Immunization[], filter: ImmunizationFilter) {
  return items.filter((immunization) => {
    if (filter.vaccineId && immunization.vaccineId !== filter.vaccineId) return false

    const administered = parseDateOnly(immunization.dateAdministered)
    if (filter.administeredFrom && administered < filter.administeredFrom) return false
    if (filter.administeredTo && administered > filter.administeredTo) return false

    // A dose with no next due date cannot satisfy a due-date range, so asking
    // for one excludes it rather than letting it through unchecked.
    if (filter.dueFrom || filter.dueTo) {
      if (!immunization.nextDueDate) return false

      const due = parseDateOnly(immunization.nextDueDate)
      if (filter.dueFrom && due < filter.dueFrom) return false
      if (filter.dueTo && due > filter.dueTo) return false
    }

    return true
  })
}
