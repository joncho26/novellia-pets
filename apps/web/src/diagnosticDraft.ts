import type { DiagnosticType } from '@api/generated/prisma/enums'
import type { PetDetailResponse } from './api/types'
import { parseDateOnly } from './dates'
import type { DraftErrors } from './useDrafts'

// A diagnostic the user has typed into the form but not yet saved.
export type DiagnosticDraft = {
  key: string
  type: DiagnosticType | ''
  date: Date | undefined
  result: string
  notes: string
}

export type DiagnosticDraftErrors = DraftErrors<DiagnosticDraft>

export function emptyDiagnosticDraft(): DiagnosticDraft {
  return {
    key: crypto.randomUUID(),
    type: '',
    date: undefined,
    result: '',
    notes: '',
  }
}

export function diagnosticDraftFrom(
  diagnostic: PetDetailResponse['diagnostics'][number],
): DiagnosticDraft {
  return {
    key: diagnostic.id,
    type: diagnostic.type,
    date: parseDateOnly(diagnostic.date),
    result: diagnostic.result ?? '',
    notes: diagnostic.notes ?? '',
  }
}

export function validateDiagnosticDraft(draft: DiagnosticDraft): DiagnosticDraftErrors {
  const errors: DiagnosticDraftErrors = {}

  if (!draft.type) errors.type = 'Type is required.'
  if (!draft.date) errors.date = 'Date is required.'

  return errors
}
