import type { DiagnosticType } from '@api/generated/prisma/enums'
import type { PetDetailResponse } from '../../api/types'
import { parseDateOnly } from '../../dates'

type Diagnostic = PetDetailResponse['diagnostics'][number]

export type DiagnosticFilter = {
  type: DiagnosticType | ''
  result: string
  from: Date | undefined
  to: Date | undefined
}

export function emptyDiagnosticFilter(): DiagnosticFilter {
  return { type: '', result: '', from: undefined, to: undefined }
}

export function countDiagnosticFilters(filter: DiagnosticFilter) {
  return [filter.type, filter.result.trim(), filter.from, filter.to].filter(Boolean).length
}

export function applyDiagnosticFilter(items: Diagnostic[], filter: DiagnosticFilter) {
  const result = filter.result.trim().toLowerCase()

  return items.filter((diagnostic) => {
    if (filter.type && diagnostic.type !== filter.type) return false
    // A diagnostic with no result recorded cannot match a search of results.
    if (result && !diagnostic.result?.toLowerCase().includes(result)) return false

    const date = parseDateOnly(diagnostic.date)
    if (filter.from && date < filter.from) return false
    if (filter.to && date > filter.to) return false

    return true
  })
}
